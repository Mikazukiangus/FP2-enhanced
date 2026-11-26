import React, { useEffect, useMemo, useState } from 'react';
import {
  Apple,
  Award,
  ChevronLeft,
  ChevronRight,
  Cookie,
  Croissant,
  CupSoda,
  Fish,
  Milk,
  Sparkles,
  Tag,
  Truck,
  Wheat,
} from 'lucide-react';
import {
  calculateItemTotal,
  CATEGORIES,
  DELIVERY_SLOTS,
  DeliverySlot,
  HERO_SLIDES,
  Product,
  PRODUCTS,
  STORE_OUTLETS,
  StoreOutlet,
} from './data/catalog';
import { ActivePage, Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import {
  AccountModal,
  CheckoutModal,
  CheckoutSummary,
  DeliveryModal,
  ProductDetailModal,
  StoreLocatorModal,
} from './components/Modals';
import {
  CatalogView,
  DigitalClubView,
  RecipesView,
  WeeklyAdsView,
} from './components/SecondaryViews';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  apple: Apple,
  milk: Milk,
  fish: Fish,
  wheat: Wheat,
  croissant: Croissant,
  cup: CupSoda,
  sparkles: Sparkles,
  cookie: Cookie,
};

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [cart, setCart] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('fp_sg_cart');
      return saved ? JSON.parse(saved) : { 'fp-milk-2l': 1, 'fp-eggs-10s': 1 };
    } catch {
      return { 'fp-milk-2l': 1, 'fp-eggs-10s': 1 };
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fp_sg_wishlist');
      return saved ? JSON.parse(saved) : ['fp-salmon-300g', 'fp-rice-5kg'];
    } catch {
      return ['fp-salmon-300g', 'fp-rice-5kg'];
    }
  });

  const [postalCode, setPostalCode] = useState('238801');
  const [fulfillmentMode, setFulfillmentMode] = useState<'delivery' | 'collect'>('delivery');
  const [selectedSlot, setSelectedSlot] = useState<DeliverySlot>(DELIVERY_SLOTS[0]);
  const [selectedOutlet, setSelectedOutlet] = useState<StoreOutlet>(STORE_OUTLETS[1]);

  const [isSignedIn, setIsSignedIn] = useState(true);
  const [linkpoints, setLinkpoints] = useState(1280);
  const [isDigitalClub, setIsDigitalClub] = useState(false);
  const [orderHistory, setOrderHistory] = useState<{ id: string; date: string; total: number }[]>([
    { id: 'FP-2026-41208', date: '18 Nov 2026', total: 68.45 },
  ]);

  // UI Overlays
  const [cartOpen, setCartOpen] = useState(false);
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [storeLocatorOpen, setStoreLocatorOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutSummary, setCheckoutSummary] = useState<CheckoutSummary | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Homepage Carousel & Tabs
  const [heroIndex, setHeroIndex] = useState(0);
  const [freshTab, setFreshTab] = useState<'all' | 'fruits-vegetables' | 'dairy-chilled-eggs' | 'meat-seafood'>('all');
  const [pantryTab, setPantryTab] = useState<'all' | 'rice-noodles-cooking' | 'drinks' | 'household'>('all');

  useEffect(() => {
    try {
      localStorage.setItem('fp_sg_cart', JSON.stringify(cart));
    } catch {
      // ignore storage quota
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('fp_sg_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore storage quota
    }
  }, [wishlist]);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2600);
  };

  const { cartCount, cartSubtotal } = useMemo(() => {
    let count = 0;
    let total = 0;
    Object.entries(cart).forEach(([id, qty]) => {
      if (qty > 0) {
        const prod = PRODUCTS.find((p) => p.id === id);
        if (prod) {
          count += qty;
          total += calculateItemTotal(prod, qty).total;
        }
      }
    });
    return { cartCount: count, cartSubtotal: Number(total.toFixed(2)) };
  }, [cart]);

  const deliverySummary =
    fulfillmentMode === 'delivery'
      ? `${selectedSlot.dayLabel}, ${selectedSlot.window}`
      : `Collect: ${selectedOutlet.name.replace('Pantry Lane ', '')}`;

  const handleAddToCart = (product: Product) => {
    setCart((prev) => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }));
    showToast(`Added ${product.name} to cart`);
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCart((prev) => {
      const next = (prev[productId] || 0) + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: next };
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
  };

  const handleAddMultiple = (productIds: string[]) => {
    setCart((prev) => {
      const next = { ...prev };
      productIds.forEach((id) => {
        next[id] = (next[id] || 0) + 1;
      });
      return next;
    });
    showToast(`Added ${productIds.length} recipe ingredients to your cart`);
    setCartOpen(true);
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      showToast(exists ? 'Removed from Shopping List' : 'Saved to Shopping List');
      return exists ? prev.filter((id) => id !== productId) : [...prev, productId];
    });
  };

  const handleNavigate = (page: ActivePage, categoryId: string | null = null) => {
    setActivePage(page);
    setActiveCategory(categoryId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (q: string) => {
    setSearchQuery(q);
    if (q.trim()) {
      setActivePage('search');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActivePage('home');
    }
  };

  const handleCompleteOrder = (orderId: string, earned: number, spent: number) => {
    setCart({});
    setLinkpoints((prev) => Math.max(0, prev - spent + earned));
    if (checkoutSummary) {
      setOrderHistory((prev) => [
        {
          id: orderId,
          date: new Date().toLocaleDateString('en-SG', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
          total: checkoutSummary.total,
        },
        ...prev,
      ]);
    }
  };

  const mustBuyProducts = useMemo(
    () => PRODUCTS.filter((p) => p.isFeatured).slice(0, 10),
    []
  );

  const freshMarketProducts = useMemo(() => {
    const freshCats = ['fruits-vegetables', 'dairy-chilled-eggs', 'meat-seafood'];
    const list = PRODUCTS.filter((p) =>
      freshTab === 'all' ? freshCats.includes(p.category) : p.category === freshTab
    );
    return list.slice(0, 5);
  }, [freshTab]);

  const pantryProducts = useMemo(() => {
    const pantryCats = ['rice-noodles-cooking', 'drinks', 'household', 'bakery', 'snacks-confectionery'];
    const list = PRODUCTS.filter((p) =>
      pantryTab === 'all' ? pantryCats.includes(p.category) : p.category === pantryTab
    );
    return list.slice(0, 5);
  }, [pantryTab]);

  const currentSlide = HERO_SLIDES[heroIndex];

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F6F8] text-[#1A1D23]">
      <Header
        activePage={activePage}
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onNavigate={handleNavigate}
        postalCode={postalCode}
        deliverySummary={deliverySummary}
        onOpenDelivery={() => setDeliveryModalOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenAccount={() => setAccountModalOpen(true)}
        onOpenStoreLocator={() => setStoreLocatorOpen(true)}
        onSelectProduct={(p) => setSelectedProduct(p)}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        wishlistCount={wishlist.length}
        isSignedIn={isSignedIn}
        linkpoints={linkpoints}
        isDigitalClub={isDigitalClub}
      />

      <main className="flex-1">
        {activePage === 'home' && (
          <div className="max-w-[1280px] mx-auto px-4 lg:px-6 pt-5 space-y-8">
            {/* 1. HERO PROMOTIONAL CAROUSEL */}
            <section aria-label="Featured Promotions" className="relative rounded-2xl overflow-hidden bg-[#134E4A] shadow-sm">
              <div className="relative h-[340px] sm:h-[380px] lg:h-[410px] w-full">
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                {/* Measured Scrim for Crisp WCAG AA Contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#042F2E]/95 via-[#134E4A]/80 to-[#134E4A]/15" />

                <div className="absolute inset-0 flex items-center">
                  <div className="px-6 sm:px-10 lg:px-14 max-w-[600px] text-white">
                    <div className="text-xs sm:text-sm font-bold text-[#5EEAD4] tracking-wide">
                      {currentSlide.eyebrow}
                    </div>
                    <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold leading-[1.12] tracking-tight mt-2 text-balance">
                      {currentSlide.title}
                    </h1>
                    <p className="text-sm sm:text-[15px] text-white/90 mt-3 leading-relaxed max-w-[500px]">
                      {currentSlide.subtitle}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleNavigate(currentSlide.targetView, currentSlide.targetCategory ?? null)
                        }
                        className="px-6 py-3 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white text-sm font-bold transition-colors shadow-sm"
                      >
                        {currentSlide.ctaLabel}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigate('weekly-ads', null)}
                        className="px-5 py-3 rounded-lg bg-white/15 hover:bg-white/25 backdrop-blur-xs text-white text-sm font-bold transition-colors"
                      >
                        View Weekly Ads
                      </button>
                    </div>
                  </div>
                </div>

                {/* Carousel Controls */}
                <button
                  type="button"
                  onClick={() =>
                    setHeroIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
                  }
                  aria-label="Previous promotion"
                  className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#134E4A] items-center justify-center shadow-md transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length)}
                  aria-label="Next promotion"
                  className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#134E4A] items-center justify-center shadow-md transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Pagination Indicators */}
                <div className="absolute bottom-4 left-6 sm:left-10 lg:left-14 flex items-center gap-2">
                  {HERO_SLIDES.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setHeroIndex(idx)}
                      aria-label={`Show slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all ${
                        idx === heroIndex ? 'w-7 bg-white' : 'w-2 bg-white/45 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 2. SHOP BY DEPARTMENT QUICK ICON RAIL */}
            <section aria-label="Shop by Category">
              <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {CATEGORIES.map((cat) => {
                  const Icon = CATEGORY_ICONS[cat.iconKey] || Tag;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleNavigate('category', cat.id)}
                      className="group bg-white rounded-xl border border-[#E5E8EE] hover:border-[#0F766E] p-3.5 flex flex-col items-center text-center transition-all hover:shadow-sm"
                    >
                      <div
                        className={`w-11 h-11 rounded-full ${cat.accentBg} ${cat.accentText} flex items-center justify-center mb-2 group-hover:scale-105 transition-transform`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-[#1A1D23] group-hover:text-[#0F766E] leading-tight">
                        {cat.shortName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 3. MUST BUY THIS WEEK SECTION */}
            <section aria-label="Top Picks This Week">
              <div className="flex items-end justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1D23] tracking-tight">
                    Top Picks This Week
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5A6270] mt-0.5">
                    Weekly Thursday – Wednesday price drops and bundle offers across Singapore favourites
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleNavigate('must-buy', null)}
                  className="text-xs sm:text-sm font-bold text-[#0F766E] hover:underline whitespace-nowrap shrink-0 flex items-center gap-0.5"
                >
                  <span>View all</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {mustBuyProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={cart[product.id] || 0}
                    isWishlisted={wishlist.includes(product.id)}
                    onAdd={handleAddToCart}
                    onUpdateQty={handleUpdateQty}
                    onToggleWishlist={handleToggleWishlist}
                    onOpenDetail={setSelectedProduct}
                  />
                ))}
              </div>
            </section>

            {/* 4. MID-PAGE VALUE & MEMBERSHIP STRIP (2-COLUMN) */}
            <section aria-label="Member Benefits" className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-[#E5E8EE] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-[#EA580C] flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    <span>Lane Rewards &amp; Lane Card</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-[#1A1D23]">
                    Earn &amp; Offset Lane Points on Every Cart
                  </h3>
                  <p className="text-xs text-[#5A6270] leading-relaxed max-w-sm">
                    Use promo code <strong className="text-[#1A1D23]">WELCOME5</strong> for $5 off orders $30+ or redeem 500 Lane Points directly at checkout.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAccountModalOpen(true)}
                  className="px-4 py-2.5 rounded-lg bg-[#F0FDFA] hover:bg-[#0F766E] text-[#0F766E] hover:text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0"
                >
                  View Lane Points
                </button>
              </div>

              <div className="bg-[#134E4A] text-white rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-[#5EEAD4] flex items-center gap-1.5">
                    <Truck className="w-4 h-4" />
                    <span>Pantry Lane Lane Plus</span>
                  </div>
                  <h3 className="text-lg font-extrabold">
                    Enjoy $0 Delivery Fees All Month Long
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed max-w-sm">
                    Get unlimited free delivery with zero minimum spend, 2x bonus Lane Points, and exclusive member vouchers.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleNavigate('digital-club', null)}
                  className="px-4 py-2.5 rounded-lg bg-white text-[#134E4A] hover:bg-[#F0FDFA] text-xs font-bold transition-colors whitespace-nowrap shrink-0"
                >
                  {isDigitalClub ? 'Manage Club' : 'Try 30 Days Free'}
                </button>
              </div>
            </section>

            {/* 5. FRESH MARKET SECTION WITH INTERACTIVE FILTER TABS */}
            <section aria-label="Fresh Market">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1D23] tracking-tight">
                    Fresh Market &amp; Chilled Favourites
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5A6270] mt-0.5">
                    Air-flown seafood, crisp orchard produce, and local farm eggs chilled to your doorstep
                  </p>
                </div>
                <div className="flex items-center gap-1 p-1 bg-white border border-[#E5E8EE] rounded-lg overflow-x-auto no-scrollbar">
                  {[
                    { id: 'all', label: 'All Fresh' },
                    { id: 'fruits-vegetables', label: 'Fruits & Veg' },
                    { id: 'dairy-chilled-eggs', label: 'Dairy & Eggs' },
                    { id: 'meat-seafood', label: 'Meat & Seafood' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setFreshTab(tab.id as typeof freshTab)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                        freshTab === tab.id
                          ? 'bg-[#0F766E] text-white'
                          : 'text-[#4B5563] hover:text-[#0F766E]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {freshMarketProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={cart[product.id] || 0}
                    isWishlisted={wishlist.includes(product.id)}
                    onAdd={handleAddToCart}
                    onUpdateQty={handleUpdateQty}
                    onToggleWishlist={handleToggleWishlist}
                    onOpenDetail={setSelectedProduct}
                  />
                ))}
              </div>
            </section>

            {/* 6. PANTRY, DRINKS & HOUSEHOLD ESSENTIALS */}
            <section aria-label="Pantry and Household">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1D23] tracking-tight">
                    Pantry, Drinks &amp; Everyday Household
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5A6270] mt-0.5">
                    Stock up on Thai fragrant rice, local drinks, and household value packs
                  </p>
                </div>
                <div className="flex items-center gap-1 p-1 bg-white border border-[#E5E8EE] rounded-lg overflow-x-auto no-scrollbar">
                  {[
                    { id: 'all', label: 'All Essentials' },
                    { id: 'rice-noodles-cooking', label: 'Rice & Cooking' },
                    { id: 'drinks', label: 'Drinks' },
                    { id: 'household', label: 'Household' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setPantryTab(tab.id as typeof pantryTab)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                        pantryTab === tab.id
                          ? 'bg-[#0F766E] text-white'
                          : 'text-[#4B5563] hover:text-[#0F766E]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {pantryProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={cart[product.id] || 0}
                    isWishlisted={wishlist.includes(product.id)}
                    onAdd={handleAddToCart}
                    onUpdateQty={handleUpdateQty}
                    onToggleWishlist={handleToggleWishlist}
                    onOpenDetail={setSelectedProduct}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {(activePage === 'category' ||
          activePage === 'search' ||
          activePage === 'promotions' ||
          activePage === 'must-buy' ||
          activePage === 'price-drop' ||
          activePage === 'wishlist') && (
          <CatalogView
            mode={activePage}
            categoryId={activeCategory}
            searchQuery={searchQuery}
            cart={cart}
            wishlist={wishlist}
            onAdd={handleAddToCart}
            onUpdateQty={handleUpdateQty}
            onToggleWishlist={handleToggleWishlist}
            onOpenDetail={setSelectedProduct}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'weekly-ads' && (
          <WeeklyAdsView
            cart={cart}
            wishlist={wishlist}
            onAdd={handleAddToCart}
            onUpdateQty={handleUpdateQty}
            onToggleWishlist={handleToggleWishlist}
            onOpenDetail={setSelectedProduct}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'recipes' && (
          <RecipesView
            onAddMultiple={handleAddMultiple}
            onOpenDetail={setSelectedProduct}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'digital-club' && (
          <DigitalClubView
            isDigitalClub={isDigitalClub}
            onToggleDigitalClub={() => {
              setIsDigitalClub((prev) => {
                showToast(
                  prev
                    ? 'Lane Plus trial paused'
                    : 'Lane Plus activated — $0 delivery enabled!'
                );
                return !prev;
              });
            }}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onOpenStoreLocator={() => setStoreLocatorOpen(true)}
        onOpenAccount={() => setAccountModalOpen(true)}
      />

      {/* Slide-Over Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => {
          setCart({});
          showToast('Cart cleared');
        }}
        postalCode={postalCode}
        deliverySummary={deliverySummary}
        onOpenDelivery={() => {
          setCartOpen(false);
          setDeliveryModalOpen(true);
        }}
        onProceedCheckout={(summary) => {
          setCartOpen(false);
          setCheckoutSummary(summary);
        }}
        isSignedIn={isSignedIn}
        linkpoints={linkpoints}
        isDigitalClub={isDigitalClub}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        quantity={selectedProduct ? cart[selectedProduct.id] || 0 : 0}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onClose={() => setSelectedProduct(null)}
        onAdd={handleAddToCart}
        onUpdateQty={handleUpdateQty}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Delivery & Slot Picker Modal */}
      <DeliveryModal
        open={deliveryModalOpen}
        onClose={() => setDeliveryModalOpen(false)}
        postalCode={postalCode}
        selectedSlot={selectedSlot}
        fulfillmentMode={fulfillmentMode}
        selectedOutlet={selectedOutlet}
        onSave={({ postalCode: nextCode, slot, mode, outlet }) => {
          setPostalCode(nextCode);
          setSelectedSlot(slot);
          setFulfillmentMode(mode);
          setSelectedOutlet(outlet);
          showToast(
            mode === 'delivery'
              ? `Delivery updated to S(${nextCode}) · ${slot.dayLabel} ${slot.window}`
              : `Click & Collect set to ${outlet.name}`
          );
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        open={Boolean(checkoutSummary)}
        summary={checkoutSummary}
        postalCode={postalCode}
        deliverySummary={deliverySummary}
        onClose={() => setCheckoutSummary(null)}
        onCompleteOrder={handleCompleteOrder}
      />

      {/* Store Locator Modal */}
      <StoreLocatorModal
        open={storeLocatorOpen}
        onClose={() => setStoreLocatorOpen(false)}
        onSelectCollectOutlet={(outlet) => {
          setFulfillmentMode('collect');
          setSelectedOutlet(outlet);
          setPostalCode(outlet.postalCode);
          showToast(`Click & Collect selected at ${outlet.name}`);
        }}
      />

      {/* Account & Lane Points Modal */}
      <AccountModal
        open={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
        isSignedIn={isSignedIn}
        onToggleSignIn={() => setIsSignedIn((prev) => !prev)}
        linkpoints={linkpoints}
        isDigitalClub={isDigitalClub}
        onToggleDigitalClub={() => {
          setIsDigitalClub((prev) => {
            showToast(prev ? 'Lane Plus paused' : 'Lane Plus 30-day free trial activated!');
            return !prev;
          });
        }}
        orderHistory={orderHistory}
      />

      {/* Subtle Toast Feedback */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-lg bg-[#134E4A] text-white text-xs font-bold shadow-xl flex items-center gap-2 whitespace-nowrap"
        >
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
