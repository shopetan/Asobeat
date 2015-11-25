# Usage API Reference

|    Route    |   HTTP Verb  |  Description |
|:-----------:|:------------:|:------------:|
| /api                |      GET     |     Post a test message.                |
| /api/rooms          |      POST    |     Create room.                        |
| /api/rooms          |      GET     |     Get all the rooms.                  |
| /api/rooms/:room_id |      GET     |     Get a single room from room ID.     |
| /api/rooms/:room_id |      PUT     |     Update a room with new info.        |
| /api/rooms/:room_id |      DELETE  |     Delete a room.                      |
| /api/rooms/:user_id |      GET     |     Get a single room from host user ID.|
| /api/users          |      POST    |     Create user.                        |
| /api/users          |      GET     |     Get all the users.                  |
| /api/users/:user_id |      GET     |     Get a single user info.             |
| /api/users/:user_id |      PUT     |     Update a user with new info.        |
| /api/users/:user_id |      DELETE  |     Delete a user.                      |
| /api/users/:room_id |      GET     |     Get users from room ID.             |

# api
## Methods
Post a test message
![api](http://i.imgur.com/Om2PGoP.png?1)

# api/rooms
## Methods
### GET
Get all the rooms.

### POST
Create room.


# api/rooms/:room_id
## Methods
### GET
Get a single room from room ID.
### PUT
Update a room with new info.
### DELETE
Delete a room.


# api/rooms/:user_id
## Methods
### GET
Get a single room from host user ID.


# api/users
## Methods
### GET
Get all the users.
![post](http://i.imgur.com/buP8siA.png?1)

### POST
Create user.
![post](http://i.imgur.com/FwxE0rv.png?1)

#### QueryParam
##### userID

```
Example
POST api/rooms?userID=1+2+3

- >
* Result
{message: create rooms!}

```


# api/users/:user_id
## Methods
### GET
Get a single user info.
![GET](http://i.imgur.com/3ALMyqJ.png?1)

### PUT
Update a user with new info.
![PUT](http://i.imgur.com/UcGAHQ9.png?1)

### DELETE
Delete a user.
![DELETE](http://i.imgur.com/O8x1eb0.png?1)


# api/users/:room_id
## Methods
### GET
Get users from room ID.

```
Example
GET api/users/:room_id

- >

* 表示
{ join_user : [
  { _id            : user_id,
    twitter_id     : twitter_id,
    longitude      : float_longitude,
    latitude       : float_latitude,
    is_abnormality : boolean
  },
  { _id            : user_id,
    twitter_id     : twitter_id,
    longitude      : float_longitude,
    latitude       : float_latitude,
    is_abnormality : boolean
  },
  
  ...
  { _id            : user_id,
    twitter_id     : twitter_id,
    longitude      : float_longitude,
    latitude       : float_latitude,
    is_abnormality : boolean
  }
  ]}
  
```

