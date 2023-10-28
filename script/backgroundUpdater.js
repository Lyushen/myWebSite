function preloadImage(url, callback) {
    const img = new Image();
    img.src = url;
    img.onload = function() {
      callback(url);
    };
  }
  
  function updateBackground() {
    fetch('https://source.unsplash.com/random/1920x1080')
      .then(response => {
        preloadImage(response.url, function(loadedUrl) {
          document.body.style.backgroundImage = `url(${loadedUrl})`;
          document.body.classList.add('loaded');
        });
      });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    updateBackground();
    setInterval(updateBackground, 3000);
  });
  