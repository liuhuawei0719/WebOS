/**
 * Created by Hughie Liu on 2016/8/4.
 */

//包装函数
module.exports = function(grunt) {
    //插件配置
    grunt.initConfig({
        //获取package.json信息
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/js/**.js'],
                dest: 'dist/js/<%= pkg.name %>-full.js'
            },
            cssdist:{
                src: ['src/css/**.css'],
                dest: 'dist/css/<%= pkg.name %>.css'
            }
        },

        //uglify
        uglify: {
            buildall: {
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - by <%= pkg.author %> ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    mangle: {
                        except: ['jQuery']
                    },
                    compress: {
                        drop_console: true
                    },
                    // object properties mangling(将非浏览器内置对象名进行混淆)
                    // mangleProperties: true,
                    // reserveDOMCache: true,
                    //压缩美化
                    // beautify: {
                    //     width: 10,
                    //     beautify: true
                    // },
                    report: "gzip"
                },

                //Compiling all files in a folder dynamically
                files: [{
                    expand:true,
                    cwd: 'src',
                    src: 'js/*.js',
                    dest:'dist'
                }]
              }
             },

        //jshint
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                jshintrc:'.jshintrc',
                //这里是覆盖JSHint默认配置的选项
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },

        //watch
        watch: {
            scripts: {
                files: [
                    'src/{,*/}*.css',
                    'src/{,*/}*.js',
                    'src/{,*/}*.html'
                ],
                tasks: ['default'],
                options:{
                    spawn: true,
                    interrupt: true
                }
            }
        },

        //copy
        copy: {
            main: {
                expand: true,
                cwd: 'src',
                src: '**/*',
                dest: 'dist'
                // flatten: true,
                // filter: 'isFile'
            }
        },

        //cssmin
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        }
    });

    //加载npm任务
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    //注册任务
    grunt.registerTask('minall',['uglify:buildall']);
    // grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('all', ['jshint','cssmin','copy','concat','uglify','watch']);
    grunt.registerTask('defalut',['copy','concat','cssmin','uglify']);
};
