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
    mode: argv.mode,
    entry: path.resolve(src, 'index.tsx'),
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
            // .jsxファイルの時
            // {
            //     test: [/\.jsx$/, /\.js$/],
            //     exclude: /(node_modules|bower_components)/,
            //     use: [{
            //         loader: "babel-loader",
            //         options: {
            //             presets: ["@babel/preset-env", "@babel/preset-react"]
            //         }
            //     }]
            // },
            // js,ts,tsxのローダ設定
            {
                test: [/\.ts$/, /\.tsx$/, /\.js$/, /\.jsx$/],
                loader: ['babel-loader', 'ts-loader']
            },
            // scssのローダ設定
            {
                test: [/\.css$/, /\.scss$/],
                exclude: /node_modules/,
                loader: [MiniCssExtractPlugin.loader, 'css-loader?modules', 'postcss-loader', 'sass-loader'],
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
            filename: 'app.css', //出力するCSSのファイル名
        }),
    ]
});