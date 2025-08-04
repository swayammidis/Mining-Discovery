// ===== SUBSCRIBE BUTTON POPUP =====
const popup = document.getElementById('subscribe-popup');
const overlay = document.getElementById('overlay');
const openBtn = document.getElementById('open-subscribe');
const submitBtn = document.getElementById('submit-subscribe');
const statusMsg = document.getElementById('status-msg');
const emailInput = document.getElementById('email-input');

if (openBtn) {
  openBtn.addEventListener('click', () => {
    popup.style.display = 'block';
    overlay.style.display = 'block';
  });
}

if (overlay) {
  overlay.addEventListener('click', closePopup);
}

function closePopup() {
  if (popup) popup.style.display = 'none';
  if (overlay) overlay.style.display = 'none';
  if (emailInput) emailInput.value = '';
  if (statusMsg) statusMsg.textContent = '';
}

if (submitBtn) {
  submitBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    if (!email) {
      statusMsg.textContent = 'Please enter an email.';
      statusMsg.style.color = 'red';
      return;
    }

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      statusMsg.textContent = data.message;
      statusMsg.style.color = res.ok ? '#80ff80' : 'red';

      if (res.ok) setTimeout(closePopup, 2000);
    } catch (err) {
      statusMsg.textContent = 'Something went wrong.';
      statusMsg.style.color = 'red';
    }
  });
}

// ===== DROPDOWN TOGGLE =====
function toggleDropdown() {
  const dropdown = document.getElementById("dropdownMenu");
  const header = document.getElementById("newsToggle");
  dropdown?.classList.toggle("show");
  header?.classList.toggle("rotate");
}

// ===== LOAD BANNERS =====
async function loadBanners() {
  try {
    const res = await fetch('/api/banners/latest');
    const data = await res.json();
    console.log('Banner API response:', data);

    const container = document.getElementById('bannerContainer');
    if (!container) return;

    container.innerHTML = '';

    if (!res.ok || !Array.isArray(data) || data.length === 0) {
      container.innerHTML = '<p>No banners available.</p>';
      return;
    }

    const bannersToShow = data.slice(0, 5);

    bannersToShow.forEach((banner, index) => {
      const imageUrl = banner.image;

      const adDiv = document.createElement('div');
      adDiv.className = 'left-ad';

      if (imageUrl && imageUrl.startsWith('data:image')) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = banner.alt || `Banner ${index + 1}`;
        img.className = 'logo-img';

        adDiv.appendChild(img);
      } else {
        adDiv.innerHTML = '<p>Invalid image</p>';
      }

      container.appendChild(adDiv);
    });
  } catch (err) {
    console.error('Failed to load banners:', err);
    const container = document.getElementById('bannerContainer');
    if (container) container.innerHTML = '<p>Error loading banners.</p>';
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

async function loadLatestNewsSidebar() {
  try {
    const res = await fetch('/api/tagged-posts/tag/' + encodeURIComponent('latest news'));
    const data = await res.json();

    // ✅ Use correct ID
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

      const date = new Date(news.date).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'long', year: 'numeric'
      });

      const meta = document.createElement('p');
      meta.className = 'date';
      meta.innerHTML = `${date} <span class="author">By: ${news.by || 'Anonymous'}</span>`;

      latestItem.appendChild(title);
      latestItem.appendChild(meta);
      container.appendChild(latestItem);
    });
  } catch (error) {
    console.error('Error loading latest news for sidebar:', error);
    const container = document.getElementById('latest-news-list'); // match this too
    if (container) {
      container.innerHTML = '<p>Error loading latest news.</p>';
    }
  }
}

// ✅ Load Advertisements
async function loadAdvertisements() {
  try {
    const res = await fetch('/api/ads');
    const ads = await res.json();
    const adSection = document.getElementById('advertisementSection');
    if (!adSection) return;

    if (!ads || ads.length === 0) {
      adSection.innerHTML = '<p>No advertisements available.</p>';
      return;
    }

    adSection.innerHTML = '';

    ads.forEach(ad => {
      const img = document.createElement('img');

      if (ad.image.startsWith('data:image')) {
        img.src = ad.image;
      } else if (ad.image.startsWith('http')) {
        img.src = ad.image;
      } else {
        img.src = `/uploads/${ad.image}`;
      }

      img.alt = 'Advertisement';

      if (ad.link) {
        const a = document.createElement('a');
        a.href = ad.link;
        a.target = '_blank';
        a.appendChild(img);
        adSection.appendChild(a);
      } else {
        adSection.appendChild(img);
      }
    });
  } catch (err) {
    console.error('Error loading ads:', err);
  }
}

// for fetching sponsored posts
 async function fetchSponsoredPostsForIndex() {
    try {
      const res = await fetch('/api/tagged-posts/tag/sponsored posts');
      const posts = await res.json();

      if (!posts.length) return;

      const featured = posts[0];
      const gridPosts = posts.slice(1, 5); // show up to 4 in grid

      // 🔸 FEATURED POST
      const featuredContainer = document.getElementById("featuredSponsoredPost");
      featuredContainer.innerHTML = `
        <div class="sec1">
          <img src="${featured.image}" alt="Sponsored Image" />
        </div>
        <div class="sec2">
          <span class="tag">SPONSORED POST</span>
          <p class="post-text">${featured.description.replace(/<[^>]*>?/gm, '').slice(0, 400)}...</p>
          <a href="sponsored-detail.html?id=${featured._id}">
            <button class="btn-more">More <i class="fas fa-angle-right"></i></button>
          </a>
        </div>
      `;

      // 🔸 GRID CARDS
      const gridContainer = document.getElementById("gridSponsoredPosts");
      gridContainer.innerHTML = ''; // clear before rendering
      gridPosts.forEach(post => {
        const card = document.createElement("div");
        card.classList.add("card1");
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

// Generic Tagged News Fetcher (for precious metals news)
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

      data.slice(0, 3).forEach(news => {
        const card = document.createElement('div');
        card.className = 'precious-metals'; // Make sure this class exists in your CSS

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
      });
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

      newsItems.slice(0, 3).forEach(news => {
        const card = document.createElement('div');
        card.className = 'world-news'; // use your existing styles

        const imgSrc = news.image?.startsWith('/uploads')
          ? `http://localhost:5000${news.image}`
          : news.image || './default.jpg';

        card.innerHTML = `
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
      });
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

// ===== MENU TOGGLE =====
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav?.classList.toggle("show");
}

// ===== SWIPER INITIALIZATION & DATA LOAD =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready. Loading banners and company news...');
  loadBanners();
  fetchCompanyNews();
  loadLatestNewsSidebar();
  loadAdvertisements();
  fetchSponsoredPostsForIndex();
  fetchTaggedNews('precious metal', 'precious-metals-container', 'precious-metal-detail.html');
  loadWorldNewsIndex();
  loadCorporateNewsIndex();
  fetchHomepageAnnouncements(); // ✅ This now loads linked announcement titles


  if (typeof Swiper !== 'undefined') {
    new Swiper(".mySwiper", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        }
      }
    });
  } else {
    console.warn('Swiper is not defined. Please ensure Swiper JS is loaded.');
  }

  // Modal logic
  const modal = document.getElementById("flipbookModal");
  const closeBtn = document.getElementById("closeModal");

  if (closeBtn && modal) {
    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (e) => {
      if (e.target === modal) modal.style.display = "none";
    };
  }
});
