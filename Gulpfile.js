var gulp       = require('gulp');
var elixir     = require('laravel-elixir');
var livereload = require('gulp-livereload');

elixir.config.sourcemaps = false;
elixir.config.assetsPath = 'src';
elixir.config.publicPath = 'dist';

//elixir.config.js.browserify.transformers.push({
//    name: 'browserify-css',
//    options: {
//        global: true
//    }
//});

elixir(function (mix) {
    mix.sass('style.scss')
        //.browserify('main.js')
        .copy('./src/img/**/*.*', './dist/img/');
});

gulp.on('task_start', function (e) {
    if (e.task === 'watch') {
        livereload.listen();
    }
});

gulp.task('watch-lr-css', function () {
    livereload.changed('app.css');
});
