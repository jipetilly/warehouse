// Déclaration des variables
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
var image = require('gulp-image');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
sass.compiler = require('node-sass');

// Ce qu'on fait avec les dépendances 
// Moulinette à SCSS
gulp.task('moulinette-sass', function () {
  return gulp.src('./src/css/**/*.scss')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(rename({extname: ".min.css"}))
  .pipe(autoprefixer({cascade: false}))
  .pipe(gulp.dest('./dist/css'));
});
// Moulinette à HTML
gulp.task('moulinette-html', function () {
  return gulp.src('./src/*.html')
  .pipe(gulp.dest('./dist'));
});
// Moulinette à JS
// gulp.task('moulinette-js', function () {
//   return pipeline(
//         gulp.src('./src/js/*.js'),
//         uglify(),
//         rename({extname: ".min.js"}),
//         gulp.dest('./dist/js/')
//   );
// });

// Moulinette à JS
gulp.task('moulinette-js', function () {
  return pipeline(
        gulp.src('./src/js/*.js'),
        babel({presets: ['@babel/env']}),
        uglify(),
        rename({extname: ".min.js"}),
        gulp.dest('./dist/js/')
  );
});

// Moulinette à Images
gulp.task('compress-img', function () {
  gulp.src('./src/img/*')
    .pipe(image())
    .pipe(gulp.dest('./dist/img/'));
});
// Browser Sync
gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./dist"
      }
  });
});
// Exécuter tout l'bazarre
gulp.task('execute', gulp.parallel('moulinette-sass','moulinette-html', 'moulinette-js', 'browser-sync', 'compress-img', function () {
  gulp.watch('./src/css/**/*.scss', gulp.series('moulinette-sass'));
  gulp.watch('./src/*.html', gulp.series('moulinette-html'));
  gulp.watch('./src/js/*.js', gulp.series('moulinette-js'));
  gulp.watch('./dist/*.html').on('change', browserSync.reload);
  gulp.watch('./dist/css/*.css').on('change', browserSync.reload);
  gulp.watch('./dist/js/*.js').on('change', browserSync.reload);
}));
gulp.task('default', gulp.parallel('execute') );