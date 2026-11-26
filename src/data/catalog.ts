export interface Category {
  id: string;
  name: string;
  shortName: string;
  subcategories: string[];
  accentBg: string;
  accentText: string;
  iconKey: string;
  filterType?: 'category' | 'dietary';
  dietaryTag?: 'Halal' | 'Organic' | 'Healthier Choice';
}

export interface BundleOffer {
  minQty: number;
  bundlePrice: number;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  packSize: string;
  unitPriceText: string;
  image: string;
  promoTag?: string;
  promoType?: 'must-buy' | 'price-drop' | 'everyday-low' | 'bundle' | 'fresh-buy';
  bundle?: BundleOffer;
  dietary: ('Halal' | 'Healthier Choice' | 'Vegetarian' | 'Housebrand' | 'Organic')[];
  origin: string;
  rating: number;
  reviewCount: number;
  description: string;
  storageInfo: string;
  inStock: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isRecommended?: boolean;
  isLimitedTime?: boolean;
  isWine?: boolean;
  winePairingNote?: string;
  weeklyAdGroup?: 'must-buy' | 'weekly-savers' | 'fresh-buys' | '4-day-specials';
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  targetIntent: 'meal-planner' | 'promos' | 'limited-time' | 'vouchers' | 'wine-list';
  image: string;
}

export interface RecipeIngredient {
  productId: string;
  label: string;
  baseAmount: number;
  unit: string;
  packsPerBase: number;
  isPantryStaple?: boolean;
}

export interface RecipeItem {
  id: string;
  title: string;
  tagline: string;
  prepTime: string;
  prepMinutes: number;
  baseServings: number;
  difficulty: 'Easy' | 'Medium';
  description: string;
  image: string;
  ingredients: RecipeIngredient[];
  steps: string[];
  tags: {
    quickMeals: string[];
    mainIngredient: string;
    meals: string[];
    occasions: string[];
    healthyLifestyles: string[];
    celebrityChef: string;
  };
  recommendedWineId?: string;
}

export interface VoucherItem {
  code: string;
  title: string;
  description: string;
  minSpend: number;
  discount: number;
  freeDelivery?: boolean;
  validUntil: string;
  categoryNote: string;
}

export interface StoreOutlet {
  id: string;
  name: string;
  format: 'Pantry Lane Superstore' | 'Pantry Lane Select' | 'Pantry Lane' | 'Pantry Lane Express';
  address: string;
  postalCode: string;
  hours: string;
  distanceKm: number;
  clickAndCollect: boolean;
}

export interface DeliverySlot {
  id: string;
  dayLabel: string;
  dateLabel: string;
  window: string;
  fee: number;
  status: 'Available' | 'Filling Fast';
}

export const IMAGES = {
  heroFresh: '/src/assets/images/hero_fresh_groceries_1795665644829.jpg',
  heroDeals: '/src/assets/images/hero_weekly_deals_1795665645985.jpg',
  milk: '/src/assets/images/prod_fresh_milk_1795665645467.jpg',
  eggs: '/src/assets/images/prod_fresh_eggs_1795665646851.jpg',
  rice: '/src/assets/images/prod_jasmine_rice_1795665648614.jpg',
  apples: '/src/assets/images/prod_fuji_apples_1795665647714.jpg',
  vegetables: '/src/assets/images/prod_fresh_vegetables_1795665648044.jpg',
  salmon: '/src/assets/images/prod_salmon_fillet_1795665649422.jpg',
  malt: '/src/assets/images/prod_chocolate_malt_1795665649829.jpg',
  bread: '/src/assets/images/prod_bread_loaf_1795665651081.jpg',
  detergent: '/src/assets/images/prod_laundry_detergent_1795665652339.jpg',
  greenTea: '/src/assets/images/prod_green_tea_pack_1795665652436.jpg',
  laksa: '/src/assets/images/prod_instant_noodles_1795665652867.jpg',
  tissue: '/src/assets/images/prod_toilet_tissue_1795665653309.jpg',
  wine: '/src/assets/images/prod_wine_selection_1795667710249.jpg',
  recipeSeabass: '/src/assets/images/recipe_hotpot_seabass_1795667704231.jpg',
  recipeTomatoStew: '/src/assets/images/recipe_pork_tomato_stew_1795667706028.jpg',
  recipeTweeBah: '/src/assets/images/recipe_braised_twee_bah_1795667706061.jpg',
  recipeBakedPork: '/src/assets/images/recipe_baked_pork_rice_1795667707021.jpg',
  recipeSpareribs: '/src/assets/images/recipe_garlic_spareribs_1795667708047.jpg',
  recipeCrackerPork: '/src/assets/images/recipe_cracker_pork_loin_1795667708737.jpg',
};

export const TOP_CATEGORIES: Category[] = [
  {
    id: 'halal-filter',
    name: 'Halal Certified',
    shortName: 'Halal',
    subcategories: ['Halal Dairy', 'Halal Pantry', 'Halal Drinks', 'Halal Bakery'],
    accentBg: 'bg-[#ECFDF5]',
    accentText: 'text-[#047857]',
    iconKey: 'shield',
    filterType: 'dietary',
    dietaryTag: 'Halal',
  },
  {
    id: 'organic-filter',
    name: 'Organic',
    shortName: 'Organic',
    subcategories: ['Organic Fruits', 'Organic Greens', 'Natural Pantry'],
    accentBg: 'bg-[#F0FDF4]',
    accentText: 'text-[#15803D]',
    iconKey: 'leaf',
    filterType: 'dietary',
    dietaryTag: 'Organic',
  },
  {
    id: 'beer-wine-spirits',
    name: 'Beer, Wine & Spirits',
    shortName: 'Wine & Spirits',
    subcategories: ['White Wine', 'Red Wine', 'Sparkling', 'Zero-Proof'],
    accentBg: 'bg-[#FEF2F2]',
    accentText: 'text-[#9F1239]',
    iconKey: 'wine',
    filterType: 'category',
  },
  {
    id: 'health-wellness',
    name: 'Health & Wellness',
    shortName: 'Healthier Choice',
    subcategories: ['Healthier Choice', 'Wholegrains', 'No Sugar Drinks'],
    accentBg: 'bg-[#F0FDFA]',
    accentText: 'text-[#0F766E]',
    iconKey: 'heart-pulse',
    filterType: 'dietary',
    dietaryTag: 'Healthier Choice',
  },
  {
    id: 'fruits-vegetables',
    name: 'Fruits & Vegetables',
    shortName: 'Fruits & Veg',
    subcategories: ['Fresh Fruits', 'Fresh Vegetables', 'Organic Produce', 'Mushrooms & Herbs'],
    accentBg: 'bg-[#ECFDF3]',
    accentText: 'text-[#15803D]',
    iconKey: 'apple',
    filterType: 'category',
  },
  {
    id: 'meat-seafood',
    name: 'Meat & Seafood',
    shortName: 'Meat & Seafood',
    subcategories: ['Fresh Fish & Salmon', 'Fresh Pork Cuts', 'Poultry', 'Marinated Cuts'],
    accentBg: 'bg-[#FFF1F2]',
    accentText: 'text-[#BE123C]',
    iconKey: 'fish',
    filterType: 'category',
  },
  {
    id: 'dairy-chilled-eggs',
    name: 'Dairy, Chilled & Eggs',
    shortName: 'Dairy & Eggs',
    subcategories: ['Fresh Milk', 'Eggs', 'Cheese & Butter', 'Yoghurt'],
    accentBg: 'bg-[#EFF6FF]',
    accentText: 'text-[#1D4ED8]',
    iconKey: 'milk',
    filterType: 'category',
  },
  {
    id: 'drinks',
    name: 'Drinks',
    shortName: 'Drinks',
    subcategories: ['Asian & Green Tea', 'Malt & Chocolate Drinks', 'Coffee & Tea', 'Juices'],
    accentBg: 'bg-[#ECFEFF]',
    accentText: 'text-[#0E7490]',
    iconKey: 'cup',
    filterType: 'category',
  },
  {
    id: 'rice-noodles-cooking',
    name: 'Rice, Noodles & Cooking',
    shortName: 'Rice & Cooking',
    subcategories: ['Fragrant Rice', 'Instant Noodles', 'Sauces & Condiments', 'Spices & Paste'],
    accentBg: 'bg-[#FFFBEB]',
    accentText: 'text-[#B45309]',
    iconKey: 'wheat',
    filterType: 'category',
  },
  {
    id: 'bakery',
    name: 'Bakery',
    shortName: 'Bakery',
    subcategories: ['Wholemeal & Sandwich Bread', 'Buns & Rolls', 'Wraps'],
    accentBg: 'bg-[#FEF3C7]',
    accentText: 'text-[#92400E]',
    iconKey: 'croissant',
    filterType: 'category',
  },
  {
    id: 'snacks-confectionery',
    name: 'Snacks & Crackers',
    shortName: 'Snacks',
    subcategories: ['Biscuits & Crackers', 'Noodles & Quick Bites', 'Nuts & Dried Fruits'],
    accentBg: 'bg-[#FFF7ED]',
    accentText: 'text-[#C2410C]',
    iconKey: 'cookie',
    filterType: 'category',
  },
  {
    id: 'household',
    name: 'Household & Care',
    shortName: 'Household',
    subcategories: ['Laundry Detergent', 'Paper & Bathroom Tissue', 'Kitchen & Cleaning'],
    accentBg: 'bg-[#EEF2FF]',
    accentText: 'text-[#3730A3]',
    iconKey: 'sparkles',
    filterType: 'category',
  },
];

