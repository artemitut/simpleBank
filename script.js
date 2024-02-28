'use strict';

///////////////////////////////////////
// Modal window

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

// Modal Window
const openModalWindow = function () {
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModalWindow.length; i++)
  btnsOpenModalWindow[i].addEventListener('click', openModalWindow);

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});

// Pages Scroll
btnScrollTo.addEventListener('click', function (e) {
  const section1Coords = section1.getBoundingClientRect();
  // console.log(section1Coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log('This scroll: x, y', window.pageXOffset, window.pageYOffset);
  // console.log(
  //   'WIdth and Height viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  // window.scrollTo(
  //   section1Coords.left + window.pageXOffset,
  //   section1Coords.y + window.pageYOffset
  // );
  // window.scrollTo({
  //   left: section1Coords.left + window.pageXOffset,
  //   top: section1Coords.y + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////
// Smooth Page Navigation

// document.querySelectorAll('.nav__link').forEach(function (htmlElement, i) {
//   htmlElement.addEventListener('click', function (e) {
//     e.preventDefault();
//     const href = this.getAttribute('href');
//     console.log(href);
//     document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
//   });
// });
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const href = e.target.getAttribute('href');
    // console.log(href);
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
  }
});

// Вкладки

tabContainer.addEventListener('click', function (e) {
  const clickedButton = e.target.closest('.operations__tab');
  // Guard clause
  if (!clickedButton) return;
  // Active tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clickedButton.classList.add('operations__tab--active');

  // Activ content
  tabContents.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clickedButton.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Анимация тускнения на navbar

const navLinksHoverAnimations = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const linkOver = e.target;
    const siblingLinks = linkOver
      .closest('.nav__links')
      .querySelectorAll('.nav__link');
    const logo = linkOver.closest('nav').querySelector('img');
    const logoText = linkOver.closest('.nav').querySelector('.nav__text');
    siblingLinks.forEach(el => {
      if (el !== linkOver) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
    logoText.style.opacity = this;
  }
};

// Работа с аргументами при помощи bind() и ключевого слова this
nav.addEventListener('mouseover', navLinksHoverAnimations.bind(0.5));
nav.addEventListener('mouseout', navLinksHoverAnimations.bind(1));

// Stichy navigation

const section1Coords = section1.getBoundingClientRect();
// console.log(section1Coords);

// window.addEventListener('scroll', function (e) {
//   // console.log(window.scrollY);
//   if (window.scrollY > section1Coords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// Sticky navigation - Intersection Observer API

// const observerCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//     if (entry.isIntersecting) {
//       nav.classList.add('sticky');
//     } else {
//       // nav.classList.remove('sticky');
//     }
//   });
// };
// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1);

const header = document.querySelector('.header');

const navHeight = nav.getBoundingClientRect().height;

const getStickyNav = function (entries) {
  const entry = entries[0];

  // console.log(entry);
  if (!entry.isIntersecting) {
    nav.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      nav.style.transition = '.3s';
      nav.style.transform = 'translateY(0px)';
      nav.classList.add('sticky');
    }, 150);
  } else {
    nav.classList.remove('sticky');
  }
};
// const navOutView = function (entries) {
//   const entry = entries[0];
//   if (!entry.isIntersecting) {
//     nav.style.transform = 'translateY(-10px)';
//     nav.style.opacity = 0;
//   }
//   if (entry.isIntersecting) {
//     nav.style.transform = 'translateY(0px)';
//     nav.style.opacity = 1;
//   }
// };

// const navObserver = new IntersectionObserver(navObserver, {
//   root: null,
//   theshoold: 0,
// });
// navObserver.observe(nav);

