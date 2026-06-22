/**
 * Furniture Marketplace - Horizontal Carousel System
 * Airbnb-style category navigation + Amazon-style product carousels
 * 
 * Features:
 * - Sticky category navigation with smooth scrolling
 * - Horizontal scrollable carousels per category
 * - Mouse drag + touch swipe support
 * - Lazy rendering for performance
 * - requestAnimationFrame for smooth animations
 */

class FurnitureMarketplace {
  constructor(data) {
    console.log('🏪 Furniture Marketplace Init');
    
    // Data
    this.data = (typeof FURNITURE_DATABASE !== 'undefined') ? FURNITURE_DATABASE : data;
    console.log('📦 Products loaded:', this.data ? this.data.length : 0);
    
    // Category configuration
    this.categories = [
      { id: 'sofas', name: 'Sofas', displayName: 'Sofas & Living Room' },
      { id: 'beds', name: 'Beds', displayName: 'Beds & Bedroom' },
      { id: 'dining', name: 'Dining', displayName: 'Dining Furniture' },
      { id: 'tables', name: 'Coffee Tables', displayName: 'Coffee Tables' },
      { id: 'wardrobes', name: 'Wardrobes', displayName: 'Wardrobes & Storage' },
      { id: 'tv-units', name: 'TV Units', displayName: 'TV Units & Media' }
    ];
    
    this.activeCategory = null;
    
    // DOM
    this.container = document.getElementById('marketplace-container');
    if (!this.container) {
      console.error('❌ Marketplace container not found');
      return;
    }
    
    this.init();
  }

  init() {
    console.log('✅ Initializing marketplace...');
    this.render();
    this.setupCategoryNavigation();
    this.setupCarousels();
    console.log('🎉 Marketplace ready!');
  }

  /**
   * Main render - creates category nav + carousels
   */
  render() {
    // Group products by category
    const grouped = this.groupByCategory();
    
    // Build HTML
    const html = `
      ${this.renderCategoryNav()}
      ${this.renderCarousels(grouped)}
    `;
    
    this.container.innerHTML = html;
  }

  /**
   * Group products by category
   */
  groupByCategory() {
    const grouped = {};
    
    this.categories.forEach(cat => {
      grouped[cat.id] = this.data.filter(item => item.category === cat.id);
    });
    
    return grouped;
  }

  /**
   * Render category navigation bar
   */
  renderCategoryNav() {
    const items = this.categories
      .map(cat => `
        <button 
          class="category-nav__item" 
          data-category="${cat.id}"
          aria-label="View ${cat.name}"
        >
          ${cat.name}
        </button>
      `)
      .join('');
    
    return `
      <nav class="category-nav" role="navigation" aria-label="Product categories">
        <div class="category-nav__container">
          <button class="category-nav__arrow category-nav__arrow--prev" aria-label="Scroll categories left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <div class="category-nav__scroll">
            <div class="category-nav__list">
              ${items}
            </div>
          </div>
          
          <button class="category-nav__arrow category-nav__arrow--next" aria-label="Scroll categories right">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </nav>
    `;
  }

  /**
   * Render all category carousels
   */
  renderCarousels(grouped) {
    return this.categories
      .filter(cat => grouped[cat.id] && grouped[cat.id].length > 0)
      .map(cat => this.renderCarouselSection(cat, grouped[cat.id]))
      .join('');
  }

  /**
   * Render single carousel section
   */
  renderCarouselSection(category, products) {
    const cards = products
      .map(product => this.renderProductCard(product))
      .join('');
    
    return `
      <section 
        class="carousel-section" 
        id="category-${category.id}"
        data-category="${category.id}"
      >
        <div class="carousel-section__header">
          <h2 class="carousel-section__title">${category.displayName}</h2>
          <span class="carousel-section__count">${products.length} products</span>
        </div>
        
        <div class="carousel-wrapper">
          <button 
            class="carousel-arrow carousel-arrow--prev" 
            data-carousel="${category.id}"
            data-direction="prev"
            aria-label="Previous products"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <div 
            class="carousel" 
            data-carousel-id="${category.id}"
            role="region"
            aria-label="${category.displayName} products"
          >
            ${cards}
          </div>
          
          <button 
            class="carousel-arrow carousel-arrow--next" 
            data-carousel="${category.id}"
            data-direction="next"
            aria-label="Next products"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </section>
    `;
  }

  /**
   * Render single product card
   */
  renderProductCard(product) {
    // Extract first price number for display
    const priceMatch = product.priceRange ? product.priceRange.match(/[\d,]+/) : null;
    const priceDisplay = priceMatch ? `UGX ${priceMatch[0]}` : 'Custom Quote';
    
    return `
      <article 
        class="product-card" 
        data-product-id="${product.id}"
        role="listitem"
      >
        <div class="product-card__image-wrapper">
          <img 
            src="${product.image}" 
            alt="${product.title}"
            class="product-card__image"
            loading="lazy"
            decoding="async"
          />
          <span class="product-card__badge">${product.woodType || product.category}</span>
        </div>
        
        <div class="product-card__content">
          <h3 class="product-card__title">${product.title}</h3>
          <p class="product-card__description">${product.description}</p>
          
          <div class="product-card__footer">
            <span class="product-card__price">${priceDisplay}</span>
            <span class="product-card__cta">View</span>
          </div>
        </div>
      </article>
    `;
  }