// Standard product categories for sidebar filtering
export const CATEGORIES: Category[] = TOP_CATEGORIES.filter((c) => c.filterType === 'category');

export const TRENDING_SEARCHES = [
  'Meiji Milk',
  'Sea Bass',
  'Eggs',
  'Thai Fragrant Rice',
  'Pork Loin',
  'Salmon',
  'Laksa',
  'Sauvignon Blanc',
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    eyebrow: 'Smart Meal Planning · Fresh & Affordable',
    title: 'Plan Meals, Adjust Portions & Shop Only What You Need',
    subtitle:
      'Pick recipes below, scale servings from 1 to 8, tick off pantry items you already have, and generate a 1-click grocery list in minutes.',
    ctaLabel: 'Start Meal Planner',
    targetIntent: 'meal-planner',
    image: IMAGES.heroFresh,
  },
  {
    id: 'slide-2',
    eyebrow: 'Weekly Promotions · Thu – Wed',
    title: 'Everyday Essentials at Honest Neighbourhood Prices',
    subtitle:
      'Filter bestsellers, top-rated picks, and bundle deals in one clean view. Free islandwide delivery on orders $59 & above.',
    ctaLabel: 'Browse Weekly Promos',
    targetIntent: 'promos',
    image: IMAGES.heroDeals,
  },
  {
    id: 'slide-3',
    eyebrow: '4-Day Specials · Limited Time Only',
    title: 'Air-Flown Seafood & Fresh Market Cuts Up to 30% Off',
    subtitle:
      'Stock up on fresh sea bass, Norwegian salmon, organic orchard apples, and dinner wine pairings before Wednesday.',
    ctaLabel: 'View Limited Time Deals',
    targetIntent: 'limited-time',
    image: IMAGES.recipeSeabass,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'fp-milk-2l',
    name: 'Meiji Pasteurised Fresh Milk',
    brand: 'Meiji',
    category: 'dairy-chilled-eggs',
    subcategory: 'Fresh Milk',
    price: 5.95,
    originalPrice: 6.85,
    packSize: '2L',
    unitPriceText: '$2.98 / L',
    image: IMAGES.milk,
    promoTag: 'Must Buy',
    promoType: 'must-buy',
    bundle: { minQty: 2, bundlePrice: 11.20, label: '2 for $11.20' },
    dietary: ['Halal', 'Healthier Choice'],
    origin: 'Thailand',
    rating: 4.9,
    reviewCount: 1420,
    description:
      '100% fresh cow milk pasteurised to preserve creamy taste and natural calcium. Rich in protein and Vitamin B2 for everyday family nutrition.',
    storageInfo: 'Keep refrigerated between 2°C and 4°C. Consume within 3 days after opening.',
    inStock: true,
    isFeatured: true,
    isBestseller: true,
    isRecommended: true,
    weeklyAdGroup: 'must-buy',
  },
  {
    id: 'fp-eggs-10s',
    name: 'Pasar Fresh Farm Brown Eggs',
    brand: 'Pasar',
    category: 'dairy-chilled-eggs',
    subcategory: 'Eggs',
    price: 3.15,
    originalPrice: 3.65,
    packSize: '10s (550g)',
    unitPriceText: '$0.32 / egg',
    image: IMAGES.eggs,
    promoTag: 'Everyday Low',
    promoType: 'everyday-low',
    dietary: ['Housebrand', 'Vegetarian'],
    origin: 'Singapore',
    rating: 4.8,
    reviewCount: 2180,
    description:
      'Locally farmed Grade A fresh brown eggs collected daily for firm whites and rich golden yolks. SFA-certified farm freshness.',
    storageInfo: 'Store in a cool dry place or refrigerate below 4°C.',
    inStock: true,
    isFeatured: true,
    isBestseller: true,
    weeklyAdGroup: 'fresh-buys',
  },
  {
    id: 'fp-rice-5kg',
    name: 'SongHe Thai Hom Mali Fragrant Rice',
    brand: 'SongHe',
    category: 'rice-noodles-cooking',
    subcategory: 'Fragrant Rice',
    price: 15.80,
    originalPrice: 18.50,
    packSize: '5kg',
    unitPriceText: '$3.16 / kg',
    image: IMAGES.rice,
    promoTag: 'Save $2.70',
    promoType: 'price-drop',
    dietary: ['Halal', 'Vegetarian'],
    origin: 'Thailand',
    rating: 4.9,
    reviewCount: 985,
    description:
      'Premium new-crop 100% Thai Hom Mali jasmine rice with long, pearly grains, silky texture, and delicate floral aroma after steaming.',
    storageInfo: 'Store in an airtight container in a cool, dry place.',
    inStock: true,
    isFeatured: true,
    isBestseller: true,
    isRecommended: true,
    weeklyAdGroup: 'must-buy',
  },
  {
    id: 'fp-seabass-350g',
    name: 'Pasar Fresh Local Sea Bass Fillet (Skin-On)',
    brand: 'Pasar',
    category: 'meat-seafood',
    subcategory: 'Fresh Fish & Salmon',
    price: 8.90,
    originalPrice: 10.80,
    packSize: '350g',
    unitPriceText: '$2.54 / 100g',
    image: IMAGES.recipeSeabass,
    promoTag: '4-Day Special',
    promoType: 'fresh-buy',
    dietary: ['Housebrand', 'Healthier Choice'],
    origin: 'Singapore',
    rating: 4.9,
    reviewCount: 478,
    description:
      'Locally farmed fresh Asian sea bass fillets, scaled and deboned for quick steaming, pan-searing, or hotpot poaching.',
    storageInfo: 'Keep chilled between 0°C and 4°C. Cook thoroughly before consumption.',
    inStock: true,
    isFeatured: true,
    isRecommended: true,
    isLimitedTime: true,
    weeklyAdGroup: '4-day-specials',
  },
  {
    id: 'fp-pork-loin-400g',
    name: 'Pasar Fresh Australian Lean Pork Loin Cutlets',
    brand: 'Pasar',
    category: 'meat-seafood',
    subcategory: 'Fresh Pork Cuts',
    price: 6.95,
    originalPrice: 8.40,
    packSize: '400g',
    unitPriceText: '$1.74 / 100g',
    image: IMAGES.recipeCrackerPork,
    promoTag: 'Fresh Buy',
    promoType: 'fresh-buy',
    dietary: ['Housebrand'],
    origin: 'Australia',
    rating: 4.8,
    reviewCount: 530,
    description:
      'Air-flown chilled Australian lean pork loin trimmed and sliced evenly for stews, baked pork chop rice, and crispy cutlets.',
    storageInfo: 'Keep refrigerated between 0°C and 4°C.',
    inStock: true,
    isFeatured: true,
    isBestseller: true,
    isLimitedTime: true,
    weeklyAdGroup: 'fresh-buys',
  },
  {
    id: 'fp-pork-belly-500g',
    name: 'Pasar Chilled Pork Belly & Ribs Braising Pack',
    brand: 'Pasar',
    category: 'meat-seafood',
    subcategory: 'Fresh Pork Cuts',
    price: 8.50,
    originalPrice: 9.95,
    packSize: '500g',
    unitPriceText: '$1.70 / 100g',
    image: IMAGES.recipeSpareribs,
    promoTag: 'Save $1.45',
    promoType: 'price-drop',
    dietary: ['Housebrand'],
    origin: 'Australia',
    rating: 4.8,
    reviewCount: 412,
    description:
      'Well-marbled chilled pork cuts ideal for braised twee bah, claypot dishes, and crispy air-fried garlic spareribs.',
    storageInfo: 'Keep chilled between 0°C and 4°C.',
    inStock: true,
    isLimitedTime: true,
    weeklyAdGroup: '4-day-specials',
  },
  {
    id: 'fp-salmon-300g',
    name: 'Pasar Fresh Norwegian Atlantic Salmon Fillet',
    brand: 'Pasar',
    category: 'meat-seafood',
    subcategory: 'Fresh Fish & Salmon',
    price: 10.90,
    originalPrice: 13.50,
    packSize: '300g (2 pcs)',
    unitPriceText: '$3.63 / 100g',
    image: IMAGES.salmon,
    promoTag: '4-Day Special',
    promoType: 'fresh-buy',
    dietary: ['Housebrand', 'Healthier Choice'],
    origin: 'Norway',
    rating: 4.9,
    reviewCount: 642,
    description:
      'Air-flown chilled Norwegian Atlantic salmon portions with rich omega-3 marbling. Skin-on and trimmed for pan-searing or air-frying.',
    storageInfo: 'Keep chilled between 0°C and 4°C.',
    inStock: true,
    isFeatured: true,
    isBestseller: true,
    isLimitedTime: true,
    weeklyAdGroup: '4-day-specials',
  },
  {
    id: 'fp-veg-bundle',
    name: 'Pasar Fresh Broccoli, Carrots & Tomatoes Pack',
    brand: 'Pasar',
    category: 'fruits-vegetables',
    subcategory: 'Fresh Vegetables',
    price: 3.95,
    originalPrice: 4.90,
    packSize: '650g Bundle',
    unitPriceText: '$6.08 / kg',
    image: IMAGES.vegetables,
    promoTag: 'Save $0.95',
    promoType: 'fresh-buy',
    dietary: ['Housebrand', 'Vegetarian', 'Healthier Choice'],
    origin: 'Australia',
    rating: 4.8,
    reviewCount: 412,
    description:
      'Farm-fresh Australian broccoli, sweet carrots, and vine-ripened tomatoes bundled for effortless soups, stews, and stir-fries.',
    storageInfo: 'Store refrigerated at 2°C to 5°C.',
    inStock: true,
    isFeatured: true,
    isRecommended: true,
    weeklyAdGroup: 'fresh-buys',
  },
  {
    id: 'fp-shiitake-chestnut',
    name: 'Pasar Dried Shiitake Mushrooms & Peeled Chestnuts',
    brand: 'Pasar',
    category: 'fruits-vegetables',
    subcategory: 'Mushrooms & Herbs',
    price: 5.40,
    originalPrice: 6.50,
    packSize: '300g Combo',
    unitPriceText: '$1.80 / 100g',
    image: IMAGES.recipeTweeBah,
    promoTag: 'Must Buy',
    promoType: 'must-buy',
    dietary: ['Housebrand', 'Vegetarian', 'Healthier Choice'],
    origin: 'China',
    rating: 4.8,
    reviewCount: 318,
    description:
      'Aromatic dried flower shiitake mushrooms paired with ready-to-cook sweet peeled chestnuts for heritage braised dishes.',
    storageInfo: 'Store in a cool, dry place.',
    inStock: true,
    isRecommended: true,
    weeklyAdGroup: 'weekly-savers',
  },
  {
    id: 'fp-fuji-apples',
    name: 'Pasar Crisp Red Fuji Apples',
    brand: 'Pasar',
    category: 'fruits-vegetables',
    subcategory: 'Fresh Fruits',
    price: 4.45,
    originalPrice: 5.50,
    packSize: '5 pcs (950g)',
    unitPriceText: '$0.89 / pc',
    image: IMAGES.apples,
    promoTag: 'Fresh Buy',
    promoType: 'fresh-buy',
    bundle: { minQty: 2, bundlePrice: 8.20, label: '2 packs for $8.20' },
    dietary: ['Housebrand', 'Vegetarian'],
    origin: 'China',
    rating: 4.7,
    reviewCount: 514,
    description:
      'Sweet, crunchy red Fuji apples hand-selected for high Brix sweetness and crisp bite.',
    storageInfo: 'Keep refrigerated in crisper drawer.',
    inStock: true,
    isFeatured: true,
    isBestseller: true,
    weeklyAdGroup: 'fresh-buys',
  },
  {
    id: 'fp-apples-organic',
    name: 'Pasar Organic Sweet Fuji Apples',
    brand: 'Pasar',
    category: 'fruits-vegetables',
    subcategory: 'Organic Produce',
    price: 5.95,
    originalPrice: 6.95,
    packSize: '4 pcs (800g)',
    unitPriceText: '$1.49 / pc',
    image: IMAGES.apples,
    promoTag: 'Organic Pick',
    promoType: 'fresh-buy',
    dietary: ['Organic', 'Vegetarian', 'Housebrand'],
    origin: 'New Zealand',
    rating: 4.9,
    reviewCount: 295,
    description:
      'Certified organic crisp orchard-grown Fuji apples with naturally sweet honeyed notes.',
    storageInfo: 'Store refrigerated.',
    inStock: true,
    isRecommended: true,
    isLimitedTime: true,
    weeklyAdGroup: 'fresh-buys',
  },
  {
    id: 'fp-sesame-plum-sauce',
    name: 'Lee Kum Kee Sesame & Sour Plum Cooking Sauce Set',
    brand: 'Lee Kum Kee',
    category: 'rice-noodles-cooking',
    subcategory: 'Sauces & Condiments',
    price: 4.85,
    originalPrice: 5.70,
    packSize: '2 x 240g',
    unitPriceText: '$2.43 / bottle',
    image: IMAGES.laksa,
    promoTag: 'Bundle Save',
    promoType: 'bundle',
    dietary: ['Halal', 'Vegetarian'],
    origin: 'Hong Kong',
    rating: 4.8,
    reviewCount: 620,
    description:
      'Authentic roasted sesame dressing and tangy sour plum glaze set, crafted for hotpot dipping, steamed sea bass, and quick marinades.',
    storageInfo: 'Refrigerate after opening.',
    inStock: true,
    isRecommended: true,
    weeklyAdGroup: 'weekly-savers',
  },
  {
    id: 'fp-cream-crackers',
    name: 'Hup Seng Special Cream Crackers',
    brand: 'Hup Seng',
    category: 'snacks-confectionery',
    subcategory: 'Biscuits & Crackers',
    price: 2.85,
    originalPrice: 3.30,
    packSize: '428g',
    unitPriceText: '$0.67 / 100g',
    image: IMAGES.bread,
    promoTag: 'Everyday Low',
    promoType: 'everyday-low',
    dietary: ['Halal', 'Vegetarian'],
    origin: 'Malaysia',
    rating: 4.9,
    reviewCount: 1540,
    description:
      'Golden baked crisp cream crackers loved for breakfast dipping and crushing into savoury crispy crusts for pork loin cutlets.',
    storageInfo: 'Store in an airtight container.',
    inStock: true,
    isBestseller: true,
    weeklyAdGroup: 'weekly-savers',
  },
  {
    id: 'fp-cheese-shred',
    name: 'Emborg Shredded Mozzarella & Cheddar Bake Mix',
    brand: 'Emborg',
    category: 'dairy-chilled-eggs',
    subcategory: 'Cheese & Butter',
    price: 5.20,
    originalPrice: 6.45,
    packSize: '200g',
    unitPriceText: '$2.60 / 100g',
    image: IMAGES.milk,
    promoTag: '2 for $9.60',
    promoType: 'bundle',
    bundle: { minQty: 2, bundlePrice: 9.60, label: '2 for $9.60' },
    dietary: ['Halal', 'Vegetarian'],
    origin: 'Denmark',
    rating: 4.8,
    reviewCount: 730,
    description:
      'Smooth-melting European mozzarella and mature cheddar blend for golden bubbling Hong Kong baked rice and pasta gratin.',
    storageInfo: 'Keep refrigerated at 2°C – 5°C.',
    inStock: true,
    isRecommended: true,
    weeklyAdGroup: 'weekly-savers',
  },
  {
    id: 'fp-malt-500g',
    name: 'Milo Activ-Go Chocolate Malt Refill Pack',
    brand: 'Milo',
    category: 'drinks',
    subcategory: 'Malt & Chocolate Drinks',
    price: 6.45,
    originalPrice: 7.60,
    packSize: '500g',
    unitPriceText: '$1.29 / 100g',
    image: IMAGES.malt,
    promoTag: '2 for $11.90',
    promoType: 'bundle',
    bundle: { minQty: 2, bundlePrice: 11.90, label: '2 for $11.90' },
    dietary: ['Halal', 'Healthier Choice'],
    origin: 'Singapore',
    rating: 4.9,
    reviewCount: 1845,
    description:
      'Iconic Singapore chocolate malt beverage fortified with Protomalt, vitamins B2, B3, B6, C, D, and iron.',
    storageInfo: 'Keep tightly sealed in a cool, dry place.',
    inStock: true,
    isFeatured: true,
    isBestseller: true,
    weeklyAdGroup: 'weekly-savers',
  },
  {
    id: 'fp-bread-800g',
    name: 'Gardenia Enriched Wholemeal Sliced Bread',
    brand: 'Gardenia',
    category: 'bakery',
    subcategory: 'Wholemeal & Sandwich Bread',
    price: 3.40,
    packSize: '800g',
    unitPriceText: '$0.43 / 100g',
    image: IMAGES.bread,
    promoTag: 'Everyday Low',
    promoType: 'everyday-low',
    dietary: ['Halal', 'Healthier Choice', 'Vegetarian'],
    origin: 'Singapore',
    rating: 4.9,
    reviewCount: 2310,
    description:
      'Soft, fibre-rich wholemeal sandwich loaf baked fresh daily with zero trans fat and wholegrain goodness.',
    storageInfo: 'Keep in a cool dry place.',
    inStock: true,
    isFeatured: true,
    isBestseller: true,
    weeklyAdGroup: 'weekly-savers',
  },
  {
    id: 'fp-greentea-6s',
    name: 'Pokka Jasmine Green Tea No Sugar Cans',
    brand: 'Pokka',
    category: 'drinks',
    subcategory: 'Asian & Green Tea',
    price: 4.20,
    originalPrice: 5.10,
    packSize: '6 x 300ml',
    unitPriceText: '$0.70 / can',
    image: IMAGES.greenTea,
    promoTag: '2 for $7.80',
    promoType: 'bundle',
    bundle: { minQty: 2, bundlePrice: 7.80, label: '2 packs for $7.80' },
    dietary: ['Halal', 'Healthier Choice', 'Vegetarian'],
    origin: 'Singapore',
    rating: 4.8,
    reviewCount: 1150,
    description:
      '100% real brewed jasmine green tea with zero sugar and crisp natural antioxidants.',
    storageInfo: 'Best served chilled.',
    inStock: true,
    isFeatured: true,
    isRecommended: true,
    weeklyAdGroup: 'weekly-savers',
  },
  {
    id: 'fp-laksa-4s',
    name: 'Prima Taste Singapore Laksa Wholegrain LaMian',
    brand: 'Prima Taste',
    category: 'rice-noodles-cooking',
    subcategory: 'Instant Noodles',
    price: 10.95,
    originalPrice: 12.60,
    packSize: '4 x 185g',
    unitPriceText: '$2.74 / pack',
    image: IMAGES.laksa,
    promoTag: 'Must Buy',
    promoType: 'must-buy',
    dietary: ['Halal'],
    origin: 'Singapore',
    rating: 4.9,
    reviewCount: 1620,
    description:
      'Award-winning authentic Singapore Laksa with rich coconut curry gravy and springy air-dried noodles.',
    storageInfo: 'Store in a cool, dry place.',
    inStock: true,
    isFeatured: true,
    isBestseller: true,
    weeklyAdGroup: 'must-buy',
  },
  {
    id: 'fp-detergent-26kg',
    name: 'Dynamo Power Gel Royal Fresh Laundry Detergent',
    brand: 'Dynamo',
    category: 'household',
    subcategory: 'Laundry Detergent',
    price: 11.90,
    originalPrice: 15.95,
    packSize: '2.6kg (52 Washes)',
    unitPriceText: '$4.58 / kg',
    image: IMAGES.detergent,
    promoTag: 'Price Drop',
    promoType: 'price-drop',
    bundle: { minQty: 2, bundlePrice: 21.50, label: '2 for $21.50' },
    dietary: [],
    origin: 'Malaysia',
    rating: 4.8,
    reviewCount: 790,
    description:
      'Deep-cleaning liquid laundry gel formulated for indoor drying in humid climates.',
    storageInfo: 'Store upright in a cool place.',
    inStock: true,
    isBestseller: true,
    isLimitedTime: true,
    weeklyAdGroup: 'must-buy',
  },
  {
    id: 'fp-tissue-10s',
    name: 'Pantry Lane Soft 3-Ply Bathroom Tissue Rolls',
    brand: 'Pantry Lane',
    category: 'household',
    subcategory: 'Paper & Bathroom Tissue',
    price: 5.95,
    originalPrice: 7.20,
    packSize: '10 Rolls',
    unitPriceText: '$0.60 / roll',
    image: IMAGES.tissue,
    promoTag: '3 for $16.50',
    promoType: 'bundle',
    bundle: { minQty: 3, bundlePrice: 16.50, label: '3 packs for $16.50' },
    dietary: ['Housebrand'],
    origin: 'Malaysia',
    rating: 4.7,
    reviewCount: 1930,
    description:
      'Ultra-soft, absorbent 3-ply bathroom tissue crafted from 100% sustainably sourced virgin pulp.',
    storageInfo: 'Keep dry and away from moisture.',
    inStock: true,
    isLimitedTime: true,
    weeklyAdGroup: '4-day-specials',
  },
  // Curated Wine List & Zero-Proof Pairings
  {
    id: 'fp-wine-sauvblanc',
    name: 'Brancott Estate Marlborough Sauvignon Blanc',
    brand: 'Brancott Estate',
    category: 'beer-wine-spirits',
    subcategory: 'White Wine',
    price: 26.90,
    originalPrice: 33.50,
    packSize: '750ml · 13% ABV',
    unitPriceText: '$35.87 / L',
    image: IMAGES.wine,
    promoTag: 'Wine Club Deal',
    promoType: 'price-drop',
    bundle: { minQty: 2, bundlePrice: 49.00, label: 'Any 2 bottles $49.00' },
    dietary: ['Vegetarian'],
    origin: 'New Zealand',
    rating: 4.9,
    reviewCount: 428,
    description:
      'Crisp tropical passionfruit, zesty grapefruit, and vibrant acidity. Brightens steamed fish, hotpot sea bass, and citrusy Asian dishes.',
    storageInfo: 'Serve chilled at 8°C – 10°C.',
    inStock: true,
    isWine: true,
    isRecommended: true,
    isLimitedTime: true,
    winePairingNote: 'Pairs with Hotpot Inspired Sea Bass & Salmon Bowl',
    weeklyAdGroup: '4-day-specials',
  },
  {
    id: 'fp-wine-pinotnoir',
    name: 'Cloudy Bay Marlborough Pinot Noir',
    brand: 'Cloudy Bay',
    category: 'beer-wine-spirits',
    subcategory: 'Red Wine',
    price: 48.50,
    originalPrice: 56.00,
    packSize: '750ml · 14% ABV',
    unitPriceText: '$64.67 / L',
    image: IMAGES.wine,
    promoTag: 'Sommelier Pick',
    promoType: 'must-buy',
    dietary: ['Vegetarian'],
    origin: 'New Zealand',
    rating: 4.9,
    reviewCount: 286,
    description:
      'Silky dark cherry, wild thyme, and earthy savoury spice. Cuts effortlessly through braised pork, mushroom stews, and baked pork chop rice.',
    storageInfo: 'Serve lightly chilled at 14°C – 16°C.',
    inStock: true,
    isWine: true,
    isBestseller: true,
    isRecommended: true,
    winePairingNote: 'Pairs with Braised Twee Bah & Garlic Spareribs',
    weeklyAdGroup: 'must-buy',
  },
  {
    id: 'fp-wine-shiraz',
    name: 'Penfolds Koonunga Hill South Australia Shiraz',
    brand: 'Penfolds',
    category: 'beer-wine-spirits',
    subcategory: 'Red Wine',
    price: 29.90,
    originalPrice: 36.00,
    packSize: '750ml · 14.5% ABV',
    unitPriceText: '$39.87 / L',
    image: IMAGES.wine,
    promoTag: 'Save $6.10',
    promoType: 'price-drop',
    bundle: { minQty: 2, bundlePrice: 55.00, label: '2 for $55.00' },
    dietary: ['Vegetarian'],
    origin: 'Australia',
    rating: 4.8,
    reviewCount: 512,
    description:
      'Full-bodied ripe plum, black pepper, and subtle oak spice crafted for hearty tomato pork stews and crispy garlic spareribs.',
    storageInfo: 'Store horizontally in a cool, dark place.',
    inStock: true,
    isWine: true,
    isBestseller: true,
    winePairingNote: 'Pairs with Malaysian Lean Pork Tomato Stew',
    weeklyAdGroup: 'weekly-savers',
  },
  {
    id: 'fp-wine-zeroproof',
    name: 'Edenvale Non-Alcoholic Sparkling Cuvée',
    brand: 'Edenvale',
    category: 'beer-wine-spirits',
    subcategory: 'Zero-Proof',
    price: 14.90,
    originalPrice: 17.50,
    packSize: '750ml · 0.0% Alc',
    unitPriceText: '$19.87 / L',
    image: IMAGES.wine,
    promoTag: '0% Alcohol',
    promoType: 'everyday-low',
    dietary: ['Halal', 'Healthier Choice', 'Vegetarian'],
    origin: 'Australia',
    rating: 4.7,
    reviewCount: 194,
    description:
      'Crisp, celebratory alcohol-removed sparkling wine with bright apple blossom notes and half the calories of regular wine.',
    storageInfo: 'Serve chilled at 6°C – 8°C.',
    inStock: true,
    isWine: true,
    isRecommended: true,
    winePairingNote: 'Pairs with Cream Cracker Pork Loin & Laksa',
    weeklyAdGroup: 'weekly-savers',
  },
];

