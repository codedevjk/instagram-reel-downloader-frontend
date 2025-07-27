document.getElementById('pasteFromClipboard').addEventListener('click', () => {
    navigator.clipboard.readText().then(text => {
      document.getElementById('url').value = text;
    }).catch(err => {
      console.error('Failed to read clipboard contents: ', err);
    });
  });
  
  document.getElementById('downloadButton').addEventListener('click', () => {
    const url = document.getElementById('url').value;
    if (!url) {
      alert('Please enter a valid Instagram reel URL.');
      return;
    }
  
    // Replace with your Render backend URL
    const backendUrl = 'http://localhost:5000/download';
  
    // Send the URL to the backend
    fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Create a temporary link to trigger download
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.download = 'instagram-reel.mp4';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert(data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while processing the request.');
    });
  });