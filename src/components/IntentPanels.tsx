import React, { useMemo, useState } from 'react';
import { Check, SlidersHorizontal, Ticket, Wine } from 'lucide-react';
import { Product, PRODUCTS, VOUCHERS, VoucherItem } from '../data/catalog';
import { ProductCard } from './ProductCard';

export type ConsolidatedHighlightFilter =
  | 'all'
  | 'bestsellers'
  | 'top-rated'
  | 'recommended'
  | 'bundles'
  | 'halal'
  | 'organic'
  | 'healthier';

interface ConsolidatedProductGridProps {
  title: string;
  subtitle: string;
  products: Product[];
  cart: Record<string, number>;
  wishlist: string[];
  pantryIds: string[];
  defaultFilter?: ConsolidatedHighlightFilter;
  showWineFilter?: boolean;
  onAdd: (product: Product) => void;
  onUpdateQty: (productId: string, delta: number) => void;
  onToggleWishlist: (productId: string) => void;
  onOpenDetail: (product: Product) => void;
}

export const ConsolidatedProductGrid: React.FC<ConsolidatedProductGridProps> = ({
  title,
  subtitle,
  products,
  cart,
  wishlist,
  pantryIds,
  defaultFilter = 'all',
  showWineFilter = false,
  onAdd,
  onUpdateQty,
  onToggleWishlist,
  onOpenDetail,
}) => {
  const [activeFilter, setActiveFilter] = useState<ConsolidatedHighlightFilter>(defaultFilter);
  const [wineStyle, setWineStyle] = useState<'all' | 'White Wine' | 'Red Wine' | 'Zero-Proof'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'price-asc' | 'savings'>('featured');

  const filterButtons: { id: ConsolidatedHighlightFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'bestsellers', label: 'Bestsellers' },
    { id: 'top-rated', label: 'Top Rated' },
    { id: 'recommended', label: 'Recommended' },
    { id: 'bundles', label: 'Bundles' },
    { id: 'halal', label: 'Halal' },
    { id: 'organic', label: 'Organic' },
    { id: 'healthier', label: 'Healthier Choice' },
  ];

  const filtered = useMemo(() => {
    let list = [...products];

    if (showWineFilter && wineStyle !== 'all') {
      list = list.filter((p) => p.subcategory === wineStyle);
    }

    if (activeFilter === 'bestsellers') {
      list = list.filter((p) => p.isBestseller);
    } else if (activeFilter === 'top-rated') {
      list = list.filter((p) => p.rating >= 4.9);
    } else if (activeFilter === 'recommended') {
      list = list.filter((p) => p.isRecommended);
    } else if (activeFilter === 'bundles') {
      list = list.filter((p) => Boolean(p.bundle));
    } else if (activeFilter === 'halal') {
      list = list.filter((p) => p.dietary.includes('Halal'));
    } else if (activeFilter === 'organic') {
      list = list.filter((p) => p.dietary.includes('Organic'));
    } else if (activeFilter === 'healthier') {
      list = list.filter((p) => p.dietary.includes('Healthier Choice'));
    }

    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    } else if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'savings') {
      list.sort((a, b) => {
        const sa = (a.originalPrice ?? a.price) - a.price;
        const sb = (b.originalPrice ?? b.price) - b.price;
        return sb - sa;
      });
    }

    return list;
  }, [products, activeFilter, wineStyle, showWineFilter, sortBy]);

  return (
    <div className="space-y-4">
      {/* Header + Consolidated Single-Line Filter & Sort Bar */}
      <div className="bg-white rounded-xl border border-[#E5E8EE] p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-extrabold text-[#1A1D23] tracking-tight flex items-center gap-2">
              {showWineFilter && <Wine className="w-4 h-4 text-[#9F1239]" />}
              <span>{title}</span>
            </h2>
            <p className="text-xs text-[#5A6270] mt-0.5">{subtitle}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-[#5A6270] tabular-nums hidden sm:inline">
              {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
            </span>
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#5A6270]" />
              <select
                aria-label="Sort products"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="h-8 px-2.5 rounded-lg border border-[#D4D9E2] text-xs font-semibold text-[#1A1D23] bg-white outline-none focus:border-[#0F766E]"
              >
                <option value="featured">Sort: Featured</option>
                <option value="rating">Sort: Top Rated</option>
                <option value="price-asc">Sort: Price Low–High</option>
                <option value="savings">Sort: Biggest Savings</option>
              </select>
            </div>
          </div>
        </div>

        {/* Consolidated Filter Controls (Replaces Separate Bestsellers/Top Rated/Recommended Carousels) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {showWineFilter ? (
            (['all', 'White Wine', 'Red Wine', 'Zero-Proof'] as const).map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => setWineStyle(style)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                  wineStyle === style
                    ? 'bg-[#0F766E] text-white'
                    : 'bg-[#F3F5F8] text-[#374151] hover:bg-[#E6FAF6] hover:text-[#0F766E]'
                }`}
              >
                {style === 'all' ? 'All Pairings' : style}
              </button>
            ))
          ) : (
            filterButtons.map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setActiveFilter(btn.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                  activeFilter === btn.id
                    ? 'bg-[#0F766E] text-white'
                    : 'bg-[#F3F5F8] text-[#374151] hover:bg-[#E6FAF6] hover:text-[#0F766E]'
                }`}
              >
                {btn.label}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Compact High-Density Product Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E5E8EE] p-10 text-center">
          <p className="text-sm font-bold text-[#1A1D23]">
            No items match this filter right now.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveFilter('all');
              setWineStyle('all');
            }}
            className="mt-3 px-4 py-2 rounded-lg bg-[#0F766E] text-white text-xs font-bold"
          >
            Show All Items
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {filtered.map((product) => (
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
  );
};

/* INTERACTIVE VOUCHERS PANEL */
interface VouchersPanelProps {
  claimedVouchers: string[];
  activeVoucherCode: string | null;
  onClaimAndApply: (voucher: VoucherItem) => void;
}

export const VouchersPanel: React.FC<VouchersPanelProps> = ({
  claimedVouchers,
  activeVoucherCode,
  onClaimAndApply,
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-[#E5E8EE] px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-extrabold text-[#1A1D23] flex items-center gap-2">
            <Ticket className="w-5 h-5 text-[#EA580C]" />
            <span>Active Online Vouchers</span>
          </h2>
          <p className="text-xs text-[#5A6270] mt-0.5">
            Claim any voucher below to apply it automatically in your shopping cart.
          </p>
        </div>
        <span className="text-xs font-semibold text-[#0F766E] tabular-nums">
          {claimedVouchers.length} of {VOUCHERS.length} claimed
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {VOUCHERS.map((voucher) => {
          const isApplied = activeVoucherCode === voucher.code;
          const isClaimed = claimedVouchers.includes(voucher.code);

          return (
            <div
              key={voucher.code}
              className={`bg-white rounded-xl border p-4 flex flex-col justify-between gap-4 transition-all ${
                isApplied
                  ? 'border-[#0F766E] ring-1 ring-[#0F766E]/20'
                  : 'border-[#E5E8EE] hover:border-[#0F766E]/45'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-[11px] font-bold">
                  <span className="text-[#EA580C]">{voucher.categoryNote}</span>
                  <span className="text-[#6B7280]">{voucher.validUntil}</span>
                </div>
                <h3 className="text-base font-extrabold text-[#134E4A] mt-1.5">
                  {voucher.title}
                </h3>
                <p className="text-xs text-[#5A6270] mt-1 leading-relaxed">
                  {voucher.description}
                </p>
              </div>

              <div className="pt-3 border-t border-dashed border-[#D4D9E2] flex items-center justify-between gap-3">
                <div className="text-xs">
                  <span className="text-[#6B7280]">Code: </span>
                  <strong className="font-mono text-[#1A1D23]">{voucher.code}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => onClaimAndApply(voucher)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                    isApplied
                      ? 'bg-[#ECFDF3] text-[#15803D]'
                      : 'bg-[#0F766E] hover:bg-[#134E4A] text-white'
                  }`}
                >
                  {isApplied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Applied to Cart</span>
                    </>
                  ) : isClaimed ? (
                    <span>Apply Now</span>
                  ) : (
                    <span>Claim &amp; Apply</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export function getProductsForIntent(
  intent: 'promos' | 'limited-time' | 'wine-list'
): Product[] {
  if (intent === 'wine-list') {
    return PRODUCTS.filter((p) => p.isWine || p.category === 'beer-wine-spirits');
  }
  if (intent === 'limited-time') {
    return PRODUCTS.filter((p) => p.isLimitedTime || p.weeklyAdGroup === '4-day-specials');
  }
  return PRODUCTS.filter((p) => Boolean(p.originalPrice || p.bundle));
}
