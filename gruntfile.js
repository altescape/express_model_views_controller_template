module.exports = function(grunt) {
  'use strict';

  var watchFiles = {
    serverJS: [
      'gruntfile.js', 
      'app.js', 
      'config/*.js', 
      'controllers/*.js',
      'controllers/**/*.js',
      'models/*.js',
      'models/**/*.js',
      'routes/*.js',
      'routes/**/*.js'
    ],
    clientStyl: [
      'public/stylesheets/*.styl', 
      'public/stylesheets/**/*.styl'
    ],
    clientJS: [
      'gruntfile.js', 
      'public/javascripts/*.js', 
      'public/javascripts/**/*.js',
      'public/locales/*.json',
      '!public/javascripts/modernizr.js'
    ],
    clientCSS: [
      'public/stylesheets/*.css', 
      'public/stylesheets/**/*.css'
    ],
    clientViews: ['views/*.jade', 'views/**/*.jade'],
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      serverJS: {
        files: watchFiles.serverJS,
        options: {
          livereload: true
        }
      }, 

      clientStyl: {
        files: watchFiles.clientStyl,
        tasks: ['stylus'],
        options: {
          livereload: true
        }
      }, 

      clientJS: {
        files: watchFiles.clientJS,
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },

      clientCSS: {
        files: watchFiles.clientCSS,
        tasks: [],
        options: {
          livereload: true
        }
      },

      clientViews: {
        files: watchFiles.clientViews,
        tasks: [],
        options: {
          livereload: true
        }
      }
    },

    jshint: {
      all: watchFiles.clientJS,
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },

    stylus: {
      compile: {
        options: {
          linenos: true,
          paths: ['public/stylesheets/']
        },
        files: {
          'public/stylesheets/style.css': [ 'public/stylesheets/style.styl' ]
        }
      }
    },

    uglify: {
      production: {
        options: { mangle: false },
        files: { 'public/dist/application.min.js': 'public/dist/application.js' }
      }
    },

    cssmin: {
      combine: {
        files: { 'public/dist/style.min.css': 'public/stylesheets/style.css' }
      }
    },

    nodemon: {
      dev: {
        script: 'npm start',
        options: {
          nodeArgs: ['--debug'],
          ext: 'js',
          watch: watchFiles.serverJS
        },
        ignore: ['node_modules/**']
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.option('force', true);

  grunt.registerTask('default', ['stylus', 'jshint', 'watch', 'nodemon']);
  grunt.registerTask('build', ['stylus', 'cssmin', 'uglify']);
};
