# js-frameworks-todolist

１人前のフロントエンドエンジニアになるべく、いろんなフレームワークに触れてみようのリポジトリです。

**[react](https://ja.reactjs.org/)**

**[angular](https://angular.jp/)**

**[vue](https://jp.vuejs.org/index.html)**

**[jquery](https://jquery.com/)**

# 環境構築

### react

```
$ npx create-react-app app-name
```

### angular

```
$ npm install @angular/cli --save

$ ng new app-name
```

### vue

```
$ npm install -g @vue/cli

$ vue init webpack app-name  -> 2.x系
$ vue create app-name -> 3.x系
```

### jquery

**CDN**

```html
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
```

**webpack**

```
$ npm init
$ npm install webpack webpack-cli webpack-dev-server
$ npm install jquery
```

```js
const path = require("path");

module.exports = {
  // root
  entry: {
    bundle: "./src/index.js",
  },
  // module bundle file
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  // local server (developer)
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    open: false,
  },
  // typescript,babelの設定などを追加、あれば、、、
  module: {
    rules: [{}],
  },
};
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Jquery ToDo</title>
  </head>
  <body>
    <div id="root"></div>
    <!-- ここでバンドルファイルを呼び出す -->
    <script src="bundle.js"></script>
  </body>
</html>
```
