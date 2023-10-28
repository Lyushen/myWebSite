document.addEventListener("DOMContentLoaded", function() {

    // Handling iframe content for smooth transitions
    const iframeElement = document.getElementById('dynamic_iframe');
    
    if (iframeElement) {
      iframeElement.onload = function() {
        const iframeContent = this.contentWindow || this.contentDocument;
        if (iframeContent.document) {
          iframeContent = iframeContent.document;
        }
        const contentElement = iframeContent.getElementById('content');
        if (contentElement) {
          contentElement.classList.add('loaded');
        }
      };
      
      // Adjusting iframe height
      iframeElement.style.height = window.innerHeight + 'px';
      window.addEventListener('resize', function() {
        iframeElement.style.height = window.innerHeight + 'px';
      });
    }
  
    // Function for background rotation
    function preloadImage(url, callback) {
      const img = new Image();
      img.src = url;
      img.onload = function() {
        callback(url);
      };
    }
  
    // Function to update background
    function updateBackground() {
      fetch('https://unsplash.it/1920/1080/?random')
        .then(response => {
          preloadImage(response.url, function(loadedUrl) {
            document.body.style.backgroundImage = `url(${loadedUrl})`;
            document.body.classList.add('loaded');
          });
        });
    }
  
    // Update background initially and then every 3000ms
    updateBackground();
    setInterval(updateBackground, 3000);
  });
  