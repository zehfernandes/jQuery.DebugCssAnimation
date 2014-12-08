jQuery.DebugCssAnimation
========================

jQuery plugin to Debug quickly CSS animations. The plugin create a control station for you: pause, play and reset each element or all with css class `debug-animation`

![alt text](https://photos-5.dropbox.com/t/1/AADSHeF06BBYEQXFqlmamFAZhC37IvsSEtzus8x2_deQnQ/12/8015936/png/32x32/3/_/1/2/control-panel-img.png/FFMkw9fj5CKPi708VTjsapoXpuoGajRvTUN6UfZSSnE?size=1280x960 "Image of control panel")

[Check the demo](http://zehfernandes.github.io/jQuery.DebugCssAnimation/demo/)

## Setup

jQuery Debug Css Animation depends on jQuery. Include them both in end of your HTML code:

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<script src="http://zehfernandes.github.io/jQuery.DebugCssAnimation/dist/jquery.debugcssanimation.min.js"></script>
```

then in your code do:

```javascript
$('body').debugCssAnimation({
	debugClass: "debug-animation"
});
```
and put the css class `debug-animation` in the elements that you want debug, like this:

```html
<h1 class="debug-animation anotherclass">Debug Css Animations</h1>
<p class="debug-animation">Lorem ipsum</p>
```

## To-do

* Try to discover a way to build a timeline (if you have a idea how to do that. Help! :D)
* Add CSS Transition support
* Put a button for change the easing effects during the tests.

## Thanks

* [Jquery Boilerplate](http://jqueryboilerplate.com/)
* [Nicola Gallagher - Pure CSS GUI icons](http://nicolasgallagher.com/pure-css-gui-icons/)

