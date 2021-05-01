const mongoose= require('mongoose');

const orderItem = new mongoose.Schema({
	service_type:{
	  type:String,
	  required:false,
	},
	cost:{
		type:Number,
		required:false,
	},
	quantity:{
		type:Number,
		required:false,
	}
});

const OrderItem = mongoose.model('OrderItem', orderItem)

exports.OrderItem = OrderItem