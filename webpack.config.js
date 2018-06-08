module.exports = {
    entry: './src/redecorate.js',
    mode: process.env.NODE_ENV || 'development',
    output: {
        filename: 'redecorate.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/i }]
    }
};
