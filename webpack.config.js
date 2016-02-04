require('babel-loader');

module.exports = {
    entry: './src/redecorate.js',
    output: {
        path: __dirname + '/dist',
        filename: 'redecorate.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0']
                }
            }
        ]
    }
};
