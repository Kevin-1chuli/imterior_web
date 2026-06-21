# Hero Media Carousel — Technical Integration Guide

## System Overview

The media carousel is a production-ready JavaScript system that manages background media rotation for the hero section. It integrates seamlessly with the existing HTML/CSS structure without requiring any modifications.

---

## HTML Structure (No Changes Needed)

The hero section already has the proper structure for the carousel:

```html
<section id="hero" class="section section--hero">
  <div class="hero__media">
    <!-- Original image stays here -->
    <img src="/assets/images/hero-bg.jpg" class="hero__image" />
    
    <!-- Carousel injects media here (created dynamically) -->
    <!-- <div class="hero__media-carousel">
           <img class="hero__media-item" src="..." style="opacity: 0;" />
           <video class="hero__media-item" src="..." style="opacity: 0;" />
           ...
         </div> -->
    
    <!-- Overlay ensures text readability -->
    <div class="hero__overlay"></div>
  </div>
  
  <!-- Text stays on top (z-index higher than media) -->
  <div class="hero__content container">
    <h1>Transforming ideas...</h1>
    ...
  </div>
</section>
```

---

## CSS Structure (No Changes Needed)

Existing CSS already supports the carousel:

```css
.hero__media {
  position: relative;  /* Provides positioning context */
  height: 100%;
}

.hero__image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: var(--c-overlay);  /* Semi-transparent dark overlay */
  z-index: 1;
}

.hero__content {
  position: relative;
  z-index: 2;  /* Text renders above media and overlay */
}
```

---

## JavaScript Architecture

### Configuration Phase
```javascript
const HERO_MEDIA_CONFIG = {
  media: [
    'assets/images/home/img1.jpg',  // Image 1
    'assets/images/home/img2.jpg',  // Image 2
    'assets/videos/hero.mp4',        // Video
    'assets/images/home/img3.jpg',  // Image 3
    'assets/images/home/img4.jpg',  // Image 4
  ],
  transitionDuration: 6000,  // 6 seconds per item
  fadeDuration: 500,         // 0.5 seconds fade
  enableKenBurns: true,      // Subtle zoom on images
  showIndicators: false,     // No navigation dots
};
```

### Initialization Phase
```javascript
// At page load (line 871):
heroCarousel = new HeroMediaCarousel(HERO_MEDIA_CONFIG);

// This:
// 1. Finds .hero__media element
// 2. Creates carousel container (absolutely positioned)
// 3. Creates img/video elements for each media item
// 4. Preloads all media files
// 5. Shows first item (fade-in)
// 6. Starts autoplay timer
// 7. Sets up visibility observer
```

### Runtime Phase
```
Timer (6000ms) →
  nextMedia() →
    currentIndex++ →
      showCurrentMedia() →
        Hide all items (opacity: 0) →
        Show current item (opacity: 1, fade-in) →
        Play video if current is video →
        Update indicators if shown →
        Reset timer
```

---

## DOM Injection Details

### Created Structure
```javascript
// The carousel creates this structure dynamically:
<div class="hero__media-carousel" style="
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
">
  <!-- One element per media item -->
  <img class="hero__media-item" src="assets/images/home/img1.jpg" style="
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0;
    transition: opacity 500ms ease-in-out;
  " />
  
  <video class="hero__media-item" src="assets/videos/hero.mp4" style="
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0;
    transition: opacity 500ms ease-in-out;
  " autoplay muted loop playsinline />
  
  ...more items...
</div>
```

### Z-Index Stack
```
hero__content (z-index: 2)
  ├─ Text, buttons, etc.
  └─ Always visible on top

hero__overlay (z-index: 1)
  ├─ Dark overlay
  ├─ Ensures text readability
  └─ Sits on top of media

hero__media-carousel (z-index: 0, implicit)
  ├─ Background media
  ├─ Images and videos
  └─ Fades between items

hero__image (z-index: 0, implicit)
  ├─ Original fallback image
  └─ Visible if carousel fails to load
```

---

## Media Handling

### Image Processing
1. Created as `<img>` element
2. `src` attribute set to file path
3. `object-fit: cover` ensures full coverage
4. Preloaded before display (prevents flickering)
5. Ken Burns animation applied if `enableKenBurns: true`

### Video Processing
1. Created as `<video>` element
2. `autoplay`, `muted`, `loop` attributes set
3. `playsinline` for mobile compatibility
4. Auto-starts playing when faded-in
5. Auto-pauses when faded-out (below opacity threshold)

