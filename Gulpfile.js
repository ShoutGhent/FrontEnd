var gulp       = require('gulp');
var elixir     = require('laravel-elixir');
var livereload = require('gulp-livereload');

elixir.config.sourcemaps = false;
elixir.config.srcDir = 'app';
elixir.config.publicDir = 'dist';
elixir.config.assetsDir = 'app/';
elixir.config.cssOutput = 'dist/css';
elixir.config.jsOutput = 'dist/js';

elixir(function(mix) {
    mix.sass('style.scss')
        .browserify('main.js')
        .copy('./app/index.html', './dist/index.html');
});

gulp.on('task_start', function (e) {
    if (e.task === 'watch') {
        livereload.listen();
    }
});
gulp.task('watch-lr-css', function () {
    livereload.changed('app.css');
});

gulp.task('watch-lr', function () {
    livereload.changed('app.js');
});
