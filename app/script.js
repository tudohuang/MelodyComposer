// === Constants and Definitions ===
// Note frequencies in Hz
const NOTE_FREQS = {
    'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81,
    'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00,
    'A#3': 233.08, 'B3': 246.94, 'C4': 261.63, 'C#4': 277.18, 'D4': 293.66,
    'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00,
    'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88, 'C5': 523.25,
    'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46,
    'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33,
    'B5': 987.77, 'C6': 1046.50, 'C#6': 1108.73, 'D6': 1174.66, 'D#6': 1244.51,
    'E6': 1318.51, 'F6': 1396.91, 'F#6': 1479.98, 'Rest': 0
};

// Piano key definitions 
const keys = [
    { note: 'C3', type: 'white' }, { note: 'C#3', type: 'black' },
    { note: 'D3', type: 'white' }, { note: 'D#3', type: 'black' },
    { note: 'E3', type: 'white' }, { note: 'F3', type: 'white' },
    { note: 'F#3', type: 'black' }, { note: 'G3', type: 'white' },
    { note: 'G#3', type: 'black' }, { note: 'A3', type: 'white' },
    { note: 'A#3', type: 'black' }, { note: 'B3', type: 'white' },
    { note: 'C4', type: 'white' }, { note: 'C#4', type: 'black' },
    { note: 'D4', type: 'white' }, { note: 'D#4', type: 'black' },
    { note: 'E4', type: 'white' }, { note: 'F4', type: 'white' },
    { note: 'F#4', type: 'black' }, { note: 'G4', type: 'white' },
    { note: 'G#4', type: 'black' }, { note: 'A4', type: 'white' },
    { note: 'A#4', type: 'black' }, { note: 'B4', type: 'white' },
    { note: 'C5', type: 'white' }, { note: 'C#5', type: 'black' },
    { note: 'D5', type: 'white' }, { note: 'D#5', type: 'black' },
    { note: 'E5', type: 'white' }, { note: 'F5', type: 'white' },
    { note: 'F#5', type: 'black' }, { note: 'G5', type: 'white' },
    { note: 'G#5', type: 'black' }, { note: 'A5', type: 'white' },
    { note: 'A#5', type: 'black' }, { note: 'B5', type: 'white' },
    { note: 'C6', type: 'white' }, { note: 'C#6', type: 'black' },
    { note: 'D6', type: 'white' }, { note: 'D#6', type: 'black' },
    { note: 'E6', type: 'white' }, { note: 'F6', type: 'white' },
    { note: 'F#6', type: 'black' }
];

// Keyboard mapping
let keyMap = {
    'q': 'C3', 'w': 'D3', 'e': 'E3', 'r': 'F3', 't': 'G3', 'y': 'A3', 'u': 'B3',
    'i': 'C4', 'o': 'D4', 'p': 'E4', '[': 'F4', ']': 'G4',
    'a': 'G#3', 's': 'A#3', 'd': 'C#4', 'f': 'D#4', 'g': 'F#4', 'h': 'G#4',
    'j': 'A#4', 'k': 'C5', 'l': 'D5', ';': 'E5', "'": 'F5', 'z': 'G5',
    'x': 'A5', 'c': 'B5', 'v': 'C#5', 'b': 'D#5', 'n': 'F#5', 'm': 'G#5',
    ',': 'C6', '.': 'D6', '/': 'E6', 'Q': 'F6', 'W': 'F#6',
    '1': '32th', '2': '16th', '3': 'eighth', '4': 'quarter', '5': 'half', '6': 'whole',
    'R': 'Rest'
};
const defaultKeyMap = { ...keyMap };

// === Global State ===
let noteSequence = [];
let bpm = 120;
let isRecording = false;
let currentDuration = 'quarter';
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const gainNode = audioContext.createGain(); // 重用 GainNode 提升性能
gainNode.connect(audioContext.destination);
let isShortcutPanelOpen = false;
let isPlaying = false;
let currentNoteIndex = 0;
let timeouts = [];
let volume = 0.5;
let isRhythmMode = false;
let currentTheme = localStorage.getItem('theme') || 'dark';