export const RECIPES: RecipeItem[] = [
  {
    id: 'rec-seabass',
    title: 'Hotpot Inspired Sea Bass',
    tagline: 'Seabass with zesty sour plum and spicy sesame sauce',
    prepTime: '20 mins',
    prepMinutes: 20,
    baseServings: 4,
    difficulty: 'Easy',
    description:
      'Delicate local sea bass fillets poached in aromatic broth and finished with tangy sour plum, toasted sesame dressing, and crisp greens.',
    image: IMAGES.recipeSeabass,
    ingredients: [
      { productId: 'fp-seabass-350g', label: 'Fresh Local Sea Bass Fillet', baseAmount: 350, unit: 'g', packsPerBase: 1 },
      { productId: 'fp-sesame-plum-sauce', label: 'Sesame & Sour Plum Sauce', baseAmount: 4, unit: 'tbsp', packsPerBase: 1, isPantryStaple: true },
      { productId: 'fp-veg-bundle', label: 'Fresh Greens & Carrots', baseAmount: 300, unit: 'g', packsPerBase: 1 },
      { productId: 'fp-rice-5kg', label: 'Thai Hom Mali Fragrant Rice', baseAmount: 320, unit: 'g', packsPerBase: 1, isPantryStaple: true },
    ],
    steps: [
      'Score the skin of the fresh sea bass fillet lightly and pat dry with kitchen paper.',
      'Steam or gently poach sea bass with sliced ginger and sour plum glaze for 9 minutes until flaky.',
      'Blanch broccoli and carrot ribbons in hot broth for 2 minutes and arrange around the fish.',
      'Drizzle roasted sesame dressing and sliced red chilli over the warm fillet, then serve with steamed jasmine rice.',
    ],
    tags: {
      quickMeals: ['Under 30 mins', 'One-Pot'],
      mainIngredient: 'Seafood',
      meals: ['Dinner', 'Lunch'],
      occasions: ['Weeknight Dinner', 'Family Gathering'],
      healthyLifestyles: ['High Protein', 'Healthier Choice'],
      celebrityChef: 'Chef Melvyn Lee',
    },
    recommendedWineId: 'fp-wine-sauvblanc',
  },
  {
    id: 'rec-tomato-stew',
    title: 'Malaysian Lean Pork Tomato Stew',
    tagline: 'Wholesome and easy pork stew.',
    prepTime: '35 mins',
    prepMinutes: 35,
    baseServings: 4,
    difficulty: 'Easy',
    description:
      'Comforting home-style claypot stew simmering tender lean pork cuts with vine-ripened tomatoes, sweet carrots, and fragrant greens.',
    image: IMAGES.recipeTomatoStew,
    ingredients: [
      { productId: 'fp-pork-loin-400g', label: 'Australian Lean Pork Loin', baseAmount: 400, unit: 'g', packsPerBase: 1 },
      { productId: 'fp-veg-bundle', label: 'Ripe Tomatoes, Carrots & Greens', baseAmount: 500, unit: 'g', packsPerBase: 1 },
      { productId: 'fp-sesame-plum-sauce', label: 'Savoury Seasoning Glaze', baseAmount: 2, unit: 'tbsp', packsPerBase: 1, isPantryStaple: true },
      { productId: 'fp-rice-5kg', label: 'Fragrant Jasmine Rice', baseAmount: 320, unit: 'g', packsPerBase: 1, isPantryStaple: true },
    ],
    steps: [
      'Cut lean pork loin into bite-sized cubes and marinate briefly with light soy and white pepper.',
      'Sear pork in a claypot or heavy saucepan until lightly browned, then add wedged ripe tomatoes and sliced carrots.',
      'Pour in 400ml water, cover, and simmer gently for 22 minutes until the tomatoes melt into a rich tangy broth.',
      'Fold in leafy greens for the final 2 minutes and serve piping hot with fluffy jasmine rice.',
    ],
    tags: {
      quickMeals: ['One-Pot'],
      mainIngredient: 'Pork',
      meals: ['Dinner', 'Comfort Food'],
      occasions: ['Weeknight Dinner', 'Meal Prep'],
      healthyLifestyles: ['Balanced', 'High Protein'],
      celebrityChef: 'Home Cook Favourites',
    },
    recommendedWineId: 'fp-wine-shiraz',
  },
  {
    id: 'rec-twee-bah',
    title: 'Braised Twee Bah with Mushrooms and Chestnut',
    tagline: 'Pure comfort food in every spoonful.',
    prepTime: '45 mins',
    prepMinutes: 45,
    baseServings: 4,
    difficulty: 'Medium',
    description:
      'Traditional Singapore heritage braised pork simmered with aromatic shiitake mushrooms and tender golden chestnuts in dark soy glaze.',
    image: IMAGES.recipeTweeBah,
    ingredients: [
      { productId: 'fp-pork-belly-500g', label: 'Chilled Pork Belly Cuts', baseAmount: 500, unit: 'g', packsPerBase: 1 },
      { productId: 'fp-shiitake-chestnut', label: 'Shiitake Mushrooms & Chestnuts', baseAmount: 250, unit: 'g', packsPerBase: 1 },
      { productId: 'fp-eggs-10s', label: 'Hard-Boiled Farm Brown Eggs', baseAmount: 4, unit: 'pcs', packsPerBase: 1, isPantryStaple: true },
      { productId: 'fp-rice-5kg', label: 'Thai Hom Mali Fragrant Rice', baseAmount: 360, unit: 'g', packsPerBase: 1, isPantryStaple: true },
    ],
    steps: [
      'Soak dried shiitake mushrooms in warm water for 20 minutes; reserve the aromatic soaking liquid.',
      'Brown pork belly cubes with garlic until golden, then add dark soy, five-spice, mushrooms, and peeled chestnuts.',
      'Add reserved mushroom broth and simmer on low heat for 35 minutes until meat is fork-tender.',
      'Nestle peeled boiled eggs into the sauce for the last 10 minutes and serve over crisp lettuce and steamed rice.',
    ],
    tags: {
      quickMeals: ['One-Pot'],
      mainIngredient: 'Pork',
      meals: ['Dinner', 'Comfort Food'],
      occasions: ['Family Gathering', 'Meal Prep'],
      healthyLifestyles: ['High Protein'],
      celebrityChef: 'Chef Violet Oon Style',
    },
    recommendedWineId: 'fp-wine-pinotnoir',
  },
  {
    id: 'rec-baked-pork-rice',
    title: 'Hong Kong-style Baked Pork Chop Rice',
    tagline: 'Pure indulgence in a single dish.',
    prepTime: '30 mins',
    prepMinutes: 30,
    baseServings: 4,
    difficulty: 'Medium',
    description:
      'Cha chaan teng classic layering golden egg fried rice, pan-seared pork cutlets, savoury tomato onion sauce, and bubbling melted cheese.',
    image: IMAGES.recipeBakedPork,
    ingredients: [
      { productId: 'fp-pork-loin-400g', label: 'Pork Loin Cutlets', baseAmount: 400, unit: 'g', packsPerBase: 1 },
      { productId: 'fp-rice-5kg', label: 'Cooked Fragrant Jasmine Rice', baseAmount: 400, unit: 'g', packsPerBase: 1, isPantryStaple: true },
      { productId: 'fp-eggs-10s', label: 'Fresh Farm Brown Eggs', baseAmount: 3, unit: 'pcs', packsPerBase: 1, isPantryStaple: true },
      { productId: 'fp-cheese-shred', label: 'Mozzarella & Cheddar Bake Mix', baseAmount: 160, unit: 'g', packsPerBase: 1 },
      { productId: 'fp-veg-bundle', label: 'Tomatoes & Sweet Carrots', baseAmount: 300, unit: 'g', packsPerBase: 1 },
    ],
    steps: [
      'Toss cooked jasmine rice with beaten eggs in a hot wok for 3 minutes and spread evenly in a baking dish.',
      'Pan-sear marinated pork loin cutlets for 3 minutes per side until golden, then slice and lay over the fried rice.',
      'Simmer diced tomatoes and onions into a glossy sauce, spoon generously over the pork, and scatter shredded cheese on top.',
      'Bake at 210°C for 10–12 minutes until golden brown and bubbling.',
    ],
    tags: {
      quickMeals: ['Under 30 mins'],
      mainIngredient: 'Pork',
      meals: ['Dinner', 'Lunch', 'Comfort Food'],
      occasions: ['Family Gathering', 'Weeknight Dinner'],
      healthyLifestyles: ['High Protein'],
      celebrityChef: 'Chef Melvyn Lee',
    },
    recommendedWineId: 'fp-wine-pinotnoir',
  },
  {
    id: 'rec-garlic-spareribs',
    title: 'Air-fried Garlic Pork Spareribs',
    tagline: 'A guaranteed crowd-pleaser every time.',
    prepTime: '25 mins',
    prepMinutes: 25,
    baseServings: 4,
    difficulty: 'Easy',
    description:
      'Juicy, caramelized pork spareribs crisped in the air fryer with fragrant toasted garlic chips and savoury honey-sesame glaze.',
    image: IMAGES.recipeSpareribs,
    ingredients: [
      { productId: 'fp-pork-belly-500g', label: 'Pork Spareribs & Belly Pack', baseAmount: 500, unit: 'g', packsPerBase: 1 },
      { productId: 'fp-sesame-plum-sauce', label: 'Savoury Sesame Glaze', baseAmount: 3, unit: 'tbsp', packsPerBase: 1, isPantryStaple: true },
      { productId: 'fp-veg-bundle', label: 'Crisp Side Greens', baseAmount: 250, unit: 'g', packsPerBase: 1 },
    ],
    steps: [
      'Coat pork spareribs with minced garlic, sesame glaze, light soy, and a touch of honey for 15 minutes.',
      'Arrange in a single layer in the air fryer basket and cook at 185°C for 14 minutes, turning halfway.',
      'Increase to 200°C for 3 minutes until edges caramelize and crisp.',
      'Top with golden garlic chips and sliced spring onions; serve alongside blanched greens.',
    ],
    tags: {
      quickMeals: ['Under 30 mins', 'Air-Fryer'],
      mainIngredient: 'Pork',
      meals: ['Dinner', 'Lunch'],
      occasions: ['Weeknight Dinner', 'Family Gathering'],
      healthyLifestyles: ['Low Carb', 'High Protein'],
      celebrityChef: 'Home Cook Favourites',
    },
    recommendedWineId: 'fp-wine-shiraz',
  },
  {
    id: 'rec-cracker-pork',
    title: 'Cream Cracker Crusted Pork Loin',
    tagline: 'Savoury marinated crispy pork.',
    prepTime: '20 mins',
    prepMinutes: 20,
    baseServings: 4,
    difficulty: 'Easy',
    description:
      'Nostalgic Hainanese-inspired crispy pork loin coated in crushed cream crackers for an irresistible golden crunch with tangy dipping sauce.',
    image: IMAGES.recipeCrackerPork,
    ingredients: [
      { productId: 'fp-pork-loin-400g', label: 'Lean Pork Loin Cutlets', baseAmount: 400, unit: 'g', packsPerBase: 1 },
      { productId: 'fp-cream-crackers', label: 'Hup Seng Cream Crackers (Crushed)', baseAmount: 120, unit: 'g', packsPerBase: 1 },
      { productId: 'fp-eggs-10s', label: 'Beaten Farm Eggs (Egg Wash)', baseAmount: 2, unit: 'pcs', packsPerBase: 1, isPantryStaple: true },
      { productId: 'fp-veg-bundle', label: 'Fresh Greens & Tomatoes', baseAmount: 250, unit: 'g', packsPerBase: 1 },
    ],
    steps: [
      'Crush cream crackers finely in a zip-top bag and season with a pinch of five-spice and pepper.',
      'Dip marinated pork loin cutlets into beaten farm egg, then press firmly into the cracker crumbs.',
      'Pan-fry or air-fry at 195°C for 10–12 minutes until crisp and golden brown on both sides.',
      'Rest 2 minutes, slice into strips, and serve with tangy tomato sauce and stir-fried greens.',
    ],
    tags: {
      quickMeals: ['Under 30 mins', 'Air-Fryer'],
      mainIngredient: 'Pork',
      meals: ['Dinner', 'Comfort Food'],
      occasions: ['Weeknight Dinner', 'Family Gathering'],
      healthyLifestyles: ['Balanced'],
      celebrityChef: 'Chef Violet Oon Style',
    },
    recommendedWineId: 'fp-wine-zeroproof',
  },
  {
    id: 'rec-salmon-bowl',
    title: 'Crispy-Skin Norwegian Salmon & Jasmine Rice Bowl',
    tagline: 'Omega-3 rich 20-minute healthy weeknight bowl.',
    prepTime: '20 mins',
    prepMinutes: 20,
    baseServings: 2,
    difficulty: 'Easy',
    description:
      'Pan-seared Norwegian salmon over fluffy SongHe Thai Hom Mali rice with honey-glazed carrots and steamed broccoli.',
    image: IMAGES.salmon,
    ingredients: [
      { productId: 'fp-salmon-300g', label: 'Norwegian Atlantic Salmon Fillet', baseAmount: 300, unit: 'g', packsPerBase: 1 },
      { productId: 'fp-rice-5kg', label: 'Thai Hom Mali Fragrant Rice', baseAmount: 180, unit: 'g', packsPerBase: 1, isPantryStaple: true },
      { productId: 'fp-veg-bundle', label: 'Australian Broccoli & Carrots', baseAmount: 300, unit: 'g', packsPerBase: 1 },
    ],
    steps: [
      'Rinse and steam SongHe Thai Hom Mali rice until light and aromatic.',
      'Pat salmon fillets dry, season with sea salt and cracked pepper, and sear skin-side down for 4 minutes.',
      'Flip for 2 minutes until flaky; steam broccoli and sweet carrots alongside.',
      'Serve salmon over warm jasmine rice with vegetables and a squeeze of citrus.',
    ],
    tags: {
      quickMeals: ['Under 30 mins', 'One-Pot'],
      mainIngredient: 'Seafood',
      meals: ['Lunch', 'Dinner'],
      occasions: ['Weeknight Dinner', 'Meal Prep'],
      healthyLifestyles: ['Healthier Choice', 'High Protein', 'Balanced'],
      celebrityChef: 'Home Cook Favourites',
    },
    recommendedWineId: 'fp-wine-sauvblanc',
  },
  {
    id: 'rec-laksa',
    title: 'Hawker-Style Singapore Laksa Lemak with Soft Eggs',
    tagline: 'Creamy coconut laksa ready in 15 minutes.',
    prepTime: '15 mins',
    prepMinutes: 15,
    baseServings: 4,
    difficulty: 'Easy',
    description:
      'Elevate Prima Taste Laksa with jammy local farm eggs and crisp blanched broccoli florets for an effortless weeknight supper.',
    image: IMAGES.laksa,
    ingredients: [
      { productId: 'fp-laksa-4s', label: 'Prima Taste Laksa LaMian Pack', baseAmount: 4, unit: 'packs', packsPerBase: 1 },
      { productId: 'fp-eggs-10s', label: 'Fresh Farm Brown Eggs', baseAmount: 4, unit: 'pcs', packsPerBase: 1, isPantryStaple: true },
      { productId: 'fp-veg-bundle', label: 'Blanched Broccoli Florets', baseAmount: 250, unit: 'g', packsPerBase: 1 },
    ],
    steps: [
      'Boil Pasar brown eggs for 6.5 minutes, transfer to an ice bath, and peel.',
      'Simmer Prima Taste Laksa paste and coconut premix in water until fragrant.',
      'Cook LaMian noodles for 7 minutes; blanch broccoli florets in the final 2 minutes.',
      'Ladle into bowls, top with halved soft-boiled eggs, and serve hot.',
    ],
    tags: {
      quickMeals: ['Under 15 mins', 'Under 30 mins', 'One-Pot'],
      mainIngredient: 'Eggs & Tofu',
      meals: ['Lunch', 'Dinner', 'Comfort Food'],
      occasions: ['Weeknight Dinner'],
      healthyLifestyles: ['Balanced'],
      celebrityChef: 'Home Cook Favourites',
    },
    recommendedWineId: 'fp-wine-zeroproof',
  },
];

