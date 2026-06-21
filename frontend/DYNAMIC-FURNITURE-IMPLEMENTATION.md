# Dynamic Furniture System - Implementation Guide

## ✅ PROBLEM IDENTIFIED

**Current Bug:** The `furniture.html` page shows **identical sofa information** for every product because the page content is hardcoded.

**Root Cause:** The page was designed as a static template showing only one product (the sofa), not dynamically loading product data based on which item the user clicks.

---

## 🔧 SOLUTION: Dynamic Product Loading

### **Approach:**
Use URL parameters (`furniture.html?id=1`) to load the correct product from the `furnitureData` array in `ngb.js`.

---

## 📝 IMPLEMENTATION STEPS

### **Step 1: Update Homepage Cards to Pass Product IDs**

In `ngb.js`, modify `createFurnitureCard()` to link to furniture.html with the product ID:

```javascript
createFurnitureCard(item, index) {
  const card = document.createElement('article');
  card.className = 'furniture-card furniture-card--filtering';
  card.setAttribute('data-category', item.category);
  card.setAttribute('data-index', index);
  card.setAttribute('role', 'listitem');
  
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
```

**Change:** Add `?id=${item.id}` to the furniture.html link so each product passes its unique ID.

---

### **Step 2: Create Shared Product Database**

Create `scripts/furniture-data.js` to store all product information:

```javascript
// scripts/furniture-data.js
const FURNITURE_DATABASE = [
  // SOFAS
  {
    id: 1,
    title: 'Custom Luxury Sofa',
    category: 'sofas',
    categoryDisplay: 'Sofas & Living Room',
    image: '../assets/images/gallery/sofa0 (1).jpg',
    description: 'Handcrafted three-seater sofa with premium upholstery.',
    detailedDescription: 'This exquisite three-seater sofa embodies luxury and comfort. Each piece is handcrafted by skilled artisans using traditional joinery techniques combined with modern ergonomic design.',
    material: 'Solid Mahogany frame, premium fabric upholstery, high-density foam cushioning',
    woodType: 'Mahogany',
    priceRange: 'UGX 2,500,000 - UGX 4,500,000',
    leadTime: '4-6 weeks',
    customization: {
      colors: ['Charcoal Grey', 'Navy Blue', 'Cream', 'Emerald Green', 'Custom Color'],
      materials: ['Premium Linen', 'Velvet', 'Leather', 'Microfiber'],
      sizes: ['2-Seater', '3-Seater', '4-Seater', 'Custom Size'],
      finishes: ['Natural Wood', 'Dark Walnut', 'Espresso', 'White Oak']
    }
  },
  
  // WARDROBES
  {
    id: 2,
    title: 'Built-in Wardrobe System',
    category: 'wardrobes',
    categoryDisplay: 'Wardrobes & Storage',
    image: '../assets/images/gallery/wad0 (1).jpg',
    description: 'Floor-to-ceiling wardrobe with custom internal layout.',
    detailedDescription: 'A sophisticated storage solution designed to maximize space while maintaining elegant aesthetics. Features soft-close doors, adjustable shelving, and customizable internal compartments.',
    material: 'Premium MDF with Mugavu wood veneer, soft-close hinges, chrome handles',
    woodType: 'Mugavu / MDF Options',
    priceRange: 'UGX 3,000,000 - UGX 6,500,000',
    leadTime: '5-7 weeks',
    customization: {
      colors: ['White', 'Walnut', 'Grey Oak', 'Black', 'Custom Color'],
      materials: ['MDF with Veneer', 'Solid Mahogany', 'Solid Mugavu', 'Laminate'],
      sizes: ['2-Door', '3-Door', '4-Door', 'Custom Width'],
      finishes: ['Matte', 'Glossy', 'Wood Grain', 'Textured']
    }
  },
  
  // DINING SETS
  {
    id: 3,
    title: 'Elegant Dining Set',
    category: 'dining',
    categoryDisplay: 'Dining Furniture',
    image: '../assets/images/gallery/din (1).jpg',
    description: 'Sophisticated dining table and chairs crafted from premium wood.',
    detailedDescription: 'Transform your dining experience with this elegant dining set. The solid wood table features a beautifully finished surface that showcases natural wood grain, paired with ergonomically designed chairs.',
    material: 'Solid Mahogany table top, hardwood chair frames, cushioned seating',
    woodType: 'Mahogany / Musyamba',
    priceRange: 'UGX 3,500,000 - UGX 7,000,000',
    leadTime: '6-8 weeks',
    customization: {
      colors: ['Natural Wood', 'Dark Mahogany', 'Light Oak', 'Espresso', 'Custom Stain'],
      materials: ['Mahogany', 'Musyamba', 'Oak', 'Teak'],
      sizes: ['4-Seater', '6-Seater', '8-Seater', 'Custom Size'],
      finishes: ['Matte Lacquer', 'Glossy Finish', 'Natural Oil', 'Wax Polish']
    }
  },
  
  // COFFEE TABLES
  {
    id: 4,
    title: 'Designer Coffee Table',
    category: 'tables',
    categoryDisplay: 'Coffee Tables',
    image: '../assets/images/gallery/coffee (1).jpg',
    description: 'Statement coffee table with unique design and premium materials.',
    detailedDescription: 'This designer coffee table serves as the centerpiece of your living room, combining artistic flair with practical functionality. Crafted with attention to detail for timeless elegance.',
    material: 'Solid Mugavu wood, tempered glass top option, metal accents',
    woodType: 'Mugavu / Glass & Marble Options',
    priceRange: 'UGX 800,000 - UGX 2,000,000',
    leadTime: '3-4 weeks',
    customization: {
      colors: ['Natural Wood', 'Black', 'White', 'Gold Accent', 'Custom Color'],
      materials: ['Wood & Glass', 'Solid Wood', 'Marble Top', 'Metal & Wood'],
      sizes: ['Small (90cm)', 'Medium (120cm)', 'Large (150cm)', 'Custom Size'],
      finishes: ['Polished', 'Matte', 'Rustic', 'Contemporary']
    }
  }
];

// Helper function to get product by ID
function getProductById(id) {
  return FURNITURE_DATABASE.find(product => product.id === parseInt(id));
}

// Helper function to get related products (exclude current, same category or random)
function getRelatedProducts(currentId, limit = 3) {
  const current = getProductById(currentId);
  if (!current) return [];
  
  // Get products from same category first
  let related = FURNITURE_DATABASE.filter(p => 
    p.id !== currentId && p.category === current.category
  );
  
  // If not enough, add other products
  if (related.length < limit) {
    const others = FURNITURE_DATABASE.filter(p => 
      p.id !== currentId && !related.includes(p)
    );
    related = [...related, ...others];
  }
  
  return related.slice(0, limit);
}
```

