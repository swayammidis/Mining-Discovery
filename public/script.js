// ===== PRELOADER FUNCTIONALITY =====
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
    setTimeout(() => preloader.remove(), 1000); // optional: remove it from DOM
  }
});

function toggleMenu() {
  const header = document.querySelector('.main-header');
  header.classList.toggle('mobile-active');
}

function toggleDropdown() {
  const dropdown = document.getElementById("dropdownMenu");
  const header = document.getElementById("newsToggle");
  dropdown.classList.toggle("show");
  header.classList.toggle("rotate");
}
const carousel = document.getElementById("carousel");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

prev.addEventListener("click", () => {
  carousel.scrollBy({ left: -260, behavior: 'smooth' });
});

next.addEventListener("click", () => {
  carousel.scrollBy({ left: 260, behavior: 'smooth' });
});

const slider = document.getElementById("videoSlider");
const leftBtn = document.querySelector(".arrow.left");
const rightBtn = document.querySelector(".arrow.right");

leftBtn.addEventListener("click", () => {
  slider.scrollBy({ left: -300, behavior: "smooth" });
});

rightBtn.addEventListener("click", () => {
  slider.scrollBy({ left: 300, behavior: "smooth" });
});

const messages = [
  "Search gold prices",
  "Search silver value",
  "Search copper rates",
  "Search platinum updates",
  "Search latest news"
];

let index = 0;
const animatedText = document.getElementById("animatedText");

setInterval(() => {
  index = (index + 1) % messages.length;
  animatedText.innerText = messages[index];
  animatedText.style.animation = "none"; // reset animation
  void animatedText.offsetWidth;         // reflow to restart
  animatedText.style.animation = "slideText 1s ease-in-out infinite";
}, 5000);





function loadIframe(el) {
  el.outerHTML = `
      <iframe width="560" height="315"
        src="https://www.youtube.com/embed/pzxdSK6t2Eo?autoplay=1"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
      </iframe>`;
}
function loadIframe2(el) {
  el.outerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/D2S9tbVMDRQ?si=oYaYU3_svLfnWTij" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
}

// youtube-popup
window.addEventListener("load", () => {
  const popup = document.getElementById("popup");
  const closeBtn = document.getElementById("closeBtn");
  const youtubeIframe = document.getElementById("youtube-video");

  const youtubeLink = "https://www.youtube.com/embed/pzxdSK6t2Eo?autoplay=1";

  // Show popup after 4 seconds
  setTimeout(() => {
    youtubeIframe.src = youtubeLink;
    popup.style.display = "block";
  }, 4000);

  // Close popup
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
    youtubeIframe.src = ""; // Stop video
  });
});


const moreCards = [
  {
    image: "./image/pexels-castorlystock-5139206 1.png",
    title: "New Goldmine Discovery in Australia",
    description: "Exploration companies have uncovered new gold veins in the Kalgoorlie region, expected to boost local economies.",
    date: "July 25, 2025",
    author: "AURA MINES"
  },
  {
    image: "./image/pexels-castorlystock-5139206 1.png",
    title: "Silver Demand Soars",
    description: "Investors rush toward silver as green energy demand spikes globally. Analysts predict a 10% increase in demand.",
    date: "July 26, 2025",
    author: "SILVERSTREAM INC"
  }
];

const showMoreBtn = document.querySelector(".btn-more");
const container = document.getElementById("news-container");

showMoreBtn.addEventListener("click", function () {
  moreCards.forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("news-card");
    cardDiv.innerHTML = `
        <img src="${card.image}" alt="">
        <div class="text-content">
          <h3>${card.title}</h3>
          <p>${card.description} <span>read more.....</span></p>
          <span>${card.date}</span>
          <p>By: ${card.author}</p>
        </div>
      `;
    container.appendChild(cardDiv);
  });

  showMoreBtn.style.display = "none"; // hide button after showing
});

// ===== DROPDOWN TOGGLE =====
function toggleDropdown() {
  const dropdown = document.getElementById("dropdownMenu");
  const header = document.getElementById("newsToggle");
  dropdown?.classList.toggle("show");
  header?.classList.toggle("rotate");
}