// Default items pre-marked as "Already Have in Pantry" so the delighter works out of the box
export const DEFAULT_PANTRY_PRODUCT_IDS: string[] = [
  'fp-rice-5kg',
  'fp-eggs-10s',
];

export const PANTRY_STAPLE_IDS: string[] = [
  'fp-rice-5kg',
  'fp-eggs-10s',
  'fp-milk-2l',
  'fp-sesame-plum-sauce',
  'fp-bread-800g',
  'fp-cream-crackers',
  'fp-cheese-shred',
  'fp-malt-500g',
  'fp-greentea-6s',
  'fp-veg-bundle',
];

export const VOUCHERS: VoucherItem[] = [
  {
    code: 'WELCOME5',
    title: '$5 Off Grocery Cart',
    description: 'Valid on fresh produce, meal planner ingredients, and pantry staples.',
    minSpend: 30,
    discount: 5,
    validUntil: 'Valid till 30 Nov 2026',
    categoryNote: 'Storewide Online',
  },
  {
    code: 'FP10',
    title: '$10 Off Weekly Family Shop',
    description: 'Save instantly on larger weekly meal prep & household orders.',
    minSpend: 80,
    discount: 10,
    validUntil: 'Valid till 30 Nov 2026',
    categoryNote: 'Orders $80+',
  },
  {
    code: 'FREESHIP',
    title: 'Free Standard Delivery',
    description: 'Waives the $5.99 delivery fee on any 2-hour delivery slot.',
    minSpend: 0,
    discount: 0,
    freeDelivery: true,
    validUntil: 'Valid this week',
    categoryNote: 'No min. spend',
  },
  {
    code: 'HEALTHY3',
    title: '$3 Off Meal Planner Basket',
    description: 'Encouraging healthy home-cooked meals — apply to any cart $25+.',
    minSpend: 25,
    discount: 3,
    validUntil: 'Valid till 15 Dec 2026',
    categoryNote: 'Meal Planner Perk',
  },
  {
    code: 'WINE8',
    title: '$8 Off Wine & Zero-Proof List',
    description: 'Enjoy $8 off when pairing wines or sparkling cuvées with dinner ($45+ spend).',
    minSpend: 45,
    discount: 8,
    validUntil: 'Valid this weekend',
    categoryNote: 'Wine List Special',
  },
];

