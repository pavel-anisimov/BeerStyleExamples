/**
 * @file gulpfile.js
 * @description Gulp file for compiling the FlashCardApp.
 * @author Pavel Anisimov
 * @copyright Pavel Anisimov 2017-2018
 */

const fs = require('fs');
const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const merge = require('merge-stream');
const htmlmin = require('gulp-htmlmin');
const inlineimg = require('gulp-js-base64-inject');
const path = require('path');
const sass = require('gulp-sass');
const cssBase64 = require('gulp-css-base64');
const cleanCSS = require('gulp-clean-css');
const htmlReplace = require('gulp-html-replace');
const del = require('del');
const rename = require('gulp-rename');
const stringReplace = require('gulp-string-replace');

// Current directory, name of the project.
const TEMPLATE = process.cwd().split(path.sep).pop();
const SUFFIX  = 'min';
const INDEX_FILE  = 'index.html';
const TEMP_FOLDER  = 'temp';
const ENTRY_POINT = 'index.js'

/**
 * @function getFolders
 * @param dir
 * @returns {Array} - list of folders
 */
const getFolders = dir => {
  const folders = fs.readdirSync(dir)
    .filter(file => fs.statSync(path.join(dir, file)).isDirectory());

  const jsFolderIndex = folders.indexOf('js');
  const cssFolderIndex = folders.indexOf('css');

  if (jsFolderIndex > -1) {
    folders.splice(jsFolderIndex, 1);
  }

  if (cssFolderIndex > -1) {
    folders.splice(cssFolderIndex, 1);
  }
  return folders;
}

// Fidning images in JS and transfering them into Base64 format.
gulp.task('image-base64', () =>
  gulp.src(['src/js/**/*.js',])
    .pipe(inlineimg({
      basepath: 'src/images',
    }))
    .pipe(gulp.dest(`./${TEMP_FOLDER}/js-base64`))
);

// Transpiling ES6 to ES5, compressing and uglifying body js
gulp.task('browserify-body-js', ['image-base64'], () =>
  browserify({
    entries: `./${TEMP_FOLDER}/js-base64/${ENTRY_POINT}`,
    debug: true,
  })
    .transform(babelify, {
      //extensions: ['es6'],
      plugins: ['transform-object-rest-spread'],
      sourceMapRelative: path.resolve(__dirname, 'src'),
    })
    .bundle()
    .pipe(source('body.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(`./${TEMP_FOLDER}/js/body`))
);

// Concating JS for the HTML Body part.
gulp.task('concat-body-js', ['browserify-body-js'], () =>
  merge(gulp.src(`${TEMP_FOLDER}/js/body/*.js`)
    .pipe(concat('body.js'))
    .pipe(gulp.dest(`${TEMP_FOLDER}/js`))
  )
);

// Compiling SCSS into CSS
gulp.task('compile-sass', () =>
  merge(getFolders('src').map(() =>
      gulp.src([
        'src/css/*.scss',
      ])
        .pipe(sass())
        .pipe(gulp.dest(`${TEMP_FOLDER}/css-max`))
    )
  )
);

// Substituting images in CSS with Base64 format in the core css modules
gulp.task('base64-css', ['compile-sass'], () =>
  gulp.src(`${TEMP_FOLDER}/css-max/style.css`)
    .pipe(cssBase64({
      baseDir: '../../src',
      maxWeightResource: 999999,
      extensionsAllowed: ['.png', '.jpg', '.gif', '.jpeg', '.woff', '.ttc'],
    }))
    .pipe(gulp.dest('temp/css-base64'))
);

// Compressing/uglyfying css file
gulp.task('compress-css', ['base64-css'], () =>
  gulp.src(`${TEMP_FOLDER}/css-base64/*.css`)
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest(`${TEMP_FOLDER}/css`))
);

// tasks to wait for prior executing 'replace-assets'
const waitFor = ['concat-body-js', 'compress-css'];

// Inserting css and javascript code linearly right into HTML file
gulp.task('replace-assets', waitFor, () =>
  merge(gulp.src('src/*.html')
    .pipe(htmlReplace({
      'body-js': {
        src: gulp.src(`${TEMP_FOLDER}/js/body.js`),
        tpl: '<script type="text/javascript">%s</script>',
      },
      'head-css': {
        src: gulp.src(`${TEMP_FOLDER}/css/style.css`),
        tpl: '<style type="text/css">%s</style>',
      }
    }))
    .pipe(gulp.dest(`${TEMP_FOLDER}/html/`))
  )
);

// Minimize HTML
gulp.task('minify-html', ['replace-assets'], () => {
  return gulp.src(`${TEMP_FOLDER}/html/*.html`)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(`${TEMP_FOLDER}/`));
});

// Add new template html to main src folder
gulp.task('release', ['minify-html'], () =>
  gulp.src(`${TEMP_FOLDER}/${INDEX_FILE}`)
    .pipe(rename(`${TEMPLATE}.${SUFFIX}.html`))
    .pipe(gulp.dest('./dist'))
);

// Delete temp folder
gulp.task(
  'cleanup-unused-files',
  ['release'], () =>
  del([TEMP_FOLDER,])
);


gulp.task('default', [
  'image-base64',
  'browserify-body-js',
  'concat-body-js',
  'compile-sass',
  'base64-css',
  'compress-css',
  'replace-assets',
  'minify-html',
  'release',
  'cleanup-unused-files',
]);
