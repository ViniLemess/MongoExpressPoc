const mongoose = require('mongoose')

const Animal = mongoose.model('Animal', {
    breed:String,
    size:Number,
    puppy:Boolean
})

module.exports = Animal