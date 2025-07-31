// Navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
  navToggle.setAttribute('aria-expanded', !expanded);
  navToggle.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Accordion toggles
document.querySelectorAll('.accordion-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !expanded);
    const content = button.nextElementSibling;
    if (content) {
      if (expanded) {
        content.hidden = true;
      } else {
        content.hidden = false;
      }
    }
  });
});

// Deal data: number, HAR link, image try loaded from HAR URL (same as link)
const deals = [
  { number: 47, url: "https://www.har.com/homedetail/18251-river-sage-dr-houston-tx-77084/3713180?sid=9933408&cid=Kevinhnguyen" },
  { number: 46, url: "https://www.har.com/homedetail/9607-wakefield-village-dr-houston-tx-77095/3709626?sid=9979407&cid=Kevinhnguyen" },
  { number: 45, url: "https://www.har.com/homedetail/0-jennings-creek-ct-fulshear-tx-77441/14453195?sid=9979408&cid=Kevinhnguyen" },
  { number: 44, url: "https://www.har.com/homedetail/6920-flintlock-rd-houston-tx-77040/10771984?sid=9861146&cid=Kevinhnguyen" },
  { number: 43, url: "https://www.har.com/homedetail/5615-afton-ridge-ln-houston-tx-77084/3680396?sid=9561055&cid=Kevinhnguyen" },
  { number: 42, url: "https://www.2100westloopsouth.com/" },
  { number: 41, url: "https://www.har.com/homedetail/6920-flintlock-rd-houston-tx-77040/10771984?sid=9560043&cid=Kevinhnguyen" },
  { number: 40, url: "https://www.har.com/homedetail/3-spyglass-ct-jersey-village-tx-77064/3661710?sid=9696215&cid=Kevinhnguyen" },
  { number: 39, url: "https://www.har.com/homedetail/700-thicket-ln-102-houston-tx-77079/3501159?sid=9659685&cid=Kevinhnguyen" },
  { number: 38, url: "https://www.har.com/homedetail/19307-morning-news-ln-richmond-tx-77407/10431790?sid=9535565&cid=Kevinhnguyen" },
  { number: 37, url: "https://www.har.com/homedetail/3327-aspen-stream-dr-richmond-tx-77406/16854440?sid=9276689&cid=Kevinhnguyen" },
  { number: 36, url: "https://www.har.com/homedetail/6920-flintlock-rd-houston-tx-77040/10771984?sid=9359150&cid=Kevinhnguyen" },
  { number: 35, url: "https://www.har.com/homedetail/4324-spring-valley-rd-houston-tx-77041/16307958?sid=9028201&cid=Kevinhnguyen" },
  { number: 34, url: "https://www.har.com/homedetail/0-jennings-creek-ct-fulshear-tx-77441/14453195?sid=8956650&cid=Kevinhnguyen" },
  { number: 33, url: "https://www.har.com/homedetail/21627-bay-palms-dr-katy-tx-77449/3506849?sid=8661350&cid=Kevinhnguyen" },
  { number: 32, url: "https://www.har.com/homedetail/16506-willingham-way-houston-tx-77095/11961115?sid=8605191&cid=Kevinhnguyen" },
  { number: 31, url: "https://www.capemodernliving.com/" },
  { number: 30, url: "https://www.har.com/homedetail/2306-slate-ridge-ln-katy-tx-77494/2427898?sid=8543795&cid=Kevinhnguyen" },
  { number: 29, url: "https://www.wm-stoneloch.com/" },
  { number: 28, url: "https://www.har.com/homedetail/3262-hunters-glen-dr-missouri-city-tx-77459/8788438?sid=8574576&cid=Kevinhnguyen" },
  { number: 27, url: "https://www.har.com/homedetail/2823-whispering-ct-sugar-land-tx-77498/2478129?sid=8488261&cid=Kevinhnguyen" },
  { number: 26, url: "https://www.har.com/homedetail/18251-river-sage-dr-houston-tx-77084/3713180?sid=8472939&cid=Kevinhnguyen" },
  { number: 25, url: "https://www.har.com/homedetail/8435-e-copper-lakes-dr-houston-tx-77095/7761069?sid=8465433&cid=Kevinhnguyen" },
  { number: 24, url: "https://www.har.com/homedetail/9607-wakefield-village-dr-houston-tx-77095/3709626?sid=8419991&cid=Kevinhnguyen" },
  { number: 23, url: "https://www.har.com/homedetail/700-thicket-ln-102-houston-tx-77079/3501159?sid=8451466&cid=Kevinhnguyen" },
  { number: 22, url: "https://www.har.com/homedetail/18251-river-sage-dr-houston-tx-77084/3713180?sid=8314633&cid=Kevinhnguyen" },
  { number: 21, url: "https://www.har.com/homedetail/2932-cordova-hill-dr-katy-tx-77493/16664537?sid=7982390&cid=Kevinhnguyen" },
  { number: 20, url: "https://www.har.com/homedetail/26958-mustang-retreat-ln-katy-tx-77494/12359998?sid=7925524&cid=Kevinhnguyen" },
  { number: 19, url: "https://www.har.com/homedetail/19726-terrazza-lake-ln-richmond-tx-77407/13527534?sid=7922116&cid=Kevinhnguyen" },
  { number: 18, url: "https://www.har.com/homedetail/6920-flintlock-rd-houston-tx-77040/10771984?sid=7905790&cid=Kevinhnguyen" },
  { number: 17, url: "https://www.har.com/homedetail/8801-hammerly-blvd-1207-houston-tx-77080/10970610?sid=7800525&cid=Kevinhnguyen" },
  { number: 16, url: "https://www.har.com/homedetail/4324-spring-valley-rd-houston-tx-77041/16307958?sid=7804335&cid=Kevinhnguyen" },
  { number: 15, url: "https://www.10xwoodwaysquare.com/?utm_knock=gmb" },
  { number: 14, url: "https://www.har.com/homedetail/700-thicket-ln-102-houston-tx-77079/3501159?sid=7565065&cid=Kevinhnguyen" },
  { number: 13, url: "https://www.har.com/homedetail/6319-nullarbor-ct-katy-tx-77449/3707044?sid=7275513&cid=Kevinhnguyen" },
  { number: 12, url: "https://www.har.com/homedetail/23138-true-fortune-dr-katy-tx-77449/15839815?sid=7359466&cid=Kevinhnguyen" },
  { number: 11, url: "https://www.har.com/homedetail/20918-oat-straw-ln-katy-tx-77449/16121701?sid=7238572&cid=Kevinhnguyen" },
  { number: 10, url: "https://www.har.com/homedetail/4902-lake-catherine-ct-richmond-tx-77407/11172229?sid=7162134&cid=Kevinhnguyen" },
  { number: 9, url: "https://www.har.com/homedetail/15407-parkview-st-houston-tx-77071/3315320?sid=7061843&cid=Kevinhnguyen" },
  { number: 8, url: "https://www.har.com/homedetail/13726-sutton-glen-ln-houston-tx-77047/11583865?sid=7050377&cid=Kevinhnguyen" },
  { number: 7, url: "https://www.har.com/homedetail/8807-oak-ivy-ln-richmond-tx-77407/16081102?sid=6910498&cid=Kevinhnguyen" },
  { number: 6, url: "https://www.har.com/homedetail/8118-autumn-trace-ct-houston-tx-77083/3744687?sid=6829357&cid=Kevinhnguyen" },
  { number: 5, url: "https://www.har.com/homedetail/2506-radcliffe-dr-sugar-land-tx-77498/9456237?sid=6806147&cid=Kevinhnguyen" },
  { number: 4, url: "https://www.har.com/homedetail/14615-perthshire-rd-houston-tx-77079/10687714?sid=6713891&cid=Kevinhnguyen" },
  { number: 3, url: "https://www.har.com/homedetail/700-thicket-ln-102-houston-tx-77079/3501159?sid=6621798&cid=Kevinhnguyen" },
  { number: 2, url: "https://www.har.com/homedetail/16607-jamaica-cove-rd-jamaica-beach-tx-77554/2628958?sid=6462007&cid=Kevinhnguyen" },
  { number: 1, url: "https://www.har.com/homedetail/7307-ferrara-dr-houston-tx-77083/8930273?sid=6567600&cid=Kevinhnguyen" }
];

