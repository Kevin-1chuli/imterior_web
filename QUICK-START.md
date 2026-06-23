# Quick Start Guide

## Installation (3 Simple Steps)

### Step 1: Navigate to the Next.js app directory
```bash
cd next-app
```

### Step 2: Install dependencies
```bash
npm install
```
This will take about 30 seconds.

### Step 3: Start the development server
```bash
npm run dev
```

### Step 4: Open your browser
Go to **http://localhost:3000**

---

## ✅ What You Should See

- **Homepage** with hero section
- **Featured products** carousel
- **Category cards** (Beds, Sofas, Chairs)
- **Navigation header** with hamburger menu (mobile)
- **Footer** with branding

### Test Navigation
- Click "Shop Beds" → Goes to `/beds` (5 products)
- Click "Shop Sofas" → Goes to `/sofas` (5 products)  
- Click any category card → Goes to category page
- Click "Chairs" in navigation → Goes to `/chairs` (5 products)

### Test Mobile Menu
1. Resize browser to mobile size (< 768px width)
2. Click hamburger icon (☰) in top-right
3. Menu slides in from LEFT
4. Click outside or X to close

---

## 📂 Project Structure

```
next-app/
├── app/
│   ├── layout.js       # Root layout with navbar
│   ├── page.js         # Homepage
│   ├── beds/page.js    # Beds category
│   ├── sofas/page.js   # Sofas category
│   └── chairs/page.js  # Chairs category
│
├── components/
│   ├── Navbar.jsx
│   ├── HamburgerMenu.jsx
│   ├── ProductCard.jsx
│   └── CategorySlider.jsx
│
├── data/
│   └── furniture-data.js  # 15 products
│
├── styles/
│   ├── Home.module.css
│   ├── Category.module.css
│   └── components/       # Component styles
│
└── public/images/        # Add your images here
```

---

## 🎨 Customize

### Update Products
Edit `data/furniture-data.js`:
```javascript
{
  id: 1,
  name: 'Your Product',
  category: 'beds', // or 'sofas', 'chairs'
  price: 'UGX 2,000,000',
  image: '/images/beds/your-image.jpg',
  // ...
}
```

### Change Colors
Edit `app/globals.css`:
```css
:root {
  --c-gold: #b8934a;  /* Your brand color */
  --c-charcoal: #1e1e1e;
}
```

### Update Contact Info
Edit `app/page.js` (Help section):
```javascript
<span>+256 700 123 456</span>  // Your phone
<span>hello@ngbinteriors.ug</span>  // Your email
```

---

## 🚀 Deploy to Production

### Build
```bash
npm run build
```

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

---

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

### Module not found errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Images not showing
- Check image paths match: `/images/beds/bed-1.jpg`
- Ensure images exist in `/public/images/` directory
- Use placeholder: `https://via.placeholder.com/800x600`

---

## ✨ Features Working

✅ Hamburger menu slides from LEFT  
✅ Desktop: 2-4 column grid layouts  
✅ Mobile: Horizontal swipe carousels  
✅ 15 products (5 beds, 5 sofas, 5 chairs)  
✅ Smooth animations  
✅ Mobile-first responsive design  
✅ CSS Modules (scoped styling)  

---

**Ready!** Your furniture e-commerce site is running at http://localhost:3000