  /**
   * Setup category navigation interactions
   */
  setupCategoryNavigation() {
    const navScroll = document.querySelector('.category-nav__scroll');
    const prevArrow = document.querySelector('.category-nav__arrow--prev');
    const nextArrow = document.querySelector('.category-nav__arrow--next');
    const categoryButtons = document.querySelectorAll('.category-nav__item');
    
    if (!navScroll) return;
    
    // Category button clicks - scroll to section
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        const categoryId = button.getAttribute('data-category');
        this.scrollToCategory(categoryId);
        this.setActiveCategory(button);
      });
    });
    
    // Arrow navigation for category bar
    if (prevArrow) {
      prevArrow.addEventListener('click', () => {
        navScroll.scrollBy({ left: -200, behavior: 'smooth' });
      });
    }
    
    if (nextArrow) {
      nextArrow.addEventListener('click', () => {
        navScroll.scrollBy({ left: 200, behavior: 'smooth' });
      });
    }
    
    // Highlight active category on scroll
    this.setupScrollSpy();
  }

  /**
   * Scroll to category section
   */
  scrollToCategory(categoryId) {
    const section = document.getElementById(`category-${categoryId}`);
    if (section) {
      const headerOffset = 160; // Account for sticky nav
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Set active category button
   */
  setActiveCategory(button) {
    document.querySelectorAll('.category-nav__item').forEach(btn => {
      btn.classList.remove('category-nav__item--active');
    });
    button.classList.add('category-nav__item--active');
  }

  /**
   * Scroll spy - highlight category as user scrolls
   */
  setupScrollSpy() {
    const sections = document.querySelectorAll('.carousel-section');
    const categoryButtons = document.querySelectorAll('.category-nav__item');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const categoryId = entry.target.getAttribute('data-category');
            const activeButton = document.querySelector(`[data-category="${categoryId}"]`);
            if (activeButton) {
              this.setActiveCategory(activeButton);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px'
      }
    );
    
    sections.forEach(section => observer.observe(section));
  }

  /**
   * Setup carousel interactions (arrows + drag/swipe)
   */
  setupCarousels() {
    // Arrow navigation
    document.querySelectorAll('.carousel-arrow').forEach(arrow => {
      arrow.addEventListener('click', (e) => {
        const carouselId = arrow.getAttribute('data-carousel');
        const direction = arrow.getAttribute('data-direction');
        const carousel = document.querySelector(`[data-carousel-id="${carouselId}"]`);
        
        if (carousel) {
          const scrollAmount = direction === 'prev' ? -600 : 600;
          carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      });
    });
    
    // Mouse drag + touch swipe for all carousels
    document.querySelectorAll('.carousel').forEach(carousel => {
      this.setupDragScroll(carousel);
    });
    
    // Product card clicks
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', () => {
        const productId = card.getAttribute('data-product-id');
        window.location.href = `furniture.html?id=${productId}`;
      });
    });
  }

  /**
   * Setup drag/swipe scrolling for carousel
   */
  setupDragScroll(carousel) {
    let isDown = false;
    let startX;
    let scrollLeft;
    let velocity = 0;
    let momentumID;
    
    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.style.cursor = 'grabbing';
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      cancelMomentumTracking();
    });
    
    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.style.cursor = 'grab';
    });
    
    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.style.cursor = 'grab';
      beginMomentumTracking();
    });
    
    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      const prevScrollLeft = carousel.scrollLeft;
      carousel.scrollLeft = scrollLeft - walk;
      velocity = carousel.scrollLeft - prevScrollLeft;
    });
    
    // Momentum scrolling
    function beginMomentumTracking() {
      cancelMomentumTracking();
      momentumID = requestAnimationFrame(momentumLoop);
    }
    
    function cancelMomentumTracking() {
      cancelAnimationFrame(momentumID);
    }
    
    function momentumLoop() {
      carousel.scrollLeft += velocity;
      velocity *= 0.95;
      if (Math.abs(velocity) > 0.5) {
        momentumID = requestAnimationFrame(momentumLoop);
      }
    }
    
    // Touch support
    let touchStartX = 0;
    let touchScrollLeft = 0;
    
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].pageX;
      touchScrollLeft = carousel.scrollLeft;
    }, { passive: true });
    
    carousel.addEventListener('touchmove', (e) => {
      const touchX = e.touches[0].pageX;
      const walk = (touchStartX - touchX);
      carousel.scrollLeft = touchScrollLeft + walk;
    }, { passive: true });
  }
}

// Export
if (typeof window !== 'undefined') {
  window.FurnitureMarketplace = FurnitureMarketplace;
}
