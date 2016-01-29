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
        },
        
        connect: {
            server: {
                options: {
                    port: 5000,
                    base: '.'
                }
            }
        }
    });
        
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default',['connect','watch']);
    
}