document.addEventListener("DOMContentLoaded", async function () {
  const imageQueue = [];
  const pageCache = {};

  async function preloadFirstImage() {
    // Fetch an image twice the size of the screen dimensions
    const response = await fetch(`https://picsum.photos/${window.innerWidth * 2}/${window.innerHeight * 2}`);
    const preloadedImage = await preloadImage(response.url);
    // Use CSS to fit the image to the screen size
    document.body.style.backgroundImage = `url(${preloadedImage})`;
    document.body.style.backgroundSize = 'cover';
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
    // Fetch an image twice the size of the screen dimensions
    const response = await fetch(`https://picsum.photos/${window.innerWidth * 2}/${window.innerHeight * 2}`);
    const preloadedImage = await preloadImage(response.url);
    imageQueue.push(preloadedImage);
    if (imageQueue.length > 1) {
      // Use CSS to fit the image to the screen size
      document.body.style.backgroundImage = `url(${imageQueue.shift()})`;
      document.body.style.backgroundSize = 'cover';
    }
  }

  // Update background every 5 seconds (5000ms)
  setInterval(updateBackground, 5000);

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



  const navLinks = document.querySelectorAll('.navbar a');
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