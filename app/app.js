const apiKey = 'ur2389006-29e2b82e1bb6a8625f96aebe';
const apiUrl = 'https://api.uptimerobot.com/v2/getMonitors';

const requestData = {
  api_key: apiKey,
  format: 'json',
};

const monitorsContainer = document.getElementById('monitors-container');

fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(requestData),
  })
  .then(response => response.json())
  .then(data => {
    data.monitors.forEach(monitor => {
      const monitorElement = document.createElement('div');
      monitorElement.classList.add('monitor');

      const statusIndicator = document.createElement('div');
      statusIndicator.classList.add('status-indicator');
      statusIndicator.classList.add(getStatusClass(monitor.status));
      monitorElement.appendChild(statusIndicator);

      const nameElement = document.createElement('h3');
      nameElement.textContent = monitor.friendly_name;
      monitorElement.appendChild(nameElement);

      const detailsElement = document.createElement('div');
      detailsElement.classList.add('monitor-details');
      monitorElement.appendChild(detailsElement);

      monitorElement.addEventListener('mouseenter', () => {
        detailsElement.classList.add('visible');
        const urlElement = document.createElement('p');
        urlElement.textContent = `URL: ${monitor.url}`;
        detailsElement.appendChild(urlElement);
      });

      monitorElement.addEventListener('mouseenter', () => {});

      monitorElement.addEventListener('mouseleave', () => {
        detailsElement.classList.remove('visible');
        detailsElement.innerHTML = '';
      });

      monitorsContainer.appendChild(monitorElement);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });


function getStatusClass(status) {
  if (status === 2) {
    return 'online';
  } else if (status === 9) {
    return 'paused';
  } else {
    return 'offline';
  }
}