export const PROMO_CODES: Record<
  string,
  { label: string; minSpend: number; discount: number; freeDelivery?: boolean }
> = {
  WELCOME5: { label: '$5 off your order', minSpend: 30, discount: 5 },
  FP10: { label: '$10 off orders $80+', minSpend: 80, discount: 10 },
  FREESHIP: { label: 'Free standard delivery', minSpend: 0, discount: 0, freeDelivery: true },
  HEALTHY3: { label: '$3 off Meal Planner ($25+)', minSpend: 25, discount: 3 },
  WINE8: { label: '$8 off Wine List ($45+)', minSpend: 45, discount: 8 },
};

export const SINGAPORE_AREAS = [
  { postalCode: '238801', label: 'Orchard Road · Central' },
  { postalCode: '529510', label: 'Tampines Central · East' },
  { postalCode: '608532', label: 'Jurong East · West' },
  { postalCode: '569933', label: 'Ang Mo Kio · North-East' },
  { postalCode: '018956', label: 'Marina Bay · Downtown' },
  { postalCode: '738099', label: 'Woodlands · North' },
];

export const DELIVERY_SLOTS: DeliverySlot[] = [
  { id: 'slot-1', dayLabel: 'Today', dateLabel: '26 Nov', window: '6:00 PM – 8:00 PM', fee: 5.99, status: 'Filling Fast' },
  { id: 'slot-2', dayLabel: 'Today', dateLabel: '26 Nov', window: '8:00 PM – 10:00 PM', fee: 5.99, status: 'Available' },
  { id: 'slot-3', dayLabel: 'Tomorrow', dateLabel: '27 Nov', window: '10:00 AM – 12:00 PM', fee: 5.99, status: 'Available' },
  { id: 'slot-4', dayLabel: 'Tomorrow', dateLabel: '27 Nov', window: '2:00 PM – 4:00 PM', fee: 5.99, status: 'Available' },
  { id: 'slot-5', dayLabel: 'Tomorrow', dateLabel: '27 Nov', window: '6:00 PM – 8:00 PM', fee: 5.99, status: 'Available' },
  { id: 'slot-6', dayLabel: 'Fri', dateLabel: '28 Nov', window: '10:00 AM – 12:00 PM', fee: 5.99, status: 'Available' },
];

