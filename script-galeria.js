// script-galeria.js actualizado para 14 imágenes
const images = [
    'assets/galeria/imagen1.png',
    'assets/galeria/imagen2.png',
    'assets/galeria/imagen3.png',
    'assets/galeria/imagen4.png',
    'assets/galeria/imagen5.png',
    'assets/galeria/imagen6.png',
    'assets/galeria/imagen7.png',
    'assets/galeria/imagen8.png',
    'assets/galeria/imagen9.png',
    'assets/galeria/imagen10.png',
    'assets/galeria/imagen11.png',
    'assets/galeria/imagen12.png',
    'assets/galeria/imagen13.png',
    'assets/galeria/imagen14.png'
];

let currentIndex = 0;

// AL INICIAR, VER SI VENIMOS DE RESOLUCIONES
function initGallery() {
    const savedIndex = localStorage.getItem('galeriaStartIndex');
    if (savedIndex !== null) {
        currentIndex = parseInt(savedIndex);
        localStorage.removeItem('galeriaStartIndex');
    }
    
    totalNumber.textContent = images.length;
    updateImage();
    createThumbnails();
    document.addEventListener('keydown', handleKeyPress);
}

// ... (el resto del código igual, pero ahora maneja 14 imágenes)