var nodemailer = require('nodemailer');
require('dotenv').config();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
});

function generateHTMLTable(data,title) {
    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
            table {
                width: 100%;
                border-collapse: collapse;
            }
            table, th, td {
                border: 1px solid black;
            }
            th, td {
                padding: 8px;
                text-align: left;
            }
            th {
                background-color: #f2f2f2;
            }
        </style>
    </head>
    <body>

    <h2>${title}</h2>

    <table>
        <tr>
            <th>Med ID</th>
            <th>Med Name</th>
            <th>Storage ID</th>
            <th>Manufacturing Date</th>
            <th>Expiry Date</th>
            <th>Manufacturer</th>
            <th>Preferred Min Temperature (°C)</th>
            <th>Preferred Min Humidity (%)</th>
            <th>Preferred Min Light (lux)</th>
            <th>Preferred Max Temperature (°C)</th>
            <th>Preferred Max Humidity (%)</th>
            <th>Preferred Max Light (lux)</th>
        </tr>
    `;

    data.forEach(item => {
        html += `
        <tr>
            <td>${item.med_id}</td>
            <td>${item.med_name}</td>
            <td>${item.storage_id}</td>
            <td>${new Date(item.mfd).toLocaleDateString()}</td>
            <td>${new Date(item.expd).toLocaleDateString()}</td>
            <td>${item.manufacturer}</td>
            <td>${item.pref_min_temp}</td>
            <td>${item.pref_min_hum}</td>
            <td>${item.pref_min_light}</td>
            <td>${item.pref_max_temp}</td>
            <td>${item.pref_max_hum}</td>
            <td>${item.pref_max_light}</td>
        </tr>
        `;
    });

    html += `
    </table>

    </body>
    </html>
    `;

    return html;
}





const sendEmail=(data,title)=>{
    
    let mailOptions = {
      from: process.env.EMAIL,
      to: 'drmarsqueen@gmail.com',
      subject: title,
      html: generateHTMLTable(data,title)
    }
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    })

}

const data = [
    {
      med_id: 1,
      med_name: "Paracetamol 650",
      storage_id: 1,
      mfd: "2024-05-12T06:30:00.000Z",
      expd: "2024-05-15T06:30:00.000Z",
      manufacturer: "KM Medicals",
      pref_min_temp: "25.00",
      pref_min_hum: "75.00",
      pref_min_light: null,
      pref_max_temp: "37.00",
      pref_max_hum: "100.00",
      pref_max_light: null
    }
  ];

// sendEmail(data,`Expired Medicines - ${new Date().toLocaleDateString()}`);

module.exports=sendEmail;
