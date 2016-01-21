// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// sequelize prpr_man
var Sequelize = require('sequelize');
var database = new Sequelize('sample','','',{dialect:'sqlite',storage:'./database.db'});

// use Model
var User =  database.define('User', {
    twitter_id: Sequelize.STRING,
    room_id: Sequelize.STRING,
    longitude: Sequelize.INTEGER,
    latitude: Sequelize.INTEGER,
    is_abnormality: Sequelize.BOOLEAN
});
var Room =  database.define('Room', {
    host_user: Sequelize.STRING
});

User.belongsTo(Room);
Room.hasMany(User);

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
        var room = Room.build({
            host_user: req.body.host_user
        }).save();
        if(req.query.userID != null){
            var users = req.query.userID.split(" ");
            for(var i = 0;i<users.length;i++){
                User.find({ where: {twitter_id: users[i]} }).on('success', function(project) {
                    if (user) { // if the record exists in the db
                        project.updateAttributes({
                            room_id: "test"
                        }).success(function() {});
                    }
                });
                //User.update({room_id: 'test'},{ twitter_id: users[i]});
            }
        }
        res.json({message:'DB save success'});
    })

// get all the rooms (accessed at GET http://localhost:8080/api/rooms)
    .get(function(req, res) {
        
        if(req.query.getRoomFromHostUserID != null){
            req.params.host_user = req.query.getRoomFromHostUserID;
            Room.find({"host_user" : req.params.host_user}).populate('users').exec(function(err, room) {
                if (err)
                    res.send(err);
                res.json(room);
            });
        }else{
            Room.find().populate('users').exec( function(err, rooms) {
                if (err)
                    res.send(err);
                res.json(rooms);
            });
        }
    });

// on routes that end in /rooms/:room_id
// ----------------------------------------------------
router.route('/rooms/:room_id')

// get the room with that id (accessed at GET http://localhost:3000/api/rooms/:room_id)
    .get(function(req, res) {
        Room.findOne({"_id" : req.params.room_id}).populate('users').exec( function(err, room) {
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
        
        var user = User.build({
            twitter_id: req.body.twitter_id,
            room_id: req.body.room_id,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            is_abnormality: req.body.is_abnormality
        }).save();
        res.json({ message: 'User created!' });
    })

// get all the rooms (accessed at GET http://localhost:8080/api/users)
    .get(function(req, res) {

        if(req.query.getUsersFromRoomID != null){
            User.find({room_id: req.query.getUsersFromRoomID},function(err,users){
                if(err)
                    res.send(err);
                res.json(users);
            });
            
        }else{
            User.find(function(err, users) {
                if (err)
                    res.send(err);
                res.json(users);
            });
        }
    });

// on routes that end in /users/:twitter_id
// ----------------------------------------------------
router.route('/users/:twitter_id')

// get the user with that id (accessed at GET http://localhost:3000/api/users/:twitter_id)
    .get(function(req, res) {
        User.findOne({twitter_id: req.params.twitter_id}, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })
// update the user with this id (accessed at PUT http://localhost:3000/api/users/:twitter_id)
    .put(function(req, res) {
        
        // use our room model to find the user we want
        User.findOne({twitter_id : req.params.twitter_id}, function(err, user) {
            if (err)
                res.send(err);
            user.twitter_id = req.body.twitter_id;
            user.longitude = req.body.longitude;
            user.latitude = req.body.latitude;
            user.is_abnormality = req.body.is_abnormality;
            user.room_id = req.body.room_id;
            
            // save the bear
            user.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'User updated!' });
            });            
        });
    })

// delete the user with this id (accessed at DELETE http://localhost:3000/api/users/:twitter_id)
    .delete(function(req, res) {
        User.remove({
            twitter_id: req.params.twitter_id
        }, function(err, user) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });

// on routes that end in /tmps/:tmp_id
// ----------------------------------------------------
router.route('/tmps/:tmp_id')

// delete the user with this id (accessed at DELETE http://localhost:3000/api/tmps/:tmp_id)
    .delete(function(req, res) {
        Tmp.remove({
            _id: req.params.tmp_id
        }, function(err, tmp) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER AND CREATE DATABASE
// =============================================================================
database
    .sync({ force: true });
app.listen(port);
console.log('Magic happens on port ' + port);
