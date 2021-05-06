const _ = require('lodash');
const ServiceType=require('../Models/serviceType').ServiceType;
const Service = require('../Models/service').Service;
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/all',async(req, res) => {
	const types = await ServiceType.find();
	res.send(types);
});

router.get('/:name',async(req, res) => {
	const types = await ServiceType.find({"service.name":req.params.name});
	res.send(types);
});

router.post('/addType',async(req, res) => {
	let type =await Service.findOne({name:req.body.name});
	console.log(req.body.name);
	console.log(req.body);
	if (!type) return res.status(400).send('Service Does Not Exist!')
	const Type = new ServiceType({
		service:type,
		service_type:req.body.service_type,
		cost:req.body.cost
	});

	await Type.save()
	res.send(Type);
});

router.post('/delete/:name', async(req, res) => {
	const result = await ServiceType.deleteOne({ service_type:req.params.name });
	const services_left = await ServiceType.find();
	res.send(services_left);
});

module.exports = router;
