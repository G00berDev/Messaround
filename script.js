// Enhanced Cube Rotation System
let rotationX = 15;
let rotationY = 15;
let isFloating = true;
const cube = document.getElementById('cube');
const scene = document.getElementById('scene');

// Panel management with new futuristic panels
const panels = {
    'about': document.getElementById('about-panel'),
    'projects': document.getElementById('projects-panel'),
    'experience': document.getElementById('experience-panel'),
    'contact': document.getElementById('contact-panel'),
    'skills': document.getElementById('skills-panel'),
    'minigame': document.getElementById('minigame-panel')
};

let activePanel = null;
let isMinimized = false;

// Enhanced showPanel function with futuristic transitions
function showPanel(panelId, faceElement) {
    if (isMinimized) {
        closePanel();
        return;
    }
    
    // Create ripple effect on the clicked face
    createFaceRipple(faceElement);
    
    // Minimize the cube with animation
    isMinimized = true;
    scene.classList.add('minimized');
    cube.classList.add('minimized');
    
    // Apply minimized class to all faces
    const faces = document.querySelectorAll('.pixel-box-face');
    faces.forEach(face => {
        face.classList.add('minimized');
        face.style.transform = ''; // Reset any transform effects
    });
    
    // Show the selected panel with cyber transition
    if (panels[panelId]) {
        activePanel = panels[panelId];
        activePanel.style.opacity = '0';
        activePanel.style.transform = 'scale(0.9)';
        activePanel.classList.add('active');
        
        // Animate panel appearance
        setTimeout(() => {
            activePanel.style.opacity = '1';
            activePanel.style.transform = 'scale(1)';
        }, 50);
    }
    
    // Stop floating animation
    cube.style.animation = 'none';
    
    // Activate panel-specific effects
    activatePanelEffects(panelId);
}

function createFaceRipple(faceElement) {
    const ripple = document.createElement('div');
    ripple.className = 'face-ripple';
    faceElement.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 1000);
}

function activatePanelEffects(panelId) {
    switch(panelId) {
        case 'projects':
            startMatrixRain();
            break;
        case 'experience':
            startBrainwaveAnimation();
            break;
        case 'skills':
            startRadarAnimation();
            break;
        case 'minigame':
            initQuantumDots();
            break;
    }
}

function closePanel() {
    if (!isMinimized) return;
    
    // Deactivate panel effects
    if (activePanel) {
        const panelId = Object.keys(panels).find(key => panels[key] === activePanel);
        deactivatePanelEffects(panelId);
    }
    
    // Animate panel disappearance
    if (activePanel) {
        activePanel.style.opacity = '0';
        activePanel.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            activePanel.classList.remove('active');
            activePanel = null;
        }, 300);
    }
    
    // Restore the cube with animation
    setTimeout(() => {
        isMinimized = false;
        scene.classList.remove('minimized');
        cube.classList.remove('minimized');
        
        const faces = document.querySelectorAll('.pixel-box-face');
        faces.forEach(face => face.classList.remove('minimized'));
        
        // Restart floating animation if enabled
        if (isFloating) {
            cube.style.animation = 'float 6s ease-in-out infinite';
        }
    }, 300);
}

function deactivatePanelEffects(panelId) {
    switch(panelId) {
        case 'projects':
            stopMatrixRain();
            break;
        case 'experience':
            stopBrainwaveAnimation();
            break;
        case 'skills':
            stopRadarAnimation();
            break;
        case 'minigame':
            stopQuantumDots();
            break;
    }
}

// Matrix Rain Effect for Projects Panel
let matrixInterval;
function startMatrixRain() {
    const container = panels['projects'].querySelector('.matrix-rain');
    container.innerHTML = '';
    
    // Create columns
    const columns = Math.floor(container.offsetWidth / 20);
    for (let i = 0; i < columns; i++) {
        const col = document.createElement('div');
        col.className = 'matrix-column';
        col.style.left = `${i * 20}px`;
        container.appendChild(col);
        startMatrixColumn(col);
    }
    
    matrixInterval = setInterval(() => {
        const cols = container.querySelectorAll('.matrix-column');
        cols.forEach(col => {
            if (Math.random() > 0.9) {
                col.innerHTML = '';
                startMatrixColumn(col);
            }
        });
    }, 100);
}

