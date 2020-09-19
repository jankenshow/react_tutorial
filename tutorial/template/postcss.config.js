// PostCSSの機能のautoprefixerの設定
module.exports = {
    plugins: [
        require("autoprefixer")({
            grid: "autoplace",
            browsersList: [
                "last 2 Chrome versions",
                "last 2 Edge versions",
                "last 2 Firefox versions",
                "last 2 Safari versions"
            ]
        })
    ],
};