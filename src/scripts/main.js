'use strict';

const menu = document.querySelector('.menu');
const burger = document.querySelector('.burger');
const card = document.querySelector('.card');
const btnBack = document.querySelector('.card__button--back');
const btnForward = document.querySelector('.card__button--forward');

const slides = [
  'src/images/slider/slide-img-1.jpg',
  'src/images/slider/slide-img-2.jpg',
  'src/images/slider/slide-img-3.jpg',
  'src/images/slider/slide-img-4.jpg',
];

let currentIndex = 0;

const updateSlide = (index) => {
  if (card) {
    card.style.backgroundImage = `url('${slides[index]}')`;
  }
};

if (btnForward && btnBack) {
  btnForward.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide(currentIndex);
  });

  btnBack.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlide(currentIndex);
  });
}

burger.addEventListener('click', (e) => {
  e.preventDefault();
  menu.classList.toggle('active');
  e.stopPropagation();
});

document.addEventListener('click', (e) => {
  const target = e.target;
  const link = target.closest('a[href^="#"]');

  if (link) {
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      e.preventDefault();

      window.history.replaceState(null, null, targetId);
      targetElement.scrollIntoView({ behavior: 'smooth' });

      menu.classList.remove('active');
      return;
    }
  }

  const isInsideMenu = menu.contains(target);
  const isBurger = burger.contains(target);

  if (menu.classList.contains('active') && !isInsideMenu && !isBurger) {
    menu.classList.remove('active');
  }
});
