document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  const urlInput = document.getElementById('url');
  const timeInput = document.getElementById('recordingTime');
  const statusDiv = document.getElementById('status');

  startBtn.addEventListener('click', async () => {
    const url = urlInput.value.trim();
    const recordingTime = parseInt(timeInput.value.trim(), 10);

    if (!url) {
      showStatus('Please enter a valid meeting link', 'error');
      return;
    }
    
    if (!recordingTime || recordingTime <= 0) {
      showStatus('Please enter a valid recording time', 'error');
      return;
    }

    startBtn.disabled = true;
    showStatus('Sending request to spawner...', '');

    try {
      const response = await fetch('http://localhost:3000/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url, recordingTime })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with ${response.status}`);
      }

      showStatus('Recording process started!', 'success');
      setTimeout(() => {
        window.close();
      }, 2000);
    } catch (error) {
      showStatus(`Error: ${error.message}`, 'error');
    } finally {
      startBtn.disabled = false;
    }
  });

  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = 'status'; // reset
    if (type) {
      statusDiv.classList.add(type);
    }
  }
});
