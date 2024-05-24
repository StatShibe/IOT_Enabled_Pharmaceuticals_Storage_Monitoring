const express = require('express');
const db = require('../config/DBConnect');

const router = express.Router();

router.get('/',async(req,res)=>{
    const result = await db.query('SELECT * FROM history');
    res.status(200).send(result.rows);
})
router.get('/temperature',async(req,res)=>{
    const result = await db.query('SELECT time, temp FROM history order by time');
    res.status(200).send(result.rows);
})
router.get('/humidity',async(req,res)=>{
    const result = await db.query('SELECT time, humidity FROM history order by time');
    res.status(200).send(result.rows);
})

router.get('/all-desc',async(req,res)=>{
    const result = await db.query('SELECT * FROM history order by time desc');
    res.status(200).send(result.rows);
})

router.get('/month/:id',async(req,res)=>{
    const result = await db.query(`SELECT * FROM history WHERE time BETWEEN '2024-${req.params.id}-01 00:00:00'::timestamp AND '2024-${req.params.id}-28 23:59:59'::timestamp;`);
    res.status(200).send(result.rows);
})
module.exports = router;

