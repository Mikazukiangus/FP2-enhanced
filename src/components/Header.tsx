import React, { useEffect, useRef, useState } from 'react';
import {
  ChefHat,
  ClipboardList,
  MapPin,
  Search,
  ShoppingCart,
  User,
  X,
} from 'lucide-react';
import {
  Product,
  PRODUCTS,
  RecipeItem,
  RECIPES,
  TRENDING_SEARCHES,
} from '../data/catalog';

export type ActivePage =
  | 'home'
  | 'category'
  | 'search'
  | 'digital-club';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: (q: string) => void;
  onNavigate: (page: ActivePage, categoryId?: string | null) => void;
  postalCode: string;
  deliverySummary: string;
  onOpenDelivery: () => void;
  onOpenCart: () => void;
  onOpenAccount: () => void;
  onOpenShoppingList: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectRecipe: (recipe: RecipeItem) => void;
  cartCount: number;
  cartSubtotal: number;
  shoppingListNeededCount: number;
  plannedMealsCount: number;
  isSignedIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onNavigate,
  postalCode,
  deliverySummary,
  onOpenDelivery,
  onOpenCart,
  onOpenAccount,
  onOpenShoppingList,
  onSelectProduct,
  onSelectRecipe,
  cartCount,
  cartSubtotal,
  shoppingListNeededCount,
  plannedMealsCount,
  isSignedIn,
}) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const queryLower = searchQuery.trim().toLowerCase();

  const liveProducts = queryLower
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(queryLower) ||
          p.brand.toLowerCase().includes(queryLower) ||
          p.subcategory.toLowerCase().includes(queryLower)
      ).slice(0, 4)
    : [];

  const liveRecipes = queryLower
    ? RECIPES.filter(
        (r) =>
          r.title.toLowerCase().includes(queryLower) ||
          r.tagline.toLowerCase().includes(queryLower) ||
          r.tags.mainIngredient.toLowerCase().includes(queryLower)
      ).slice(0, 2)
    : [];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFocused(false);
    onSearchSubmit(searchQuery);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E5E8EE]">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between gap-3 lg:gap-8">
        {/* Zone 1: Brand Wordmark + Compact Delivery Slot Trigger */}
        <div className="flex items-center gap-3 lg:gap-4 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('home', null)}
            aria-label="Pantry Lane Online Home"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] rounded-md shrink-0"
          >
            <svg
              width="30"
              height="30"
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
            <span className="text-[20px] font-extrabold tracking-tight whitespace-nowrap">
              <span className="text-[#134E4A]">Pantry </span>
              <span className="text-[#EA580C]">Lane</span>
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenDelivery}
            className="hidden md:flex items-center gap-1.5 text-xs text-[#4B5563] hover:text-[#0F766E] transition-colors whitespace-nowrap shrink-0 pl-3 border-l border-[#E5E8EE]"
          >
            <MapPin className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
            <span className="font-semibold text-[#1A1D23] tabular-nums">{postalCode}</span>
            <span aria-hidden="true" className="text-[#9CA3AF]">·</span>
            <span className="truncate max-w-[130px]">{deliverySummary}</span>
          </button>
        </div>

        {/* Zone 2: Clean Central Rounded Search Bar */}
        <div ref={searchBoxRef} className="relative flex-1 max-w-[560px]">
          <form onSubmit={handleFormSubmit} className="relative flex items-center">
            <Search className="w-4 h-4 text-[#6B7280] absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setSearchFocused(true)}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Meiji Milk, Sea Bass, Pork Stew, or recipes..."
              aria-label="Search groceries and recipes"
              className="w-full h-10 pl-10 pr-10 rounded-full border border-[#D4D9E2] bg-[#F8FAFC] focus:bg-white focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15 outline-none text-sm text-[#1A1D23] placeholder:text-[#6B7280] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
                className="absolute right-3 p-1 text-[#6B7280] hover:text-[#1A1D23]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Unified Autocomplete (Products + Recipes) */}
          {searchFocused && (
            <div className="absolute left-0 right-0 top-[calc(100%+6px)] bg-white rounded-xl border border-[#E2E6EC] shadow-xl overflow-hidden z-50">
              {queryLower ? (
                <div className="p-3 space-y-2">
                  {liveRecipes.length > 0 && (
                    <div>
                      <div className="text-[11px] font-semibold text-[#5A6270] px-2 pb-1">
                        Meal Planner Recipes
                      </div>
                      {liveRecipes.map((rec) => (
                        <button
                          key={rec.id}
                          type="button"
                          onClick={() => {
                            setSearchFocused(false);
                            onSelectRecipe(rec);
                          }}
                          className="w-full flex items-center gap-3 p-2 hover:bg-[#F0FDFA] rounded-lg transition-colors text-left"
                        >
                          <img
                            src={rec.image}
                            alt={rec.title}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 object-cover rounded-md shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-[#1A1D23] truncate">
                              {rec.title}
                            </div>
                            <div className="text-xs text-[#5A6270] truncate">
                              {rec.prepTime} · Serves {rec.baseServings} (scalable)
                            </div>
                          </div>
                          <ChefHat className="w-4 h-4 text-[#0F766E] shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}

                  {liveProducts.length > 0 && (
                    <div className={liveRecipes.length > 0 ? 'pt-2 border-t border-[#EEF0F3]' : ''}>
                      <div className="text-[11px] font-semibold text-[#5A6270] px-2 pb-1">
                        Groceries
                      </div>
                      {liveProducts.map((item) => (
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
                            className="w-9 h-9 object-contain bg-white rounded border border-[#EEF0F3] shrink-0"
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
                  )}

                  {liveProducts.length === 0 && liveRecipes.length === 0 ? (
                    <div className="py-5 text-center text-sm text-[#5A6270]">
                      No matches for “{searchQuery}”. Try “Sea Bass”, “Milk”, or “Rice”.
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchFocused(false);
                        onSearchSubmit(searchQuery);
                      }}
                      className="w-full pt-2 border-t border-[#EEF0F3] text-xs font-semibold text-[#0F766E] hover:underline text-center py-1"
                    >
                      View all search results for “{searchQuery}”
                    </button>
                  )}
                </div>
              ) : (
                <div className="p-4">
                  <div className="text-xs font-semibold text-[#5A6270] mb-2">
                    Popular Searches
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {TRENDING_SEARCHES.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          onSearchChange(term);
                          setSearchFocused(false);
                          onSearchSubmit(term);
                        }}
                        className="px-3 py-1.5 rounded-md bg-[#F3F5F8] hover:bg-[#E6FAF6] text-xs font-medium text-[#1A1D23] hover:text-[#0F766E] transition-colors whitespace-nowrap"
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

        {/* Zone 3: Minimal User Actions (Smart List & Pantry, Cart, Account) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenShoppingList}
            aria-label="Open Smart Shopping List and Pantry"
            className="relative flex items-center gap-1.5 h-10 px-3 rounded-lg border border-[#E2E6EC] hover:border-[#0F766E] bg-white text-[#1A1D23] hover:text-[#0F766E] text-xs font-bold transition-colors whitespace-nowrap shrink-0"
          >
            <ClipboardList className="w-4 h-4 text-[#0F766E] shrink-0" />
            <span className="hidden sm:inline">My List</span>
            {(shoppingListNeededCount > 0 || plannedMealsCount > 0) && (
              <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-[#EA580C] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                {shoppingListNeededCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label="Open Shopping Cart"
            className="flex items-center gap-2 h-10 px-3.5 rounded-lg bg-[#0F766E] hover:bg-[#134E4A] text-white transition-colors whitespace-nowrap shrink-0"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-[#EA580C] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-xs sm:text-sm font-bold tabular-nums">
              ${cartSubtotal.toFixed(2)}
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenAccount}
            aria-label={isSignedIn ? 'Account: Alex Tan' : 'Sign In'}
            className="w-10 h-10 rounded-full border border-[#E2E6EC] hover:border-[#0F766E] flex items-center justify-center text-[#374151] hover:text-[#0F766E] transition-colors shrink-0"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
