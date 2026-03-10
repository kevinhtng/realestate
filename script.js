/* ---- Custom Cursor ---- */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function updateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  ring.style.left   = rx + 'px'; ring.style.top   = ry + 'px';
  requestAnimationFrame(updateRing);
}
updateRing();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width = '60px';
    ring.style.height = '60px';
    ring.style.borderColor = 'rgba(208,214,222,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width = '36px';
    ring.style.height = '36px';
    ring.style.borderColor = 'rgba(208,214,222,0.5)';
  });
});

/* ---- Ambient Canvas (particles + chrome trees) ---- */
const cvs = document.getElementById('ambient-canvas');
const ctx = cvs.getContext('2d');
let W, H, particles = [], treeParticles = [];

function resizeCanvas() {
  W = cvs.width  = window.innerWidth;
  H = cvs.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Floating chrome dust
for (let i = 0; i < 80; i++) {
  particles.push({
    x:       Math.random() * window.innerWidth,
    y:       Math.random() * window.innerHeight,
    r:       Math.random() * 1.5 + 0.2,
    vx:      (Math.random() - 0.5) * 0.15,
    vy:      -Math.random() * 0.3 - 0.05,
    opacity: Math.random() * 0.5 + 0.1,
    flicker: Math.random() * Math.PI * 2
  });
}

// Falling chrome tree silhouettes
for (let i = 0; i < 18; i++) {
  treeParticles.push({
    x:       Math.random() * window.innerWidth,
    y:       Math.random() * window.innerHeight,
    size:    Math.random() * 55 + 25,
    speed:   Math.random() * 0.18 + 0.04,
    opacity: Math.random() * 0.07 + 0.02
  });
}

function drawTree(t) {
  ctx.save();
  ctx.globalAlpha = t.opacity;
  const grad = ctx.createLinearGradient(t.x - t.size / 3, t.y, t.x + t.size / 3, t.y + t.size);
  grad.addColorStop(0,   'rgba(208,214,222,0.9)');
  grad.addColorStop(0.5, 'rgba(168,178,188,0.6)');
  grad.addColorStop(1,   'rgba(74,90,104,0.3)');
  ctx.fillStyle = grad;
  // Top triangle
  ctx.beginPath();
  ctx.moveTo(t.x, t.y);
  ctx.lineTo(t.x - t.size / 3, t.y + t.size);
  ctx.lineTo(t.x + t.size / 3, t.y + t.size);
  ctx.closePath(); ctx.fill();
  // Mid layer
  ctx.beginPath();
  ctx.moveTo(t.x, t.y + t.size * 0.28);
  ctx.lineTo(t.x - t.size / 4, t.y + t.size * 0.68);
  ctx.lineTo(t.x + t.size / 4, t.y + t.size * 0.68);
  ctx.closePath(); ctx.fill();
  // Trunk
  ctx.fillStyle = 'rgba(74,90,104,0.4)';
  ctx.fillRect(t.x - t.size / 14, t.y + t.size, t.size / 7, t.size / 5);
  ctx.restore();
}

function animCanvas() {
  ctx.clearRect(0, 0, W, H);

  // Draw trees
  treeParticles.forEach(t => {
    drawTree(t);
    t.y += t.speed;
    if (t.y > H + t.size) { t.y = -t.size; t.x = Math.random() * W; }
  });

  // Draw dust particles
  particles.forEach(p => {
    p.flicker += 0.02;
    const alpha = p.opacity * (0.7 + 0.3 * Math.sin(p.flicker));
    ctx.save();
    ctx.globalAlpha = alpha;
    const hue   = 200 + 10 * Math.sin(p.flicker);
    const light = 70 + 20 * Math.sin(p.flicker * 1.3);
    ctx.fillStyle = `hsl(${hue}, 10%, ${light}%)`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    p.x += p.vx; p.y += p.vy;
    if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
    if (p.x < -5 || p.x > W + 5) { p.x = Math.random() * W; }
  });

  requestAnimationFrame(animCanvas);
}
animCanvas();

/* ---- Navbar scroll shrink ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ---- Hamburger menu ---- */
const hbg  = document.getElementById('hamburger');
const menu = document.getElementById('nav-menu');
hbg.addEventListener('click', () => {
  hbg.classList.toggle('active');
  menu.classList.toggle('active');
});
document.querySelectorAll('.nav-menu a').forEach(a => {
  a.addEventListener('click', () => {
    hbg.classList.remove('active');
    menu.classList.remove('active');
  });
});

/* ---- About Read More ---- */
const rmBtn = document.getElementById('read-more-btn');
const rmExp = document.getElementById('about-expanded');
rmBtn.addEventListener('click', () => {
  rmExp.classList.toggle('open');
  rmBtn.textContent = rmExp.classList.contains('open') ? 'Read Less ↑' : 'Read More ↓';
});

/* ---- Service toggles ---- */
document.querySelectorAll('.service-toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const body = document.getElementById(btn.dataset.target);
    body.classList.toggle('open');
    btn.classList.toggle('open');
    btn.innerHTML = body.classList.contains('open')
      ? 'Show Less <span class="arrow">↑</span>'
      : 'View Details <span class="arrow">↓</span>';
  });
});

