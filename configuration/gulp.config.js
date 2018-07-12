const gulp = require('gulp');
const connect = require('gulp-connect');

gulp.task('default', () => {
  console.log('building...');
});

// #region Building



// #region HTML

gulp.task(
  'deploy-html',
  () => {
    return gulp
      .src('../source/html/index.html')
      .pipe(gulp.dest('../docs'))
      .pipe(connect.reload())
  }
);

gulp.task(
  'build',
  [
    'deploy-html'
  ]
);

// #endregion HTML

// #endregion Building

// #region Development


gulp.task(
  'develop',
  [
    'build', 
    'watch', 
    'serve'
  ]
);

// #region Watch For Changes

gulp.task(
  'watch',
  () => {
    gulp.watch('../source/**/*.html', ['deploy-html'])
  }
)

// #endregion Watch For Changes

// #region Serve Content

gulp.task(
  'serve',
  () => {
    connect.server({
      root: '../docs',
      livereload: true
    });
  }
);

// #endregion Serve Content

// #endregion Development