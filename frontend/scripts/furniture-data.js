/**
 * NGB Interiors - Furniture Product Database
 * Centralized product data for homepage gallery and detail pages
 * 
 * TO UPDATE: Edit product objects directly in this file
 * - Prices are in UGX (Uganda Shillings)
 * - Wood types: Mahogany, Mugavu (Mvule), Musyamba (local Ugandan hardwoods)
 */

const FURNITURE_DATABASE = [
  // ==================== SOFAS & LIVING ROOM ====================
  {
    id: 1,
    title: 'Contemporary 3-Seater Sofa',
    category: 'sofas',
    categoryDisplay: 'Sofas & Living Room',
    image: './assets/images/gallery/sofas/sofa (1).jpg',
    description: 'Handcrafted three-seater sofa with premium upholstery and solid hardwood frame.',
    detailedDescription: 'Experience unparalleled comfort with this exquisitely crafted three-seater sofa. Each piece is meticulously handbuilt by master artisans using time-honored joinery techniques paired with modern ergonomic principles. The solid Mahogany frame ensures structural integrity for generations, while the premium upholstery envelops you in luxurious softness. Perfect for living rooms that demand both sophistication and everyday practicality.',
    material: 'Solid Mahogany frame, premium fabric upholstery, high-density foam cushioning, reinforced joinery',
    woodType: 'Mahogany',
    priceRange: 'UGX 2,500,000 - UGX 4,500,000',
    leadTime: '4-6 weeks from order confirmation',
    customization: {
      colors: ['Charcoal Grey', 'Navy Blue', 'Cream', 'Emerald Green', 'Burgundy', 'Mustard Yellow', 'Custom Color'],
      materials: ['Premium Linen', 'Velvet', 'Genuine Leather', 'Microfiber', 'Chenille', 'Custom Fabric'],
      sizes: ['2-Seater', '3-Seater (Standard)', '4-Seater', 'L-Shape Configuration', 'Custom Dimensions'],
      finishes: ['Natural Wood', 'Dark Walnut Stain', 'Espresso Brown', 'White Oak', 'Honey Oak', 'Custom Stain']
    }
  },
  
  {
    id: 2,
    title: 'Executive L-Shape Sectional',
    category: 'sofas',
    categoryDisplay: 'Sofas & Living Room',
    image: './assets/images/gallery/sofas/sofa (2).jpg',
    description: 'Spacious L-shaped sectional with deep seating and modular design for maximum versatility.',
    detailedDescription: 'Transform your living space into a haven of relaxation with this generously proportioned L-shaped sectional. Designed for modern family living, it features deep seating that invites you to unwind, supported by a robust Mugavu hardwood frame. The modular configuration allows you to adapt the layout to your space, while the plush cushioning provides cloud-like comfort. Ideal for entertaining guests or quiet family evenings.',
    material: 'Solid Mugavu (Mvule) frame, premium upholstery, multi-density foam system, webbed support base',
    woodType: 'Mugavu (Mvile)',
    priceRange: 'UGX 3,800,000 - UGX 6,200,000',
    leadTime: '5-7 weeks from order confirmation',
    customization: {
      colors: ['Stone Grey', 'Caramel Brown', 'Slate Blue', 'Dove White', 'Forest Green', 'Custom Color'],
      materials: ['Premium Linen', 'Velvet', 'Leather', 'Microfiber', 'Performance Fabric', 'Custom Fabric'],
      sizes: ['Left Configuration', 'Right Configuration', 'Double Chaise', 'Custom Layout'],
      finishes: ['Natural Wood', 'Dark Mahogany', 'Walnut', 'Ebony Black', 'Custom Stain']
    }
  },

  {
    id: 3,
    title: 'Classic Chesterfield Sofa',
    category: 'sofas',
    categoryDisplay: 'Sofas & Living Room',
    image: './assets/images/gallery/sofas/sofa (3).jpg',
    description: 'Timeless Chesterfield design with deep button tufting and rolled arms.',
    detailedDescription: 'Embrace timeless elegance with this authentic Chesterfield sofa, a statement piece that anchors any sophisticated interior. The signature deep button tufting and hand-rolled arms are crafted using traditional upholstery methods passed down through generations. Built on a solid Mahogany frame with hand-tied spring suspension, this piece delivers both visual grandeur and lasting comfort. A true investment in enduring style.',
    material: 'Solid Mahogany frame, hand-tied spring system, genuine leather or premium fabric, deep button tufting',
    woodType: 'Mahogany',
    priceRange: 'UGX 4,200,000 - UGX 7,500,000',
    leadTime: '6-8 weeks from order confirmation',
    customization: {
      colors: ['Cognac Brown', 'Oxford Blue', 'Hunter Green', 'Burgundy Red', 'Charcoal', 'Custom Color'],
      materials: ['Genuine Leather', 'Distressed Leather', 'Premium Velvet', 'Linen Blend', 'Custom Fabric'],
      sizes: ['2-Seater', '3-Seater (Standard)', 'Club Chair', 'Custom Size'],
      finishes: ['Natural Wood', 'Dark Walnut', 'Mahogany Stain', 'Espresso', 'Custom Stain']
    }
  },

  {
    id: 4,
    title: 'Modern Minimalist Sofa',
    category: 'sofas',
    categoryDisplay: 'Sofas & Living Room',
    image: './assets/images/gallery/sofas/sofa (4).jpg',
    description: 'Clean-lined contemporary sofa with sleek profile and tapered wooden legs.',
    detailedDescription: 'Celebrate the beauty of simplicity with this sleek contemporary sofa. Its clean lines and understated profile make it the perfect choice for modern interiors that value form and function equally. The solid Musyamba frame features elegantly tapered legs that create visual lightness, while the firm yet comfortable cushioning supports proper posture without sacrificing relaxation. An architectural piece that complements minimalist and Scandinavian-inspired spaces.',
    material: 'Solid Musyamba wood frame, high-resilience foam cushioning, premium fabric upholstery, tapered wooden legs',
    woodType: 'Musyamba',
    priceRange: 'UGX 2,200,000 - UGX 3,800,000',
    leadTime: '4-5 weeks from order confirmation',
    customization: {
      colors: ['Light Grey', 'Beige', 'Charcoal', 'Dusty Rose', 'Sage Green', 'Custom Color'],
      materials: ['Premium Linen', 'Cotton Blend', 'Microfiber', 'Performance Fabric', 'Custom Fabric'],
      sizes: ['2-Seater', '3-Seater (Standard)', 'Loveseat', 'Custom Dimensions'],
      finishes: ['Natural Wood', 'Light Oak', 'Walnut', 'Black Stain', 'White Wash', 'Custom Stain']
    }
  },

  {
    id: 5,
    title: 'Luxury Velvet Sofa Set',
    category: 'sofas',
    categoryDisplay: 'Sofas & Living Room',
    image: './assets/images/gallery/sofas/sofa (5).jpg',
    description: 'Opulent velvet upholstered sofa with gold-finished legs and plush cushioning.',
    detailedDescription: 'Indulge in pure luxury with this sumptuous velvet sofa that commands attention in any room. The rich, light-catching fabric drapes over generous cushioning, creating an inviting tactile experience. Gold-finished legs add a touch of glamour, while the solid Mahogany construction ensures this showpiece remains both beautiful and durable. Perfect for those who appreciate the finer things and want their furniture to reflect their discerning taste.',
    material: 'Solid Mahogany frame, premium velvet upholstery, high-density foam, gold-finished metal legs',
    woodType: 'Mahogany',
    priceRange: 'UGX 3,500,000 - UGX 5,800,000',
    leadTime: '5-6 weeks from order confirmation',
    customization: {
      colors: ['Emerald Green', 'Navy Blue', 'Blush Pink', 'Grey', 'Burgundy', 'Teal', 'Custom Color'],
      materials: ['Premium Velvet', 'Crushed Velvet', 'Chenille', 'Silk Blend', 'Custom Fabric'],
      sizes: ['2-Seater', '3-Seater (Standard)', '3-Piece Set', 'Custom Configuration'],
      finishes: ['Gold Legs', 'Rose Gold Legs', 'Chrome Legs', 'Black Metal Legs', 'Wood Legs']
    }
  },

  // ==================== DINING FURNITURE ====================
  {
    id: 6,
    title: 'Classic 6-Seater Dining Set',
    category: 'dining',
    categoryDisplay: 'Dining Furniture',
    image: './assets/images/gallery/dining tables/dining (1).jpg',
    description: 'Elegant solid wood dining table with six upholstered chairs for family gatherings.',
    detailedDescription: 'Gather your loved ones around this magnificent dining set that blends timeless design with exceptional craftsmanship. The solid Mahogany table showcases the natural beauty of wood grain through expert finishing techniques, while the six accompanying chairs feature ergonomically designed backs and cushioned seating for extended dining comfort. Built using traditional mortise and tenon joinery, this set will host generations of memorable meals and celebrations.',
    material: 'Solid Mahogany table top and legs, hardwood chair frames, cushioned upholstered seats, reinforced corner brackets',
    woodType: 'Mahogany',
    priceRange: 'UGX 3,500,000 - UGX 6,000,000',
    leadTime: '6-8 weeks from order confirmation',
    customization: {
      colors: ['Natural Wood Tone', 'Dark Mahogany', 'Walnut Brown', 'Espresso', 'Custom Stain'],
      materials: ['Solid Mahogany', 'Solid Musyamba', 'Oak Wood', 'Mixed Hardwoods'],
      sizes: ['4-Seater', '6-Seater (Standard)', '8-Seater', '10-Seater', 'Custom Dimensions'],
      finishes: ['Matte Lacquer', 'High-Gloss Finish', 'Natural Oil', 'Satin Varnish', 'Wax Polish']
    }
  },

  {
    id: 7,
    title: 'Contemporary Extendable Dining Table',
    category: 'dining',
    categoryDisplay: 'Dining Furniture',
    image: './assets/images/gallery/dining tables/dining (2).jpg',
    description: 'Modern dining table with extension mechanism for flexible seating arrangements.',
    detailedDescription: 'Adaptability meets elegance in this ingeniously designed extendable dining table. Perfect for contemporary homes where space optimization is key, the smooth extension mechanism allows you to effortlessly transition from intimate family dinners to larger gatherings. Crafted from solid Musyamba wood with a refined finish that highlights its natural character, this table pairs modern functionality with enduring quality.',
    material: 'Solid Musyamba wood, precision extension mechanism, reinforced support system',
    woodType: 'Musyamba',
    priceRange: 'UGX 2,800,000 - UGX 4,500,000',
    leadTime: '5-7 weeks from order confirmation',
    customization: {
      colors: ['Natural Wood', 'Light Oak', 'Walnut', 'Grey Stain', 'White Wash', 'Custom Color'],
      materials: ['Solid Musyamba', 'Solid Mahogany', 'Oak', 'Teak'],
      sizes: ['4-6 Seater Extension', '6-8 Seater Extension', '8-10 Seater Extension', 'Custom Size'],
      finishes: ['Matte Finish', 'Semi-Gloss', 'Natural Oil', 'Lacquer', 'Wax Finish']
    }
  },

  {
    id: 8,
    title: 'Rustic Farmhouse Dining Set',
    category: 'dining',
    categoryDisplay: 'Dining Furniture',
    image: './assets/images/gallery/dining tables/dining (3).jpg',
    description: 'Chunky wooden dining table with bench seating and rustic charm.',
    detailedDescription: 'Bring warmth and character to your home with this rustic farmhouse dining set that celebrates the raw beauty of natural wood. The substantial table features a thick Mugavu top with visible grain patterns and tactile texture, supported by robust legs that convey strength and stability. Paired with matching benches and chairs, this set creates a welcoming atmosphere perfect for casual family meals and convivial gatherings.',
    material: 'Solid Mugavu (Mvule) wood, hand-finished surface, chunky leg construction, natural wood characteristics',
    woodType: 'Mugavu (Mvule)',
    priceRange: 'UGX 3,200,000 - UGX 5,500,000',
    leadTime: '6-7 weeks from order confirmation',
    customization: {
      colors: ['Natural Wood', 'Honey Oak', 'Weathered Grey', 'Distressed Brown', 'Custom Finish'],
      materials: ['Solid Mugavu', 'Solid Musyamba', 'Reclaimed Wood', 'Mixed Hardwoods'],
      sizes: ['6-Seater', '8-Seater (Standard)', '10-Seater', 'Custom Length'],
      finishes: ['Natural Wax', 'Matte Varnish', 'Oil Finish', 'Distressed Finish', 'Raw Wood']
    }
  },

  {
    id: 9,
    title: 'Executive 8-Seater Dining Suite',
    category: 'dining',
    categoryDisplay: 'Dining Furniture',
    image: './assets/images/gallery/dining tables/dining (4).jpg',
    description: 'Grand dining suite with eight luxurious chairs and spacious table for formal entertaining.',
    detailedDescription: 'Make every meal a memorable occasion with this commanding executive dining suite designed for those who love to entertain in style. The expansive table provides generous space for elaborate table settings, while the eight meticulously upholstered chairs ensure every guest experiences supreme comfort. Constructed from premium Mahogany with impeccable finishing, this suite transforms your dining room into a space worthy of the finest celebrations.',
    material: 'Premium Mahogany table and chairs, luxurious upholstered seating, reinforced joinery, detailed carved accents',
    woodType: 'Mahogany',
    priceRange: 'UGX 5,500,000 - UGX 9,000,000',
    leadTime: '8-10 weeks from order confirmation',
    customization: {
      colors: ['Rich Mahogany', 'Dark Walnut', 'Espresso', 'Cherry Wood Tone', 'Custom Stain'],
      materials: ['Premium Mahogany', 'Solid Oak', 'Walnut Wood', 'Teak', 'Mixed Hardwoods'],
      sizes: ['8-Seater (Standard)', '10-Seater', '12-Seater', 'Custom Dimensions'],
      finishes: ['High-Gloss Lacquer', 'Semi-Gloss', 'Hand-Rubbed Finish', 'Satin Varnish']
    }
  },

  {
    id: 10,
    title: 'Modern Glass & Wood Dining Set',
    category: 'dining',
    categoryDisplay: 'Dining Furniture',
    image: './assets/images/gallery/dining tables/dining (5).jpg',
    description: 'Contemporary dining table featuring tempered glass top with solid wood base.',
    detailedDescription: 'Experience the perfect marriage of materials with this striking contemporary dining set. The clear tempered glass top creates an airy, spacious feel while showcasing the sculptural beauty of the solid wood base below. This design choice makes smaller dining areas feel more open while maintaining the warmth and authenticity of natural wood. The accompanying chairs blend comfort with clean-lined aesthetics for a cohesive modern look.',
    material: 'Tempered safety glass top, solid Musyamba wood base, chrome or wood chair frames, cushioned seats',
    woodType: 'Musyamba with Glass',
    priceRange: 'UGX 3,000,000 - UGX 5,200,000',
    leadTime: '6-7 weeks from order confirmation',
    customization: {
      colors: ['Natural Wood', 'Walnut', 'Black Wood', 'White Oak', 'Custom Stain'],
      materials: ['Glass & Musyamba', 'Glass & Mahogany', 'Glass & Metal', 'All Wood Option'],
      sizes: ['4-Seater', '6-Seater (Standard)', '8-Seater', 'Custom Size'],
      finishes: ['Natural Wood Base', 'Black Stain', 'Chrome Accents', 'Mixed Materials']
    }
  },

  // ==================== WARDROBES & STORAGE ====================
  {
    id: 11,
    title: 'Classic 3-Door Wardrobe',
    category: 'wardrobes',
    categoryDisplay: 'Wardrobes & Storage',
    image: './assets/images/gallery/wadrobes/wadrobes (1).jpg',
    description: 'Traditional three-door wardrobe with hanging space, shelves, and drawer storage.',
    detailedDescription: 'Organize your wardrobe with timeless elegance using this beautifully proportioned three-door wardrobe. Crafted from solid Mugavu wood with premium MDF accents, it offers versatile storage with hanging rails, adjustable shelving, and integrated drawers. The classic design features quality hardware including soft-close hinges and polished handles, ensuring smooth operation for years to come. An essential piece that combines practical storage with refined aesthetics.',
    material: 'Solid Mugavu (Mvule) frame, premium MDF panels, soft-close hinges, adjustable shelves, chrome handles',
    woodType: 'Mugavu (Mvule) with MDF',
    priceRange: 'UGX 2,500,000 - UGX 4,200,000',
    leadTime: '5-6 weeks from order confirmation',
    customization: {
      colors: ['Natural Wood', 'Walnut Finish', 'White', 'Grey Oak', 'Espresso', 'Custom Color'],
      materials: ['MDF with Mugavu Veneer', 'Solid Mahogany', 'Solid Mugavu', 'Laminate Finish'],
      sizes: ['2-Door', '3-Door (Standard)', '4-Door', 'Custom Width and Height'],
      finishes: ['Matte', 'High-Gloss', 'Wood Grain Texture', 'Painted Finish']
    }
  },

  {
    id: 12,
    title: 'Modern Sliding Door Wardrobe',
    category: 'wardrobes',
    categoryDisplay: 'Wardrobes & Storage',
    image: './assets/images/gallery/wadrobes/wadrobes (2).jpg',
    description: 'Space-saving wardrobe with smooth sliding doors and contemporary design.',
    detailedDescription: 'Maximize your bedroom space with this sleek sliding door wardrobe system. The smooth-gliding doors operate on premium German-engineered tracks, providing silent and effortless access to your belongings. The interior features a thoughtfully designed layout with hanging sections, shelving units, and accessory drawers. Perfect for modern homes where floor space is at a premium but style cannot be compromised.',
    material: 'Premium MDF with wood veneer, aluminum sliding track system, soft-close mechanism, adjustable interior fittings',
    woodType: 'MDF with Mahogany Veneer',
    priceRange: 'UGX 3,200,000 - UGX 5,800,000',
    leadTime: '6-7 weeks from order confirmation',
    customization: {
      colors: ['White', 'Grey', 'Walnut', 'Black', 'Two-Tone', 'Custom Color'],
      materials: ['MDF with Veneer', 'High-Gloss Acrylic', 'Mirror Panels', 'Solid Wood', 'Laminate'],
      sizes: ['2-Door Sliding', '3-Door Sliding', '4-Door Sliding', 'Custom Width'],
      finishes: ['Matte', 'High-Gloss', 'Textured', 'Mirror Finish', 'Mixed Materials']
    }
  },

  {
    id: 13,
    title: 'Built-In Wardrobe System',
    category: 'wardrobes',
    categoryDisplay: 'Wardrobes & Storage',
    image: './assets/images/gallery/wadrobes/wadrobes (3).jpg',
    description: 'Floor-to-ceiling custom wardrobe with tailored interior configuration.',
    detailedDescription: 'Transform your bedroom into an organized sanctuary with this bespoke built-in wardrobe system. Designed to utilize every inch of available space from floor to ceiling, this solution is fully customized to your specific storage needs. The interior can be configured with hanging rails at various heights, pull-out shoe racks, tie and belt organizers, jewelry drawers, and adjustable shelving. Soft-close doors and premium hardware ensure whisper-quiet operation and lasting durability.',
    material: 'Premium MDF construction, solid wood framing, German soft-close hardware, adjustable internal systems, quality drawer slides',
    woodType: 'MDF with Mugavu Accents',
    priceRange: 'UGX 4,000,000 - UGX 8,500,000',
    leadTime: '7-9 weeks from order confirmation',
    customization: {
      colors: ['White', 'Walnut', 'Grey Oak', 'Cream', 'Black', 'Two-Tone', 'Custom Color'],
      materials: ['MDF with Wood Veneer', 'Solid Mahogany', 'High-Gloss Laminate', 'Mixed Materials'],
      sizes: ['2-Section', '3-Section', '4-Section', 'Fully Custom Layout'],
      finishes: ['Matte', 'High-Gloss', 'Wood Grain', 'Textured', 'Mirror Inserts']
    }
  },

  {
    id: 14,
    title: '4-Door Executive Wardrobe',
    category: 'wardrobes',
    categoryDisplay: 'Wardrobes & Storage',
    image: './assets/images/gallery/wadrobes/wadrobes (4).jpg',
    description: 'Spacious four-door wardrobe with generous storage and elegant detailing.',
    detailedDescription: 'Command attention with this impressive four-door wardrobe that offers abundant storage without sacrificing style. Constructed from solid Mahogany with refined detailing, it features a symmetrical design that creates visual balance in your bedroom. The interior is thoughtfully divided into sections for hanging, folding, and accessory storage, while the quality construction ensures doors remain properly aligned and hinges operate smoothly for decades.',
    material: 'Solid Mahogany construction, premium MDF panels, soft-close hinges, adjustable shelving, brass-finish handles',
    woodType: 'Mahogany',
    priceRange: 'UGX 3,800,000 - UGX 6,500,000',
    leadTime: '6-8 weeks from order confirmation',
    customization: {
      colors: ['Natural Mahogany', 'Dark Walnut', 'Espresso', 'Grey Stain', 'White', 'Custom Color'],
      materials: ['Solid Mahogany', 'MDF with Veneer', 'Solid Mugavu', 'Mixed Wood'],
      sizes: ['3-Door', '4-Door (Standard)', '5-Door', '6-Door', 'Custom Width'],
      finishes: ['Matte Lacquer', 'Glossy', 'Satin Finish', 'Natural Wood', 'Painted']
    }
  },

  {
    id: 15,
    title: 'Luxury Walk-In Closet System',
    category: 'wardrobes',
    categoryDisplay: 'Wardrobes & Storage',
    image: './assets/images/gallery/wadrobes/wadrobes (5).jpg',
    description: 'Complete walk-in closet solution with island unit and LED lighting.',
    detailedDescription: 'Experience the ultimate in luxury storage with this comprehensive walk-in closet system. Designed for master suites with dedicated dressing rooms, this solution includes perimeter hanging and shelving, a central island with jewelry drawers and glass display top, integrated LED lighting, and premium finishes throughout. Every element is crafted to create a boutique-like experience where getting dressed becomes a daily pleasure. Custom configured to your exact space and storage requirements.',
    material: 'Premium MDF with wood veneer, solid wood drawer boxes, glass display surfaces, integrated LED lighting, soft-close hardware',
    woodType: 'Mixed (Mahogany and MDF)',
    priceRange: 'UGX 8,000,000 - UGX 15,000,000',
    leadTime: '10-12 weeks from order confirmation',
    customization: {
      colors: ['White', 'Walnut', 'Grey', 'Champagne', 'Two-Tone', 'Fully Custom Palette'],
      materials: ['MDF with Veneer', 'Solid Wood', 'High-Gloss Finish', 'Mixed Materials', 'Glass Accents'],
      sizes: ['Small Room (8-10 sqm)', 'Medium Room (10-15 sqm)', 'Large Room (15+ sqm)', 'Fully Custom'],
      finishes: ['Matte', 'High-Gloss', 'Mixed Textures', 'Mirror Features', 'Custom Finish']
    }
  },

  // ==================== BEDS & BEDROOM ====================
  {
    id: 16,
    title: 'Upholstered Platform Bed - Queen',
    category: 'beds',
    categoryDisplay: 'Beds & Bedroom',
    image: './assets/images/gallery/beds/bed (1).jpg',
    description: 'Contemporary queen-size bed with padded headboard and platform base.',
    detailedDescription: 'Elevate your bedroom with this sophisticated upholstered platform bed that combines modern aesthetics with exceptional comfort. The generously padded headboard provides luxurious support for reading or watching television, while the low-profile platform base eliminates the need for a box spring. Upholstered in premium fabric with expert tufting details, this bed becomes the focal point of any bedroom. The solid wood frame ensures structural integrity and years of restful sleep.',
    material: 'Solid hardwood frame, high-density foam padding, premium fabric upholstery, platform slat system',
    woodType: 'Hardwood Frame',
    priceRange: 'UGX 2,800,000 - UGX 4,500,000',
    leadTime: '5-7 weeks from order confirmation',
    customization: {
      colors: ['Light Grey', 'Charcoal', 'Cream', 'Navy Blue', 'Beige', 'Custom Color'],
      materials: ['Premium Linen', 'Velvet', 'Leather', 'Microfiber', 'Chenille', 'Custom Fabric'],
      sizes: ['Single (3ft)', 'Double (4.5ft)', 'Queen (5ft - Standard)', 'King (6ft)', 'Custom Size'],
      finishes: ['Tufted Headboard', 'Plain Headboard', 'Winged Design', 'Channel Tufting']
    }
  },

  {
    id: 17,
    title: 'Classic Wooden Bed Frame - King',
    category: 'beds',
    categoryDisplay: 'Beds & Bedroom',
    image: './assets/images/gallery/beds/bed (2).jpg',
    description: 'Solid wood king-size bed with carved headboard and footboard.',
    detailedDescription: 'Experience timeless elegance with this solid wood bed frame crafted from premium Mahogany. The intricately carved headboard showcases traditional woodworking artistry, while the matching footboard creates symmetrical beauty. Built using mortise and tenon joinery for maximum strength, this bed is designed to become a treasured family heirloom. The natural wood finish allows the rich grain patterns to shine, bringing warmth and character to your master bedroom.',
    material: 'Solid Mahogany construction, hand-carved details, reinforced joinery, wooden slat support system',
    woodType: 'Mahogany',
    priceRange: 'UGX 3,500,000 - UGX 6,000,000',
    leadTime: '7-9 weeks from order confirmation',
    customization: {
      colors: ['Natural Mahogany', 'Dark Walnut', 'Cherry Wood', 'Espresso', 'Custom Stain'],
      materials: ['Solid Mahogany', 'Solid Mugavu', 'Solid Oak', 'Mixed Hardwoods'],
      sizes: ['Queen (5ft)', 'King (6ft - Standard)', 'Super King (6.5ft)', 'Custom Size'],
      finishes: ['Natural Oil', 'Satin Lacquer', 'High-Gloss', 'Hand-Rubbed Finish']
    }
  },

  {
    id: 18,
    title: 'Modern Low-Profile Bed',
    category: 'beds',
    categoryDisplay: 'Beds & Bedroom',
    image: './assets/images/gallery/beds/bed (3).jpg',
    description: 'Minimalist low-height bed with clean lines and platform design.',
    detailedDescription: 'Embrace contemporary minimalism with this sleek low-profile bed that brings a sense of calm spaciousness to your bedroom. The streamlined design sits close to the floor, creating an open, airy feel while maintaining a strong geometric presence. Crafted from solid Musyamba wood with a smooth matte finish, this bed exemplifies the "less is more" philosophy. Perfect for modern, Zen-inspired, or Japanese-influenced interiors.',
    material: 'Solid Musyamba wood frame, platform base with integrated slat system, low-height design',
    woodType: 'Musyamba',
    priceRange: 'UGX 2,200,000 - UGX 3,800,000',
    leadTime: '4-6 weeks from order confirmation',
    customization: {
      colors: ['Natural Wood', 'Light Oak', 'Walnut', 'Black Stain', 'White Wash', 'Custom Color'],
      materials: ['Solid Musyamba', 'Solid Oak', 'Teak', 'Bamboo'],
      sizes: ['Double (4.5ft)', 'Queen (5ft)', 'King (6ft - Standard)', 'Custom Size'],
      finishes: ['Matte Natural', 'Oil Finish', 'Lacquer', 'Wax Polish']
    }
  },

  {
    id: 19,
    title: 'Storage Bed with Drawers',
    category: 'beds',
    categoryDisplay: 'Beds & Bedroom',
    image: './assets/images/gallery/beds/bed (4).jpg',
    description: 'Practical bed frame with built-in drawer storage underneath.',
    detailedDescription: 'Maximize your bedroom storage with this ingeniously designed bed that combines sleeping comfort with practical organization. Four spacious drawers glide out smoothly on quality runners, providing ample space for bedding, seasonal clothing, or personal items. The solid wood construction ensures the frame remains sturdy even with the added storage components. An ideal solution for smaller bedrooms or anyone who values efficient space utilization.',
    material: 'Solid wood frame, MDF drawer boxes, quality drawer slides, integrated slat support',
    woodType: 'Mixed (Hardwood and MDF)',
    priceRange: 'UGX 2,500,000 - UGX 4,200,000',
    leadTime: '5-7 weeks from order confirmation',
    customization: {
      colors: ['Natural Wood', 'White', 'Grey', 'Walnut', 'Espresso', 'Custom Color'],
      materials: ['Solid Wood', 'MDF with Veneer', 'Mixed Wood', 'Painted Finish'],
      sizes: ['Double (4.5ft)', 'Queen (5ft - Standard)', 'King (6ft)', 'Custom Size'],
      finishes: ['Matte', 'Semi-Gloss', 'Natural Wood', 'Painted']
    }
  },

  {
    id: 20,
    title: 'Four-Poster Canopy Bed',
    category: 'beds',
    categoryDisplay: 'Beds & Bedroom',
    image: './assets/images/gallery/beds/bed (5).jpg',
    description: 'Elegant four-poster bed with tall posts for dramatic bedroom presence.',
    detailedDescription: 'Create a bedroom sanctuary with this majestic four-poster bed that evokes romance and grandeur. The tall, beautifully turned posts frame your sleeping area and can be draped with fabric for privacy and drama. Constructed from solid Mahogany with meticulous attention to proportion and detail, this bed commands attention while providing exceptional comfort. A statement piece for those who appreciate traditional elegance with a touch of theatrical flair.',
    material: 'Solid Mahogany posts and frame, turned post details, reinforced joinery, slat support system',
    woodType: 'Mahogany',
    priceRange: 'UGX 4,000,000 - UGX 7,500,000',
    leadTime: '8-10 weeks from order confirmation',
    customization: {
      colors: ['Natural Mahogany', 'Dark Walnut', 'Espresso', 'Cherry', 'Custom Stain'],
      materials: ['Solid Mahogany', 'Solid Oak', 'Solid Mugavu', 'Mixed Hardwoods'],
      sizes: ['Queen (5ft)', 'King (6ft - Standard)', 'Super King (6.5ft)', 'Custom Size'],
      finishes: ['Natural Oil', 'Satin Lacquer', 'High-Gloss', 'Distressed Finish']
    }
  },

  // ==================== COFFEE TABLES ====================
  {
    id: 21,
    title: 'Contemporary Glass Coffee Table',
    category: 'tables',
    categoryDisplay: 'Coffee Tables',
    image: './assets/images/gallery/coffee sets(center tables)/center table (2).jpg',
    description: 'Modern coffee table with tempered glass top and wooden base.',
    detailedDescription: 'Add contemporary sophistication to your living room with this elegant glass and wood coffee table. The clear tempered glass top creates visual lightness while providing a practical surface for drinks, books, and decorative objects. The solid Musyamba wood base provides stability and warmth, creating an attractive contrast of materials. The transparent top allows your beautiful rug to remain visible while the open design prevents the space from feeling cluttered.',
    material: 'Tempered safety glass top (12mm), solid Musyamba wood base, polished finish',
    woodType: 'Musyamba with Glass',
    priceRange: 'UGX 800,000 - UGX 1,500,000',
    leadTime: '3-4 weeks from order confirmation',
    customization: {
      colors: ['Natural Wood', 'Walnut', 'Black Wood', 'White Oak', 'Grey Stain', 'Custom Color'],
      materials: ['Glass & Musyamba', 'Glass & Mahogany', 'Glass & Metal', 'All Wood Option'],
      sizes: ['Small (90cm x 60cm)', 'Medium (120cm x 70cm)', 'Large (150cm x 80cm)', 'Custom Dimensions'],
      finishes: ['Natural Wood Base', 'Stained Base', 'High-Polish Glass', 'Matte Wood']
    }
  },

  {
    id: 22,
    title: 'Solid Wood Coffee Table',
    category: 'tables',
    categoryDisplay: 'Coffee Tables',
    image: './assets/images/gallery/coffee sets(center tables)/center table (3).jpg',
    description: 'Classic all-wood coffee table with lower shelf storage.',
    detailedDescription: 'Ground your living room with this substantial solid wood coffee table that celebrates natural material beauty. Crafted entirely from Mugavu hardwood, it features a spacious top surface and a convenient lower shelf for magazines, remote controls, or decorative items. The visible wood grain and tactile finish create warmth and authenticity, while the sturdy construction ensures this piece will serve your family for generations. A versatile centerpiece that complements both traditional and transitional interiors.',
    material: 'Solid Mugavu (Mvule) wood throughout, dual-level construction, natural wood characteristics',
    woodType: 'Mugavu (Mvule)',
    priceRange: 'UGX 900,000 - UGX 1,800,000',
    leadTime: '3-5 weeks from order confirmation',
    customization: {
      colors: ['Natural Wood', 'Honey Oak', 'Dark Walnut', 'Espresso', 'Grey Wash', 'Custom Stain'],
      materials: ['Solid Mugavu', 'Solid Mahogany', 'Solid Musyamba', 'Oak Wood'],
      sizes: ['Small (90cm)', 'Medium (120cm)', 'Large (140cm)', 'Custom Dimensions'],
      finishes: ['Natural Oil', 'Matte Varnish', 'Satin Lacquer', 'Wax Polish', 'Distressed']
    }
  },

  {
    id: 23,
    title: 'Marble Top Coffee Table',
    category: 'tables',
    categoryDisplay: 'Coffee Tables',
    image: './assets/images/gallery/coffee sets(center tables)/center table (4).jpg',
    description: 'Luxury coffee table featuring genuine marble top with metal base.',
    detailedDescription: 'Make an opulent statement with this luxurious marble-topped coffee table that brings hotel-suite elegance to your home. The genuine marble surface features natural veining patterns that make each piece unique, while providing a cool, smooth surface perfect for entertaining. The sleek metal base in your choice of finish provides modern contrast and exceptional stability. This investment piece elevates any living room into a sophisticated gathering space.',
    material: 'Genuine marble top (20mm thick), powder-coated metal base, protective felt pads',
    woodType: 'Marble with Metal Base',
    priceRange: 'UGX 1,500,000 - UGX 2,800,000',
    leadTime: '4-6 weeks from order confirmation',
    customization: {
      colors: ['White Marble', 'Black Marble', 'Grey Marble', 'Beige Marble', 'Green Marble'],
      materials: ['White Marble & Gold', 'Black Marble & Chrome', 'Grey Marble & Black', 'Custom Combination'],
      sizes: ['Small (80cm)', 'Medium (100cm)', 'Large (120cm)', 'Custom Size'],
      finishes: ['Polished Marble', 'Matte Marble', 'Gold Metal Base', 'Chrome Base', 'Black Metal Base']
    }
  },

  {
    id: 24,
    title: 'Nested Coffee Table Set',
    category: 'tables',
    categoryDisplay: 'Coffee Tables',
    image: './assets/images/gallery/coffee sets(center tables)/center table (5).jpg',
    description: 'Set of three nesting tables for flexible arrangement and storage.',
    detailedDescription: 'Enjoy maximum flexibility with this clever set of three nesting tables that adapt to your lifestyle. Use them together as a layered coffee table arrangement, separate them to create multiple side tables when entertaining, or nest them compactly when you need extra floor space. Each table is crafted from solid wood with attention to proportion and finish, featuring modern metal legs that add industrial chic. A smart solution for dynamic living spaces.',
    material: 'Solid Musyamba wood tops, powder-coated metal legs, protective floor glides',
    woodType: 'Musyamba',
    priceRange: 'UGX 1,200,000 - UGX 2,000,000',
    leadTime: '4-5 weeks from order confirmation',
    customization: {
      colors: ['Natural Wood', 'Walnut', 'White Oak', 'Black Wood', 'Grey', 'Custom Stain'],
      materials: ['Wood & Black Metal', 'Wood & Gold Metal', 'Wood & Chrome', 'All Wood Legs'],
      sizes: ['Small Set (60/70/80cm)', 'Standard Set (70/80/90cm)', 'Large Set (80/90/100cm)', 'Custom Sizes'],
      finishes: ['Natural Wood', 'Matte Finish', 'Glossy Top', 'Mixed Finishes']
    }
  },

  {
    id: 25,
    title: 'Round Coffee Table',
    category: 'tables',
    categoryDisplay: 'Coffee Tables',
    image: './assets/images/gallery/coffee sets(center tables)/center table (6).jpg',
    description: 'Circular coffee table with smooth edges and pedestal base.',
    detailedDescription: 'Soften your living room layout with this beautifully proportioned round coffee table. The circular shape promotes conversation flow and eliminates sharp corners, making it ideal for families with young children. The sturdy pedestal base maximizes leg room while the smooth Mahogany top provides ample surface area. The classic round form works beautifully with sectional sofas and creates a welcoming focal point in any seating arrangement.',
    material: 'Solid Mahogany top and pedestal base, reinforced center column, protective finish',
    woodType: 'Mahogany',
    priceRange: 'UGX 950,000 - UGX 1,700,000',
    leadTime: '4-5 weeks from order confirmation',
    customization: {
      colors: ['Natural Mahogany', 'Dark Walnut', 'Light Oak', 'Espresso', 'Custom Stain'],
      materials: ['Solid Mahogany', 'Solid Mugavu', 'Solid Oak', 'Mixed Hardwoods'],
      sizes: ['Small (80cm diameter)', 'Medium (100cm diameter)', 'Large (120cm diameter)', 'Custom Size'],
      finishes: ['Natural Oil', 'Satin Lacquer', 'High-Gloss', 'Matte Varnish']
    }
  },

  // ==================== TV UNITS ====================
  {
    id: 26,
    title: 'Modern TV Entertainment Unit',
    category: 'tv-units',
    categoryDisplay: 'TV Units & Media Storage',
    image: './assets/images/gallery/TV units/TV unit (1).jpg',
    description: 'Contemporary media console with shelving and cable management.',
    detailedDescription: 'Create an organized entertainment center with this sleek TV unit that combines form and function. Multiple compartments provide dedicated spaces for media players, gaming consoles, and decorative items, while integrated cable management keeps wires hidden. The solid wood construction with clean-lined design complements modern televisions without competing for attention. Adjustable shelves accommodate equipment of various sizes.',
    material: 'Solid Musyamba frame, MDF panels, adjustable shelving, cable management system',
    woodType: 'Musyamba',
    priceRange: 'UGX 1,800,000 - UGX 3,200,000',
    leadTime: '5-6 weeks from order confirmation',
    customization: {
      colors: ['Natural Wood', 'Walnut', 'White', 'Grey', 'Black', 'Two-Tone', 'Custom Color'],
      materials: ['Solid Wood', 'MDF with Veneer', 'High-Gloss Laminate', 'Mixed Materials'],
      sizes: ['Small (120cm)', 'Medium (150cm)', 'Large (180cm)', 'Extra Large (200cm+)', 'Custom Width'],
      finishes: ['Matte', 'High-Gloss', 'Natural Wood', 'Painted Finish']
    }
  },

  {
    id: 27,
    title: 'Wall-Mounted TV Cabinet',
    category: 'tv-units',
    categoryDisplay: 'TV Units & Media Storage',
    image: './assets/images/gallery/TV units/TV unit (2).jpg',
    description: 'Space-saving floating TV unit with closed storage cabinets.',
    detailedDescription: 'Maximize floor space with this elegant wall-mounted TV cabinet that creates a floating effect. The closed cabinet doors conceal clutter while providing ample storage for media equipment, DVDs, and accessories. Wall-mounting creates easy floor cleaning and a modern, uncluttered aesthetic. Premium hardware ensures smooth door operation and secure wall attachment. Available in various finishes to complement your interior scheme.',
    material: 'Premium MDF construction, soft-close hinges, wall mounting hardware included, adjustable internal shelves',
    woodType: 'MDF',
    priceRange: 'UGX 1,500,000 - UGX 2,800,000',
    leadTime: '4-6 weeks from order confirmation',
    customization: {
      colors: ['White', 'Walnut', 'Grey', 'Black', 'Oak', 'Custom Color'],
      materials: ['MDF with Veneer', 'High-Gloss Laminate', 'Matte Finish', 'Wood Veneer'],
      sizes: ['Small (100cm)', 'Medium (120cm)', 'Large (150cm)', 'Custom Width'],
      finishes: ['Matte', 'High-Gloss', 'Wood Grain', 'Textured']
    }
  }
];