/* ---- Deals carousel ---- */
const dealsData = [
  { n: 56, url: "https://www.har.com/homedetail/11123-pembroke-ridge-dr-houston-tx-77065/3775627?sid=10455666&cid=Kevinhnguyen" },
  { n: 55, url: "https://www.har.com/homedetail/4324-spring-valley-rd-houston-tx-77041/16307958?sid=10519586&cid=Kevinhnguyen" },
  { n: 54, url: "https://www.har.com/homedetail/2842-nicks-run-ln-katy-tx-77494/2414564?sid=10428801&cid=Kevinhnguyen" },
  { n: 53, url: "https://www.facebook.com/marketplace/item/1392693418589236/" },
  { n: 52, url: "https://www.har.com/homedetail/13103-benford-dr-houston-tx-77099/3428862?sid=10262676&cid=Kevinhnguyen" },
  { n: 51, url: "https://www.har.com/homedetail/4538-newhope-terrace-ln-katy-tx-77449/3757486?sid=10294172&cid=Kevinhnguyen" },
  { n: 50, url: "https://www.har.com/homedetail/21331-summer-wine-dr-richmond-tx-77406/9703325?sid=10070955&cid=Kevinhnguyen" },
  { n: 49, url: "https://www.har.com/homedetail/2202-villa-flora-ln-friendswood-tx-77546/17219252?sid=9864654&cid=Kevinhnguyen" },
  { n: 48, url: "https://www.har.com/homedetail/4723-cashel-castle-dr-houston-tx-77069/3376023?sid=9929268&cid=Kevinhnguyen" },
  { n: 47, url: "https://www.har.com/homedetail/18251-river-sage-dr-houston-tx-77084/3713180?sid=9933408&cid=Kevinhnguyen" },
  { n: 46, url: "https://www.har.com/homedetail/9607-wakefield-village-dr-houston-tx-77095/3709626?sid=9979407&cid=Kevinhnguyen" },
  { n: 45, url: "https://www.har.com/homedetail/0-jennings-creek-ct-fulshear-tx-77441/14453195?sid=9979408&cid=Kevinhnguyen" },
  { n: 44, url: "https://www.har.com/homedetail/6920-flintlock-rd-houston-tx-77040/10771984?sid=9861146&cid=Kevinhnguyen" },
  { n: 43, url: "https://www.har.com/homedetail/5615-afton-ridge-ln-houston-tx-77084/3680396?sid=9561055&cid=Kevinhnguyen" },
  { n: 42, url: "https://www.2100westloopsouth.com/" },
  { n: 41, url: "https://www.har.com/homedetail/6920-flintlock-rd-houston-tx-77040/10771984?sid=9560043&cid=Kevinhnguyen" },
  { n: 40, url: "https://www.har.com/homedetail/3-spyglass-ct-jersey-village-tx-77064/3661710?sid=9696215&cid=Kevinhnguyen" },
  { n: 39, url: "https://www.har.com/homedetail/700-thicket-ln-102-houston-tx-77079/3501159?sid=9659685&cid=Kevinhnguyen" },
  { n: 38, url: "https://www.har.com/homedetail/19307-morning-news-ln-richmond-tx-77407/10431790?sid=9535565&cid=Kevinhnguyen" },
  { n: 37, url: "https://www.har.com/homedetail/3327-aspen-stream-dr-richmond-tx-77406/16854440?sid=9276689&cid=Kevinhnguyen" },
  { n: 36, url: "https://www.har.com/homedetail/6920-flintlock-rd-houston-tx-77040/10771984?sid=9359150&cid=Kevinhnguyen" },
  { n: 35, url: "https://www.har.com/homedetail/4324-spring-valley-rd-houston-tx-77041/16307958?sid=9028201&cid=Kevinhnguyen" },
  { n: 34, url: "https://www.har.com/homedetail/0-jennings-creek-ct-fulshear-tx-77441/14453195?sid=8956650&cid=Kevinhnguyen" },
  { n: 33, url: "https://www.har.com/homedetail/21627-bay-palms-dr-katy-tx-77449/3506849?sid=8661350&cid=Kevinhnguyen" },
  { n: 32, url: "https://www.har.com/homedetail/16506-willingham-way-houston-tx-77095/11961115?sid=8605191&cid=Kevinhnguyen" },
  { n: 31, url: "https://www.capemodernliving.com/" },
  { n: 30, url: "https://www.har.com/homedetail/2306-slate-ridge-ln-katy-tx-77494/2427898?sid=8543795&cid=Kevinhnguyen" },
  { n: 29, url: "https://www.wm-stoneloch.com/" },
  { n: 28, url: "https://www.har.com/homedetail/3262-hunters-glen-dr-missouri-city-tx-77459/8788438?sid=8574576&cid=Kevinhnguyen" },
  { n: 27, url: "https://www.har.com/homedetail/2823-whispering-ct-sugar-land-tx-77498/2478129?sid=8488261&cid=Kevinhnguyen" },
  { n: 26, url: "https://www.har.com/homedetail/18251-river-sage-dr-houston-tx-77084/3713180?sid=8472939&cid=Kevinhnguyen" },
  { n: 25, url: "https://www.har.com/homedetail/8435-e-copper-lakes-dr-houston-tx-77095/7761069?sid=8465433&cid=Kevinhnguyen" },
  { n: 24, url: "https://www.har.com/homedetail/9607-wakefield-village-dr-houston-tx-77095/3709626?sid=8419991&cid=Kevinhnguyen" },
  { n: 23, url: "https://www.har.com/homedetail/700-thicket-ln-102-houston-tx-77079/3501159?sid=8451466&cid=Kevinhnguyen" },
  { n: 22, url: "https://www.har.com/homedetail/18251-river-sage-dr-houston-tx-77084/3713180?sid=8314633&cid=Kevinhnguyen" },
  { n: 21, url: "https://www.har.com/homedetail/2932-cordova-hill-dr-katy-tx-77493/16664537?sid=7982390&cid=Kevinhnguyen" },
  { n: 20, url: "https://www.har.com/homedetail/26958-mustang-retreat-ln-katy-tx-77494/12359998?sid=7925524&cid=Kevinhnguyen" },
  { n: 19, url: "https://www.har.com/homedetail/19726-terrazza-lake-ln-richmond-tx-77407/13527534?sid=7922116&cid=Kevinhnguyen" },
  { n: 18, url: "https://www.har.com/homedetail/6920-flintlock-rd-houston-tx-77040/10771984?sid=7905790&cid=Kevinhnguyen" },
  { n: 17, url: "https://www.har.com/homedetail/8801-hammerly-blvd-1207-houston-tx-77080/10970610?sid=7800525&cid=Kevinhnguyen" },
  { n: 16, url: "https://www.har.com/homedetail/4324-spring-valley-rd-houston-tx-77041/16307958?sid=7804335&cid=Kevinhnguyen" },
  { n: 15, url: "https://www.10xwoodwaysquare.com/" },
  { n: 14, url: "https://www.har.com/homedetail/700-thicket-ln-102-houston-tx-77079/3501159?sid=7565065&cid=Kevinhnguyen" },
  { n: 13, url: "https://www.har.com/homedetail/6319-nullarbor-ct-katy-tx-77449/3707044?sid=7275513&cid=Kevinhnguyen" },
  { n: 12, url: "https://www.har.com/homedetail/23138-true-fortune-dr-katy-tx-77449/15839815?sid=7359466&cid=Kevinhnguyen" },
  { n: 11, url: "https://www.har.com/homedetail/20918-oat-straw-ln-katy-tx-77449/16121701?sid=7238572&cid=Kevinhnguyen" },
  { n: 10, url: "https://www.har.com/homedetail/4902-lake-catherine-ct-richmond-tx-77407/11172229?sid=7162134&cid=Kevinhnguyen" },
  { n: 9,  url: "https://www.har.com/homedetail/15407-parkview-st-houston-tx-77071/3315320?sid=7061843&cid=Kevinhnguyen" },
  { n: 8,  url: "https://www.har.com/homedetail/13726-sutton-glen-ln-houston-tx-77047/11583865?sid=7050377&cid=Kevinhnguyen" },
  { n: 7,  url: "https://www.har.com/homedetail/8807-oak-ivy-ln-richmond-tx-77407/16081102?sid=6910498&cid=Kevinhnguyen" },
  { n: 6,  url: "https://www.har.com/homedetail/8118-autumn-trace-ct-houston-tx-77083/3744687?sid=6829357&cid=Kevinhnguyen" },
  { n: 5,  url: "https://www.har.com/homedetail/2506-radcliffe-dr-sugar-land-tx-77498/9456237?sid=6806147&cid=Kevinhnguyen" },
  { n: 4,  url: "https://www.har.com/homedetail/14615-perthshire-rd-houston-tx-77079/10687714?sid=6713891&cid=Kevinhnguyen" },
  { n: 3,  url: "https://www.har.com/homedetail/700-thicket-ln-102-houston-tx-77079/3501159?sid=6621798&cid=Kevinhnguyen" },
  { n: 2,  url: "https://www.har.com/homedetail/16607-jamaica-cove-rd-jamaica-beach-tx-77554/2628958?sid=6462007&cid=Kevinhnguyen" },
  { n: 1,  url: "https://www.har.com/homedetail/7307-ferrara-dr-houston-tx-77083/8930273?sid=6567600&cid=Kevinhnguyen" }
];

