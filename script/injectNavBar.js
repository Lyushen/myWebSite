document.addEventListener('DOMContentLoaded', function () {
    // Fetch the Navbar HTML
    fetch('navbar.html')
        .then(response => response.text())
        .then(navHtml => {
            document.getElementById('nav-placeholder').innerHTML = navHtml;
        })
        .catch(error => console.error('Error loading navbar HTML:', error));

    // Fetch the Navbar CSS
    fetch('css/navbar.css')
        .then(response => response.text())
        .then(css => {
            const style = document.createElement('style');
            style.type = 'text/css';
            if (style.styleSheet) {
                // Support for IE
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            document.head.appendChild(style);
        })
        .catch(error => console.error('Error loading navbar CSS:', error));
});