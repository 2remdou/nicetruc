/**
 * Created by mdoutoure on 18/11/2015.
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    del = require('del'),
    concatCss = require('gulp-concat-css');

gulp.task('concatJs',function () {
    return gulp.src([
        'web/client/bower_components/jquery/dist/jquery.min.js',
        'web/client/bower_components/angular/angular.min.js',
        'web/client/bower_components/angular-animate/angular-animate.js',
        'web/client/bower_components/bootstrap/dist/js/bootstrap.min.js',
        'web/client/bower_components/bxslider/jquery.bxSlider.min.js',
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
        'web/client/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js',
        'web/client/bower_components/bl-jquery-image-center/js/jquery.blImageCenter.js',
        'web/client/bower_components/jquery-zoom/jquery.zoom.min.js',

        'web/client/bower_components/bl-jquery-image-center/js/jquery.blImageCenter.js',
        'web/client/bower_components/angular-permission/dist/angular-permission.js',
        'web/client/bower_components/angular-ui-notification/dist/angular-ui-notification.min.js',
        'web/client/bower_components/angular-jwt/dist/angular-jwt.min.js',
        'web/bundles/fosjsrouting/js/router.js',
        'web/js/fos_js_routes.js',
        'web/js/mimity.js',
        'web/client/app/**/*.js'
    ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('web/bundles/compiled/'));
});
        // 

gulp.task('concatCss',function(){
   return gulp.src([
        'web/client/bower_components/bootstrap/dist/css/bootstrap.min.css',
        'web/client/bower_components/bxslider/bx_styles/bx_styles.css',
        'web/client/bower_components/angular-ui-notification/dist/angular-ui-notification.min.css',
        'web/client/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css',
       'web/client/app/views/css/inscription.css',
       'web/client/app/views/css/search.css',
       'web/client/app/views/css/annonce.css',
       'web/client/app/views/css/style.css',
       'web/client/app/views/css/font-awesome.min.css',
   ])
       .pipe(concatCss('all.css'))
       .pipe(gulp.dest('web/bundles/compiled/'));
});
gulp.task('clean', function() {
    return del(['web/bundles/compiled/']);
});

gulp.task('default', function() {
    gulp.start('concatJs', 'concatCss');
});

gulp.task('watch', function() {
    gulp.watch([
        'web/bundles/fosjsrouting/js/router.js',
        'web/js/fos_js_routes.js',
        'web/client/app/**/*.js'
        ],
        //['clean'],
        ['default']
    );
});

