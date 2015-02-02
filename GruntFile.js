// module.exports = function(grunt){

//     grunt.initConfig({
//         pkg: grunt.file.readJSON('package.json')
//     });

//     grunt.registerTask('default', []);

// };
//
// 1. Add require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks); Not load-grunt-tasks as it prevents us from loading other dependencies


module.exports = function(grunt){
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'concat': {}
    });

    grunt.registerTask('default', []);

};