const _ = require('lodash');
const {Order} = require('../Models/Order');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Professional} = require('../Models/professional');
const {Slot} = require('../Models/Slot');
const {Service} = require('../Models/service');
const {User} = require('../Models/user')
const {Serviceuser} = require('../Models/Serviceuser')
const OrderItem=require('../Models/OrderItem').OrderItem;
const ServiceType=require('../Models/serviceType').ServiceType;
const {Serviceorder} = require('../Models/Serviceorder')
const {Notifications}= require ('../Models/notifications')
const {Chat} = require('../Models/chat')


router.post('/slotbooking',async(req, res) => {
	let type =await Order.findById(req.body.orderid);
	if (!type) return res.status(400).send('Order Does Not Exist!')
    let slot1 = await Slot.findById(req.body.id)
    date_type = req.body.select_date
    var d = new Date();
    if(date_type===1){
        d.setDate(d.getDate()+1);
    }
    if(date_type===2){
        d.setDate(d.getDate()+2);
    }
    type.order_date.date = d.getDate();
	type.order_date.month = d.getMonth()+1;
	type.order_date.year = d.getFullYear();
    type.slot=slot1
    await type.save()
    console.log(type)
    res.send(type.id);
});

router.post('/booking',async(req,res)=>{
    let type =await Order.findById(req.body.id);
	if (!type) return res.status(400).send('Order Does Not Exist!')

//     lat1 = req.body.lat;
//     lng1 = req.body.lng;
    lat1 = 0;
    lng1 = 0;
    address1 = req.body.address;
    city1 = req.body.city;
    type.address=[lat1,lng1,address1,city1]
    service_name = type.service_name;
    let serviceOne = await Service.findOne({name:service_name})
    const value = serviceOne.service_worker;
    const proffs = await Professional.find({profession:value,'locality.3':city1,is_available:true})
    var k = null;
    var flag=0;
    for ( k in proffs)
    {
       const prof_bookings = await Order.find({professional:proffs[k]._id, "order_date.date":type.order_date.date,"order_date.month":type.order_date.month,"order_date.year":type.order_date.year, 'slot._id':type.slot})
       const service_bookings = await Serviceorder.find({professional:proffs[k]._id, "order_date.date":type.order_date.date,"order_date.month":type.order_date.month,"order_date.year":type.order_date.year, 'slot._id':type.slot})
       const service_booking2 = await Serviceorder.find({professional:proffs[k]._id,is_bulk:true, "order_date.date":type.order_date.date,"order_date.month":type.order_date.month,"order_date.year":type.order_date.year})

       if(prof_bookings.length===0 && proffs[k].user._id != type.user_id && service_bookings.length===0 && service_booking2.length===0)
        {
            flag=1;
            type.professional=proffs[k]._id
            type.is_confirmed = true
            await type.save()
            let professional = await Professional.findById(type.professional)
            var notification=new Notifications({from:type.user_id,notification:"You have been alotted a new work!",url:'/displayorder',order_id:type._id,to:professional.user._id,new:true})
            await notification.save()
            res.send(type._id)
            return;
        }
    }
    if (flag===0) return res.status(400).send('slot not found')


})


router.post('/messagenotification',async(req,res)=>{
	const user= await User.findOne({_id:req.body.user_id})
	var notification=new Notifications({from:req.body.user_id,notification: `You can contact ${user.name} here`,order_id:req.body.order_id,to:req.body.professional_id,url:req.body.url,new:true})
	await notification.save()
	res.send(notification.id)
})

router.post('/addorganisation',async(req,res)=>{
    org_name = req.body.org_name;
    email1 = req.body.email;
    const seruser = new Serviceuser({
        email:email1,
        organisation_name:org_name
    })
    const token=seruser.generateServiceToken()
    seruser.token= token
    await seruser.save()
    res.send(seruser)
})

router.post('/getOrder',async(req,res)=>{
    let type =await Order.findById(req.body.id);
    if (!type) return res.status(400).send('Order Does Not Exist!')
    console.log(type.services_chosen)
    var chosen = {};
    var k = null;
    var temp = type.services_chosen;
    for(k in temp)
    {
        chosen[k] = temp[k].quantity
    }
    const professional = await Professional.findById(type.professional)
    const user = await User.findById(type.user_id)
    const slot = await Slot.findById(type.slot._id)
    const prof_user = await User.findById(professional.user._id)
    var ordered_date = type.order_date.date.toString() + '/' + type.order_date.month.toString() + '/' + type.order_date.year.toString()
    Orderdetails= {
        order_id:req.body.id,
        user_id:type.user_id,
        professional_id:professional.user._id,
    name:user.name,
    user_id:user._id,
    user_email:user.email,
    services_chosen:chosen,
    total_cost:type.total_cost,
    date:ordered_date,
    prof_name:professional.user.name,
    prof_phone:professional.phonenumber,
    slot:slot.start_time,
    address:type.address[2],
    city:type.address[3],
    prof_image: prof_user.profilepic,
    prof_email: prof_user.email,
    user_image: user.profilepic
}
res.send(Orderdetails)
})