const dealsTrack = document.getElementById('deals-track');
dealsData.forEach(d => {
  const a = document.createElement('a');
  a.className = 'deal-card';
  a.href = d.url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';

  const imgWrap = document.createElement('div');
  imgWrap.className = 'deal-img-wrap';

  const img = document.createElement('img');
  img.src = `images/deal-${d.n}.jpg`;
  img.alt = `Deal #${d.n}`;
  img.onerror = function () {
    imgWrap.innerHTML = '<span style="font-size:2.5rem;filter:grayscale(1)">🏡</span>';
  };
  imgWrap.appendChild(img);

  const info = document.createElement('div');
  info.className = 'deal-info';
  info.innerHTML = `<div class="deal-num">Deal #${d.n}</div><div class="deal-title">Closed Transaction</div>`;

  a.appendChild(imgWrap);
  a.appendChild(info);
  dealsTrack.appendChild(a);
});

document.getElementById('deals-prev').addEventListener('click', () => dealsTrack.scrollBy({ left: -600, behavior: 'smooth' }));
document.getElementById('deals-next').addEventListener('click', () => dealsTrack.scrollBy({ left:  600, behavior: 'smooth' }));

/* ---- Reviews carousel ---- */
const reviewsData = [
  { q: "Kevin was so easy to work with. He responds fast and made the process for finding my new home super smooth. He follows up and stays in contact even after finalizing everything. Highly recommend!", r: "Jay S." },
  { q: "Moving from another state and buying remotely can be nerve-wracking. Kevin went above and beyond — sourcing last-minute paint to meet FHA requirements, crawling into crawl spaces during inspections. His wisdom, patience, and perseverance made our dreams come true.", r: "James N." },
  { q: "Kevin was so great to work with! He made the whole process super easy and stress-free. He found me a beautiful house really fast, was very patient, showed me so many homes. This is my second home Kevin has found for me.", r: "Teresa M." },
  { q: "Kevin found me an apartment really fast and handled all the paperwork. He's professional, kind, and really knows what he's doing. Highly recommend!", r: "Anikah N." },
  { q: "He is a great realtor. Very knowledgeable about areas and locations, very patient, responds back very quickly, and is on time for showings. Best Realtor ⭐⭐⭐⭐⭐", r: "Teresa T." },
  { q: "Kevin is very knowledgeable and experienced. He helped me get a really good deal for my house. He always protects you and gets you everything you want. Highly recommended!", r: "Cuc N." },
  { q: "Kevin is an amazing realtor. He listens, is professional, and makes sure you get everything you want. He will listen and take his time to find your dream house. He responded quickly and was always there.", r: "Duc N." },
  { q: "You've been so helpful and attentive throughout this whole process, and you're a funny guy, Kevin!", r: "Matthew M." },
  { q: "My family needed to get into a house quickly and Kevin made it happen! He worked around unique constraints that would have stopped other agents. His communication was tailored to my needs and his response time was insanely fast.", r: "Arthur L." },
  { q: "Kevin is a great asset to any real estate team. He's helped us get our rental properties filled with such a seamless and thoughtful process. One of the best realtors we've dealt with.", r: "Nancy T." },
  { q: "Kevin was a huge help during my tough move and got the job done fast! Accommodating, personable, and swift. Couldn't ask for more.", r: "Summer Z." },
  { q: "Kevin helped me and my sister find a great place and worked with us throughout the whole process. He's very nice, responsive, and I would recommend him to anyone.", r: "Cecilia R." },
  { q: "Kevin is awesome! I would certainly recommend him for realty needs as he provides great service and communication.", r: "Ari X." },
  { q: "His response is immediate. He helped me get my clients into the property he was leasing fast and efficiently even when he was out of town.", r: "Beverlin V." },
  { q: "Kevin is so professional and his communication is top tier. He made everything easy with our clients. Definitely recommend him and his listings.", r: "Latoya W." },
];

const reviewsTrack = document.getElementById('reviews-track');
reviewsData.forEach(rv => {
  const card = document.createElement('div');
  card.className = 'review-card';
  card.innerHTML = `
    <div class="stars">${'<span>★</span>'.repeat(5)}</div>
    <p class="review-quote">"${rv.q}"</p>
    <p class="review-name">— ${rv.r}</p>`;
  reviewsTrack.appendChild(card);
});

document.getElementById('reviews-prev').addEventListener('click', () => reviewsTrack.scrollBy({ left: -600, behavior: 'smooth' }));
document.getElementById('reviews-next').addEventListener('click', () => reviewsTrack.scrollBy({ left:  600, behavior: 'smooth' }));

/* ---- Scroll reveal ---- */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));
