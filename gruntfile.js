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
        // Uglify files
        //
        uglify: {
            my_target: {
                files: {
                    'dist/<%= pkg.name %>-<%= version %>.min.js': ['dist/<%= pkg.name %>-<%= version %>.js']
                }
            },
            options: {
                mangle: false,
            }
        },

        //
        // Watch files
        //
        watch: {
            scripts: {
                files: ['src/**/*.ts'],
                tasks: ['release'],
            },
            livereload: {
                options: { livereload: true },
                files: ['sample/game.js', 'dist/piston-0.3.0.js']
            }
        },

        //
        // Shell Commands
        //
        shell: {
            clean: {
                command: 'rm -rf dist/* && rm -rf build/* && rm -rf sample/*'
            },

            //
            // Typescript Compile engine 
            //
            tsc: {
                command: '<%= tscCmd %> --sourcemap --declaration "./src/main/export.ts" --out "./dist/<%= pkg.name %>-<%= version %>.js"',
                options: {
                    stdout: true,
                    failOnError: true
                }
            },

            //
            // Typescript Compile Sample Game
            //
            sample: {
                command: '<%= tscCmd %> --p "./src/sample"'
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
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //
    // Register available Grunt tasks
    //

    // Run tests quickly
    grunt.registerTask('clean', ['shell:clean']);

    grunt.registerTask('test', ['shell:specs', 'shell:tests']);

    grunt.registerTask('travis', ['compile', 'test']);

    grunt.registerTask('compile', ['tslint:src', 'shell:tsc', 'shell:sample'])

    grunt.registerTask('release', ['clean', 'compile', 'test', 'uglify'])

    grunt.registerTask('server', [])

    // Default task - compile, test, build dists
    grunt.registerTask('default', ['release']);

};