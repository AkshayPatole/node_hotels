const mongoose = require('mongoose');

const menutItemSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    taste: {
        type: String,
        enum: ["sweet", 'spicy', "Mildly Spicy"],
        require: true,

    },
    is_drink: {
        type: String,
        default: false

    },
    ingredients: {
        type: [String],
        default: []
    }
})
const MenuItem = mongoose.model('MenuItem', menutItemSchema)
module.exports = MenuItem;