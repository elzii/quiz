var gulp         = require('gulp'),
    sass         = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    compass      = require('gulp-compass'),
    minifycss    = require('gulp-minify-css'),
    concat       = require('gulp-concat'),
    wrap         = require('gulp-wrap'),
    rename       = require('gulp-rename'),
    sourcemaps   = require('gulp-sourcemaps'),
    gutil        = require('gulp-util'),
    uglify       = require('gulp-uglify'),
    path         = require('path'),
    tinylr;


/**
 * Asset Paths
 */
var paths = {
  css: './css',
  js: './js',
}

/**
 * Ports
 */
var ports = {
  express: 6666,
  livereload: 6667
}




/**
 * TASK: Express
 */
gulp.task('express', function() {
  var express = require('express')
  var app = express()
  app.use(require('connect-livereload')({ port: ports.livereload }))
  app.use(express.static(__dirname + '/app'))
  app.listen( ports.express )

  gutil.log( gutil.colors.black.bgYellow( ' EXPRESS SERVER RUNNING ' ), gutil.colors.bgCyan.black( ' http://localhost:' + ports.express + ' ') )
})

/**
 * TASK: Live Reload
 */
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')()
  tinylr.listen( ports.livereload )
})



/**
 * TASK: Styles
 */
gulp.task('styles', function() {
  return sass( paths.css, { style: 'expanded' })
    .on('error', logError)
    .pipe(sourcemaps.init())
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest( paths.css ))
})



/**
 * TASK: Build
 */
gulp.task('build', function() {
  
})


/**
 * TASK: Watch
 */
gulp.task('watch', function() {
  gulp.watch(['./app/css/**/*.scss'], ['styles'], notifyLiveReload)
  gulp.watch(['./app/css/**/*.css'], notifyLiveReload)
})

gulp.task('default', [
  'styles', 
  'watch'
], function() {
  // Do stuff during default task

})




/**
 * Notify LiveReload
 *
 * 
 * @param  {Object} event 
 */
notifyLiveReload = function(event) {
  var fileName = require('path').relative(__dirname + '/app', event.path)

  tinylr.changed({
    body: {
      files: [fileName]
    }
  })

  // Get filename from path
  var filename = event.path.match(/\/[^\/]+$/g)[0].replace('/', '')

  // Logging
  gutil.log( gutil.colors.black.bgGreen( ' ' + event.type.toUpperCase() + ' '), gutil.colors.yellow( filename ) )

}
/**
 * Log Error
 * 
 * @param  {Object} error 
 * @return {Object}
 */
logError = function(error) {

    var err = formatError(error)

    // Logging
    gutil.log( gutil.colors.bgRed(' ERROR '), gutil.colors.bgBlue( ' ' + err.plugin + ' ' ), gutil.colors.black.bgWhite( ' ' + err.message + ' ' ) )
    gutil.beep()

    this.emit('end')

    function formatError(obj) {

      var obj     = obj || {},
          msg     = obj.message || obj[0],
          plugin  = obj.plugin || null

      // clean up
      msg = msg.replace('error ', '')

      return {
        message: msg,
        plugin : plugin
      }

    }
}
