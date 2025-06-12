// File: js/scripts.js

// Star background animation
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starsCount = 300;
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        
        // Random size
        const size = Math.random() * 4;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random animation duration
        const duration = 2 + Math.random() * 10;
        star.style.setProperty('--duration', `${duration}s`);
        
        starsContainer.appendChild(star);
    }
}

// Floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particlesCount = 50;
    
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        
        // Random size
        const size = 1 + Math.random() * 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random animation duration
        const duration = 10 + Math.random() * 30;
        particle.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Hamburger menu functionality
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Scrollspy for navigation
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
        
        // Header effect on scroll
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Section animation on scroll (termasuk timeline staggered)
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Jika ada timeline di dalam section, animasi staggered tiap item
                if (entry.target.querySelector('.timeline')) {
                    const timeline = entry.target.querySelector('.timeline');
                    const items = timeline.querySelectorAll('.timeline-item');
                    items.forEach((item, idx) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, idx * 200);
                    });
                }
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('section').forEach(section => {
        if (section.id !== 'hero') {
            observer.observe(section);
        }
    });
}

// Wave animation (otomatis berjalan, λ dan f bisa disesuaikan)
function initWaveAnimation() {
    const canvas = document.getElementById('waveCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const wavelengthInput = document.getElementById('wavelength');
    const frequencyInput = document.getElementById('frequency');
    const waveSpeedInput = document.getElementById('waveSpeed');
    const wavelengthValue = document.getElementById('wavelength-value');
    const frequencyValue = document.getElementById('frequency-value');
    const waveSpeedValue = document.getElementById('waveSpeed-value');
    const playWaveBtn = document.getElementById('playWaveBtn');
    const pauseWaveBtn = document.getElementById('pauseWaveBtn');
    
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    // Inisialisasi resize dan update otomatis
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    let currentWavelength = parseInt(wavelengthInput.value);
    let currentFrequency = parseInt(frequencyInput.value);
    let waveSpeed = parseInt(waveSpeedInput.value);
    let isPlaying = true;
    let animationFrameId;
    let timeOffset = 0;
    
    // Speed labels
    const speedLabels = ['Sangat Lambat', 'Lambat', 'Normal', 'Cepat', 'Sangat Cepat'];
    
    function drawWave() {
        if (!canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const amplitude = canvas.height / 4;
        const centerY = canvas.height / 2;
        const time = Date.now() * 0.001 * waveSpeed;
        
        // Draw grid
        ctx.strokeStyle = 'rgba(143, 143, 220, 0.2)';
        ctx.lineWidth = 1;
        
        // Horizontal lines
        for (let i = 0; i < canvas.height; i += 20) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }
        
        // Vertical lines
        for (let i = 0; i < canvas.width; i += 20) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }
        
        // Draw wave
        ctx.beginPath();
        ctx.strokeStyle = '#55c4c1';
        ctx.lineWidth = 4;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#55c4c1';
        
        for (let x = 0; x < canvas.width; x++) {
            const y = centerY + amplitude * Math.sin((x / currentWavelength) * 10 + time + timeOffset);
            
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        
        // Wavelength indicator
        const indicatorX = canvas.width / 2;
        const startY = centerY + amplitude * Math.sin((indicatorX / currentWavelength) * 10 + time + timeOffset);
        const endY = centerY + amplitude * Math.sin(((indicatorX + currentWavelength) / currentWavelength) * 10 + time + timeOffset);
        
        ctx.beginPath();
        ctx.strokeStyle = '#8f8fdc';
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 3]);
        ctx.moveTo(indicatorX, startY);
        ctx.lineTo(indicatorX + currentWavelength, startY);
        ctx.stroke();
        
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = '#f0f0f0';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#000';
        ctx.fillText('λ', indicatorX + currentWavelength / 2 - 8, startY - 15);
        
        ctx.setLineDash([]);
        ctx.shadowBlur = 0;
        
        if (isPlaying) {
            animationFrameId = requestAnimationFrame(drawWave);
        }
    }
    
    // Event listener slider
    wavelengthInput.addEventListener('input', function() {
        currentWavelength = parseInt(this.value);
        const freq = 3e8 / (currentWavelength * 1e-9) / 1e12;  // c = λf ⇒ f = c/λ
        currentFrequency = Math.round(freq);
        frequencyInput.value = currentFrequency;
        
        wavelengthValue.textContent = `${currentWavelength} nm`;
        frequencyValue.textContent = `${currentFrequency} THz`;
    });
    
    frequencyInput.addEventListener('input', function() {
        currentFrequency = parseInt(this.value);
        const waveLen = 3e8 / (currentFrequency * 1e12) * 1e9;   // λ = c/f
        currentWavelength = Math.round(waveLen);
        wavelengthInput.value = currentWavelength;
        
        wavelengthValue.textContent = `${currentWavelength} nm`;
        frequencyValue.textContent = `${currentFrequency} THz`;
    });
    
    waveSpeedInput.addEventListener('input', function() {
        waveSpeed = parseInt(this.value);
        waveSpeedValue.textContent = speedLabels[waveSpeed - 1];
    });
    
    // Wave control buttons
    playWaveBtn.addEventListener('click', function() {
        isPlaying = true;
        playWaveBtn.classList.add('active');
        pauseWaveBtn.classList.remove('active');
        timeOffset = Date.now() * 0.001 * waveSpeed;
        drawWave();
    });
    
    pauseWaveBtn.addEventListener('click', function() {
        isPlaying = false;
        playWaveBtn.classList.remove('active');
        pauseWaveBtn.classList.add('active');
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });
    
    // Mulai animasi
    drawWave();
}