// ===== LOAD BANNERS =====
async function loadBanners() {
  const container = document.getElementById('bannerContainer');
  if (!container) return;

  container.innerHTML = '<p>Loading banners...</p>';

  try {
    const res = await fetch('/api/banners'); // fetch all banners

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log('Banner API response:', data);

    container.innerHTML = ''; // Clear previous content

    if (!Array.isArray(data) || data.length === 0) {
      container.innerHTML = '<p>No banners available.</p>';
      return;
    }

    data.forEach((banner, index) => {
      const imageUrl = banner.image;

      const adDiv = document.createElement('div');
      adDiv.className = 'left-ad';

      if (imageUrl && imageUrl.startsWith('data:image')) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = banner.alt || `Banner ${index + 1}`;
        img.className = 'logo-img';

        if (banner.link) {
          const anchor = document.createElement('a');
          anchor.href = banner.link;
          anchor.target = '_blank';
          anchor.rel = 'noopener noreferrer';
          anchor.appendChild(img);
          adDiv.appendChild(anchor);
        } else {
          adDiv.appendChild(img);
        }
      } else {
        adDiv.innerHTML = '<p>Invalid image</p>';
      }

      container.appendChild(adDiv);
    });

  } catch (err) {
    console.error('Failed to load banners:', err);
    container.innerHTML = '<p>Error loading banners.</p>';
  }
}

// ===== FETCH MAIN COMPANY NEWS =====
async function fetchCompanyNews() {
  try {
    const res = await fetch('/api/company');
    const data = await res.json();
    const mainContainer = document.getElementById('main-news');
    if (!mainContainer) return;

    if (!Array.isArray(data) || data.length === 0) {
      mainContainer.innerHTML = "<p style='padding: 20px;'>No company news available.</p>";
      return;
    }

    const mainNews = data[0];

    const stripHTML = (html) => html.replace(/<[^>]*>/g, '');
    const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit', month: 'long', year: 'numeric'
    });

    mainContainer.innerHTML = `
      <img src="${mainNews.image}" alt="Drilling Rig" class="main-news-image" />
      <div class="main-card-content">
        <h2><a href="/company-news.html?id=${mainNews._id}">${mainNews.title}</a></h2>
        <p>${stripHTML(mainNews.description).slice(0, 500)}...</p>
        <p class="date"><span>${formatDate(mainNews.date)}</span> By: ${mainNews.author || 'Midis'}</p>
      </div>
    `;
  } catch (err) {
    console.error('Error loading company news:', err);
    const main = document.getElementById('main-news');
    if (main) main.innerHTML = "<p style='padding: 20px;'>Error loading company news.</p>";
  }
}

// for fetching the latest news 
async function loadLatestNewsSidebar() {
  try {
    const res = await fetch('/api/tagged-posts/tag/' + encodeURIComponent('latest news'));
    const data = await res.json();

    const container = document.getElementById('latest-news-list');
    if (!container) return;

    container.innerHTML = '';

    if (!res.ok || !Array.isArray(data) || data.length === 0) {
      container.innerHTML = '<p>No latest news available.</p>';
      return;
    }

    const latestFive = data.slice(0, 5);

    latestFive.forEach(news => {
      const latestItem = document.createElement('div');
      latestItem.className = 'latest-item';

      const titleLink = document.createElement('a');
      titleLink.href = `view-news.html?id=${news._id}`;
      titleLink.textContent = news.title;
      titleLink.className = 'news-title-link';
      titleLink.style.textDecoration = 'none';
      titleLink.style.color = '#000';

      const title = document.createElement('p');
      title.appendChild(titleLink);

      const date = new Date(news.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'long', year: 'numeric'
      });

      const meta = document.createElement('p');
      meta.className = 'date';
      meta.innerHTML = `${date} <span class="author">By: ${news.author || 'Anonymous'}</span>`;

      latestItem.appendChild(title);
      latestItem.appendChild(meta);
      container.appendChild(latestItem);
    });
  } catch (error) {
    console.error('Error loading latest news for sidebar:', error);
    const container = document.getElementById('latest-news-list');
    if (container) {
      container.innerHTML = '<p>Error loading latest news.</p>';
    }
  }
}