function startMatrixColumn(col) {
    const chars = '01アイウエオカキクケコ';
    const length = Math.floor(Math.random() * 10) + 5;
    const speed = Math.random() * 100 + 50;
    
    for (let i = 0; i < length; i++) {
        setTimeout(() => {
            const char = document.createElement('div');
            char.className = 'matrix-char';
            char.textContent = chars[Math.floor(Math.random() * chars.length)];
            char.style.animationDuration = `${speed}ms`;
            col.appendChild(char);
            
            // Remove old characters
            if (col.children.length > 20) {
                col.removeChild(col.children[0]);
            }
        }, i * speed);
    }
}

function stopMatrixRain() {
    clearInterval(matrixInterval);
}

// Brainwave Animation for Experience Panel
let brainwaveInterval;
function startBrainwaveAnimation() {
    const container = panels['experience'].querySelector('.brainwave-animation');
    container.innerHTML = '';
    
    for (let i = 0; i < 3; i++) {
        const wave = document.createElement('div');
        wave.className = 'wave';
        wave.style.animationDelay = `${i * 0.3}s`;
        container.appendChild(wave);
    }
    
    brainwaveInterval = setInterval(() => {
        const waves = container.querySelectorAll('.wave');
        waves.forEach(wave => {
            wave.style.left = `${Math.random() * 10}%`;
            wave.style.width = `${80 + Math.random() * 20}%`;
        });
    }, 3000);
}

function stopBrainwaveAnimation() {
    clearInterval(brainwaveInterval);
}

// Radar Animation for Skills Panel
let radarInterval;
function startRadarAnimation() {
    const radar = panels['skills'].querySelector('.radar-sweep');
    radar.style.display = 'block';
    
    radarInterval = setInterval(() => {
        // Create random blips
        if (Math.random() > 0.7) {
            createRadarBlip();
        }
    }, 1000);
}

function createRadarBlip() {
    const radar = panels['skills'].querySelector('.radar-sweep');
    const blip = document.createElement('div');
    blip.className = 'radar-blip';
    blip.style.left = `${Math.random() * 80 + 10}%`;
    blip.style.top = `${Math.random() * 80 + 10}%`;
    radar.appendChild(blip);
    
    setTimeout(() => {
        blip.remove();
    }, 3000);
}

function stopRadarAnimation() {
    clearInterval(radarInterval);
}

// Quantum Dots for Minigame Panel
let quantumInterval;
function initQuantumDots() {
    const container = panels['minigame'].querySelector('.quantum-dots');
    container.innerHTML = '';
    
    for (let i = 1; i <= 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'qdot';
        dot.style.setProperty('--q', i);
        container.appendChild(dot);
    }
    
    quantumInterval = setInterval(() => {
        const dots = container.querySelectorAll('.qdot');
        dots.forEach(dot => {
            if (Math.random() > 0.8) {
                dot.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
            }
        });
    }, 500);
}

function stopQuantumDots() {
    clearInterval(quantumInterval);
}

// Enhanced Dice Roller with Performance Monitor
document.getElementById('roll-dice').addEventListener('click', function() {
    const diceType = parseInt(document.getElementById('dice-type').value);
    const diceCount = parseInt(document.getElementById('dice-count').value);
    const container = document.getElementById('dice-container');
    const totalDisplay = document.getElementById('dice-total');
    
    // Clear previous dice
    container.innerHTML = '';
    totalDisplay.classList.remove('show');
    
    // Start performance monitoring
    const startTime = performance.now();
    let frames = 0;
    const perfMonitor = setInterval(() => {
        frames++;
    }, 16);
    
    let total = 0;
    const diceResults = [];
    
    // Create and roll each die with optimized performance
    for (let i = 0; i < Math.min(diceCount, 100); i++) { // Limit to 100 dice for performance
        setTimeout(() => {
            const die = document.createElement('div');
            die.className = 'die';
            die.classList.add(`d${diceType}`);
            
            // Optimized position calculation
            const endX = Math.random() * (window.innerWidth - 100);
            const endY = Math.random() * (window.innerHeight - 100);
            
            die.style.setProperty('--end-x', `${endX}px`);
            die.style.setProperty('--end-y', `${endY}px`);
            
            // Generate random result
            const result = diceType === 100 
                ? Math.floor(Math.random() * 10) * 10
                : Math.floor(Math.random() * diceType) + 1;
            
            // Create only the result face for performance
            const face = document.createElement('div');
            face.className = 'face';
            face.textContent = diceType === 100 ? `${result}0` : result;
            face.style.opacity = '0';
            die.appendChild(face);
            
            container.appendChild(die);
            
            // Animate face appearance
            setTimeout(() => {
                face.style.opacity = '1';
            }, 1800);
            
            // Add to total
            diceResults.push(result);
            if (diceResults.length === Math.min(diceCount, 100)) {
                total = diceResults.reduce((sum, val) => sum + val, 0);
                totalDisplay.textContent = total;
                totalDisplay.classList.add('show');
                
                // Stop performance monitoring
                clearInterval(perfMonitor);
                const duration = (performance.now() - startTime) / 1000;
                console.log(`Dice roll completed in ${duration.toFixed(2)}s at ~${Math.round(frames/duration)} FPS`);
            }
        }, i * 50); // Reduced delay for better performance
    }
});

