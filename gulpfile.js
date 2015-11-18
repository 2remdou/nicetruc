/**
 * Created by mdoutoure on 18/11/2015.
 */
var gulp = require('gulp'),
    concat = require('gulp-concat');

gulp.task('scripts', function() {
    return gulp.src([
        'web/client/bower_components/angular/angular.min.js',
        'web/client/bower_components/angular-animate/angular-animate.js',
        'web/client/bower_components/jquery/dist/jquery.min.js',
        'web/client/bower_components/bootstrap/dist/js/bootstrap.min.js',
        'web/client/bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'web/client/bower_components/lodash/lodash.min.js',
        'web/client/bower_components/restangular/dist/restangular.min.js',
        'web/client/bower_components/angular-cookies/angular-cookies.min.js',
        'web/client/bower_components/es5-shim/es5-shim.min.js',
        'web/client/bower_components/es5-shim/es5-sham.min.js',
        'web/client/bower_components/angular-file-upload/dist/angular-file-upload.min.js',
        'web/client/bower_components/spin.js/spin.js',
        'web/client/bower_components/angular-spinner/angular-spinner.min.js',
        'web/client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'web/bundles/fosjsrouting/js/router.js',
        'web/js/fos_js_routes.js',
        'web/client/app/**/*.js'
    ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('web/bundles/'));
});

gulp.task('watch', function() {
    gulp.watch([
        'web/bundles/fosjsrouting/js/router.js',
        'web/js/fos_js_routes.js',
        'web/client/app/**/*.js'
        ],
        ['scripts']);
});