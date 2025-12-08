// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Read More button
const readMoreBtn = document.querySelector('.read-more');
const aboutExpanded = document.querySelector('.about-expanded');

readMoreBtn.addEventListener('click', () => {
  aboutExpanded.classList.toggle('open');
  readMoreBtn.textContent = aboutExpanded.classList.contains('open') ? 'Read Less' : 'Read More';
});

// Service toggles
document.querySelectorAll('.service-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.previousElementSibling;
    content.classList.toggle('open');
    btn.textContent = content.classList.contains('open') ? 'Show Less' : 'Learn More';
  });
});

// Deals data
const deals = [
  { number: 52, url: "https://www.har.com/homedetail/13103-benford-dr-houston-tx-77099/3428862?sid=10262676&cid=Kevinhnguyen" },
  { number: 51, url: "https://www.har.com/homedetail/4538-newhope-terrace-ln-katy-tx-77449/3757486?sid=10294172&cid=Kevinhnguyen" },
  { number: 50, url: "https://www.har.com/homedetail/21331-summer-wine-dr-richmond-tx-77406/9703325?sid=10070955&cid=Kevinhnguyen" },
  { number: 49, url: "https://www.har.com/homedetail/2202-villa-flora-ln-friendswood-tx-77546/17219252?sid=9864654&cid=Kevinhnguyen" },
  { number: 48, url: "https://www.har.com/homedetail/4723-cashel-castle-dr-houston-tx-77069/3376023?sid=9929268&cid=Kevinhnguyen" },
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

// Populate deals carousel WITH IMAGES
const dealsCarousel = document.getElementById('deals-carousel');
deals.forEach(deal => {
  const card = document.createElement('div');
  card.className = 'deal-card';
  
  const link = document.createElement('a');
  link.href = deal.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.style.textDecoration = 'none';
  link.style.color = 'inherit';
  
  const imgContainer = document.createElement('div');
  imgContainer.className = 'deal-image';
  
  const img = document.createElement('img');
  img.src = `images/deal-${deal.number}.jpg`;
  img.alt = `Closed Deal #${deal.number}`;
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'cover';
  
  // Fallback to emoji if image fails to load
  img.onerror = function() {
    imgContainer.innerHTML = '🏡';
    imgContainer.style.display = 'flex';
    imgContainer.style.alignItems = 'center';
    imgContainer.style.justifyContent = 'center';
    imgContainer.style.fontSize = '3rem';
  };
  
  imgContainer.appendChild(img);
  
  const info = document.createElement('div');
  info.className = 'deal-info';
  info.innerHTML = `<h4>Closed Deal #${deal.number}</h4>`;
  
  link.appendChild(imgContainer);
  link.appendChild(info);
  card.appendChild(link);
  dealsCarousel.appendChild(card);
});

// Reviews data
const reviews = [
  {
    quote: "Kevin was so easy to work with. Kevin was kind, he responds fast, and he made the process for finding my new home super smooth. He follows up and stays in contact even after finalizing everything. I highly recommend him if you are in the market for a new home.",
    reviewer: "Jay S."
  },
  {
    quote: `Moving from another state and buying a house remotely can be nerve-wracking, to say the least. But Kevin Hoang Nguyen was more than just a realtor; He was a constant support. He went above and beyond, even sourcing last-minute paint to meet an FHA requirement and crawling into crawl spaces during inspections with us. We are so grateful for his wisdom, patience, and perseverance in making our dreams come true. His professionalism and support truly made the difference! His deep understanding of local market was invaluable. 
            He negotiated expertly to get us the best deal, and the entire process, from start to closing was smooth and stress-free.
            We are so happy with our new home. We highly recommend Kevin Hoang Nguyen to anyone in need of a mortgage, especially in Houston, Texas.
            Thank you again for your outstanding work.!`,
    reviewer: "James N."
},
  {
    quote: "Kevin was so great to work with! He made the whole process super easy and stress-free He found me a beautiful house really fast  he was very patient with me showed me so many homes  He's professional, kind, and really knows what he's doing. Highly recommend him! This is my second home Kevin, has found for me  if you get the chance for Kevin, to be your realtor I highly recommend that you do.",
    reviewer: "Teresa M."
  },
  {
    quote: "Kevin was so great to work with! He made the whole process super easy and stress-free. He found me an apartment really fast and handled all the paperwork, which I appreciated so much. He’s professional, kind, and really knows what he’s doing. Highly recommend him!",
    reviewer: "Anikah N."
  },
  {
    quote: "I am so happy with my new home Kevin has moved me into my second home. He is a great realtor. He’s very knowledgeable about the areas and locations on where to move he was very patient with me on me wanting to look at so many different properties he responds back very quickly and is on time for showings I would highly recommend Kevin Nguyen as your guy to help you find your new home Best Realtor ⭐️⭐️⭐️⭐️⭐️",
    reviewer: "Teresa T."
  },
  {
    quote: "Kevin is very knowledgeable and experience realtor. He helped me get a really good deal for my house! He is very experience and professional. He always protect you and get you everything you want. Highly recommended!",
    reviewer: "Cuc N."
  },
  {
    quote: "Kevin is an Amazing realtor. He listens, professional and make sure you get everything you want. He will work with you, and ensure you are protect from all your rights. I highly recommended him. He will listen, and take his time to find you your dream house. He responded quickly and always there for you when you have any questions.",
    reviewer: "Duc N."
  },
  {
    quote: "You've been so helpful and attentive throughout this whole process, and you're a funny guy, Kevin!",
    reviewer: "Matthew M."
  },
  {
    quote: "My family and I needed to get into a house quickly and Kevin made it happen! He had to work around some unique constraints that made things difficult to the point other Agents would have not bothered. Kevin's communication was tailored to my needs and his response time was insanely fast. Kevin took a huge burden off our shoulders and when the opportunity arises we will definitely work with Kevin again!",
    reviewer: "Arthur L."
  },
  {
    quote: "Kevin is a great asset to any real estate team. He's helped us get our rental properties filled and has such a seamless and thoughtful process. Kevin is one of the best realtors we've dealt with.",
    reviewer: "Nancy T."
  },
  {
    quote: "Kevin was a huge help during my tough move and got the job done fast! If you're looking for a realtor he's the one! Accommodating, personable, and swift. Couldn't ask for more.",
    reviewer: "Summer Z."
  },
  {
    quote: "Kevin is a great realtor! He helped me and my sister find a great place and worked with us throughout the whole process! He's very nice, responsive, and I would reccomend him to anyone looking for a house or rental!",
    reviewer: "Cecilia R."
  },
  {
    quote: "Kevin, is awesome! I would certianly recommend him for realty needs as he provides great service and communication.",
    reviewer: "Ari X."
  },
  {
    quote: "Kevin it's such a great realtor to work with. His response is immediate. He helped me get my clients into the property he was leasing fast and efficiently even when he was out of town.",
    reviewer: "Beverlin V."
  },
  {
    quote: "Kevin is so professional and his communication is top tier. He made everything easy with our clients. Definitely recommend him and his listings.",
    reviewer: "Latoya W."
  }
];

// Populate reviews carousel
const reviewsCarousel = document.getElementById('reviews-carousel');
reviews.forEach(review => {
  const card = document.createElement('div');
  card.className = 'review-card';
  card.innerHTML = `
    <p class="quote">"${review.quote}"</p>
    <p class="reviewer">— ${review.reviewer}</p>
  `;
  reviewsCarousel.appendChild(card);
});

// Carousel navigation
document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
  const carousel = wrapper.querySelector('.carousel');
  const prevBtn = wrapper.querySelector('.prev');
  const nextBtn = wrapper.querySelector('.next');
  
  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -400, behavior: 'smooth' });
  });
  
  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: 400, behavior: 'smooth' });
  });
});
