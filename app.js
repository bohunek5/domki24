/**
 * DOMKI MAZURY 24 - Core Application Logic
 * Fast, lightweight, zero third-party dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Drawer Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileNavClose = document.querySelector('.mobile-nav-close');

  if (menuToggle && mobileNavOverlay) {
    menuToggle.addEventListener('click', () => {
      mobileNavOverlay.classList.add('open');
    });

    if (mobileNavClose) {
      mobileNavClose.addEventListener('click', () => {
        mobileNavOverlay.classList.remove('open');
      });
    }

    mobileNavOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavOverlay.classList.remove('open');
      });
    });
  }

  // 2. Theme Switcher (Dark / Light Mode)
  const savedTheme = localStorage.getItem('mazury-theme');
  const themeBtn = document.querySelector('.theme-btn');
  
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    if (themeBtn) themeBtn.textContent = '☀️';
  } else {
    if (themeBtn) themeBtn.textContent = '🌙';
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const isDark = document.body.classList.contains('dark-theme');
      localStorage.setItem('mazury-theme', isDark ? 'dark' : 'light');
      themeBtn.textContent = isDark ? '☀️' : '🌙';
    });
  }

  // 3. Multi-Language Switcher
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

  // 4. Hero Background Carousel Slider
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    let currentIdx = 0;
    setInterval(() => {
      heroSlides[currentIdx].classList.remove('active');
      currentIdx = (currentIdx + 1) % heroSlides.length;
      heroSlides[currentIdx].classList.add('active');
    }, 4500);
  }

  // 5. Interactive Price & Stay Calculator
  const calcNights = document.getElementById('calc-nights-input');
  const calcGuests = document.getElementById('calc-guests-input');
  const calcSpa = document.getElementById('calc-spa-checkbox');
  const totalDisplay = document.getElementById('calc-total-display');

  if (calcNights && totalDisplay) {
    const updateCalculator = () => {
      const nights = Math.max(2, parseInt(calcNights.value) || 2);
      const guests = parseInt(calcGuests ? calcGuests.value : 4) || 4;
      const isSpa = calcSpa ? calcSpa.checked : false;

      let cottageRate = 500;
      if (guests > 4) {
        cottageRate = 900;
      }
      
      const spaRate = isSpa ? 150 : 0;
      const grandTotal = (cottageRate + spaRate) * nights;

      totalDisplay.textContent = `${grandTotal} zł`;
    };

    [calcNights, calcGuests, calcSpa].forEach(el => {
      if (el) {
        el.addEventListener('change', updateCalculator);
        el.addEventListener('input', updateCalculator);
      }
    });

    updateCalculator();
  }

  // 6. Booking Form Inquiry Submission
  const bookingForm = document.getElementById('booking-form');
  const toast = document.getElementById('toast-notification');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 5000);
      }
      bookingForm.reset();
    });
  }

  // 7. Gallery Lightbox Modal
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightbox && lightboxImg) {
    document.querySelectorAll('.gallery-masonry-item img, .lightbox-trigger').forEach(img => {
      img.addEventListener('click', () => {
        let fullSrc = img.src.replace('_thumb.webp', '.webp');
        lightboxImg.src = fullSrc;
        lightbox.classList.add('active');
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
      });
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
      }
    });
  }

  // 8. Live Weather for Bogaczewo (Giżycko)
  const tempEl = document.getElementById('weather-temp');
  const iconEl = document.getElementById('weather-icon');
  
  if (tempEl) {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=53.98&longitude=21.75&current_weather=true')
      .then(res => res.json())
      .then(data => {
        if (data && data.current_weather) {
          const temp = Math.round(data.current_weather.temperature);
          tempEl.textContent = `${temp}°C`;
          
          const code = data.current_weather.weathercode;
          let icon = '☀️';
          if (code >= 1 && code <= 3) icon = '⛅';
          if (code >= 45 && code <= 48) icon = '🌫️';
          if (code >= 51 && code <= 67) icon = '🌧️';
          if (code >= 71 && code <= 77) icon = '❄️';
          if (code >= 95) icon = '⛈️';
          if (iconEl) iconEl.textContent = icon;
        }
      })
      .catch(() => {
        if (tempEl) tempEl.textContent = '22°C';
        if (iconEl) iconEl.textContent = '☀️';
      });
  }

});
