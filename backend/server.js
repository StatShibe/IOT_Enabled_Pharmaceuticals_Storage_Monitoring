const express = require("express")
const app = express()
// const five = require("johnny-five");
const PORT = 3001
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");

const corsOptions = require('./config/corsOptions')
const db = require('./config/DBConnect')
const medStorageRoute = require('./routes/med_storage.route');
const historyRoute = require('./routes/history.route');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('tiny'));

db.connect().then(()=>{
	console.log("Postgres is connected");
})

// var board = new five.Board();
// board.on("ready", async function() {
// 	  multi = await new five.Multi({
// 	  controller: "DHT11_I2C_NANO_BACKPACK",
// 	  port: "COM4",
// 	})
// 	console.log("Connected with board")
// 	multi.on("change", function() {
// 		console.log("Thermometer");
// 		console.log("  celsius           : ", this.thermometer.celsius);
// 		console.log("  fahrenheit        : ", this.thermometer.fahrenheit);
// 		console.log("  kelvin            : ", this.thermometer.kelvin);
// 		console.log("--------------------------------------");
	

// 		console.log("Hygrometer");
// 		console.log("  relative humidity : ", this.hygrometer.relativeHumidity);
// 		console.log("--------------------------------------");
// 		response = {
// 		  "temperature" : this.thermometer.celsius,
// 		  "humidity" : this.hygrometer.relativeHumidity
// 		}
// 	  });
// });

app.get("/getSensorData", async(req, res) => {
	res.send(response)
})

let StorageID, TemperatureInC, TemperatureInF, Humidity, Light;
let currentData;

app.post('/',async(req,res)=>{
	console.log(req.body);
	currentData = req.body;
	StorageID = req.body.StorageID;
	TemperatureInC = req.body.TemperatureInC;
	TemperatureInF = req.body.TemperatureInF;
	Humidity = req.body.Humidity;
	Light = req.body.Light;

	if(TemperatureInC !='nan' && Light>0){
		await db.query("INSERT INTO HISTORY(STORAGE_ID, TEMP, LIGHT, HUMIDITY) VALUES($1,$2,$3,$4)",[StorageID,TemperatureInC,Light,Humidity]);
		await db.query("UPDATE CURRENT_DATA SET TEMP_IN_C = $1, TEMP_IN_F = $2, LIGHT = $3, HUMIDITY = $4",[TemperatureInC,TemperatureInF,Light,Humidity]);
		console.log("Inserted with Light");
	}else if(TemperatureInC !='nan'){
		await db.query("INSERT INTO HISTORY(STORAGE_ID, TEMP, HUMIDITY) VALUES($1,$2,$3)",[StorageID,TemperatureInC,Humidity]);
		await db.query("UPDATE CURRENT_DATA SET TEMP_IN_C = $1, TEMP_IN_F = $2, HUMIDITY = $3",[TemperatureInC,TemperatureInF,Humidity]);
		console.log("Inserted without Light");
	}
	res.status(200).send("POST Request Recieved");
})

app.get('/currentData',async(req,res)=>{
	const result =await db.query("Select * from current_data");
	res.status(200).send(result.rows[0]);
});


app.use('/meds-storage',medStorageRoute);
app.use('/history',historyRoute);



app.listen(PORT, () => {
	console.log("Server is online")
})