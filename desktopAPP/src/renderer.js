const { ipcRenderer } = require('electron');

document.getElementById('minimize-btn').addEventListener('click', () => {
    ipcRenderer.send('minimize-window');
});

document.getElementById('maximize-btn').addEventListener('click', () => {
    ipcRenderer.send('maximize-window');
});

document.getElementById('close-btn').addEventListener('click', () => {
    ipcRenderer.send('close-window');
});

document.getElementById('compose-btn').addEventListener('click', () => {
    window.location.href = 'tools.html';
});

document.getElementById('open-file-btn').addEventListener('click', async () => {
    const filePath = await ipcRenderer.invoke('open-file');
    if (filePath) {
        alert(`Opened file: ${filePath}`);
    }
});