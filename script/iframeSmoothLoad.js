document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded event for iframeSmoothLoad");
  
    const iframeElement = document.getElementById('dynamic_iframe');
    if (iframeElement) {
      iframeElement.onload = function() {
        this.classList.add('loaded');
      };
    }
  });
  