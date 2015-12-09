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
    res.json({ message: 'Post a test message.' });
});

// on routes that end in /rooms
// ----------------------------------------------------
router.route('/rooms')

// create a users (accessed at POST http://localhost:3000/api/rooms)
    .post(function(req, res) {
        
        var room = new Room();
        room.host_user = req.body.host_user;
        
        if(req.query.userID != null){
            var users = req.query.userID.split(" ");
            for(var i = 0;i<users.length;i++)
                room.users[i].user_id = users[i];
        }
        
        
        room.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Room created!' });
        });
    })

// get all the rooms (accessed at GET http://localhost:8080/api/rooms)
    .get(function(req, res) {
        
        Room.find(function(err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
        
    });

// on routes that end in /rooms/:room_id
// ----------------------------------------------------
router.route('/rooms/:room_id')

// get the room with that id (accessed at GET http://localhost:3000/api/rooms/:room_id)
    .get(function(req, res) {
        Room.findById(req.params.room_id, function(err, room) {
            if (err)
                res.send(err);
            res.json(room);
        });
    })
// update the room with this id (accessed at PUT http://localhost:3000/api/rooms/:room_id)
    .put(function(req, res) {
        
        // use our room model to find the user we want
        Room.findById(req.params.room_id, function(err, room) {
            if (err)
                res.send(err);
            room.name = req.body.name;  // update the rooms info
            // save the room
            room.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Room updated!' });
            });            
        });
    })

// delete the room with this id (accessed at DELETE http://localhost:3000/api/users/:room_id)
    .delete(function(req, res) {
        Room.remove({
            _id: req.params.room_id
        }, function(err, room) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });


// on routes that end in /users
// ----------------------------------------------------
router.route('/users')

// create a users (accessed at POST http://localhost:3000/api/users)
    .post(function(req, res) {
        
        var user = new User();      // create a new instance of the User model
        user.twitter_id = req.body.twitter_id;
        user.longitude = req.body.longitude;
        user.latitude = req.body.latitude;
        user.is_abnormality = req.body.is_abnormality;
        
        // save the room and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'User created!' });
        });
    })

// get all the rooms (accessed at GET http://localhost:8080/api/users)
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
        
        // use our room model to find the user we want
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            user.name = req.body.name;  // update the rooms info
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
