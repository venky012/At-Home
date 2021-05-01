//const config=require('config');
const Joi= require('joi');
const mongoose= require('mongoose');

const chatSchema = new mongoose.Schema({
	from : {
      type:String,
      required:true
    },
	to: {
      type:String,
      required:true
    },
	message: {
      type:String,
      required:true
    },
    date:{
      type:Date,
      required:true,
      default:Date.now
    },

});

const Chat = mongoose.model('Chat', chatSchema)

exports.Chat = Chat;
