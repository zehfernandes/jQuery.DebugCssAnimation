/*
 *  jQuery Debug Css Animation - v1.0
 *  jQuery plugin to Debug quickly CSS animations
 *  http://zehfernandes.github.io/jQuery.DebugCssAnimation/
 *
 *  Made by Zeh Fernandes
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "debugCssAnimation",
				defaults = {
				debugClass: "debug-animation"
		};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.options = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
				this.elementArray;
		}

		Plugin.prototype = {
				init: function () {
						// Place initialization logic here
						// You already have access to the DOM element and
						// the options via the instance, e.g. this.element
						// and this.options
						// you can add more functions like the one below and
						// call them like so: this.yourOtherFunction(this.element, this.options).
						var self = this;
						this.elementArray = $( "."+ self.options.debugClass );
						this.pfx = ["-webkit-", "-moz-", "-o-", ""];


						$.each(this.elementArray, function() {
						  $_this = $(this);
						  $_this.wrap("<div class='debug-container'></div>");
						});

						this.createControls(self);

				},
				createControls: function (self) {
					var containerUl;

					containerUl = $("<ul/>", {
						class: "debug-controls"
					}).appendTo("body");

					$("<li/>").append(
						$("<select/>", {"class": "debug-elements" })
					).appendTo(containerUl);

					if (self.elementArray.length > 1) {
						$(".debug-elements").append("<option value=all>All Elements</option>");
					}
					$.each(self.elementArray, function (i) {
				        $(".debug-elements").append("<option value="+i+">" + $(this).prop("tagName") + " - " + $(this).attr("class").replace("debug-animation", "") + "</option>");
				    });

					$("<li/>", { "class": "debug-pause" }).append(
						$("<a/>", { text: "Pause", href: "#",
							click: function() {
								var debugElement = self.getElementToDebug(self);
								self.pauseCssAnimation(debugElement);
							}
						})
					).appendTo(containerUl);

					$("<li/>", { "class": "debug-play" }).append(
						$("<a/>", { text: "Play", href: "#",
							click: function() {
								var debugElement = self.getElementToDebug(self);
								self.resumeCssAnimation(debugElement);
							}
						})
					).appendTo(containerUl);

					$("<li/>", {"class" : "debug-repeat" }).append(
						$("<a/>", { text: "Reset", href: "#",
							click: function() {
								var debugElement = self.getElementToDebug(self);
								self.resetCssAnimation(debugElement);
							}
						})
					).appendTo(containerUl);


					//CSS
					$(".debug-controls").css({
						"background" : "#242424",
						"border-radiuns": "5px",
						"overflow": "hidden",
						"padding":  "15px 15px",
						"width": "260px",
						"position": "absolute",
						"bottom": 40,
						"right": 30,
						"list-style": "none",
						"margin": 0,
						"font-size": "1.3em"
					});
					$(".debug-controls li").css({
						"float" : "left",
						"margin-right": "10px",
						"width": "auto"
					});

					//Import Stylesheet for unique call
					cssId = "myCss";
					if (!document.getElementById(cssId)) {
					    head  = document.getElementsByTagName("head")[0],
					    link  = document.createElement("link");
					    link.id   = cssId;
					    link.rel  = "stylesheet";
					    link.type = "text/css";
					    link.href = "http://zehfernandes.github.io/jQuery.DebugCssAnimation/dist/debug-controls.css";
					    link.media = "all";
					    head.appendChild(link);
					}

				},
				getElementToDebug: function (self) {
					var index = $( ".debug-elements" ).val();
					if (index === "all") {
						return self.elementArray;
					} else {
						return self.elementArray[index];
					}
				},
				resumeCssAnimation: function (element) {
					for (var i=0 ; i< this.pfx.length; i++) {
						$(element).css(this.pfx[i]+"animation-play-state", "running");
					}
				},
				pauseCssAnimation: function (element) {
					for (var i=0 ; i< this.pfx.length; i++) {
						$(element).css(this.pfx[i]+"animation-play-state", "paused");
					}
				},
				resetCssAnimation: function (element) {
					if (element.length) {
						$.each(element, function () {
							$(this).appendTo($(this).parent());
						});
					} else {
						$(element).appendTo($(element).parent());
					}
				}
		};

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );
