// utils/dummyData.js
export const dummyCategories = [
  { _id: '1', name: "Electronics", slug: "electronics" },
  { _id: '2', name: "Clothing", slug: "clothing" },
  { _id: '3', name: "Fitness", slug: "fitness" },
  { _id: '4', name: "Kitchen", slug: "kitchen" },
  { _id: '5', name: "Furniture", slug: "furniture" },
  { _id: '6', name: "Lifestyle", slug: "lifestyle" }
];

export const dummyProducts = [
  {
    _id: "prod_001",
    name: "Premium Wireless Headphones",
    slug: "premium-wireless-headphones",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    price: 299.99,
    brand: "AudioTech",
    category: {
      _id: "1",
      name: "Electronics",
      slug: "electronics"
    },
    vendor: {
      _id: "vendor_1",
      businessName: "TechStore Pro",
      firstName: "John",
      lastName: "Doe"
    },
    tags: ["electronics", "audio", "wireless", "premium"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
        public_id: "sample_headphones",
        isMain: true
      }
    ],
    stock: 50,
    trackQuantity: true,
    status: "active",
    isFeatured: true,
    averageRating: 4.5,
    numReviews: 125,
    views: 1250,
    purchases: 87,
    sku: "PRD-HEADPHONES-001",
    reviews: [
      {
        _id: "rev_001",
        user: { _id: "user_1", firstName: "Alice", lastName: "Johnson" },
        name: "Alice Johnson",
        rating: 5,
        comment: "Amazing sound quality! Worth every penny.",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      },
      {
        _id: "rev_002", 
        user: { _id: "user_2", firstName: "Bob", lastName: "Smith" },
        name: "Bob Smith",
        rating: 4,
        comment: "Great headphones, battery life is excellent.",
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
      }
    ],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  },
  {
    _id: "prod_002",
    name: "Organic Cotton T-Shirt",
    slug: "organic-cotton-t-shirt",
    description: "Comfortable and sustainable organic cotton t-shirt available in multiple colors. Made from 100% certified organic cotton.",
    price: 29.99,
    brand: "EcoWear",
    category: {
      _id: "2",
      name: "Clothing",
      slug: "clothing"
    },
    vendor: {
      _id: "vendor_2",
      businessName: "Eco Fashion",
      firstName: "Sarah",
      lastName: "Green"
    },
    tags: ["clothing", "organic", "cotton", "sustainable"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop",
        public_id: "sample_tshirt",
        isMain: true
      }
    ],
    stock: 200,
    trackQuantity: true,
    status: "active",
    isFeatured: false,
    averageRating: 4.2,
    numReviews: 89,
    views: 890,
    purchases: 156,
    sku: "PRD-TSHIRT-002",
    reviews: [
      {
        _id: "rev_003",
        user: { _id: "user_3", firstName: "Emma", lastName: "Wilson" },
        name: "Emma Wilson",
        rating: 4,
        comment: "Very comfortable and soft fabric.",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      }
    ],
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000)
  },
  {
    _id: "prod_003",
    name: "Smart Fitness Watch",
    slug: "smart-fitness-watch",
    description: "Track your health and fitness goals with this advanced smartwatch featuring GPS, heart rate monitoring, and 50+ workout modes.",
    price: 199.99,
    brand: "FitTech",
    category: {
      _id: "3",
      name: "Fitness",
      slug: "fitness"
    },
    vendor: {
      _id: "vendor_3",
      businessName: "Fitness Gear Hub",
      firstName: "Mike",
      lastName: "Johnson"
    },
    tags: ["electronics", "fitness", "smartwatch", "health"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
        public_id: "sample_watch",
        isMain: true
      }
    ],
    stock: 75,
    trackQuantity: true,
    status: "active",
    isFeatured: true,
    averageRating: 4.7,
    numReviews: 203,
    views: 2030,
    purchases: 134,
    sku: "PRD-WATCH-003",
    reviews: [
      {
        _id: "rev_004",
        user: { _id: "user_4", firstName: "David", lastName: "Brown" },
        name: "David Brown",
        rating: 5,
        comment: "Perfect for tracking my workouts!",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      }
    ],
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
  },
  {
    _id: "prod_004",
    name: "Professional Coffee Maker",
    slug: "professional-coffee-maker",
    description: "Brew the perfect cup every time with this professional-grade coffee maker. Features programmable settings and thermal carafe.",
    price: 149.99,
    brand: "BrewMaster",
    category: {
      _id: "4",
      name: "Kitchen",
      slug: "kitchen"
    },
    vendor: {
      _id: "vendor_4",
      businessName: "Kitchen Essentials",
      firstName: "Lisa",
      lastName: "Davis"
    },
    tags: ["kitchen", "coffee", "appliances", "professional"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=800&fit=crop",
        public_id: "sample_coffee_maker",
        isMain: true
      }
    ],
    stock: 30,
    trackQuantity: true,
    status: "active",
    isFeatured: false,
    averageRating: 4.3,
    numReviews: 67,
    views: 670,
    purchases: 45,
    sku: "PRD-COFFEE-004",
    reviews: [
      {
        _id: "rev_005",
        user: { _id: "user_5", firstName: "Tom", lastName: "Wilson" },
        name: "Tom Wilson",
        rating: 4,
        comment: "Makes great coffee every morning!",
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      }
    ],
    createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000)
  },
  {
    _id: "prod_005",
    name: "Ergonomic Office Chair",
    slug: "ergonomic-office-chair",
    description: "Comfortable ergonomic office chair with lumbar support, adjustable height, and breathable mesh back.",
    price: 249.99,
    brand: "OfficeComfort",
    category: {
      _id: "5",
      name: "Furniture",
      slug: "furniture"
    },
    vendor: {
      _id: "vendor_5",
      businessName: "Office Solutions",
      firstName: "Chris",
      lastName: "Taylor"
    },
    tags: ["furniture", "office", "ergonomic", "chair"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop",
        public_id: "sample_office_chair",
        isMain: true
      }
    ],
    stock: 25,
    trackQuantity: true,
    status: "active",
    isFeatured: true,
    averageRating: 4.6,
    numReviews: 112,
    views: 1120,
    purchases: 78,
    sku: "PRD-CHAIR-005",
    reviews: [
      {
        _id: "rev_006",
        user: { _id: "user_6", firstName: "Anna", lastName: "Martinez" },
        name: "Anna Martinez",
        rating: 5,
        comment: "Best office chair I've ever owned!",
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
      }
    ],
    createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000)
  },
  {
    _id: "prod_006",
    name: "Wireless Gaming Mouse",
    slug: "wireless-gaming-mouse",
    description: "High-precision wireless gaming mouse with customizable RGB lighting, programmable buttons, and ultra-fast response time.",
    price: 79.99,
    brand: "GamePro",
    category: {
      _id: "1",
      name: "Electronics",
      slug: "electronics"
    },
    vendor: {
      _id: "vendor_6",
      businessName: "Gaming World",
      firstName: "Alex",
      lastName: "Gaming"
    },
    tags: ["electronics", "gaming", "mouse", "wireless"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop",
        public_id: "sample_gaming_mouse",
        isMain: true
      }
    ],
    stock: 100,
    trackQuantity: true,
    status: "active",
    isFeatured: false,
    averageRating: 4.4,
    numReviews: 156,
    views: 1560,
    purchases: 203,
    sku: "PRD-MOUSE-006",
    reviews: [
      {
        _id: "rev_007",
        user: { _id: "user_7", firstName: "Ryan", lastName: "Gamer" },
        name: "Ryan Gamer",
        rating: 4,
        comment: "Great for gaming, very responsive!",
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
      }
    ],
    createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000)
  },
  {
    _id: "prod_007",
    name: "Yoga Mat Premium",
    slug: "yoga-mat-premium",
    description: "Non-slip premium yoga mat made from eco-friendly materials, perfect for all yoga practices. Extra thick for comfort.",
    price: 49.99,
    brand: "ZenFit",
    category: {
      _id: "3",
      name: "Fitness",
      slug: "fitness"
    },
    vendor: {
      _id: "vendor_7",
      businessName: "Zen Wellness",
      firstName: "Maya",
      lastName: "Zen"
    },
    tags: ["fitness", "yoga", "mat", "eco-friendly"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=800&fit=crop",
        public_id: "sample_yoga_mat",
        isMain: true
      }
    ],
    stock: 150,
    trackQuantity: true,
    status: "active",
    isFeatured: false,
    averageRating: 4.1,
    numReviews: 94,
    views: 940,
    purchases: 187,
    sku: "PRD-YOGA-007",
    reviews: [
      {
        _id: "rev_008",
        user: { _id: "user_8", firstName: "Sophia", lastName: "Yoga" },
        name: "Sophia Yoga",
        rating: 4,
        comment: "Good quality mat, very comfortable.",
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
      }
    ],
    createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000)
  },
  {
    _id: "prod_008",
    name: "Stainless Steel Water Bottle",
    slug: "stainless-steel-water-bottle",
    description: "Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.",
    price: 34.99,
    brand: "HydroLife",
    category: {
      _id: "6",
      name: "Lifestyle",
      slug: "lifestyle"
    },
    vendor: {
      _id: "vendor_8",
      businessName: "Hydro Solutions",
      firstName: "Kate",
      lastName: "Water"
    },
    tags: ["lifestyle", "water bottle", "insulated", "stainless steel"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop",
        public_id: "sample_water_bottle",
        isMain: true
      }
    ],
    stock: 300,
    trackQuantity: true,
    status: "active",
    isFeatured: false,
    averageRating: 4.0,
    numReviews: 76,
    views: 760,
    purchases: 245,
    sku: "PRD-BOTTLE-008",
    reviews: [
      {
        _id: "rev_009",
        user: { _id: "user_9", firstName: "Jack", lastName: "Outdoors" },
        name: "Jack Outdoors",
        rating: 4,
        comment: "Keeps water cold all day long!",
        createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000)
      }
    ],
    createdAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000)
  },
  {
    _id: "prod_009",
    name: "LED Desk Lamp",
    slug: "led-desk-lamp",
    description: "Adjustable LED desk lamp with touch controls, multiple brightness levels, and USB charging port.",
    price: 59.99,
    brand: "LightTech",
    category: {
      _id: "1",
      name: "Electronics",
      slug: "electronics"
    },
    vendor: {
      _id: "vendor_9",
      businessName: "Light Solutions",
      firstName: "James",
      lastName: "Bright"
    },
    tags: ["electronics", "lighting", "desk", "LED"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop",
        public_id: "sample_desk_lamp",
        isMain: true
      }
    ],
    stock: 80,
    trackQuantity: true,
    status: "active",
    isFeatured: false,
    averageRating: 4.3,
    numReviews: 58,
    views: 580,
    purchases: 89,
    sku: "PRD-LAMP-009",
    reviews: [
      {
        _id: "rev_010",
        user: { _id: "user_10", firstName: "Nina", lastName: "Study" },
        name: "Nina Study",
        rating: 4,
        comment: "Perfect for late night studying.",
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
      }
    ],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
  },
  {
    _id: "prod_010",
    name: "Bluetooth Speaker Portable",
    slug: "bluetooth-speaker-portable",
    description: "Compact portable Bluetooth speaker with crystal clear sound, waterproof design, and 12-hour battery life.",
    price: 89.99,
    brand: "SoundWave",
    category: {
      _id: "1",
      name: "Electronics", 
      slug: "electronics"
    },
    vendor: {
      _id: "vendor_10",
      businessName: "Audio Paradise",
      firstName: "Sam",
      lastName: "Sound"
    },
    tags: ["electronics", "audio", "bluetooth", "portable"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop",
        public_id: "sample_bluetooth_speaker",
        isMain: true
      }
    ],
    stock: 120,
    trackQuantity: true,
    status: "active",
    isFeatured: true,
    averageRating: 4.5,
    numReviews: 134,
    views: 1340,
    purchases: 167,
    sku: "PRD-SPEAKER-010",
    reviews: [
      {
        _id: "rev_011",
        user: { _id: "user_11", firstName: "Oliver", lastName: "Music" },
        name: "Oliver Music",
        rating: 5,
        comment: "Amazing sound quality for the price!",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      }
    ],
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
  }
];

