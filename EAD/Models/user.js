const jwt=require('jsonwebtoken');
const config=require('config');
const Joi= require('joi');
const mongoose= require('mongoose');

const userSchema=new mongoose.Schema({
name:{
  type:String,
  required:true,
},
email:{
  type:String,
  required:true,
},
password:{
  type:String,
  required:true,
},
isAdmin:{ 
  type:Boolean,
  default:false
},
about:{
  type:String,
  default:'Nothing to show.Update your profile.'
},
contact:{
  type:Number,
  default:null
},
address:{
  type:String,
  default:null
},
profilepic: {
    type: String,
    required: true,
    default: "no picture"
  }
});
userSchema.methods.generateAuthToken=function(){
  const token=jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get('jwtPrivateKey'));
  return token
}
const User= mongoose.model('User',userSchema)
function validateUser(user){
  const schema={
    name:Joi.string().required(),
    email:Joi.string().required().email(),
    password:Joi.string().required(),
    profilepic: Joi.string().required(),
    profilepicparse: Joi.any()
  };
  return Joi.validate(user,schema)
}

exports.User = User;
exports.validate =validateUser;

/* const token = req.header('x-auth-token')*/
