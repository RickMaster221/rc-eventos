let index = 0;
const slides = document.querySelectorAll(".carousel-slide");

function pauseAllVideos() {
  const videos = document.querySelectorAll("video");
  videos.forEach(video => video.pause());
}

function showSlide(i) {
  pauseAllVideos();
  slides.forEach(slide => slide.classList.remove("active"));
  slides[i].classList.add("active");

  // Dá play no vídeo se existir no slide atual
  const video = slides[i].querySelector("video");
  if (video) {
    video.play().catch(err => {
      // Alguns navegadores ainda podem bloquear se não estiver muted
      console.warn("Autoplay bloqueado:", err);
    });
  }
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}
const carousels = {};

document.querySelectorAll('.carousel').forEach(carousel => {
  const id = carousel.id;
  const slides = carousel.querySelectorAll('.carousel-slide');
  carousels[id] = {
    index: 0,
    slides: slides
  };
});

function changeSlide(carouselId, direction) {
  const carousel = carousels[carouselId];
  const slides = carousel.slides;

  // Pausa vídeos antes de trocar slide
  slides[carousel.index].querySelectorAll('video').forEach(v => v.pause());

  slides[carousel.index].classList.remove('active');
  carousel.index = (carousel.index + direction + slides.length) % slides.length;
  slides[carousel.index].classList.add('active');

  // Dá play no vídeo, se houver
  const video = slides[carousel.index].querySelector('video');
  if (video) video.play().catch(() => {});
}
// Garante que apenas um vídeo toque por vez
document.querySelectorAll('video').forEach(video => {
  video.addEventListener('play', () => {
    document.querySelectorAll('video').forEach(otherVideo => {
      if (otherVideo !== video) {
        otherVideo.pause();
      }
    });
  });
});

let bannerIndex = 0;
const bannerSlides = document.querySelectorAll(".banner-entrada-carousel .slide");

function showNextBanner() {
  bannerSlides[bannerIndex].classList.remove("active");
  bannerIndex = (bannerIndex + 1) % bannerSlides.length;
  bannerSlides[bannerIndex].classList.add("active");
}

setInterval(showNextBanner, 4000);
// 
let currentBanner = 0;
const track = document.querySelector(".carousel-track");
const totalSlides = track.children.length;

function slideBanner() {
  currentBanner = (currentBanner + 1) % totalSlides;
  const offset = -currentBanner * 100;
  track.style.transform = `translateX(${offset}%)`;
}

setInterval(slideBanner, 4000); // Troca a cada 4s