// ===== EXPORTED HELPER FUNCTIONS =====
export const getFeaturedProducts = () => {
  return {
    success: true,
    count: dummyProducts.filter(p => p.isFeatured).length,
    data: dummyProducts.filter(p => p.isFeatured)
  };
};

export const getTrendingProducts = () => {
  // Sort by views and recent purchases
  const trending = [...dummyProducts]
    .sort((a, b) => (b.views + b.purchases) - (a.views + a.purchases))
    .slice(0, 8);
  
  return {
    success: true,
    count: trending.length,
    data: trending
  };
};

export const getTopRatedProducts = () => {
  // Sort by rating and number of reviews
  const topRated = [...dummyProducts]
    .sort((a, b) => {
      if (b.averageRating === a.averageRating) {
        return b.numReviews - a.numReviews;
      }
      return b.averageRating - a.averageRating;
    })
    .slice(0, 10);
  
  return {
    success: true,
    count: topRated.length,
    data: topRated
  };
};

export const getAllProducts = (filters = {}) => {
  let filteredProducts = [...dummyProducts];
  
  // Apply category filter
  if (filters.category) {
    filteredProducts = filteredProducts.filter(p => 
      p.category.slug === filters.category
    );
  }
  
  // Apply price range filter
  if (filters.minPrice || filters.maxPrice) {
    filteredProducts = filteredProducts.filter(p => {
      const price = p.price;
      if (filters.minPrice && price < filters.minPrice) return false;
      if (filters.maxPrice && price > filters.maxPrice) return false;
      return true;
    });
  }
  
  // Apply search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.brand.toLowerCase().includes(searchTerm) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
  
  return {
    success: true,
    count: filteredProducts.length,
    data: filteredProducts
  };
};

