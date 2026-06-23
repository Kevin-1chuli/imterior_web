/**
 * NGB Interiors - Furniture Product Database
 * Modular exports ready for API integration
 */

const FURNITURE_DATABASE = [
  // BEDS
  {
    id: 1,
    name: 'Upholstered Platform Bed',
    category: 'beds',
    price: 'UGX 2,800,000 - 4,500,000',
    image: '/images/beds/bed-1.jpg',
    description: 'Contemporary queen-size bed with padded headboard and platform base.',
    material: 'Hardwood Frame, Premium Fabric',
    woodType: 'Mahogany',
    leadTime: '5-7 weeks',
    featured: true,
  },
  {
    id: 2,
    name: 'Classic Wooden Bed Frame',
    category: 'beds',
    price: 'UGX 3,500,000 - 6,000,000',
    image: '/images/beds/bed-2.jpg',
    description: 'Solid wood king-size bed with hand-carved headboard and footboard.',
    material: 'Solid Mahogany',
    woodType: 'Mahogany',
    leadTime: '7-9 weeks',
    featured: false,
  },
  {
    id: 3,
    name: 'Modern Low-Profile Bed',
    category: 'beds',
    price: 'UGX 2,200,000 - 3,800,000',
    image: '/images/beds/bed-3.jpg',
    description: 'Minimalist low-height bed with clean lines and platform design.',
    material: 'Solid Musyamba Wood',
    woodType: 'Musyamba',
    leadTime: '4-6 weeks',
    featured: true,
  },
  {
    id: 4,
    name: 'Storage Bed with Drawers',
    category: 'beds',
    price: 'UGX 2,500,000 - 4,200,000',
    image: '/images/beds/bed-4.jpg',
    description: 'Practical bed frame with built-in drawer storage underneath.',
    material: 'Solid Wood, MDF Drawers',
    woodType: 'Mixed Hardwood',
    leadTime: '5-7 weeks',
    featured: false,
  },
  {
    id: 5,
    name: 'Four-Poster Canopy Bed',
    category: 'beds',
    price: 'UGX 4,000,000 - 7,500,000',
    image: '/images/beds/bed-5.jpg',
    description: 'Elegant four-poster bed with tall posts for dramatic presence.',
    material: 'Solid Mahogany, Turned Posts',
    woodType: 'Mahogany',
    leadTime: '8-10 weeks',
    featured: true,
  },

  // SOFAS
  {
    id: 6,
    name: 'Contemporary 3-Seater Sofa',
    category: 'sofas',
    price: 'UGX 2,500,000 - 4,500,000',
    image: '/images/sofas/sofa-1.jpg',
    description: 'Handcrafted three-seater sofa with premium upholstery.',
    material: 'Mahogany Frame, Premium Fabric',
    woodType: 'Mahogany',
    leadTime: '4-6 weeks',
    featured: true,
  },
  {
    id: 7,
    name: 'Executive L-Shape Sectional',
    category: 'sofas',
    price: 'UGX 3,800,000 - 6,200,000',
    image: '/images/sofas/sofa-2.jpg',
    description: 'Spacious L-shaped sectional with deep seating and modular design.',
    material: 'Mugavu Frame, Multi-Density Foam',
    woodType: 'Mugavu',
    leadTime: '5-7 weeks',
    featured: false,
  },
  {
    id: 8,
    name: 'Classic Chesterfield Sofa',
    category: 'sofas',
    price: 'UGX 4,200,000 - 7,500,000',
    image: '/images/sofas/sofa-3.jpg',
    description: 'Timeless Chesterfield design with deep button tufting.',
    material: 'Mahogany Frame, Genuine Leather',
    woodType: 'Mahogany',
    leadTime: '6-8 weeks',
    featured: true,
  },
  {
    id: 9,
    name: 'Modern Minimalist Sofa',
    category: 'sofas',
    price: 'UGX 2,200,000 - 3,800,000',
    image: '/images/sofas/sofa-4.jpg',
    description: 'Clean-lined contemporary sofa with sleek profile.',
    material: 'Musyamba Frame, Linen Upholstery',
    woodType: 'Musyamba',
    leadTime: '4-5 weeks',
    featured: false,
  },
  {
    id: 10,
    name: 'Luxury Velvet Sofa Set',
    category: 'sofas',
    price: 'UGX 3,500,000 - 5,800,000',
    image: '/images/sofas/sofa-5.jpg',
    description: 'Opulent velvet upholstered sofa with gold-finished legs.',
    material: 'Mahogany Frame, Premium Velvet',
    woodType: 'Mahogany',
    leadTime: '5-6 weeks',
    featured: true,
  },

  // CHAIRS
  {
    id: 11,
    name: 'Executive Office Chair',
    category: 'chairs',
    price: 'UGX 850,000 - 1,500,000',
    image: '/images/chairs/chair-1.jpg',
    description: 'Ergonomic office chair with lumbar support and premium leather.',
    material: 'Steel Frame, Genuine Leather',
    woodType: 'N/A',
    leadTime: '2-3 weeks',
    featured: true,
  },
  {
    id: 12,
    name: 'Dining Chair Set (4pc)',
    category: 'chairs',
    price: 'UGX 1,200,000 - 2,000,000',
    image: '/images/chairs/chair-2.jpg',
    description: 'Elegant dining chairs with cushioned seats. Sold as a set of four.',
    material: 'Solid Mahogany, Cushioned Seats',
    woodType: 'Mahogany',
    leadTime: '4-5 weeks',
    featured: false,
  },
  {
    id: 13,
    name: 'Accent Lounge Chair',
    category: 'chairs',
    price: 'UGX 950,000 - 1,800,000',
    image: '/images/chairs/chair-3.jpg',
    description: 'Statement lounge chair with curved backrest and wooden armrests.',
    material: 'Hardwood Frame, Fabric Upholstery',
    woodType: 'Musyamba',
    leadTime: '3-4 weeks',
    featured: true,
  },
  {
    id: 14,
    name: 'Modern Bar Stool Pair',
    category: 'chairs',
    price: 'UGX 600,000 - 900,000',
    image: '/images/chairs/chair-4.jpg',
    description: 'Contemporary bar stools with adjustable height. Sold as a pair.',
    material: 'Metal Frame, Faux Leather Seat',
    woodType: 'N/A',
    leadTime: '2-3 weeks',
    featured: false,
  },
  {
    id: 15,
    name: 'Rocking Chair Classic',
    category: 'chairs',
    price: 'UGX 1,100,000 - 1,900,000',
    image: '/images/chairs/chair-5.jpg',
    description: 'Traditional rocking chair with curved runners and padded seat.',
    material: 'Solid Mahogany, Padded Cushion',
    woodType: 'Mahogany',
    leadTime: '4-6 weeks',
    featured: true,
  },
];

export const getAllProducts = () => FURNITURE_DATABASE;

export const getProductsByCategory = (category) => {
  return FURNITURE_DATABASE.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
};

export const getProductById = (id) => {
  return FURNITURE_DATABASE.find((product) => product.id === parseInt(id));
};

export const getFeaturedProducts = () => {
  return FURNITURE_DATABASE.filter((product) => product.featured === true);
};

export const getCategories = () => {
  return [
    { id: 'beds', name: 'Beds', displayName: 'Beds & Bedroom' },
    { id: 'sofas', name: 'Sofas', displayName: 'Sofas & Living Room' },
    { id: 'chairs', name: 'Chairs', displayName: 'Chairs & Seating' },
  ];
};

export default FURNITURE_DATABASE;
