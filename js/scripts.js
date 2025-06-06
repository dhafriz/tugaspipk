// Star background animation
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starsCount = 200;
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        
        // Random size
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random animation duration
        const duration = 2 + Math.random() * 8;
        star.style.setProperty('--duration', `${duration}s`);
        
        starsContainer.appendChild(star);
    }
}

// Floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particlesCount = 30;
    
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        
        // Random size
        const size = 1 + Math.random() * 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random animation duration
        const duration = 10 + Math.random() * 20;
        particle.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(particle);
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

// Section animation on scroll
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('section').forEach(section => {
        if (section.id !== 'hero') {
            observer.observe(section);
        }
    });
}

// Wave animation (Bagian 1)
function initWaveAnimation() {
    const canvas = document.getElementById('waveCanvas');
    const ctx = canvas.getContext('2d');
    const wavelengthInput = document.getElementById('wavelength');
    const frequencyInput = document.getElementById('frequency');
    const wavelengthValue = document.getElementById('wavelength-value');
    const frequencyValue = document.getElementById('frequency-value');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Draw wave function
    function drawWave(wavelength, frequency) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const amplitude = canvas.height / 4;
        const centerY = canvas.height / 2;
        const speed = 0.02;
        const time = Date.now() * speed;
        
        ctx.beginPath();
        ctx.strokeStyle = '#55c4c1';
        ctx.lineWidth = 3;
        
        for (let x = 0; x < canvas.width; x++) {
            const y = centerY + amplitude * Math.sin((x / wavelength) * 10 + time);
            
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        
        // Draw wavelength indicator
        const indicatorX = canvas.width / 2;
        const startY = centerY + amplitude * Math.sin((indicatorX / wavelength) * 10 + time);
        const endY = centerY + amplitude * Math.sin(((indicatorX + wavelength) / wavelength) * 10 + time);
        
        ctx.beginPath();
        ctx.strokeStyle = '#8f8fdc';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 3]);
        ctx.moveTo(indicatorX, startY);
        ctx.lineTo(indicatorX + wavelength, startY);
        ctx.stroke();
        
        // Draw lambda symbol
        ctx.font = '20px Arial';
        ctx.fillStyle = '#f0f0f0';
        ctx.fillText('λ', indicatorX + wavelength / 2 - 5, startY - 10);
        
        ctx.setLineDash([]);
    }
    
    // Update inputs
    wavelengthInput.addEventListener('input', function() {
        const wavelength = parseInt(this.value);
        const frequency = 3e8 / (wavelength * 1e-9) / 1e12; // c = λf -> f = c/λ
        frequencyInput.value = Math.round(frequency);
        
        wavelengthValue.textContent = `${wavelength} nm`;
        frequencyValue.textContent = `${Math.round(frequency)} THz`;
        
        drawWave(wavelength, frequency);
    });
    
    frequencyInput.addEventListener('input', function() {
        const frequency = parseInt(this.value);
        const wavelength = 3e8 / (frequency * 1e12) * 1e9; // λ = c/f
        
        wavelengthInput.value = Math.round(wavelength);
        
        wavelengthValue.textContent = `${Math.round(wavelength)} nm`;
        frequencyValue.textContent = `${frequency} THz`;
        
        drawWave(wavelength, frequency);
    });
    
    // Initial draw
    drawWave(550, 545);
}

