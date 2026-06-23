/**
 * NGB Interiors — Main JavaScript
 * Handles navigation, animations, hero media carousel, form validation, and interactive enhancements
 * 
 * Design Philosophy: Smooth, elegant, minimal interactions that reflect
 * the luxury interior design aesthetic of the NGB brand.
 */

'use strict';

// ============================================================================
// 0. HERO CINEMATIC MEDIA CAROUSEL SYSTEM
// ============================================================================

/**
 * Configuration for hero rotating media carousel (IMAGES → VIDEO → LOOP)
 * 
 * SEQUENCE FLOW:
 * 1. Display img1.jpg for 5-7 seconds (with subtle zoom effect)
 * 2. Fade transition → Display img2.jpg for 5-7 seconds
 * 3. Fade transition → Display img3.jpg for 5-7 seconds
 * 4. Fade transition → Display img4.jpg for 5-7 seconds
 * 5. Fade transition → Play hero.mp4 video (30 seconds, muted, once)
 * 6. When video ends → Fade back to img1.jpg
 * 7. Repeat entire sequence infinitely
 * 
 * MEDIA FILES (relative to ngb.html location):
 * Images:
 *   - ./assets/images/home/img1.jpg
 *   - ./assets/images/home/img2.jpg
 *   - ./assets/images/home/img3.jpg
 *   - ./assets/images/home/img4.jpg
 * Video:
 *   - ./assets/videos/hero.mp4 (30-second cinematic interior video)
 * 
 * VISUAL EFFECTS:
 * - Smooth fade transitions between all media (images and video)
 * - Subtle zoom effect on images (cinematic Ken Burns effect)
 * - Semi-transparent dark overlay for hero text readability
 * - Responsive scaling across desktop, tablet, mobile
 * 
 * TO CUSTOMIZE:
 * - Change image duration: Edit imageDuration (5000-7000 = 5-7 seconds)
 * - Change fade speed: Edit fadeDuration (how long crossfade takes)
 * - Change zoom intensity: Edit zoomScale (1.08 = 8% zoom, adjust in CSS)
 * - Add/remove images: Edit carouselImages array
 * - Change video: Update videoSrc path
 */
const HERO_MEDIA_CONFIG = {
  // IMAGE CAROUSEL: Rotates through these images before playing video
  // Each image displays for imageDuration milliseconds
  // Paths are relative to the HTML file (frontend/ngb.html → ./assets/...)
  // ACTUAL FILES IN YOUR PROJECT:
  carouselImages: [
    './assets/images/home/download (1).jpg',  // Your first image
    './assets/images/home/image0.jpg',        // Your second image
    './assets/images/home/image3 (1).jpg',    // Your third image
    './assets/images/home/image4 (1).jpg',    // Your fourth image
  ],
  
  // VIDEO: Plays after all images have cycled once
  // Path is relative to the HTML file
  // Video should be ~30 seconds, will play once then return to image carousel
  // ACTUAL FILE IN YOUR PROJECT:
  videoSrc: './assets/videos/0620(1).mp4',  // Your 30-second video
  
  // How long each image displays (in milliseconds)
  // Recommended: 5000-7000 (5-7 seconds per image)
  // Lower = faster cycling | Higher = longer, more cinematic display
  imageDuration: 6000, // 6 seconds per image (adjust between 5000-7000)
  
  // How long the fade-in/fade-out transition takes (in milliseconds)
  // Recommended: 800-1200 (0.8-1.2 seconds for luxury feel)
  // Lower = snappy transitions | Higher = slower, more elegant crossfades
  fadeDuration: 1000, // 1 second smooth fade
  
  // Zoom effect scale for images (Ken Burns effect)
  // 1.0 = no zoom, 1.08 = subtle 8% zoom, 1.15 = dramatic 15% zoom
  // Applied via CSS animation for smooth cinematic effect
  zoomScale: 1.08, // Subtle zoom (configurable in CSS)
};

/**
 * Hero Cinematic Media Carousel System
 * 
 * COMPLETE SEQUENCE FLOW:
 * 1. Cycles through 4 images (6 seconds each with fade transitions)
 * 2. After last image → Fades to video
 * 3. Video plays once (muted, ~30 seconds)
 * 4. After video ends → Fades back to first image
 * 5. Entire sequence repeats infinitely
 * 
 * VISUAL EFFECTS:
 * - Smooth fade transitions (1 second) between all media
 * - Subtle zoom effect on images (Ken Burns cinematic effect)
 * - Semi-transparent overlay ensures hero text stays readable
 * - All media scales responsively (desktop/tablet/mobile)
 * 
 * ARCHITECTURE:
 * - All media elements (images + video) created dynamically
 * - Images preloaded to prevent flickering
 * - Video loads on demand when sequence reaches it
 * - State machine manages: IMAGE_CYCLE → VIDEO_PLAY → IMAGE_CYCLE (loop)
 */
class HeroCinematicCarousel {
  constructor(config) {
    this.config = config;
    this.heroSection = document.getElementById('hero');
    this.heroMedia = document.querySelector('.hero__media');
    
    // Carousel state tracking
    this.currentImageIndex = 0;
    this.isVideoPlaying = false;
    this.carouselTimer = null;
    this.isTransitioning = false;
    
    // Media elements (created dynamically)
    this.imageElements = []; // Array of <img> elements for carousel
    this.videoElement = null; // Single <video> element
    this.currentActiveMedia = null; // Currently visible media element
    
    // Preloaded assets
    this.preloadedImages = {};
    
    if (!this.heroSection || !this.heroMedia) {
      console.warn('Hero carousel: Required elements not found');
      return;
    }
    
    this.init();
  }

  /**
   * Initialize carousel system
   * Sets up overlay, preloads assets, starts image carousel
   */
  init() {
    console.log('Initializing hero cinematic carousel...');
    
    // Step 1: Create semi-transparent overlay for text readability
    this.setupOverlay();
    
    // Step 2: Preload all images to prevent flickering during transitions
    this.preloadImages();
    
    // Step 3: Create image elements for carousel
    this.createImageElements();
    
    // Step 4: Create video element (hidden initially)
    this.createVideoElement();
    
    // Step 5: Start with first image
    this.showImage(0);
    
    // Step 6: Start automatic carousel sequence
    this.startCarousel();
    
    console.log('Hero carousel initialized: Images → Video → Loop');
  }

