const sass = require("node-sass");
module.exports = function (grunt) {
  grunt.initConfig({
    clean: {
      dist: ["build"],
    },
    copy: {
      fonts: {
        expand: true,
        cwd: "node_modules/bootstrap-icons/font/fonts",
        src: ["*"],
        dest: "build/fonts",
      },
    },
    concat: {
      css: {
        options: {
          sourceMap: true,
        },
        src: [
          "src/css/style.css",
          "src/css/bootstrap.css",
          "src/css/bootstrap-icon.css",
          "src/css/App.css",
        ],
        dest: "build/styles.css",
      },
    },
    sass: {
      options: {
        implementation: sass,
        sourceMap: true,
      },
      // Task
      build: {
        files: [
          {
            src: "src/scss/style.scss",
            dest: "src/css/style.css",
          },
          {
            src: "node_modules/bootstrap/scss/bootstrap.scss",
            dest: "src/css/bootstrap.css",
          },
          {
            src: "./node_modules/bootstrap-icons/font/bootstrap-icons.scss",
            dest: "src/css/bootstrap-icon.css",
          },
        ],
      },
    },
    watch: {
      sass: {
        files: ["src/scss/**/*.scss"],
        tasks: ["sass"],
      },
      concat: {
        files: ["src/css/**/*.css"],
        tasks: ["concat"],
      },
      gruntfile: {
        files: ["Gruntfile.js"],
        tasks: ["concat", "sass"],
      },
    },
  });

  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");

  grunt.registerTask("default", ["clean", "copy", "sass", "concat", "watch"]);
};
