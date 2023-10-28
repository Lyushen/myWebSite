self.addEventListener('message', function(e) {
    const { action, payload } = e.data;
    
    if (action === 'preloadImage') {
      const img = new Image();
      img.src = payload;
      img.onload = function () {
        self.postMessage({ action: 'imagePreloaded', url: payload });
      };
    }
    else if (action === 'parseContent') {
      // Assume parsing to be done here, for demonstration we send back same content
      self.postMessage({ action: 'contentParsed', content: payload });
    }
  });  