// ✅ Load Advertisements into a given section
// ✅ Robust image src resolution + clickable link
async function loadAdvertisements(sectionId) {
  try {
    const res = await fetch('/api/ads');
    const ads = await res.json();
    const adSection = document.getElementById(sectionId);
    if (!adSection) return;

    if (!ads || ads.length === 0) {
      adSection.innerHTML = '<p>No advertisements available.</p>';
      return;
    }

    adSection.innerHTML = '';

    ads.forEach(ad => {
      console.log('ad.image:', ad.image); // helpful debugging
      const img = document.createElement('img');

      // Determine correct src
      if (!ad.image) {
        img.src = ''; // or a placeholder
      } else if (ad.image.startsWith('data:image')) {
        img.src = ad.image;
      } else if (ad.image.startsWith('http://') || ad.image.startsWith('https://')) {
        img.src = ad.image;
      } else if (ad.image.startsWith('/uploads/')) {
        // already normalized by backend
        img.src = ad.image;
      } else {
        // maybe backend stored just the filename
        img.src = `/uploads/${ad.image}`;
      }

      img.alt = ad.alt || 'Advertisement';
      img.style.maxWidth = '100%';
      img.style.display = 'block';

      if (ad.link) {
        const a = document.createElement('a');
        a.href = ad.link;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.title = 'Visit advertiser';
        a.style.cursor = 'pointer';

        img.style.cursor = 'pointer';
        a.appendChild(img);
        adSection.appendChild(a);
      } else {
        adSection.appendChild(img);
      }
    });
  } catch (err) {
    console.error(`Error loading ads into ${sectionId}:`, err);
  }
}

