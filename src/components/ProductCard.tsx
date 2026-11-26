import React, { useState } from 'react';
import { Heart, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Product } from '../data/catalog';

interface ProductCardProps {
  product: Product;
  quantity: number;
  isWishlisted: boolean;
  onAdd: (product: Product) => void;
  onUpdateQty: (productId: string, delta: number) => void;
  onToggleWishlist: (productId: string) => void;
  onOpenDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantity,
  isWishlisted,
  onAdd,
  onUpdateQty,
  onToggleWishlist,
  onOpenDetail,
}) => {
  const [imgError, setImgError] = useState(false);

  const savings =
    product.originalPrice && product.originalPrice > product.price
      ? (product.originalPrice - product.price).toFixed(2)
      : null;

  return (
    <article className="group bg-white rounded-xl border border-[#E5E8EE] hover:border-[#99E6D8] hover:shadow-[0_6px_20px_rgba(14,53,120,0.08)] transition-all duration-150 flex flex-col overflow-hidden">
      {/* Top Action & Promo Row */}
      <div className="px-3 pt-3 flex items-start justify-between gap-2 min-h-[30px]">
        {product.promoTag ? (
          <span
            className={`text-[11px] font-bold tracking-tight leading-none py-1 px-2 rounded ${
              product.promoType === 'must-buy' || product.promoType === 'price-drop'
                ? 'bg-[#EA580C] text-white'
                : product.promoType === 'everyday-low'
                ? 'bg-[#134E4A] text-white'
                : 'bg-[#FFF4EC] text-[#C2410C]'
            }`}
          >
            {product.promoTag}
          </span>
        ) : (
          <span />
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          aria-label={isWishlisted ? `Remove ${product.name} from shopping list` : `Save ${product.name} to shopping list`}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors shrink-0 ${
            isWishlisted
              ? 'text-[#EA580C] bg-[#FFF4EC]'
              : 'text-[#8A94A6] hover:text-[#EA580C] hover:bg-[#F5F6F8]'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Photo */}
      <button
        type="button"
        onClick={() => onOpenDetail(product)}
        className="px-4 py-2 flex items-center justify-center aspect-square w-full bg-white focus-visible:outline-none"
      >
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full rounded-lg bg-[#F5F7FA] flex flex-col items-center justify-center text-[#5A6270] p-4 text-center">
            <ShoppingBag className="w-8 h-8 mb-2 text-[#9AA5B4]" />
            <span className="text-xs font-medium">{product.name}</span>
          </div>
        )}
      </button>

      {/* Product Details */}
      <div className="px-3.5 pb-3.5 pt-1 flex-1 flex flex-col">
        {/* Price Row */}
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-[19px] font-extrabold text-[#1A1D23] tabular-nums tracking-tight">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#8A94A6] line-through tabular-nums">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          {savings && (
            <span className="text-[11px] font-semibold text-[#C2410C] tabular-nums">
              Save ${savings}
            </span>
          )}
        </div>

        {/* Bundle Promo Line */}
        <div className="min-h-[18px] mt-0.5">
          {product.bundle ? (
            <span className="text-[11px] font-bold text-[#0F766E]">
              {product.bundle.label}
            </span>
          ) : (
            <span className="text-[11px] text-[#6B7280] tabular-nums">
              {product.unitPriceText}
            </span>
          )}
        </div>

        {/* Product Title */}
        <button
          type="button"
          onClick={() => onOpenDetail(product)}
          className="text-left mt-1.5 text-[13.5px] font-semibold text-[#1A1D23] hover:text-[#0F766E] leading-snug line-clamp-2 min-h-[38px] transition-colors"
        >
          {product.name}
        </button>

        {/* Pack Size & Clean Inline Dietary Metadata */}
        <div className="mt-1.5 text-[11.5px] text-[#5A6270] flex items-center gap-1.5 flex-wrap min-h-[18px]">
          <span>{product.packSize}</span>
          {product.dietary.slice(0, 2).map((tag) => (
            <React.Fragment key={tag}>
              <span aria-hidden="true">·</span>
              <span className={tag === 'Healthier Choice' ? 'text-[#15803D] font-medium' : ''}>
                {tag}
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Add to Cart / Quantity Stepper */}
        <div className="mt-auto pt-3">
          {quantity === 0 ? (
            <button
              type="button"
              onClick={() => onAdd(product)}
              className="w-full h-9 rounded-lg bg-[#0F766E] hover:bg-[#134E4A] active:scale-[0.99] text-white text-xs font-bold transition-all whitespace-nowrap"
            >
              Add to cart
            </button>
          ) : (
            <div className="w-full h-9 rounded-lg border-2 border-[#0F766E] bg-[#F0FDFA] flex items-center justify-between overflow-hidden">
              <button
                type="button"
                onClick={() => onUpdateQty(product.id, -1)}
                aria-label={`Decrease quantity of ${product.name}`}
                className="w-9 h-full flex items-center justify-center text-[#0F766E] hover:bg-[#CCFBF1] transition-colors"
              >
                <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
              <span className="text-sm font-extrabold text-[#134E4A] tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => onUpdateQty(product.id, 1)}
                aria-label={`Increase quantity of ${product.name}`}
                className="w-9 h-full flex items-center justify-center text-[#0F766E] hover:bg-[#CCFBF1] transition-colors"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
