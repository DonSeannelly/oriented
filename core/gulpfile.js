const gulp = require('gulp')
const ts = require('gulp-typescript')
var exec = require('child_process').exec
const shell = require('shelljs')
const COPY_FILES = ['src/*.json', 'src/*.md']

// Pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json')

gulp.task('tsc', () => {
  const tsResult = tsProject.src()
  .pipe(tsProject())
  return tsResult.js.pipe(gulp.dest('lib'))
})

gulp.task('copy-assets', function () {
  return gulp.src(COPY_FILES)
    .pipe(gulp.dest('lib'))
})

gulp.task('watch', ['tsc'], () => {
  gulp.watch('src/**/*.ts', ['tsc'])
})

gulp.task('watch-assets', ['copy-assets'], () => {
  gulp.watch('src/**/*.{json,md}', ['copy-assets'])
})

gulp.task('build', ['tsc', 'copy-assets'], () => {
  shell.cd('lib')
  shell.exec('npm i')
})

gulp.task('default', ['watch', 'watch-assets'])