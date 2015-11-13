# Usage API Reference

|    Route    |   HTTP Verb  |  Description |
|:-----------:|:------------:|:------------:|
| /api                |      GET     |     Post a test message.                |
| /api/rooms          |      POST    |     Create room.             |
| /api/rooms          |      GET     |     Get all the rooms.                   |
| /api/rooms/:room_id |      GET     |     Get a single room.             |
| /api/rooms/:room_id |      PUT     |     Update a room with new info.    |
| /api/rooms/:room_id |      DELETE  |     Delete a room.                  |
| /api/users          |      POST    |     Create user.             |
| /api/users          |      GET     |     Get all the users.                   |
| /api/users/:user_id |      GET     |     Get a single user info.                  |
| /api/rooms/:user_id |      PUT    |     Update a user with new info.                  |

# api
## Methods
Post a test message

# api/rooms
## Methods
### GET
Get all the rooms.
### POST
Create room.

# api/rooms/:room_id
## Methods
### GET
Get a single room.
### PUT
Update a room with new info.
### DELETE
Delete a room.

# api/users
## Methods
### GET
Get all the users.
### POST
Create user.

# api/users/:user_id
## Methods
### GET
Get a single user info.
### PUT
Update a user with new info.
