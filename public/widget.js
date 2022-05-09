(function () {
    var widgetContainer = document.querySelector('#social-widget');
    var script = document.currentScript;
    var origin = new URL(script.src).origin;
    var params = script.dataset;
    var updateIntervalMinutes = params.updateintervalminutes;
    var numberOfPosts = params.numberofposts
    var iframe = document.createElement('iframe');
    iframe.width = "100%";
    iframe.height = '350px';
    iframe.style.border= "none";
    iframe.style.background = "white";
    iframe.src = `${origin}?numberOfPosts=${numberOfPosts}&updateIntervalMinutes=${updateIntervalMinutes}`
    widgetContainer.appendChild(iframe);
})()