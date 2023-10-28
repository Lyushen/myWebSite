self.addEventListener('message', function(e) {
    const { action, payload } = e.data;
    if (action === 'updateBackground') {
      fetch('https://picsum.photos/1920/1080')
        .then(response => response.url)
        .then(url => {
          self.postMessage({ action: 'backgroundUpdated', url });
        });
    }
    else if (action === 'loadPage') {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          self.postMessage({ action: 'pageLoaded', content: xhr.responseText });
        }
      };
      xhr.open('GET', payload, true);
      xhr.send();
    }
  });