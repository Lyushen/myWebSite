document.addEventListener("DOMContentLoaded", function () {
  const imageQueue = [];
  const pageCache = {};

  // Function to preload image
  function preloadImage(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = function () {
        resolve(url);
      };
    });
  }

  // Function for background rotation
  async function updateBackground() {
    const response = await fetch('https://picsum.photos/1920/1080');
    const preloadedImage = await preloadImage(response.url);
    imageQueue.push(preloadedImage);
    if (imageQueue.length > 1) {
      document.body.style.backgroundImage = `url(${imageQueue.shift()})`;
      document.body.classList.add('loaded');
    }
  }

  // Update background initially and then every 3000ms
  updateBackground();
  setInterval(updateBackground, 3000);

  async function loadPage(url) {
    if (pageCache[url]) {
      const content = document.getElementById('content');
      content.innerHTML = pageCache[url];
      content.classList.add('loaded');
    } else {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          pageCache[url] = xhr.responseText;
          const content = document.getElementById('content');
          content.innerHTML = xhr.responseText;
          content.classList.add('loaded');
        }
      };
      xhr.open('GET', url, true);
      xhr.send();
    }
  }

  loadPage('home.html');

  const navLinks = document.querySelectorAll('.topnav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      loadPage(this.getAttribute('data-page'));
    });
    link.addEventListener('mouseover', function (e) {
      const url = this.getAttribute('data-page');
      if (!pageCache[url]) {
        preloadPage(url);
      }
    });
  });

  function preloadPage(url) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        pageCache[url] = xhr.responseText;
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  }
});