const headerObserver = new IntersectionObserver(getStickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Section scroll animation (opacity = 1)

const allSections = document.querySelectorAll('.section');
// console.log(allSections);

const appearanceSection = function (entries, observer) {
  const entry = entries[0];
  // console.log(entry);
  // console.log(entry.target.classList);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(appearanceSection, {
  root: null,
  threshoold: 0.3,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading gor img

const lazyImages = document.querySelectorAll('img[data-src]');
// console.log(lazyImages);

const loadImages = function (entries, observer) {
  const entry = entries[0];
  // console.log(entry);
  if (!entry.isIntersecting) return;

  // Change img to hight resolution

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const lazyImagesObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshoold: 0.7,
});

lazyImages.forEach(img => lazyImagesObserver.observe(img));

// Create Slider

let currentSlide = 0;

const slides = document.querySelectorAll('.slide');

const slider = document.querySelector('.slider');
const sliderButtonLeft = document.querySelector('.slider__btn--left');
const sliderButtonRigth = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');

const slidesNumber = slides.length;

const createDots = function () {
  slides.forEach(function (_, index) {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide = ${index}></button>`
    );
  });
};

createDots();

const activateCurrentDots = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide = "${slide}"]`)
    .classList.add('dots__dot--active');
};

const moveToSlide = function (slide) {
  slides.forEach(
    (s, index) =>
      (s.style.transform = `translateX(${100 * (index - slide)}%  )`)
  );
};

moveToSlide(0);
activateCurrentDots(0);

const nextSlide = function () {
  if (currentSlide === slidesNumber - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  moveToSlide(currentSlide);
  activateCurrentDots(currentSlide);
};
const previousSlide = function () {
  if (currentSlide === 0) {
    currentSlide = slidesNumber - 1;
  } else {
    currentSlide--;
  }
  moveToSlide(currentSlide);
  activateCurrentDots(currentSlide);
};

sliderButtonRigth.addEventListener('click', nextSlide);
sliderButtonLeft.addEventListener('click', previousSlide);
document.addEventListener('keydown', function (e) {
  console.log(e);
  if (e.key === 'ArrowLeft') {
    previousSlide();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
  }
});

dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    console.log(1);
    const slide = e.target.dataset.slide;
    console.log(slide);
    moveToSlide(slide);
    activateCurrentDots(slide);
  }
});

///////////////////////
///////////////////////////////////////////////
////////////////////////////////////////////

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// console.log(document.querySelector('.header'));

// const sections = document.querySelectorAll('.section');
// console.log(sections);

// console.log(document.getElementById('section--1'));

// const buttons = document.getElementsByTagName('button');
// console.log(buttons);

// console.log(document.getElementsByClassName('btn'));

// // Сreating and inserting elements
// // .insertAdjacentHTML()

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'We use cookie in this site to improvefunctionality';
// message.innerHTML =
//   'We use cookie in this site to improve functionality. <button class="btn btn--close-cookie"> Ok! </button> ';
// const header = document.querySelector('.header');
// // header.prepend(message);
// header.append(message);
// // header.append(message.cloneNode(true));
// // header.before(message);
// // header.after(message);

// // Delete element

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//     message.parentElement.removeChild(message);
//   });

// // Style

// message.style.backgroundColor = '#076785';
// message.style.width = '100vw';
// console.log(message.style.width);
// console.log(message.style.color);
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message));
// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height) + 50 + 'px';

// document.documentElement.style.setProperty('--color-first', 'yellow');

// // Atribute

// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// logo.alt = 'Logo Wonderful Bank';

// // non-standard atribute
// console.log(logo.getAttribute('text'));

// logo.setAttribute('testNewAtribute', '1');

// // Data atribute

// console.log(logo.dataset.versionNumber);

// // Classes

// logo.classList.add('a', 'b')
// logo.classList.remove('a', 'b')
// logo.classList.toggle('a')
// logo.classList.contsins('c')

// const h1 = document.querySelector('h1');

// const alertMousEnterH1 = function (e) {
//   alert('You are now at the h1 element');
//   h1.removeEventListener('mouseenter', alertMousEnterH1);
// };
// h1.addEventListener('mouseenter', alertMousEnterH1);
// h1.onclick = function (e) {
//   alert('You are clicked at the h1 element');
// };

// Event Propagation

// rgb(123, 56, 78)
// function getRandomIntInclusive(min, max) {
//   const minCeiled = Math.ceil(min);
//   const maxFloored = Math.floor(max);
//   return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
// }

// const getRandomColor = () =>
//   `rgb(${getRandomIntInclusive(0, 255)}, ${getRandomIntInclusive(
//     0,
//     255
//   )}, ${getRandomIntInclusive(0, 255)})`;
// // console.log(getRandomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = getRandomColor();
//   // Stop prapagation
//   // e.stopPropagation();
// });
// document.querySelector('.nav__links').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = getRandomColor();
//   }
//   // ,true
// );
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = getRandomColor();
// });

// ///////////////////////////////////////////////////////
// // DOM traversing (Перемещение по DOM)
// const h1 = document.querySelector('h1');

// // Перемещение вниз (потомок)

// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// console.log(h1.firstElementChild);
// console.log(h1.firstChild);
// // h1.firstElementChild.style.color = 'yellow';
// console.log(h1.lastElementChild);
// // h1.lastElementChild.style.color = 'red';

// // Перемещение вверх (к родителям)

// console.log(h1.parentNode);
// console.log(h1.parentElement);
// console.log(h1.closest('.header'));

// const h2 = document.querySelector('h2');
// console.log(h2);
// h2.closest('.section').style.backgroundColor = 'blue';

// // Перемещение на одном уровне (в стороны)

// console.log(h2.previousElementSibling);
// console.log(h2.nextElementSibling);
// console.log(h1.parentElement.children);
