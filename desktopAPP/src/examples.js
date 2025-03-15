const NOTE_FREQS = {
    'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81,
    'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00,
    'A#3': 233.08, 'B3': 246.94, 'C4': 261.63, 'C#4': 277.18,'E4': 277.18, 'D4': 293.66,
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

const presets = {
    'twinkle': [
        { note: 'C4', type: 'quarter', isRest: false },
        { note: 'C4', type: 'quarter', isRest: false },
        { note: 'G4', type: 'quarter', isRest: false },
        { note: 'G4', type: 'quarter', isRest: false },
        { note: 'A4', type: 'quarter', isRest: false },
        { note: 'A4', type: 'quarter', isRest: false },
        { note: 'G4', type: 'half', isRest: false }
    ],
    'happyBirthday': [
        { note: 'C4', type: 'quarter', isRest: false },
        { note: 'C4', type: 'eighth', isRest: false },
        { note: 'D4', type: 'quarter', isRest: false },
        { note: 'C4', type: 'quarter', isRest: false },
        { note: 'F4', type: 'quarter', isRest: false },
        { note: 'E4', type: 'half', isRest: false },
        { note: 'C4', type: 'quarter', isRest: false },
        { note: 'C4', type: 'eighth', isRest: false },
        { note: 'D4', type: 'quarter', isRest: false },
        { note: 'C4', type: 'quarter', isRest: false },
        { note: 'G4', type: 'quarter', isRest: false },
        { note: 'F4', type: 'half', isRest: false }
    ],
    'maryHadALittleLamb': [
        { note: 'E4', type: 'quarter', isRest: false },
        { note: 'D4', type: 'quarter', isRest: false },
        { note: 'C4', type: 'quarter', isRest: false },
        { note: 'D4', type: 'quarter', isRest: false },
        { note: 'E4', type: 'quarter', isRest: false },
        { note: 'E4', type: 'quarter', isRest: false },
        { note: 'E4', type: 'half', isRest: false }
    ],
    'jingleBells': [
        { note: 'E4', type: 'eighth', isRest: false },
        { note: 'E4', type: 'eighth', isRest: false },
        { note: 'E4', type: 'quarter', isRest: false },
        { note: 'E4', type: 'eighth', isRest: false },
        { note: 'E4', type: 'eighth', isRest: false },
        { note: 'E4', type: 'quarter', isRest: false },
        { note: 'E4', type: 'eighth', isRest: false },
        { note: 'G4', type: 'eighth', isRest: false }
    ],
    'odeToJoy': [
        { note: 'E4', type: 'quarter', isRest: false },
        { note: 'E4', type: 'quarter', isRest: false },
        { note: 'F4', type: 'quarter', isRest: false },
        { note: 'G4', type: 'quarter', isRest: false },
        { note: 'G4', type: 'quarter', isRest: false },
        { note: 'F4', type: 'quarter', isRest: false },
        { note: 'E4', type: 'quarter', isRest: false },
        { note: 'D4', type: 'half', isRest: false }
    ],
    'superMario': [
        { note: 'E4', type: 'eighth', isRest: false },
        { note: 'E4', type: 'eighth', isRest: false },
        { note: 'Rest', type: 'eighth', isRest: true },
        { note: 'E4', type: 'eighth', isRest: false },
        { note: 'Rest', type: 'eighth', isRest: true },
        { note: 'C4', type: 'eighth', isRest: false },
        { note: 'E4', type: 'quarter', isRest: false },
        { note: 'G4', type: 'quarter', isRest: false },
        { note: 'Rest', type: 'quarter', isRest: true }
    ],
    'starWars': [
        { note: 'G4', type: 'quarter', isRest: false },
        { note: 'G4', type: 'quarter', isRest: false },
        { note: 'G4', type: 'quarter', isRest: false },
        { note: 'D4', type: 'eighth', isRest: false },
        { note: 'C5', type: 'half', isRest: false },
        { note: 'B4', type: 'quarter', isRest: false },
        { note: 'A4', type: 'quarter', isRest: false },
        { note: 'G4', type: 'half', isRest: false }
    ],
    'piratesCaribbean': [
        { note: 'D4', type: 'eighth', isRest: false },
        { note: 'D4', type: 'eighth', isRest: false },
        { note: 'D4', type: 'eighth', isRest: false },
        { note: 'E4', type: 'eighth', isRest: false },
        { note: 'F4', type: 'eighth', isRest: false },
        { note: 'F4', type: 'eighth', isRest: false },
        { note: 'E4', type: 'eighth', isRest: false },
        { note: 'F4', type: 'eighth', isRest: false },
        { note: 'G4', type: 'quarter', isRest: false }
    ],
    'totoro': [
        { note: 'F4', type: 'quarter', isRest: false },
        { note: 'G4', type: 'quarter', isRest: false },
        { note: 'A4', type: 'quarter', isRest: false },
        { note: 'G4', type: 'quarter', isRest: false },
        { note: 'F4', type: 'quarter', isRest: false },
        { note: 'E4', type: 'quarter', isRest: false },
        { note: 'D4', type: 'quarter', isRest: false },
        { note: 'E4', type: 'half', isRest: false }
    ],
    'Haruhikage': [
        {"note":"E5","type":"quarter"},{"note":"D5","type":"eighth"},{"note":"C5","type":"quarter"},{"note":"D5","type":"eighth"},{"note":"E5","type":"eighth"},{"note":"F5","type":"16th"},{"note":"E5","type":"eighth"},{"note":"D5","type":"quarter"},{"note":"E5","type":"quarter","isRest":false},{"note":"D5","type":"eighth","isRest":false},{"note":"C5","type":"quarter","isRest":false},{"note":"D5","type":"eighth","isRest":false},{"note":"E5","type":"eighth","isRest":false},{"note":"F5","type":"16th","isRest":false},{"note":"E5","type":"eighth","isRest":false},{"note":"D5","type":"quarter","isRest":false},{"note":"E5","type":"quarter","isRest":false},{"note":"D5","type":"eighth","isRest":false},{"note":"C5","type":"quarter","isRest":false},{"note":"D5","type":"eighth","isRest":false},{"note":"E5","type":"eighth","isRest":false},{"note":"F5","type":"16th","isRest":false},{"note":"E5","type":"eighth","isRest":false},{"note":"D5","type":"quarter","isRest":false},{"note":"E5","type":"quarter","isRest":false},{"note":"D5","type":"eighth","isRest":false},{"note":"C5","type":"quarter","isRest":false},{"note":"D5","type":"eighth","isRest":false},{"note":"E5","type":"eighth","isRest":false},{"note":"F5","type":"16th","isRest":false},{"note":"E5","type":"eighth","isRest":false},{"note":"D5","type":"quarter","isRest":false},{"note":"C4","type":"16th","isRest":false},{"note":"C4","type":"16th","isRest":false},{"note":"E4","type":"eighth","isRest":false},{"note":"E4","type":"eighth","isRest":false},{"note":"D4","type":"eighth","isRest":false},{"note":"F4","type":"eighth","isRest":false},{"note":"E4","type":"eighth","isRest":false},{"note":"D4","type":"eighth","isRest":false},{"note":"D4","type":"eighth","isRest":false},{"note":"D4","type":"eighth","isRest":false},{"note":"C4","type":"16th","isRest":false},{"note":"C4","type":"16th","isRest":false},{"note":"F4","type":"eighth","isRest":false},{"note":"E4","type":"eighth","isRest":false},{"note":"D4","type":"eighth","isRest":false},{"note":"D4","type":"quarter","isRest":false},{"note":"C4","type":"16th","isRest":false},{"note":"D4","type":"16th","isRest":false},{"note":"E4","type":"quarter","isRest":false},{"note":"Rest","type":"quarter","isRest":true},{"note":"E4","type":"eighth","isRest":false},{"note":"G4","type":"eighth","isRest":false},{"note":"C5","type":"eighth","isRest":false},{"note":"B4","type":"quarter","isRest":false},{"note":"C5","type":"eighth","isRest":false},{"note":"B4","type":"quarter","isRest":false},{"note":"C5","type":"eighth","isRest":false},{"note":"B4","type":"16th","isRest":false},{"note":"A4","type":"16th","isRest":false},{"note":"G4","type":"16th","isRest":false},{"note":"G4","type":"eighth","isRest":false},{"note":"D4","type":"eighth","isRest":false},{"note":"F4","type":"eighth","isRest":false},{"note":"F4","type":"quarter","isRest":false},{"note":"E4","type":"eighth","isRest":false},{"note":"E4","type":"quarter","isRest":false},{"note":"G3","type":"eighth","isRest":false},{"note":"F4","type":"eighth","isRest":false},{"note":"E4","type":"eighth","isRest":false},{"note":"D4","type":"eighth","isRest":false},{"note":"E4","type":"quarter","isRest":false},{"note":"G4","type":"eighth","isRest":false},{"note":"C4","type":"quarter","isRest":false},{"note":"F3","type":"eighth","isRest":false},{"note":"C4","type":"eighth","isRest":false},{"note":"D4","type":"eighth","isRest":false},{"note":"C4","type":"eighth","isRest":false},{"note":"B3","type":"16th","isRest":false}
    ]
};

let currentExample = [];

function showExample(exampleName) {
    currentExample = [...presets[exampleName]]; // 創建副本
    const detail = document.getElementById('exampleDetail');
    const title = document.getElementById('exampleTitle');
    const code = document.getElementById('exampleCode');
    const editableNotes = document.getElementById('editableNotes');

    title.textContent = `${exampleName.replace(/([A-Z])/g, ' $1').trim()} Example`;
    code.textContent = JSON.stringify(currentExample, null, 2);

    editableNotes.innerHTML = '';
    currentExample.forEach((item, index) => {
        const duration = Math.round(getDuration(item.type));
        const div = document.createElement('div');
        div.className = 'note-item';
        div.innerHTML = `
            <select onchange="updateNote(${index}, 'note', this.value)">
                <option value="Rest" ${item.note === 'Rest' ? 'selected' : ''}>Rest</option>
                ${Object.keys(NOTE_FREQS).map(note => `<option value="${note}" ${item.note === note ? 'selected' : ''}>${note}</option>`).join('')}
            </select>
            <div class="btn-group ms-2">
                <button class="btn btn-sm btn-outline-light" onclick="updateNote(${index}, 'type', '32th')">1/32</button>
                <button class="btn btn-sm btn-outline-light" onclick="updateNote(${index}, 'type', '16th')">1/16</button>
                <button class="btn btn-sm btn-outline-light" onclick="updateNote(${index}, 'type', 'eighth')">1/8</button>
                <button class="btn btn-sm btn-outline-light" onclick="updateNote(${index}, 'type', 'quarter')">1/4</button>
                <button class="btn btn-sm btn-outline-light" onclick="updateNote(${index}, 'type', 'half')">1/2</button>
                <button class="btn btn-sm btn-outline-light" onclick="updateNote(${index}, 'type', 'whole')">1/1</button>
            </div>
            <span>(${item.type}, ${duration}ms)</span>
            <button class="btn btn-sm btn-danger ms-2" onclick="removeNoteFromExample(${index})">X</button>
        `;
        editableNotes.appendChild(div);
    });

    drawMelodyPreview();
    detail.classList.add('active');
}

function updateNote(index, field, value) {
    currentExample[index][field] = value;
    currentExample[index].isRest = (value === 'Rest');
    showExample(currentExample[0].note); // 重新渲染
}

function removeNoteFromExample(index) {
    currentExample.splice(index, 1);
    if (currentExample.length > 0) {
        showExample(currentExample[0].note); // 重新渲染
    } else {
        document.getElementById('exampleDetail').classList.remove('active');
    }
}

function getDuration(type) {
    const quarterDuration = 60000 / 120; // 固定 BPM 120 作為範例
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

function playCurrentExample() {
    let delay = 0;
    currentExample.forEach(item => {
        const duration = getDuration(item.type);
        if (!item.isRest && NOTE_FREQS[item.note]) {
            setTimeout(() => playTone(NOTE_FREQS[item.note], duration), delay);
        }
        delay += duration + 50;
    });
}

function playTone(freq, duration) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; // 預設正弦波
    oscillator.frequency.value = freq || 440; // 預設 A4 如果無效
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration / 1000);
}

function saveEditedExample() {
    const data = JSON.stringify(currentExample);
    localStorage.setItem('editedMelody', data); // 儲存到 localStorage
    window.location.href = 'tools.html'; // 返回主頁
}

function drawMelodyPreview() {
    const canvas = document.getElementById('melody-preview');
    const ctx = canvas.getContext('2d');
    const width = canvas.scrollWidth;
    canvas.width = width;
    canvas.height = 150;

    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, width, 150);

    const totalDuration = currentExample.reduce((sum, item) => sum + getDuration(item.type) + 50, 0);
    const scaleX = totalDuration > 0 ? width / totalDuration : 1;
    let x = 0;

    currentExample.forEach(item => {
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