**Include this file in both `ngb.html` and `furniture.html`:**
```html
<script src="./scripts/furniture-data.js"></script>
```

---

### **Step 3: Make furniture.html Dynamic**

Add this JavaScript at the bottom of `furniture.html` (before closing `</body>`):

```javascript
<script src="./scripts/furniture-data.js"></script>
<script>
  // Get product ID from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  // Load product data
  const product = getProductById(productId);
  
  if (!product) {
    // Show error if product not found
    document.querySelector('main').innerHTML = `
      <div class="error">
        <h1 class="error__title">Product Not Found</h1>
        <p>The product you're looking for doesn't exist.</p>
        <a href="ngb.html#furniture" class="btn btn--primary">Back to Furniture Gallery</a>
      </div>
    `;
  } else {
    // Update page title
    document.title = `${product.title} | NGB Interiors`;
    
    // Update hero background
    document.querySelector('.furniture-hero__background').style.backgroundImage = 
      `url('${product.image}')`;
    
    // Update hero content
    document.querySelector('.furniture-hero__eyebrow').textContent = 'Handcrafted in Uganda';
    document.querySelector('.furniture-hero__title').textContent = product.title;
    document.querySelector('.furniture-hero__description').textContent = 
      'Every piece is built to order. Choose your materials, dimensions, and finishes.';
    
    // Update breadcrumb
    const breadcrumb = document.querySelector('.furniture-hero__nav');
    breadcrumb.innerHTML = `
      <a href="ngb.html">Home</a>
      <span>/</span>
      <a href="ngb.html#furniture">Furniture</a>
      <span>/</span>
      <span>${product.title}</span>
    `;
    
    // Update main image
    document.querySelector('.product-detail__main-image').src = product.image;
    document.querySelector('.product-detail__main-image').alt = product.title;
    
    // Update sidebar content
    document.querySelector('.product-detail__category').textContent = product.categoryDisplay;
    document.querySelector('.product-detail__title').textContent = product.title;
    document.querySelector('.product-detail__description').textContent = 
      product.detailedDescription;
    
    // Update specs
    document.querySelector('#product-price').textContent = product.priceRange;
    document.querySelector('#product-material').textContent = product.material;
    document.querySelector('#product-lead-time').textContent = product.leadTime;
    
    // Populate customization dropdowns
    populateDropdown('color-select', product.customization.colors);
    populateDropdown('material-select', product.customization.materials);
    populateDropdown('size-select', product.customization.sizes);
    populateDropdown('finish-select', product.customization.finishes);
    
    // Load related products
    loadRelatedProducts(product.id);
  }
  
  // Helper: Populate dropdown options
  function populateDropdown(id, options) {
    const select = document.getElementById(id);
    if (!select || !options) return;
    
    // Keep first option (placeholder)
    const firstOption = select.firstElementChild;
    select.innerHTML = '';
    select.appendChild(firstOption);
    
    // Add options
    options.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option;
      opt.textContent = option;
      select.appendChild(opt);
    });
  }
  
  // Helper: Load related products
  function loadRelatedProducts(currentId) {
    const related = getRelatedProducts(currentId, 3);
    const grid = document.querySelector('.related-products__grid');
    
    grid.innerHTML = related.map(item => `
      <a href="furniture.html?id=${item.id}" class="product-card-compact">
        <img src="${item.image}" alt="${item.title}" class="product-card-compact__image" />
        <div class="product-card-compact__content">
          <h3 class="product-card-compact__title">${item.title}</h3>
          <p class="product-card-compact__price">${item.priceRange}</p>
        </div>
      </a>
    `).join('');
  }
  
  // Handle form submission
  document.getElementById('furniture-customize-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const quoteData = {
      product: product.title,
      category: product.categoryDisplay,
      color: formData.get('color'),
      material: formData.get('material'),
      size: formData.get('size'),
      finish: formData.get('finish'),
      notes: formData.get('notes')
    };
    
    console.log('Quote request:', quoteData);
    
    alert(`Thank you for your interest in the ${product.title}!\n\nYour customization request has been received. Our team will contact you within 24 hours with a detailed quote.\n\nEstimated Price Range: ${product.priceRange}`);
    
    e.target.reset();
  });
  
  // Update footer year
  document.getElementById('year').textContent = new Date().getFullYear();
</script>
```

