const translations = {
  pl: {
    "nav-home": "Strona Główna",
    "nav-cottages": "Domki",
    "nav-spa": "Sauna & Balia",
    "nav-about": "O Nas",
    "nav-gallery": "Galeria",
    "nav-attractions": "Atrakcje",
    "nav-prices": "Cennik",
    "nav-contact": "Kontakt",
    "btn-book": "Zarezerwuj",
    "btn-prices": "Sprawdź Ceny",
    
    "hero-badge": "Bogaczewo k. Giżycka",
    "hero-title": "Miejsce Stworzone do Odpoczynku",
    "hero-desc": "Nowoczesne domki, balia z podgrzewaną wodą, sauna fińska i otulina mazurskiej natury. Zaledwie 1000m od plaży na Szlaku Wielkich Jezior.",
    "hero-btn-domki": "Zobacz Domki",
    "hero-btn-spa": "Strefa SPA"
  },
  en: {
    "nav-home": "Home",
    "nav-cottages": "Cottages",
    "nav-spa": "Sauna & Hot Tub",
    "nav-about": "About Us",
    "nav-gallery": "Gallery",
    "nav-attractions": "Attractions",
    "nav-prices": "Pricing",
    "nav-contact": "Contact",
    "btn-book": "Book Now",
    "btn-prices": "Check Prices",

    "hero-badge": "Bogaczewo near Giżycko",
    "hero-title": "A Place Designed for Rest",
    "hero-desc": "Modern cottages, heated hot tub, Finnish sauna, and the embrace of Masurian nature. Just 1000m from the beach on the Great Lakes Trail.",
    "hero-btn-domki": "View Cottages",
    "hero-btn-spa": "SPA Zone"
  },
  de: {
    "nav-home": "Startseite",
    "nav-cottages": "Häuser",
    "nav-spa": "Sauna & Badefass",
    "nav-about": "Über Uns",
    "nav-gallery": "Galerie",
    "nav-attractions": "Attraktionen",
    "nav-prices": "Preise",
    "nav-contact": "Kontakt",
    "btn-book": "Buchen",
    "btn-prices": "Preise prüfen",

    "hero-badge": "Bogaczewo bei Lötzen",
    "hero-title": "Ein Ort für Ihre Erholung",
    "hero-desc": "Moderne Häuser, beheiztes Badefass, finnische Sauna und die Masuren-Natur. Nur 1000m vom Strand der Großen Masurischen Seen entfernt.",
    "hero-btn-domki": "Häuser ansehen",
    "hero-btn-spa": "SPA-Bereich"
  }
};

function applyTranslations(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update active flag state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    }
  });

  localStorage.setItem('mazury-lang', lang);
}

// Initialization of language logic is handled in app.js
