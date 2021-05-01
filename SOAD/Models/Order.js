const mongoose= require('mongoose');

const order = new mongoose.Schema({
	user_id:{
		type:String,
		required:true
	},

	professional:{
		
			type:String,
			required:false
	
	},

	slot:{
		_id:{
			type:String,
			required:false,
		}
	},
	services_chosen:mongoose.Schema.Types.Mixed,
	
	service_name:{
			type:String,
			required:true
	},
	
	total_cost:{
		type:Number,
		required:false,
	},

	address:{
		type:Array,
		required:false
	},
	order_date:{
		year:{
			type:Number
		},
		month:{
			type:Number
		},
		date:{
			type:Number
		}
	},
	is_paid:{
		type:Boolean,
		default:false
	},
	is_confirmed:{
		type:Boolean,
		default:false
	}

});

const Order = mongoose.model('Order', order)

exports.Order = Order