export const STORE_OUTLETS: StoreOutlet[] = [
  {
    id: 'st-vivo',
    name: 'Pantry Lane Superstore @ VivoCity',
    format: 'Pantry Lane Superstore',
    address: '1 HarbourFront Walk, #B2-23 VivoCity',
    postalCode: '098585',
    hours: '8:00 AM – 11:00 PM Daily',
    distanceKm: 2.1,
    clickAndCollect: true,
  },
  {
    id: 'st-tripleone',
    name: 'Pantry Lane Select @ 111 Somerset',
    format: 'Pantry Lane Select',
    address: '111 Somerset Road, #01-01 TripleOne Somerset',
    postalCode: '238164',
    hours: '8:00 AM – 11:00 PM Daily',
    distanceKm: 0.6,
    clickAndCollect: true,
  },
  {
    id: 'st-amk',
    name: 'Pantry Lane Superstore @ AMK Hub',
    format: 'Pantry Lane Superstore',
    address: '53 Ang Mo Kio Ave 3, #B2-40 AMK Hub',
    postalCode: '569933',
    hours: 'Open 24 Hours',
    distanceKm: 7.4,
    clickAndCollect: true,
  },
  {
    id: 'st-jem',
    name: 'Pantry Lane Superstore @ Jem',
    format: 'Pantry Lane Superstore',
    address: '50 Jurong Gateway Road, #B1-21 Jem',
    postalCode: '608549',
    hours: '8:00 AM – 11:00 PM Daily',
    distanceKm: 11.2,
    clickAndCollect: true,
  },
  {
    id: 'st-tampines',
    name: 'Pantry Lane @ Tampines Mall',
    format: 'Pantry Lane',
    address: '4 Tampines Central 5, #B1-12 Tampines Mall',
    postalCode: '529510',
    hours: '8:00 AM – 10:30 PM Daily',
    distanceKm: 13.5,
    clickAndCollect: true,
  },
];

