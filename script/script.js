document.addEventListener("DOMContentLoaded", async function () {
  const imageQueue = [];
  const pageCache = {};

  async function preloadFirstImage() {
    var clientW = window.innerWidth;
    var clientH = window.innerHeight;
    const response = await fetch('https://picsum.photos/{$clientW}}/{$clientH}');
    const preloadedImage = await preloadImage(response.url);
    document.body.style.backgroundImage = `url(${preloadedImage})`;
    document.body.classList.add('loaded');
  }

  
  async function preloadFirstPage() {
    await loadPage('home.html');
  }

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

  await preloadFirstImage();
  await preloadFirstPage();

  // Function for background rotation
  async function updateBackground() {
    var clientW = window.innerWidth;
    var clientH = window.innerHeight;
    const response = await fetch('https://picsum.photos/{$clientW}}/{$clientH}');
    const preloadedImage = await preloadImage(response.url);
    imageQueue.push(preloadedImage);
    if (imageQueue.length > 1) {
      document.body.style.backgroundImage = `url(${imageQueue.shift()})`;
    }
  }

  // Update background every 3000ms
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
