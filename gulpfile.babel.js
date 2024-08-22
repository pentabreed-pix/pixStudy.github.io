const gulp = require("gulp");
const scss = require("gulp-sass")(require("sass"));
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const fileinclude = require("gulp-file-include");
const htmlbeautify = require("gulp-html-beautify");
const ejs = require("gulp-ejs");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const del = require("del");
const ghPages = require("gh-pages");
const path = require("path");

const SRC_FOLDER = "./src";
const DIST_FOLDER = "./dist";

const SRC_PATH = {
    ASSETS: {
      FONTS: "./src/assets/fonts",
      IMAGES: "./src/assets/images",
      SCSS: "./src/assets/scss",
      JS: "./src/assets/js",
      AJAX: "./src/assets/ajax",
      MODULES: "./src/assets/modules",
      DOC: "./src/assets/doc",
      GLTF: "./src/assets/gltf",
      MOVIES: "./src/assets/movies",
    },
    EJS: "./src/ejs",
  },
  DEST_PATH = {
    ASSETS: {
      FONTS: "./dist/assets/fonts",
      IMAGES: "./dist/assets/images",
      CSS: "./dist/assets/css",
      JS: "./dist/assets/js",
      AJAX: "./dist/assets/ajax",
      MODULES: "./dist/assets/modules",
      DOC: "./dist/assets/doc",
      GLTF: "./dist/assets/gltf",
      MOVIES: "./dist/assets/movies",
    },
  },
  // 옵션
  OPTIONS = {
    outputStyle: "expanded",
    indentType: "space",
    indentWidth: 4,
    precision: 8,
  };

gulp.task("html", () => {
  return gulp
    .src([SRC_FOLDER + "**/*.html"], {
      base: SRC_FOLDER,
      since: gulp.lastRun("html"),
    })
    .pipe(gulp.dest(DIST_FOLDER))
    .pipe(browserSync.stream());
});

gulp.task("ejs", function () {
  return gulp
    .src([SRC_FOLDER + "/ejs/**/!(_)*.ejs", SRC_FOLDER + "/*.ejs"])
    .pipe(ejs())
    .pipe(rename({ extname: ".html" }))
    .pipe(
      fileinclude({
        prefix: "@@", //사용할땐 앞에@@ 를 붙이면됨
        basepath: "@file",
      })
    )
    .pipe(htmlbeautify({ indentSize: 2 }))
    .pipe(gulp.dest(DIST_FOLDER))
    .pipe(browserSync.stream());
});

gulp.task("scss:compile", function () {
  return gulp
    .src(SRC_PATH.ASSETS.SCSS + "/*.scss")
    .pipe(sourcemaps.init())
    .pipe(scss(OPTIONS))
    .pipe(autoprefixer()) // 최신 css를 구형 브라우저에서 이해할 수 있게 prefix를 만들어줌
    .pipe(sourcemaps.write('.')) // 소스 맵을 CSS 파일과 같은 디렉토리에 별도 파일로 저장
    .pipe(gulp.dest(DEST_PATH.ASSETS.CSS))
    .pipe(browserSync.stream());
});

gulp.task("js", () => {
  return gulp
    .src([
      SRC_PATH.ASSETS.JS + "/**/*.js"
    ])
    .pipe(babel())
    .pipe(uglify()) //자바스크립트 코드를 압축해 용량을 줄임
    .pipe(gulp.dest(DEST_PATH.ASSETS.JS))
    .pipe(browserSync.stream());
});

gulp.task("ajax", () => {
  return gulp
    .src(SRC_PATH.ASSETS.AJAX + "/*.js")
    .pipe(gulp.dest(DEST_PATH.ASSETS.AJAX))
    .pipe(browserSync.stream());
});

gulp.task("modules", () => {
  return gulp
    .src(SRC_PATH.ASSETS.MODULES + "/*.+(js|json|xml|txt)")
    .pipe(gulp.dest(DEST_PATH.ASSETS.MODULES))
    .pipe(browserSync.stream());
});

