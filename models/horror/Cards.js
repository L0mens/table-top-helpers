const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const miniCardsSchema = new Schema({
    name : {
        type: String,
        required: "Une carte doit avoir un nom"
    },
    cardType : {
        type: String,
        required :  "Une carte doit posséder un type"
    },
    cardSousType : {
        type: String,
        required :  "Une carte doit posséder un sous type"
    },
    text : {
        type : String,
        required : "Une carte ne peux être vide"
    },
    backText : String,
    trigger : String,
    origin : {
        type : String,
        default: "Jeu de base",
        required : "Cette carte doit appartenir à un jeu"
    },
    image: String
});
 module.exports = mongoose.model('HorrorMiniCards', miniCardsSchema);