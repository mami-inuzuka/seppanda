<p align="center">
  <img src="https://user-images.githubusercontent.com/52844263/159655740-b56565b3-56a3-40e3-bdee-3ffec5c37752.png" width="600px">
</p>


<br>


# seppanda(せっぱんだ)とは 🐼👛
### 概要
**seppanda**は「割り勘したいけどどちらかが一旦支払っておく」というシーンが多いカップルにおすすめの割り勘計算アプリです。<br>
支払った側がその金額をメモしておくだけで最終的にどちらがいくらお金を渡せばいいのかを常に確認することができます。

<br>

<p align="center">
  <img src="https://user-images.githubusercontent.com/52844263/159655934-7ce694a5-eb3f-4f52-bc63-57c9a072eceb.png" width="600px">
</p>



<br>

### サービス利用の流れ

![新規登録（招待する人）](https://user-images.githubusercontent.com/52844263/157189632-c0b180ba-7a5d-4baa-ba31-a6f96cdc75be.png)
![新規登録（招待された人）](https://user-images.githubusercontent.com/52844263/157189643-d2d8f9de-f1bf-477a-a054-4c8c35d8ae87.png)
![支払い情報の入力](https://user-images.githubusercontent.com/52844263/157189656-55cb2f52-dc6f-426c-b30c-8352f2ac6a3c.png)
![精算](https://user-images.githubusercontent.com/52844263/157189666-b8c447cb-be55-471c-b702-09cc77d4d9f9.png)


# URL
```
https://seppanda.com
```

# 開発環境
* ruby 3.0.1
* Rails 6.1.4.4
* React 17.0.2
* TypeScript 4.5.4
* redis（ [firebase-auth-rails](https://github.com/penguinwokrs/firebase-auth-rails) で必要)

# セットアップ
### Rails（バックエンド）
```
$ bin/setup
$ rails server
```
### React（フロントエンド）
```
$ cd /frontend
$ yarn install
$ npm run start
```
### redis-serverの起動
```
$ redis-server /usr/local/etc/redis.conf
```
### 証明書の取得
```
$ rails firebase:certificates:force_request
```

# テスト・Lint
### Rails
```
$ bundle exec rubocop
$ bundle exec rspec
```
### React
```
$ cd /frontend
$ yarn lint
$ yarn test
```


