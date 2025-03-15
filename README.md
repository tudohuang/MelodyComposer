# MelodyComposer 🎶

Welcome to **MelodyComposer**, a web-based tool designed to help you create, edit, and play melodies using a virtual piano, and generate Arduino code to bring your music to life on a buzzer! Whether you're a musician, an Arduino enthusiast, or just curious about combining music with hardware, MelodyComposer makes the process fun and accessible.

## Features

- **Virtual Piano**: Compose melodies using an intuitive piano interface with keyboard shortcuts.
- **Real-Time Playback**: Preview your creations instantly with customizable waveforms (sine, square, etc.) and tempo (BPM).
- **Editable Examples**: Explore and modify preloaded melodies like Super Mario and Twinkle Twinkle.
- **Arduino Code Generation**: Export your melodies as Arduino-compatible code using `melody[]` and `durations[]` arrays.
- **Comprehensive Docs**: Step-by-step guides to help you from composition to hardware playback.

## Getting Started

Follow these steps to start using MelodyComposer:

### 1. Access the App
- Visit the live demo at [MelodyComposer](https://your-username.github.io/MelodyComposer) (replace with your deployed URL).
- Alternatively, run the app locally by following the setup instructions below.

### 2. Compose a Melody
- Use the virtual piano to play notes, or load a preloaded example.
- Adjust durations (whole, half, quarter, etc.) and add rests as needed.
- Preview your melody with the "Play Melody" button.

### 3. Generate Arduino Code
- Click "Generate Code" to create Arduino code for your melody.
- Copy the code and add the required `NOTE_` frequency definitions (e.g., `#define NOTE_C4 262`).

### 4. Play on Your Arduino
- Connect a buzzer to your Arduino (default pin: 9).
- Upload the code using the Arduino IDE and enjoy your melody!

## Installation (Run Locally)

To run MelodyComposer locally, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org) (version 12.x or higher recommended).
- A modern browser (e.g., Chrome, Firefox).
- An Arduino board and buzzer for hardware playback.

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/MelodyComposer.git
   cd MelodyComposer
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run start
   ```
   - The app and documentation will be available at `http://localhost:3000/`.

4. **Build for Production** (Optional):
   ```bash
   npm run build
   ```

5. **Deploy to GitHub Pages** (Optional):
   ```bash
   npm run deploy
   ```

## Project Structure

Here's an overview of the project structure:

```
MelodyComposer/
├── docs/                 # Documentation files
│   ├── intro.md
│   ├── virtualpiano.md
│   ├── editableexamples.md
│   ├── arduinoguide.md
│   ├── instruction.md
│   ├── faq.md
│   └── congratulations.md
├── app/                  # Front-end application code
│   ├── index.html        # Main HTML file
│   ├── scripts/          # JavaScript files (e.g., generateCode.js)
│   ├── styles/           # CSS files
│   └── assets/           # Images or audio files
├── static/               # Static assets for Docusaurus
│   ├── img/
│   └── favicon.ico
├── src/                  # Custom Docusaurus code (optional)
├── docusaurus.config.js  # Docusaurus configuration
├── package.json          # Dependencies and scripts
├── package-lock.json     # Dependency lock file
├── README.md             # This file
└── sidebars.js           # Sidebar configuration for docs
```

## Documentation

Explore the detailed guides to get the most out of MelodyComposer:

- [Introduction](docs/intro): Overview of the project.
- [Virtual Piano Guide](docs/virtualpiano): Learn to compose with the piano.
- [Editable Examples](docs/editableexamples): Modify preloaded melodies.
- [Arduino Guide](docs/arduinoguide): Set up and play melodies on hardware.
- [User Instructions](docs/instruction): Step-by-step tutorial.
- [FAQ](docs/faq): Answers to common questions.
- [Congratulations](docs/congratulations): Celebrate your achievements!

## Contributing

We welcome contributions to MelodyComposer! Here's how you can help:

- **Report Issues**: Found a bug? Open an issue on [GitHub Issues](https://github.com/your-username/MelodyComposer/issues).
- **Submit Features**: Suggest new features or improvements.
- **Add Melodies**: Contribute new example melodies by submitting a pull request.
- **Improve Docs**: Help enhance the documentation for clarity and completeness.

Please read our [Contributing Guidelines](CONTRIBUTING.md) (to be added) for more details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

Have questions or need support? Reach out to us:

- **GitHub**: [your-username/MelodyComposer](https://github.com/your-username/MelodyComposer)
- **Email**: your-email@example.com (replace with your email)

---

Happy composing with MelodyComposer! 🎵 Let's make music together!
