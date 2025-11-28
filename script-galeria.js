const images = [
    'assets/galeria/imagen1.png',
    'assets/galeria/imagen2.png',
    'assets/galeria/imagen3.png',
    'assets/galeria/imagen4.png',
    'assets/galeria/imagen5.png',
    'assets/galeria/imagen6.png',
    'assets/galeria/imagen7.png'
];

let currentIndex = 0;

const currentImage = document.getElementById('current-image');
const currentNumber = document.getElementById('current-number');
const totalNumber = document.getElementById('total-number');
const thumbnailsContainer = document.querySelector('.thumbnails-container');

function initGallery() {
    totalNumber.textContent = images.length;
    updateImage();
    createThumbnails();
    document.addEventListener('keydown', handleKeyPress);
}

function updateImage() {
    currentImage.style.opacity = '0';
    setTimeout(() => {
        currentImage.src = images[currentIndex];
        currentNumber.textContent = currentIndex + 1;
        currentImage.style.opacity = '1';
        updateThumbnails();
    }, 200);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
}

function previousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
}

function createThumbnails() {
    thumbnailsContainer.innerHTML = '';
    images.forEach((src, i) => {
        const thumb = document.createElement('img');
        thumb.src = src;
        thumb.className = 'thumbnail';
        if (i === 0) thumb.classList.add('active');
        thumb.addEventListener('click', () => {
            currentIndex = i;
            updateImage();
        });
        thumbnailsContainer.appendChild(thumb);
    });
}

function updateThumbnails() {
    document.querySelectorAll('.thumbnail').forEach((t, i) => {
        t.classList.toggle('active', i === currentIndex);
    });
}

// FULLSCREEN REAL
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.() ||
        document.documentElement.webkitRequestFullscreen?.() ||
        document.documentElement.msRequestFullscreen?.();
    } else {
        document.exitFullscreen?.() ||
        document.webkitExitFullscreen?.() ||
        document.msExitFullscreen?.();
    }
}

document.addEventListener('fullscreenchange', () => {
    document.body.classList.toggle('true-fullscreen', !!document.fullscreenElement);
});

// TECLAS + CLIC EN IMAGEN
function handleKeyPress(e) {
    if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
        e.preventDefault();
    }
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') previousImage();
}

currentImage.addEventListener('click', toggleFullscreen);

function goToIndex() {
    window.location.href = 'index.html';
}

// ===== CARGA DE PÁGINA (EL VIDEO AHORA SÍ SALE SÍ O SÍ) =====
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');

    // Forzamos que el video se reproduzca aunque tarde en cargar
    const video = document.getElementById('loading-video');
    video.play().catch(() => console.log("Video autoplay bloqueado, pero igual se ve"));

    // Duración mínima de 5 segundos + tiempo extra si el video es más largo
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.style.display = 'block';
            setTimeout(() => {
                mainContent.style.opacity = '1';
                initGallery();
            }, 100);
        }, 1000);
    }, 5500); // 5.5 segundos para que dé tiempo al video
});