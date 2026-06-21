# NGB INTERIORS - TROUBLESHOOTING GUIDE

## 🔍 Quick Diagnostics

### If Hero Section Not Showing Background Images:

**Problem:** Hero section appears but no images/video show
**Solution:**
1. Open browser console (Press F12)
2. Look for any red error messages
3. Do a **hard refresh**: 
   - Windows: `Ctrl + F5` or `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`
4. Check that image files exist in `assets/images/home/`
5. Verify video file exists at `assets/videos/0620(1).mp4`

**Expected Behavior:**
- Hero shows images that fade every 6 seconds
- After 4 images, plays video for ~30 seconds
- Then loops back to first image

---

### If Furniture Gallery Shows "Loading..." Forever:

**Problem:** Homepage furniture section stuck on "Loading furniture collection..."
**Solution:**
1. Open browser console (F12)
2. Check for JavaScript errors (look for red text)
3. Verify `ngb.js` is loading (check Network tab in dev tools)
4. Do a hard refresh (`Ctrl + F5`)

**Common Causes:**
- JavaScript error preventing gallery from rendering
- `furnitureData` array not defined
- `FurnitureGallery` class not initialized

**Check:**
- Open `frontend/scripts/ngb.js`
- Search for `const furnitureData = [` (should be around line 940)
- Search for `furnitureGallery = new FurnitureGallery` (should be around line 1802)

---

### If Furniture Gallery Shows No Products:

**Problem:** Furniture section appears but no product cards display
**Solution:**
1. Open browser console and check for errors
2. Verify images exist in gallery folders:
   - `assets/images/gallery/sofas/`
   - `assets/images/gallery/dining tables/`
   - `assets/images/gallery/wadrobes/`
   - `assets/images/gallery/beds/`
   - `assets/images/gallery/coffee sets(center tables)/`
   - `assets/images/gallery/TV units/`
3. Check that image file names match exactly (including spaces and parentheses)
4. Do hard refresh

---

### If Furniture Detail Page Shows "Product Not Found":

**Problem:** Clicking "VIEW DETAILS" shows error message
**Solution:**
1. Check that `furniture-data.js` is loaded:
   - Open `furniture.html` in text editor
   - Look for: `<script src="./scripts/furniture-data.js"></script>`
   - Should be near the bottom, BEFORE the inline script
2. Verify product IDs match:
   - IDs in `furnitureData` (ngb.js) must match IDs in `FURNITURE_DATABASE` (furniture-data.js)
3. Check browser console for errors
4. Verify URL has `?id=` parameter (e.g., `furniture.html?id=1`)

**Test:**
- Open furniture.html directly: `furniture.html?id=1`
- Should show "Contemporary 3-Seater Sofa"
- Try `?id=2`, `?id=3`, etc.

---

### If Navigation Buttons Disappear or Don't Work:

**Problem:** Navbar missing buttons or clicking doesn't navigate
**Solution:**
1. Check that all HTML pages have identical navbar structure
2. Verify each page loads `ngb.css`
3. Check for JavaScript errors that might break navbar
4. Verify links point to correct files:
   - `href="ngb.html"` for Home
   - `href="projects.html"` for Projects
   - `href="interior-design.html"` for Interior Design
   - `href="about.html"` for About Us
   - `href="contact.html"` for Contact

---

### If Mobile Menu Doesn't Work:

**Problem:** Hamburger menu doesn't open on mobile
**Solution:**
1. Check that `ngb.js` is loaded
2. Verify screen width is < 768px (resize browser or use mobile device)
3. Check browser console for JavaScript errors
4. Verify hamburger button has correct `data-` attributes

---

## 🔧 File Verification Checklist

### Check These Files Exist:

**HTML Pages:**
- ✅ `frontend/ngb.html`
- ✅ `frontend/furniture.html`
- ✅ `frontend/projects.html`
- ✅ `frontend/interior-design.html`
- ✅ `frontend/about.html`
- ✅ `frontend/contact.html`

**JavaScript:**
- ✅ `frontend/scripts/ngb.js`
- ✅ `frontend/scripts/furniture-data.js`

**CSS:**
- ✅ `frontend/styles/ngb.css`
- ✅ `frontend/styles/furniture.css`

**Images:**
- ✅ `assets/images/home/` (4 images for hero)
- ✅ `assets/images/gallery/sofas/` (5 images)
- ✅ `assets/images/gallery/dining tables/` (7 images)
- ✅ `assets/images/gallery/wadrobes/` (8 images)
- ✅ `assets/images/gallery/beds/` (14 images)
- ✅ `assets/images/gallery/coffee sets(center tables)/` (11 images)
- ✅ `assets/images/gallery/TV units/` (2 images)

