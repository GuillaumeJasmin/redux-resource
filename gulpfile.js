const gulp = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const del = require('del');
const isparta = require('isparta');
const webpack = require('webpack');
const runSequence = require('run-sequence');
const webpackStream = require('webpack-stream');
const mochaGlobals = require('./packages/resourceful-redux/test/setup/.globals');

const Instrumenter = isparta.Instrumenter;

// Load all of our Gulp plugins
const $ = loadPlugins();

function cleanDist(done) {
  del([
    'packages/*/dist',
    'packages/resourceful-redux/action-creators',
    'packages/resourceful-redux/prop-types',
  ]).then(() => done());
}

function cleanTmp(done) {
  del(['tmp']).then(() => done());
}

// Lint a set of files
function lint(files) {
  return gulp.src(files)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
}

function lintSrc() {
  return lint('packages/*/[^node_modules]/**/*.js');
}

function lintTest() {
  return lint('./packages/*/test/**/*.js');
}

function lintGulpfile() {
  return lint('gulpfile.js');
}

function buildFile({src, dest, destFilename, library, externals}) {
  const inProduction = process.env.NODE_ENV === 'production';
  const plugins = [
    // In production set the 'NODE_ENV' value to 'production'.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(inProduction ? 'production' : 'development')
    }),

    // Minify the source code during production.
    inProduction && new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      output: {
        comments: false
      },
      compress: {
        warnings: false,
        screw_ie8: true
      }
    })
  ].filter(Boolean);

  const min = inProduction ? '.min' : '';

  const webpackConfig = {
    output: {
      filename: `${destFilename}${min}.js`,
      libraryTarget: 'umd',
      library
    },
    plugins,
    externals,
    module: {
      rules: [
        {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
      ]
    },
    devtool: 'source-map'
  };

  return gulp.src(src)
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(dest));
}

function buildResourceful() {
  return buildFile({
    src: 'packages/resourceful-redux/src/index.js',
    dest: 'packages/resourceful-redux/dist',
    destFilename: 'resourceful-redux',
    library: 'resourcefulRedux'
  });
}

function buildPropTypes() {
  return buildFile({
    src: 'packages/prop-types/src/index.js',
    dest: 'packages/prop-types/dist',
    destFilename: 'index',
    library: 'resourcefulPropTypes',
    externals: {
      'prop-types': true
    }
  });
}

function buildActionCreators() {
  return buildFile({
    src: 'packages/action-creators/src/index.js',
    dest: 'packages/action-creators/dist',
    destFilename: 'index',
    library: 'resourcefulActionCreators',
    externals: {
      'resourceful-redux': true,
      xhr: true,
      querystringify: true
    }
  });
}

function _mocha() {
  return gulp.src([
    'packages/resourceful-redux/test/setup/node.js',
    'packages/resourceful-redux/test/unit/**/*.js'
  ], {read: false})
    .pipe($.mocha({
      reporter: 'dot',
      globals: Object.keys(mochaGlobals.globals),
      ignoreLeaks: false
    }));
}

function _registerBabel() {
  require('babel-register');
}

function test() {
  _registerBabel();
  return _mocha();
}

function coverage(done) {
  _registerBabel();
  gulp.src(['packages/*/src/**/*.js'])
    .pipe($.istanbul({
      instrumenter: Instrumenter,
      includeUntested: true
    }))
    .pipe($.istanbul.hookRequire())
    .on('finish', () => {
      return test()
        .pipe($.istanbul.writeReports())
        .on('end', done);
    });
}

const watchFiles = ['packages/**/*', 'packages/*/test/**/*', 'package.json', '**/.eslintrc'];

// Run the headless unit tests as you make changes.
function watch() {
  gulp.watch(watchFiles, ['test']);
}

// Remove the built files
gulp.task('clean', cleanDist);

// Remove our temporary files
gulp.task('clean-tmp', cleanTmp);

// Lint our source code
gulp.task('lint-src', lintSrc);

// Lint our test code
gulp.task('lint-test', lintTest);

// Lint this file
gulp.task('lint-gulpfile', lintGulpfile);

// Lint everything
gulp.task('lint', ['lint-src', 'lint-test', 'lint-gulpfile']);

// Build the libs
gulp.task('buildResourceful', buildResourceful);
gulp.task('buildPropTypes', buildPropTypes);
gulp.task('buildActionCreators', buildActionCreators);
gulp.task('build', callback => {
  runSequence(
    'lint',
    ['buildResourceful', 'buildPropTypes', 'buildActionCreators'],
  callback);
});

// Lint and run our tests
gulp.task('test', ['lint'], test);

// Set up coverage and run tests
gulp.task('coverage', ['lint'], coverage);

// Run the headless unit tests as you make changes.
gulp.task('watch', watch);

// An alias of test
gulp.task('default', ['test']);
