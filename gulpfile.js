/// <reference path="typings/tsd.d.ts" />
var gulp = require('gulp');
var ts = require('gulp-typescript');
var rimraf = require('gulp-rimraf');
var nodemon = require('gulp-nodemon');
gulp.task('cleanBuiltDir', function () {
    return gulp.src('built').pipe(rimraf());
});
gulp.task('buildServer', ['cleanBuiltDir'], function () {
    var tsResult = gulp.src('./server/src/**/*.ts')
        .pipe(ts({
        module: 'CommonJS'
    }));
    return tsResult.js.pipe(gulp.dest('./server/built/'));
});
gulp.task('nodemon', ['buildServer', 'watch'], function () {
    nodemon({
        script: './bin/www'
    }).on('restart', function () {
        console.log('nodemon restarted server.ts');
    });
});
gulp.task('watch', function () {
    gulp.watch('./server/src/**/*.ts', ['buildServer']);
});
gulp.task('default', ['nodemon']);
