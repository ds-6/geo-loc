const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userlocSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    lat:{
        type:String,
        required:true
    },
    long:{
        type:String,
        required:true
    }
},{timestamps:true});

const Userloc = mongoose.model('Userloc', userlocSchema);
module.exports= Userloc;