gulp.task("images", () => {
  return gulp
    .src(SRC_PATH.ASSETS.IMAGES + "/**/*.+(png|jpg|jpeg|gif|ico)")
    .pipe(gulp.dest(DEST_PATH.ASSETS.IMAGES))
    .pipe(browserSync.stream());
});

gulp.task("svg", () => {
  return gulp
    .src(SRC_PATH.ASSETS.IMAGES + "/**/*.svg")
    .pipe(gulp.dest(DEST_PATH.ASSETS.IMAGES))
    .pipe(browserSync.stream());
});

gulp.task("fonts", () => {
  return gulp
    .src(SRC_PATH.ASSETS.FONTS + "/**/*.+(eot|otf|svg|ttf|woff|woff2)")
    .pipe(gulp.dest(DEST_PATH.ASSETS.FONTS))
    .pipe(browserSync.stream());
});

gulp.task("doc", () => {
  return gulp
    .src(SRC_PATH.ASSETS.DOC + "/**/*")
    .pipe(gulp.dest(DEST_PATH.ASSETS.DOC))
    .pipe(browserSync.stream());
});

gulp.task("gltf", () => {
  return gulp
    .src(SRC_PATH.ASSETS.GLTF + "/**/*")
    .pipe(gulp.dest(DEST_PATH.ASSETS.GLTF))
    .pipe(browserSync.stream());
});

gulp.task("movies", () => {
  return gulp
    .src(SRC_PATH.ASSETS.MOVIES + "/*")
    .pipe(gulp.dest(DEST_PATH.ASSETS.MOVIES))
    .pipe(browserSync.stream());
});

gulp.task("watch", function () {
  gulp.watch(SRC_PATH.EJS + "/**/*.ejs", gulp.series("ejs"));
  gulp.watch(SRC_PATH.ASSETS.SCSS + "/**/*.scss", gulp.series("scss:compile"));
  gulp.watch(SRC_PATH.ASSETS.JS + "/**/*.js", gulp.series("js"));
  gulp.watch(SRC_PATH.ASSETS.AJAX + "/*.js", gulp.series("ajax"));
  gulp.watch(SRC_PATH.ASSETS.MODULES + "/**/*.js", gulp.series("modules"));
  gulp.watch(SRC_PATH.ASSETS.IMAGES + "/**/*.+(png|jpg|jpeg|gif|ico)", gulp.series("images"));
  gulp.watch(SRC_PATH.ASSETS.IMAGES + "/**/*.svg", gulp.series("svg"));
  gulp.watch(SRC_PATH.ASSETS.FONTS + "/**/*.+(eot|otf|svg|ttf|woff|woff2)", gulp.series("fonts"));
  gulp.watch(SRC_PATH.ASSETS.DOC + "/**/*", gulp.series("doc"));
  gulp.watch(SRC_PATH.ASSETS.GLTF + "/**/*", gulp.series("gltf"));
  gulp.watch(SRC_PATH.ASSETS.MOVIES + "/*", gulp.series("movies"));
});

gulp.task("browserSync", function () {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ["dist"],
      open: true,
    },
  });
});

gulp.task('clean', function () {
  return del([DIST_FOLDER]);
});

gulp.task('cleanDeploy', function () {
  return del([".publish"]);
});

gulp.task('gh', function (done) {
  ghPages.publish(path.join(__dirname, DIST_FOLDER), {
    branch: 'gh-pages'
  }, function (err) {
    done(err);
  });
});


gulp.task('prepare', gulp.series('clean'));

gulp.task('build', gulp.series('prepare', 'html', 'ejs', 'scss:compile', 'js', 'ajax', 'modules', 'images', 'svg', 'fonts', 'doc', 'gltf', 'movies', gulp.parallel('browserSync', 'watch')));

gulp.task('watch', gulp.parallel('watch', 'browserSync'));

gulp.task('default', gulp.series('clean', 'build', gulp.parallel('browserSync', 'watch')));

gulp.task('dev', gulp.series('build', gulp.parallel('browserSync', 'watch')));

gulp.task('deploy', gulp.series('build', 'gh', 'cleanDeploy'));