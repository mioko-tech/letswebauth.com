var gulp = require('gulp'),
    fileinclude = require('gulp-file-include'),
    watch = require('gulp-watch'),
    clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src('dist', {read: false, allowEmpty: true})
        .pipe(clean())
});

gulp.task('distHtml', function() {
    return gulp.src(['src/*', '!src/*.html'])
        .pipe(gulp.dest('dist')) && gulp.src(['src/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('distAssets', function() {
    return gulp.src(['src/assets/**/*'])
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('dist', gulp.series(
    'clean',
    'distHtml',
    'distAssets'
    )
);

gulp.task('watch', function() {
    gulp.watch('src/**/*', gulp.series('dist'));
});