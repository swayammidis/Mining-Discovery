
const searchInput = document.getElementById("searchInput");
const texts = ["Search...", "Search Articles", "Search Insights", "Search Services"];
let index = 0;

function changePlaceholder() {
  searchInput.setAttribute("placeholder", texts[index]);

  // Reset animation
  searchInput.classList.remove("animate-placeholder");
  void searchInput.offsetWidth; // Trigger reflow
  searchInput.classList.add("animate-placeholder");

  index = (index + 1) % texts.length;
}

// Add class to trigger animation again
const style = document.createElement('style');
style.innerHTML = `
  #searchInput.animate-placeholder::placeholder {
    opacity: 0;
    transform: translateY(20px);
    animation: slideInBottom 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);

// Start loop
changePlaceholder();
setInterval(changePlaceholder, 2500);



// for subscribe button 

const popup = document.getElementById('subscribe-popup');
const overlay = document.getElementById('overlay');
const openBtn = document.getElementById('open-subscribe');
const submitBtn = document.getElementById('submit-subscribe');
const statusMsg = document.getElementById('status-msg');
const emailInput = document.getElementById('email-input');

openBtn.addEventListener('click', () => {
  popup.style.display = 'block';
  overlay.style.display = 'block';
});

overlay.addEventListener('click', closePopup);

function closePopup() {
  popup.style.display = 'none';
  overlay.style.display = 'none';
  emailInput.value = '';
  statusMsg.textContent = '';
}

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

    if (res.ok) {
      setTimeout(closePopup, 2000);
    }
  } catch (err) {
    statusMsg.textContent = 'Something went wrong.';
    statusMsg.style.color = 'red';
  }
});

// for news section dropdown menu

function toggleDropdown() {
  const dropdown = document.getElementById("dropdownMenu");
  const header = document.getElementById("newsToggle");
  dropdown.classList.toggle("show");
  header.classList.toggle("rotate");
}


// ✅ Load Banners
async function loadBanners() {
  try {
    const res = await fetch('/api/banners/latest');
    const data = await res.json();
    const container = document.getElementById('bannerContainer');
    if (!container) return;

    container.innerHTML = '';

    if (!res.ok || !Array.isArray(data) || data.length === 0) {
      container.innerHTML = '<p>No banners available.</p>';
      return;
    }

    data.forEach(banner => {
      const card = document.createElement('div');
      card.className = 'banner-card';

      const imageUrl = banner.image;
      if (imageUrl && imageUrl.startsWith('data:image')) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Banner';
        img.style = 'max-width: 100%; height: auto; margin-bottom: 10px; display: block; border-radius: 8px;';
        card.appendChild(img);
      } else {
        card.innerHTML = '<p>Invalid image</p>';
      }

      container.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to load banners:', err);
    const container = document.getElementById('bannerContainer');
    if (container) {
      container.innerHTML = '<p>Error loading banners.</p>';
    }
  }
}

// ✅ Load Latest News
async function loadLatestNews() {
  try {
    const res = await fetch('/api/news/latest');
    const data = await res.json();
    const container = document.getElementById('latestNewsContainer');
    if (!container) return;

    container.innerHTML = '';

    if (!res.ok || !Array.isArray(data) || data.length === 0) {
      container.innerHTML = '<p>No latest news available.</p>';
      return;
    }

    data.forEach(news => {
      const card = document.createElement('div');
      card.className = 'news-card';

      const link = document.createElement('a');
      link.href = `view-news.html?id=${news._id}`;
      link.className = 'news-title';
      link.textContent = news.title;

      const date = new Date(news.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });

      const meta = document.createElement('p');
      meta.className = 'news-meta';
      meta.innerHTML = `${date} &nbsp; <b>By:</b> ${news.by}`;

      card.appendChild(link);
      card.appendChild(meta);
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading latest news:', error);
  }
}

// ✅ Load Center Company News
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

    const formatDate = (dateStr) =>
      new Date(dateStr).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'long', year: 'numeric'
      });

    const stripHTML = (html) => html.replace(/<[^>]*>/g, '');

    mainContainer.innerHTML = `
      <div class="news-center-card">
        <img src="${mainNews.image}" alt="News Image" class="main-news-image">
        <div class="news-content">
          <a href="/company-news.html?id=${mainNews._id}" class="main-news-title">${mainNews.title}</a>
          <p class="meta">${formatDate(mainNews.date)} | By ${mainNews.author || 'Admin'}</p>
          <p class="main-news-description">${stripHTML(mainNews.description).slice(0, 350)}...</p>
          <a class="read-more" href="/company-news.html?id=${mainNews._id}">Read Full News →</a>
        </div>
      </div>
    `;
  } catch (err) {
    console.error('Error loading company news:', err);
    const main = document.getElementById('main-news');
    if (main) main.innerHTML = "<p style='padding: 20px;'>Error loading company news.</p>";
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

      // Detect if image is base64, external, or local
      if (ad.image.startsWith('data:image')) {
        img.src = ad.image;
      } else if (ad.image.startsWith('http')) {
        img.src = ad.image;
      } else {
        img.src = `/uploads/${ad.image}`;
      }

      img.alt = 'Advertisement';
      img.style.margin = '10px auto';
      img.style.display = 'block';
      img.style.maxWidth = '100%';
      img.style.borderRadius = '6px';
      img.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';

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

// ✅ Run All on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  loadBanners();
  loadLatestNews();
  fetchCompanyNews();
  loadAdvertisements();
});


// ✅ Fetch and display top 2 magazines (flipbooks)
async function loadTopMagazines() {
  try {
    const res = await fetch('/api/flipbooks/top2');
    const magazines = await res.json();
    const magazineSection = document.getElementById('topMagazines');

    if (!magazineSection) return;

    magazineSection.innerHTML = '';

    if (!Array.isArray(magazines) || magazines.length === 0) {
      magazineSection.innerHTML = '<p>No magazines available.</p>';
      return;
    }

    magazines.forEach(mag => {
      const card = document.createElement('div');
      card.className = 'magazine-card';
      card.innerHTML = `
        <div class="magazine-image-wrapper">
          <img src="${mag.imageUrl}" alt="${mag.title}" class="magazine-thumbnail"/>
        </div>
        <div class="magazine-info">
          <h4>${mag.title}</h4>
          <a href="${mag.pdfUrl}" target="_blank" class="view-pdf-btn">View PDF</a>
        </div>
      `;
      magazineSection.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to load top magazines:', err);
  }
}

// ✅ Call it on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  loadTopMagazines();
});
