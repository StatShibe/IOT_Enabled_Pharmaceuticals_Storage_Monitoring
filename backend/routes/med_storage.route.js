const express = require('express');
const db = require('../config/DBConnect');

const router = express.Router();

router.get('/all',async(req,res)=>{
    const result = await db.query('SELECT * FROM MEDS_STORAGE');
    res.status(200).send(result.rows);
});

router.get('/expired',async(req,res)=>{
    const result = await db.query('SELECT * FROM MEDS_STORAGE where expd <= $1',[new Date()]);
    res.status(200).send(result.rows);
});

router.get('/',async(req,res)=>{
    const result = await db.query('SELECT * FROM MEDS_STORAGE where expd > $1',[new Date()]);
    res.status(200).send(result.rows);
});

router.get('/risk', async(req,res)=>{
    let result =await db.query("Select * from current_data");
    const currentData = result.rows[0];
    result = await db.query('SELECT * FROM MEDS_STORAGE WHERE pref_min_temp > $1 OR PREF_MAX_TEMP < $2 OR PREF_MIN_HUM > $3 OR PREF_MAX_HUM < $4',[currentData.temp_in_c,currentData.temp_in_c, currentData.humidity, currentData.humidity]);
    res.status(200).send(result.rows);
})
module.exports = router;

