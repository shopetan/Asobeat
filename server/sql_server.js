// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// sequelize
var Sequelize = require('sequelize');

// use Model
var User       = require('./app/models/user');
var Room       = require('./app/models/room');
var Device       = require('./app/models/device');
User.belongsTo(Room, {foreignKey: 'room_id'});
Room.hasMany(User , {foreignKey: 'room_id'});

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
                User.findOne({ where: {twitter_id: users[i]} }).then(function(user) {
                    if(user){
                        Room.findOne({where:{host_user: req.body.host_user}})
                            .then(function(room)
                                  {
                                      var RoomId = room.dataValues.id;
                                      user.updateAttributes({
                                          room_id: RoomId
                                      }).then(function(log){
                                          console.log(log.dataValues.twitter_id + " is Updated");
                                      });
                                  });
                    }
                });
            }
            res.json({message:'DB save success'});
        }
    })

// get all the rooms (accessed at GET http://localhost:8080/api/rooms)
    .get(function(req, res) {
        
        if(req.query.getRoomFromHostUserId != null){
            req.params.host_user = req.query.getRoomFromHostUserId;
            Room.findAll({where:{host_user:req.params.host_user}})
                .then(function(room){
                    res.json(room);
                })
                .catch(function(err) {
                    if(err)
                        res.json(err);
                });
        }else{
            Room.findAll()
                .then(function(room){
                    res.json(room);
                })            
                .catch(function(err) {
                    if(err)
                        res.json(err);
                });
        }
    });

// on routes that end in /rooms/:room_id
// ----------------------------------------------------
router.route('/rooms/:room_id')

// get the room with that id (accessed at GET http://localhost:3000/api/rooms/:room_id)
    .get(function(req, res) {
        Room.findById(req.params.room_id)
            .then(function(room){
                res.json(room);
            })
            .catch(function(err) {
                if(err)
                    res.json(err);
            });
    })
// update the room with this id (accessed at PUT http://localhost:3000/api/rooms/:room_id)
    .put(function(req, res) {
        
        // use our room model to find the user we want
        Room.findById(req.params.room_id)
            .then(function(room){
                room.updateAttributes({
                    id: req.body.id,
                    host_user: req.body.host_user
                }).then(function(log){
                    console.log("Room_id: " + log.dataValues.id + " is Updated");
                });
                res.json({ message: 'Room updated!' });
            })
            .catch(function(err) {
                if(err)
                    res.json(err);
            });
    })

// delete the room with this id (accessed at DELETE http://localhost:3000/api/users/:room_id)
    .delete(function(req, res) {
        Room.destroy({where:{id: req.params.room_id}})
            .then(function(){
                res.json({ message: 'Successfully deleted' });
            })
            .catch(function(err) {
                if(err)
                    res.json(err);
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
        })
                .save().then(function(){
                    res.json({ message: 'User created!' });
                })
                .catch(function(err) {
                    if(err)
                        res.json(err);
                });
    })

// get all the rooms (accessed at GET http://localhost:8080/api/users)
    .get(function(req, res) {
        
        if(req.query.getUsersFromRoomId != null){
            req.params.room_id = req.query.getUsersFromRoomId;
            User.findAll({where:{room_id:req.params.room_id}})
                .then(function(user){
                    res.json(user);
                })
                .catch(function(err) {
                    if(err)
                        res.json(err);
                });
        }else{
            User.findAll()
                .then(function(user){
                    res.json(user);
                })
                .catch(function(err) {
                    if(err)
                        res.json(err);
                });
        }
    });

// on routes that end in /users/:twitter_id
// ----------------------------------------------------
router.route('/users/:twitter_id')

// get the user with that id (accessed at GET http://localhost:3000/api/users/:twitter_id)
    .get(function(req, res) {
        User.findOne({where:{twitter_id:req.params.twitter_id}})
            .then(function(user){
                res.json(user);
            })
            .catch(function(err) {
                if(err)
                    res.json(err);
            });
    })
// update the user with this id (accessed at PUT http://localhost:3000/api/users/:twitter_id)
    .put(function(req, res) {
        
        // use our room model to find the user we want
        User.findOne({where:{twitter_id:req.params.twitter_id}})
            .then(function(user){
                user.updateAttributes({
                    id: req.body.id,
                    twitter_id: req.body.twitter_id,
                    longitude: req.body.longitude,
                    latitude: req.body.latitude,
                    is_abnormality: req.body.is_abnormality,
                    room_id:req.body.room_id
                }).then(function(log){
                    console.log("user_id: " + log.dataValues.id + " is Updated");
                });
                res.json({ message: 'User updated!' });
            })
            .catch(function(err) {
                if(err)
                    res.json(err);
            });
    })

// delete the user with this id (accessed at DELETE http://localhost:3000/api/users/:twitter_id)
    .delete(function(req, res) {
        User.destroy({where:{twitter_id: req.params.twitter_id}})
            .then(function(){
                res.json({ message: 'Successfully deleted' });
            })
            .catch(function(err) {
                if(err)
                    res.json(err);
            });
    });

// on routes that end in /device
// ----------------------------------------------------
router.route('/devices')

// create a device (accessed at POST http://localhost:3000/api/devices)
    .post(function(req, res) {
        
        var device = Device.build({
            device_id: req.body.device_id
        })
                .save().then(function(){
                    res.json({ message: 'Device created!' });
                })
                .catch(function(err) {
                    if(err)
                        res.json(err);
                });
    })

// get all the device (accessed at GET http://localhost:8080/api/devices)
    .get(function(req, res) {        
        Device.findAll()
            .then(function(device){
                res.json(device);
            })
            .catch(function(err) {
                if(err)
                    res.json(err);
            });
    });

// on routes that end in /devices/:device_id
// ----------------------------------------------------
router.route('/devices/:device_id')

// get the device with that id (accessed at GET http://localhost:3000/api/devices/:device_id)
    .get(function(req, res) {
        Device.findOne({where:{device_id:req.params.device_id}})
            .then(function(device){
                res.json(device);
            })
            .catch(function(err) {
                if(err)
                    res.json(err);
            });
    })
// update the device with this id (accessed at PUT http://localhost:3000/api/devices/:device_id)
    .put(function(req, res) {
        
        Device.findOne({where:{device_id:req.params.device_id}})
            .then(function(device){
                device.updateAttributes({
                    id: req.body.id,
                    device_id: req.body.device_id
                }).then(function(log){
                    console.log("device_id: " + log.dataValues.id + " is Updated");
                });
                res.json({ message: 'User updated!' });
            })
            .catch(function(err) {
                if(err)
                    res.json(err);
            });
    })

// delete the device with this id (accessed at DELETE http://localhost:3000/api/devices/:device_id)
    .delete(function(req, res) {
        Device.destroy({where:{device_id: req.params.device_id}})
            .then(function(){
                res.json({ message: 'Successfully deleted' });
            })
            .catch(function(err) {
                if(err)
                    res.json(err);
            });
    });



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER 
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
