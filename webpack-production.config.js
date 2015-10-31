var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');

module.exports = {
    devtool: 'source-map',
    entry: {
        main: path.join(__dirname, 'src/js/main'),
        vendor: Object.keys(pkg.dependencies)
    },
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: '[name].js',
        publicPath: '/dist/js/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['stores', 'actions', 'shared', 'node_modules']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.css$/,
            loaders: ['style', 'css']
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor.js'),
        new webpack.DefinePlugin({
            GA_TRACKING_CODE: JSON.stringify("UA-66177890-1")
        }),
        new webpack.DefinePlugin({
            'process.env': {
                // This affects react lib size
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