  /**
   * Create semi-transparent overlay to ensure hero text remains readable
   * Overlay sits between media and text content
   */
  setupOverlay() {
    let overlay = this.heroMedia.querySelector('.hero__media-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'hero__media-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(10, 8, 5, 0.4) 0%, rgba(10, 8, 5, 0.5) 100%);
        z-index: 5;
        pointer-events: none;
      `;
      this.heroMedia.appendChild(overlay);
    }
  }

  /**
   * Preload all carousel images to prevent flickering during transitions
   * Images load in background before carousel starts
   */
  preloadImages() {
    this.config.carouselImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      this.preloadedImages[src] = img;
    });
    console.log(`Preloaded ${this.config.carouselImages.length} carousel images`);
  }

  /**
   * Create image elements for carousel
   * All images created upfront but only one visible at a time
   */
  createImageElements() {
    this.config.carouselImages.forEach((src, index) => {
      const img = document.createElement('img');
      img.className = 'hero__carousel-image';
      img.src = src;
      img.alt = `NGB Interiors hero background ${index + 1}`;
      
      // Base styling: covers hero section, hidden by default
      img.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        opacity: 0;
        z-index: 1;
        transition: opacity ${this.config.fadeDuration}ms ease-in-out;
      `;
      
      // Insert into hero media container
      this.heroMedia.insertBefore(img, this.heroMedia.firstChild);
      this.imageElements.push(img);
    });
  }

  /**
   * Create video element for carousel sequence
   * Video plays after all images have cycled once
   */
  createVideoElement() {
    this.videoElement = document.createElement('video');
    this.videoElement.className = 'hero__carousel-video';
    this.videoElement.src = this.config.videoSrc;
    
    // Video configuration
    this.videoElement.muted = true;           // Always muted (no audio)
    this.videoElement.playsInline = true;     // Mobile compatibility
    this.videoElement.preload = 'metadata';   // Load metadata only (saves bandwidth)
    
    // Base styling: covers hero section, hidden by default
    this.videoElement.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      opacity: 0;
      z-index: 1;
      transition: opacity ${this.config.fadeDuration}ms ease-in-out;
    `;
    
    // Insert into hero media container
    this.heroMedia.insertBefore(this.videoElement, this.heroMedia.firstChild);
    
    // Handle video end event → Return to image carousel
    this.videoElement.addEventListener('ended', () => {
      console.log('Video playback completed, returning to image carousel');
      this.handleVideoEnd();
    });
    
    // Handle video errors
    this.videoElement.addEventListener('error', (e) => {
      console.warn('Video failed to load, continuing with image carousel', e);
      this.handleVideoEnd(); // Skip video, continue carousel
    });
  }

  /**
   * Display specific image with fade-in transition
   * @param {number} index - Index of image to display (0-3)
   */
  showImage(index) {
    if (index < 0 || index >= this.imageElements.length) {
      console.warn(`Invalid image index: ${index}`);
      return;
    }
    
    // Fade out current active media (if any)
    if (this.currentActiveMedia) {
      this.currentActiveMedia.style.opacity = '0';
    }
    
    // Fade in new image
    const img = this.imageElements[index];
    this.currentActiveMedia = img;
    this.currentImageIndex = index;
    
    // Trigger fade-in after short delay (ensures CSS transition triggers)
    setTimeout(() => {
      img.style.opacity = '1';
    }, 50);
    
    console.log(`Showing image ${index + 1}/${this.imageElements.length}`);
  }

  /**
   * Start automatic carousel sequence
   * Cycles through images, then triggers video
   */
  startCarousel() {
    if (this.carouselTimer) {
      clearInterval(this.carouselTimer);
    }
    
    this.carouselTimer = setInterval(() => {
      // If video is playing, don't advance carousel
      if (this.isVideoPlaying) {
        return;
      }
      
      // Move to next image
      this.currentImageIndex++;
      
      // Check if we've cycled through all images
      if (this.currentImageIndex >= this.config.carouselImages.length) {
        // All images shown → Time to play video
        console.log('Image carousel complete, transitioning to video');
        this.playVideo();
      } else {
        // Show next image in carousel
        this.showImage(this.currentImageIndex);
      }
    }, this.config.imageDuration);
    
    console.log(`Carousel started: ${this.config.imageDuration}ms per image`);
  }

  /**
   * Play video as part of carousel sequence
   * Fades out current image, fades in video, plays once
   */
  playVideo() {
    // Stop carousel timer while video plays
    if (this.carouselTimer) {
      clearInterval(this.carouselTimer);
      this.carouselTimer = null;
    }
    
    this.isVideoPlaying = true;
    
    // Fade out current image
    if (this.currentActiveMedia) {
      this.currentActiveMedia.style.opacity = '0';
    }
    
    // Fade in video
    this.currentActiveMedia = this.videoElement;
    
    setTimeout(() => {
      this.videoElement.style.opacity = '1';
      
      // Start video playback
      const playPromise = this.videoElement.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video playing (~30 seconds)');
          })
          .catch((error) => {
            console.warn('Video autoplay blocked, returning to carousel:', error);
            this.handleVideoEnd(); // Skip video, return to carousel
          });
      }
    }, this.config.fadeDuration); // Fade in after current media fades out
  }

  /**
   * Handle video end event
   * Fades out video, returns to first image, restarts carousel
   */
  handleVideoEnd() {
    this.isVideoPlaying = false;
    
    // Fade out video
    this.videoElement.style.opacity = '0';
    
    // Reset video to beginning (for next play)
    this.videoElement.currentTime = 0;
    
    // Return to first image after fade completes
    setTimeout(() => {
      this.currentImageIndex = 0;
      this.showImage(0);
      
      // Restart carousel timer
      this.startCarousel();
      
      console.log('Sequence restarting: Images → Video → Loop');
    }, this.config.fadeDuration);
  }

  /**
   * Stop carousel (useful for cleanup or pausing)
   */
  stop() {
    if (this.carouselTimer) {
      clearInterval(this.carouselTimer);
      this.carouselTimer = null;
    }
    
    if (this.videoElement) {
      this.videoElement.pause();
    }
    
    console.log('Carousel stopped');
  }

  /**
   * Cleanup on page unload
   */
  destroy() {
    this.stop();
    
    // Remove event listeners
    if (this.videoElement) {
      this.videoElement.removeEventListener('ended', this.handleVideoEnd);
      this.videoElement.removeEventListener('error', this.handleVideoEnd);
    }
  }
}

// Global reference to hero carousel system
let heroCinematicCarousel = null;

// ============================================================================
// 1. MOBILE NAVIGATION TOGGLE
// ============================================================================
/**
 * Manages mobile menu open/close functionality
 * Toggles aria-expanded and menu visibility on hamburger button click
 */
// ============================================================================
// 1. MOBILE NAVIGATION - Off-Canvas Drawer System
// ============================================================================
/**
 * Initialize mobile off-canvas drawer with:
 * - Slide-in animation from left
 * - Overlay backdrop with click-to-close
 * - Keyboard navigation (Escape key)
 * - Focus management for accessibility
 * - Body scroll lock when open
 */
function initMobileNav() {
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.getElementById('nav-menu');
  const navContainer = document.getElementById('primary-nav');
  const navOverlay = document.querySelector('.nav__overlay');
  const navLinks = document.querySelectorAll('.nav__link');

  if (!navToggle || !navMenu || !navContainer) {
    console.warn('Mobile nav: Required elements not found yet');
    return;
  }

  // Prevent double initialization
  if (navToggle.dataset.initialized === 'true') {
    console.log('Mobile nav already initialized, skipping');
    return;
  }
  navToggle.dataset.initialized = 'true';

  /**
   * Close drawer helper
   */
  function closeDrawer() {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.classList.remove('is-open');
    navContainer.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    
    // Return focus to toggle button
    navToggle.focus();
  }

  /**
   * Open drawer helper
   */
  function openDrawer() {
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.classList.add('is-open');
    navContainer.classList.add('is-open');
    document.body.classList.add('nav-open');
    
    // Focus first link for keyboard navigation
    const firstLink = navMenu.querySelector('.nav__link');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 400); // After animation
    }
  }

  /**
   * Toggle drawer on button click
   */
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
      closeDrawer();
      console.log('Drawer closed');
    } else {
      openDrawer();
      console.log('Drawer opened');
    }
  });

  /**
   * Close drawer when a navigation link is clicked
   */
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeDrawer();
      console.log('Drawer closed via link click');
    });
  });

  /**
   * Close drawer when clicking overlay
   */
  if (navOverlay) {
    navOverlay.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent event bubbling
      closeDrawer();
      console.log('Drawer closed via overlay click');
    });
  }
  
  /**
   * Close drawer when clicking outside menu on mobile
   */
  document.addEventListener('click', (e) => {
    const isMenuOpen = navContainer.classList.contains('is-open');
    if (isMenuOpen && !navContainer.contains(e.target) && e.target !== navToggle) {
      closeDrawer();
      console.log('Drawer closed via outside click');
    }
  });

  /**
   * Keyboard navigation - Escape key closes drawer
   */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      const isMenuOpen = navContainer.classList.contains('is-open');
      if (isMenuOpen) {
        closeDrawer();
        console.log('Drawer closed via Escape key');
      }
    }
  });

  /**
   * Focus trap - keep focus inside drawer when open
   */
  navMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      const isMenuOpen = navContainer.classList.contains('is-open');
      if (!isMenuOpen) return;

      const focusableElements = navMenu.querySelectorAll(
        'a[href], button:not([disabled])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Shift + Tab on first element: go to last
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      // Tab on last element: go to first
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });

  console.log('Mobile navigation drawer initialized with', navLinks.length, 'links');
}

// ============================================================================
// BFCache Reset Handler - Ensures Clean State on Browser Navigation
// ============================================================================
/**
 * Reset navigation state when page is restored from BFCache
 * (browser back/forward button or page restore)
 */
function resetMobileNavState() {
  const navToggle = document.querySelector('.nav__toggle');
  const navContainer = document.getElementById('primary-nav');
  
  if (navToggle && navContainer) {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.classList.remove('is-open');
    navContainer.classList.remove('is-open');
    document.body.style.overflow = 'auto';
    console.log('Mobile nav state reset (BFCache restore)');
  }
}

// Listen for page restore from BFCache
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    // Page was restored from BFCache
    resetMobileNavState();
  }
});

// Listen for popstate (browser back/forward)
window.addEventListener('popstate', () => {
  resetMobileNavState();
});

// ============================================================================
// 2. SMOOTH SCROLLING FOR NAVIGATION LINKS & ACTION BUTTONS
// ============================================================================
/**
 * Enables smooth scrolling for all internal links (nav, buttons, etc.)
 * Maps href paths to section IDs and scrolls smoothly
 */
function initSmoothScroll() {
  document.documentElement.style.scrollBehavior = 'smooth';

  // Map navigation href paths to section IDs
  const sectionMap = {
    '/': 'hero',
    '/furniture': 'furniture',
    '/projects': 'projects',
    '/interior-design': 'services', // Interior Design content is in services section
    '/about': 'about',
    '/contact': 'contact',
    '/contact#quote': 'quote', // For contact form quote section
  };

  // Select all internal links (navigation, buttons, service cards, etc.)
  const allLinks = document.querySelectorAll('a[href^="/"]');
  
  allLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Skip external links and links with target="_blank"
      if (link.target === '_blank' || href.startsWith('http')) {
        return;
      }

      // Check if href maps to a section
      let sectionId = null;
      
      if (href === '/contact#quote') {
        sectionId = 'quote';
      } else if (sectionMap[href]) {
        sectionId = sectionMap[href];
      }

      if (sectionId) {
        e.preventDefault();
        
        // Try to find exact ID match first, then fallback to 'contact' section
        let target = document.getElementById(sectionId);
        
        if (!target && sectionId === 'quote') {
          target = document.getElementById('quote') || document.getElementById('contact');
        }
        
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

// ============================================================================
// 3. ACTIVE NAVIGATION HIGHLIGHT ON SCROLL
// ============================================================================
/**
 * Updates the active navigation item based on which section is currently in view
 * Uses Intersection Observer API to efficiently detect visible sections
 */
function initActiveNavHighlight() {
  const navItems = document.querySelectorAll('.nav__item');
  const sections = document.querySelectorAll('#hero, #services, #projects, #furniture, #about, #contact');

  if (sections.length === 0) return;

  // Map section IDs to navigation href paths
  const sectionToHrefMap = {
    'hero': '/',
    'services': '/interior-design',
    'projects': '/projects',
    'furniture': '/furniture',
    'about': '/about',
    'contact': '/contact',
  };

  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px', // Trigger when section is 50% visible
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Remove active class from all nav items
        navItems.forEach((item) => {
          item.classList.remove('nav__item--active');
        });

        // Add active class to matching nav item
        const sectionId = entry.target.id;
        const href = sectionToHrefMap[sectionId];
        if (href) {
          const matchingLink = document.querySelector(`.nav__link[href="${href}"]`);
          if (matchingLink) {
            matchingLink.closest('.nav__item').classList.add('nav__item--active');
          }
        }
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });
}

// ============================================================================
// 4. SCROLL ANIMATIONS (FADE-IN & SLIDE-UP)
// ============================================================================
/**
 * Animates sections into view with fade-in and slide-up effects
 * Uses Intersection Observer for performance and elegance
 * Add 'data-animate' attribute to elements you want to animate
 */
function initScrollAnimations() {
  // Select elements for scroll animations
  // NOTE: .product-card excluded to prevent carousel cards from being hidden
  // Carousel cards need immediate visibility, not scroll-triggered animations
  const animatedElements = document.querySelectorAll(
    '.section, .service-card, .project-card, .about__inner'
  );

  if (animatedElements.length === 0) return;

  // Inject animation styles if not already present
  if (!document.getElementById('scroll-animations-style')) {
    const style = document.createElement('style');
    style.id = 'scroll-animations-style';
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
      }

      .section {
        opacity: 0;
      }

      .service-card,
      .project-card {
        opacity: 0;
      }

      .about__inner {
        opacity: 0;
      }
    `;
    document.head.appendChild(style);
  }

  const animationObserverOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px', // Trigger when element is 100px from bottom of viewport
    threshold: 0.1,
  };

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger animations for card-like elements
        if (entry.target.classList.contains('service-card') ||
            entry.target.classList.contains('project-card') ||
            entry.target.classList.contains('product-card')) {
          const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
          entry.target.style.animationDelay = `${index * 0.1}s`;
        }

        entry.target.classList.add('animate-in');
        animationObserver.unobserve(entry.target);
      }
    });
  }, animationObserverOptions);

  animatedElements.forEach((el) => {
    animationObserver.observe(el);
  });
}

