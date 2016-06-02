var gulp    = require('gulp');  
var replace = require('gulp-replace-task');  
var args    = require('yargs').argv;  
var fs      = require('fs');

gulp.task('replace', function () {  
  // Get the environment from the command line
  var env = args.env || 'localdev';

  // Read the settings from the right file
  var filename = env + '.json';
  var settings = JSON.parse(fs.readFileSync('./config/' + filename, 'utf8'));

// Replace each placeholder with the correct value for the variable.  
gulp.src('app/config.js')  
  .pipe(replace({
    patterns: [
      {
        match: 'SERVER_URL',
        replacement: settings.SERVER_URL
      }
    ]
  }))
  .pipe(gulp.dest('app/config'));
});