// === Piano Initialization ===
function initPiano() {
    const piano = document.getElementById('piano');
    let whiteKeyCount = 0;

    keys.forEach((key) => {
        const keyElement = document.createElement('div');
        keyElement.className = `key ${key.type}`;
        keyElement.textContent = key.note;
        keyElement.setAttribute('data-note', key.note);
        piano.appendChild(keyElement);

        if (key.type === 'white') {
            whiteKeyCount++;
        } else {
            const leftPosition = (whiteKeyCount - 1) * 50 + 35;
            keyElement.style.left = `${leftPosition}px`;
        }

        keyElement.onclick = (e) => {
            e.stopPropagation();
            addNote(key.note);
        };
    });
}

// === Event Listeners ===
function setupEventListeners() {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('DOMContentLoaded', setupDOMListeners);
}

function handleKeyDown(e) {
    if (e.key === ' ') {
        e.preventDefault();
    } else if (e.key === 'H' && e.ctrlKey) {
        e.preventDefault();
        toggleShortcutPanel();
    } else if (keyMap[e.key.toLowerCase()] && ['1', '2', '3', '4', '5', '6'].includes(e.key)) {
        setDuration(keyMap[e.key.toLowerCase()]);
    } else if (keyMap[e.key.toLowerCase()] && isRecording) {
        handleRecordingKey(e.key.toLowerCase());
    } else if (keyMap[e.key.toLowerCase()]) {
        addNote(keyMap[e.key.toLowerCase()]);
    }
}

function handleKeyUp(e) {
    if (e.key === ' ' && isRecording) stopRecording();
}

function setupDOMListeners() {
    // 初始化所有按鈕的工具提示
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(element => {
        new bootstrap.Tooltip(element);
    });

    setDuration('quarter');
    updateBPMFromSlider();
    updateVolume();

    const savedKeymap = localStorage.getItem('customKeymap');
    if (savedKeymap) {
        keyMap = JSON.parse(savedKeymap);
        updateShortcutPanel();
    }

    const editedMelody = localStorage.getItem('editedMelody');
    if (editedMelody) {
        try {
            noteSequence = JSON.parse(editedMelody);
            updateNoteDisplay();
            localStorage.removeItem('editedMelody');
        } catch (err) {
            console.error('Failed to load edited melody:', err);
            showError('Failed to load edited melody!');
        }
    }

    // 檢查 URL 參數是否有 melody
    const urlParams = new URLSearchParams(window.location.search);
    const melodyBase64 = urlParams.get('melody');
    if (melodyBase64) {
        try {
            const melodyJSON = atob(decodeURIComponent(melodyBase64));
            noteSequence = JSON.parse(melodyJSON);
            updateNoteDisplay();
        } catch (err) {
            console.error('Failed to load shared melody:', err);
            showError('Invalid shared melody link!');
        }
    }

    document.getElementById('playButton')?.addEventListener('click', playSequence);
    document.getElementById('stopButton')?.addEventListener('click', stopSequence);
    document.getElementById('progressBar')?.addEventListener('input', seekSequence);
    document.getElementById('generateButton')?.addEventListener('click', generateCode);
    document.getElementById('clearButton')?.addEventListener('click', clearSequence);
    document.getElementById('addRestButton')?.addEventListener('click', addRest);
    document.getElementById('copyCodeBtn')?.addEventListener('click', copyCode);
    document.getElementById('saveMelodyBtn')?.addEventListener('click', saveMelody);
    document.getElementById('loadMelody')?.addEventListener('change', loadMelody);
}

// === Error Handling ===
function showError(message) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
    });
}

// === Recording Functions ===
function playTone(freq, duration) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = document.getElementById('wave_type')?.value || 'sine';
    oscillator.frequency.value = freq || 440;
    oscillator.connect(gainNode);
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration / 1000);
}

function handleRecordingKey(key) {
    if (keyMap[key] === 'Rest') {
        addRest();
    } else {
        addNote(keyMap[key]);
        playTone(NOTE_FREQS[keyMap[key]], getDuration(currentDuration));
    }
}

function startRecording() {
    isRecording = !isRecording;
    if (isRecording) {
        noteSequence = [];
        updateNoteDisplay();
        document.querySelector('.btn-secondary').innerHTML = '<i class="fas fa-stop me-2"></i>Stop (Space)';
    } else {
        stopRecording();
    }
}

function stopRecording() {
    isRecording = false;
    document.querySelector('.btn-secondary').innerHTML = '<i class="fas fa-microphone me-2"></i>Record (Space)';
}

