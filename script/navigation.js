document.addEventListener("DOMContentLoaded", function () {
    var navbarIframe = document.createElement('iframe');
    navbarIframe.src = 'navbar.html';
    navbarIframe.frameBorder = '0';
    navbarIframe.width = '100%';
    navbarIframe.height = '100'; // Set the height to fit your navbar's content
    navbarIframe.id = 'navbarIframe';
  
    document.getElementById('navbar-container').appendChild(navbarIframe);
  });
  