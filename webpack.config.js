const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: "./src/index.js",
    output: {
        // The directory containing the file to be built
        path: path.join(__dirname, "/build"),
        // The name of the file to be built
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Will use babel-loader for .js files
                exclude: /node_modules/, // Exclude the node_modules folder
                use: ["babel-loader"]
            },
            {
                test: /\.css$/, // Use style-loader, css-loader for .css files
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    // Contains plugins to install in the future
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ]
}