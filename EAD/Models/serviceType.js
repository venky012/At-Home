const config=require('config');
const Joi= require('joi');
const mongoose= require('mongoose');

const serviceTypeSchema = new mongoose.Schema({
	service:{
	  _id:{
		  type:String,
		  required:true
	  },
	  name:{
		type:String,
		required:true,
	  }
	},

	service_type:{
	  type:String,
	  required:true,
	},

	cost:{
		type:Number,
		required:true,
	}
});

const ServiceType = mongoose.model('ServiceType', serviceTypeSchema)

function validateServiceType(ServiceType){
  const schema={
    service:Joi.object().required(),
    service_type:Joi.string().required(),
    cost:Joi.Number().required(),
  };
  return Joi.validate(ServiceType,schema)
}

exports.ServiceType = ServiceType;
exports.validate = validateServiceType;

