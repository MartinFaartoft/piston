var path = require('path');

module.exports = function (grunt) {

   //
   // Project configuration
   //
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      version: process.env.APPVEYOR_BUILD_VERSION || '<%= pkg.version %>',
      tscCmd: path.join('node_modules', '.bin', 'tsc'),
      jasmineCmd: path.join('node_modules', '.bin', 'jasmine'),
      jasmineConfig: path.join('src', 'test', 'jasmine.json'),
      jasmineJs: path.join('node_modules', 'jasmine', 'bin', 'jasmine.js'),
      
      //
      // Concatenate build files
      // Add banner to files
      //
      concat: {
         main: {
            src: ['dist/<%= pkg.name %>-<%= version %>.js'],
            dest: 'dist/<%= pkg.name %>-<%= version %>.js'
         },
         minified: {
            src: ['dist/<%= pkg.name %>-<%= version %>.min.js'],
            dest: 'dist/<%= pkg.name %>-<%= version %>.min.js'
         },
         options: {
            separator: '\n;\n',
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                    '* Copyright (c) <%= grunt.template.today("yyyy") %> Piston.js <<%= pkg.author %>>;' +
                    ' Licensed <%= pkg.license %>*/\n'
         }
      },

      //
      // Minify files
      //
      minified: {
         files: {
            src: 'dist/<%= pkg.name %>-<%= version %>.js',
            dest: 'dist/<%= pkg.name %>-<%= version %>'
         },
         options: {
            sourcemap: false,
            allinone: true,
            dest_filename: '.min.js'
         }
      },

      //
      // Watch files
      //
      watch: {
         scripts: {
            files: ['src/main/*.ts', 'src/main/*/*.ts', 'src/test/*.ts'],
            tasks: ['tslint:src', 'shell:specs'/*, 'jasmine_node'*/],
            options: {
               interrupt: true
            }
         }
      },

      //
      // Shell Commands
      //
      shell: {

         //
         // Typescript Compile engine 
         //
         tsc: {
            command: '<%= tscCmd %> --sourcemap --declaration "./src/main/engine.ts" --out "./dist/<%= pkg.name %>-<%= version %>.js"',               
            options: {
               stdout: true,
               failOnError: true
            }
         },
         
         //
         // TypeScript Compile Jasmine tests
         //
         specs: {
            command: function () {
            	var files = grunt.file.expand("./src/test/*.ts");

            	return '<%= tscCmd %> ' + files.join(' ') + ' --out ./build/test/test.js'
            },
            options: {
               stdout: true,
               failOnError: true
            }
         },
         
         //
         // Jasmine NPM command
         //
         tests: {
             command: '<%= jasmineCmd %> JASMINE_CONFIG_PATH=<%= jasmineConfig %>',
             options: {
                 stdout: true,
                 failOnError: true
             }
         },

      },

      //
      // TS Lint configuration
      //
      tslint: {
         options: {
            formatter: 'prose',
            configuration: grunt.file.readJSON('./tslint.json')            
         },
         src: [
            "src/**/*.ts",
            // exclusions
            "!src/**/*.d.ts"
         ]
      },
   });

   //
   // Load NPM Grunt tasks as dependencies
   //
   grunt.loadNpmTasks('grunt-shell');
   grunt.loadNpmTasks('grunt-minified');
   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-tslint');
   grunt.loadNpmTasks('grunt-contrib-watch');
   
   //
   // Register available Grunt tasks
   //

   // Run tests quickly
   grunt.registerTask('tests', ['shell:specs', 'shell:tests']);

   grunt.registerTask('compile', ['shell:tsc', 'minified', 'concat'])

   grunt.registerTask('server', [])
   
   // Default task - compile, test, build dists
   grunt.registerTask('default', ['tslint:src', 'shell:specs', 'shell:tests', 'shell:tsc', 'minified', 'concat']);

};