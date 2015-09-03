'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Core Schema
 */
var CoreSchema = new Schema({
	// Core model fields
    title: {
        type: String,
        default: '',
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        default: 'Your comments?',
        trim: true
    }
	// ...
});

mongoose.model('Core', CoreSchema);
