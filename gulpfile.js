const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

const paths = {
  css: {
    src: './styles',
    dist: './public/css',
  },
  js: {
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

gulp.task('sass', () => {
  gulp
    .src(`${paths.css.src}/index.scss`)
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
    .pipe(gulp.dest(paths.css.dist));
});

gulp.task('scripts', () => {
  gulp
    .src(paths.js.src)
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest(paths.js.dist));
});

gulp.task('watch:sass', () =>
  gulp.watch(paths.css.src + '/**/*.scss', ['sass'])
);
gulp.task('watch:scripts', () => gulp.watch('./scripts/index.js', ['scripts']));
