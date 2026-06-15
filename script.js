const heroSection = document.querySelector('.hero-section');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;

function updateHeroBackground(slideIndex) {
  const bgImage = slides[slideIndex].getAttribute('data-bg');
  if (bgImage) {
    heroSection.style.backgroundImage = `url('${bgImage}')`;
  }
}

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  slides[index].classList.add('active');
  dots[index].classList.add('active');
  updateHeroBackground(index);
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function startSlideShow() {
  slideInterval = setInterval(nextSlide, 4000);
}

function stopSlideShow() {
  clearInterval(slideInterval);
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

heroSection.addEventListener('mouseenter', stopSlideShow);
heroSection.addEventListener('mouseleave', startSlideShow);

updateHeroBackground(currentSlide);
startSlideShow();

const slider = document.querySelector('.campaign-slider-container');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
});

slider.addEventListener('mouseup', () => {
  isDown = false;
});

slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});