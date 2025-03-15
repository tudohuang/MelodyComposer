const NOTE_FREQS = {
    'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81,
    'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00,
    'A#3': 233.08, 'B3': 246.94, 'C4': 261.63, 'C#4': 277.18, 'D4': 293.66,
    'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00,
    'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88, 'C5': 523.25,
    'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46,
    'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33,
    'B5': 987.77, 'C6': 1046.50, 'C#6': 1108.73, 'D6': 1174.66, 'D#6': 1244.51,
    'E6': 1318.51, 'F6': 1396.91, 'F#6': 1479.98
};

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

const keyMap = {
    'q': 'C3', '2': 'C#3', 'w': 'D3', '3': 'D#3', 'e': 'E3',
    'r': 'F3', '5': 'F#3', 't': 'G3', '6': 'G#3', 'y': 'A3',
    '7': 'A#3', 'u': 'B3', 'i': 'C4', '9': 'C#4', 'o': 'D4',
    '0': 'D#4', 'p': 'E4', '[': 'F4', '=': 'F#4', ']': 'G4',
    'a': 'G#4', 's': 'A4', 'd': 'A#4', 'f': 'B4', 'g': 'C5',
    'h': 'C#5', 'j': 'D5', 'k': 'D#5', 'l': 'E5', ';': 'F5',
    "'": 'F#5', 'z': 'G5', 'x': 'G#5', 'c': 'A5', 'v': 'A#5',
    'b': 'B5', 'n': 'C6', 'm': 'C#6', ',': 'D6', '.': 'D#6',
    '/': 'E6', 'Q': 'F6', 'W': 'F#6', 'R': 'Rest',
    '1': '32th', '2': '16th', '3': 'eighth', '4': 'quarter', '5': 'half', '6': 'whole'
};

let noteSequence = [];
let bpm = 120;
let isRecording = false;
let currentDuration = 'quarter';
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let isShortcutPanelOpen = false;

// 初始化鋼琴鍵盤
const piano = document.getElementById('piano');
let whiteKeyIndex = 0;
keys.forEach((key) => {
    const keyElement = document.createElement('div');
    keyElement.className = `key ${key.type}`;
    keyElement.textContent = key.note;
    if (key.type === 'black') {
        const whiteKey = piano.children[whiteKeyIndex - 1];
        keyElement.style.left = `${whiteKey.offsetWidth / 2}px`;
        whiteKey.appendChild(keyElement);
    } else {
        piano.appendChild(keyElement);
        whiteKeyIndex++;
    }
    keyElement.onclick = () => addNote(key.note);
});

// 鍵盤快捷鍵
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        e.preventDefault();
    } else if (e.key === 'H' && e.ctrlKey) {
        e.preventDefault();
        toggleShortcutPanel();
    } else if (keyMap[e.key] && ['1', '2', '3', '4', '5', '6'].includes(e.key)) {
        setDuration(keyMap[e.key]);
    } else if (keyMap[e.key] && isRecording) {
        if (keyMap[e.key] === 'Rest') {
            addRest();
        } else {
            addNote(keyMap[e.key]);
            playTone(NOTE_FREQS[keyMap[e.key]], getDuration(currentDuration));
        }
    } else if (keyMap[e.key]) {
        addNote(keyMap[e.key]);
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === ' ' && isRecording) {
        stopRecording();
    }
});

function updateBPM() {
    bpm = parseInt(document.getElementById('bpm').value) || 120;
    updateNoteDisplay();
}

function getDuration(type) {
    const quarterDuration = 60000 / bpm;
    const durations = {
        'whole': quarterDuration * 4,
        'half': quarterDuration * 2,
        'quarter': quarterDuration,
        'eighth': quarterDuration / 2,
        '16th': quarterDuration / 4,
        '32th': quarterDuration / 8
    };
    return durations[type];
}

function setDuration(type) {
    currentDuration = type;
    const buttons = document.querySelectorAll('#duration-buttons .btn');
    buttons.forEach(btn => {
        btn.classList.remove('btn-selected');
        if (btn.textContent === typeToLabel(type)) {
            btn.classList.add('btn-selected');
        }
    });
}

function typeToLabel(type) {
    const labels = {
        '32th': '1/32', '16th': '1/16', 'eighth': '1/8',
        'quarter': '1/4', 'half': '1/2', 'whole': '1/1'
    };
    return labels[type];
}

