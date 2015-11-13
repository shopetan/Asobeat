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

