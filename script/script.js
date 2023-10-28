document.addEventListener("DOMContentLoaded", async function () {
  const imageWorker = new Worker('imageWorker.js');
  const pageWorker = new Worker('pageWorker.js');
  const imageQueue = [];
  const pageCache = {};

  imageWorker.onmessage = function(event) {
    const preloadedImage = URL.createObjectURL(event.data);
    imageQueue.push(preloadedImage);
    if (imageQueue.length > 1) {
      document.body.style.backgroundImage = `url(${imageQueue.shift()})`;
    }
  };

  pageWorker.onmessage = function(event) {
    const url = event.data.url;
    const pageContent = event.data.content;
    pageCache[url] = pageContent;
  };

  // Kick-off background workers for initial tasks
  imageWorker.postMessage('https://picsum.photos/1920/1080');
  pageWorker.postMessage('home.html');

  // Update background every 3000ms
  setInterval(() => {
    imageWorker.postMessage('https://picsum.photos/1920/1080');
  }, 3000);

  // Function for loading pages
  function loadPage(url) {
    if (pageCache[url]) {
      const content = document.getElementById('content');
      content.innerHTML = pageCache[url];
      content.classList.add('loaded');
    } else {
      pageWorker.postMessage(url);
    }
  }

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
});
