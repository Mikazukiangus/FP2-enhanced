import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Award,
  Check,
  ChefHat,
  Clock,
  Filter,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Tag,
  Truck,
  Users,
} from 'lucide-react';
import {
  CATEGORIES,
  Product,
  PRODUCTS,
  RECIPES,
} from '../data/catalog';
import { ProductCard } from './ProductCard';
import { ActivePage } from './Header';

interface CommonViewProps {
  cart: Record<string, number>;
  wishlist: string[];
  onAdd: (product: Product) => void;
  onUpdateQty: (productId: string, delta: number) => void;
  onToggleWishlist: (productId: string) => void;
  onOpenDetail: (product: Product) => void;
  onNavigate: (page: ActivePage, categoryId?: string | null) => void;
}

/* 1. CATALOG / SEARCH / CATEGORY / PROMOTIONS / WISHLIST VIEW */
interface CatalogViewProps extends CommonViewProps {
  mode: 'category' | 'search' | 'promotions' | 'must-buy' | 'price-drop' | 'wishlist';
  categoryId: string | null;
  searchQuery: string;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  mode,
  categoryId,
  searchQuery,
  cart,
  wishlist,
  onAdd,
  onUpdateQty,
  onToggleWishlist,
  onOpenDetail,
  onNavigate,
}) => {
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [promoOnly, setPromoOnly] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'savings'>('relevance');

  const activeCategoryObj = CATEGORIES.find((c) => c.id === categoryId) || null;

  const baseProducts = useMemo(() => {
    let list = [...PRODUCTS];
    if (mode === 'category' && categoryId) {
      list = list.filter((p) => p.category === categoryId);
    } else if (mode === 'search' && searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    } else if (mode === 'promotions') {
      list = list.filter((p) => Boolean(p.promoTag || p.originalPrice || p.bundle));
    } else if (mode === 'must-buy') {
      list = list.filter((p) => p.promoType === 'must-buy' || p.weeklyAdGroup === 'must-buy');
    } else if (mode === 'price-drop') {
      list = list.filter((p) => p.promoType === 'price-drop' || Boolean(p.originalPrice));
    } else if (mode === 'wishlist') {
      list = list.filter((p) => wishlist.includes(p.id));
    }
    return list;
  }, [mode, categoryId, searchQuery, wishlist]);

  const brands = useMemo(() => {
    return Array.from(new Set(baseProducts.map((p) => p.brand))).sort();
  }, [baseProducts]);

  const filteredProducts = useMemo(() => {
    let list = [...baseProducts];
    if (selectedBrand !== 'ALL') {
      list = list.filter((p) => p.brand === selectedBrand);
    }
    if (promoOnly) {
      list = list.filter((p) => Boolean(p.originalPrice || p.bundle));
    }
    if (selectedDietary.length > 0) {
      list = list.filter((p) => selectedDietary.every((d) => p.dietary.includes(d as never)));
    }
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'savings') {
      list.sort((a, b) => {
        const sa = (a.originalPrice ?? a.price) - a.price;
        const sb = (b.originalPrice ?? b.price) - b.price;
        return sb - sa;
      });
    }
    return list;
  }, [baseProducts, selectedBrand, promoOnly, selectedDietary, sortBy]);

  const toggleDietary = (tag: string) => {
    setSelectedDietary((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const pageTitle =
    mode === 'category' && activeCategoryObj
      ? activeCategoryObj.name
      : mode === 'search'
      ? `Search Results for “${searchQuery}”`
      : mode === 'must-buy'
      ? 'Top Picks This Week'
      : mode === 'price-drop'
      ? 'Price Drop Buy Now'
      : mode === 'wishlist'
      ? 'My Shopping List'
      : 'All Promotions & Bundle Deals';

  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#5A6270] mb-4">
        <button
          type="button"
          onClick={() => onNavigate('home', null)}
          className="flex items-center gap-1 hover:text-[#0F766E] font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <span aria-hidden="true">/</span>
        <span className="font-semibold text-[#1A1D23]">{pageTitle}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Filter Sidebar */}
        <aside className="lg:col-span-3 space-y-5">
          <div className="bg-white rounded-xl border border-[#E5E8EE] p-4 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-[#1A1D23] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#0F766E]" />
                <span>Filter Products</span>
              </h2>
              {(selectedDietary.length > 0 || promoOnly || selectedBrand !== 'ALL') && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDietary([]);
                    setPromoOnly(false);
                    setSelectedBrand('ALL');
                  }}
                  className="text-xs font-semibold text-[#0F766E] hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Departments */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A6270] mb-2">
                Departments
              </h3>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onNavigate('category', cat.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      categoryId === cat.id && mode === 'category'
                        ? 'bg-[#F0FDFA] text-[#0F766E] font-bold'
                        : 'text-[#374151] hover:bg-[#F5F7FA]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Preferences */}
            <div className="pt-4 border-t border-[#EEF0F3]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A6270] mb-2">
                Dietary &amp; Lifestyle
              </h3>
              <div className="space-y-2">
                {['Halal', 'Healthier Choice', 'Vegetarian', 'Housebrand', 'Organic'].map((tag) => (
                  <label key={tag} className="flex items-center gap-2 text-xs text-[#374151] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedDietary.includes(tag)}
                      onChange={() => toggleDietary(tag)}
                      className="w-3.5 h-3.5 accent-[#0F766E]"
                    />
                    <span>{tag}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Promotions Toggle */}
            <div className="pt-4 border-t border-[#EEF0F3]">
              <label className="flex items-center justify-between text-xs font-semibold text-[#1A1D23] cursor-pointer">
                <span>On Promotion Only</span>
                <input
                  type="checkbox"
                  checked={promoOnly}
                  onChange={(e) => setPromoOnly(e.target.checked)}
                  className="w-4 h-4 accent-[#0F766E]"
                />
              </label>
            </div>

            {/* Brand Filter */}
            {brands.length > 1 && (
              <div className="pt-4 border-t border-[#EEF0F3]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A6270] mb-2">
                  Brand
                </h3>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full h-9 px-2.5 rounded-lg border border-[#D1D5DB] text-xs bg-white outline-none focus:border-[#0F766E]"
                >
                  <option value="ALL">All Brands</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </aside>

        {/* Main Results Grid */}
        <div className="lg:col-span-9">
          <div className="bg-white rounded-xl border border-[#E5E8EE] px-4 py-3.5 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-extrabold text-[#1A1D23]">{pageTitle}</h1>
              <p className="text-xs text-[#5A6270] mt-0.5 tabular-nums">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-[#5A6270]" />
              <label htmlFor="sort-select" className="text-xs font-semibold text-[#5A6270]">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="h-9 px-2.5 rounded-lg border border-[#D1D5DB] text-xs font-semibold text-[#1A1D23] bg-white outline-none focus:border-[#0F766E]"
              >
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="savings">Biggest Savings</option>
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl border border-[#E5E8EE] p-12 text-center">
              <h3 className="text-base font-bold text-[#1A1D23]">
                {mode === 'wishlist' ? 'Your shopping list is empty' : 'No matching products found'}
              </h3>
              <p className="text-sm text-[#5A6270] mt-1">
                {mode === 'wishlist'
                  ? 'Tap the heart icon on any grocery item to save it here for quick reordering.'
                  : 'Try clearing your active filters or browsing another department.'}
              </p>
              <button
                type="button"
                onClick={() => onNavigate('home', null)}
                className="mt-4 px-5 py-2.5 rounded-lg bg-[#0F766E] hover:bg-[#134E4A] text-white text-xs font-bold"
              >
                Back to Homepage
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={cart[product.id] || 0}
                  isWishlisted={wishlist.includes(product.id)}
                  onAdd={onAdd}
                  onUpdateQty={onUpdateQty}
                  onToggleWishlist={onToggleWishlist}
                  onOpenDetail={onOpenDetail}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* 2. WEEKLY ADS / DIGITAL CATALOGUE VIEW */
export const WeeklyAdsView: React.FC<CommonViewProps> = ({
  cart,
  wishlist,
  onAdd,
  onUpdateQty,
  onToggleWishlist,
  onOpenDetail,
  onNavigate,
}) => {
  const [tab, setTab] = useState<'must-buy' | 'weekly-savers' | 'fresh-buys' | '4-day-specials'>('must-buy');

  const tabs = [
    { id: 'must-buy', label: 'Top Picks', desc: 'Hero weekly discounts across family essentials' },
    { id: 'weekly-savers', label: 'Weekly Savers', desc: 'Multi-buy bundles & everyday household value' },
    { id: 'fresh-buys', label: 'Fresh Buys', desc: 'Farm-fresh fruits, vegetables & chilled eggs' },
    { id: '4-day-specials', label: '4-Day Specials', desc: 'Limited Thursday – Sunday price cuts' },
  ] as const;

  const activeMeta = tabs.find((t) => t.id === tab)!;
  const items = PRODUCTS.filter((p) => p.weeklyAdGroup === tab);

  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
      <div className="flex items-center gap-2 text-xs text-[#5A6270] mb-4">
        <button
          type="button"
          onClick={() => onNavigate('home', null)}
          className="flex items-center gap-1 hover:text-[#0F766E] font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <span aria-hidden="true">/</span>
        <span className="font-semibold text-[#1A1D23]">Weekly Ads &amp; Digital Catalogue</span>
      </div>

      <div className="bg-gradient-to-r from-[#134E4A] to-[#0F766E] rounded-2xl p-6 lg:p-8 text-white mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#99F6E4]">
          <Tag className="w-4 h-4" />
          <span>Valid Thursday – Wednesday · In-Store &amp; Online</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold mt-2">
          Pantry Lane Weekly Promotions Catalogue
        </h1>
        <p className="text-sm text-white/85 mt-1.5 max-w-2xl">
          Browse this week’s Top Picks deals, Fresh Buys, Weekly Savers, and 4-Day Neighbourhood Specials. Add items directly to your delivery trolley.
        </p>

        <div className="flex flex-wrap gap-2 mt-5">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                tab === t.id
                  ? 'bg-white text-[#134E4A]'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-[#1A1D23]">{activeMeta.label}</h2>
          <p className="text-xs text-[#5A6270]">{activeMeta.desc}</p>
        </div>
        <span className="text-xs font-semibold text-[#5A6270] tabular-nums">
          {items.length} deals available
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={cart[product.id] || 0}
            isWishlisted={wishlist.includes(product.id)}
            onAdd={onAdd}
            onUpdateQty={onUpdateQty}
            onToggleWishlist={onToggleWishlist}
            onOpenDetail={onOpenDetail}
          />
        ))}
      </div>
    </div>
  );
};

/* 3. RECIPES VIEW (ADD ALL INGREDIENTS TO CART) */
interface RecipesViewProps {
  onAddMultiple: (productIds: string[]) => void;
  onOpenDetail: (product: Product) => void;
  onNavigate: (page: ActivePage, categoryId?: string | null) => void;
}

export const RecipesView: React.FC<RecipesViewProps> = ({
  onAddMultiple,
  onOpenDetail,
  onNavigate,
}) => {
  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
      <div className="flex items-center gap-2 text-xs text-[#5A6270] mb-4">
        <button
          type="button"
          onClick={() => onNavigate('home', null)}
          className="flex items-center gap-1 hover:text-[#0F766E] font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <span aria-hidden="true">/</span>
        <span className="font-semibold text-[#1A1D23]">Recipes &amp; Meal Inspiration</span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[#1A1D23] flex items-center gap-2.5">
          <ChefHat className="w-6 h-6 text-[#EA580C]" />
          <span>Singapore Home Cooking Recipes</span>
        </h1>
        <p className="text-sm text-[#5A6270] mt-1">
          Shop every fresh ingredient straight into your Pantry Lane cart in one click.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {RECIPES.map((recipe) => {
          const ingredients = recipe.productIds
            .map((id) => PRODUCTS.find((p) => p.id === id))
            .filter(Boolean) as Product[];
          const bundleTotal = ingredients.reduce((sum, item) => sum + item.price, 0);

          return (
            <article
              key={recipe.id}
              className="bg-white rounded-2xl border border-[#E5E8EE] overflow-hidden flex flex-col"
            >
              <div className="h-48 bg-[#F8FAFC] p-5 flex items-center justify-center border-b border-[#EEF0F3]">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  referrerPolicy="no-referrer"
                  className="h-full object-contain"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-3 text-xs text-[#5A6270]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {recipe.prepTime}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {recipe.servings}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{recipe.difficulty}</span>
                </div>

                <h2 className="text-base font-extrabold text-[#1A1D23] mt-2 leading-snug">
                  {recipe.title}
                </h2>
                <p className="text-xs text-[#5A6270] mt-1.5 leading-relaxed">
                  {recipe.description}
                </p>

                <div className="mt-4 pt-3 border-t border-[#EEF0F3] space-y-2">
                  <div className="text-xs font-bold text-[#1A1D23]">
                    Key Ingredients ({ingredients.length})
                  </div>
                  {ingredients.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onOpenDetail(item)}
                      className="w-full flex items-center justify-between gap-2 text-xs hover:text-[#0F766E] text-left"
                    >
                      <span className="truncate text-[#374151]">{item.name}</span>
                      <span className="font-bold text-[#1A1D23] tabular-nums shrink-0">
                        ${item.price.toFixed(2)}
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => onAddMultiple(recipe.productIds)}
                  className="mt-auto pt-4"
                >
                  <span className="w-full h-10 rounded-lg bg-[#0F766E] hover:bg-[#134E4A] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add All Ingredients (${bundleTotal.toFixed(2)})</span>
                  </span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

/* 4. DIGITAL CLUB & LINK REWARDS VIEW */
interface DigitalClubViewProps {
  isDigitalClub: boolean;
  onToggleDigitalClub: () => void;
  onNavigate: (page: ActivePage, categoryId?: string | null) => void;
}

export const DigitalClubView: React.FC<DigitalClubViewProps> = ({
  isDigitalClub,
  onToggleDigitalClub,
  onNavigate,
}) => {
  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
      <div className="flex items-center gap-2 text-xs text-[#5A6270] mb-4">
        <button
          type="button"
          onClick={() => onNavigate('home', null)}
          className="flex items-center gap-1 hover:text-[#0F766E] font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <span aria-hidden="true">/</span>
        <span className="font-semibold text-[#1A1D23]">Lane Plus &amp; Lane Rewards</span>
      </div>

      <div className="bg-gradient-to-br from-[#134E4A] via-[#0F766E] to-[#0F766E] rounded-2xl p-8 lg:p-10 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <div className="text-xs font-bold uppercase tracking-wider text-[#5EEAD4]">
            Pantry Lane Lane Plus
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold mt-2 leading-tight">
            Unlimited $0 Delivery &amp; 2x Lane Points Every Month
          </h1>
          <p className="text-sm text-white/85 mt-3 max-w-xl leading-relaxed">
            Save more every time you shop groceries online. Enjoy free delivery on all orders with no minimum spend, bonus Lane Points, and member-only monthly vouchers from $9.99/month.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onToggleDigitalClub}
              className={`px-6 py-3 rounded-lg text-sm font-bold transition-colors ${
                isDigitalClub
                  ? 'bg-[#ECFDF3] text-[#15803D]'
                  : 'bg-[#EA580C] hover:bg-[#C2410C] text-white'
              }`}
            >
              {isDigitalClub ? 'Lane Plus Active (Click to Manage)' : 'Start 30-Day Free Trial'}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('must-buy', null)}
              className="px-5 py-3 rounded-lg bg-white/15 hover:bg-white/25 text-white text-sm font-bold transition-colors"
            >
              Shop Member Deals
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white text-[#1A1D23] rounded-xl p-6 space-y-4 shadow-xl">
          <h2 className="text-base font-extrabold">Included Member Perks</h2>
          <ul className="space-y-3 text-sm">
            {[
              { icon: Truck, title: '$0 Delivery Fee', sub: 'Unlimited free delivery on every grocery order' },
              { icon: Award, title: '2x Bonus Lane Points', sub: 'Earn double Lane Points on Pantry Lane Online' },
              { icon: Sparkles, title: 'Exclusive Monthly Vouchers', sub: 'Up to $24 in bonus monthly store & online vouchers' },
            ].map((perk) => (
              <li key={perk.title} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F0FDFA] text-[#0F766E] flex items-center justify-center shrink-0">
                  <perk.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-[#1A1D23]">{perk.title}</div>
                  <div className="text-xs text-[#5A6270]">{perk.sub}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="pt-3 border-t border-[#EEF0F3] flex items-center gap-2 text-xs text-[#15803D] font-semibold">
            <Check className="w-4 h-4" />
            <span>Cancel anytime with zero lock-in fees</span>
          </div>
        </div>
      </div>
    </div>
  );
};
