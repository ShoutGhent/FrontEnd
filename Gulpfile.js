var gulp        = require('gulp');
var elixir      = require('laravel-elixir');
var livereload  = require('gulp-livereload');
var replace     = require('gulp-replace');
var autoprefixer     = require('gulp-autoprefixer');

elixir.config.sourcemaps = false;
elixir.config.assetsPath = 'src';
elixir.config.publicPath = 'dist';

elixir(function (mix) {
    mix.sass('style.scss')
        .copy('./src/img/**/*.*', './dist/img/')
        .copy('_index.html', 'index.html')
        .task('addDeploymentTimestamps')
        .task('autoprefix');
});

gulp.task('autoprefix', function() {
    return gulp.src('./dist/css/style.css')
        .pipe(autoprefixer({
            version: 'last 4 versions'
        }))
        .pipe(gulp.src('./dist/css'))
});

gulp.task('addDeploymentTimestamps', function() {
    gulp.src('index.html')
        .pipe(replace(/DEPLOYED_AT/g, +new Date()))
        .pipe(gulp.dest('.'));
});

gulp.on('task_start', function (e) {
    if (e.task === 'watch') {
        livereload.listen();
    }
});

gulp.task('watch-lr-css', function () {
    livereload.changed('app.css');
});
