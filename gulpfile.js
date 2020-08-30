let gulp = require('gulp'),
    less = require('gulp-less'),
    cleanCSS = require('gulp-clean-css'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    cnct = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer');

let browserSync = require('browser-sync').create();

let pathBuild = './dist/';
let pathSrc = './src/';


gulp.task('bundle', () => {
    return gulp.src(pathSrc + 'css/**/*.css')
        .pipe(cssnano())
		.pipe(cnct('bundle.min.css'))
		.pipe(gulp.dest(pathSrc + 'css'));
});

gulp.task('prefix', () => {
    return gulp.src(pathSrc + 'css/**/*.less')
        .pipe(less())
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 15 versions'],
			cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest(pathSrc + 'css'));
});

gulp.task('img', function () {
    return gulp.src(pathSrc + 'img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest(pathBuild + 'img'));
});

gulp.task('img', function () {
    return gulp.src(pathSrc + 'img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest(pathBuild + 'img'));
});

gulp.task('browserSync', () => {
    browserSync.init({
        server: pathBuild
    });
});

gulp.task('scripts', () => {
	return gulp.src(pathSrc +'js/plugins/*.js')
		.pipe(cnct('plugins.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(pathBuild + 'js'));
});

gulp.task('move', (done) => {
	const buildCSS = gulp.src('src/css/bundle.min.css')
		.pipe(gulp.dest(pathBuild + 'css'));

	const buildImg = gulp.src('src/img/**/*')
		.pipe(gulp.dest(pathBuild + 'img'));

	const buildJS = gulp.src('src/js/main.js')
        .pipe(gulp.dest(pathBuild + 'js'));

	const buildHTML = gulp.src('src/*.html')
		.pipe(gulp.dest(pathBuild));
	done();
});


gulp.task('build', gulp.series(gulp.parallel('prefix', 'img', 'scripts'), 'bundle', 'move'), function (done) {
	done();
});