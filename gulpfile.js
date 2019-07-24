const gulp = require("gulp");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const browserify = require("gulp-browserify");
const browserSync = require("browser-sync").create();

gulp.task("css", () => {
  gulp
    .src("src/css/*.css")
    .pipe(autoprefixer({broswer: ["last 2 versions", "> 1%"]}))
    .pipe(cssnano())
    .pipe(concat("bundled.css"))
    .pipe(gulp.dest("assets/css"))
    .pipe(browserSync.stream());
});
gulp.task("js", () => {
  gulp
    .src("src/js/*.js")
    .pipe(browserify())
    .pipe(concat("bundled.js"))
    .pipe(gulp.dest("assets/js"))
    .pipe(browserSync.stream());
});
gulp.task("serve", () => {
  browserSync.init({server: {baseDir: "./"}});
  gulp.watch("src/css/*.css", ["css"]);
  gulp.watch("src/js/*.js", ["js"]);
  gulp.watch("*.html").on("change", browserSync.reload);
});

gulp.task("build", ["css", "js"]);
gulp.task("default", ["serve"]);
