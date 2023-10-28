document.addEventListener("DOMContentLoaded", function() {
  // Function to preload image
    function preloadImage(url, callback) {
      const img = new Image();
      img.src = url;
      img.onload = function() {
        callback(url);
      };
    }
  // Function to load pages
function loadPage(url) {
  const content = document.getElementById('content');
  
  // Make content disappear smoothly
  content.classList.remove('loaded');
  content.classList.add('loading');

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      content.innerHTML = xhr.responseText;

      // Make content appear smoothly
      setTimeout(() => {
        content.classList.remove('loading');
        content.classList.add('loaded');
      }, 50);
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}

  // Function for background rotation
  function updateBackground() {
    fetch('https://unsplash.it/1920/1080/?random')
      .then(response => {
        preloadImage(response.url, function(loadedUrl) {
          document.body.style.backgroundImage = `url(${loadedUrl})`;
          document.body.classList.add('loaded');
        });
      });
  }

  // Update background initially and then every 3000ms
  updateBackground();
  setInterval(updateBackground, 3000);

  function loadPage(url) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const content = document.getElementById('content');
        content.innerHTML = xhr.responseText;
        content.classList.add('loaded');
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  }

  loadPage('home.html');

  document.querySelectorAll('.topnav a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      loadPage(this.getAttribute('data-page'));
    });
  });
});