// === Playback Functions ===
function playSequence() {
    if (noteSequence.length === 0) {
        showError('No sequence to play!');
        return;
    }

    const playButton = document.getElementById('playButton');
    if (isPlaying) {
        stopPlayback();
        return;
    }

    // 清空 timeouts 避免重複播放
    timeouts.forEach(timeout => clearTimeout(timeout));
    timeouts = [];

    isPlaying = true;
    playButton.innerHTML = '<i class="fas fa-pause me-2"></i>Pause';

    playFromIndex(currentNoteIndex);
    updateProgress();
}

function playFromIndex(startIndex) {
    currentNoteIndex = startIndex;
    let delay = 0;
    const canvas = document.getElementById('melody-preview');
    const ctx = canvas.getContext('2d');
    const width = canvas.scrollWidth;
    const totalDuration = noteSequence.reduce((sum, item) => sum + getDuration(item.type) + 50, 0);
    const scaleX = totalDuration > 0 ? width / totalDuration : 1;

    for (let i = startIndex; i < noteSequence.length; i++) {
        if (!isPlaying) break;
        const item = noteSequence[i];
        const duration = getDuration(item.type);
        const xStart = i === 0 ? 0 : noteSequence.slice(0, i).reduce((sum, prevItem) => sum + getDuration(prevItem.type) + 50, 0) * scaleX;
        const w = duration * scaleX;

        const timeout = setTimeout(() => {
            if (!isPlaying) return;
            if (!item.isRest) {
                playTone(NOTE_FREQS[item.note], duration);
                drawPlayingNote(ctx, xStart, w, item.note, duration);
            } else {
                drawPlayingRest(ctx, xStart, w, duration);
            }
            currentNoteIndex++;
            if (currentNoteIndex === noteSequence.length) {
                resetPlayback();
            }
        }, delay);

        timeouts.push(timeout);
        delay += duration + 50;
    }
}

function stopSequence() {
    isPlaying = false;
    timeouts.forEach(timeout => clearTimeout(timeout));
    timeouts = [];
    currentNoteIndex = 0;
    document.getElementById('playButton').innerHTML = '<i class="fas fa-play me-2"></i>Play';
    document.getElementById('progressBar').value = 0;
    drawMelodyPreview();
}

function seekSequence(event) {
    if (noteSequence.length === 0) return;
    const progressBar = document.getElementById('progressBar');
    const totalDuration = noteSequence.reduce((sum, item) => sum + getDuration(item.type) + 50, 0);
    const seekTime = (progressBar.value / 100) * totalDuration;

    let cumulativeTime = 0;
    for (let i = 0; i < noteSequence.length; i++) {
        const duration = getDuration(noteSequence[i].type);
        cumulativeTime += duration + 50;
        if (cumulativeTime >= seekTime) {
            currentNoteIndex = i;
            break;
        }
    }

    if (isPlaying) {
        timeouts.forEach(timeout => clearTimeout(timeout));
        timeouts = [];
        playSequence();
    }
}

// === UI Update Functions ===
function updateNoteDisplay() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';
    noteSequence.forEach((item, index) => {
        const div = createNoteElement(item, index);
        notesList.appendChild(div);
    });
    drawMelodyPreview();
}

function updateBPMFromSlider() {
    const bpmSlider = document.getElementById('bpm-slider');
    const bpmValue = document.getElementById('bpm-value');
    bpm = parseInt(bpmSlider.value) || 120;
    bpmValue.textContent = bpm;
    updateNoteDisplay();
}

function updateVolume() {
    const volumeSlider = document.getElementById('volume-slider');
    const volumeValue = document.getElementById('volume-value');
    volume = parseInt(volumeSlider.value) / 100;
    volumeValue.textContent = `${volumeSlider.value}%`;
}

// === Note Management ===
function addNote(note) {
    noteSequence.push({ note, type: currentDuration, isRest: false });
    updateNoteDisplay();
}

function addRest() {
    noteSequence.push({ note: 'Rest', type: currentDuration, isRest: true });
    updateNoteDisplay();
}

function updateNoteType(index, type) {
    noteSequence[index].type = type;
    updateNoteDisplay();
}

function removeNote(index) {
    noteSequence.splice(index, 1);
    updateNoteDisplay();
}

function clearSequence() {
    noteSequence = [];
    updateNoteDisplay();
    document.getElementById('buzzer-code').textContent = 'Buzzer code will appear here...';
}

// === Utility Functions ===
function getDuration(type) {
    const quarterDuration = 60000 / bpm;
    const durations = {
        'whole': quarterDuration * 4, 'half': quarterDuration * 2,
        'quarter': quarterDuration, 'eighth': quarterDuration / 2,
        '16th': quarterDuration / 4, '32th': quarterDuration / 8
    };
    return durations[type];
}

