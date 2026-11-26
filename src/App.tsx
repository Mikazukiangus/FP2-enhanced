import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  calculateItemTotal,
  calculateScaledPacks,
  Category,
  DEFAULT_PANTRY_PRODUCT_IDS,
  DELIVERY_SLOTS,
  DeliverySlot,
  HERO_SLIDES,
  Product,
  PRODUCTS,
  RecipeItem,
  RECIPES,
  STORE_OUTLETS,
  StoreOutlet,
  VoucherItem,
} from './data/catalog';
import { ActivePage, Header } from './components/Header';
import { TopCategoriesBar } from './components/TopCategoriesBar';
import { MealPlannerSection, PlannedMeal } from './components/MealPlannerSection';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { ShoppingListDrawer } from './components/ShoppingListDrawer';
import {
  ConsolidatedProductGrid,
  getProductsForIntent,
  VouchersPanel,
} from './components/IntentPanels';
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
} from './components/SecondaryViews';

type IntentTab = 'meal-planner' | 'promos' | 'limited-time' | 'vouchers' | 'wine-list';

const INTENT_TILES: { id: IntentTab; label: string; sublabel: string }[] = [
  { id: 'meal-planner', label: 'MEAL PLANNER', sublabel: 'Recipes & portions' },
  { id: 'promos', label: 'PROMOS', sublabel: 'Bestsellers & deals' },
  { id: 'limited-time', label: 'LIMITED TIME ONLY', sublabel: '4-day specials' },
  { id: 'vouchers', label: 'VOUCHERS', sublabel: 'Claim & save' },
  { id: 'wine-list', label: 'WINE LIST', sublabel: 'Dinner pairings' },
];

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeIntent, setActiveIntent] = useState<IntentTab>('meal-planner');
  const [searchQuery, setSearchQuery] = useState('');

  const intentSectionRef = useRef<HTMLDivElement>(null);

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

  // "What I Already Have" Pantry State
  const [pantryIds, setPantryIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fp_sg_pantry');
      return saved ? JSON.parse(saved) : DEFAULT_PANTRY_PRODUCT_IDS;
    } catch {
      return DEFAULT_PANTRY_PRODUCT_IDS;
    }
  });

  // Weekly Meal Plan State (pre-seeded with 1 popular meal so Smart Shopping List works immediately)
  const [mealPlan, setMealPlan] = useState<PlannedMeal[]>(() => {
    try {
      const saved = localStorage.getItem('fp_sg_meal_plan');
      return saved ? JSON.parse(saved) : [{ recipeId: 'rec-seabass', servings: 4 }];
    } catch {
      return [{ recipeId: 'rec-seabass', servings: 4 }];
    }
  });

  // Claimed Vouchers & Active Voucher Code
  const [claimedVouchers, setClaimedVouchers] = useState<string[]>(['WELCOME5']);
  const [activeVoucherCode, setActiveVoucherCode] = useState<string | null>(null);

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
  const [shoppingListOpen, setShoppingListOpen] = useState(false);
  const [shoppingListTab, setShoppingListTab] = useState<'list' | 'pantry' | 'saved'>('list');
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [storeLocatorOpen, setStoreLocatorOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedRecipeState, setSelectedRecipeState] = useState<{
    recipe: RecipeItem;
    servings?: number;
  } | null>(null);
  const [checkoutSummary, setCheckoutSummary] = useState<CheckoutSummary | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Adverts Carousel
  const [heroIndex, setHeroIndex] = useState(0);

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
    try {
      localStorage.setItem('fp_sg_pantry', JSON.stringify(pantryIds));
    } catch {
      // ignore storage quota
    }
  }, [pantryIds]);

  useEffect(() => {
    try {
      localStorage.setItem('fp_sg_meal_plan', JSON.stringify(mealPlan));
    } catch {
      // ignore storage quota
    }
  }, [mealPlan]);

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
    }, 2800);
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

  // Count distinct needed items across all planned meals (excluding pantry staples)
  const shoppingListNeededCount = useMemo(() => {
    const neededSet = new Set<string>();
    mealPlan.forEach((pm) => {
      const rec = RECIPES.find((r) => r.id === pm.recipeId);
      if (!rec) return;
      rec.ingredients.forEach((ing) => {
        if (!pantryIds.includes(ing.productId)) {
          const packs = calculateScaledPacks(ing.packsPerBase, rec.baseServings, pm.servings);
          if (packs > 0) neededSet.add(ing.productId);
        }
      });
    });
    return neededSet.size;
  }, [mealPlan, pantryIds]);

  const deliverySummary =
    fulfillmentMode === 'delivery'
      ? `${selectedSlot.dayLabel}, ${selectedSlot.window}`
      : `Collect: ${selectedOutlet.name.replace('Pantry Lane ', '')}`;

  const handleAddToCart = (product: Product) => {
    setCart((prev) => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }));
    showToast(`Added ${product.name} to cart`);
  };

  const handleAddItemsToCart = (items: { productId: string; qty: number }[], label: string) => {
    setCart((prev) => {
      const next = { ...prev };
      items.forEach(({ productId, qty }) => {
        next[productId] = (next[productId] || 0) + qty;
      });
      return next;
    });
    showToast(`Added ${label} to cart`);
    setCartOpen(true);
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

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      showToast(exists ? 'Removed from Saved Items' : 'Saved for quick reordering');
      return exists ? prev.filter((id) => id !== productId) : [...prev, productId];
    });
  };

  const handleTogglePantry = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    setPantryIds((prev) => {
      const exists = prev.includes(productId);
      if (product) {
        showToast(
          exists
            ? `Moved ${product.name} back to Need to Buy`
            : `Marked ${product.name} as Already Have in Pantry`
        );
      }
      return exists ? prev.filter((id) => id !== productId) : [...prev, productId];
    });
  };

  const handleToggleMealInPlan = (recipe: RecipeItem, servings: number) => {
    setMealPlan((prev) => {
      const exists = prev.some((m) => m.recipeId === recipe.id);
      if (exists) {
        showToast(`Removed "${recipe.title}" from Meal Plan`);
        return prev.filter((m) => m.recipeId !== recipe.id);
      }
      showToast(`Added "${recipe.title}" (${servings} servings) to Meal Plan`);
      return [...prev, { recipeId: recipe.id, servings }];
    });
  };

  const handleUpdateMealServings = (recipeId: string, servings: number) => {
    setMealPlan((prev) =>
      prev.map((m) => (m.recipeId === recipeId ? { ...m, servings } : m))
    );
  };

  const handleRemoveMeal = (recipeId: string) => {
    setMealPlan((prev) => prev.filter((m) => m.recipeId !== recipeId));
  };

  const handleClaimAndApplyVoucher = (voucher: VoucherItem) => {
    if (!claimedVouchers.includes(voucher.code)) {
      setClaimedVouchers((prev) => [...prev, voucher.code]);
    }
    setActiveVoucherCode(voucher.code);
    showToast(`Voucher ${voucher.code} applied to your cart`);
  };

  const handleNavigate = (page: ActivePage, categoryId: string | null = null) => {
    setActivePage(page);
    setActiveCategory(categoryId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTopCategory = (cat: Category) => {
    setActivePage('category');
    setActiveCategory(cat.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectIntent = (intent: IntentTab, scroll = false) => {
    setActivePage('home');
    setActiveCategory(null);
    setActiveIntent(intent);
    if (scroll) {
      setTimeout(() => {
        intentSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    }
  };

  const handleSearchSubmit = (q: string) => {
    setSearchQuery(q);
    if (q.trim()) {
      setActivePage('search');
      setActiveCategory(null);
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

  const currentSlide = HERO_SLIDES[heroIndex];

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F6F8] text-[#1A1D23]">
      {/* 1. STREAMLINED SINGLE-ROW HEADER */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onNavigate={handleNavigate}
        postalCode={postalCode}
        deliverySummary={deliverySummary}
        onOpenDelivery={() => setDeliveryModalOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenAccount={() => setAccountModalOpen(true)}
        onOpenShoppingList={() => {
          setShoppingListTab('list');
          setShoppingListOpen(true);
        }}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onSelectRecipe={(r) => setSelectedRecipeState({ recipe: r })}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        shoppingListNeededCount={shoppingListNeededCount}
        plannedMealsCount={mealPlan.length}
        isSignedIn={isSignedIn}
      />

      {/* 2. IMMEDIATE TOP CATEGORIES RAIL (Always Immediately Reachable) */}
      <TopCategoriesBar
        activeCategoryId={activePage === 'category' ? activeCategory : null}
        onSelectCategory={handleSelectTopCategory}
      />

      <main className="flex-1">
        {activePage === 'home' && (
          <div className="max-w-[1280px] mx-auto px-4 lg:px-6 pt-5 space-y-6">
            {/* 3. FOCUSED ADVERTS CAROUSEL BANNER (No Scattered Competing Promos) */}
            <section aria-label="Featured Adverts">
              <div className="relative rounded-2xl overflow-hidden bg-[#134E4A] h-[230px] sm:h-[275px] lg:h-[300px]">
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                {/* Crisp Contrast Scrim */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#042F2E]/92 via-[#134E4A]/78 to-[#134E4A]/20" />

                <div className="absolute inset-0 flex items-center">
                  <div className="px-6 sm:px-10 lg:px-12 max-w-[640px] text-white">
                    <div className="text-xs font-bold text-[#5EEAD4]">
                      {currentSlide.eyebrow}
                    </div>
                    <h1 className="text-xl sm:text-3xl lg:text-[34px] font-extrabold leading-[1.15] tracking-tight mt-1.5 text-balance">
                      {currentSlide.title}
                    </h1>
                    <p className="text-xs sm:text-sm text-white/90 mt-2 leading-relaxed max-w-[520px] hidden sm:block">
                      {currentSlide.subtitle}
                    </p>
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => handleSelectIntent(currentSlide.targetIntent, true)}
                        className="px-5 py-2.5 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs sm:text-sm font-bold transition-colors"
                      >
                        {currentSlide.ctaLabel}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Carousel Prev / Next */}
                <button
                  type="button"
                  onClick={() =>
                    setHeroIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
                  }
                  aria-label="Previous advert"
                  className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#134E4A] items-center justify-center shadow-sm transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length)}
                  aria-label="Next advert"
                  className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#134E4A] items-center justify-center shadow-sm transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Clean Pagination Dots Directly Below Banner */}
              <div className="flex items-center justify-center gap-2 mt-2.5">
                {HERO_SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setHeroIndex(idx)}
                    aria-label={`Show advert ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      idx === heroIndex
                        ? 'w-6 bg-[#0F766E]'
                        : 'w-2 bg-[#CBD5E1] hover:bg-[#94A3B8]'
                    }`}
                  />
                ))}
              </div>
            </section>

            {/* 4. FIVE CONSUMER-INTENT NAVIGATION TILES (Matches Wireframe Hierarchy) */}
            <section
              ref={intentSectionRef}
              aria-label="Choose Shopping Intent"
              className="scroll-mt-20"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {INTENT_TILES.map((tile) => {
                  const isActive = activeIntent === tile.id;
                  return (
                    <button
                      key={tile.id}
                      type="button"
                      onClick={() => setActiveIntent(tile.id)}
                      className={`h-[92px] sm:h-[104px] px-4 rounded-2xl border text-center flex flex-col items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] ${
                        isActive
                          ? 'bg-[#134E4A] border-[#134E4A] text-white shadow-sm'
                          : 'bg-[#E6F4F1] border-[#CBE7E1] text-[#134E4A] hover:bg-[#D5EFE9] hover:border-[#0F766E]/50'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-extrabold tracking-wide leading-tight">
                        {tile.label}
                      </span>
                      <span
                        className={`text-[11px] mt-1 font-medium ${
                          isActive ? 'text-[#99F6E4]' : 'text-[#3F6B66]'
                        }`}
                      >
                        {tile.sublabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 5. ACTIVE INTENT WORKSPACE (Meal Planner default, or Promos / Limited Time / Vouchers / Wine List) */}
            <section aria-label="Active Workspace">
              {activeIntent === 'meal-planner' && (
                <MealPlannerSection
                  mealPlan={mealPlan}
                  pantryIds={pantryIds}
                  shoppingListNeededCount={shoppingListNeededCount}
                  onToggleMealInPlan={handleToggleMealInPlan}
                  onUpdateMealServings={handleUpdateMealServings}
                  onSelectRecipe={(recipe, servings) =>
                    setSelectedRecipeState({ recipe, servings })
                  }
                  onOpenShoppingList={(tab = 'list') => {
                    setShoppingListTab(tab);
                    setShoppingListOpen(true);
                  }}
                />
              )}

              {activeIntent === 'promos' && (
                <ConsolidatedProductGrid
                  title="Weekly Promotions & Bundle Deals"
                  subtitle="Filter bestsellers, top-rated favourites, and multi-buy bundles in one clean view"
                  products={getProductsForIntent('promos')}
                  cart={cart}
                  wishlist={wishlist}
                  pantryIds={pantryIds}
                  onAdd={handleAddToCart}
                  onUpdateQty={handleUpdateQty}
                  onToggleWishlist={handleToggleWishlist}
                  onOpenDetail={setSelectedProduct}
                />
              )}

              {activeIntent === 'limited-time' && (
                <ConsolidatedProductGrid
                  title="Limited Time Only · 4-Day Specials"
                  subtitle="Fresh market price cuts valid Thursday – Sunday while stocks last"
                  products={getProductsForIntent('limited-time')}
                  cart={cart}
                  wishlist={wishlist}
                  pantryIds={pantryIds}
                  onAdd={handleAddToCart}
                  onUpdateQty={handleUpdateQty}
                  onToggleWishlist={handleToggleWishlist}
                  onOpenDetail={setSelectedProduct}
                />
              )}

              {activeIntent === 'vouchers' && (
                <VouchersPanel
                  claimedVouchers={claimedVouchers}
                  activeVoucherCode={activeVoucherCode}
                  onClaimAndApply={handleClaimAndApplyVoucher}
                />
              )}

              {activeIntent === 'wine-list' && (
                <ConsolidatedProductGrid
                  title="Curated Wine List & Zero-Proof Pairings"
                  subtitle="Hand-picked bottles and alcohol-free cuvées matched to our Meal Planner dishes"
                  products={getProductsForIntent('wine-list')}
                  cart={cart}
                  wishlist={wishlist}
                  pantryIds={pantryIds}
                  showWineFilter
                  onAdd={handleAddToCart}
                  onUpdateQty={handleUpdateQty}
                  onToggleWishlist={handleToggleWishlist}
                  onOpenDetail={setSelectedProduct}
                />
              )}
            </section>

            {/* 6. ONE CLEAN CONSOLIDATED CATALOG (Replaces 4+ Redundant Homepage Carousels) */}
            {(activeIntent === 'meal-planner' || activeIntent === 'vouchers') && (
              <section aria-label="Browse Everyday Groceries" className="pt-4 border-t border-[#E5E8EE]">
                <ConsolidatedProductGrid
                  title="Everyday Essentials"
                  subtitle="Bestsellers, top-rated picks, and dietary favourites consolidated into one filterable aisle"
                  products={PRODUCTS}
                  cart={cart}
                  wishlist={wishlist}
                  pantryIds={pantryIds}
                  defaultFilter="bestsellers"
                  onAdd={handleAddToCart}
                  onUpdateQty={handleUpdateQty}
                  onToggleWishlist={handleToggleWishlist}
                  onOpenDetail={setSelectedProduct}
                />
              </section>
            )}
          </div>
        )}

        {(activePage === 'category' || activePage === 'search') && (
          <CatalogView
            mode={activePage}
            categoryId={activeCategory}
            searchQuery={searchQuery}
            cart={cart}
            wishlist={wishlist}
            pantryIds={pantryIds}
            onAdd={handleAddToCart}
            onUpdateQty={handleUpdateQty}
            onToggleWishlist={handleToggleWishlist}
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
        onSelectIntent={(intent) => handleSelectIntent(intent, true)}
        onOpenStoreLocator={() => setStoreLocatorOpen(true)}
        onOpenAccount={() => setAccountModalOpen(true)}
      />

      {/* Smart Shopping List & Pantry Drawer */}
      <ShoppingListDrawer
        open={shoppingListOpen}
        initialTab={shoppingListTab}
        onClose={() => setShoppingListOpen(false)}
        mealPlan={mealPlan}
        pantryIds={pantryIds}
        wishlist={wishlist}
        onUpdateMealServings={handleUpdateMealServings}
        onRemoveMeal={handleRemoveMeal}
        onTogglePantry={handleTogglePantry}
        onAddItemsToCart={handleAddItemsToCart}
        onAddSingleProduct={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        onShareFeedback={showToast}
      />

      {/* Interactive Recipe Detail, Portion Control & Pantry Check Modal */}
      <RecipeDetailModal
        recipe={selectedRecipeState?.recipe ?? null}
        initialServings={selectedRecipeState?.servings}
        isPlanned={
          selectedRecipeState
            ? mealPlan.some((m) => m.recipeId === selectedRecipeState.recipe.id)
            : false
        }
        pantryIds={pantryIds}
        onClose={() => setSelectedRecipeState(null)}
        onTogglePantry={handleTogglePantry}
        onToggleMealInPlan={handleToggleMealInPlan}
        onAddItemsToCart={handleAddItemsToCart}
        onAddSingleProduct={handleAddToCart}
        onShareFeedback={showToast}
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
        externalVoucherCode={activeVoucherCode}
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

      {/* Toast Feedback */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-lg bg-[#134E4A] text-white text-xs font-bold shadow-xl flex items-center gap-2 whitespace-nowrap max-w-[92vw] truncate"
        >
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
