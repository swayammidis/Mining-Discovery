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
  function loadIframe2(el){
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



// ✅ Load Sidebar Banners
async function loadBanners() {
  try {
    const res = await fetch('/api/banners/latest');
    const data = await res.json();
    const container = document.getElementById('bannerContainer');
    if (!container) return;

    container.innerHTML = '';

    if (!Array.isArray(data) || data.length === 0) {
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

async function loadTopBannerAd() {
  try {
    const res = await fetch('/api/ads/top'); // or '/api/ads' if using same endpoint
    const ad = await res.json();
    const topBanner = document.getElementById('topBannerContainer');
    if (!topBanner) return;

    topBanner.innerHTML = '';

    let img = document.createElement('img');

    if (ad.image.startsWith('data:image')) {
      img.src = ad.image;
    } else if (ad.image.startsWith('http')) {
      img.src = ad.image;
    } else {
      img.src = `/uploads/${ad.image}`;
    }

    img.style.width = '100%';
    img.style.maxHeight = '400px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '10px';

    if (ad.link) {
      const a = document.createElement('a');
      a.href = ad.link;
      a.target = '_blank';
      a.appendChild(img);
      topBanner.appendChild(a);
    } else {
      topBanner.appendChild(img);
    }

  } catch (err) {
    console.error('Error loading top banner ad:', err);
    const topBanner = document.getElementById('topBannerContainer');
    topBanner.innerHTML = '<p>Error loading banner ad.</p>';
  }
}




// ✅ Load Main Company News
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

// ✅ Load Right Sidebar Latest News
async function loadLatestNews() {
  try {
    const res = await fetch('/api/news/latest');
    const data = await res.json();
    const container = document.getElementById('latestNewsContainer');
    if (!container) return;

    container.innerHTML = '';

    if (!Array.isArray(data) || data.length === 0) {
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
        day: '2-digit', month: 'long', year: 'numeric'
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

 
     async function loadSponsoredPosts() {
      try {
        const res = await fetch('/api/sponsored');
        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
          console.warn('No sponsored posts found.');
          return;
        }

        const top = data[0];
        const others = data.slice(1, 5);

        // Top Card
        const topPostContainer = document.getElementById('topSponsoredPost');
        topPostContainer.innerHTML = `
          <div class="sec1">
            <img src="${top.image || './image/placeholder.png'}" alt="Sponsored Image" />
          </div>
          <div class="sec2">
            <span class="tag">SPONSORED POST</span>
            <p class="post-text">${top.description.slice(0, 300)}...</p>
            <button class="btn-more" onclick="location.href='sponsored-detail.html?id=${top._id}'">More</button>
          </div>
        `;

        // Remaining 4 Cards
        const cardsContainer = document.getElementById('sponsoredCards');
        others.forEach(post => {
          const card = document.createElement('div');
          card.className = 'card1';
          card.innerHTML = `
            <img src="${post.image || './image/placeholder.png'}" alt="Sponsored Image" />
            <span class="tag-post">SPONSORED POST</span>
            <h4>${post.title}</h4>
            <button class="btn-more" onclick="location.href='sponsored-detail.html?id=${post._id}'">More</button>
          `;
          cardsContainer.appendChild(card);
        });

      } catch (err) {
        console.error('Error fetching sponsored posts:', err);
      }
    }

   
// ✅ Run All on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  loadBanners();
  loadLatestNews();
  fetchCompanyNews();
  loadAdvertisements();
  loadSponsoredPosts();
});
