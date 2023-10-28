document.addEventListener("DOMContentLoaded", async function () {
  const imageQueue = [];
  const pageCache = {};

  const codeBackground = document.createElement('pre');
  codeBackground.style.position = 'fixed';
  codeBackground.style.zIndex = '-1';
  codeBackground.style.opacity = '0.6';
  codeBackground.style.whiteSpace = 'pre';
  codeBackground.style.fontFamily = 'monospace';
  codeBackground.style.fontSize = 'small';
  document.body.appendChild(codeBackground);

  async function preloadFirstImage() {
    const response = await fetch('https://picsum.photos/1920/1080');
    const preloadedImage = await preloadImage(response.url);
    document.body.style.backgroundImage = `url(${preloadedImage})`;
    document.body.classList.add('loaded');
  }

  async function preloadFirstPage() {
    await loadPage('home.html');
  }

  function escapeHTML(html) {
    return html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  async function preloadImage(url) {
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

  async function updateBackground() {
    const response = await fetch('https://picsum.photos/1920/1080');
    const preloadedImage = await preloadImage(response.url);
    imageQueue.push(preloadedImage);
    if (imageQueue.length > 1) {
      document.body.style.backgroundImage = `url(${imageQueue.shift()})`;
    }
  }

  setInterval(updateBackground, 3000);

  async function loadPage(url) {
    if (pageCache[url]) {
      const content = document.getElementById('content');
      content.innerHTML = pageCache[url];
      content.classList.add('loaded');
      codeBackground.textContent = escapeHTML(pageCache[url]);
    } else {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          pageCache[url] = xhr.responseText;
          const content = document.getElementById('content');
          content.innerHTML = xhr.responseText;
          content.classList.add('loaded');
          codeBackground.textContent = escapeHTML(xhr.responseText);
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
