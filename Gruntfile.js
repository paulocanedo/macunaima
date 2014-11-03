/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    // pkg: grunt.config('package.json'),
    pkg: grunt.file.readJSON('package.json'),
    banner: '/* macunaima - v<%= pkg.version %>\n' + 
    // banner: '/*! macunaima - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>*/\n',
      // '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      // '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      // ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    // concat: {
    //   options: {
    //     banner: '<%= banner %>',
    //     stripBanners: true
    //   },
    //   dist: {
    //     src: ['lib/Command.js', 'lib/Player.js'],
    //     dest: 'lib/<%= pkg.name %>.js'
    //   }
    // },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: ['lib/DataService.js'],
        dest: 'app/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  // grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.file.copy('bower_components/angularjs/angular.min.js', 'app/lib/js/angular.min.js');
  grunt.file.copy('bower_components/angular-touch/angular-touch.min.js', 'app/lib/js/angular-touch.min.js');
  grunt.file.copy('bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.min.js', 'app/lib/js/mobile-angular-ui.min.js');
  grunt.file.copy('bower_components/mobile-angular-ui/dist/css/mobile-angular-ui-base.min.css', 'app/lib/css/mobile-angular-ui-base.min.css');
  grunt.file.copy('bower_components/mobile-angular-ui/dist/css/mobile-angular-ui-hover.min.css', 'app/lib/css/mobile-angular-ui-hover.min.css');
  grunt.file.copy('bower_components/mobile-angular-ui/dist/fonts/fontawesome-webfont.woff', 'app/lib/fonts/fontawesome-webfont.woff');

  // Default task.
  grunt.registerTask('default', ['jshint', 'uglify']);

};
