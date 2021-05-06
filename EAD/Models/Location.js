const mongoose= require('mongoose');

const loco = new mongoose.Schema({
    
    city:{
        type:String,
        require:true
    },
    lat:{
        type:Number,
        required:true
    },

    lng:{
        type:Number,
        required:true
    },

});

const Location = mongoose.model('Location', loco)

exports.Location = Location;