// Initialize all systems
window.addEventListener('DOMContentLoaded', function() {
    // Core systems
    createParticles();
    updateClock();
    initBattery();
    updateFps();
    initDroplets();
    
    // Initialize cyber form
    initCyberForm();
    
    // Set up keyboard controls
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMinimized) {
            closePanel();
        }
        if (e.key === 'ArrowLeft') rotateCube('y');
        if (e.key === 'ArrowRight') rotateCube('y');
        if (e.key === 'ArrowUp') rotateCube('x');
        if (e.key === 'ArrowDown') rotateCube('x');
        if (e.key === 'f') toggleFloat();
    });
    
    // Touch controls for mobile
    let touchStartX, touchStartY;
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        if (Math.abs(diffX) > Math.abs(diffY)) {
            rotationY += diffX > 0 ? -10 : 10;
        } else {
            rotationX += diffY > 0 ? -10 : 10;
        }
        
        cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        
        touchStartX = touchEndX;
        touchStartY = touchEndY;
    });
});

// Cyber Form Initialization
function initCyberForm() {
    const cyberForm = document.getElementById('cyber-form');
    const statusElement = document.getElementById('cyber-status');
    const statusLed = statusElement.querySelector('.status-led');
    const statusText = statusElement.querySelector('.status-text');
    const messageField = document.getElementById('cyber-message');

    // Dynamic typing indicator
    messageField.addEventListener('input', function() {
        const indicator = this.parentNode.querySelector('.typing-indicator');
        indicator.style.display = this.value ? 'flex' : 'none';
        
        // Animate the border based on typing speed
        const border = this.parentNode.querySelector('.input-border');
        border.style.height = '2px';
        border.style.backgroundColor = 'var(--secondary-color)';
        
        setTimeout(() => {
            border.style.height = '1px';
            border.style.backgroundColor = 'rgba(0, 255, 204, 0.3)';
        }, 300);
    });

    // Form submission with enhanced effects
    cyberForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Create transmission effect
        const transmissionEffect = document.createElement('div');
        transmissionEffect.className = 'transmission-effect';
        cyberForm.appendChild(transmissionEffect);
        
        setTimeout(() => {
            transmissionEffect.remove();
        }, 1000);

        // Set loading state
        statusLed.style.animation = 'signalPulse 0.5s infinite';
        statusText.textContent = 'TRANSMITTING...';
        
        // Simulate transmission progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            statusText.textContent = `TRANSMITTING... ${progress}%`;
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                completeTransmission();
            }
        }, 200);
        
        function completeTransmission() {
            statusLed.style.animation = '';
            statusLed.style.backgroundColor = '#00ff00';
            statusText.textContent = 'TRANSMISSION SUCCESS';
            
            // Create success particles
            for (let i = 0; i < 50; i++) {
                createSuccessParticle();
            }
            
            cyberForm.reset();
            document.querySelectorAll('.input-highlight, .select-highlight').forEach(el => el.style.width = '0');
            document.querySelectorAll('.typing-indicator').forEach(el => el.style.display = 'none');

            setTimeout(() => {
                statusLed.style.backgroundColor = 'var(--secondary-color)';
                statusText.textContent = 'SYSTEM READY';
            }, 3000);
        }
    });
}

function createSuccessParticle() {
    const particle = document.createElement('div');
    particle.className = 'success-particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
    
    document.getElementById('contact-panel').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 2000);
}

// Existing utility functions (rotateCube, toggleFloat, etc.) remain the same
// but now work with the enhanced system