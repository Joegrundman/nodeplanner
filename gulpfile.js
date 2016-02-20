var gulp = require('gulp')
var csso = require('gulp-csso')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')
var recess = require('gulp-recess')
var header = require('gulp-header')
var gulpFilter = require('gulp-filter')
var complexity = require('gulp-complexity')
var gulpif = require('gulp-if')
var strip = require('gulp-strip-comments')
var usemin = require('gulp-usemin')

var srcScripts = [
         'public/javascripts/Globals/globals.js',
         'public/javascripts/Web/*.js',
         'public/javascripts/Misc/*.js',
         'public/javascripts/Attrition/*.js',
         'public/javascripts/Canvas/*.js',
         'public/javascripts/Codebreaking/*.js',
         'public/javascripts/Country/*.js',
         'public/javascripts/Diplomacy/*.js',
         'public/javascripts/Eventing/*.js',
         'public/javascripts/Unit/*.js',
         'public/javascripts/Forcepool/*.js',
         'public/javascripts/Game/*.js',
         'public/javascripts/GameSettings/*.js',
         'public/javascripts/Hex/*.js',
         'public/javascripts/HexControl/*.js',
         'public/javascripts/HexInfo/*.js',
         'public/javascripts/Loaders/*.js',
         'public/javascripts/Map/*.js',
         'public/javascripts/Navigator/*.js',
         'public/javascripts/NewUnit/*.js',
         'public/javascripts/Phase/*.js',
         'public/javascripts/ResearchDisplay/*.js',
         'public/javascripts/ShipsAtSea/*.js',
         'public/javascripts/Shipyard/*.js',
         'public/javascripts/Tables/*.js',
         'public/javascripts/Taskforce/*.js',
         'public/javascripts/UnitCounter/*.js',
         'public/javascripts/UnitHolder/*.js',
         'public/javascripts/UnitStack/*.js'
     ]
     
var banner = ['/**',
    ' * Warplanner2 for Node',
    ' * an implementation of',
    ' * Bruce Harper\'s A World At War',
    ' * by GMT Games',
    ' * Programming provided',
    ' * by Chris Goldfarb,',
    ' * and Joe Grundman',
    ' */',
    ''].join('\n')
 
 /*
  * Concatenates the javascripts into one and pipes to two directories, public/dist and build
  * public dist can test the validity of the concatenated file without switching to production
  * build is for production environment
  */ 
 gulp.task('concat', function(){
          return gulp.src(srcScripts)
            .pipe(concat('wp.min.js'))
            .pipe(strip())
            .pipe(header(banner))
            .pipe(gulp.dest('./public/dist/Min'))
            .pipe(gulp.dest('./build/script/Min'))
 })
 
 /**
  * concatenates vendor libraries and pipes to build/script/Vendor. Not needed if using cdn libraries
  */
 gulp.task('vendor', function() {
     return gulp.src([
         'public/javascripts/Vendor/jquery.min.js',
         'public/javascripts/Vendor/jquery-ui.min.js'
     ])
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('./build/script/Vendor'))
 })
 
 /*
  * automates replacing the development script tags in index.html with a single script src to the concatenated file
  * problem unresolved is that unlike with angular the index.html isn't part of the client side, but served up
  * therefore there is a name clash with the old index.html, unless we can concatenate all the swig files too...
  */
 gulp.task('usemin', function(){
     return gulp.src('./views/index.html')
        .pipe(usemin())
        .pipe(gulp.dest('./build-views/'))
 })
 
 /*
  * minifies the files, but problem is that it does not recognise ES6 features already implemented in browsers.
  * files must be babelified to es5 before minification, or wait for minifier to catch up with reality
  * concatenation is the most important optimizer anyway.
  */   
 gulp.task('minify', function() {
    //  var templatesFilter = gulpFilter('public/views/*.html')
     
     return gulp.src([
         'public/javascripts/Globals/globals.js',
         'public/javascripts/Web/*.js',
         'public/javascripts/Misc/*.js',
         'public/javascripts/Attrition/*.js',
         'public/javascripts/Canvas/*.js',
         'public/javascripts/Codebreaking/*.js',
         'public/javascripts/Country/*.js',
         'public/javascripts/Diplomacy/*.js',
         'public/javascripts/Eventing/*.js',
         'public/javascripts/Forcepool/*.js',
         'public/javascripts/Game/*.js',
         'public/javascripts/GameSettings/*.js',
         'public/javascripts/Hex/*.js',
         'public/javascripts/HexControl/*.js',
         'public/javascripts/HexInfo/*.js',
         'public/javascripts/Loaders/*.js',
         'public/javascripts/Map/*.js',
         'public/javascripts/Navigator/*.js',
         'public/javascripts/NewUnit/*.js',
         'public/javascripts/Phase/*.js',
         'public/javascripts/ResearchDisplay/*.js',
         'public/javascripts/ShipsAtSea/*.js',
         'public/javascripts/Shipyard/*.js',
         'public/javascripts/Tables/*.js',
         'public/javascripts/Taskforce/*.js',
         'public/javascripts/Unit/*.js',
         'public/javascripts/UnitCounter/*.js',
         'public/javascripts/UnitHolder/*.js',
         'public/javascripts/UnitStack/*.js'
     ])
    //  .pipe(templatesFilter)
    //  .pipe(templatesFilter.restore())
     .pipe(concat('wp.min.js'))
     .pipe(uglify())
     .pipe(header(banner))
     .pipe(gulp.dest('./public/dist/Min'))
 })
 
 gulp.task('complexity', function(){
     return gulp.src([
         '!public/vendor/*.*',
         '!public/dist/wp.min.js',
         'public/javascripts/**/*.js'
     ])
     .pipe(complexity())
 })
 
 
 
 gulp.task('styles', function(){
     gulp.src([
         'public/stylesheets/*.css'
     ])
     .pipe(concat('styles.min.css'))
     .pipe(csso())
     .pipe(gulp.dest('public/stylesheets'))
 })
 
 gulp.task('recess', function(){
     gulp.src('public/stylesheets')
     .pipe(recess())
     .pipe(recess.reporter())
     .pipe(gulp.dest('public/stylesheets'))
 })
 
 gulp.task('watch', function() {
     gulp.watch(['public/stylesheets/*.css'], ['styles'])
     gulp.watch(['public/javascripts/*.js'], ['minify'])
 })
 

gulp.task('default', ['watch', 'styles', 'minify'])
gulp.task('build', ['vendor', 'concat'])