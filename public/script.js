function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("show");
}



const swiper = new Swiper(".mySwiper", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 10, // ↓ Reduce gap between slides
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

const modal = document.getElementById("flipbookModal");
const closeBtn = document.getElementById("closeModal");

function openModal() {
  modal.style.display = "flex";
}

closeBtn.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

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

// for fetching flipbook on frontend

  async function loadFlipbooks() {
    const container = document.getElementById('flipbook-container');

    try {
      const res = await fetch('/api/flipbooks');

      if (!res.ok) {
        throw new Error(`Failed to fetch flipbooks: ${res.status} ${res.statusText}`);
      }

      const flipbooks = await res.json();
      console.log('✅ Flipbooks fetched:', flipbooks);

      if (!flipbooks || !flipbooks.length) {
        container.innerHTML = '<p>No flipbooks found.</p>';
        return;
      }

      container.innerHTML = ''; // Clear previous content

      flipbooks.forEach(flip => {
        const card = document.createElement('div');
        card.className = 'swiper-slide';
        card.innerHTML = `
          <div class="newsletter-card">
            <div class="newsletter-header">
              <img src="${flip.imageUrl}" alt="Flipbook Cover" style="width: 100%; height: auto; object-fit: cover;" />
              <div class="newsletter-meta">
                <strong>${flip.title}</strong>
                <p>by Mining Discovery</p>
                <small>${new Date(flip.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</small>
              </div>
            </div>
            <button class="open-btn" onclick="window.open('/api/flipbooks/pdf/${flip._id}', '_blank')">Open Flipbook</button>
          </div>
        `;
        container.appendChild(card);
      });

      // 🧼 Destroy existing Swiper if it already exists
      if (window.mySwiperInstance) {
        window.mySwiperInstance.destroy(true, true);
      }

      // ✅ Initialize Swiper after DOM updates
      window.mySwiperInstance = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        breakpoints: {
          320: { slidesPerView: 1 },
          576: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          992: { slidesPerView: 2.5 },
          1200: { slidesPerView: 3 },
          1400: { slidesPerView: 4 }
        }
      });

    } catch (err) {
      console.error('❌ Flipbook Fetch Error:', err);
      container.innerHTML = '<p style="color:red">Failed to load flipbooks.</p>';
    }
  }

  window.addEventListener('DOMContentLoaded', loadFlipbooks);
