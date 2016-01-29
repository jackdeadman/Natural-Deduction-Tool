module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
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
                files: ['*.js'],
            }
        },
        
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
                src: ['js/src/Box.js','js/src/Expressions.js', 'js/src/InputBox.js', 'js/src/parsetree.js', 'js/src/main.js'],
                dest: 'js/main.js'
            }
        }
    });
        
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat')
    
    grunt.registerTask('default',['concat','connect','watch']);
    
}