export function calculateItemTotal(product: Product, qty: number): { total: number; savings: number } {
  if (qty <= 0) return { total: 0, savings: 0 };
  const baseTotal = product.price * qty;
  const originalBase = (product.originalPrice ?? product.price) * qty;

  if (product.bundle && qty >= product.bundle.minQty) {
    const bundleGroups = Math.floor(qty / product.bundle.minQty);
    const remainder = qty % product.bundle.minQty;
    const total = bundleGroups * product.bundle.bundlePrice + remainder * product.price;
    return {
      total: Number(total.toFixed(2)),
      savings: Number(Math.max(0, originalBase - total).toFixed(2)),
    };
  }

  return {
    total: Number(baseTotal.toFixed(2)),
    savings: Number(Math.max(0, originalBase - baseTotal).toFixed(2)),
  };
}

export function formatScaledAmount(baseAmount: number, baseServings: number, targetServings: number): string {
  const scaled = (baseAmount * targetServings) / baseServings;
  if (Number.isInteger(scaled)) return String(scaled);
  return scaled % 0.5 === 0 ? scaled.toFixed(1) : scaled.toFixed(1).replace(/\.0$/, '');
}

export function calculateScaledPacks(packsPerBase: number, baseServings: number, targetServings: number): number {
  return Math.max(1, Math.ceil((packsPerBase * targetServings) / baseServings));
}
