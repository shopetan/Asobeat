# 今出来ること
* GETで一覧取得
* POSTで新規データ作成

が出来るようになりました．

## 注意
mongo DBを使用しています．

```
$ sudo mongod --dbpath /var/db/mongo/
```
でサーバ起動後，

```
$ mongo
> use edisonHTTPRequestAPI
> db.createCollection('user')
{ "ok" : 1 }
> show collections
system.indexes
user
> quit()
```

この手順を踏んでDBを作成する必要がある．コレクションは作成不要かも?


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

* 内部
{ _id       : room_id,
  user      : [
  {user_id: 1},
  {user_id: 2},
  {user_id: 3}
  ],
  host_user : 1
}
```

4.Host:部屋情報を取得する．(GET api/rooms/:user_id)

```
Example
POST api/rooms/:user_id

- >

* 表示
{ _id       : room_id,
  user      : [
  {user_id: 1},
  {user_id: 2},
  {user_id: 3}
  ],
  host_user : 1
}
```

5.BlueToothによってroom_idを参加者ユーザに配布する．

## Second

### Game Start

1.各ユーザが自分自身の情報を更新する．(PUT api/users/:user_id)

```
Example
PUT api/users/:user_id

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

2.参加ユーザの情報を取得する． (GET api/users/:room_id)

#### アルゴリズム
GET api/users/:room_id
1.叩かれると，SQL文を発行し，room_id内のuser_idを取得する．
2.取得したuser_idを利用し，参加者の情報を取得し戻り値に返す．

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

## Last
1.Hostは終了時にroomを削除する． (DELETE api/rooms/:room_id)

```
Example
DELETE api/rooms/:room_id

- >

* 表示
{ meaasage : successfuly deleted}

```