function setDuration(type) {
    currentDuration = type;
    const buttons = document.querySelectorAll('#duration-buttons .btn');
    buttons.forEach(btn => {
        btn.classList.remove('btn-selected');
        if (btn.textContent === typeToLabel(type)) btn.classList.add('btn-selected');
    });
}

function typeToLabel(type) {
    const labels = {
        '32th': '1/32', '16th': '1/16', 'eighth': '1/8',
        'quarter': '1/4', 'half': '1/2', 'whole': '1/1'
    };
    return labels[type];
}

// === Visualization Functions ===
function drawMelodyPreview() {
    const canvas = document.getElementById('melody-preview');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.scrollWidth;
    canvas.width = width;
    canvas.height = 150;

    // 繪製背景
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, width, 150);

    // 繪製音符條
    const totalDuration = noteSequence.reduce((sum, item) => sum + getDuration(item.type) + 50, 0);
    const scaleX = totalDuration > 0 ? width / totalDuration : 1;
    let x = 0;

    noteSequence.forEach(item => {
        const duration = getDuration(item.type);
        const w = duration * scaleX;
        if (item.isRest) {
            drawRest(ctx, x, w);
        } else {
            drawNote(ctx, x, w, item.note);
        }
        x += (duration + 50) * scaleX;
    });
}

function drawNote(ctx, x, w, note) {
    const noteIndex = keys.findIndex(k => k.note === note);
    const y = 140 - (noteIndex * 3);
    ctx.fillStyle = '#00ff9d';
    ctx.fillRect(x, y, w, 3);
    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(x, y, w, 3);
}

function drawRest(ctx, x, w) {
    ctx.strokeStyle = '#888888';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(x, 75);
    ctx.lineTo(x + w, 75);
    ctx.stroke();
    ctx.setLineDash([]);
}

function drawPlayingNote(ctx, xStart, w, note, duration) {
    const noteIndex = keys.findIndex(k => k.note === note);
    const y = 140 - (noteIndex * 3);

    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(xStart, 0, w, ctx.canvas.height);
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(xStart, y, w, 3);
    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(xStart, y, w, 3);

    setTimeout(() => {
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(xStart, 0, w, ctx.canvas.height);
        ctx.fillStyle = '#00ff9d';
        ctx.fillRect(xStart, y, w, 3);
        ctx.strokeStyle = '#ffffff';
        ctx.strokeRect(xStart, y, w, 3);
    }, duration);
}

function drawPlayingRest(ctx, xStart, w, duration) {
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(xStart, 75);
    ctx.lineTo(xStart + w, 75);
    ctx.stroke();
    ctx.setLineDash([]);

    setTimeout(() => {
        ctx.strokeStyle = '#888888';
        ctx.beginPath();
        ctx.moveTo(xStart, 75);
        ctx.lineTo(xStart + w, 75);
        ctx.stroke();
    }, duration);
}

// === Code Generation ===
function generateCode() {
    let code = "#define BUZZER_PIN 9\n\nvoid setup() {\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n";
    noteSequence.forEach(item => {
        const duration = Math.round(getDuration(item.type));
        if (item.isRest) {
            code += `  delay(${duration + 50});\n`;
        } else {
            const freq = Math.round(NOTE_FREQS[item.note]);
            code += `  tone(BUZZER_PIN, ${freq}, ${duration});\n  delay(${duration});\n  noTone(BUZZER_PIN);\n  delay(50);\n`;
        }
    });
    code += "  delay(2000);\n}";
    document.getElementById('buzzer-code').textContent = code;
}

function copyCode() {
    const codeElement = document.getElementById('buzzer-code');
    const codeText = codeElement.innerText;
    navigator.clipboard.writeText(codeText).then(() => {
        updateCopyButton();
    }).catch(err => {
        console.error('Failed to copy: ', err);
        showError('Failed to copy code!');
    });
}

// === File Management ===
function saveMelody() {
    const data = JSON.stringify(noteSequence);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'buzzer_melody.json';
    a.click();
    URL.revokeObjectURL(url);
}

