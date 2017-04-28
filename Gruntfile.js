'use strict';
module.exports = function(grunt) {
    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin',
        ngtemplates: 'grunt-angular-templates',
        // sass: 'grunt-contrib-sass',
        // cdnify: 'grunt-google-cdn',
    });


    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: 'build'
    };


    // Project configuration.
    grunt.initConfig({
        // Project settings
        pkg: appConfig,
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['<%= pkg.app %>/**/*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                tasks: ['newer:jshint:all'],
                files: [
                    '<%= pkg.app %>/**/*.html',
                    '<%= pkg.app %>/**/*.css',
                    '<%= pkg.app %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },
            configFiles: {
                files: ['Gruntfile.js', '.jshintrc'],
                tasks: ['newer:jshint:all'],
                options: {
                    reload: true
                }
            },
            scss: {
                files: ['<%= pkg.app %>/**/*.scss'],
                tasks: ['compass:server', 'postcss:server'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // hostname: '10.10.21.89'
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    // base: [
                    //     '.tmp',
                    //     ''
                    // ]
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect().use(
                                '/app/styles',
                                connect.static('./app/styles')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            }
        },
        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= pkg.app %>/app/**/{,*/}*.js'
                ]
            },
            // test: {
            //   options: {
            //     jshintrc: 'test/.jshintrc'
            //   },
            //   src: ['test/spec/{,*/}*.js']
            // }

        },
        // Automatically inject Bower components into the app
        wiredep: {
            app: {
                src: ['<%= pkg.app %>/index.html'],
                exclude: ['bower_components/bootstrap/dist/js/bootstrap.js', 'bower_components/jquery/dist/jquery.js', 'bower_components/angular-img-fallback/angular.dcb-img-fallback.js'],
                ignorePath: /\.\.\//
            },
            test: {
                devDependencies: true,
                src: '<%= karma.unit.configFile %>',
                ignorePath: /\.\.\//,
                fileTypes: {
                    js: {
                        block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
                        detect: {
                            js: /'(.*\.js)'/gi
                        },
                        replace: {
                            js: '\'{{filePath}}\','
                        }
                    }
                }
            }
        },
        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= pkg.dist %>/scripts/{,*/}*.js',
                    '<%= pkg.dist %>/assets/css/{,*/}*.css'
                    // '<%= pkg.dist %>/assets/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    // '<%= pkg.dist %>/assets/fonts/*'
                ]
            }
        },
        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= pkg.dist %>/{,*/}*',
                        '!<%= pkg.dist %>/.git{,*/}*'
                    ]
                }]
            },
            server: '.tmp'
        },
        copy: {
            app: {
                cwd: '<%= pkg.app %>', // set working folder / root to copy
                src: ['*.{ico,png,txt}',
                    '.htaccess',
                    '*.html'
                ], // copy all files and subfolders
                dest: '<%= pkg.dist %>/', // destination folder
                expand: true
            },
            html: {
                cwd: '<%= pkg.app %>', // set working folder / root to copy
                src: '**/*.html', // copy all files and subfolders
                dest: '<%= pkg.dist %>/', // destination folder
                expand: true
            },
            img: {
                cwd: '<%= pkg.app %>', // set working folder / root to copy
                src: 'assets/img/**', // copy all files and subfolders
                dest: '<%= pkg.dist %>/', // destination folder
                expand: true
            },
            fonts: {
                cwd: '<%= pkg.app %>', // set working folder / root to copy
                src: 'assets/fonts/**', // copy all files and subfolders
                dest: '<%= pkg.dist %>/', // destination folder
                expand: true
            },
            data: {
                cwd: '<%= pkg.app %>', // set working folder / root to copy
                src: 'assets/data/**', // copy all files and subfolders
                dest: '<%= pkg.dist %>/', // destination folder
                expand: true
            }
        },
        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= pkg.app %>/index.html',
            options: {
                dest: '<%= pkg.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },
        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= pkg.dist %>/**/{,*/}*.html'],
            css: ['<%= pkg.dist %>/assets/css/{,*/}*.css'],
            js: ['<%= pkg.dist %>/scripts/{,*/}*.js'],
            options: {
                assetsDirs: [
                    '<%= pkg.dist %>',
                    '<%= pkg.dist %>/assets/img',
                    '<%= pkg.dist %>/assets/fonts',
                    '<%= pkg.dist %>/assets/css'
                ],
                patterns: {
                    js: [
                        [/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']
                    ]
                }
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.app %>/assets/img',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= pkg.dist %>/assets/img'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.app %>/assets/img',
                    src: '{,*/}*.svg',
                    dest: '<%= pkg.dist %>/assets/img'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= pkg.dist %>',
                    src: ['*.html'],
                    dest: '<%= pkg.dist %>'
                }]
            }
        },
        ngtemplates: {
            dist: {
                options: {
                    module: 'DenverApp',
                    htmlmin: '<%= htmlmin.dist.options %>',
                    usemin: 'scripts/app.min.js'
                },
                // expand: true,
                cwd: '<%= pkg.app %>',
                src: 'app/**/{,*/}*.html',
                dest: '.tmp/templateCache.js'
            }
        },
        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },
        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'compass:server'
            ],
            test: [
                'compass'
            ],
            dist: [
                'compass:server',
                'imagemin',
                'svgmin'
            ]
        },


        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= pkg.app %>/assets/sass/',
                cssDir: '.tmp/assets/css/'
            },
            server: {
                options: {
                    sourcemap: true
                }
            }
        },
        // Add vendor prefixed styles
        postcss: {
            options: {
                processors: [
                    require('autoprefixer-core')({
                        browsers: ['last 1 version']
                    })
                ]
            },
            server: {
                options: {
                    map: true
                },
                files: [{
                    expand: true,
                    cwd: '.tmp/assets/css/',
                    src: '{,*/}*.css',
                    dest: '.tmp/assets/css/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/assets/css/',
                    src: '{,*/}*.css',
                    dest: '.tmp/assets/css/'
                }]
            }
        },
        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        }
    });
    // Default task(s).
    grunt.registerTask('build', ['jshint', 'clean', 'wiredep', 'useminPrepare', 'concurrent:dist', 'postcss', 'copy', 'concat', 'uglify', 'ngAnnotate', 'cssmin', 'uglify', 'filerev', 'usemin', 'htmlmin']);
    grunt.registerTask('serve', function(target) {
        grunt.task.run([
            'wiredep',
            'concurrent:server',
            'postcss:server',
            'connect:livereload',
            'watch'
        ]);
    });
    grunt.registerTask('test', [
        'karma'
    ]);

};
