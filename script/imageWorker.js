self.addEventListener('message', async function(event) {
    const url = event.data;
    const response = await fetch(url);
    const imageBlob = await response.blob();
    self.postMessage(imageBlob);
  });
  