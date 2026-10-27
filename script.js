const formatPrice = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

const state = {
  selectedCategory: 'All',
  sortBy: 'featured',
  query: '',
  minPrice: 50,
  maxPrice: 400,
  testimonialIndex: 0
};

const hasStorefrontData = typeof products !== 'undefined' && Array.isArray(products);

const categoryListEl = document.getElementById('category-list');
const featuredGridEl = document.getElementById('featured-grid');
const productGridEl = document.getElementById('product-grid');
const noProductsEl = document.getElementById('no-products');
const testimonialTrackEl = document.getElementById('testimonial-track');
const modalEl = document.getElementById('product-modal');
const modalContentEl = document.getElementById('modal-content');
const yearEl = document.getElementById('year');
const searchInputs = document.querySelectorAll('.search-input');
const priceMinEl = document.getElementById('price-min');
const priceMaxEl = document.getElementById('price-max');
const minPriceLabel = document.getElementById('min-price-label');
const maxPriceLabel = document.getElementById('max-price-label');
const sortSelectEl = document.getElementById('sort-products');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const heroSection = document.querySelector('.hero');

function initializeHeroBackground() {
  if (!heroSection || !Array.isArray(localGalleryImages) || !localGalleryImages.length) return;

  const heroImages = localGalleryImages.slice(0, 8);
  let heroImageIndex = 0;

  const updateHeroBackground = () => {
    const image = heroImages[heroImageIndex].replace(/\s/g, '%20');
    heroSection.style.backgroundImage = `linear-gradient(135deg, rgba(18, 61, 66, 0.15), rgba(18, 61, 66, 0.05)), url("${image}")`;
    heroImageIndex = (heroImageIndex + 1) % heroImages.length;
  };

  updateHeroBackground();
  setInterval(updateHeroBackground, 4000);
}

function getCategories() {
  if (!hasStorefrontData) return ['All'];
  return ['All', ...new Set(products.map(product => product.category))];
}

function getStockInfo(stock) {
  if (stock > 0) return { label: `In Stock`, isSoldOut: false };
  return { label: 'Sold Out', isSoldOut: true };
}

function renderCategories() {
  if (!categoryListEl) return;

  categoryListEl.innerHTML = '';
}