export const getProductById = (id) => {
  const product = dummyProducts.find(p => p._id === id);
  if (!product) {
    return {
      success: false,
      message: 'Product not found'
    };
  }
  
  // Get related products from same category
  const relatedProducts = dummyProducts
    .filter(p => p.category._id === product.category._id && p._id !== product._id)
    .slice(0, 4);
  
  return {
    success: true,
    data: {
      product,
      relatedProducts
    }
  };
};

export const getProductBySlug = (slug) => {
  const product = dummyProducts.find(p => p.slug === slug);
  if (!product) {
    return {
      success: false,
      message: 'Product not found'
    };
  }
  
  // Get related products from same category
  const relatedProducts = dummyProducts
    .filter(p => p.category._id === product.category._id && p._id !== product._id)
    .slice(0, 4);
  
  return {
    success: true,
    data: {
      product,
      relatedProducts
    }
  };
};

export const getProductsByCategory = (categorySlug) => {
  const categoryProducts = dummyProducts.filter(p => 
    p.category.slug === categorySlug
  );
  
  return {
    success: true,
    count: categoryProducts.length,
    data: categoryProducts
  };
};

export const getProductsByBrand = (brand) => {
  const brandProducts = dummyProducts.filter(p => 
    p.brand.toLowerCase() === brand.toLowerCase()
  );
  
  return {
    success: true,
    count: brandProducts.length,
    data: brandProducts
  };
};

