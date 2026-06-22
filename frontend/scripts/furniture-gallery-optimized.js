/**
 * Furniture Gallery Manager - OPTIMIZED VERSION
 * Features:
 * - Category grouping with section headers
 * - requestAnimationFrame for non-blocking rendering
 * - Lazy loading images
 * - Compact responsive design
 * - Performance optimizations
 */

class FurnitureGalleryOptimized {
  constructor(data) {
    console.log('🚀 Optimized FurnitureGallery Init');
    
    // SINGLE SOURCE OF TRUTH
    this.data = (typeof FURNITURE_DATABASE !== 'undefined') ? FURNITURE_DATABASE : data;
    console.log('📊 Total products:', this.data ?this.data.length : 0);
    
    // Category configuration
    this.categoryOrder = ['sofas', 'beds', 'dining', 'tables', 'wardrobes', 'tv-units'];
    this.categoryNames = {
      sofas: 'Sofas & Living Room',
      beds: 'Beds & Bedroom',
      dining: 'Dining Furniture',
      tables: 'Coffee Tables',
      wardrobes: 'Wardrobes & Storage',
      'tv-units': 'TV Units & Media Storage'
    };
    
    this.currentCategory = 'all';
    this.currentLightboxIndex = 0;
    this.filteredData = [...this.data];
    
    // DOM Elements
    this.grid = document.getElementById('furniture-grid');
    if (!this.grid) {
      console.error('❌ Grid element not found');
      return;
    }
    
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.emptyState = document.getElementById('empty-state');
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImage = document.getElementById('lightbox-image');
    this.lightboxTitle = document.getElementById('lightbox-title');
    this.lightboxCategory = document.getElementById('lightbox-category');
    
    this.init();
  }

  init() {
    console.log('✅ Initializing optimized gallery...');
    this.renderGallery();
    this.setupFilters();
    this.setupLightbox();
    this.setupKeyboardNav();
  }

  /**
   * Main render method - decides between grouped or single category view
   */
  renderGallery() {
    console.log('🎨 Rendering:', this.currentCategory);
    
    // Filter data
    this.filteredData = this.currentCategory === 'all' 
      ? [...this.data]
      : this.data.filter(item => item.category === this.currentCategory);
    
    if (this.filteredData.length === 0) {
      this.grid.innerHTML = '';
      this.emptyState.style.display = 'flex';
      return;
    }
    
    this.emptyState.style.display = 'none';
    this.grid.innerHTML = '';
    
    if (this.currentCategory === 'all') {
      this.renderByCategories();
    } else {
      this.renderSingleCategory();
    }
  }
  
  /**
   * Render products grouped by categories
   */
  renderByCategories() {
    // Group data by category
    const grouped = {};
    this.categoryOrder.forEach(category => {
      const items = this.data.filter(item => item.category === category);
      if (items.length > 0) {
        grouped[category] = items;
      }
    });
    
    // Render each category section
    this.categoryOrder.forEach(category => {
      if (grouped[category]) {
        this.renderCategorySection(category, grouped[category]);
      }
    });
  }
  
  /**
   * Render a single category section with header
   */
  renderCategorySection(category, items) {
    const section = document.createElement('div');
    section.className = 'category-section';
    section.setAttribute('data-category', category);
    section.id = `category-${category}`;
    
    // Category header
    const header = document.createElement('div');
    header.className = 'category-section__header';
    header.innerHTML = `
      <h3 class="category-section__title">${this.categoryNames[category]}</h3>
      <p class="category-section__count">${items.length} ${items.length === 1 ? 'Product' : 'Products'}</p>
    `;
    section.appendChild(header);
    
    // Products grid for this category
    const grid = document.createElement('div');
    grid.className = 'gallery__grid';
    
    // Render cards with batching
    this.renderCardsInBatches(grid, items, 0);
    
    section.appendChild(grid);
    this.grid.appendChild(section);
  }
  
  /**
   * Render single category without grouping
   */
  renderSingleCategory() {
    const grid = document.createElement('div');
    grid.className = 'gallery__grid';
    this.renderCardsInBatches(grid, this.filteredData, 0);
    this.grid.appendChild(grid);
  }
  
