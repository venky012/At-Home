const auth=require('../middleware/auth')
const config=require('config');
const jwt= require('jsonwebtoken');
const bcrypt=require('bcryptjs')
const _ = require('lodash')
const {User,validate}=require('../Models/user')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Professional} = require('../Models/professional');
const {Order} =  require('../Models/Order')
const {Slot} = require('../Models/Slot')
const multer = require("multer");
const uuidv1=require('uuid/v1');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null,uuidv1()+ file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  //accept on certain types of files

  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 100 },
  fileFilter: fileFilter
}).single("profilepicparse");


router.get('/adetails',async(req,res)=>{
  console.log('inconsole')
  const users= await User.find()
  const professionals = await Professional.find()
  const orders = await Order.find({is_confirmed:true})
  var Admindetails = {
    no_users : users.length,
    no_professionals : professionals.length,
    no_orders : orders.length
  }

  res.send(Admindetails);
});


router.get('/loggedin',auth,async(req,res)=>{
  const user= await User.findById(req.user._id).select('-password')
  res.send(user);
});

router.get('/all',async(req,res)=>{
  const user= await User.find()
  res.send(user);
})


router.get('/:id',async(req,res)=>{
  const user = await User.findById(req.params.id)
  res.send(user);
})

router.get('/mybookings/:id',async(req, res)=>{
  const order = await Order.find({user_id:req.params.id,is_confirmed:true})
  var item = null;
  orders = [];
  for(item in order){
    temp =   order[item];
    var professional = await Professional.findById(temp.professional)
    var slot = await Slot.findById(temp.slot._id)
    var ordered_date = temp.order_date.date.toString() + '/' + temp.order_date.month.toString() + '/' + temp.order_date.year.toString()
    var ser_chosen= [];var item2=null;
    for(item2 in temp.services_chosen)
    {
      ser_chosen.push(item2)
    }
    var Orderdetails= {
      order_id:temp._id,
      professional_id: professional._id,
      user_id: req.body.id,
      services_chosen:ser_chosen,
      total_cost:temp.total_cost,
      date:ordered_date,
      prof_name:professional.user.name,
      prof_phone:professional.phonenumber,
      slot:slot.start_time,
      address:temp.address[2],
      city:temp.address[3],
  }
  orders.push(Orderdetails)
  }
  res.send(orders.reverse());
})

router.post('/updateprofile',async(req, res)=>{
  const about = req.body.about
  const contact = req.body.contact
  const email = req.body.email
  const address = req.body.address
  console.log('...................................................................')
  console.log(req.body.contact)
  User.findOne({ _id: req.body.id }, function (err, doc){
    console.log(doc)
    // if(doc != null){
    if(about){
      doc.about = about;
    }
    if(contact){
      doc.contact = contact;
    }
    if(email){
      doc.email = email;
    }
    if(address){
      doc.address = address;
    }



    doc.save();
  // }
  });

res.send('Updated')
})





router.get('/mypendingpayments/:id',async(req, res)=>{
  const order = await Order.find({user_id:req.params.id,is_paid:false,is_confirmed:true})
  var item = null;
  orders = [];
  for(item in order){
    temp =   order[item]; 
    var professional = await Professional.findById(temp.professional)
    var slot = await Slot.findById(temp.slot._id)  
    var ordered_date = temp.order_date.date.toString() + '/' + temp.order_date.month.toString() + '/' + temp.order_date.year.toString()
    var ser_chosen= [];var item2=null;
    for(item2 in temp.services_chosen)
    {
      ser_chosen.push(item2)
    }
    var Orderdetails= {
      order_id:temp._id,
      professional_id: professional._id,
      user_id: req.body.id,
      services_chosen:ser_chosen,
      total_cost:temp.total_cost,
      date:ordered_date,
      prof_name:professional.user.name,
      prof_phone:professional.phonenumber,
      slot:slot.start_time,
      address:temp.address[2],
      city:temp.address[3],
  }
  orders.push(Orderdetails)
  }
  res.send(orders.reverse());
})




router.post('/showprofile',async(req, res)=>{
  const user= await User.findById(req.body.id).select('-password')
  const professional_details = await Professional.findOne({"user._id":user._id});
  const arr = []
  arr.push(user.name)
  arr.push(user.email)
  arr.push(professional_details.locality)
  arr.push(professional_details.profession)
  arr.push(professional_details.phonenumber)
  res.send(arr);
})

router.post('/',upload,async(req, res)=>{
  console.log(req.file);
  console.log(req.body);
  const {error} = validate(req.body);
  if(error) return res.status (400).send(error.details[0].message);

  let user =await User.findOne({email:req.body.email});
  if (user) return res.status(400).send('User already registered')

  user= new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    profilepic: req.file.path
  });
  const salt=await bcrypt.genSalt(10);
  user.password=await bcrypt.hash(user.password,salt)
  /* can also be written as
  user= new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  */

  await user.save()
  const token=user.generateAuthToken();

  userDetails={
    user:user,
    token:token
  }

  res.send(userDetails)

});



module.exports = router;