---

### **Step 4: Update HTML Template**

In `furniture.html`, add `id` attributes to elements that need to be dynamically updated:

```html
<!-- Specs section -->
<div class="product-spec product-spec--price">
  <span class="product-spec__label">Price Range</span>
  <span id="product-price" class="product-spec__value">Loading...</span>
</div>

<div class="product-spec">
  <span class="product-spec__label">Materials</span>
  <span id="product-material" class="product-spec__value">Loading...</span>
</div>

<div class="product-spec">
  <span class="product-spec__label">Lead Time</span>
  <span id="product-lead-time" class="product-spec__value">Loading...</span>
</div>
```

---

## 🎯 RESULT

After implementation:

1. **Homepage:** User clicks "VIEW DETAILS" on any product
2. **URL:** Opens `furniture.html?id=1` (or 2, 3, 4, etc.)
3. **JavaScript:** Reads `?id=1` from URL
4. **Database:** Finds product with `id: 1` in `FURNITURE_DATABASE`
5. **Page:** Dynamically populates all content with that product's data

**Each product now shows its unique:**
- Title
- Image
- Description
- Materials (including Mahogany, Mugavu, Musyamba)
- Price range in UGX
- Customization options
- Related products

---

## ✅ TESTING

1. Click "VIEW DETAILS" on Sofa → See sofa info
2. Click "VIEW DETAILS" on Wardrobe → See wardrobe info
3. Click "VIEW DETAILS" on Dining Set → See dining set info
4. Click "VIEW DETAILS" on Coffee Table → See coffee table info

**No more duplicate sofa information!**

---

## 📊 UGANDAN MARKET CONTEXT

**Wood Types Used:**
- **Mahogany** - Premium hardwood, dark rich color
- **Mugavu (Mvule)** - Local Ugandan hardwood, durable
- **Musyamba** - Mid-range hardwood, light color

**Price Ranges (Realistic UGX):**
- Coffee Tables: UGX 800,000 - 2,000,000
- Sofas: UGX 2,500,000 - 4,500,000
- Wardrobes: UGX 3,000,000 - 6,500,000
- Dining Sets: UGX 3,500,000 - 7,000,000

These reflect actual Ugandan custom furniture market prices for quality pieces.

---

## 🔧 MAINTENANCE

**To add a new product:**
1. Add new object to `FURNITURE_DATABASE` array in `furniture-data.js`
2. Assign unique `id`
3. Include all required fields
4. **No HTML changes needed!**

The system is now fully dynamic and scalable.
