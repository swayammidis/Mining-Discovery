
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


  // Fetch and render latest news
  async function loadLatestNews() {
    try {
      const res = await fetch('/api/news/latest');
      const data = await res.json();
      const container = document.getElementById('latestNewsContainer');

      if (!container) return;

      if (!res.ok || !Array.isArray(data) || data.length === 0) {
        container.innerHTML = '<p>No latest news available.</p>';
        return;
      }

      container.innerHTML = ''; // clear previous content

      data.forEach(news => {
        const card = document.createElement('div');
        card.className = 'news-card';

        const link = document.createElement('a');
        link.href = `view-news.html?id=${news._id}`;
        link.className = 'news-title';
        link.textContent = news.title;

        const date = new Date(news.date);
        const formattedDate = date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        });

        const meta = document.createElement('p');
        meta.className = 'news-meta';
        meta.innerHTML = `${formattedDate} &nbsp; <b>By:</b> ${news.by}`;

        card.appendChild(link);
        card.appendChild(meta);

        container.appendChild(card);
      });
    } catch (error) {
      console.error('Error loading latest news:', error);
    }
  }

  // Fetch and render company news
  async function loadCompanyNews() {
    try {
      const res = await fetch('/api/company/latest');
      const data = await res.json();
      const container = document.getElementById('companyNewsContainer');

      if (!container) return;

      if (!res.ok || !Array.isArray(data)) {
        container.innerHTML = '<p>No company news available.</p>';
        return;
      }

      container.innerHTML = ''; // clear previous content

      data.forEach(news => {
        const card = document.createElement('div');
        card.className = 'company-news-card';
        card.innerHTML = `
          <img src="${news.image || '/images/default.jpg'}" alt="Company News Image" />
          <div class="news-content">
            <h4>
              <a href="view-companynews.html?id=${news._id}" class="news-title-link">
                ${news.title}
              </a>
            </h4>
            <p class="meta">${formatDate(news.date)}</p>
            <p class="meta">By: ${news.by}</p>
          </div>
        `;
        container.appendChild(card);
      });
    } catch (err) {
      console.error('Failed to load company news:', err);
    }
  }

  // Format date helper
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  // Load both sections on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    loadLatestNews();
    loadCompanyNews();
  });
