/**
 * Created by Julius Hernandez on 8/15/2015 while following along with the
 * MongoDB online course videos .
 */

var express = require('express');
var mongoose = require('mongoose');
var routes = require('./routes');
var path = require('path');
var consolidate = require('consolidate');

mongoose.connect('mongodb://localhost', function (err) {
    if (err) throw err;
    console.log("we connected!!! ");

    var app = express();
    routes(app); //rem. to pass in the app since our index.js file for this dir is here

    app.set('views', path.join(__dirname, 'views'));
    app.set('html', consolidate['swig']);
    app.get('/', function (req, res) {
        res.send(200, 'this is the start of the mongoose blog! ^_^');
    });

    app.listen(3000, function () {
        console.log("we are listening on port:3000  ^_^ !");
    });
});



