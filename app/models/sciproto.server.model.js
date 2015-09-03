'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var personSchema = new Schema({
    _id: Number,
    name: String,
    age: Number,
    stories: [{type: Schema.Types.ObjectId, ref:'Story'}]
});

var storySchema = new Schema({
    _creator: {type:Number, ref:'Person'},
    title: String,
    fans: [{type:Number, ref:'Person'}]
});


/**
 * Sciproto Schema
 */
var SciprotoSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill Sciproto name',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Story', storySchema);
mongoose.model('Person', personSchema);
mongoose.model('Sciproto', SciprotoSchema);