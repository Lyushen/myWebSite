document.addEventListener("DOMContentLoaded", function () {
  // Initialize web worker
  const worker = new Worker('backgroundWorker.js');

  worker.addEventListener('message', function(e) {
    const { action, url, content } = e.data;
    
    if (action === 'imagePreloaded') {
      document.body.style.backgroundImage = `url(${url})`;
      document.body.classList.add('loaded');
    }
    else if (action === 'contentParsed') {
      const contentElement = document.getElementById('content');
      contentElement.innerHTML = content;
      contentElement.classList.add('loaded');
    }
  });

  // Function for background rotation
  function updateBackground() {
    fetch('https://picsum.photos/1920/1080')
      .then(response => {
        worker.postMessage({ action: 'preloadImage', payload: response.url });
      });
  }

  // Update background initially and then every 3000ms
  updateBackground();
  setInterval(updateBackground, 3000);

  function loadPage(url) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        worker.postMessage({ action: 'parseContent', payload: xhr.responseText });
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  }

  loadPage('home.html');

  document.querySelectorAll('.topnav a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      loadPage(this.getAttribute('data-page'));
    });
  });
});