/**
 * Get product by ID
 * @param {number|string} id - Product ID
 * @returns {object|null} Product object or null if not found
 */
function getProductById(id) {
  return FURNITURE_DATABASE.find(product => product.id === parseInt(id));
}

/**
 * Get related products (same category or other products)
 * @param {number} currentId - Current product ID to exclude
 * @param {number} limit - Maximum number of related products to return
 * @returns {array} Array of related product objects
 */
function getRelatedProducts(currentId, limit = 3) {
  const current = getProductById(currentId);
  if (!current) return FURNITURE_DATABASE.slice(0, limit);
  
  // Get products from same category first
  let related = FURNITURE_DATABASE.filter(p => 
    p.id !== currentId && p.category === current.category
  );
  
  // If not enough from same category, add other products
  if (related.length < limit) {
    const others = FURNITURE_DATABASE.filter(p => 
      p.id !== currentId && !related.includes(p)
    );
    related = [...related, ...others];
  }
  
  return related.slice(0, limit);
}

/**
 * Get all products by category
 * @param {string} category - Category slug (sofas, dining, wardrobes, tables, beds, tv-units)
 * @returns {array} Array of products in that category
 */
function getProductsByCategory(category) {
  if (category === 'all') return FURNITURE_DATABASE;
  return FURNITURE_DATABASE.filter(p => p.category === category);
}
