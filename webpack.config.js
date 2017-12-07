const webpack = require('webpack');

module.exports = {
    entry: './src/redecorate.js',
    output: {
        filename: 'dist/redecorate.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/i
            }
        ]
    }
};
