var path = require('path');
var webpack = require('webpack');
var ip = require('./IP');

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://' + ip + ':8080',
        'webpack/hot/only-dev-server',
        './src/js/main.js'
    ],
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: 'main.js',
        publicPath: '/dist/js/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            GA_TRACKING_CODE: JSON.stringify("UA-66177890-1")
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['stores', 'actions', 'shared', 'node_modules']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.css$/,
            loaders: ['style', 'css']
        }]
    }
}
