document.getElementById('pasteFromClipboard').addEventListener('click', () => {
    navigator.clipboard.readText().then(text => {
      document.getElementById('url').value = text;
    }).catch(err => {
      console.error('Failed to read clipboard contents: ', err);
    });
  });
  
  document.getElementById('downloadButton').addEventListener('click', async () => {
    const url = document.getElementById('url').value;
    if (!url) {
      alert('Please enter a valid Instagram reel URL.');
      return;
    }
  
    // Show loading state
    const button = document.getElementById('downloadButton');
    const originalText = button.innerHTML;
    button.innerHTML = '<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...';
    button.disabled = true;
  
    try {
      // Use your deployed Render backend URL
      const backendUrl = 'https://instagram-reel-downloader-d8jy.onrender.com/download';
  
      // Send the URL to the backend
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      });
  
      const data = await response.json();
  
      if (data.success) {
        // Create a temporary link to trigger download
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.download = 'instagram-reel.mp4'; // This suggests filename to browser
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success message
        alert('Download started! Check your browser\'s downloads folder.');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing the request. Please try again.');
    } finally {
      // Reset button
      button.innerHTML = originalText;
      button.disabled = false;
    }
  });