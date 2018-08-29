const gulp = require('gulp');
const ts = require('gulp-typescript');
var exec = require('child_process').exec;
const COPY_FILES = ['src/*.json', 'src/**/*.json', 'src/*.md', 'src/**/*.md'];

// Pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('tsc', () => {
  const tsResult = tsProject.src()
  .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('lib'));
});

gulp.task('copy-assets', function () {
  return gulp.src(COPY_FILES)
    .pipe(gulp.dest('lib'));
});

gulp.task('watch', ['tsc'], () => {
  gulp.watch('src/**/*.ts', ['tsc']);
});

gulp.task('watch-assets', ['copy-assets'], () => {
  gulp.watch('src/**/*.{json,md}', ['copy-assets']);
});

gulp.task('default', ['watch', 'watch-assets']);