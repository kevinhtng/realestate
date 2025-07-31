// Navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
  navToggle.setAttribute('aria-expanded', !expanded);
  navToggle.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Close hamburger menu when clicking nav links + smooth scroll
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    // Close mobile menu
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');

    // Delay scroll to allow nav to finish closing
    setTimeout(() => {
      targetSection?.scrollIntoView({ behavior: 'smooth' });
    }, 300); // Adjust if needed to match your CSS animation timing
  });
});

// Accordion toggles
document.querySelectorAll('.accordion-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !expanded);
    const content = button.nextElementSibling;
    if (content) content.hidden = expanded;
  });
});

// Deal data
const deals = [ /* your deal objects here (unchanged) */ ];

// Populate deal carousel
const carousel = document.getElementById('carousel');
deals.forEach(deal => {
  const card = document.createElement('div');
  card.className = 'deal-card';

  const link = document.createElement('a');
  link.href = deal.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';

  const img = document.createElement('img');
  img.className = 'deal-image';
  img.alt = `Closed Deal #${deal.number}`;
  img.src = deal.url; // This may fail to load; HAR doesn't serve direct image files

  const caption = document.createElement('div');
  caption.className = 'deal-caption';
  caption.textContent = `Closed Deal #${deal.number}`;

  link.appendChild(img);
  card.appendChild(link);
  card.appendChild(caption);
  carousel.appendChild(card);
});

// Carousel navigation
document.getElementById('nav-left').addEventListener('click', () => {
  carousel.scrollBy({ left: -300, behavior: 'smooth' });
});
document.getElementById('nav-right').addEventListener('click', () => {
  carousel.scrollBy({ left: 300, behavior: 'smooth' });
});

// Reviews data
const reviews = [ /* your review objects here (unchanged) */ ];

// Populate reviews carousel
const reviewsCarousel = document.getElementById('reviews-carousel');
reviews.forEach(r => {
  const card = document.createElement('div');
  card.classList.add('review-card');
  card.tabIndex = 0;
  card.innerHTML = `
    <p class="quote">"${r.quote}"</p>
    <p class="reviewer">— ${r.reviewer}</p>
  `;
  reviewsCarousel.appendChild(card);
});

// Reviews nav
document.getElementById('reviews-nav-left').addEventListener('click', () => {
  reviewsCarousel.scrollBy({left: -300, behavior: 'smooth'});
});
document.getElementById('reviews-nav-right').addEventListener('click', () => {
  reviewsCarousel.scrollBy({left: 300, behavior: 'smooth'});
});