export const searchProducts = (searchTerm, options = {}) => {
  const { 
    category = null, 
    minPrice = null, 
    maxPrice = null,
    sort = 'relevance',
    limit = null 
  } = options;
  
  let results = [...dummyProducts];
  
  // Apply search filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    results = results.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.brand.toLowerCase().includes(term) ||
      p.tags.some(tag => tag.toLowerCase().includes(term))
    );
  }
  
  // Apply additional filters
  if (category) {
    results = results.filter(p => p.category.slug === category);
  }
  
  if (minPrice) {
    results = results.filter(p => p.price >= minPrice);
  }
  
  if (maxPrice) {
    results = results.filter(p => p.price <= maxPrice);
  }
  
  // Apply sorting
  switch (sort) {
    case 'price-low':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      results.sort((a, b) => b.averageRating - a.averageRating);
      break;
    case 'newest':
      results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case 'popular':
      results.sort((a, b) => b.purchases - a.purchases);
      break;
    default:
      // relevance - keep original order or sort by views
      results.sort((a, b) => b.views - a.views);
      break;
  }
  
  // Apply limit
  if (limit) {
    results = results.slice(0, limit);
  }
  
  return {
    success: true,
    count: results.length,
    data: results
  };
};

// ===== MOCK API SERVICE =====
export const mockProductService = {
  // Product listing functions
  getFeaturedProducts: () => Promise.resolve(getFeaturedProducts()),
  getTrendingProducts: () => Promise.resolve(getTrendingProducts()),
  getTopRatedProducts: () => Promise.resolve(getTopRatedProducts()),
  getAllProducts: (filters) => Promise.resolve(getAllProducts(filters)),
  
  // Individual product functions
  getProduct: (id) => Promise.resolve(getProductById(id)),
  getProductBySlug: (slug) => Promise.resolve(getProductBySlug(slug)),
  
  // Category and brand functions
  getProductsByCategory: (categorySlug) => Promise.resolve(getProductsByCategory(categorySlug)),
  getProductsByBrand: (brand) => Promise.resolve(getProductsByBrand(brand)),
  
  // Search function
  searchProducts: (searchTerm, options) => Promise.resolve(searchProducts(searchTerm, options)),
  
  // Categories
  getCategories: () => Promise.resolve({
    success: true,
    count: dummyCategories.length,
    data: dummyCategories
  })
};