function loadMelody(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            noteSequence = JSON.parse(e.target.result);
            updateNoteDisplay();
        } catch (err) {
            console.error('Failed to load melody:', err);
            showError('Invalid melody file!');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

// === Share Melody ===
function shareMelody() {
    if (noteSequence.length === 0) {
        showError('No melody to share! Please create a melody first.');
        return;
    }

    const melodyJSON = JSON.stringify(noteSequence);
    const melodyBase64 = btoa(melodyJSON);
    const shareLink = `${window.location.origin}/share?melody=${encodeURIComponent(melodyBase64)}`;

    navigator.clipboard.writeText(shareLink).then(() => {
        const shareBtn = document.querySelector('button[onclick="shareMelody()"]');
        shareBtn.innerHTML = '<i class="fas fa-check me-2"></i>Link Copied!';
        setTimeout(() => {
            shareBtn.innerHTML = '<i class="fas fa-share-alt me-2"></i>Share Melody';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy share link:', err);
        showError('Failed to copy share link!');
    });
}

// === Shortcut Panel ===
function toggleShortcutPanel() {
    const panel = document.getElementById('shortcutPanel');
    isShortcutPanelOpen = !isShortcutPanelOpen;
    panel.classList.toggle('open');
}

function updateShortcutPanel() {
    const shortcutList = document.getElementById('shortcutList');
    shortcutList.innerHTML = '';
    Object.entries(keyMap).forEach(([key, action]) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${action}</span><span>${key.toUpperCase()}</span>`;
        shortcutList.appendChild(li);
    });
}

// === Keymap Editor ===
function openKeymapEditor() {
    const keymapEditor = document.getElementById('keymapEditor');
    const keymapList = document.getElementById('keymapList');
    keymapList.innerHTML = '';
    const actions = Object.values(NOTE_FREQS).map((_, i) => keys[i]?.note).filter(Boolean).concat(['32th', '16th', 'eighth', 'quarter', 'half', 'whole']);

    Object.keys(keyMap).forEach(key => {
        const action = keyMap[key];
        const div = document.createElement('div');
        div.className = 'keymap-item';
        div.innerHTML = `
            <span>Key: <input type="text" class="key-input" value="${key}" maxlength="1" style="width: 40px;"></span>
            <span>Action: 
                <select class="action-select">
                    ${actions.map(a => `<option value="${a}" ${a === action ? 'selected' : ''}>${a}</option>`).join('')}
                </select>
            </span>
        `;
        keymapList.appendChild(div);
    });
    keymapEditor.classList.add('open');
}

function saveKeymap() {
    const keymapList = document.getElementById('keymapList');
    const items = keymapList.getElementsByClassName('keymap-item');
    const newKeyMap = {};

    for (let item of items) {
        const keyInput = item.querySelector('.key-input').value.toLowerCase();
        const action = item.querySelector('.action-select').value;
        if (keyInput) newKeyMap[keyInput] = action;
    }

    if (new Set(Object.keys(newKeyMap)).size !== Object.keys(newKeyMap).length) {
        showError('Error: Duplicate keys detected! Each key must be unique.');
        return;
    }

    keyMap = newKeyMap;
    localStorage.setItem('customKeymap', JSON.stringify(keyMap));
    updateShortcutPanel();
    closeKeymapEditor();
}

function closeKeymapEditor() {
    document.getElementById('keymapEditor').classList.remove('open');
}

// === Helper Functions ===
function createNoteElement(item, index) {
    const duration = Math.round(getDuration(item.type));
    const div = document.createElement('div');
    div.className = 'note-item';
    div.setAttribute('draggable', 'true');
    div.setAttribute('data-index', index);
    div.innerHTML = `
        <span>${item.isRest ? 'Rest' : item.note} (${item.type}, ${duration}ms)</span>
        <div class="btn-group ms-2">
            <button class="btn btn-sm btn-outline-light" onclick="updateNoteType(${index}, '32th')">1/32</button>
            <button class="btn btn-sm btn-outline-light" onclick="updateNoteType(${index}, '16th')">1/16</button>
            <button class="btn btn-sm btn-outline-light" onclick="updateNoteType(${index}, 'eighth')">1/8</button>
            <button class="btn btn-sm btn-outline-light" onclick="updateNoteType(${index}, 'quarter')">1/4</button>
            <button class="btn btn-sm btn-outline-light" onclick="updateNoteType(${index}, 'half')">1/2</button>
            <button class="btn btn-sm btn-outline-light" onclick="updateNoteType(${index}, 'whole')">1/1</button>
        </div>
        <button class="btn btn-sm btn-danger ms-2" onclick="removeNote(${index})">X</button>
    `;
    addDragEvents(div);
    return div;
}

function addDragEvents(div) {
    div.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', div.getAttribute('data-index'));
        div.classList.add('dragging');
    });
    div.addEventListener('dragend', () => div.classList.remove('dragging'));
    div.addEventListener('dragover', (e) => e.preventDefault());
    div.addEventListener('drop', (e) => {
        e.preventDefault();
        const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
        const toIndex = parseInt(div.getAttribute('data-index'));
        if (fromIndex !== toIndex) {
            const [movedItem] = noteSequence.splice(fromIndex, 1);
            noteSequence.splice(toIndex, 0, movedItem);
            updateNoteDisplay();
        }
    });
}

function updateProgress() {
    if (!isPlaying) return;
    const noteTimings = [];
    let cumulativeTime = 0;
    noteSequence.forEach(item => {
        noteTimings.push(cumulativeTime);
        cumulativeTime += getDuration(item.type) + 50;
    });
    const totalDuration = noteSequence.reduce((sum, item) => sum + getDuration(item.type) + 50, 0);
    const elapsedTime = noteTimings[currentNoteIndex] || 0;
    const progress = (elapsedTime / totalDuration) * 100;
    document.getElementById('progressBar').value = progress;
    if (currentNoteIndex < noteSequence.length) setTimeout(updateProgress, 50);
}

function resetPlayback() {
    isPlaying = false;
    document.getElementById('playButton').innerHTML = '<i class="fas fa-play me-2"></i>Play';
    document.getElementById('progressBar').value = 100;
}

function stopPlayback() {
    isPlaying = false;
    timeouts.forEach(timeout => clearTimeout(timeout));
    timeouts = [];
    document.getElementById('playButton').innerHTML = '<i class="fas fa-play me-2"></i>Play';
}

function updateCopyButton() {
    const copyBtn = document.getElementById('copyCodeBtn');
    copyBtn.innerHTML = '<i class="fas fa-check me-2"></i>Copied!';
    const tooltip = bootstrap.Tooltip.getInstance(copyBtn);
    if (tooltip) tooltip.setContent({ '.tooltip-inner': 'Copied!' });
    setTimeout(() => {
        copyBtn.innerHTML = '<i class="fas fa-copy me-2"></i>Copy Code';
        if (tooltip) tooltip.setContent({ '.tooltip-inner': 'Copy to clipboard' });
    }, 2000);
}

function generateRandomMelody() {
    noteSequence = [];
    const melodyLength = Math.floor(Math.random() * 5) + 4;
    const cMajorNotes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5'];

    for (let i = 0; i < melodyLength; i++) {
        const randomNote = cMajorNotes[Math.floor(Math.random() * cMajorNotes.length)];
        const randomDuration = ['32th', '16th', 'eighth', 'quarter'][Math.floor(Math.random() * 4)];
        noteSequence.push({ note: randomNote, type: randomDuration, isRest: false });
    }

    updateNoteDisplay();
}




// === theme ===

// 主題切換
function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    updateTheme();
}

function updateTheme() {
    const root = document.documentElement;
    if (currentTheme === 'light') {
        root.style.setProperty('--background-gradient', 'linear-gradient(135deg, #f0f0f5 0%, #d0d0e0 100%)');
        root.style.setProperty('--key-white-bg', '#ffffff');
        root.style.setProperty('--key-black-bg', '#333333');
        root.style.setProperty('--text-color', '#333333');
        root.style.setProperty('--panel-bg', '#ffffff');
        root.style.setProperty('--note-item-bg', '#e0e0e0');
        root.style.setProperty('--buzzer-code-bg', '#f0f0f0');
        root.style.setProperty('--canvas-bg', '#f0f0f0');
    } else {
        root.style.setProperty('--background-gradient', 'linear-gradient(135deg, #1e1e2f 0%, #2d2d44 100%)');
        root.style.setProperty('--key-white-bg', '#ffffff');
        root.style.setProperty('--key-black-bg', '#1a1a2e');
        root.style.setProperty('--text-color', '#ffffff');
        root.style.setProperty('--panel-bg', '#2a2a3f');
        root.style.setProperty('--note-item-bg', '#3a3a5e');
        root.style.setProperty('--buzzer-code-bg', '#1a1a2e');
        root.style.setProperty('--canvas-bg', '#1a1a2e');
    }
}

// 初始化時應用主題
document.addEventListener('DOMContentLoaded', () => {
    updateTheme();
});



// === Initialization ===
initPiano();
setupEventListeners();
