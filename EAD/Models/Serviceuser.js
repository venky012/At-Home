const jwt=require('jsonwebtoken');
const config=require('config');
const Joi= require('joi');
const mongoose= require('mongoose');
const bcrypt = require('bcryptjs')
const serviceSchema=new mongoose.Schema({

token:{
  type:String,
  },

  email:{
  type:String,
  required:true,
},

organisation_name:{
  type:String,
  required:true,
},

// subscription_date:{
//     type:Date,
//     deafult:Date.now(),
//     required:true
// }

});

serviceSchema.methods.generateServiceToken=function(){
    const token=jwt.sign({_id:this._id},config.get('jwtPrivateKey'));
    return token
  }

const Serviceuser = mongoose.model('Serviceuser',serviceSchema)

serviceSchema.statics.checkAPI = async  (api) => {
    const api_key = await Serviceuser({token:api})
    if (!api_key){
        return {result:false}
    }
    return {result:true}

}

exports.Serviceuser = Serviceuser;

