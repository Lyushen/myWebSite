document.addEventListener("DOMContentLoaded", function () {
  // Initialize web worker
  const worker = new Worker('backgroundWorker.js');

  worker.addEventListener('message', function(e) {
    const { action, url, content } = e.data;
    if (action === 'backgroundUpdated') {
      document.body.style.backgroundImage = `url(${url})`;
      document.body.classList.add('loaded');
    }
    else if (action === 'pageLoaded') {
      const contentElement = document.getElementById('content');
      contentElement.innerHTML = content;
      contentElement.classList.add('loaded');
    }
  });

  // Function to preload image
  function preloadImage(url, callback) {
    const img = new Image();
    img.src = url;
    img.onload = function () {
      callback(url);
    };
  }

  // Function for background rotation
  function updateBackground() {
    worker.postMessage({ action: 'updateBackground' });
  }

  // Update background initially and then every 3000ms
  updateBackground();
  setInterval(updateBackground, 3000);

  function loadPage(url) {
    worker.postMessage({ action: 'loadPage', payload: url });
  }

  loadPage('home.html');

  document.querySelectorAll('.topnav a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      loadPage(this.getAttribute('data-page'));
    });
  });
});