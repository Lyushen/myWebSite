document.addEventListener("DOMContentLoaded", function() {

  // Function for preloading images
  function preloadImage(url, callback) {
    const img = new Image();
    img.src = url;
    img.onload = function() {
      callback(url);
    };
  }

  // Function for rotating background
  function updateBackground() {
    fetch('https://unsplash.it/1920/1080/?random')
      .then(response => {
        preloadImage(response.url, function(loadedUrl) {
          document.body.style.backgroundImage = `url(${loadedUrl})`;
          document.body.classList.add('loaded');
        });
      });
  }

  // Initialize and repeat background update
  updateBackground();
  setInterval(updateBackground, 3000);

  // Function to load pages
  function loadPage(url) {
    const content = document.getElementById('content');
    content.style.opacity = 0;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        content.innerHTML = xhr.responseText;
        setTimeout(() => {
          content.style.opacity = 1;
        }, 50);
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  }

  // Initial page load
  loadPage('home.html');

  // Event listeners for navigation links
  document.querySelectorAll('.topnav a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      loadPage(this.getAttribute('data-page'));
    });
  });
});
