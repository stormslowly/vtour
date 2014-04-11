'use strict';
/*global module:false , require:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.

    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0',
        base: '.'
      },
      livereload: {
        options: {
          middleware: function (connect, options) {
              return [
                require('connect-livereload')({port:35737}),
                // Serve static files.
                connect.static(options.base),
                // Make empty directories browsable.
                connect.directory(options.base)
              ];
          }
        }
      },
    },
    watch: {
      livereload: {
        options: {
          livereload: 35737
        },
        files: [
          'public/vtour/**/*.xml',
          'public/vtour/tour.html'
        ]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task.
  grunt.registerTask('default', ['connect','watch']);

};
