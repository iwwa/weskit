'use strict';

// ####################################
// Lists of Gulp Plugins
// ####################################

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const pump = require('pump');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const bsync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const estream = require('event-stream');
const cssmin = require('gulp-cssmin');
const htmlreplace = require('gulp-html-replace');
const runsequence = require('run-sequence');
const clean = require('gulp-clean');
const fs = require('fs');
const yargs = require('yargs').argv;
const gulpif = require('gulp-if');
const sprity = require('sprity');

// ####################################
// List of Gulp tasks
//
// You can edit tasks names. For
// example: by default there's a css
// task, but you can exchange the name
// as you want. You could call it as
// styles, and you use it like:
//
// gulp styles
// ####################################

const tasks = {
  sprites: 'sprites',
  css: 'css',

  js: 'js',
  concat_js: 'concat_js',
  uglify: 'uglify',

  html: 'html',
  html_min: 'html_min',
  html_replace: 'html_replace',

  images: 'images',

  watch: 'watch',
  server: 'server',
  clean: 'clean',

  default: 'default',
  production: 'production',
  init: 'init'
};

// ####################################
// List of Gulp paths
//
// You can rename the project folders
// as you want. For example, you could
// call the production folder as 'build'.
//
// You can also exchange the working
// project folders. For example, you
// can call your js folders as
// 'JavaScripts' instead of 'js'
// ####################################

const company = 'IWWA Agência Digital';
const theme_label = '2 de Julho';
const theme_name = '2dejulho';

const project_dist = `wp-content/themes/${theme_name}`;
const project_src = 'app';

const js_folder_name = 'js';
const css_folder_name = 'css';
const img_folder_name = 'img';

const paths = {
  // JavaScripts
  scripts: {
    dest: `${project_dist}/${js_folder_name}`,
    root: `${project_src}/${js_folder_name}`,
    origin: {
      internal: [
        `${project_src}/${js_folder_name}/script.js`
      ],
      external: [
        'bower_components/jquery/dist/jquery.min.js'
      ]
    }
  },

  // Styles (SASS/CSS)
  styles: {
    root: `${project_src}/${css_folder_name}`,
    dest: `${project_dist}/${css_folder_name}`,
    origin: {
      // SASS files
      internal: [
        `${project_src}/${css_folder_name}/style.{scss,sass}`
      ],
      // CSS files
      external: []
    }
  },

  // Views
  views: {
    origin: `${project_src}/**/*.{html,php}`,
    dest: project_dist,
  },

  // Images to be minified
  images: {
    origin: `${project_src}/${img_folder_name}`,
    sprites_origins: `${project_src}/${img_folder_name}/sprites/**/*`,
    dest: `${project_dist}/${img_folder_name}`,
  },

  // Folders and files to be cleaned after development
  to_be_cleanded: [
    `${project_dist}/*`,
    `!${project_dist}/style.css`
    // 'node_modules'
  ]
}


// ####################################
// List of Gulp tasks
//
// There's some gulp tasks to work
// with code concatenation, uglification,
// replaces and a lot of other possibilities
// ####################################

gulp.task(tasks.css, () => {
  const cssStream = gulp.src(paths.styles.origin.external);
  const sassStream = gulp.src(paths.styles.origin.internal)
    .pipe(sass({
      // outputStyle: 'compressed'
    }))
    .on('error', sass.logError);

  return estream.merge(cssStream, sassStream)
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(sourcemaps.write('.'))
    .pipe(bsync.stream({
      match: '**/*.css'
    }))
    .pipe(gulp.dest(paths.styles.dest))
  // .on('end', () => console.log(`SASS files has been concatenated and minifed`));
});


gulp.task(tasks.concat_js, () => {
  return gulp.src(paths.scripts.origin.external.concat(`${paths.scripts.dest}/script.js`))
    .pipe(sourcemaps.init())
    .pipe(concat('script.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(bsync.stream({
      match: '**/*.js'
    }))
    .pipe(gulp.dest(paths.scripts.dest))
  // .on('end', () => console.log(`Listed origin and external JavaScript files has been concatenated`));
});


gulp.task(tasks.uglify, cb => {
  const options = {
    preserveComments: 'license',
    compress: {
      drop_console: false
    }
  };
  pump([
    gulp.src(paths.scripts.origin.internal),
    babel({
      presets: ['es2015']
    }),
    concat('script.js'),
    uglify(options),
    gulp.dest(paths.scripts.dest)
  ], cb)
  // .on('end', () => console.log(`${paths.scripts.dest}/script.js has been minified`));
});


gulp.task(tasks.html_min, () => {
  let options = {
    collapseWhitespace: true,
    includeAutoGeneratedTags: false,
    removeComments: true
  };
  if (yargs.xcss && yargs.xjs) {
    options.ignoreCustomComments = [
      /build:[a-zA-Z]{1,}/,
      /endbuild/,
    ];
  }
  return gulp.src(paths.views.origin)
    .pipe(htmlmin(options))
    .pipe(bsync.stream({
      match: '**/*.{html,php}'
    }))
    .pipe(gulp.dest(paths.views.dest));
  // .on('end', () => console.log(`${paths.views.origin} has been minified`));
});


