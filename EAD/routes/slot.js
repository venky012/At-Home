const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Slot = require('../Models/Slot').Slot

router.get('/allslots',async(req, res) => {
	const types = await Slot.find();
	res.send(types);
});

router.get('/dates',async(req, res) => {
    dates = []
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    var today = new Date()
    dates.push(today.getDate()+' '+monthNames[today.getMonth()]+' '+today.getFullYear())
	today.setDate(today.getDate()+1);
    dates.push(today.getDate()+' '+monthNames[today.getMonth()]+' '+today.getFullYear())
	today.setDate(today.getDate()+1);
    dates.push(today.getDate()+' '+monthNames[today.getMonth()]+' '+today.getFullYear())
    res.send(dates);
})


router.post('/addslot',async(req, res) => {
    const start = req.body.start;
    const end = req.body.end;
    const new_slot = new Slot({
        start_time:start,
        end_time:end
}); 
    await new_slot.save();
	res.send(new_slot);
});

module.exports = router;