  /**
   * Performance: Render cards in batches using requestAnimationFrame
   */
  renderCardsInBatches(container, items, startIndex, batchSize = 12) {
    const endIndex = Math.min(startIndex + batchSize, items.length);
    
    for (let i = startIndex; i < endIndex; i++) {
      const card = this.createFurnitureCard(items[i], i);
      container.appendChild(card);
      
      // Fade-in animation
      requestAnimationFrame(() => {
        setTimeout(() => {
          card.classList.add('furniture-card--loaded');
        }, (i - startIndex) * 20);
      });
    }
    
    // Continue with next batch
    if (endIndex < items.length) {
      requestAnimationFrame(() => {
        this.renderCardsInBatches(container, items, endIndex, batchSize);
      });
    }
  }

  createFurnitureCard(item, index) {
    const card = document.createElement('article');
    card.className = 'furniture-card';
    card.setAttribute('data-category', item.category);
    card.setAttribute('data-index', index);
    
    // Material badges (desktop only via CSS)
    const materialBadges = item.material
      ? item.material.split(',').map(m => m.trim()).slice(0, 3)
          .map(m => `<span class="product-card__material-badge">${m}</span>`).join('')
      : '';
    
    card.innerHTML = `
      <div class="furniture-card__image-wrapper" data-action="image">
        <img 
          src="${item.image}" 
          alt="${item.title}" 
          class="furniture-card__image"
          loading="lazy"
          decoding="async"
        />
        <span class="furniture-card__badge">${item.categoryDisplay || this.categoryNames[item.category]}</span>
      </div>
      <div class="furniture-card__content">
        <h3 class="furniture-card__title">${item.title}</h3>
        <p class="furniture-card__description">${item.description}</p>
        ${materialBadges ? `<div class="product-card__materials">${materialBadges}</div>` : ''}
        <a href="furniture.html?id=${item.id}" class="furniture-card__action" data-action="details">
          View Details
        </a>
      </div>
    `;
    
    // Lightbox on image click
    const imageArea = card.querySelector('[data-action="image"]');
    imageArea.addEventListener('click', (e) => {
      e.stopPropagation();
      this.openLightbox(index);
    });
    
    return card;
  }

  setupFilters() {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        
        this.filterButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
        button.classList.add('filter-btn--active');
        
        this.currentCategory = category;
        
        // Scroll to category if grouped view
        if (category !== 'all' && this.currentCategory === category) {
          requestAnimationFrame(() => {
            const section = document.getElementById(`category-${category}`);
            if (section) {
              section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          });
        }
        
        this.renderGallery();
      });
    });
  }

  openLightbox(index) {
    this.currentLightboxIndex = index;
    const item = this.filteredData[index];
    if (!item) return;
    
    this.lightboxImage.src = item.image;
    this.lightboxImage.alt = item.title;
    this.lightboxTitle.textContent = item.title;
    this.lightboxCategory.textContent = item.categoryDisplay || this.categoryNames[item.category];
    
    const detailsLink = document.querySelector('.lightbox__cta');
    if (detailsLink && item.id) {
      detailsLink.href = `furniture.html?id=${item.id}`;
    }
    
    this.lightbox.classList.add('lightbox--active');
    this.lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightbox.classList.remove('lightbox--active');
    this.lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  previousLightboxItem() {
    this.currentLightboxIndex--;
    if (this.currentLightboxIndex < 0) {
      this.currentLightboxIndex = this.filteredData.length - 1;
    }
    this.openLightbox(this.currentLightboxIndex);
  }

  nextLightboxItem() {
    this.currentLightboxIndex++;
    if (this.currentLightboxIndex >= this.filteredData.length) {
      this.currentLightboxIndex = 0;
    }
    this.openLightbox(this.currentLightboxIndex);
  }

  setupLightbox() {
    const closeBtn = document.querySelector('.lightbox__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeLightbox());
    }
    
    const prevBtn = document.querySelector('.lightbox__nav--prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.previousLightboxItem());
    }
    
    const nextBtn = document.querySelector('.lightbox__nav--next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextLightboxItem());
    }
    
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.closeLightbox();
      }
    });
  }

  setupKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      if (this.lightbox.classList.contains('lightbox--active')) {
        switch(e.key) {
          case 'Escape':
            this.closeLightbox();
            break;
          case 'ArrowLeft':
            this.previousLightboxItem();
            break;
          case 'ArrowRight':
            this.nextLightboxItem();
            break;
        }
      }
    });
  }
}

// Export for use in main script
if (typeof window !== 'undefined') {
  window.FurnitureGalleryOptimized = FurnitureGalleryOptimized;
}
