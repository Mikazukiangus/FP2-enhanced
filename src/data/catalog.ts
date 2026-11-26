export interface Category {
  id: string;
  name: string;
  shortName: string;
  subcategories: string[];
  accentBg: string;
  accentText: string;
  iconKey: string;
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
  weeklyAdGroup?: 'must-buy' | 'weekly-savers' | 'fresh-buys' | '4-day-specials';
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  targetView: 'promotions' | 'must-buy' | 'price-drop' | 'category';
  targetCategory?: string;
  image: string;
  theme: 'blue' | 'red' | 'navy';
}

export interface RecipeItem {
  id: string;
  title: string;
  prepTime: string;
  servings: string;
  difficulty: 'Easy' | 'Medium';
  description: string;
  image: string;
  productIds: string[];
  steps: string[];
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
};

export const CATEGORIES: Category[] = [
  {
    id: 'fruits-vegetables',
    name: 'Fruits & Vegetables',
    shortName: 'Fruits & Veg',
    subcategories: ['Fresh Fruits', 'Fresh Vegetables', 'Organic Produce', 'Salad & Herbs', 'Mushrooms'],
    accentBg: 'bg-[#ECFDF3]',
    accentText: 'text-[#15803D]',
    iconKey: 'apple',
  },
  {
    id: 'dairy-chilled-eggs',
    name: 'Dairy, Chilled & Eggs',
    shortName: 'Dairy & Eggs',
    subcategories: ['Fresh Milk', 'Eggs', 'Yoghurt & Probiotics', 'Butter & Cheese', 'Tofu & Chilled Foods'],
    accentBg: 'bg-[#F0FDFA]',
    accentText: 'text-[#0F766E]',
    iconKey: 'milk',
  },
  {
    id: 'meat-seafood',
    name: 'Meat & Seafood',
    shortName: 'Meat & Seafood',
    subcategories: ['Fresh Fish & Salmon', 'Poultry', 'Beef & Lamb', 'Prawns & Shellfish', 'Marinated Cuts'],
    accentBg: 'bg-[#FEF2F2]',
    accentText: 'text-[#B91C1C]',
    iconKey: 'fish',
  },
  {
    id: 'rice-noodles-cooking',
    name: 'Rice, Noodles & Cooking Ingredients',
    shortName: 'Rice & Cooking',
    subcategories: ['Fragrant Rice', 'Instant Noodles', 'Cooking Oils', 'Sauces & Condiments', 'Baking & Spices'],
    accentBg: 'bg-[#FFFBEB]',
    accentText: 'text-[#B45309]',
    iconKey: 'wheat',
  },
  {
    id: 'bakery',
    name: 'Bakery',
    shortName: 'Bakery',
    subcategories: ['Wholemeal & Sandwich Bread', 'Buns & Rolls', 'Cakes & Pastries', 'Wraps & Flatbreads'],
    accentBg: 'bg-[#FEF3C7]',
    accentText: 'text-[#92400E]',
    iconKey: 'croissant',
  },
  {
    id: 'drinks',
    name: 'Drinks',
    shortName: 'Drinks',
    subcategories: ['Asian & Green Tea', 'Malt & Chocolate Drinks', 'Coffee & Tea', 'Juices', 'Water & Sparkling'],
    accentBg: 'bg-[#ECFEFF]',
    accentText: 'text-[#0E7490]',
    iconKey: 'cup',
  },
  {
    id: 'household',
    name: 'Household',
    shortName: 'Household',
    subcategories: ['Laundry Detergent', 'Paper & Bathroom Tissue', 'Dishwashing', 'Kitchen & Cleaning'],
    accentBg: 'bg-[#EEF2FF]',
    accentText: 'text-[#3730A3]',
    iconKey: 'sparkles',
  },
  {
    id: 'snacks-confectionery',
    name: 'Snacks & Confectionery',
    shortName: 'Snacks',
    subcategories: ['Biscuits & Crackers', 'Chips & Savoury', 'Nuts & Dried Fruits', 'Chocolates'],
    accentBg: 'bg-[#FFF7ED]',
    accentText: 'text-[#C2410C]',
    iconKey: 'cookie',
  },
];

