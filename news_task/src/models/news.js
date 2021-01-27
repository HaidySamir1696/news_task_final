
const mongoose = require('mongoose')

const newsSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    reporter:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Reporter'
    }
},


{
    timestamps: true,


})

const News = mongoose.model("News",newsSchema)
module.exports = News 