// Spectrum slider functionality (Bagian 2)
function initSpectrumSlider() {
    const slider = document.getElementById('spectrumSlider');
    const spectrumName = document.getElementById('spectrum-name');
    const spectrumRange = document.getElementById('spectrum-range');
    const spectrumDesc = document.getElementById('spectrum-desc');
    
    const spectrumData = [
        { 
            name: "Radio", 
            range: "≥ 1 m", 
            desc: "Digunakan untuk siaran radio, komunikasi satelit, dan radio astronomi. Teleskop radio seperti VLA (Very Large Array) memetakan galaksi jauh." 
        },
        { 
            name: "Microwave", 
            range: "1 mm – 1 m", 
            desc: "Digunakan di oven microwave, radar, dan komunikasi nirkabel. Astronomi microwave membantu mempelajari latar kosmik gelombang mikro (CMB)." 
        },
        { 
            name: "Infrared", 
            range: "700 nm – 1 mm", 
            desc: "Digunakan di termografi, remote kontrol, kamera thermal, dan teleskop inframerah. Teleskop IR seperti Spitzer melihat debu kosmik dan wilayah pembentukan bintang." 
        },
        { 
            name: "Visible", 
            range: "380 – 750 nm", 
            desc: "Panjang gelombang yang dapat dilihat mata manusia sebagai warna. Digunakan pada kamera optik, mikroskop, dan teleskop optik seperti Hubble." 
        },
        { 
            name: "Ultraviolet", 
            range: "10 – 380 nm", 
            desc: "Digunakan untuk sterilisasi, produksi vitamin D, dan pengamatan meteorosfer. Astronomi UV mempelajari atmosfer bintang dan bintang muda." 
        },
        { 
            name: "X-Ray", 
            range: "0.01 – 10 nm", 
            desc: "Digunakan untuk radiografi medis (CT scan) dan pengamatan sinar X astronomi. Teleskop sinar X seperti Chandra memetakan lubang hitam." 
        },
        { 
            name: "Gamma", 
            range: "< 0.01 nm", 
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
    
    // Initialize
    slider.dispatchEvent(new Event('input'));
}

// Spectroscopy demo (Bagian 3)
function initSpectroscopyDemo() {
    const lines = document.querySelectorAll('.spectroscopy-demo .line');
    const elementInfo = document.querySelector('.element-info');
    
    const elements = {
        "H": { name: "Hidrogen", wavelength: "656 nm", desc: "Garis H-alpha, indikator hidrogen di bintang" },
        "He":{ name: "Helium",   wavelength: "587 nm", desc: "Garis helium, terlihat di bintang panas" },
        "O": { name: "Oksigen",  wavelength: "500 nm", desc: "Garis O-III, terlihat di nebula" },
        "Fe":{ name: "Besi",     wavelength: "430 nm", desc: "Garis besi, indikator logam di atmosfer bintang" }
    };
    
    lines.forEach(line => {
        line.addEventListener('click', function() {
            const element = this.dataset.element;
            const info = elements[element];
            
            elementInfo.innerHTML = `
                <h4>${info.name} (${element})</h4>
                <p><strong>Panjang Gelombang:</strong> ${info.wavelength}</p>
                <p>${info.desc}</p>
            `;
        });
    });
}

// Redshift demo (Bagian 3)
function initRedshiftDemo() {
    const slider = document.getElementById('redshiftSlider');
    const redshiftValue = document.getElementById('redshift-value');
    const velocityValue = document.getElementById('velocity-value');
    const shiftedLine = document.querySelector('.shifted-spectrum .line');
    
    slider.addEventListener('input', function() {
        const z = parseFloat(this.value);
        redshiftValue.textContent = z.toFixed(2);
        
        // Calculate velocity (v = z * c for small z)
        const c = 3e5; // km/s
        const v = z * c;
        velocityValue.textContent = `${Math.round(v).toLocaleString()} km/s`;
        
        // Move the line based on redshift
        const shiftPercentage = z * 100;
        shiftedLine.style.left = `${50 + shiftPercentage}%`;
    });
}

// Music player functionality
function initMusicPlayer() {
    // Pastikan path benar dan dijalankan di server lokal (http/https)
    const audio = new Audio('assets/audio/audio-moonlight-sonata.mp3');
    const toggleBtn = document.getElementById('musicToggle');
    const startBtn = document.getElementById('startBtn');
    let isPlaying = false;
    
    // Ketika tombol speaker diklik—toggle mute/unmute
    toggleBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            toggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            audio.play().catch(e => console.log("Autoplay prevented:", e));
            toggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        isPlaying = !isPlaying;
    });
    
    // Tombol "Mulai Eksplorasi" juga memicu putar musik dan scroll
    if (startBtn) {
        startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Putar musik
            audio.play().catch(e => console.log("Autoplay prevented:", e));
            isPlaying = true;
            toggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            // Scroll ke elemen berikutnya
            const targetId = startBtn.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Smooth scrolling (link internal)
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
    initScrollSpy();
    initScrollAnimations();
    initWaveAnimation();
    initSpectrumSlider();
    initSpectroscopyDemo();
    initRedshiftDemo();
    initMusicPlayer();
    initSmoothScrolling();
});
