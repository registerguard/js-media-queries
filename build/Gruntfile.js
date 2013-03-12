/*global module:false*/

module.exports = function(grunt) {
	
	'use strict';
	
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		
		/*----------------------------------( META )----------------------------------*/
		
		meta: {
			
			banner_long: '/**\n' +
			             ' * <%= pkg.title || pkg.name %>\n' +
			             '<%= pkg.description ? " * " + pkg.description + "\\n" : "" %>' +
			             ' *\n' +
			             '<%= pkg.author.name ? " * @author " + pkg.author.name + "\\n" : "" %>' +
			             '<%= pkg.author.url ? " * @link " + pkg.author.url + "\\n" : "" %>' +
			             '<%= pkg.homepage ? " * @docs " + pkg.homepage + "\\n" : "" %>' +
			             ' * @copyright Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>.\n' +
			             '<%= pkg.licenses ? " * @license Released under the " + _.pluck(pkg.licenses, "type").join(", ") + ".\\n" : "" %>' +
			             '<%= pkg.version ? " * @version " + pkg.version + "\\n" : "" %>' +
			             ' * @date <%= grunt.template.today("yyyy/mm/dd") %>\n' +
			             ' */\n\n',
			
			banner_short: '/*! ' +
			              '<%= pkg.title || pkg.name %>' +
			              '<%= pkg.version ? " v" + pkg.version : "" %>' +
			              '<%= pkg.licenses ? " | " + _.pluck(pkg.licenses, "type").join(", ") : "" %>' +
			              '<%= pkg.homepage ? " | " + pkg.homepage : "" %>' +
			              ' */'
			
		},
		
		/*----------------------------------( 01 )----------------------------------*/
		
		/**
		 * Validate files with JSHint.
		 *
		 * @see http://www.jshint.com/docs/
		 * @see https://github.com/gruntjs/grunt-contrib-jshint
		 */
		
		jshint: {
			
			options: {
				
				jshintrc: '.jshintrc'
				
			},
			
			init: [
				
				'./Gruntfile.js',
				'./src/<%= pkg.name %>.js'
				
			]
			
		},
		
		/*----------------------------------( 02 )----------------------------------*/
		
		/**
		 * Clean files and folders.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-clean
		 */
		
		clean : {
			
			options : {
				
				force : true // Sketchy!
				
			},
			
			dist : [
				
				'../<%= pkg.name %>/**/*'
				
			]
			
		},
		
		/*----------------------------------( 03 )----------------------------------*/
		
		/**
		 * Minify files with UglifyJS.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-uglify
		 */
		
		uglify: {
			
			target: {
				
				options: {
					
					banner: '<%= meta.banner_short %>'
					
				},
				
				files: {
					
					'../<%= pkg.name %>/<%= pkg.name %>.min.js': ['./src/<%= pkg.name %>.js']
					
				}
				
			}
			
		},
		
		/*----------------------------------( 04 )----------------------------------*/
		
		/**
		 * Concatenate files.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-concat
		 */
		
		concat: {
			
			options: {
				
				banner: '<%= meta.banner_long %>'
				
			},
			
			dist: {
				
				src: ['./src/<%= pkg.name %>.js'],
				dest: '../<%= pkg.name %>/<%= pkg.name %>.js'
				
			}
			
		}
		
	});
	
	//--------------------------------------------------------------------
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	//----------------------------------
	
	grunt.registerTask('default', ['jshint', 'clean', 'uglify', 'concat']);
	
};
