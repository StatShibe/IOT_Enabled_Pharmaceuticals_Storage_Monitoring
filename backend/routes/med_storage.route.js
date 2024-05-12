const express = require('express');
const db = require('../config/DBConnect');

const router = express.Router();

router.get('/',async(req,res)=>{
    const result = await db.query('SELECT * FROM MEDS_STORAGE');
    res.status(200).send(result.rows);
})

module.exports = router;