export const TRENDING_SEARCHES = [
  'Fresh Milk',
  'Eggs',
  'Thai Fragrant Rice',
  'Salmon',
  'Laksa Noodles',
  'Toilet Tissue',
  'Fuji Apples',
  'Laundry Detergent',
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    eyebrow: 'Weekly Freshness · Thu – Wed',
    title: 'Fresh Market Picks Delivered to Your Door',
    subtitle:
      'Save up to 35% on crisp fruits, chilled dairy, Norwegian salmon, and everyday staples. Free delivery on orders $59 & above.',
    ctaLabel: 'Shop Top Picks Deals',
    targetView: 'must-buy',
    image: IMAGES.heroFresh,
    theme: 'blue',
  },
  {
    id: 'slide-2',
    eyebrow: 'Price Drop Buy Now',
    title: 'Everyday Pantry Staples at Lower Prices',
    subtitle:
      'Stock up on fragrant Thai Hom Mali rice, breakfast malt, gourmet noodles, and household care with instant bundle savings.',
    ctaLabel: 'Explore Price Drops',
    targetView: 'price-drop',
    image: IMAGES.heroDeals,
    theme: 'navy',
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
    promoTag: 'MUST BUY',
    promoType: 'must-buy',
    bundle: { minQty: 2, bundlePrice: 11.20, label: 'Any 2 for $11.20' },
    dietary: ['Halal', 'Healthier Choice'],
    origin: 'Thailand',
    rating: 4.9,
    reviewCount: 1420,
    description:
      '100% fresh cow milk pasteurised to preserve creamy taste and natural calcium. Rich in protein and Vitamin B2 for everyday family nutrition.',
    storageInfo: 'Keep refrigerated between 2°C and 4°C. Consume within 3 days after opening.',
    inStock: true,
    isFeatured: true,
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
    packSize: '10 per pack (550g)',
    unitPriceText: '$0.32 / egg',
    image: IMAGES.eggs,
    promoTag: 'EVERYDAY LOW PRICE',
    promoType: 'everyday-low',
    dietary: ['Housebrand', 'Vegetarian'],
    origin: 'Singapore',
    rating: 4.8,
    reviewCount: 2180,
    description:
      'Locally farmed Grade A fresh brown eggs collected daily for firm whites and rich golden yolks. SFA-certified farm freshness.',
    storageInfo: 'Store in a cool dry place or refrigerate below 4°C to maintain peak freshness.',
    inStock: true,
    isFeatured: true,
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
    promoTag: 'SAVE $2.70',
    promoType: 'price-drop',
    dietary: ['Halal', 'Vegetarian'],
    origin: 'Thailand',
    rating: 4.9,
    reviewCount: 985,
    description:
      'Premium new-crop 100% Thai Hom Mali jasmine rice with long, pearly grains, silky texture, and delicate floral aroma after steaming.',
    storageInfo: 'Store in an airtight container in a cool, dry place away from direct sunlight.',
    inStock: true,
    isFeatured: true,
    weeklyAdGroup: 'must-buy',
  },
  {
    id: 'fp-salmon-300g',
    name: 'Pasar Fresh Norwegian Atlantic Salmon Fillet',
    brand: 'Pasar',
    category: 'meat-seafood',
    subcategory: 'Fresh Fish & Salmon',
    price: 10.90,
    originalPrice: 13.50,
    packSize: '300g (2 Portions)',
    unitPriceText: '$3.63 / 100g',
    image: IMAGES.salmon,
    promoTag: '4-DAY SPECIAL',
    promoType: 'fresh-buy',
    dietary: ['Housebrand', 'Healthier Choice'],
    origin: 'Norway',
    rating: 4.8,
    reviewCount: 642,
    description:
      'Air-flown chilled Norwegian Atlantic salmon portions with rich omega-3 marbling. Skin-on and trimmed for pan-searing, baking, or air-frying.',
    storageInfo: 'Keep chilled between 0°C and 4°C. Cook thoroughly before consumption.',
    inStock: true,
    isFeatured: true,
    weeklyAdGroup: '4-day-specials',
  },
  {
    id: 'fp-fuji-apples',
    name: 'Pasar Crisp Red Fuji Apples',
    brand: 'Pasar',
    category: 'fruits-vegetables',
    subcategory: 'Fresh Fruits',
    price: 4.45,
    originalPrice: 5.50,
    packSize: '5 per pack (Approx. 950g)',
    unitPriceText: '$0.89 / pc',
    image: IMAGES.apples,
    promoTag: 'FRESH BUY',
    promoType: 'fresh-buy',
    bundle: { minQty: 2, bundlePrice: 8.20, label: 'Any 2 packs for $8.20' },
    dietary: ['Housebrand', 'Vegetarian'],
    origin: 'China',
    rating: 4.7,
    reviewCount: 514,
    description:
      'Sweet, crunchy red Fuji apples hand-selected for high Brix sweetness and crisp bite. Ideal for snacking, juicing, and lunchboxes.',
    storageInfo: 'Keep refrigerated in crisper drawer to maintain crunch.',
    inStock: true,
    isFeatured: true,
    weeklyAdGroup: 'fresh-buys',
  },
  {
    id: 'fp-veg-bundle',
    name: 'Pasar Australian Broccoli & Sweet Carrots Bundle',
    brand: 'Pasar',
    category: 'fruits-vegetables',
    subcategory: 'Fresh Vegetables',
    price: 3.95,
    originalPrice: 4.90,
    packSize: '650g Bundle',
    unitPriceText: '$6.08 / kg',
    image: IMAGES.vegetables,
    promoTag: 'SAVE $0.95',
    promoType: 'fresh-buy',
    dietary: ['Housebrand', 'Vegetarian', 'Healthier Choice'],
    origin: 'Australia',
    rating: 4.8,
    reviewCount: 412,
    description:
      'Farm-fresh green Australian broccoli florets paired with sweet young carrots. Harvested at peak tenderness for stir-fries and soups.',
    storageInfo: 'Store refrigerated at 2°C to 5°C. Rinse thoroughly before cooking.',
    inStock: true,
    isFeatured: true,
    weeklyAdGroup: 'fresh-buys',
  },
  {
    id: 'fp-malt-500g',
    name: 'Milo Activ-Go Chocolate Malt Drink Refill Pack',
    brand: 'Milo',
    category: 'drinks',
    subcategory: 'Malt & Chocolate Drinks',
    price: 6.45,
    originalPrice: 7.60,
    packSize: '500g',
    unitPriceText: '$1.29 / 100g',
    image: IMAGES.malt,
    promoTag: '2 FOR $11.90',
    promoType: 'bundle',
    bundle: { minQty: 2, bundlePrice: 11.90, label: 'Any 2 for $11.90' },
    dietary: ['Halal', 'Healthier Choice'],
    origin: 'Singapore',
    rating: 4.9,
    reviewCount: 1845,
    description:
      'Iconic Singapore chocolate malt beverage fortified with Protomalt, vitamins B2, B3, B6, C, D, and iron to fuel active mornings.',
    storageInfo: 'Keep tightly sealed in a cool, dry place.',
    inStock: true,
    isFeatured: true,
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
    promoTag: 'EVERYDAY LOW PRICE',
    promoType: 'everyday-low',
    dietary: ['Halal', 'Healthier Choice', 'Vegetarian'],
    origin: 'Singapore',
    rating: 4.9,
    reviewCount: 2310,
    description:
      'Soft, fibre-rich wholemeal sandwich loaf baked fresh daily with zero trans fat and wholegrain goodness.',
    storageInfo: 'Keep in a cool dry place. Best consumed before expiry date on clip.',
    inStock: true,
    isFeatured: true,
    weeklyAdGroup: 'weekly-savers',
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
    promoTag: 'PRICE DROP',
    promoType: 'price-drop',
    bundle: { minQty: 2, bundlePrice: 21.50, label: 'Any 2 for $21.50' },
    dietary: [],
    origin: 'Malaysia',
    rating: 4.8,
    reviewCount: 790,
    description:
      'Deep-cleaning liquid laundry gel formulated for indoor drying in humid climates. Removes tough stains in 1 wash with lasting fresh scent.',
    storageInfo: 'Store upright in a cool place away from children.',
    inStock: true,
    isFeatured: true,
    weeklyAdGroup: 'must-buy',
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
    promoTag: '2 FOR $7.80',
    promoType: 'bundle',
    bundle: { minQty: 2, bundlePrice: 7.80, label: 'Any 2 packs for $7.80' },
    dietary: ['Halal', 'Healthier Choice', 'Vegetarian'],
    origin: 'Singapore',
    rating: 4.8,
    reviewCount: 1150,
    description:
      '100% real brewed jasmine green tea with zero sugar and crisp natural antioxidants. Refreshing chilled straight from the fridge.',
    storageInfo: 'Store in a cool dry place. Best served chilled.',
    inStock: true,
    isFeatured: true,
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
    promoTag: 'MUST BUY',
    promoType: 'must-buy',
    dietary: ['Halal'],
    origin: 'Singapore',
    rating: 4.9,
    reviewCount: 1620,
    description:
      'Award-winning authentic Singapore Laksa with rich coconut curry gravy, aromatic dried shrimp rempah paste, and springy air-dried noodles.',
    storageInfo: 'Store in a cool, dry place.',
    inStock: true,
    isFeatured: true,
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
    packSize: '10 Rolls x 220 Sheets',
    unitPriceText: '$0.60 / roll',
    image: IMAGES.tissue,
    promoTag: '3 FOR $16.50',
    promoType: 'bundle',
    bundle: { minQty: 3, bundlePrice: 16.50, label: 'Any 3 packs for $16.50' },
    dietary: ['Housebrand'],
    origin: 'Malaysia',
    rating: 4.7,
    reviewCount: 1930,
    description:
      'Ultra-soft, absorbent 3-ply bathroom tissue crafted from 100% sustainably sourced virgin pulp. Gentle on skin and septic-safe.',
    storageInfo: 'Keep dry and away from moisture.',
    inStock: true,
    isFeatured: true,
    weeklyAdGroup: '4-day-specials',
  },
  {
    id: 'fp-milk-lowfat',
    name: 'Pantry Lane Fresh Low Fat Milk',
    brand: 'Pantry Lane',
    category: 'dairy-chilled-eggs',
    subcategory: 'Fresh Milk',
    price: 4.95,
    originalPrice: 5.60,
    packSize: '2L',
    unitPriceText: '$2.48 / L',
    image: IMAGES.milk,
    promoTag: 'EVERYDAY LOW PRICE',
    promoType: 'everyday-low',
    dietary: ['Halal', 'Healthier Choice', 'Housebrand'],
    origin: 'Australia',
    rating: 4.7,
    reviewCount: 840,
    description:
      'High-calcium, low-fat Australian pasteurised milk with clean creamy flavour at Pantry Lane house brand everyday value.',
    storageInfo: 'Keep refrigerated between 2°C and 4°C.',
    inStock: true,
    weeklyAdGroup: 'weekly-savers',
  },
  {
    id: 'fp-eggs-omega',
    name: 'Chew’s Fresh Omega-3 Enriched Brown Eggs',
    brand: 'Chew’s',
    category: 'dairy-chilled-eggs',
    subcategory: 'Eggs',
    price: 3.95,
    originalPrice: 4.45,
    packSize: '10 per pack (600g)',
    unitPriceText: '$0.40 / egg',
    image: IMAGES.eggs,
    promoTag: 'SAVE $0.50',
    promoType: 'fresh-buy',
    dietary: ['Healthier Choice', 'Vegetarian'],
    origin: 'Singapore',
    rating: 4.8,
    reviewCount: 620,
    description:
      'Locally produced eggs enriched with Omega-3 fatty acids and Vitamin E from hens fed a vegetarian flaxseed diet.',
    storageInfo: 'Keep refrigerated for optimal freshness.',
    inStock: true,
    weeklyAdGroup: 'fresh-buys',
  },
  {
    id: 'fp-rice-fp-5kg',
    name: 'Pantry Lane Thai Hom Mali Superior Fragrant Rice',
    brand: 'Pantry Lane',
    category: 'rice-noodles-cooking',
    subcategory: 'Fragrant Rice',
    price: 12.90,
    originalPrice: 14.50,
    packSize: '5kg',
    unitPriceText: '$2.58 / kg',
    image: IMAGES.rice,
    promoTag: 'HOUSEBRAND VALUE',
    promoType: 'everyday-low',
    dietary: ['Halal', 'Housebrand', 'Vegetarian'],
    origin: 'Thailand',
    rating: 4.8,
    reviewCount: 1340,
    description:
      'Everyday favourite Thai fragrant jasmine rice with soft, fluffy cooked grains and trusted Pantry Lane quality guarantee.',
    storageInfo: 'Keep sealed in a cool dry pantry.',
    inStock: true,
    weeklyAdGroup: 'weekly-savers',
  },
  {
    id: 'fp-salmon-sashimi',
    name: 'Pasar Air-Flown Atlantic Salmon Value Pack',
    brand: 'Pasar',
    category: 'meat-seafood',
    subcategory: 'Fresh Fish & Salmon',
    price: 18.90,
    originalPrice: 22.80,
    packSize: '550g Family Pack',
    unitPriceText: '$3.44 / 100g',
    image: IMAGES.salmon,
    promoTag: 'SAVE $3.90',
    promoType: 'price-drop',
    dietary: ['Housebrand', 'Healthier Choice'],
    origin: 'Norway',
    rating: 4.9,
    reviewCount: 380,
    description:
      'Generous family pack of fresh chilled Norwegian salmon portions, rich in Omega-3 and ready for healthy weekday dinners.',
    storageInfo: 'Keep chilled at 0°C – 4°C.',
    inStock: true,
    weeklyAdGroup: '4-day-specials',
  },
  {
    id: 'fp-apples-organic',
    name: 'Pasar Organic Sweet Fuji Apples',
    brand: 'Pasar',
    category: 'fruits-vegetables',
    subcategory: 'Organic Produce',
    price: 5.95,
    originalPrice: 6.95,
    packSize: '4 per pack (800g)',
    unitPriceText: '$1.49 / pc',
    image: IMAGES.apples,
    promoTag: 'FRESH BUY',
    promoType: 'fresh-buy',
    dietary: ['Organic', 'Vegetarian', 'Housebrand'],
    origin: 'New Zealand',
    rating: 4.8,
    reviewCount: 295,
    description:
      'Certified organic crisp orchard-grown Fuji apples with naturally sweet honeyed notes.',
    storageInfo: 'Store refrigerated.',
    inStock: true,
    weeklyAdGroup: 'fresh-buys',
  },
  {
    id: 'fp-laksa-curry',
    name: 'Prima Taste Singapore Curry LaMian Multipack',
    brand: 'Prima Taste',
    category: 'snacks-confectionery',
    subcategory: 'Biscuits & Crackers',
    price: 10.95,
    originalPrice: 12.60,
    packSize: '4 x 178g',
    unitPriceText: '$2.74 / pack',
    image: IMAGES.laksa,
    promoTag: '2 FOR $20.50',
    promoType: 'bundle',
    bundle: { minQty: 2, bundlePrice: 20.50, label: 'Any 2 packs for $20.50' },
    dietary: ['Halal'],
    origin: 'Singapore',
    rating: 4.9,
    reviewCount: 890,
    description:
      'Fragrant Singapore Nyonya curry broth paired with premium steamed air-dried noodles.',
    storageInfo: 'Store in a cool dry place.',
    inStock: true,
    weeklyAdGroup: '4-day-specials',
  },
];

