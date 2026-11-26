import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Heart,
  LayoutGrid,
  MapPin,
  Search,
  ShoppingCart,
  User,
  X,
  Truck,
  Store,
  HelpCircle,
} from 'lucide-react';
import { CATEGORIES, Product, PRODUCTS, TRENDING_SEARCHES } from '../data/catalog';

export type ActivePage =
  | 'home'
  | 'category'
  | 'search'
  | 'promotions'
  | 'must-buy'
  | 'price-drop'
  | 'weekly-ads'
  | 'recipes'
  | 'digital-club'
  | 'wishlist';

interface HeaderProps {
  activePage: ActivePage;
  activeCategory: string | null;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: (q: string) => void;
  onNavigate: (page: ActivePage, categoryId?: string | null) => void;
  postalCode: string;
  deliverySummary: string;
  onOpenDelivery: () => void;
  onOpenCart: () => void;
  onOpenAccount: () => void;
  onOpenStoreLocator: () => void;
  onSelectProduct: (product: Product) => void;
  cartCount: number;
  cartSubtotal: number;
  wishlistCount: number;
  isSignedIn: boolean;
  linkpoints: number;
  isDigitalClub: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  activeCategory,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onNavigate,
  postalCode,
  deliverySummary,
  onOpenDelivery,
  onOpenCart,
  onOpenAccount,
  onOpenStoreLocator,
  onSelectProduct,
  cartCount,
  cartSubtotal,
  wishlistCount,
  isSignedIn,
  linkpoints,
  isDigitalClub,
}) => {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [hoveredCatId, setHoveredCatId] = useState<string>(CATEGORIES[0].id);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const liveMatches = searchQuery.trim()
    ? PRODUCTS.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q)
        );
      }).slice(0, 5)
    : [];

  const activeHoveredCat = CATEGORIES.find((c) => c.id === hoveredCatId) || CATEGORIES[0];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFocused(false);
    onSearchSubmit(searchQuery);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_1px_3px_rgba(16,24,40,0.06)]">
      {/* Slim Top Utility Strip */}
      <div className="bg-[#134E4A] text-white text-xs">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 h-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <Truck className="w-3.5 h-3.5 text-[#5EEAD4] shrink-0" />
            <span className="truncate font-medium">
              {isDigitalClub
                ? 'Lane Plus Active — Enjoy $0 delivery fee & bonus Lane Points on your orders'
                : 'Free delivery for orders $59 & above · Weekly promotions refresh every Thursday'}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-5 shrink-0 text-white/85">
            <button
              type="button"
              onClick={onOpenStoreLocator}
              className="flex items-center gap-1 hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Store Locator</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('digital-club')}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Lane Plus
            </button>
            <button
              type="button"
              onClick={onOpenAccount}
              className="flex items-center gap-1 hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Help Centre</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="border-b border-[#E6E8EC]">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-3 flex items-center justify-between gap-3 lg:gap-6">
          {/* Brand Logo + Location Selector */}
          <div className="flex items-center gap-3 lg:gap-5 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('home', null)}
              aria-label="Pantry Lane Online Home"
              className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] rounded-md"
            >
              <svg
                width="34"
                height="34"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
                aria-hidden="true"
              >
                <rect width="36" height="36" rx="8" fill="#0F766E" />
                <path
                  d="M9 14.5C9 12.567 10.567 11 12.5 11H23.5C25.433 11 27 12.567 27 14.5V16H9V14.5Z"
                  fill="#FFFFFF"
                />
                <path
                  d="M10.5 17.5H25.5L24.1 25.2C23.85 26.55 22.67 27.5 21.3 27.5H14.7C13.33 27.5 12.15 26.55 11.9 25.2L10.5 17.5Z"
                  fill="#EA580C"
                />
                <path
                  d="M14.5 11V9.5C14.5 8.12 15.62 7 17 7H19C20.38 7 21.5 8.12 21.5 9.5V11"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
              <div className="flex flex-col leading-none text-left">
                <span className="text-[21px] font-extrabold tracking-tight whitespace-nowrap">
                  <span className="text-[#134E4A]">Pantry </span>
                  <span className="text-[#EA580C]">Lane</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-[#5A6270] uppercase mt-0.5">
                  Demo grocery store
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={onOpenDelivery}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#DCE1E8] bg-[#F8FAFC] hover:border-[#0F766E] hover:bg-[#F0FDFA]/60 transition-colors text-left"
            >
              <MapPin className="w-4 h-4 text-[#EA580C] shrink-0" />
              <div className="leading-tight">
                <div className="text-[11px] text-[#5A6270] font-medium whitespace-nowrap">
                  Deliver to <strong className="text-[#1A1D23] tabular-nums">{postalCode}</strong>
                </div>
                <div className="text-xs font-semibold text-[#0F766E] truncate max-w-[140px]">
                  {deliverySummary}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#5A6270] shrink-0" />
            </button>
          </div>

          {/* Search Bar */}
          <div ref={searchBoxRef} className="relative flex-1 max-w-[540px]">
            <form onSubmit={handleFormSubmit} className="relative flex items-center">
              <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search for milk, eggs, rice, salmon, brands..."
                aria-label="Search Pantry Lane products"
                className="w-full h-10 pl-10 pr-20 rounded-lg border border-[#D1D5DB] bg-[#F8F9FB] focus:bg-white focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 outline-none text-sm text-[#1A1D23] placeholder:text-[#6B7280] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search"
                  className="absolute right-11 p-1 text-[#6B7280] hover:text-[#1A1D23]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                aria-label="Submit search"
                className="absolute right-1 top-1 bottom-1 px-3 rounded-md bg-[#0F766E] hover:bg-[#134E4A] text-white text-xs font-semibold transition-colors"
              >
                Search
              </button>
            </form>

            {/* Instant Autocomplete Dropdown */}
            {searchFocused && (
              <div className="absolute left-0 right-0 top-[calc(100%+6px)] bg-white rounded-xl border border-[#E2E6EC] shadow-xl overflow-hidden z-50">
                {searchQuery.trim() ? (
                  <div className="p-3">
                    {liveMatches.length > 0 ? (
                      <>
                        <div className="text-xs font-semibold text-[#5A6270] px-2 pb-2">
                          Matching Products
                        </div>
                        <div className="divide-y divide-[#F1F3F5]">
                          {liveMatches.map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => {
                                setSearchFocused(false);
                                onSelectProduct(item);
                              }}
                              className="w-full flex items-center gap-3 p-2 hover:bg-[#F5F8FC] rounded-lg transition-colors text-left"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                referrerPolicy="no-referrer"
                                className="w-10 h-10 object-contain bg-white rounded border border-[#EEF0F3] shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-[#1A1D23] truncate">
                                  {item.name}
                                </div>
                                <div className="text-xs text-[#5A6270] truncate">
                                  {item.brand} · {item.packSize}
                                </div>
                              </div>
                              <div className="text-sm font-bold text-[#0F766E] tabular-nums shrink-0">
                                ${item.price.toFixed(2)}
                              </div>
                            </button>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setSearchFocused(false);
                            onSearchSubmit(searchQuery);
                          }}
                          className="w-full mt-2 pt-2 border-t border-[#EEF0F3] text-xs font-semibold text-[#0F766E] hover:underline text-center py-1.5"
                        >
                          View all results for “{searchQuery}”
                        </button>
                      </>
                    ) : (
                      <div className="py-6 text-center text-sm text-[#5A6270]">
                        No direct matches for “{searchQuery}”. Try “Milk”, “Rice”, or “Salmon”.
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="text-xs font-semibold text-[#5A6270] mb-2.5">
                      Popular Searches on Pantry Lane
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {TRENDING_SEARCHES.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => {
                            onSearchChange(term);
                            setSearchFocused(false);
                            onSearchSubmit(term);
                          }}
                          className="px-3 py-1.5 rounded-md bg-[#F3F5F8] hover:bg-[#E3F7F3] text-xs font-medium text-[#1A1D23] hover:text-[#0F766E] transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right User Actions */}
          <div className="flex items-center gap-2 lg:gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenAccount}
              className="hidden md:flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-[#F3F5F8] transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-full bg-[#E6FAF6] text-[#0F766E] flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="leading-tight">
                <div className="text-xs font-bold text-[#1A1D23] whitespace-nowrap">
                  {isSignedIn ? 'Alex Tan' : 'Sign In / Join'}
                </div>
                <div className="text-[11px] font-medium text-[#5A6270] tabular-nums whitespace-nowrap">
                  {isSignedIn ? `${linkpoints.toLocaleString()} Lane Points` : 'Earn Lane Points'}
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('wishlist')}
              aria-label="Shopping List"
              className={`relative flex items-center justify-center w-10 h-10 rounded-lg border transition-colors ${
                activePage === 'wishlist'
                  ? 'border-[#0F766E] bg-[#E6FAF6] text-[#0F766E]'
                  : 'border-[#E2E6EC] text-[#374151] hover:border-[#0F766E] hover:text-[#0F766E]'
              }`}
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#EA580C] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              aria-label="Open Shopping Cart"
              className="flex items-center gap-2.5 h-10 px-3.5 rounded-lg bg-[#0F766E] hover:bg-[#134E4A] text-white transition-colors shrink-0"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[17px] h-[17px] px-1 rounded-full bg-[#EA580C] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-sm font-bold tabular-nums whitespace-nowrap">
                ${cartSubtotal.toFixed(2)}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Category & Navigation Row */}
      <div className="bg-white border-b border-[#E6E8EC] relative" ref={megaMenuRef}>
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 h-11 flex items-center gap-1 lg:gap-6 overflow-x-auto no-scrollbar">
          {/* Categories Mega Menu Trigger */}
          <button
            type="button"
            onClick={() => setMegaMenuOpen((prev) => !prev)}
            className={`flex items-center gap-2 h-8 px-3 rounded-md text-sm font-bold transition-colors whitespace-nowrap shrink-0 ${
              megaMenuOpen
                ? 'bg-[#0F766E] text-white'
                : 'bg-[#F0FAF8] text-[#134E4A] hover:bg-[#D5F5EE]'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Categories</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-150 ${
                megaMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          <nav className="flex items-center gap-5 lg:gap-6 text-[13px] font-semibold text-[#374151]">
            <button
              type="button"
              onClick={() => {
                setMegaMenuOpen(false);
                onNavigate('promotions', null);
              }}
              className={`py-2.5 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                activePage === 'promotions'
                  ? 'border-[#0F766E] text-[#0F766E]'
                  : 'border-transparent hover:text-[#0F766E]'
              }`}
            >
              Promotions
            </button>
            <button
              type="button"
              onClick={() => {
                setMegaMenuOpen(false);
                onNavigate('must-buy', null);
              }}
              className={`py-2.5 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                activePage === 'must-buy'
                  ? 'border-[#EA580C] text-[#EA580C]'
                  : 'border-transparent text-[#C2410C] hover:text-[#EA580C]'
              }`}
            >
              Top Picks
            </button>
            <button
              type="button"
              onClick={() => {
                setMegaMenuOpen(false);
                onNavigate('weekly-ads', null);
              }}
              className={`py-2.5 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                activePage === 'weekly-ads'
                  ? 'border-[#0F766E] text-[#0F766E]'
                  : 'border-transparent hover:text-[#0F766E]'
              }`}
            >
              Weekly Ads
            </button>
            <button
              type="button"
              onClick={() => {
                setMegaMenuOpen(false);
                onNavigate('price-drop', null);
              }}
              className={`py-2.5 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                activePage === 'price-drop'
                  ? 'border-[#0F766E] text-[#0F766E]'
                  : 'border-transparent hover:text-[#0F766E]'
              }`}
            >
              Price Drop Buy Now
            </button>
            <button
              type="button"
              onClick={() => {
                setMegaMenuOpen(false);
                onNavigate('recipes', null);
              }}
              className={`py-2.5 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                activePage === 'recipes'
                  ? 'border-[#0F766E] text-[#0F766E]'
                  : 'border-transparent hover:text-[#0F766E]'
              }`}
            >
              Recipes
            </button>
            <button
              type="button"
              onClick={() => {
                setMegaMenuOpen(false);
                onNavigate('digital-club', null);
              }}
              className={`py-2.5 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                activePage === 'digital-club'
                  ? 'border-[#0F766E] text-[#0F766E]'
                  : 'border-transparent hover:text-[#0F766E]'
              }`}
            >
              Lane Plus
            </button>
          </nav>
        </div>

        {/* Full-Width Categories Mega Menu */}
        {megaMenuOpen && (
          <div className="absolute left-0 right-0 top-full bg-white border-b border-[#DCE1E8] shadow-2xl z-50">
            <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-5 grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4 border-r border-[#EEF0F3] pr-4 space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onMouseEnter={() => setHoveredCatId(cat.id)}
                    onClick={() => {
                      setMegaMenuOpen(false);
                      onNavigate('category', cat.id);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                      hoveredCatId === cat.id || activeCategory === cat.id
                        ? 'bg-[#F0FDFA] text-[#0F766E] font-semibold'
                        : 'text-[#374151] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-60 shrink-0" />
                  </button>
                ))}
              </div>

              <div className="md:col-span-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#EEF0F3]">
                    <h3 className="text-base font-bold text-[#1A1D23]">{activeHoveredCat.name}</h3>
                    <button
                      type="button"
                      onClick={() => {
                        setMegaMenuOpen(false);
                        onNavigate('category', activeHoveredCat.id);
                      }}
                      className="text-xs font-semibold text-[#0F766E] hover:underline"
                    >
                      View all in {activeHoveredCat.shortName}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
                    {activeHoveredCat.subcategories.map((sub) => (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => {
                          setMegaMenuOpen(false);
                          onNavigate('category', activeHoveredCat.id);
                        }}
                        className="text-left px-3 py-2 rounded-lg text-sm text-[#374151] hover:bg-[#F5F8FC] hover:text-[#0F766E] transition-colors"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Featured Products inside Mega Menu */}
                <div className="bg-[#F8FAFC] rounded-xl p-3.5 border border-[#EDF0F4]">
                  <div className="text-xs font-semibold text-[#5A6270] mb-2.5">
                    Popular in {activeHoveredCat.shortName}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PRODUCTS.filter((p) => p.category === activeHoveredCat.id)
                      .slice(0, 2)
                      .map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setMegaMenuOpen(false);
                            onSelectProduct(item);
                          }}
                          className="flex items-center gap-3 p-2 bg-white rounded-lg border border-[#E6E8EC] hover:border-[#0F766E] transition-colors text-left"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 object-contain shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-[#1A1D23] truncate">
                              {item.name}
                            </div>
                            <div className="text-xs font-bold text-[#0F766E] tabular-nums mt-0.5">
                              ${item.price.toFixed(2)}
                              {item.originalPrice && (
                                <span className="text-[11px] font-normal text-[#8A94A6] line-through ml-1.5">
                                  ${item.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
