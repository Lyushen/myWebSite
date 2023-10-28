self.addEventListener('message', function(event) {
    const url = event.data;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        self.postMessage(xhr.responseText);
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  });
  