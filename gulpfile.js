var gulp = require('gulp');
var spsave = require('gulp-spsave');
var plumber = require('gulp-plumber');

var spConfig = require('./sharepoint.config.json');
var onError = function(err) {
    console.log(err);
    this.emit('end');
}

gulp.task('watch', function() {
    gulp.watch('index.js', ['push:index']);
    gulp.watch('amd_modules/**/*.js', ['push:amd_modules']);
    gulp.watch('dependencies/**/*.js', ['push:dependencies']);
});

gulp.task('push:index', function() {
    return gulp.src('./index.js')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(spsave({
            siteUrl: spConfig.siteURL,
            folder: spConfig.directories.index,
            flatten: false
        }, {
            username: spConfig.username,
            password: spConfig.password
        }))
});

gulp.task('push:amd_modules', function() {
    return gulp.src('./amd_modules/**/*.js')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(spsave({
            siteUrl: spConfig.siteURL,
            folder: spConfig.directories.amd_modules,
            flatten: false
        }, {
            username: spConfig.username,
            password: spConfig.password
        }))
});

gulp.task('push:dependencies', function() {
    return gulp.src('./dependencies/**/*.js')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(spsave({
            siteUrl: spConfig.siteURL,
            folder: spConfig.directories.dependencies,
            flatten: false
        }, {
            username: spConfig.username,
            password: spConfig.password
        }))
});