function addNote(note) {
    noteSequence.push({ note, type: currentDuration, isRest: false });
    updateNoteDisplay();
}

function addRest() {
    noteSequence.push({ note: 'Rest', type: currentDuration, isRest: true });
    updateNoteDisplay();
}

function startRecording() {
    if (!isRecording) {
        isRecording = true;
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

function updateNoteDisplay() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';
    noteSequence.forEach((item, index) => {
        const duration = Math.round(getDuration(item.type));
        const div = document.createElement('div');
        div.className = 'note-item';
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
        notesList.appendChild(div);
    });
    drawMelodyPreview();
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

function playSequence() {
    let delay = 0;
    noteSequence.forEach(item => {
        const duration = getDuration(item.type);
        if (!item.isRest) {
            setTimeout(() => playTone(NOTE_FREQS[item.note], duration), delay);
        }
        delay += duration + 50;
    });
}

function playTone(freq, duration) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = document.getElementById('wave_type').value;
    oscillator.frequency.value = freq;
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration / 1000);
}

function generateCode() {
    let code = "#define BUZZER_PIN 9\n\nvoid setup() {\n  pinMode(BUZZER_PIN, OUTPUT);\n}\n\nvoid loop() {\n";
    noteSequence.forEach(item => {
        const duration = Math.round(getDuration(item.type));
        if (item.isRest) {
            code += `  delay(${duration + 50});\n`;
        } else {
            const freq = Math.round(NOTE_FREQS[item.note]);
            code += `  tone(BUZZER_PIN, ${freq}, ${duration});\n`;
            code += `  delay(${duration});\n`;
            code += "  noTone(BUZZER_PIN);\n  delay(50);\n";
        }
    });
    code += "  delay(2000);\n}";
    document.getElementById('buzzer-code').textContent = code;
}

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
            alert('Invalid melody file!');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

function drawMelodyPreview() {
    const canvas = document.getElementById('melody-preview');
    const ctx = canvas.getContext('2d');
    const width = canvas.scrollWidth;
    canvas.width = width;
    canvas.height = 150;

    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, width, 150);

    const totalDuration = noteSequence.reduce((sum, item) => sum + getDuration(item.type) + 50, 0);
    const scaleX = totalDuration > 0 ? width / totalDuration : 1;
    let x = 0;

    noteSequence.forEach(item => {
        const duration = getDuration(item.type);
        const w = duration * scaleX;

        if (item.isRest) {
            ctx.strokeStyle = '#888888';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(x, 75);
            ctx.lineTo(x + w, 75);
            ctx.stroke();
            ctx.setLineDash([]);
        } else {
            const noteIndex = keys.findIndex(k => k.note === item.note);
            const y = 140 - (noteIndex * 3);
            ctx.fillStyle = '#00ff9d';
            ctx.fillRect(x, y, w, 3);
        }
        x += (duration + 50) * scaleX;
    });
}

function copyCode() {
    const codeElement = document.getElementById('buzzer-code');
    const codeText = codeElement.innerText;
    navigator.clipboard.writeText(codeText).then(() => {
        const copyBtn = document.getElementById('copyCodeBtn');
        copyBtn.innerHTML = '<i class="fas fa-check me-2"></i>Copied!';
        const tooltip = bootstrap.Tooltip.getInstance(copyBtn);
        if (tooltip) {
            tooltip.setContent({ '.tooltip-inner': 'Copied!' });
        }
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy me-2"></i>Copy Code';
            if (tooltip) {
                tooltip.setContent({ '.tooltip-inner': 'Copy to clipboard' });
            }
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy code!');
    });
}

function toggleShortcutPanel() {
    const panel = document.getElementById('shortcutPanel');
    isShortcutPanelOpen = !isShortcutPanelOpen;
    panel.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copyCodeBtn');
    new bootstrap.Tooltip(copyBtn);
    setDuration('quarter');
});

document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copyCodeBtn');
    new bootstrap.Tooltip(copyBtn);
    setDuration('quarter');

    // 檢查是否有編輯後的旋律
    const editedMelody = localStorage.getItem('editedMelody');
    if (editedMelody) {
        try {
            noteSequence = JSON.parse(editedMelody);
            updateNoteDisplay();
            localStorage.removeItem('editedMelody'); // 清除儲存，避免重複載入
        } catch (err) {
            console.error('Failed to load edited melody:', err);
            alert('Failed to load edited melody!');
        }
    }
});

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
            alert('Invalid melody file!');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}
