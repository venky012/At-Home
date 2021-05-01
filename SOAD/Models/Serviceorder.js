const mongoose= require('mongoose');

const Serviceorderschema = new mongoose.Schema({
	token:{
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

	is_bulk:{
		type:Boolean,
		default:false
	},
    
	service_type:{
		type:String,
		required:true
	},
	
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
	phone_number:{
		type:Number,
	},
	user_name:{
		type:String,
	}

});

const Serviceorder = mongoose.model('Serviceorder', Serviceorderschema)

exports.Serviceorder = Serviceorder