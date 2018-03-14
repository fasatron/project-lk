const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const del = require('del');

const paths = {
  styles: {
    src: './styles',
    dist: './public/css',
  },
  scripts: {
    src: [
      './node_modules/blueimp-file-upload/js/vendor/jquery.ui.widget.js',
      './node_modules/blueimp-file-upload/js/jquery.iframe-transport.js',
      './node_modules/blueimp-file-upload/js/jquery.fileupload.js',
      './node_modules/cloudinary-jquery-file-upload/cloudinary-jquery-file-upload.js',
      './scripts/index.js',
    ],
    dist: './public/js',
  },
};

function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest(paths.scripts.dist));
}

function styles() {
  return gulp
    .src(`${paths.styles.src}/index.scss`)
    .pipe(
      sass({
        includePaths: ['./node_modules/'],
      }).on('error', sass.logError)
    )
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions', 'ie >= 9'],
      })
    )
    .pipe(cleanCSS())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest(paths.styles.dist));
}

function watch() {
  gulp.watch(paths.styles.src + '/**/*.scss', styles);
  gulp.watch('./scripts/index.js', scripts);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);

function clean() {
  return del([paths.styles.dist, paths.scripts.dist]);
}

const build = gulp.series(clean, gulp.parallel(styles, scripts));

gulp.task('build', build);
gulp.task('default', build);
