//const config=require('config');
const Joi= require('joi');
const mongoose= require('mongoose');

const serviceSchema = new mongoose.Schema({
	name : String,
	about: String,
	service_worker: String,
	reviews:mongoose.Schema.Types.Mixed,
});

const Service = mongoose.model('Service', serviceSchema)

exports.Service = Service;