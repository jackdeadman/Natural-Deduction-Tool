module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        connect: {
            server: {
                options: {
                    port: 5000,
                    base: '.'
                }
            }
        },
        
        concat: {
            dist: {
                src: ['js/src/Operator.js', 'js/src/Rules.js', 'js/src/Parser.js','js/src/Box.js','js/src/Expressions.js', 'js/src/InputBox.js', 'js/src/parsetree.js', 'js/src/main.js'],
                dest: 'js/main.js'
            }
        },
        
        watch: {
            options: {
                livereload: true,
            },
            css: {
                files: ['*.css'],
            },
            html: {
                files: ['*.html'],
            },
            scripts: {
                files: ['js/src/*.js'],
                tasks: ['concat']
            },
        },
        
        jasmine: {
            app: {
                src: 'js/*.js',
                options: {
                    specs: 'spec/*Spec.js',
                    helpers: 'spec/*Helper.js',
                    host: 'http://127.0.0.1:5000/'
                }
            }
        }
        
    });
        
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    
    grunt.registerTask('default',['concat','connect','watch']);
    
}