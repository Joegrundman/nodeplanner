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
var changed = require('gulp-changed')
var clean= require('gulp-clean')
var sass = require('gulp-sass')


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
            .pipe(gulp.dest('build/public/javascripts/Min'))
            .pipe(gulp.dest('../stage/build/public/javascripts/Min'))
 })
 
 /*
  * concatenates vendor libraries and pipes to build/script/Vendor. Not needed if using cdn libraries
  */
 gulp.task('vendor', function() {
     return gulp.src([
         'public/javascripts/Vendor/jquery.min.js',
         'public/javascripts/Vendor/jquery-ui.min.js'
     ])
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('./build/public/javascripts/Vendor'))
 })
 
 /*
  * pipes static files from src content into the build content directory
  */
  
  gulp.task('pipe-static', function() {
      return gulp.src([
          'public/Content/**/*.*'
          ])
        .pipe(gulp.dest('build/public/Content'))
        .pipe(gulp.dest('../stage/build/public/Content'))
  })
  
  gulp.task('pipe-favicon', function() {
      return gulp.src(['public/favicon.ico'])
        .pipe(gulp.dest('build/public'))
        .pipe(gulp.dest('../stage/build/public'))
  })

 /*
  * pipeshtml files from views content into the build views directory
  */
 
 gulp.task('pipe-html', function() {
     return gulp.src(['views/**/*.html'])
        .pipe(gulp.dest('build/views'))
        .pipe(gulp.dest('../stage/build/views'))
 })
 

 /*
  * automates replacing the development script tags and also performs the concat op

  */
 gulp.task('usemin', function(){
     return gulp.src('views/index.html')
        .pipe(usemin({
            js: [concat('../public/javascripts/Min/bundle.js')]
        }))
        .pipe(gulp.dest('build/views/'))
        .pipe(gulp.dest('../stage/build/views/'))
 })
 
  /*
  * pipes router files into build
  */
 gulp.task('pipe-router', function() {
     return gulp.src([
         'router/index.js',
         'router/**/*.js'      
     ])
     .pipe(gulp.dest('build/router/'))
     .pipe(gulp.dest('../stage/build/router/'))
 })
 
 /*
  * pipes bin files into build
  */
 gulp.task('pipe-bin', function() {
     return gulp.src([
         'bin/*'     
     ])
     .pipe(gulp.dest('build/bin/'))
     .pipe(gulp.dest('../stage/build/bin/'))
 })
 
   /*
  * pipes server and package
  */
 gulp.task('pipe-server', function() {
     return gulp.src([
         'app.js',
         'package.json'      
     ])
     .pipe(gulp.dest('build/'))
     .pipe(gulp.dest('../stage/build/'))
 })

 
 /*
  * a complexity analysis tool. doesn't seem to work on this build
  */
 gulp.task('complexity', function(){
     return gulp.src([
         '!public/vendor/*.*',
         '!public/dist/wp.min.js',
         'public/javascripts/**/*.js'
     ])
     .pipe(complexity())
 })
 
 /*
  * css concatenation and optimization
  */
 
 gulp.task('styles', function(){
     return gulp.src([
         'public/stylesheets/*.css'
     ])
     .pipe(concat('styles.min.css'))
     .pipe(csso())
     .pipe(gulp.dest('public/stylesheets'))
 })
 //complete stylesheets piping
 gulp.task('pipe-style-all', function(){
     return gulp.src([      
         'public/stylesheets/*',
         'public/stylesheets/**/*'
     ])
     .pipe(gulp.dest('build/public/stylesheets'))
     .pipe(gulp.dest('../stage/build/public/stylesheets'))
 })
 
 // very simple css piper just for updating style.css
 gulp.task('pipe-style', function() {
     return gulp.src([
         'public/stylesheets/style.css'
     ])
     .pipe(gulp.dest('build/public/stylesheets'))
     .pipe(gulp.dest('../stage/build/public/stylesheets'))
 })
 
 /*
  * clean and remove the build folder inside warplanner only
  */
 
 gulp.task('clean-local', function() {
     return gulp.src('build', {read: false})
     .pipe(clean())
 })
 /*
  * clean and remove the build folder inside stage only
  */ 
 gulp.task('clean-stage', function() {
     return gulp.src('../stage/build', {read: false})
     .pipe(clean({force: true}))
 })
 
// // damn tis is taking too long to sort out! 
//  gulp.task('sass', function() {
//      return gulp.src('public/sass/**/*.scss')
//      .pipe(sass().on('error', sass.logError))
//      .pipe(gulp.dest('public/stylesheets'))
//  })
 
 /*
  * watches for changes
  */
 gulp.task('watch', function() {
     gulp.watch(['public/stylesheets/*.css'], ['styles'])
     gulp.watch(['public/javascripts/*.js'], ['minify'])
 })
 

gulp.task('default', ['watch', 'styles', 'minify'])

// this unwieldy and unrefactored task is the basic build tool. Not much actually happens in the build process except concat of javascripts and piping of the rest
gulp.task('build', ['pipe-style-all','pipe-favicon','pipe-static', 'pipe-html', 'usemin', 'pipe-router', 'pipe-bin', 'pipe-server'])