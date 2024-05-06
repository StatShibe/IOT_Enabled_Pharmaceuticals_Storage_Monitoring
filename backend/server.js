const express = require("express")
const app = express()
const five = require("johnny-five");
const PORT = 3500

let response;

var board = new five.Board();
board.on("ready", async function() {
	  multi = await new five.Multi({
	  controller: "DHT11_I2C_NANO_BACKPACK",
	  port: "COM4",
	})
	console.log("Connected with board")
	multi.on("change", function() {
		console.log("Thermometer");
		console.log("  celsius           : ", this.thermometer.celsius);
		console.log("  fahrenheit        : ", this.thermometer.fahrenheit);
		console.log("  kelvin            : ", this.thermometer.kelvin);
		console.log("--------------------------------------");
	

		console.log("Hygrometer");
		console.log("  relative humidity : ", this.hygrometer.relativeHumidity);
		console.log("--------------------------------------");
		response = {
		  "temperature" : this.thermometer.celsius,
		  "humidity" : this.hygrometer.relativeHumidity
		}
	  });
});

app.get("/getSensorData", async(req, res) => {
	res.send(response)
})

app.listen(PORT, () => {
	console.log("Server is online")
})