// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// use MongoDB
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/edisonHTTPRequestAPI'); // connect to our database

// use Model
var User       = require('./app/models/user');
var Room       = require('./app/models/room');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'Shopee!japan' });
});

// more routes for our API will happen here

// on routes that end in /users
// ----------------------------------------------------
router.route('/users')

// create a users (accessed at POST http://localhost:3000/api/users)
    .post(function(req, res) {
        
        var user = new User();      // create a new instance of the User model
        user.name = req.body.name;  // set the users name (comes from the request)
        
        // save the bear and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'User created!' });
        });
    })

// get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });

// on routes that end in /users/:user_id
// ----------------------------------------------------
router.route('/users/:user_id')

// get the user with that id (accessed at GET http://localhost:3000/api/users/:user_id)
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })
// update the user with this id (accessed at PUT http://localhost:3000/api/users/:user_id)
    .put(function(req, res) {
        
        // use our bear model to find the user we want
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            user.name = req.body.name;  // update the bears info
            // save the bear
            user.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'User updated!' });
            });            
        });
    })        

// delete the user with this id (accessed at DELETE http://localhost:3000/api/users/:user_id)
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
