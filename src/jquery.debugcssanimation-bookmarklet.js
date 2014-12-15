javascript:(function(){

    var jquery = document.createElement('script');
    var head = document.getElementsByTagName ("head")[0] || document.documentElement;
    var debugScript = document.createElement('script');

    // Inject jQuery if not alredy present.
    // When jQuery is loaded (or if it's already present) inject css animations debug script
    if (typeof window.jQuery === 'undefined') {
        jquery.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js');
        head.insertBefore(jquery, head.firstChild);

        jquery.onload = jquery.onreadystatechange = function () {
            var readyState = jquery.readyState;
            if (!readyState || readyState === 'loaded' || readyState === 'complete') {
                jquery.onload = jquery.onreadystatechange = null;
                loadDebugScript();
            }
        };
    } else {
        loadDebugScript();
    }

    //When script is loaded, initialize the bookmarklet.
    debugScript.onload = debugScript.onreadystatechange = function () {
        var readyState = debugScript.readyState;
        if (!readyState || readyState === 'loaded' || readyState === 'complete') {
            debugScript.onload = debugScript.onreadystatechange = null;
            debugAnimations();
        }
    };

    // Inject debug script into head
    function loadDebugScript() {
        debugScript.setAttribute('src', 'http://zehfernandes.github.io/jQuery.DebugCssAnimation/dist/jquery.debugcssanimation.min.js');
        head.insertBefore(debugScript, head.firstChild);
    }

    function debugAnimations() {
        var classes = prompt("Which elements would you like to debug?\n\rPlease enter jQuery selector:");

        if (!classes) { return false; }

        // We don't want to break the page if entered selector is invalid
        try {
            $(classes).addClass('debug-animation');
        } catch (error) {
            console.error('Invalid jQuery selector entered.');
            return false;
        }

        $('body').debugCssAnimation({
            debugClass: "debug-animation"
        });
    }

}());