// ===== UTILITY FUNCTIONS =====
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

export const calculateDiscountPercentage = (originalPrice, salePrice) => {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

export const isProductInStock = (product) => {
  return product.stock > 0;
};

export const isProductLowStock = (product, threshold = 10) => {
  return product.stock <= threshold && product.stock > 0;
};

export const getStockStatus = (product) => {
  if (product.stock === 0) return 'out-of-stock';
  if (product.stock <= 10) return 'low-stock';
  return 'in-stock';
};

export const getProductImageUrl = (product) => {
  const mainImage = product.images.find(img => img.isMain) || product.images[0];
  if (!mainImage) return '/placeholder-image.jpg';
  
  // You can modify URLs based on size if needed
  return mainImage.url;
};

// ===== STATISTICS FUNCTIONS =====
export const getProductStats = () => {
  const totalProducts = dummyProducts.length;
  const inStockProducts = dummyProducts.filter(p => p.stock > 0).length;
  const featuredProducts = dummyProducts.filter(p => p.isFeatured).length;
  const averagePrice = dummyProducts.reduce((sum, p) => sum + p.price, 0) / totalProducts;
  const totalReviews = dummyProducts.reduce((sum, p) => sum + p.numReviews, 0);
  const averageRating = dummyProducts.reduce((sum, p) => sum + (p.averageRating * p.numReviews), 0) / totalReviews;
  
  return {
    totalProducts,
    inStockProducts,
    featuredProducts,
    averagePrice: Math.round(averagePrice * 100) / 100,
    totalReviews,
    averageRating: Math.round(averageRating * 10) / 10
  };
};

export const getCategoryStats = () => {
  return dummyCategories.map(category => {
    const categoryProducts = dummyProducts.filter(p => p.category._id === category._id);
    return {
      ...category,
      productCount: categoryProducts.length,
      averagePrice: categoryProducts.length > 0 
        ? Math.round((categoryProducts.reduce((sum, p) => sum + p.price, 0) / categoryProducts.length) * 100) / 100
        : 0
    };
  });
};

// ===== USAGE EXAMPLES =====
/*
// Basic usage in components:

import { 
  getFeaturedProducts, 
  getTrendingProducts, 
  getAllProducts,
  mockProductService,
  formatPrice,
  getStockStatus 
} from '../utils/dummyData';

// Direct function calls (synchronous):
const featuredProducts = getFeaturedProducts();
const allProducts = getAllProducts({ category: 'electronics', minPrice: 50 });

// Using mock service (async - for consistency with real API):
const { data: trending } = await mockProductService.getTrendingProducts();

// With React hooks:
useEffect(() => {
  const fetchData = async () => {
    const result = await mockProductService.getAllProducts(filters);
    setProducts(result.data);
  };
  fetchData();
}, [filters]);
*/