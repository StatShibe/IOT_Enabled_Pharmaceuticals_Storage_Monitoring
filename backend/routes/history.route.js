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

module.exports = router;

