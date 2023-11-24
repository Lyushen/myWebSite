const imageQueue = [];

function preloadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = function () {
      resolve(url);
    };
  });
}

function updateBackground() {
  fetch(`https://picsum.photos/${window.innerWidth}/${window.innerHeight}?random=${Date.now()}`)
    .then(response => preloadImage(response.url))
    .then(preloadedImage => {
      imageQueue.push(preloadedImage);
      if (imageQueue.length > 1) {
        document.body.style.backgroundImage = `url(${imageQueue.shift()})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center center';
        document.body.style.backgroundAttachment = 'fixed';
      }
    });
}

// Run the update background function every 5 seconds
setInterval(updateBackground, 5000);

// Initialize the first background
updateBackground();
