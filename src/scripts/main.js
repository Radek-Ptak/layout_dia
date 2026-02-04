'use strict';

const menu = document.querySelector('.menu');
const burger = document.querySelector('.burger');
const card = document.querySelector('.card');
const contactForm = document.querySelector('.form');

// Ustawiamy tylko jedną, konkretną ścieżkę
const staticImage = './src/images/slider/slide-img-1.jpg';

if (card) {
  card.style.backgroundImage = `url('${staticImage}')`;
  card.style.backgroundSize = 'cover';
  card.style.backgroundPosition = 'center';
  card.style.backgroundRepeat = 'no-repeat';
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
      targetElement.scrollIntoView({
        behavior: 'smooth',
      });

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

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
