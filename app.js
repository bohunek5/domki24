/**
 * DOMKI MAZURY - SCANDINAVIAN LIGHT
 * Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Hamburger Menu Logic
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  
  if (menuToggle && mobileNavOverlay) {
    menuToggle.addEventListener('click', () => {
      mobileNavOverlay.classList.toggle('open');
      // Change icon based on state
      if (mobileNavOverlay.classList.contains('open')) {
        menuToggle.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>';
      } else {
        menuToggle.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>';
      }
    });
  }

  // 2. Sticky Header Shadow on Scroll
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 3. Highlight active link in mobile menu based on current URL
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.mobile-nav-overlay a').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // 4. Calculator Logic (Cennik page)
  const calcCheckin = document.getElementById('calc-checkin');
  const calcNights = document.getElementById('calc-nights');
  const calcGuests = document.getElementById('calc-guests');
  const calcSauna = document.getElementById('calc-sauna');

  if (calcCheckin && calcNights && calcGuests && calcSauna) {
    // Set default checkin date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    calcCheckin.value = tomorrow.toISOString().split('T')[0];

    const updateCalculator = () => {
      const nights = parseInt(calcNights.value) || 1;
      const guestOption = calcGuests.options[calcGuests.selectedIndex];
      const guestsText = guestOption.text;
      const guestsVal = parseInt(guestOption.value);
      
      const isSauna = calcSauna.checked;

      // Base pricing logic (example)
      let pricePerNight = 350; // Standard domek
      let numDomki = 1;
      
      if (guestsVal > 4) {
        pricePerNight = 700; // 2 domki
        numDomki = 2;
      }

      const totalDomekPrice = pricePerNight * nights;
      const saunaPrice = isSauna ? 150 * nights : 0;
      const totalPrice = totalDomekPrice + saunaPrice;

      // Update DOM
      document.getElementById('summary-nights').textContent = `${nights} noc(y) x ${pricePerNight} zł`;
      document.getElementById('summary-guests').textContent = guestsText;
      document.getElementById('summary-sauna').textContent = isSauna ? `${saunaPrice} zł (${nights} dni)` : '0 zł (Brak SPA)';
      document.getElementById('summary-total-amount').textContent = `${totalPrice} zł`;
    };

    [calcCheckin, calcNights, calcGuests, calcSauna].forEach(el => {
      el.addEventListener('change', updateCalculator);
      el.addEventListener('input', updateCalculator);
    });

    updateCalculator(); // init
  }

  // 5. OpenMeteo Weather for Bogaczewo (Strona Główna / O Nas)
  const weatherWidget = document.getElementById('weather-widget-box');
  if (weatherWidget) {
    // Coordinates for Giżycko / Bogaczewo approx: 53.98, 21.75
    fetch('https://api.open-meteo.com/v1/forecast?latitude=53.98&longitude=21.75&current_weather=true')
      .then(res => res.json())
      .then(data => {
        if (data && data.current_weather) {
          const temp = Math.round(data.current_weather.temperature);
          document.getElementById('weather-temp').textContent = `${temp}°C`;
          // Simple icon logic based on weathercode
          const code = data.current_weather.weathercode;
          let icon = '☀️';
          if (code >= 1 && code <= 3) icon = '⛅';
          if (code >= 45 && code <= 48) icon = '🌫️';
          if (code >= 51 && code <= 67) icon = '🌧️';
          if (code >= 71 && code <= 77) icon = '❄️';
          if (code >= 95) icon = '⛈️';
          document.getElementById('weather-icon').textContent = icon;
        }
      })
      .catch(err => {
        console.error('Weather fetch error:', err);
        weatherWidget.style.display = 'none';
      });
  }

  // 6. Lightbox Gallery
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  if (lightbox && lightboxImg) {
    document.querySelectorAll('.gallery-item img').forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
      });
    });

    document.getElementById('lightbox-close').addEventListener('click', () => {
      lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  }

  // 7. Theme Toggle (Day/Night)
  const savedTheme = localStorage.getItem('mazury-theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }

  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('mazury-theme', 'dark');
      } else {
        localStorage.setItem('mazury-theme', 'light');
      }
    });
  });

  // 8. Language Switcher Initialization
  const savedLang = localStorage.getItem('mazury-lang') || 'pl';
  if (typeof applyTranslations === 'function') {
    applyTranslations(savedLang);
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.currentTarget.getAttribute('data-lang');
        applyTranslations(lang);
      });
    });
  }

  // 9. Hero Slider Crossfade
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    let currentSlide = 0;
    setInterval(() => {
      heroSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
    }, 5000);
  }

});
