const _ = require('lodash');
const ServiceType=require('../Models/serviceType').ServiceType;
const Service = require('../Models/service').Service;
const OrderItem=require('../Models/OrderItem').OrderItem;
const Order = require('../Models/Order').Order;
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/all',async(req, res) => {
	const types = await Order.find();
	res.send(types);
});

router.post('/makeorder',async(req, res) => {
	
	const temp=req.body;
	console.log(`user id ${temp.user_id}`)
	console.log(`checking backend ${req.body}`)

	const order = new Order({
		services_chosen:{},
		total_cost:0,
	});

	var sermodel = null;
	total_sum = 0
	let orderItem = null;
	for (var k in temp) {
		if(k==='user_id'){
			continue;
		}
		console.log(`this is value of k ${temp[k]}`);
		orderItem = await ServiceType.findOne({service_type:k});	
		const item = new OrderItem({
			service_type:orderItem.service_type,
			cost:orderItem.cost,
			quantity:parseInt(temp[k])
		});
		await item.save()
		just = orderItem.service_type;
		order.services_chosen[just] = item;

		order.markModified('services_chosen');
		total_sum = total_sum + (orderItem.cost * temp[k]);
		}
	
	order.total_cost = total_sum;
	sermodel = orderItem.service.name;
	let serOne = await Service.findOne({name:sermodel})	
	order.service_name = serOne.name
	order.user_id = temp.user_id

	// var d = new Date();
	// order.order_date.date = d.getDate();
	// order.order_date.month = d.getMonth()+1;
	// order.order_date.year = d.getFullYear();
	
	await order.save()
	console.log(`order: ${order}`)
	res.send(order.id);
});

module.exports = router;