### Transition Logic
```javascript
// When transitioning to next item:
1. currentIndex = (currentIndex + 1) % media.length
2. All items: opacity = 0
3. All videos: pause()
4. Current item: opacity = 1 (fade-in)
5. If current is video: play()
6. Update indicators (if shown)
7. Reset autoplay timer
```

---

## Performance Optimizations

### Memory Management
- Media elements created once, opacity-toggled (not removed/recreated)
- Single timer for all transitions
- Intersection Observer for visibility detection

### Bandwidth Optimization
- Autoplay pauses when hero section scrolls out of view
- Videos don't load until needed (lazy-loaded)
- Preload ensures smooth transitions
- Single video instead of multiple (bandwidth-efficient)

### Rendering Performance
- Hardware-accelerated opacity transitions (GPU-friendly)
- No layout recalculation during transitions
- `will-change: opacity` handled by browser
- Fade-in/out uses `transition` property (no JavaScript animation)

---

## Configuration Changes

### Add More Media Items
Edit line 22–27 in `frontend/scripts/ngb.js`:
```javascript
media: [
  'assets/images/home/img1.jpg',
  'assets/images/home/img2.jpg',
  'assets/videos/hero.mp4',
  'assets/images/home/img3.jpg',
  'assets/images/home/img4.jpg',
  'assets/images/home/img5.jpg',  // Add more
  'assets/videos/hero2.mp4',       // Add more videos
],
```

### Change Transition Timing
```javascript
transitionDuration: 5000,  // 5 seconds (faster)
transitionDuration: 8000,  // 8 seconds (slower)
transitionDuration: 10000, // 10 seconds (leisurely)
```

### Change Fade Speed
```javascript
fadeDuration: 300,   // 0.3 seconds (snappy)
fadeDuration: 800,   // 0.8 seconds (cinematic)
fadeDuration: 1000,  // 1.0 seconds (very slow)
```

### Disable Features
```javascript
enableKenBurns: false,     // Remove zoom animation
showIndicators: true,      // Show navigation dots
```

---

## Troubleshooting Reference

| Issue | Cause | Solution |
|-------|-------|----------|
| Media not showing | File path wrong | Check exact path, case-sensitive |
| Flickering between items | File not preloaded | Verify file exists and is valid |
| Video not playing | Format issue | Ensure .mp4 with H.264 codec |
| Text hard to read | Bright background | Overlay is automatic; check image brightness |
| Carousel not starting | JavaScript error | Check console (F12), verify `heroCarousel` object |
| Slow transitions | Network issue | Check file sizes, optimize media |

---

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Mobile |
|---------|--------|---------|--------|--------|
| Images | ✅ | ✅ | ✅ | ✅ |
| Videos | ✅ | ✅ | ✅ | ✅ (if H.264) |
| Opacity Fade | ✅ | ✅ | ✅ | ✅ |
| Intersection Observer | ✅ | ✅ | ✅ | ✅ |

---

## Integration Checklist

- [x] HTML structure supports media injection
- [x] CSS z-index stack ensures text visibility
- [x] Overlay provides text readability
- [x] No HTML modifications required
- [x] No CSS modifications required
- [x] JavaScript dynamically creates carousel
- [x] Configuration in single config object
- [x] Autoplay logic with visibility detection
- [x] Video muting and looping automatic
- [x] Responsive across all screen sizes
- [x] Fallback to original image if carousel fails
- [x] Production-ready and performance-optimized

---

## File References

- **Configuration:** `frontend/scripts/ngb.js` lines 15–57
- **Class Definition:** `frontend/scripts/ngb.js` lines 59–320
- **Initialization:** `frontend/scripts/ngb.js` line 871
- **HTML Structure:** `frontend/ngb.html` lines 80–107
- **CSS Styling:** `frontend/styles/ngb.css` lines 600–650
- **Guides:** `frontend/MEDIA-CAROUSEL-SETUP.md`, `frontend/QUICK-SETUP.txt`

---

## Next Steps

1. Place media files in `assets/images/home/` and `assets/videos/`
2. Refresh browser (Ctrl+F5 or Cmd+Shift+R)
3. Verify carousel cycles through media
4. Check console (F12) for any errors
5. Adjust timing/configuration as needed
6. Optimize media before going live

---

**System Status:** ✅ Production-Ready

The carousel system is fully implemented, documented, and ready for your media files.
