// module.exports = function(grunt){

//     grunt.initConfig({
//         pkg: grunt.file.readJSON('package.json')
//     });

//     grunt.registerTask('default', []);

// };
//
// 1. Add require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks); Not load-grunt-tasks as it prevents us from loading other dependencies

// Source folders
var jsFolder = 'js/';
var cssFolder = 'css/';

// Build folders
var buildFolder = 'build/';
var jsBuildFolder = buildFolder + 'js/';
var cssBuildFolder = buildFolder + 'css/';

// Temp folders
var tempFolder = 'temp/';
var jsTempFolder = tempFolder + 'js/';
var cssTempFolder = tempFolder + 'css/';

/**
 * Concat configuration.
 * @type {Object}
 */
var concatConfig = {
  dist: {
    src: [jsFolder + 'lib/*.js', jsFolder + 'game/lib/*.js', jsFolder + 'game/*.js', jsFolder + '*.js'], // Build using a function to ensure dependencies
    dest: jsTempFolder + '<%= pkg.name %>-<%= pkg.version %>.js'
  }
};

/**
 * Uglify configuration.
 * @type {Object}
 */
var uglifyConfig = {
  options: {
    // the banner is inserted at the top of the output
    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
  },
  dist: {
    files: {
      'build/js/<%= pkg.name %>-<%= pkg.version %>.min.js': ['<%= concat.dist.dest %>']
    }
  }
};

// Main function for running the grunt tasks
module.exports = function(grunt){

  // Load all grunt dependencies, avoids us having to call loadNpmTasks for all tasks
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  var fullBuild = ['prepare', 'concat', 'uglify', 'cleanup', 'watch'];

  // Configure tasks
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      'prepare': {
        'options': {
          'option': 'test'
        },
        'javascript': {
          'options': {
            'option': 'Hello!!!'
          },
        }
      },
      'concat': concatConfig,
      'uglify': uglifyConfig,
      'cleanup': { 'javascript': {} },
      'watch': {
          'javascript': {
            'files': ['js/**/*.js'],
            'tasks': ['prepare:javascript', 'concat', 'uglify', 'cleanup'],
            'options': {
              'livereload': true,
            }
          }
      }
  });

  // Prepare task (Custom)
  grunt.registerMultiTask('prepare', 'Performs final cleanup', function() {
    grunt.log.write(this.options().option);
    if (this.target === 'javascript') {
      grunt.file.delete(jsBuildFolder, { 'force': true });
    }
  });

  // Clean up task (Custom)
  grunt.registerMultiTask('cleanup', 'Performs final cleanup', function() {
    grunt.file.delete(tempFolder, { 'force': true });
    grunt.file.copy('index.html', 'build/index.html');
  });

  // Register default tasks
  grunt.registerTask('default', ['prepare', 'concat', 'uglify', 'cleanup', 'watch']);

};