router.get('/service/bulkbooking',async(req,res)=>{
    var res_token = req.query.api;
    let serorg = await Serviceuser.find({token:res_token})
    if (!serorg) return res.status(400).send('Organisation Invalid')
    var service_worker = req.query.profession;
    let service = await Service.findOne({service_worker:service_worker})
    let service_type = await ServiceType.findOne({service_type:'Installation','service._id':service._id})
    var total_cost = service_type.cost;
    var order_year = req.query.year;
    var order_month = req.query.month;
    var order_date = req.query.date;
    var phone_number = req.query.phonenumber;
    var username = req.query.username;
    var address = req.query.address;
    var city = req.query.city;
    var duration = req.query.days;
    var persons = req.query.count;
    const professionals = await Professional.find({profession:service_worker,'locality.3':city,is_available:true})
    if(professionals.length<persons){
        res.send({})
    }
    else{
        var dates = []
        var tomorrow = new Date(order_year+'-'+order_month+'-'+order_date);

        for(var i=0;i<duration;i++){
        dates.push({date:tomorrow.getDate(),month:tomorrow.getMonth()+1,year:tomorrow.getFullYear()})
        tomorrow.setDate(tomorrow.getDate()+1);
        }

        var bookings = []
        for(var d in dates){
            var count = 0;
            var day_bookings=[]
            for (var k=0;k< professionals.length;k++  ){

            const prof_bookings = await Order.find({professional:professionals[k]._id, "order_date.date":dates[d].date,"order_date.month":dates[d].month,"order_date.year":dates[d].year})
            const service_bookings = await Serviceorder.find({professional:professionals[k]._id, "order_date.date":dates[d].date,"order_date.month":dates[d].month,"order_date.year":dates[d].year})
            if(prof_bookings.length===0 && service_bookings.length===0){
                day_bookings.push(professionals[k]._id)
                count=count+1;
            }
            if(count>=persons){
                break;
            }
            }
            if(count != persons){

                res.send({})
                return;
            }
            bookings.push(day_bookings)
    }

    var to_send = {}
    for(var i in bookings){
        to_send_date = []
        for(var prof in bookings[i]){
            var order = new Serviceorder({
                token:res_token,
                service_name:service.name,
                total_cost:total_cost,
                address:[0,0,address,city],
                phone_number:phone_number,
                user_name:username,
                service_type:service_type.service_type,
                is_bulk:true,
                professional:bookings[i][prof],
                order_date:dates[i]
            })
            await order.save()
            var booked_professional = await Professional.findById(bookings[i][prof])
            to_send_date.push(booked_professional)

        }
        to_send[dates[i].date]=to_send_date;
    }
    res.send(to_send)
    return;
    }
})

router.get('/service/orderbooking',async(req,res)=>{
    var res_token = req.query.api;
    let serorg = await Serviceuser.find({token:res_token})
    if (!serorg) return res.status(400).send('Organisation Invalid')
    var service_worker = req.query.profession;
    let service = await Service.findOne({service_worker:service_worker})
    let service_type = await ServiceType.findOne({service_type:'Installation','service._id':service._id})
    var total_cost = service_type.cost;
    var order_year = req.query.year;
    var order_month = req.query.month;
    var order_date = req.query.date;
    var phone_number = req.query.phonenumber;
    var username = req.query.username;
    var address = req.query.address;
    var city = req.query.city;
    var order = new Serviceorder({
        token:res_token,
        service_name:service.name,
        total_cost:total_cost,
        address:[0,0,address,city],
        phone_number:phone_number,
        user_name:username,
        service_type:service_type.service_type
    })
    order.order_date.year=order_year;
    order.order_date.month=order_month;
    order.order_date.date=order_date;

    const proffs = await Professional.find({profession:service_worker,'locality.3':city,is_available:true})   

    const all_slots = await Slot.find()

    var k = null;var s = null;

    for ( k in proffs)
    {
        const service_booking = await Serviceorder.find({professional:proffs[k]._id,is_bulk:true, "order_date.date":order.order_date.date,"order_date.month":order.order_date.month,"order_date.year":order.order_date.year})

        if(service_booking.length===0)
        {
        for(s in all_slots)
        {
        const prof_bookings = await Order.find({professional:proffs[k]._id,"order_date.date":order.order_date.date,"order_date.month":order.order_date.month,"order_date.year":order.order_date.year, 'slot._id':all_slots[s]._id})
        const service_bookings = await Serviceorder.find({professional:proffs[k]._id, "order_date.date":order.order_date.date,"order_date.month":order.order_date.month,"order_date.year":order.order_date.year, 'slot._id':all_slots[s]._id})
        if(prof_bookings.length===0 && service_bookings.length===0)
	        {
	            order.professional = proffs[k]._id,
	            order.slot = all_slots[s]
	            await order.save();
	            res.send(proffs[k])
	            return;
	        }
    	}
        }
    }
		res.send({})
})


router.post('/notification',async(req,res)=>{
	const notifications= await Notifications.find({to:req.body.id}).select('notification order_id url');
	const a=notifications.map(noti=>{temp={}; temp['notification']=noti.notification;temp['order_id']=noti.order_id;temp['url']=noti.url; return temp})
	res.send(a.reverse());
})


router.post('/chat',async(req,res)=>{
	chat= new Chat({
		from: req.body.from,
		to: req.body.to,
		message: req.body.message
	});
	await chat.save()
	res.send(chat);
})

router.post('/getmessages',async(req,res)=>{
	const prof_to_user=await Chat.find({$or:[{to:req.body.user_id,from:req.body.professional_id},{to:req.body.professional_id,from:req.body.user_id}]})
	res.send(prof_to_user)
})

router.post('/allNotificationsChecked',async(req,res)=>{
	const notifications_notseen= await Notifications.find({new:true,to:req.body.user_id})
	res.send(notifications_notseen)
})

router.post('/clearNotifications',async(req,res)=>{
	Notifications.find({new:true,to:req.body.user_id},function (err, docs){
  docs.map(doc=>{doc.new = false;
  doc.save();}
	)
})
	res.send("done")
})

module.exports = router;