// Select carousel container
const carousel = document.getElementById('carousel');

// Populate carousel with deal cards
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
  // Try to load image from HAR URL (this might not always load)
  img.src = deal.url;

  const caption = document.createElement('div');
  caption.className = 'deal-caption';
  caption.textContent = `Closed Deal #${deal.number}`;

  link.appendChild(img);
  card.appendChild(link);
  card.appendChild(caption);
  carousel.appendChild(card);
});

// Navigation buttons
const btnLeft = document.getElementById('nav-left');
const btnRight = document.getElementById('nav-right');

btnLeft.addEventListener('click', () => {
  carousel.scrollBy({ left: -300, behavior: 'smooth' });
});
btnRight.addEventListener('click', () => {
  carousel.scrollBy({ left: 300, behavior: 'smooth' });
});

// Reviews data (add as many as you want)
const reviews = [
  {
    quote: "Kevin made selling our home a breeze. Highly recommend!",
    reviewer: "Jane D., Houston, TX"
  },
  {
    quote: "Professional, knowledgeable, and very responsive. A+ service!",
    reviewer: "Mark T."
  },
  {
    quote: "Helped us find our dream home quickly and effortlessly.",
    reviewer: "Samantha R."
  }
];

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

// Reviews carousel nav buttons
const reviewsBtnLeft = document.getElementById('reviews-nav-left');
const reviewsBtnRight = document.getElementById('reviews-nav-right');

reviewsBtnLeft.addEventListener('click', () => {
  reviewsCarousel.scrollBy({left: -300, behavior: 'smooth'});
});

reviewsBtnRight.addEventListener('click', () => {
  reviewsCarousel.scrollBy({left: 300, behavior: 'smooth'});
});
