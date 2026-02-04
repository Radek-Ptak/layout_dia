'use strict';

import slide1 from '../images/slider/slide-img-1.jpg';
import slide2 from '../images/slider/slide-img-2.jpg';
import slide3 from '../images/slider/slide-img-3.jpg';
import slide4 from '../images/slider/slide-img-4.jpg';

const menu = document.querySelector('.menu');
const burger = document.querySelector('.burger');
const card = document.querySelector('.card');
const btnBack = document.querySelector('.card__button--back');
const btnForward = document.querySelector('.card__button--forward');
const contactForm = document.querySelector('.form');

const slides = [slide1, slide2, slide3, slide4];

let currentIndex = 0;

const updateSlide = (index) => {
  if (card) {
    card.style.backgroundImage = `url('${slides[index]}')`;
    card.style.backgroundSize = 'cover';
    card.style.backgroundPosition = 'center';
    card.style.backgroundRepeat = 'no-repeat';
  }
};

updateSlide(currentIndex);

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

if (burger && menu) {
  burger.addEventListener('click', (e) => {
    e.preventDefault();
    menu.classList.toggle('active');
    e.stopPropagation();
  });
}

document.addEventListener('click', (e) => {
  const target = e.target;
  const link = target.closest('a[href^="#"]');

  if (link) {
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });

      if (menu) {
        menu.classList.remove('active');
      }
      return;
    }
  }

  if (menu && menu.classList.contains('active')) {
    const isInsideMenu = menu.contains(target);
    const isBurger = burger && burger.contains(target);

    if (!isInsideMenu && !isBurger) {
      menu.classList.remove('active');
    }
  }
});

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('name');
    const name = nameInput ? nameInput.value : 'Guest';

    alert(`Thank you, ${name}! Your message has been sent.`);
    contactForm.reset();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
