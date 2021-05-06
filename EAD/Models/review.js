const mongoose= require('mongoose');

const reviewSchema = new mongoose.Schema({
	user_id : String,
	professional_id: String,
	review: String,
	service_name:String,
	rating:Number,
	order_id:String
});

const review = mongoose.model('review', reviewSchema)

exports.review = review;