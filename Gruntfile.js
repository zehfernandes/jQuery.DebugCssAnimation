module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("debugcssanimation.jquery.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.licenses[0].type %> License\n" +
				" */\n"
		},

		// Concat definitions
		concat: {
			dist: {
				src: ["src/jquery.debugcssanimation.js"],
				dest: "dist/jquery.debugcssanimation.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// Lint definitions
		jshint: {
			files: ["src/jquery.debugcssanimation.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		// Minify definitions
		uglify: {
			my_target: {
				src: ["dist/jquery.debugcssanimation.js"],
				dest: "dist/jquery.debugcssanimation.min.js"
			},
			// TODO: uglify creates '!function' minified code, so 'javascript:' should be prepended to it for bookmarklet to work.
			// Also, 'javascript:!javascript()' generated code doesn't work in Firefox, so it should be changed to 'javascript:(function()'
			bookmarklet: {
				src: ["src/jquery.debugcssanimation-bookmarklet.js"],
				dest: "src/jquery.debugcssanimation-bookmarklet.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("default", ["jshint", "concat", "uglify"]);
	grunt.registerTask("travis", ["jshint"]);

};
