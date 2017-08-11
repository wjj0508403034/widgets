'use strict';

const gulp = require('gulp');
const del = require('del');
const minifyHtml = require('gulp-minify-html');
const minify = require('gulp-minify');
const angularTemplatecache = require('gulp-angular-templatecache');
const es = require('event-stream');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const bom = require('gulp-bom');

const DestFolder = "dist";
const SourceFolder = "src";
const ModuleName = "huoyun.widget";

gulp.task('clean', function() {
  return del([DestFolder]);
});

gulp.task('concat-css', ['clean'], function() {
  return gulp.src(`${SourceFolder}/**/*.css`)
    .pipe(concat(`${ModuleName}.css`))
    .pipe(gulp.dest(DestFolder));
});

gulp.task('build', ['clean', 'concat-css'], function() {
  var templateStream = gulp.src(`${SourceFolder}/**/*.html`)
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(angularTemplatecache('view.template.tpl.js', {
      module: ModuleName
    }));

  return es.merge([
      gulp.src([`${SourceFolder}/index.js`, `${SourceFolder}/**/*.js`]),
      templateStream
    ])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat(`${ModuleName}.js`))
    // .pipe(minify({
    //   ext: {
    //     src: '.js',
    //     min: '.min.js'
    //   }
    // }))
    .pipe(bom())
    .pipe(gulp.dest(DestFolder));
});