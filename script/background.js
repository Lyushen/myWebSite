document.addEventListener("DOMContentLoaded", function () {
  const updateInterval = 5000; // 5 seconds
  const sessionCacheKey = 'sessionBackgroundImageCache';

  function setBackground(imageUrl) {
      document.body.style.backgroundImage = `url(${imageUrl})`;
      document.body.style.backgroundSize = 'cover';
      document.body.classList.add('loaded');
      sessionStorage.setItem(sessionCacheKey, imageUrl);
  }

  function preloadImage(url) {
      return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve(url);
          img.onerror = reject;
      });
  }

  function fetchNewImage(width, height, callback) {
      fetch(`https://picsum.photos/${width}/${height}`)
          .then(response => preloadImage(response.url))
          .then(callback)
          .catch(error => console.error('Image fetch error:', error));
  }

  function updateBackground() {
      fetchNewImage(window.innerWidth, window.innerHeight, setBackground);
  }

  function preloadFirstImage() {
      const sessionCachedImage = sessionStorage.getItem(sessionCacheKey);
      if (sessionCachedImage) {
          setBackground(sessionCachedImage);
      } else {
          fetchNewImage(window.innerWidth*2, window.innerHeight*2, setBackground);
      }
  }

  preloadFirstImage();
  setInterval(updateBackground, updateInterval);
});
