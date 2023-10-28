document.addEventListener("DOMContentLoaded", async function () {
  const imageWorker = new Worker('imageWorker.js');
  const pageWorker = new Worker('pageWorker.js');
  const imageQueue = [];
  const pageCache = {};

  imageWorker.onmessage = function(event) {
    const preloadedImage = event.data;
    if (document.body.style.backgroundImage === "") {
      document.body.style.backgroundImage = `url(${preloadedImage})`;
      document.body.classList.add('loaded');
    } else {
      imageQueue.push(preloadedImage);
    }
  };

  pageWorker.onmessage = function(event) {
    const { content, url } = event.data;
    pageCache[url] = content;
  };

  // Trigger initial load
  imageWorker.postMessage('init');
  pageWorker.postMessage('home.html');
  await new Promise(r => setTimeout(r, 100)); // Small delay for demo

  // Function for background rotation
  setInterval(() => {
    imageWorker.postMessage('rotate');
    if (imageQueue.length > 0) {
      document.body.style.backgroundImage = `url(${imageQueue.shift()})`;
    }
  }, 3000);

  // Rest of the code remains the same
  const navLinks = document.querySelectorAll('.topnav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const url = this.getAttribute('data-page');
      if (pageCache[url]) {
        const content = document.getElementById('content');
        content.innerHTML = pageCache[url];
        content.classList.add('loaded');
      } else {
        pageWorker.postMessage(url);
      }
    });
    
    link.addEventListener('mouseover', function (e) {
      const url = this.getAttribute('data-page');
      if (!pageCache[url]) {
        pageWorker.postMessage(url);
      }
    });
  });
});