gulp.task(tasks.html_replace, () => {
  if (yargs.xcss && yargs.xjs) {
    let css = `${paths.styles.dest}/style.css`;
    let js = `${paths.scripts.dest}/script.js`;
    let options = {};

    // Use gulp html_replace --xcss
    if (yargs.xcss) {
      // Take the content of CSS file and rip off all the "../"
      // references to refer from the index.html
      css = fs.readFileSync(`${css}`, 'utf8').split('../').join('');
      css = `<style>${css}</style>`;
      options['css'] = css;
      // console.log('Exchanged the CSS reference for the stylesheet content');
    }

    // Use gulp html_replace --xjs
    //
    // You can use like: gulp htmlreplace --xjs --xcss
    // to apply css and javascript replacement
    if (yargs.xjs) {
      //Take the content of JavaScript concatenated file and put it direct on body of index.html
      js = fs.readFileSync(`${js}`, 'utf8');
      js = `<script>${js}</script>`;
      options['js'] = js;
      // console.log('Exchanged the JS reference for the script content');
    }

    // It takes all html/php files and apply the html
    // replacement. It's important to say that all the
    // files will have the same reference/content for
    // CSS or JavaScript.
    gulp.src(`${project_dist}/**/*.{html,php}`)
      .pipe(htmlreplace(options))
      .pipe(gulp.dest(`${project_dist}/`));
    // .on('end', () => console.log('HTML replacement is done'));
  }
});


gulp.task(tasks.watch, () => {
  gulp.watch(paths.images.origin + '/**/*.{png,jpg,jpeg,gif,svg}', [tasks.images]);
  gulp.watch(paths.scripts.root + '/**/*.js', [tasks.js]);
  gulp.watch(paths.styles.root + '/**/*.{sass,scss}', [tasks.css]);
  gulp.watch(paths.views.origin, ['copy']);
  gulp.watch(`${project_src}/fonts/**/*`, ['copy']);
});


gulp.task(tasks.server, () => {
  bsync.init({
    server: {
      baseDir: `${project_dist}/`
    }
  });

  gulp.watch(paths.scripts.origin.internal_root + '/**/*.js', [tasks.js]).on('change', bsync.reload);
  gulp.watch(paths.styles.origin_root + '/**/*.scss', [tasks.css]).on('change', bsync.reload);
  gulp.watch(paths.views.origin, [tasks.html]).on('change', bsync.reload);
});


gulp.task(tasks.images, () => {
  return gulp.src(paths.images.origin + '/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true,
        optimizationLevel: 1 // Minimum 1 and Maximum 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5 // Minimum 0 and Maximum 7
      }),
      imagemin.svgo({
        plugins: [{
          removeViewBox: false
        }]
      })
    ]))
    .pipe(gulp.dest(paths.images.dest));
  // .on('end', () => console.log(`${paths.images.dest} has now optimizated images from ${paths.images.origin}`));
});


gulp.task(tasks.sprites, () => {
  return sprity.src({
      src: `${paths.images.sprites_origins}.{png,jpg}`,
      style: `./sprites.scss`,
      processor: 'sass'
    })
    .pipe(gulpif(
      '*.png',
      gulp.dest(paths.images.dest),
      gulp.dest(paths.styles.origin_root)
    ));
  // .on('end', () => {
  // console.log(`${paths.images.dest}/sprite.png has been created`);
  // console.log(`${paths.styles.origin_root}/sprites.scss has been created`);
  // })
});


gulp.task(tasks.clean, () => {
  return gulp.src(paths.to_be_cleanded)
    .pipe(clean({
      force: true
    }));
});


// Copy all files at the root level (app)
gulp.task('copy', () =>
  gulp.src([
    `${project_src}/fonts/**/*`,
    `${project_src}/**/*.php`
  ], {
    dot: true,
    base: `${project_src}` // Support Recursive
  })
  .pipe(gulp.dest(project_dist))
);


// Custom tasks
// ------------
gulp.task(tasks.js, () => {
  runsequence(
    tasks.uglify,
    tasks.concat_js
  );
});


gulp.task(tasks.html, () => {
  runsequence(
    tasks.html_min,
    tasks.html_replace
  );
});


gulp.task(tasks.init, [tasks.default], () => {
  const default_css = `/*\nTheme Name: ${theme_label}\nAuthor: ${company}\n*/`;
  fs.writeFile(`${project_dist}/style.css`, default_css);
});


gulp.task(tasks.production, [tasks.clean], cb =>
  runsequence(
    tasks.css,
    [
      tasks.js,
      // tasks.html,
      tasks.images,
      'copy'
    ],
    cb
  )
);


gulp.task(tasks.default, [
  tasks.production,
  tasks.watch
]);
