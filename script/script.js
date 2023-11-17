document.addEventListener("DOMContentLoaded", function () {
  const imageQueue = [];
  const pageCache = {};

  function preloadFirstImage() {
    fetch(`https://picsum.photos/${window.innerWidth}/${window.innerHeight}`)
      .then(response => preloadImage(response.url))
      .then(preloadedImage => {
        document.body.style.backgroundImage = `url(${preloadedImage})`;
        document.body.style.backgroundSize = 'cover';
        document.body.classList.add('loaded');
      });
  }

  function preloadFirstPage() {
    loadPage('home.html');
  }

  function preloadImage(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = function () {
        resolve(url);
      };
    });
  }

  preloadFirstImage();
  preloadFirstPage();

  function updateBackground() {
    fetch(`https://picsum.photos/${window.innerWidth * 2}/${window.innerHeight * 2}`)
      .then(response => preloadImage(response.url))
      .then(preloadedImage => {
        imageQueue.push(preloadedImage);
        if (imageQueue.length > 1) {
          document.body.style.backgroundImage = `url(${imageQueue.shift()})`;
          document.body.style.backgroundSize = 'cover';
        }
      });
  }

  setInterval(updateBackground, 5000);

  function loadPage(url) {
    if (pageCache[url]) {
      displayContent(pageCache[url]);
    } else {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          pageCache[url] = xhr.responseText;
          displayContent(xhr.responseText);
        }
      };
      xhr.open('GET', url, true);
      xhr.send();
    }
  }

  function displayContent(html) {
    const content = document.getElementById('content');
    content.innerHTML = html;
    content.classList.add('loaded');
  }

  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      loadPage(this.getAttribute('data-page'));
    });
    link.addEventListener('mouseover', function () {
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
