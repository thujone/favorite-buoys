var path = require('path');
var webpack = require('webpack');

var SRC_DIR = path.resolve(__dirname, 'src/jsx');
var BUILD_DIR = path.resolve(__dirname, 'build/js');

var config = {
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: SRC_DIR,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },
    entry: {
        index: SRC_DIR + '/FavoriteBuoys.jsx'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            _: "lodash"
        })
    ],
    output: {
        filename: "[name].bundle.js",
        path: BUILD_DIR
    }
};

module.exports = config;
