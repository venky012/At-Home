const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Location = require('../Models/Location').Location

router.get('/cities',async(req, res) => {
	const types = await Location.find();
	res.send(types);
});

router.post('/addloco',async(req, res) => {
    const city1 = req.body.city;
    const lat1 = req.body.lat;
    const lng1 = req.body.lng;
    const new_loco = new Location({
        city:city1,
        lat:lat1,
        lng:lng1
}); 
    await new_loco.save();
	res.send(new_loco);
});

module.exports = router;