//const config=require('config');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const review = require('../Models/review').review;
const Service = require('../Models/service').Service;
const {Professional}=require('../Models/professional');
const {User}=require('../Models/user');

router.get('/all', async(req, res) => {
    all_reviews = await review.find();
    res.send(all_reviews)
});

router.get('/professional/reviews/:prof_id', async(req, res) => {
    const prof_review = await review.find({ professional_id: req.params.prof_id })
    if(!prof_review) return res.status(400).send('Professional Does not Exist!')
    res.send(prof_review)
});

router.get('/user/reviews/:user_id', async(req, res) => {
    const user_review = await review.find({ user_id: req.params.user_id })
    if(!user_review) return res.status(400).send('User Does not Exist!')
    res.send(user_review)
});

router.get('/:serviceName', async(req, res) => {
    const find_service = await Service.findOne({ name: req.params.serviceName })
    const service_reviews = await review.find({ service_name: find_service.service_worker })
    if(!service_reviews) return res.status(400).send('Service Does not Exist!')
    res.send(service_reviews)
});

router.get('/user_names/:serviceName', async(req, res) => {
    const find_service = await Service.findOne({ name: req.params.serviceName })
    const service_reviews = await review.find({ service_name: find_service.service_worker })
    if(!service_reviews) return res.status(400).send('Service Does not Exist!')
    var users = {}
    for (var i in service_reviews){
        const user_ser = await User.findById(service_reviews[i].user_id)
        users[service_reviews[i].user_id] = user_ser.name.charAt(0).toUpperCase() + user_ser.name.slice(1)
    }
    res.send(users)
});

router.get('/user_names/profile/:id', async(req, res) => {
    const service_reviews = await review.find({ user_id: req.params.id })
    if(!service_reviews) return res.status(400).send('User Does not Exist!')
    var users = {}
    for (var i in service_reviews){
        const user_ser = await Professional.findById(service_reviews[i].professional_id)
        users[service_reviews[i].professional_id] = user_ser.user.name.charAt(0).toUpperCase() + user_ser.user.name.slice(1)
        console.log(user_ser)
    }
    res.send(users)
});

router.get('/prof_names/:serviceName', async(req, res) => {
    const find_service = await Service.findOne({ name: req.params.serviceName })
    const service_reviews = await review.find({ service_name: find_service.service_worker })
    if(!service_reviews) return res.status(400).send('Service Does not Exist!')
    var users = {}
    for (var i in service_reviews){
        const user_ser = await Professional.findById(service_reviews[i].professional_id)
        users[service_reviews[i].professional_id] = user_ser.user.name.charAt(0).toUpperCase() + user_ser.user.name.slice(1)
        console.log(user_ser)
    }
    res.send(users)
});


router.post('/', async(req, res) => {
    const prof_id = req.body.professional_id
    const profService = await Professional.find({"_id":prof_id})
    console.log(profService[0].profession)
    Review = new review({
        user_id: req.body.user_id,
        professional_id: req.body.professional_id,
        review: req.body.review,
        service_name:profService[0].profession,
        rating: req.body.rating,
        order_id: req.body.order_id
    })

    await Review.save()

    res.send(Review)

});


module.exports = router;
