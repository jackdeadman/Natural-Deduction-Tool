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
                src: [
                    'js/src/models/Operator.js', 'js/src/models/Parser.js', 'js/src/models/Rules.js',
                    'js/src/view_logic/Box.js', 'js/src/view_logic/Expressions.js', 'js/src/view_logic/InputBox.js',
                    'js/src/main.js'
                
                ],
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
        }
        
    });
        
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat')
    
    grunt.registerTask('default',['concat','connect','watch']);
    
}