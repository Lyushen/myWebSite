document.addEventListener("DOMContentLoaded", function() {
    const iframeElement = document.getElementById('dynamic_iframe');
    if (iframeElement) {
      iframeElement.style.height = window.innerHeight + 'px';
      window.addEventListener('resize', function() {
        iframeElement.style.height = window.innerHeight + 'px';
      });
    }
    console.log("smooth_load.js loaded");
});