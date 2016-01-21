# Example Game Process
## First
1.Twitterログイン (POST api/users)

```
Example
POST api/users

- >
* 表示
{message: create users!}

* 内部

{ _id            : user_id,
  twitter_id     : twitter_id,
  longitude      : float_longitude,
  latitude       : float_latitude,
  is_abnormality : boolean
}

```


2.Bluetoothでユーザが通信

3.Host:(POST api/rooms + QueryにユーザIDを持たせて作成する．) Other:特に何もしない

```
Example
POST api/rooms?userID=1+2+3

- >
* 表示
{message: create rooms!}

* 内部(Room Model)
{ _id       : room_id,
  host_user : 1
}
* 内部(User Model)
{
  "_id": 1,
  "twitter_id": "ss_shopetan",
  "room_id": "1",
  "longitude": 1,
  "latitude": 2,
  "is_abnormality": "True"
}

```

4.Host:部屋情報を取得する．(GET api/rooms?_id)

```
Example
POST api/rooms?getRoomFromHostUserId=ss_shopetan

- >

* 表示
{ _id       : room_id,
  host_user : ss_shopetan
}
```

5.BlueToothによってroom_idを参加者ユーザに配布する．

## Second

### Game Start

1.各ユーザが自分自身の情報を更新する．(PUT api/users/:twitter_id)

```
Example
PUT api/users/:twitter_id

- >

* 表示
{ meaasage : successfuly update}

* 内部
DBの内容を更新する．

{ _id            : user_id,
  twitter_id     : twitter_id,
  longitude      : float_longitude,
  latitude       : float_latitude,
  is_abnormality : boolean
}
```

2.参加ユーザの情報を取得する． (GET api/users?getUsersFromRoomId)

#### アルゴリズム
GET api/users?getUsersFromRoomId
1.叩かれると，SQL文を発行し，room_id内のuser_idを取得する．
2.取得したuser_idを利用し，参加者の情報を取得し戻り値に返す．

```
Example
GET api/users?getUsersFromRoomId=1

- >

* 表示
[
  {
      "id": 1,
      "twitter_id": "ss_shopetan",
      "room_id": "1",
      "longitude": 1,
      "latitude": 2,
      "is_abnormality": "True",
  },
  {
      "id": 2,
      "twitter_id": "prpr_man",
      "room_id": "1",
      "longitude": 3,
      "latitude": 4,
      "is_abnormality": "False",
  }
]
```

## Last
1.Hostは終了時にroomを削除する． (DELETE api/rooms/:room_id)

```
Example
DELETE api/rooms/:room_id

- >

* 表示
{ meaasage : successfuly deleted}

```
