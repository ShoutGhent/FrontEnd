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
        filename: 'bundle.js',
        publicPath: '/dist/js/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }]
    }
}