// ============================================================================
// 5. CONTACT FORM VALIDATION
// ============================================================================
/**
 * Validates the contact form with real-time feedback
 * Checks required fields and email format
 * Shows success message on valid submission
 */
function initFormValidation() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  const nameInput = document.getElementById('contact-name');
  const phoneInput = document.getElementById('contact-phone');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /**
   * Validates a single form field and displays error message if invalid
   * @param {HTMLElement} input - The input field to validate
   * @param {string} type - Type of validation: 'text', 'email', 'phone', 'textarea'
   * @returns {boolean} - True if valid, false otherwise
   */
  function validateField(input, type) {
    const errorElement = document.getElementById(`${input.id}-error`);
    if (!errorElement) return true;

    let isValid = true;
    let errorMessage = '';

    if (!input.value.trim()) {
      isValid = false;
      errorMessage = `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required.`;
    } else if (type === 'email' && !emailRegex.test(input.value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address.';
    } else if (type === 'phone' && input.value.trim().length < 10) {
      isValid = false;
      errorMessage = 'Please enter a valid phone number.';
    }

    // Update error display
    if (!isValid) {
      input.setAttribute('aria-invalid', 'true');
      errorElement.textContent = errorMessage;
      errorElement.style.display = 'block';
    } else {
      input.setAttribute('aria-invalid', 'false');
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }

    return isValid;
  }

  /**
   * Real-time validation on field blur
   */
  nameInput?.addEventListener('blur', () => validateField(nameInput, 'text'));
  phoneInput?.addEventListener('blur', () => validateField(phoneInput, 'phone'));
  emailInput?.addEventListener('blur', () => validateField(emailInput, 'email'));
  messageInput?.addEventListener('blur', () => validateField(messageInput, 'textarea'));

  /**
   * Clear error on input focus
   */
  [nameInput, phoneInput, emailInput, messageInput].forEach((input) => {
    input?.addEventListener('focus', () => {
      const errorElement = document.getElementById(`${input.id}-error`);
      if (errorElement) {
        errorElement.style.display = 'none';
        input.setAttribute('aria-invalid', 'false');
      }
    });
  });

  /**
   * Form submission handler
   */
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateField(nameInput, 'text');
    const isPhoneValid = validateField(phoneInput, 'phone');
    const isEmailValid = validateField(emailInput, 'email');
    const isMessageValid = validateField(messageInput, 'textarea');

    // If all fields are valid, show success message
    if (isNameValid && isPhoneValid && isEmailValid && isMessageValid) {
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'form__success-message';
      successMessage.setAttribute('role', 'status');
      successMessage.setAttribute('aria-live', 'polite');
      successMessage.textContent =
        'Thank you! Your enquiry has been received. We\'ll get back to you within one business day.';
      successMessage.style.cssText = `
        padding: 16px 20px;
        margin-bottom: 20px;
        background-color: #f0f7f3;
        border-left: 4px solid #4caf50;
        color: #2e7d32;
        border-radius: 4px;
        font-size: 14px;
        animation: fadeInUp 0.4s ease-out;
      `;

      // Insert success message before the form
      contactForm.parentElement.insertBefore(successMessage, contactForm);

      // Clear form fields
      contactForm.reset();

      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    }
  });
}