export const RECIPES: RecipeItem[] = [
  {
    id: 'rec-laksa',
    title: 'Hawker-Style Singapore Laksa Lemak with Soft Eggs',
    prepTime: '20 mins',
    servings: '4 servings',
    difficulty: 'Easy',
    description:
      'Elevate Prima Taste Laksa with creamy jammy farm eggs and crisp blanched broccoli florets for a comforting 20-minute weeknight dinner.',
    image: IMAGES.laksa,
    productIds: ['fp-laksa-4s', 'fp-eggs-10s', 'fp-veg-bundle'],
    steps: [
      'Boil Pasar brown eggs for 6.5 minutes, then transfer immediately to an ice bath and peel.',
      'Simmer Prima Taste Laksa paste and coconut premix in 500ml water until fragrant.',
      'Add LaMian noodles and cook for 7 minutes; blanch broccoli florets in the final 2 minutes.',
      'Ladle into bowls, halve the soft-boiled eggs on top, and serve piping hot.',
    ],
  },
  {
    id: 'rec-salmon',
    title: 'Crispy-Skin Norwegian Salmon & Fragrant Jasmine Rice Bowl',
    prepTime: '25 mins',
    servings: '2 servings',
    difficulty: 'Easy',
    description:
      'Pan-seared Norwegian salmon over fluffy SongHe Thai Hom Mali rice with honey-glazed carrots and steamed broccoli.',
    image: IMAGES.salmon,
    productIds: ['fp-salmon-300g', 'fp-rice-5kg', 'fp-veg-bundle'],
    steps: [
      'Rinse and steam SongHe Thai Hom Mali rice until light and aromatic.',
      'Pat salmon fillets dry, season with sea salt and cracked pepper, and sear skin-side down for 4 minutes.',
      'Flip for 2 minutes until medium-rare and flaky; steam broccoli and sweet carrots alongside.',
      'Serve salmon over warm jasmine rice with vegetables and a squeeze of citrus.',
    ],
  },
  {
    id: 'rec-breakfast',
    title: 'Singapore Kopitiam Wholemeal Toast & Iced Chocolate Malt',
    prepTime: '10 mins',
    servings: '2 servings',
    difficulty: 'Easy',
    description:
      'A classic hearty Singapore breakfast pairing soft-boiled local eggs, crisp wholemeal toast, fresh Fuji apples, and creamy iced Milo.',
    image: IMAGES.malt,
    productIds: ['fp-bread-800g', 'fp-eggs-10s', 'fp-milk-2l', 'fp-malt-500g', 'fp-fuji-apples'],
    steps: [
      'Toast Gardenia wholemeal bread slices until golden and crisp.',
      'Dissolve 3 tablespoons of Milo in warm water, top with chilled Meiji Fresh Milk and ice.',
      'Serve alongside soft-boiled farm eggs and freshly sliced Fuji apples.',
    ],
  },
];

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

export const PROMO_CODES: Record<string, { label: string; minSpend: number; discount: number; freeDelivery?: boolean }> = {
  WELCOME5: { label: '$5 off your order', minSpend: 30, discount: 5 },
  FP10: { label: '$10 off orders $80+', minSpend: 80, discount: 10 },
  FREESHIP: { label: 'Free standard delivery', minSpend: 0, discount: 0, freeDelivery: true },
};

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