**Video:**
- ✅ `assets/videos/0620(1).mp4`

---

## 🔄 Hard Refresh Instructions

**Always try a hard refresh first!**

**Windows:**
- Chrome/Edge: `Ctrl + F5` or `Ctrl + Shift + R`
- Firefox: `Ctrl + F5` or `Ctrl + Shift + R`

**Mac:**
- Chrome/Safari: `Cmd + Shift + R`
- Firefox: `Cmd + Shift + R`

**Why?** Browsers cache JavaScript and CSS files. A hard refresh forces the browser to reload everything from the server.

---

## 📝 Console Error Guide

### Common Errors and Fixes:

**Error:** `Uncaught ReferenceError: FURNITURE_DATABASE is not defined`
**Fix:** 
- Check that `furniture-data.js` loads BEFORE the inline script in `furniture.html`
- Verify the file exists at `frontend/scripts/furniture-data.js`

**Error:** `Uncaught ReferenceError: furnitureData is not defined`
**Fix:**
- Check that `furnitureData` array exists in `ngb.js` (around line 940)

**Error:** `Failed to load resource: net::ERR_FILE_NOT_FOUND`
**Fix:**
- Check the path in the error message
- Verify the file exists at that location
- Check for typos in file names (case-sensitive!)

**Error:** `Cannot read property 'id' of undefined`
**Fix:**
- Product ID in URL doesn't exist in database
- Check that product IDs are unique and match between files

---

## ✅ System Health Check

Run through this checklist:

1. **Hero Working?**
   - [ ] Open `ngb.html`
   - [ ] Hero section shows background images/video
   - [ ] Images fade every 6 seconds

2. **Furniture Gallery Working?**
   - [ ] Scroll to "Furniture Showcase" on homepage
   - [ ] Product cards display in grid
   - [ ] Can see sofas, dining, wardrobes, beds, coffee tables
   - [ ] Filter buttons work

3. **Product Details Working?**
   - [ ] Click "VIEW DETAILS" on a sofa
   - [ ] Page opens with sofa information (not generic text)
   - [ ] Click "VIEW DETAILS" on a dining set
   - [ ] Page shows dining set information (different from sofa)

4. **Navigation Working?**
   - [ ] All 6 nav buttons visible (Home, Furniture, Projects, Interior Design, About, Contact)
   - [ ] Clicking buttons navigates to correct pages
   - [ ] Current page is highlighted in navbar
   - [ ] Logo visible on all pages

5. **Mobile Responsive?**
   - [ ] Resize browser to mobile width
   - [ ] Hamburger menu appears
   - [ ] Clicking hamburger opens menu
   - [ ] Menu slides in from side
   - [ ] Links work in mobile menu

---

## 🆘 Still Having Issues?

If you've tried everything above and still have problems:

1. **Check Browser Console:**
   - Press F12
   - Go to "Console" tab
   - Look for red error messages
   - Read the error message carefully

2. **Check Network Tab:**
   - Press F12
   - Go to "Network" tab
   - Refresh page
   - Look for any files showing red (404 errors)
   - These are files that couldn't be found

3. **Verify File Structure:**
   - Make sure folders are named exactly as shown
   - Check for extra spaces in folder names
   - Verify file extensions (.jpg, .mp4, .js, .html, .css)

4. **Test in Different Browser:**
   - Try Chrome, Firefox, or Edge
   - Sometimes one browser caches aggressively

5. **Check File Permissions:**
   - Make sure you have read access to all files
   - On Windows, right-click file → Properties → Security

---

## 💡 Quick Fixes

**Fix #1: Clear Browser Cache**
1. Press `Ctrl + Shift + Delete` (or `Cmd + Shift + Delete` on Mac)
2. Select "Cached images and files"
3. Click "Clear data"
4. Reload page

**Fix #2: Disable Browser Extensions**
1. Try opening page in Incognito/Private mode
2. Extensions are usually disabled in incognito
3. If it works there, an extension was blocking something

**Fix #3: Check File Paths**
1. All paths in HTML/CSS/JS are relative
2. `../` means "go up one folder"
3. From `frontend/ngb.html`:
   - Images: `../assets/images/gallery/sofas/sofa (1).jpg`
   - Video: `../assets/videos/0620(1).mp4`
   - Scripts: `./scripts/ngb.js`

---

**Last Updated:** Troubleshooting guide complete
**Need More Help?** Check browser console (F12) for specific error messages
