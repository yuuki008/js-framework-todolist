const path = require('path');
module.exports = {
  // モジュールバンドルを行う起点となるファイルの指定
  // 指定できる値としては、ファイル名の文字列や、それを並べた配列やオブジェクト
  // 下記はオブジェクトとして指定した例
  entry: {
    bundle: './src/index.js'
  },
  // モジュールバンドルを行った結果を出力する場所やファイル名の指定
  output: {
    path: path.join(__dirname, 'dist'), // "__dirname"はファイルが存在するディレクトリ
    filename: '[name].js'  // [name]はentryで記述した名前（この設定ならbundle）
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // webpack-dev-serverの公開フォルダ
    open: true // サーバー起動時にブラウザを開く
  },
}