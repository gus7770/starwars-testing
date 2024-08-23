document.addEventListener('click', function(e) {
    createLightsaberEffect(e.clientX, e.clientY);
});

function createLightsaberEffect(x, y) {
    // Create a lightsaber element
    let lightsaber = document.createElement('div');
    lightsaber.classList.add('lightsaber');
    lightsaber.style.left = `${x}px`;
    lightsaber.style.top = `${y}px`;
    document.body.appendChild(lightsaber);

    // Display and animate the lightsaber
    lightsaber.style.display = 'block';
    lightsaber.style.transform = 'rotate(90deg)';

    // Play lightsaber sound
    playLightsaberSound();

    // Remove the lightsaber element after animation
    setTimeout(function() {
        lightsaber.remove();
    }, 200);
}

function playLightsaberSound() {
    // Create an audio context
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // Create an oscillator
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // 440 Hz

    // Create a gain node
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);

    // Connect oscillator to gain node and gain node to destination
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Start and stop the oscillator
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.2);
}