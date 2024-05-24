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
module.exports = router;

