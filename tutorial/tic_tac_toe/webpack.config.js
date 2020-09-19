const path = require('path')
const { resolve } = require('path')

// Babelの機能のminifyを利用するため
const BabelMinifyPlugin = require("babel-minify-webpack-plugin");
// ビルドする際にHTMLも同時に出力するため
const HtmlWebpackPlugin = require('html-webpack-plugin');
// CSSをJSにバンドルせずに出力するため
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const src = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'dist')

module.exports = (env, argv) => ({
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: argv.mode,
    // source-map 方式でないと、CSSの元ソースが追跡できないため
    devtool: "source-map",
    entry: path.resolve(src, 'index.jsx'),
    output: {
        path: dist,
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: dist,
        port: 8080,
        open: false,
        historyApiFallback: true,
        inline: true,
        hot: true
    },
    resolve: {
        modules: [src, path.resolve(__dirname, 'node_modules')],
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    module: {
        rules: [
            // js,ts,tsxのローダ設定
            {
                test: [/\.ts$/, /\.tsx$/, /\.js$/, /\.jsx$/],
                loader: ['babel-loader', 'ts-loader'],
                // 本番環境ではコメントアウトした方が良い、、？
                exclude: /node_modules/
            },
            // scssのローダ設定
            {
                test: [/\.css/, /\.scss/], // 対象となるファイルの拡張子
                use: [
                    // CSSファイルを書き出すオプションを有効にする
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    // CSSをバンドルするための機能
                    {
                        loader: "css-loader",
                        options: {
                            // オプションでCSS内のurl()メソッドの取り込みを禁止する
                            url: false,
                            // ソースマップの利用有無
                            sourceMap: argv.mode == "development",

                            // 0 => no loaders (default);
                            // 1 => postcss-loader;
                            // 2 => postcss-loader, sass-loader
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            // ソースマップの利用有無
                            sourceMap: argv.mode == "development",
                        },
                    },
                ],
            }
        ]
    },
    plugins: [
        new BabelMinifyPlugin(),
        new HtmlWebpackPlugin({
            publicPath: dist, // ビルド後のHTMLの出力先
            filename: 'index.html', //出力するHTMLのファイル名
            template: path.resolve(src, 'html/index.html'), //出力するためのHTMLのテンプレート
        }),
        new MiniCssExtractPlugin({
            publicPath: dist, // ビルド後のCSSの出力先
            filename: 'index.css', //出力するCSSのファイル名
        }),
    ]
});