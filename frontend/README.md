# NGB Interiors - Frontend

Luxury interior design and custom furniture website.

## 🏗️ Site Structure

```
frontend/
├── ngb.html                    ← Homepage (landing page)
├── furniture-gallery.html      ← Furniture collection (27 products)
├── furniture.html              ← Product details page
├── projects.html               ← Portfolio page
├── interior-design.html        ← Interior design services
├── about.html                  ← About company
├── contact.html                ← Contact form
├── scripts/
│   ├── ngb.js                 ← Main JavaScript
│   └── furniture-data.js      ← Product database
├── styles/
│   ├── ngb.css                ← Main styles
│   └── furniture.css          ← Furniture styles
└── assets/
    └── images/
        └── gallery/           ← Product images
```

## 🎯 Key Pages

### Homepage (`ngb.html`)
Focused landing page with:
- Cinematic hero carousel (images → video)
- Services overview (4 cards)
- Portfolio preview (4 selected projects)
- Final CTA section

### Furniture Gallery (`furniture-gallery.html`)
- Browse 27 custom furniture products
- Category filters (Sofas, Dining, Wardrobes, Tables, Beds)
- Lightbox image preview
- Links to product details page

### Product Details (`furniture.html`)
- Individual product information
- Price ranges (UGX)
- Material specifications
- Customization options form
- Related products

## 🚀 Getting Started

1. Open `ngb.html` in a web browser
2. All JavaScript and CSS loads automatically
3. No build process required

## 🎨 Features

### Hero Carousel
- 4 background images rotating (6 seconds each)
- 30-second video plays after images
- Smooth fade transitions
- Fully automatic loop

### Furniture System
- Dynamic product gallery
- Category filtering
- URL-based product details (`furniture.html?id=X`)
- Lightbox preview
- Mobile responsive

### Navigation
- Mobile hamburger menu
- Smooth scrolling
- Active page highlighting
- Consistent across all pages

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Touch-friendly navigation

## 🛠️ Technical Notes

### JavaScript Structure
- `ngb.js` - Main functionality (hero, gallery, navigation)
- `furniture-data.js` - Product database and helper functions

### CSS Structure
- `ngb.css` - Global styles and components
- `furniture.css` - Furniture-specific styles

### Data Flow
```
Homepage Gallery (ngb.js)
    ↓
furnitureData (27 products - basic info)
    ↓
Creates cards with links: furniture.html?id=X

Product Details Page (furniture.html)
    ↓
Reads ID from URL
    ↓
getProductById() from furniture-data.js
    ↓
FURNITURE_DATABASE (27 products - detailed info)
    ↓
Displays product with customization options
```

## 📋 Product IDs

| Category | IDs |
|----------|-----|
| Sofas | 1-5 |
| Dining | 6-10 |
| Wardrobes | 11-15 |
| Beds | 16-20 |
| Coffee Tables | 21-25 |
| TV Units | 26-27 |

## 🎯 User Journey

```
Homepage (ngb.html)
    ↓
User sees: Hero → Services → Projects → CTA
    ↓
User clicks interest:
    • Furniture → furniture-gallery.html
    • Projects → projects.html  
    • Interior Design → interior-design.html
    • Contact → contact.html
    ↓
Dedicated page with focused content
```

## 📝 To Add Products

1. Add images to `assets/images/gallery/[category]/`
2. Update `FURNITURE_DATABASE` in `scripts/furniture-data.js`
3. Update `furnitureData` in `scripts/ngb.js`
4. Keep IDs sequential and matching in both files

## 🔧 Maintenance

- Hero images: Edit `HERO_MEDIA_CONFIG` in `ngb.js`
- Product data: Edit `furniture-data.js`
- Styles: Edit CSS files in `styles/`
- Contact info: Edit `contact.html`

## ⚠️ Important Files (Do Not Delete)

- `ngb.js` - Core functionality
- `furniture-data.js` - Product database
- `ngb.css` - Main styles
- `furniture.css` - Furniture styles

---

**NGB Interiors** — Interior Concepts & Craft
