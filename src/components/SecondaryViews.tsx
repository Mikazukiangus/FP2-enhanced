import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Award,
  Check,
  Filter,
  SlidersHorizontal,
  Sparkles,
  Truck,
} from 'lucide-react';
import {
  CATEGORIES,
  Product,
  PRODUCTS,
  TOP_CATEGORIES,
} from '../data/catalog';
import { ProductCard } from './ProductCard';
import { ActivePage } from './Header';

interface CatalogViewProps {
  mode: 'category' | 'search';
  categoryId: string | null;
  searchQuery: string;
  cart: Record<string, number>;
  wishlist: string[];
  pantryIds: string[];
  onAdd: (product: Product) => void;
  onUpdateQty: (productId: string, delta: number) => void;
  onToggleWishlist: (productId: string) => void;
  onOpenDetail: (product: Product) => void;
  onNavigate: (page: ActivePage, categoryId?: string | null) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  mode,
  categoryId,
  searchQuery,
  cart,
  wishlist,
  pantryIds,
  onAdd,
  onUpdateQty,
  onToggleWishlist,
  onOpenDetail,
  onNavigate,
}) => {
  const [highlightFilter, setHighlightFilter] = useState<
    'all' | 'bestsellers' | 'top-rated' | 'recommended' | 'bundles'
  >('all');
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [promoOnly, setPromoOnly] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'price-asc' | 'price-desc' | 'savings'>('relevance');

  const activeCategoryObj = TOP_CATEGORIES.find((c) => c.id === categoryId) || null;

  const baseProducts = useMemo(() => {
    let list = [...PRODUCTS];
    if (mode === 'category' && activeCategoryObj) {
      if (activeCategoryObj.filterType === 'dietary' && activeCategoryObj.dietaryTag) {
        list = list.filter((p) => p.dietary.includes(activeCategoryObj.dietaryTag!));
      } else {
        list = list.filter((p) => p.category === activeCategoryObj.id);
      }
    } else if (mode === 'search' && searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [mode, activeCategoryObj, searchQuery]);

  const brands = useMemo(() => {
    return Array.from(new Set(baseProducts.map((p) => p.brand))).sort();
  }, [baseProducts]);

  const filteredProducts = useMemo(() => {
    let list = [...baseProducts];

    if (highlightFilter === 'bestsellers') {
      list = list.filter((p) => p.isBestseller);
    } else if (highlightFilter === 'top-rated') {
      list = list.filter((p) => p.rating >= 4.9);
    } else if (highlightFilter === 'recommended') {
      list = list.filter((p) => p.isRecommended);
    } else if (highlightFilter === 'bundles') {
      list = list.filter((p) => Boolean(p.bundle));
    }

    if (selectedBrand !== 'ALL') {
      list = list.filter((p) => p.brand === selectedBrand);
    }
    if (promoOnly) {
      list = list.filter((p) => Boolean(p.originalPrice || p.bundle));
    }
    if (selectedDietary.length > 0) {
      list = list.filter((p) => selectedDietary.every((d) => p.dietary.includes(d as never)));
    }
    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    } else if (sortBy === 'price-asc') {
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
  }, [baseProducts, highlightFilter, selectedBrand, promoOnly, selectedDietary, sortBy]);

  const toggleDietary = (tag: string) => {
    setSelectedDietary((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const pageTitle =
    mode === 'category' && activeCategoryObj
      ? activeCategoryObj.name
      : `Search Results for “${searchQuery}”`;

  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-5">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Filter Sidebar */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-xl border border-[#E5E8EE] p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-[#1A1D23] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#0F766E]" />
                <span>Refine Results</span>
              </h2>
              {(selectedDietary.length > 0 || promoOnly || selectedBrand !== 'ALL' || highlightFilter !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setHighlightFilter('all');
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
              <h3 className="text-xs font-bold text-[#5A6270] mb-2">
                Aisles
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
            <div className="pt-3 border-t border-[#EEF0F3]">
              <h3 className="text-xs font-bold text-[#5A6270] mb-2">
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
            <div className="pt-3 border-t border-[#EEF0F3]">
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
              <div className="pt-3 border-t border-[#EEF0F3]">
                <h3 className="text-xs font-bold text-[#5A6270] mb-2">
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
        <div className="lg:col-span-9 space-y-4">
          <div className="bg-white rounded-xl border border-[#E5E8EE] p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-extrabold text-[#1A1D23]">{pageTitle}</h1>
                <p className="text-xs text-[#5A6270] mt-0.5 tabular-nums">
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-[#5A6270]" />
                <select
                  aria-label="Sort products"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="h-9 px-2.5 rounded-lg border border-[#D1D5DB] text-xs font-semibold text-[#1A1D23] bg-white outline-none focus:border-[#0F766E]"
                >
                  <option value="relevance">Sort: Relevance</option>
                  <option value="rating">Sort: Top Rated</option>
                  <option value="price-asc">Sort: Price Low to High</option>
                  <option value="price-desc">Sort: Price High to Low</option>
                  <option value="savings">Sort: Biggest Savings</option>
                </select>
              </div>
            </div>

            {/* Consolidated Highlight Filters (Bestsellers, Top Rated, Recommended, Bundles) */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {[
                { id: 'all', label: 'All' },
                { id: 'bestsellers', label: 'Bestsellers' },
                { id: 'top-rated', label: 'Top Rated' },
                { id: 'recommended', label: 'Recommended' },
                { id: 'bundles', label: 'Bundle Deals' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setHighlightFilter(btn.id as typeof highlightFilter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                    highlightFilter === btn.id
                      ? 'bg-[#0F766E] text-white'
                      : 'bg-[#F3F5F8] text-[#374151] hover:bg-[#E6FAF6] hover:text-[#0F766E]'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl border border-[#E5E8EE] p-10 text-center">
              <h3 className="text-base font-bold text-[#1A1D23]">
                No matching products found
              </h3>
              <p className="text-sm text-[#5A6270] mt-1">
                Try clearing your active filters or browsing another aisle.
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
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3.5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={cart[product.id] || 0}
                  isWishlisted={wishlist.includes(product.id)}
                  inPantry={pantryIds.includes(product.id)}
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

/* DIGITAL CLUB & LANE REWARDS VIEW */
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
          <div className="text-xs font-bold text-[#5EEAD4]">
            Pantry Lane · Lane Plus Membership
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold mt-2 leading-tight text-balance">
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
              onClick={() => onNavigate('home', null)}
              className="px-5 py-3 rounded-lg bg-white/15 hover:bg-white/25 text-white text-sm font-bold transition-colors"
            >
              Back to Meal Planner
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
