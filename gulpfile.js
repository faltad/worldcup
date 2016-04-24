var gulp    = require('gulp'),
    nodemon = require('gulp-nodemon'),
    sass    = require('gulp-ruby-sass'),
    notify  = require('gulp-notify'),
    merge   = require('merge-stream'),
    paths   = {
        publicUi: './ui/public',
        sourcesUi: './ui/sources',
        includes: './node_modules'
    };

gulp.task('default', ['watch'], function () {
    gulp.start('nodemon', 'css', 'icons', 'js');
});

gulp.task('css', function () {
    return sass(paths.sourcesUi + '/sass/site.scss', {
        style: 'compressed',
        loadPath: [
            paths.sourcesUi + '/sass',
            paths.includes + '/bootstrap-sass/assets/stylesheets',
            paths.includes + '/font-awesome/scss'
        ]
    }).on("error", notify.onError(function (error) {
            return "Error: " + error.message;
        }))
        .pipe(gulp.dest(paths.publicUi + '/css'));
});

gulp.task('js', function () {
    var jquery = gulp.src(paths.includes + '/jquery/dist/jquery.min.js')
        .pipe(gulp.dest(paths.publicUi + '/js/vendor'));

    var bootstrap = gulp.src(paths.includes + '/bootstrap/dist/js/bootstrap.min.js')
        .pipe(gulp.dest(paths.publicUi + '/js/vendor'));

    return merge(jquery, bootstrap);
});

gulp.task('nodemon', function () {
    nodemon({
        script: 'app.js',
        ext: 'js nj'
    });
});

gulp.task('icons', function () {
    return gulp.src(paths.includes + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest(paths.publicUi + '/fonts'));
});

gulp.task('watch', function () {
    gulp.watch(paths.sourcesUi + '/sass/*.scss', ['css']);
});