// ============================================================================
// 6. BUTTON HOVER EFFECTS
// ============================================================================
/**
 * Enhances button interactions with smooth hover transitions
 * Adds visual feedback to all buttons
 */
function initButtonEnhancements() {
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach((button) => {
    button.style.transition = 'all 0.3s ease-out';

    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
    });

    button.addEventListener('mousedown', () => {
      button.style.transform = 'translateY(0)';
    });
  });
}

// ============================================================================
// 7. SCROLL-TO-TOP BUTTON
// ============================================================================
/**
 * Adds a smooth scroll-to-top button that appears on scroll
 * Creates and manages the button dynamically
 */
function initScrollToTop() {
  const scrollToTopButton = document.createElement('button');
  scrollToTopButton.className = 'scroll-to-top';
  scrollToTopButton.setAttribute('aria-label', 'Scroll to top of page');
  scrollToTopButton.textContent = '↑';
  scrollToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 48px;
    height: 48px;
    background-color: rgba(26, 26, 26, 0.8);
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 24px;
    cursor: pointer;
    display: none;
    z-index: 1000;
    transition: all 0.3s ease-out;
    backdrop-filter: blur(10px);
  `;

  document.body.appendChild(scrollToTopButton);

  // Show/hide button on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopButton.style.display = 'block';
    } else {
      scrollToTopButton.style.display = 'none';
    }
  });

  // Scroll to top on button click
  scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Hover effects
  scrollToTopButton.addEventListener('mouseenter', () => {
    scrollToTopButton.style.backgroundColor = 'rgba(26, 26, 26, 1)';
    scrollToTopButton.style.transform = 'scale(1.1)';
  });

  scrollToTopButton.addEventListener('mouseleave', () => {
    scrollToTopButton.style.backgroundColor = 'rgba(26, 26, 26, 0.8)';
    scrollToTopButton.style.transform = 'scale(1)';
  });
}

// ============================================================================
// 8. UPDATE FOOTER YEAR
// ============================================================================
/**
 * Automatically updates the copyright year in the footer
 * Ensures the year is always current
 */
function updateFooterYear() {
  const yearElement = document.getElementById('footer-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// ============================================================================
// 9. PAGE LOAD ANIMATION
// ============================================================================
/**
 * Adds a subtle fade-in animation on page load
 * Enhances the initial visual experience
 */
function initPageLoadAnimation() {
  if (!document.getElementById('page-load-style')) {
    const style = document.createElement('style');
    style.id = 'page-load-style';
    style.textContent = `
      body {
        animation: pageLoadFadeIn 0.5s ease-out;
      }

      @keyframes pageLoadFadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// ============================================================================
// 10. HERO INITIALIZATION (Will be called from main initializeApp at end)
// ============================================================================
// Hero carousel initialization moved to main initializeApp function at bottom


// ============================================================================
// 11. FURNITURE GALLERY SYSTEM
// ============================================================================

/**
 * Furniture collection data
 * 
 * TO ADD MORE ITEMS:
 * 1. Add images to: assets/images/gallery/
 * 2. Add new objects to furnitureData array below
 * 3. Use correct category slug: sofas, dining, wardrobes, tables
 */
/**
 * Furniture collection data with detailed product information
 * 
 * TO UPDATE PRICES/DETAILS:
 * - Edit price, material, description, or customization options directly here
 * - Prices are in UGX (Uganda Shillings)
 * - No need to touch HTML or CSS when updating product information
 * 
 * TO ADD MORE ITEMS:
 * 1. Add images to: assets/images/gallery/
 * 2. Add new objects to furnitureData array below
 * 3. Use correct category slug: sofas, dining, wardrobes, tables
 */
const furnitureData = [
  // SOFAS & LIVING ROOM
  {
    id: 1,
    title: 'Contemporary 3-Seater Sofa',
    category: 'sofas',
    categoryDisplay: 'Sofas & Living Room',
    image: './assets/images/gallery/sofas/sofa (1).jpg',
    description: 'Handcrafted three-seater sofa with premium upholstery and solid hardwood frame.',
    material: 'Solid Mahogany frame, premium fabric upholstery, high-density foam',
    priceRange: {
      min: 2500000,
      max: 4500000
    }
  },
  {
    id: 2,
    title: 'Executive L-Shape Sectional',
    category: 'sofas',
    categoryDisplay: 'Sofas & Living Room',
    image: './assets/images/gallery/sofas/sofa (2).jpg',
    description: 'Spacious L-shaped sectional with deep seating and modular design.',
    material: 'Solid Mugavu frame, premium upholstery, multi-density foam',
    priceRange: {
      min: 3800000,
      max: 6200000
    }
  },
  {
    id: 3,
    title: 'Classic Chesterfield Sofa',
    category: 'sofas',
    categoryDisplay: 'Sofas & Living Room',
    image: './assets/images/gallery/sofas/sofa (3).jpg',
    description: 'Timeless Chesterfield design with deep button tufting and rolled arms.',
    material: 'Solid Mahogany frame, hand-tied springs, genuine leather or fabric',
    priceRange: {
      min: 4200000,
      max: 7500000
    }
  },
  {
    id: 4,
    title: 'Modern Minimalist Sofa',
    category: 'sofas',
    categoryDisplay: 'Sofas & Living Room',
    image: './assets/images/gallery/sofas/sofa (4).jpg',
    description: 'Clean-lined contemporary sofa with sleek profile.',
    material: 'Solid Musyamba frame, high-resilience foam, premium fabric',
    priceRange: {
      min: 2200000,
      max: 3800000
    }
  },
  {
    id: 5,
    title: 'Luxury Velvet Sofa Set',
    category: 'sofas',
    categoryDisplay: 'Sofas & Living Room',
    image: './assets/images/gallery/sofas/sofa (5).jpg',
    description: 'Opulent velvet upholstered sofa with gold-finished legs.',
    material: 'Solid Mahogany frame, premium velvet, gold-finished legs',
    priceRange: {
      min: 3500000,
      max: 5800000
    }
  },
  
  // WARDROBES & STORAGE
  {
    id: 11,
    title: 'Classic 3-Door Wardrobe',
    category: 'wardrobes',
    categoryDisplay: 'Wardrobes & Storage',
    image: './assets/images/gallery/wadrobes/wadrobes (1).jpg',
    description: 'Traditional three-door wardrobe with hanging space and shelves.',
    material: 'Solid Mugavu frame, premium MDF panels, soft-close hinges',
    priceRange: {
      min: 2500000,
      max: 4200000
    }
  },
  {
    id: 12,
    title: 'Modern Sliding Door Wardrobe',
    category: 'wardrobes',
    categoryDisplay: 'Wardrobes & Storage',
    image: './assets/images/gallery/wadrobes/wadrobes (2).jpg',
    description: 'Space-saving wardrobe with smooth sliding doors.',
    material: 'Premium MDF, aluminum sliding tracks, soft-close mechanism',
    priceRange: {
      min: 3200000,
      max: 5800000
    }
  },
  {
    id: 13,
    title: 'Built-In Wardrobe System',
    category: 'wardrobes',
    categoryDisplay: 'Wardrobes & Storage',
    image: './assets/images/gallery/wadrobes/wadrobes (3).jpg',
    description: 'Floor-to-ceiling custom wardrobe system.',
    material: 'Premium MDF construction, German soft-close hardware',
    priceRange: {
      min: 4000000,
      max: 8500000
    }
  },
  {
    id: 14,
    title: '4-Door Executive Wardrobe',
    category: 'wardrobes',
    categoryDisplay: 'Wardrobes & Storage',
    image: './assets/images/gallery/wadrobes/wadrobes (4).jpg',
    description: 'Spacious four-door wardrobe with elegant detailing.',
    material: 'Solid Mahogany construction, premium MDF panels',
    priceRange: {
      min: 3800000,
      max: 6500000
    }
  },
  
  // DINING FURNITURE
  {
    id: 6,
    title: 'Classic 6-Seater Dining Set',
    category: 'dining',
    categoryDisplay: 'Dining Furniture',
    image: './assets/images/gallery/dining tables/dining (1).jpg',
    description: 'Elegant solid wood dining table with six upholstered chairs.',
    material: 'Solid Mahogany table, hardwood chairs, cushioned seats',
    priceRange: {
      min: 3500000,
      max: 6000000
    }
  },
  {
    id: 7,
    title: 'Contemporary Extendable Dining Table',
    category: 'dining',
    categoryDisplay: 'Dining Furniture',
    image: './assets/images/gallery/dining tables/dining (2).jpg',
    description: 'Modern dining table with extension mechanism.',
    material: 'Solid Musyamba wood, precision extension mechanism',
    priceRange: {
      min: 2800000,
      max: 4500000
    }
  },
  {
    id: 8,
    title: 'Rustic Farmhouse Dining Set',
    category: 'dining',
    categoryDisplay: 'Dining Furniture',
    image: './assets/images/gallery/dining tables/dining (3).jpg',
    description: 'Chunky wooden dining table with rustic charm.',
    material: 'Solid Mugavu wood, hand-finished surface',
    priceRange: {
      min: 3200000,
      max: 5500000
    }
  },
  {
    id: 9,
    title: 'Executive 8-Seater Dining Suite',
    category: 'dining',
    categoryDisplay: 'Dining Furniture',
    image: './assets/images/gallery/dining tables/dining (4).jpg',
    description: 'Grand dining suite with eight luxurious chairs.',
    material: 'Premium Mahogany table and chairs, upholstered seating',
    priceRange: {
      min: 5500000,
      max: 9000000
    }
  },
  {
    id: 10,
    title: 'Modern Glass & Wood Dining Set',
    category: 'dining',
    categoryDisplay: 'Dining Furniture',
    image: './assets/images/gallery/dining tables/dining (5).jpg',
    description: 'Contemporary dining table with glass top and wood base.',
    material: 'Tempered glass top, solid Musyamba wood base',
    priceRange: {
      min: 3000000,
      max: 5200000
    }
  },
  
  // COFFEE TABLES
  {
    id: 21,
    title: 'Contemporary Glass Coffee Table',
    category: 'tables',
    categoryDisplay: 'Coffee Tables',
    image: './assets/images/gallery/coffee sets(center tables)/center table (2).jpg',
    description: 'Modern coffee table with tempered glass top.',
    material: 'Tempered glass, solid Musyamba wood base',
    priceRange: {
      min: 800000,
      max: 1500000
    }
  },
  {
    id: 22,
    title: 'Solid Wood Coffee Table',
    category: 'tables',
    categoryDisplay: 'Coffee Tables',
    image: './assets/images/gallery/coffee sets(center tables)/center table (3).jpg',
    description: 'Classic all-wood coffee table with lower shelf.',
    material: 'Solid Mugavu wood throughout',
    priceRange: {
      min: 900000,
      max: 1800000
    }
  },
  {
    id: 23,
    title: 'Marble Top Coffee Table',
    category: 'tables',
    categoryDisplay: 'Coffee Tables',
    image: './assets/images/gallery/coffee sets(center tables)/center table (4).jpg',
    description: 'Luxury coffee table with genuine marble top.',
    material: 'Genuine marble top, powder-coated metal base',
    priceRange: {
      min: 1500000,
      max: 2800000
    }
  },
  {
    id: 24,
    title: 'Nested Coffee Table Set',
    category: 'tables',
    categoryDisplay: 'Coffee Tables',
    image: './assets/images/gallery/coffee sets(center tables)/center table (5).jpg',
    description: 'Set of three nesting tables for flexible arrangement.',
    material: 'Solid Musyamba wood tops, metal legs',
    priceRange: {
      min: 1200000,
      max: 2000000
    }
  },
  {
    id: 25,
    title: 'Round Coffee Table',
    category: 'tables',
    categoryDisplay: 'Coffee Tables',
    image: './assets/images/gallery/coffee sets(center tables)/center table (6).jpg',
    description: 'Circular coffee table with pedestal base.',
    material: 'Solid Mahogany top and pedestal base',
    priceRange: {
      min: 950000,
      max: 1700000
    }
  },
  
  // BEDS & BEDROOM
  {
    id: 16,
    title: 'Upholstered Platform Bed - Queen',
    category: 'beds',
    categoryDisplay: 'Beds & Bedroom',
    image: './assets/images/gallery/beds/bed (1).jpg',
    description: 'Contemporary queen-size bed with padded headboard.',
    material: 'Solid hardwood frame, high-density foam, premium fabric',
    priceRange: {
      min: 2800000,
      max: 4500000
    }
  },
  {
    id: 17,
    title: 'Classic Wooden Bed Frame - King',
    category: 'beds',
    categoryDisplay: 'Beds & Bedroom',
    image: './assets/images/gallery/beds/bed (2).jpg',
    description: 'Solid wood king-size bed with carved headboard.',
    material: 'Solid Mahogany construction, hand-carved details',
    priceRange: {
      min: 3500000,
      max: 6000000
    }
  },
  {
    id: 18,
    title: 'Modern Low-Profile Bed',
    category: 'beds',
    categoryDisplay: 'Beds & Bedroom',
    image: './assets/images/gallery/beds/bed (3).jpg',
    description: 'Minimalist low-height bed with clean lines.',
    material: 'Solid Musyamba wood frame, platform base',
    priceRange: {
      min: 2200000,
      max: 3800000
    }
  },
  {
    id: 19,
    title: 'Storage Bed with Drawers',
    category: 'beds',
    categoryDisplay: 'Beds & Bedroom',
    image: './assets/images/gallery/beds/bed (4).jpg',
    description: 'Practical bed frame with built-in drawer storage.',
    material: 'Solid wood frame, MDF drawer boxes, quality slides',
    priceRange: {
      min: 2500000,
      max: 4200000
    }
  },
  {
    id: 20,
    title: 'Four-Poster Canopy Bed',
    category: 'beds',
    categoryDisplay: 'Beds & Bedroom',
    image: './assets/images/gallery/beds/bed (5).jpg',
    description: 'Elegant four-poster bed with tall posts.',
    material: 'Solid Mahogany posts and frame, turned details',
    priceRange: {
      min: 4000000,
      max: 7500000
    }
  },
  
  // TV UNITS
  {
    id: 26,
    title: 'Modern TV Entertainment Unit',
    category: 'tv-units',
    categoryDisplay: 'TV Units & Media Storage',
    image: './assets/images/gallery/TV units/TV unit (1).jpg',
    description: 'Contemporary media console with shelving.',
    material: 'Solid Musyamba frame, MDF panels, cable management',
    priceRange: {
      min: 1800000,
      max: 3200000
    }
  },
  {
    id: 27,
    title: 'Wall-Mounted TV Cabinet',
    category: 'tv-units',
    categoryDisplay: 'TV Units & Media Storage',
    image: './assets/images/gallery/TV units/TV unit (2).jpg',
    description: 'Space-saving floating TV unit with closed storage.',
    material: 'Premium MDF construction, soft-close hinges',
    priceRange: {
      min: 1500000,
      max: 2800000
    }
  }
];

/**
 * Category configuration
 */
const categoryNames = {
  all: 'All Furniture',
  sofas: 'Sofas & Living Room',
  dining: 'Dining Furniture',
  wardrobes: 'Wardrobes & Storage',
  tables: 'Coffee Tables',
  beds: 'Beds & Bedroom',
  'tv-units': 'TV Units & Media Storage'
};

/**
 * Furniture Gallery Manager
 * Handles: Gallery rendering, category filtering, image lightbox
 * "View Details" links navigate to furniture.html page
 */
class FurnitureGallery {
  constructor(data) {
    console.log('🔧 FurnitureGallery Constructor - START');
    // Use FURNITURE_DATABASE from furniture-data.js if available (has richer product details)
    // Otherwise fall back to furnitureData from this file
    this.data = (typeof FURNITURE_DATABASE !== 'undefined') ? FURNITURE_DATABASE : data;
    console.log('📦 Data source:', typeof FURNITURE_DATABASE !== 'undefined' ? 'FURNITURE_DATABASE' : 'fallback data');
    console.log('📊 Items loaded:', this.data ? this.data.length : 0);
    this.currentCategory = 'all';
    this.currentLightboxIndex = 0;
    this.filteredData = [...data];
    
    this.grid = document.getElementById('furniture-grid');
    console.log('🎯 Grid element:', this.grid ? 'FOUND' : '❌ NOT FOUND');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.emptyState = document.getElementById('empty-state');
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImage = document.getElementById('lightbox-image');
    this.lightboxTitle = document.getElementById('lightbox-title');
    this.lightboxCategory = document.getElementById('lightbox-category');
    
    if (!this.grid) {
      console.error('❌ CRITICAL: Grid not found - aborting initialization');
      return;
    }
    console.log('✅ All DOM elements ready, calling init()...');
    
    this.init();
  }

  init() {
    console.log('Initializing furniture gallery...');
    this.renderGallery();
    this.setupFilters();
    this.setupLightbox();
    this.setupKeyboardNav();
    console.log(`Gallery initialized: ${this.data.length} items loaded`);
  }

  renderGallery() {
    console.log('🎨 renderGallery() called - Category:', this.currentCategory);
    this.grid.innerHTML = '';
    
    this.filteredData = this.currentCategory === 'all' 
      ? [...this.data]
      : this.data.filter(item => item.category === this.currentCategory);
    
    console.log('📊 Filtered items:', this.filteredData.length);
    
    if (this.filteredData.length === 0) {
      console.warn('⚠️ No items to display - showing empty state');
      this.emptyState.style.display = 'flex';
      return;
    } else {
      this.emptyState.style.display = 'none';
    }
    
    console.log('🏗️ Creating', this.filteredData.length, 'product cards...');
    this.filteredData.forEach((item, index) => {
      const card = this.createFurnitureCard(item, index);
      this.grid.appendChild(card);
    });
    
    console.log(`✅ Rendered ${this.filteredData.length} items (category: ${this.currentCategory})`);
  }

  createFurnitureCard(item, index) {
    const card = document.createElement('article');
    card.className = 'furniture-card furniture-card--filtering';
    card.setAttribute('data-category', item.category);
    card.setAttribute('data-index', index);
    card.setAttribute('role', 'listitem');
    
    // Parse materials string into array and take first 3 as badges
    const materialBadges = item.material
      ? item.material
          .split(',')
          .map(m => m.trim())
          .slice(0, 3)
          .map(m => `<span class="product-card__material-badge">${m}</span>`)
          .join('')
      : '';
    
    card.innerHTML = `
      <div class="furniture-card__image-wrapper" data-action="image">
        <img 
          src="${item.image}" 
          alt="${item.title}" 
          class="furniture-card__image"
          loading="lazy"
        />
        <span class="furniture-card__badge">${item.categoryDisplay || categoryNames[item.category]}</span>
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
    
    // Image area opens lightbox
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
        this.renderGallery();
        
        console.log(`Filter changed: ${category}`);
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
    this.lightboxCategory.textContent = item.categoryDisplay || categoryNames[item.category];
    
    // Update the "View Full Details" link with product ID
    const detailsLink = document.querySelector('.lightbox__cta');
    if (detailsLink && item.id) {
      detailsLink.href = `furniture.html?id=${item.id}`;
    }
    
    this.lightbox.classList.add('lightbox--active');
    this.lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    console.log(`Lightbox opened: ${item.title}`);
  }

  closeLightbox() {
    this.lightbox.classList.remove('lightbox--active');
    this.lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    console.log('Lightbox closed');
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
      // Lightbox keyboard navigation
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

// Global reference to furniture gallery
let furnitureGallery = null;


// ============================================================================
// 12. INITIALIZE ALL FEATURES ON DOM READY
// ============================================================================
/**
 * Main initialization function
 * Called when DOM is fully loaded
 * Activates all interactive features
 */
function initializeApp() {
  // CRITICAL: Initialize mobile navigation FIRST before any other features
  // This ensures the hamburger menu is immediately functional on page load
  try {
    initMobileNav();
    console.log('✓ Mobile navigation initialized');
  } catch (error) {
    console.error('Mobile navigation failed to initialize:', error);
  }

  // Core navigation features (non-blocking)
  try {
    initSmoothScroll();
    initActiveNavHighlight();
  } catch (error) {
    console.error('Navigation features error:', error);
  }

  // Hero cinematic carousel system (IMAGES → VIDEO → LOOP)
  // Rotates through 4 images (6 seconds each), then plays video (~30 seconds),
  // then returns to first image and repeats the entire sequence
  // Wrapped in try-catch to prevent blocking if it fails
  try {
    heroCinematicCarousel = new HeroCinematicCarousel(HERO_MEDIA_CONFIG);
  } catch (error) {
    console.error('Hero carousel failed to initialize:', error);
  }

  // Animation and visual enhancements (non-critical)
  try {
    initScrollAnimations();
    initPageLoadAnimation();
    initButtonEnhancements();
    initScrollToTop();
  } catch (error) {
    console.error('Animation features error:', error);
  }

  // Form and utility (non-critical)
  try {
    initFormValidation();
    updateFooterYear();
  } catch (error) {
    console.error('Form/utility features error:', error);
  }
  
  // Furniture marketplace system (new horizontal carousel design)
  try {
    console.log('🔍 Checking for marketplace container...');
    const marketplaceContainer = document.getElementById('marketplace-container');
    console.log('Marketplace container:', marketplaceContainer ? 'FOUND' : 'Not found');
    
    if (marketplaceContainer) {
      console.log('📦 FURNITURE_DATABASE available:', typeof FURNITURE_DATABASE !== 'undefined');
      console.log('🎯 FurnitureMarketplace available:', typeof FurnitureMarketplace !== 'undefined');
      
      // Use new marketplace carousel system
      if (typeof FurnitureMarketplace !== 'undefined') {
        console.log('🏪 Initializing Furniture Marketplace (Carousel Design)...');
        const fullData = (typeof FURNITURE_DATABASE !== 'undefined') ? FURNITURE_DATABASE : furnitureData;
        console.log('📊 Total products:', fullData ? fullData.length : 0);
        furnitureGallery = new FurnitureMarketplace(fullData);
      } else {
        console.warn('⚠️ FurnitureMarketplace class not found, loading may have failed');
      }
    } else {
      // Fallback: Check for old grid system
      const furnitureGrid = document.getElementById('furniture-grid');
      if (furnitureGrid) {
        console.log('📍 Using legacy gallery system');
        const isHomepage = document.body.classList.contains('page-home') || window.location.pathname.includes('ngb.html') || window.location.pathname === '/';
        
        const GalleryClass = typeof FurnitureGalleryOptimized !== 'undefined' ? FurnitureGalleryOptimized : FurnitureGallery;
        
        if (isHomepage) {
          console.log('🏠 Homepage featured furniture...');
          const featuredData = (typeof FURNITURE_DATABASE !== 'undefined') ? FURNITURE_DATABASE.slice(0, 3) : furnitureData.slice(0, 3);
          furnitureGallery = new GalleryClass(featuredData);
        } else {
          console.log('🎨 Full gallery...');
          const fullData = (typeof FURNITURE_DATABASE !== 'undefined') ? FURNITURE_DATABASE : furnitureData;
          furnitureGallery = new GalleryClass(fullData);
        }
      }
    }
  } catch (error) {
    console.error('❌ Furniture system error:', error);
  }

  // Log successful initialization (optional, for debugging)
  console.log('NGB Interiors — App initialized successfully');
}

// Execute initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// CRITICAL: Early mobile navigation initialization
// Initialize mobile nav as soon as the script loads to ensure immediate interactivity
// This runs even before DOMContentLoaded for maximum responsiveness
(function earlyMobileNavInit() {
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    // DOM is already ready, init immediately
    try {
      initMobileNav();
      console.log('✓ Early mobile navigation initialized');
    } catch (error) {
      console.error('Early mobile nav init failed:', error);
    }
  } else {
    // Wait for DOM to be interactive (happens before DOMContentLoaded)
    document.addEventListener('readystatechange', function onReadyStateChange() {
      if (document.readyState === 'interactive') {
        try {
          initMobileNav();
          console.log('✓ Early mobile navigation initialized');
          document.removeEventListener('readystatechange', onReadyStateChange);
        } catch (error) {
          console.error('Early mobile nav init failed:', error);
        }
      }
    });
  }
})();