function renderFeaturedProducts() {
  if (!featuredGridEl) return;

  const featured = products.filter(product => product.featured).slice(0, 4);
  featuredGridEl.innerHTML = featured.map(product => {
    const stockInfo = getStockInfo(product.stock);
    return `
      <article class="product-card">
        <img src="${product.image}" alt="${product.name}" />
        <div class="product-body">
          <div class="product-meta">
            <span class="product-tag ${stockInfo.isSoldOut ? 'sold-out' : ''}">${stockInfo.label}</span>
            <span>${product.category}</span>
          </div>
          <h3>${product.name}</h3>
          <div class="product-price">
            <span class="price">${formatPrice(product.price)}</span>
          </div>
          <div class="product-actions">
            <button class="button button-primary" data-open-product="${product.id}">View Details</button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  featuredGridEl.querySelectorAll('[data-open-product]').forEach(button => {
    button.addEventListener('click', () => openProductModal(button.dataset.openProduct));
  });
}

function getFilteredProducts() {
  let filtered = [...products];

  if (state.selectedCategory !== 'All') {
    filtered = filtered.filter(product => product.category === state.selectedCategory);
  }

  if (state.query) {
    const query = state.query.toLowerCase();
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }

  filtered = filtered.filter(product => product.price >= state.minPrice && product.price <= state.maxPrice);

  if (state.sortBy === 'low-high') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'high-low') {
    filtered.sort((a, b) => b.price - a.price);
  } else {
    filtered.sort((a, b) => Number(b.featured) - Number(a.featured));
  }

  return filtered;
}

function renderProducts() {
  if (!productGridEl) return;

  const filteredProducts = getFilteredProducts();

  if (!filteredProducts.length) {
    productGridEl.innerHTML = '';
    noProductsEl.hidden = false;
    return;
  }

  noProductsEl.hidden = true;
  productGridEl.innerHTML = filteredProducts.map(product => {
    const stockInfo = getStockInfo(product.stock);
    return `
      <article class="product-card">
        <img src="${product.image}" alt="${product.name}" />
        <div class="product-body">
          <div class="product-meta">
            <span class="product-tag ${stockInfo.isSoldOut ? 'sold-out' : ''}">${stockInfo.label}</span>
            <span>${product.category}</span>
          </div>
          <h3>${product.name}</h3>
          <div class="product-price">
            <span class="price">${formatPrice(product.price)}</span>
            <span>${product.stock > 0 ? `${product.stock} left` : 'Unavailable'}</span>
          </div>
          <div class="product-actions">
            <button class="button button-primary" data-open-product="${product.id}">View Details</button>
            <button class="button ghost" data-product-id="${product.id}" data-quick-whatsapp="${product.id}">WhatsApp</button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  productGridEl.querySelectorAll('[data-open-product]').forEach(button => {
    button.addEventListener('click', () => openProductModal(button.dataset.openProduct));
  });

  productGridEl.querySelectorAll('[data-quick-whatsapp]').forEach(button => {
    button.addEventListener('click', () => openWhatsAppForProduct(button.dataset.quickWhatsapp));
  });
}

function renderTestimonials() {
  if (!testimonialTrackEl) return;

  testimonialTrackEl.innerHTML = testimonials.map((testimonial, index) => `
    <article class="testimonial ${index === 0 ? 'active' : ''}">
      <div class="stars" aria-label="${testimonial.rating} out of 5 stars">${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}</div>
      <p>“${testimonial.text}”</p>
      <div class="testimonial-author">
        <div>
          <div class="author-name">${testimonial.name}</div>
          <div>${testimonial.location}</div>
        </div>
      </div>
    </article>
  `).join('');
}

function setCurrentTestimonial(index) {
  const items = document.querySelectorAll('.testimonial');
  items.forEach((item, itemIndex) => {
    item.classList.toggle('active', itemIndex === index);
  });
}

function nextTestimonial() {
  state.testimonialIndex = (state.testimonialIndex + 1) % testimonials.length;
  setCurrentTestimonial(state.testimonialIndex);
}

function prevTestimonial() {
  state.testimonialIndex = (state.testimonialIndex - 1 + testimonials.length) % testimonials.length;
  setCurrentTestimonial(state.testimonialIndex);
}

function syncSearchInputs(value) {
  searchInputs.forEach(input => {
    if (input.value !== value) input.value = value;
  });
}

function openProductModal(productId) {
  if (!modalEl || !modalContentEl) return;

  const product = products.find(item => item.id === productId);
  if (!product) return;

  const related = products.filter(item => item.id !== product.id).slice(0, 3);
  const reviewMarkup = product.reviews.slice(0, 3).map(review => `
    <div class="review-item">
      <strong>${review.name} • ${review.location}</strong>
      <div class="stars" aria-label="${review.rating} out of 5 stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
      <p>${review.text}</p>
    </div>
  `).join('');

  const relatedMarkup = related.map(item => `
    <article class="related-card" data-related-product="${item.id}">
      <img src="${item.image}" alt="${item.name}" />
      <div class="related-card-body">
        <h4>${item.name}</h4>
        <span>${formatPrice(item.price)}</span>
      </div>
    </article>
  `).join('');

  modalContentEl.innerHTML = `
    <div class="modal-product">
      <div class="modal-gallery">
        ${(product.gallery || [product.image]).slice(0, 4).map(image => `
          <img src="${image}" alt="${product.name}" />
        `).join('')}
      </div>
      <div class="modal-copy">
        <div class="product-meta">
          <span class="product-tag ${product.stock > 0 ? '' : 'sold-out'}">${product.stock > 0 ? 'In Stock' : 'Sold Out'}</span>
          <span>${product.category}</span>
        </div>
        <h2 id="modal-title">${product.name}</h2>
        <div class="modal-meta">
          <div class="modal-price">${formatPrice(product.price)}</div>
          <div>${product.stock > 0 ? `${product.stock} available` : 'Currently unavailable'}</div>
        </div>
        <p>${product.description}</p>
        <div class="modal-actions">
          <a class="button button-primary" href="https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hello, I am interested in buying ${product.name} for ${formatPrice(product.price)}. Is it available?`) }" target="_blank" rel="noreferrer">Order on WhatsApp</a>
          <a class="button button-secondary" href="tel:${siteConfig.phoneNumber.replace(/[^\d+]/g, '')}">Call</a>
        </div>
        <div class="review-list">
          ${reviewMarkup}
        </div>
      </div>
    </div>

    <div class="related-products">
      <h3>Related products</h3>
      <div class="related-grid">
        ${relatedMarkup}
      </div>
    </div>
  `;

  modalEl.classList.add('open');
  modalEl.setAttribute('aria-hidden', 'false');

  modalEl.querySelectorAll('[data-related-product]').forEach(card => {
    card.addEventListener('click', () => openProductModal(card.dataset.relatedProduct));
  });
}

function closeProductModal() {
  if (!modalEl) return;
  modalEl.classList.remove('open');
  modalEl.setAttribute('aria-hidden', 'true');
}

function openWhatsAppForProduct(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  const message = `Hello, I am interested in buying ${product.name} for ${formatPrice(product.price)}. Is it available?`;
  const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
}

function attachEvents() {
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (!hasStorefrontData) return;

  searchInputs.forEach(input => {
    input.addEventListener('input', event => {
      state.query = event.target.value.trim();
      syncSearchInputs(state.query);
      renderProducts();
    });
  });

  document.querySelectorAll('.search-button').forEach(button => {
    button.addEventListener('click', () => {
      const value = document.querySelector('#hero-search')?.value || '';
      syncSearchInputs(value);
      state.query = value.trim();
      renderProducts();
    });
  });

  if (priceMinEl) {
    priceMinEl.addEventListener('input', event => {
      state.minPrice = Number(event.target.value);
      if (state.minPrice > state.maxPrice) {
        state.maxPrice = state.minPrice;
        if (priceMaxEl) priceMaxEl.value = String(state.maxPrice);
      }
      updatePriceLabels();
      renderProducts();
    });
  }

  if (priceMaxEl) {
    priceMaxEl.addEventListener('input', event => {
      state.maxPrice = Number(event.target.value);
      if (state.maxPrice < state.minPrice) {
        state.minPrice = state.maxPrice;
        if (priceMinEl) priceMinEl.value = String(state.minPrice);
      }
      updatePriceLabels();
      renderProducts();
    });
  }

  if (sortSelectEl) {
    sortSelectEl.addEventListener('change', event => {
      state.sortBy = event.target.value;
      renderProducts();
    });
  }

  document.querySelector('.modal-close')?.addEventListener('click', closeProductModal);
  modalEl?.addEventListener('click', event => {
    if (event.target.dataset.close === 'true') closeProductModal();
  });

  document.querySelector('.prev')?.addEventListener('click', prevTestimonial);
  document.querySelector('.next')?.addEventListener('click', nextTestimonial);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modalEl && modalEl.classList.contains('open')) closeProductModal();
  });
}

function updatePriceLabels() {
  if (minPriceLabel) minPriceLabel.textContent = formatPrice(state.minPrice);
  if (maxPriceLabel) maxPriceLabel.textContent = formatPrice(state.maxPrice);
}

function initialize() {
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  initializeHeroBackground();
  attachEvents();

  if (!hasStorefrontData) return;

  updatePriceLabels();
  renderCategories();
  renderFeaturedProducts();
  renderProducts();
  renderTestimonials();
  setInterval(nextTestimonial, 5000);
}

initialize();
