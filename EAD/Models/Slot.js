const mongoose= require('mongoose');

const slot = new mongoose.Schema({
	start_time:{
        type:String,
        required:true
    },

    end_time:{
        type:String,
        required:true
    },

});

const Slot = mongoose.model('Slot', slot)

exports.Slot = Slot