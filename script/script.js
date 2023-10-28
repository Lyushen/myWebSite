document.addEventListener("DOMContentLoaded", async function () {
  const imageWorker = new Worker('imageWorker.js');
  const pageWorker = new Worker('pageWorker.js');
  const imageQueue = [];
  const pageCache = {};

  imageWorker.onmessage = function(event) {
    const preloadedImage = URL.createObjectURL(event.data);
    imageQueue.push(preloadedImage);
  };

  pageWorker.onmessage = function(event) {
    const pageContent = event.data;
    const url = event.data.url;
    pageCache[url] = pageContent;
  };

  imageWorker.postMessage('https://picsum.photos/1920/1080');
  await loadPage('home.html');
  
  // Existing preloadFirstImage() and preloadFirstPage() functions are removed
  
  // Update background
  setInterval(() => {
    imageWorker.postMessage('https://picsum.photos/1920/1080');
    if (imageQueue.length > 1) {
      document.body.style.backgroundImage = `url(${imageQueue.shift()})`;
    }
  }, 3000);

  const navLinks = document.querySelectorAll('.topnav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      loadPage(this.getAttribute('data-page'));
    });
    link.addEventListener('mouseover', function (e) {
      const url = this.getAttribute('data-page');
      if (!pageCache[url]) {
        pageWorker.postMessage(url);
      }
    });
  });

  function loadPage(url) {
    // The existing loadPage function stays the same
  }
});
