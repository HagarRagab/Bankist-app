'use strict';

////////////////////////////////////////////////
// HTML elements
////////////////////////////////////////////////

const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');
const header = document.querySelector('.header');
const section1 = document.querySelector('#section--1');
const allSections = document.querySelectorAll('.section');
const featureImgs = document.querySelectorAll('.features__img');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const btnToTop = document.querySelector('.to-top');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnSlideLeft = document.querySelector('.slider__btn--left');
const btnSlideRight = document.querySelector('.slider__btn--right');

const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const slides = document.querySelectorAll('.slide');
const dotscontainer = document.querySelector('.dots');

////////////////////////////////////////////////
// Modal window
////////////////////////////////////////////////

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////
// Cookie message
////////////////////////////////////////////////

setTimeout(() => {
  const cookieMsg = document.createElement('div');
  document.body.append(cookieMsg);
  cookieMsg.className = 'cookie-message';
  cookieMsg.innerHTML =
    'We are using cookies to improve functionality and analytics <button class="btn">Got it</button>';
  cookieMsg.style.height = `${
    parseFloat(getComputedStyle(cookieMsg).height) + 30
  }px`;

  const cookieBtn = document.querySelector('.cookie-message .btn');
  cookieBtn.addEventListener('click', () => {
    cookieMsg.remove();
  });
}, 2000);

////////////////////////////////////////////////
// nav bar mobile view
////////////////////////////////////////////////

const navIcon = document.querySelector('.nav__icon');
navIcon.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

////////////////////////////////////////////////
// Nav links fade animation
////////////////////////////////////////////////
const hoverAnimation = function (e) {
  const hoveredLink = e.target;
  if (hoveredLink.classList.contains('nav__link')) {
    const anchors = navLinks.querySelectorAll('.nav__link');
    anchors.forEach(a => {
      if (a !== hoveredLink) a.style.opacity = this;
    });
  }
};

navLinks.addEventListener('mouseover', hoverAnimation.bind(0.5));
navLinks.addEventListener('mouseout', hoverAnimation.bind(1));

////////////////////////////////////////////////
// Scroll
////////////////////////////////////////////////

btnScrollTo.addEventListener('click', () => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

navLinks.addEventListener('click', e => {
  e.preventDefault();

  if (
    e.target.classList.contains('nav__link') &&
    !e.target.classList.contains('nav__link--btn')
  ) {
    const secId = e.target.getAttribute('href');
    const section = document.querySelector(secId);
    section.scrollIntoView({ behavior: 'smooth' });
  }
});

////////////////////////////////////////////////
// Revealing sections on scroll
////////////////////////////////////////////////

const revealSec = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};

const revealObserver = new IntersectionObserver(revealSec, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(sec => {
  sec.classList.add('section--hidden');
  revealObserver.observe(sec);
});

////////////////////////////////////////////////
// Intersection observer API
////////////////////////////////////////////////

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: -nav.getBoundingClientRect().height + 'px',
};

////////////////////////////////////////////////
// Go to top
////////////////////////////////////////////////

btnToTop.addEventListener('click', () => {
  header.scrollIntoView({ behavior: 'smooth' });
});

const toTopCallback = entries => {
  const [entry] = entries;
  if (entry.isIntersecting) btnToTop.classList.add('hidden');
  else {
    btnToTop.classList.remove('hidden');
  }
};

new IntersectionObserver(toTopCallback, obsOptions).observe(header);

////////////////////////////////////////////////
// Sticy NAV
////////////////////////////////////////////////

const navObserver = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

new IntersectionObserver(navObserver, obsOptions).observe(header);

////////////////////////////////////////////////
// Lazy loading images
////////////////////////////////////////////////

const lazyImg = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.setAttribute('src', entry.target.dataset.src);
    entry.target.addEventListener('load', () => {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  });
};

const lazyImgObserver = new IntersectionObserver(lazyImg, {
  root: null,
  threshold: [0, 1],
  rootMargin: '200px',
});

featureImgs.forEach(img => {
  lazyImgObserver.observe(img);
});

////////////////////////////////////////////////
// Tabbed component
////////////////////////////////////////////////

tabsContainer.addEventListener('click', e => {
  const clickedTab = e.target.closest('.operations__tab');
  // Guard clause
  if (!clickedTab) return;

  // Remove active class
  tabs.forEach(tab => {
    tab.classList.remove('operations__tab--active');
  });
  tabsContent.forEach(content => {
    content.classList.remove('operations__content--active');
  });

  // Add tab active class
  clickedTab.classList.add('operations__tab--active');

  // Add content active class
  document
    .querySelector(`.operations__content--${clickedTab.dataset.tab}`)
    .classList.add('operations__content--active');
});

////////////////////////////////////////////////
// Slider
////////////////////////////////////////////////
let curSlideNum = 0;
const maxSlideNum = slides.length;

for (let i = 0; i < maxSlideNum; i++) {
  dotscontainer.insertAdjacentHTML(
    'beforeend',
    `
    <div class="dots__dot ${
      i === 0 && 'dots__dot--active'
    }" data-slide="${i}"></div>
  `,
  );
}

const dots = document.querySelectorAll('.dots__dot');

const goToSlide = function (curSlideNum) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - curSlideNum)}%)`;
    dots[i].classList.remove('dots__dot--active');
  });

  document
    .querySelector(`.dots__dot[data-slide="${curSlideNum}"]`)
    .classList.add('dots__dot--active');
};

goToSlide(curSlideNum);

const nextSlide = function () {
  curSlideNum === maxSlideNum - 1 ? (curSlideNum = 0) : curSlideNum++;
  goToSlide(curSlideNum);
};

const previousSlide = function () {
  curSlideNum === 0 ? (curSlideNum = maxSlideNum - 1) : curSlideNum--;
  goToSlide(curSlideNum);
};

btnSlideRight.addEventListener('click', nextSlide);
btnSlideLeft.addEventListener('click', previousSlide);

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') previousSlide();
});

dotscontainer.addEventListener('click', e => {
  curSlideNum = +e.target.dataset.slide;

  // Guard clause
  if (!e.target.classList.contains('dots__dot')) return;

  goToSlide(curSlideNum);
});