async function fetchSponsoredPostsForIndex() {
  try {
    const res = await fetch('/api/tagged-posts/tag/sponsored posts');
    const posts = await res.json();

    if (!posts.length) return;

    const featured = posts[0];
    const gridPosts = posts.slice(1, 5); // Show up to 4 in grid

    // 🔸 FEATURED POST
    const featuredContainer = document.getElementById("featuredSponsoredPost");
    featuredContainer.innerHTML = `
      <div class="sec1">
        <img src="${featured.image}" alt="Sponsored Image" />
      </div>
      <div class="sec2">
        <span class="tag">SPONSORED POST</span>
        <p class="post-text">
          ${featured.description.replace(/<[^>]*>?/gm, '').slice(0, 400)}...
        </p>
        <a href="sponsored-detail.html?id=${featured._id}">
          <button class="btn-more">More <i class="fas fa-angle-right"></i></button>
        </a>
      </div>
    `;

    // 🔸 GRID CARDS
    const gridContainer = document.getElementById("gridSponsoredPosts");
    gridContainer.innerHTML = ''; // Clear existing cards

    gridPosts.forEach(post => {
      const card = document.createElement("div");
      card.classList.add("card1"); // Use only predefined class
      card.innerHTML = `
        <img src="${post.image}" alt="Sponsored Image" />
        <span class="tag-post">SPONSORED POST</span>
        <h4>${post.title}</h4>
        <a href="sponsored-detail.html?id=${post._id}">
          <button class="btn-more">More</button>
        </a>
      `;
      gridContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching sponsored posts:", error);
  }
}

// Generic Tagged News Fetcher (for precious metals news) - SHOW ONLY 1
async function fetchTaggedNews(tagName, containerId, detailPage) {
  try {
    const encodedTag = encodeURIComponent(tagName);
    const res = await fetch(`/api/tagged-posts/tag/${encodedTag}`);
    const data = await res.json();
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if (!Array.isArray(data) || data.length === 0) {
      container.innerHTML = `<p>No ${tagName} news found.</p>`;
      return;
    }

    const news = data[0]; // Only the first/latest news item

    const card = document.createElement('div');
    card.className = 'precious-metals'; // Ensure this class is styled in your CSS

    card.innerHTML = `
      <img src="${news.image || './image/default-placeholder.png'}" alt="${tagName} Image">
      <div class="world-news">
        <p>
          <a href="${detailPage}?id=${news._id}" class="metal-link">${news.title}</a>
        </p>
        <small>${new Date(news.date).toLocaleDateString('en-GB')}</small>
        <div class="author">By: ${news.author || 'Mining Discovery'}</div>
        <a href="${detailPage}?id=${news._id}" class="more-btn">
          More
          <svg viewBox="0 0 24 24">
            <path d="M10 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    `;

    container.appendChild(card);

  } catch (err) {
    console.error(`Error fetching ${tagName} tagged news:`, err);
  }
}

// for fetching world news 
async function loadWorldNewsIndex() {
  try {
    const res = await fetch('/api/tagged-posts/tag/world news');
    const data = await res.json();

    const newsItems = Array.isArray(data) ? data : data.posts || data.data || [];

    const container = document.getElementById('world-news-index');
    if (!container) return;

    container.innerHTML = '';

    if (newsItems.length === 0) {
      container.innerHTML = '<p>No world news found.</p>';
      return;
    }

    const news = newsItems[0]; // only show one

    const imgSrc = news.image?.startsWith('/uploads')
      ? `http://localhost:5000${news.image}`
      : news.image || './image/default-placeholder.png';

    const card = document.createElement('div');
    card.className = 'world-news';

    card.innerHTML = `
      <img src="${imgSrc}" alt="World News Image">
      <p>
        <a href="world-news-detail.html?id=${news._id}" style="text-decoration: none; color: inherit;">
          ${news.title}
        </a>
      </p>
      <small>${new Date(news.date).toLocaleDateString('en-GB')}</small>
      <div class="author">By: ${news.author || 'Mining Discovery'}</div>
      <a href="world-news-detail.html?id=${news._id}" class="more-btn">
        More
        <svg viewBox="0 0 24 24">
          <path d="M10 6l6 6-6 6" />
        </svg>
      </a>
    `;

    container.appendChild(card);
  } catch (error) {
    console.error('Error loading World News on index:', error);
    document.getElementById('world-news-index').innerHTML = '<p>Failed to load news.</p>';
  }
}

// ==== Load Corporate News on Index Page ====
async function loadCorporateNewsIndex() {
  const container = document.getElementById('corporateNewsCards');
  if (!container) return;

  try {
    const res = await fetch('/api/tagged-posts/tag/corporate news');
    const data = await res.json();
    const latestNews = data.reverse().slice(0, 3); // latest 3

    container.innerHTML = ''; // Clear any existing content

    latestNews.forEach(news => {
      const card = document.createElement('div');
      card.className = 'card-news';

      card.innerHTML = `
        <p>
          <a href="corporate-news-detail.html?id=${news._id}" style="text-decoration: none; color: inherit;">
            ${news.title}
          </a>
        </p>
        <small>${new Date(news.date).toLocaleDateString('en-GB')}</small><br>
        <div class="author">By: ${news.author || 'Mining Discovery'}</div>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error('Error loading corporate news on index:', error);
    container.innerHTML = '<p>Error loading news.</p>';
  }
}

// ===== FETCH ANNOUNCEMENTS FOR HOMEPAGE =====
async function fetchHomepageAnnouncements() {
  try {
    const tag = 'announcement';
    const res = await fetch(`/api/tagged-posts/tag/${encodeURIComponent(tag)}`);
    const announcements = await res.json();

    const list = document.getElementById('announcementList');
    list.innerHTML = '';

    if (!Array.isArray(announcements) || announcements.length === 0) {
      list.innerHTML = '<li>No announcements available.</li>';
      return;
    }

    announcements.slice(0, 5).forEach((item, index) => {
      const li = document.createElement('li');
      if (index === 1) li.classList.add('highlight-box');

      li.innerHTML = `<a href="announcement-detail.html?id=${item._id}">${item.title}</a>`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error('Error loading announcements on homepage:', err);
    document.getElementById('announcementList').innerHTML = '<li>Error loading announcements.</li>';
  }
}

// for fetching 2 latest magazines
async function fetchLatestMagazines() {
  try {
    const response = await fetch('/api/magazines');
    const data = await response.json();

    // Display the two latest magazines
    const [mag1, mag2] = data.slice(0, 2);

    if (mag1) {
      document.getElementById('magazineBox1').innerHTML = `
          <div class="magazine-card">
            <img src="${mag1.coverImage}" alt="Cover Image" style="width:100%; height:auto;">
            <p>${mag1.month}</p>
            <a href="${mag1.pdf}" target="_blank">Read PDF</a>
          </div>
        `;
    }

    if (mag2) {
      document.getElementById('magazineBox2').innerHTML = `
          <div class="magazine-card">
            <img src="${mag2.coverImage}" alt="Cover Image" style="width:100%; height:auto;">
            <p>${mag2.month}</p>
            <a href="${mag2.pdf}" target="_blank">Read PDF</a>
          </div>
        `;
    }

  } catch (err) {
    console.error('Error fetching magazines:', err);
  }
}


// ===== MENU TOGGLE =====
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav?.classList.toggle("show");
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready. Loading banners and advertisements...');
  loadBanners();
  fetchCompanyNews();
  loadLatestNewsSidebar();
  loadAdvertisements('advertisementSection');   // First instance
  loadAdvertisements('advertisementSection2');  // Second instance
  fetchSponsoredPostsForIndex();
  fetchTaggedNews('precious metal', 'precious-metals-container', 'precious-metal-detail.html');
  loadWorldNewsIndex();
  loadCorporateNewsIndex();
  fetchHomepageAnnouncements();
  fetchLatestMagazines();
});
