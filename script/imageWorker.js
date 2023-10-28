self.addEventListener('message', async function(event) {
    const url = 'https://picsum.photos/1920/1080';
    const response = await fetch(url);
    self.postMessage(response.url);
  });