// Spectrum slider functionality
function initSpectrumSlider() {
    const slider = document.getElementById('spectrumSlider');
    const spectrumName = document.getElementById('spectrum-name');
    const spectrumRange = document.getElementById('spectrum-range');
    const spectrumDesc = document.getElementById('spectrum-desc');
    
    if (!slider || !spectrumName || !spectrumRange || !spectrumDesc) return;
    
    const spectrumData = [
        { 
            name: "Radio", 
            range: "≥1 m", 
            desc: "Digunakan untuk siaran radio, komunikasi satelit, dan radio astronomi. Teleskop radio seperti VLA (Very Large Array) memetakan galaksi jauh." 
        },
        { 
            name: "Microwave", 
            range: "1 mm – 1 m", 
            desc: "Digunakan di oven microwave, radar, dan komunikasi nirkabel. Astronomi microwave membantu mempelajari latar kosmik gelombang mikro (CMB)." 
        },
        { 
            name: "Infrared", 
            range: "700 nm – 1 mm", 
            desc: "Digunakan di termografi, remote kontrol, kamera thermal, dan teleskop inframerah. Teleskop IR seperti Spitzer melihat debu kosmik dan wilayah pembentukan bintang." 
        },
        { 
            name: "Visible", 
            range: "380 – 750 nm", 
            desc: "Panjang gelombang yang dapat dilihat mata manusia sebagai warna. Digunakan pada kamera optik, mikroskop, dan teleskop optik seperti Hubble." 
        },
        { 
            name: "Ultraviolet", 
            range: "10 – 380 nm", 
            desc: "Digunakan untuk sterilisasi, produksi vitamin D, dan pengamatan meteorosfer. Astronomi UV mempelajari atmosfer bintang dan bintang muda." 
        },
        { 
            name: "X-Ray", 
            range: "0.01 – 10 nm", 
            desc: "Digunakan untuk radiografi medis (CT scan) dan pengamatan sinar X astronomi. Teleskop sinar X seperti Chandra memetakan lubang hitam." 
        },
        { 
            name: "Gamma", 
            range: "<0.01 nm", 
            desc: "Sinar gamma sangat berenergi, muncul dari fenomena ekstrem seperti ledakan supernova dan inti galaksi aktif. Observatorium gamma seperti Fermi mempelajari mekanisme ini." 
        }
    ];
    
    slider.addEventListener('input', () => {
        const index = parseInt(slider.value);
        const data = spectrumData[index];
        spectrumName.textContent = data.name;
        spectrumRange.textContent = `Rentang: ${data.range}`;
        spectrumDesc.textContent = data.desc;
    });
    
    slider.dispatchEvent(new Event('input'));
}

// Redshift demo
function initRedshiftDemo() {
    const slider = document.getElementById('redshiftSlider');
    const redshiftValue = document.getElementById('redshift-value');
    const velocityValue = document.getElementById('velocity-value');
    const shiftedLine = document.querySelector('.shifted-spectrum .line');
    
    if (!slider || !redshiftValue || !velocityValue || !shiftedLine) return;
    
    slider.addEventListener('input', function() {
        const z = parseFloat(this.value);
        redshiftValue.textContent = z.toFixed(2);
        
        const c = 3e5; // km/s
        const v = z * c;
        velocityValue.textContent = `${Math.round(v).toLocaleString()} km/s`;
        
        let shiftPercentage = z * 100;
        // Batasi pergeseran agar tidak keluar kotak
        if (shiftPercentage > 50) shiftPercentage = 50;
        if (shiftPercentage < -50) shiftPercentage = -50;
        shiftedLine.style.left = `${50 + shiftPercentage}%`;
    });
    
    slider.dispatchEvent(new Event('input'));
}

// Spectroscopy demo
function initSpectroscopyDemo() {
    const lines = document.querySelectorAll('.spectroscopy-demo .line');
    const elementInfo = document.getElementById('elementInfo');
    
    if (!lines.length || !elementInfo) return;
    
    const elements = {
        "H": { name: "Hidrogen", wavelength: "656 nm", desc: "Garis H-alpha, indikator hidrogen di bintang" },
        "He": { name: "Helium", wavelength: "587 nm", desc: "Garis helium, terlihat di bintang panas" },
        "O": { name: "Oksigen", wavelength: "500 nm", desc: "Garis O-III, terlihat di nebula" },
        "Fe": { name: "Besi", wavelength: "430 nm", desc: "Garis besi, indikator logam di atmosfer bintang" }
    };
    
    lines.forEach(line => {
        line.addEventListener('click', function() {
            const element = this.dataset.element;
            const info = elements[element];
            
            // Langsung tampilkan tanpa animasi
            elementInfo.innerHTML = `
                <h4>${info.name} (${element})</h4>
                <p><strong>Panjang Gelombang:</strong> ${info.wavelength}</p>
                <p>${info.desc}</p>
            `;
        });
    });
}

// Smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Inisialisasi semua
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    createParticles();
    initHamburgerMenu();
    initScrollSpy();
    initScrollAnimations();
    initWaveAnimation();
    initSpectrumSlider();
    initRedshiftDemo();
    initSpectroscopyDemo();
    initSmoothScrolling();
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', function(e) {
            // 1. Mencegah link melompat secara langsung
            e.preventDefault();

            // 2. Mengambil tujuan dari atribut href
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            // 3. Lakukan scroll dengan animasi halus (smooth)
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60, // -60 untuk memberi jarak dari header
                    behavior: 'smooth'
                });
            }
        });
    }
    // ==========================================================
});
