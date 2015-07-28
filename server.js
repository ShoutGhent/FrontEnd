var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var port = 8080;
var compiler = webpack(config);
var ip = require('./IP');

new WebpackDevServer(compiler, {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
        colors: true
    }
}).listen(port, ip, function (err, result) {
    if (err) {
        console.log(err);
    }

    console.log('Listening at ' + ip + ':' + port);
});
