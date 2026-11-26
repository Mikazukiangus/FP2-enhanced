import React, { useState } from 'react';
import { Check, Heart, Minus, Plus, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../data/catalog';

interface ProductCardProps {
  product: Product;
  quantity: number;
  isWishlisted: boolean;
  inPantry?: boolean;
  onAdd: (product: Product) => void;
  onUpdateQty: (productId: string, delta: number) => void;
  onToggleWishlist: (productId: string) => void;
  onOpenDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantity,
  isWishlisted,
  inPantry = false,
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
    <article className="group bg-white rounded-xl border border-[#E5E8EE] hover:border-[#0F766E]/45 hover:shadow-[0_4px_16px_rgba(15,118,110,0.08)] transition-all duration-150 flex flex-col overflow-hidden">
      {/* Compact Image Container with Inline Top Controls */}
      <div className="relative bg-white px-3 pt-2.5 pb-1.5">
        <div className="flex items-center justify-between gap-2 mb-1 min-h-[20px]">
          {product.promoTag ? (
            <span
              className={`text-[11px] font-bold tracking-tight ${
                product.promoType === 'must-buy' || product.promoType === 'price-drop'
                  ? 'text-[#C2410C]'
                  : 'text-[#0F766E]'
              }`}
            >
              {product.promoTag}
            </span>
          ) : (
            <span className="text-[11px] text-[#6B7280]">{product.brand}</span>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            aria-label={
              isWishlisted
                ? `Remove ${product.name} from saved items`
                : `Save ${product.name}`
            }
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors shrink-0 ${
              isWishlisted
                ? 'text-[#EA580C] bg-[#FFF4EC]'
                : 'text-[#8A94A6] hover:text-[#EA580C] hover:bg-[#F5F6F8]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => onOpenDetail(product)}
          className="w-full aspect-[4/3] flex items-center justify-center overflow-hidden rounded-lg bg-[#FAFBFD] focus-visible:outline-none"
        >
          {!imgError ? (
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className={`w-full h-full ${
                product.image.includes('recipe_') ? 'object-cover' : 'object-contain p-1.5'
              } group-hover:scale-[1.03] transition-transform duration-200`}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[#5A6270] p-3 text-center">
              <ShoppingBag className="w-7 h-7 mb-1.5 text-[#9AA5B4]" />
              <span className="text-xs font-medium">{product.name}</span>
            </div>
          )}
        </button>
      </div>

      {/* Tight, High-Density Details Stack (No Wasted Whitespace) */}
      <div className="px-3 pb-3 pt-1 flex-1 flex flex-col">
        {/* Title */}
        <button
          type="button"
          onClick={() => onOpenDetail(product)}
          className="text-left text-[13px] font-bold text-[#1A1D23] hover:text-[#0F766E] leading-[1.3] line-clamp-2 transition-colors"
        >
          {product.name}
        </button>

        {/* Inline Unboxed Rating + Pack Size + Dietary */}
        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#5A6270] truncate">
          <span className="inline-flex items-center gap-0.5 font-semibold text-[#1A1D23] tabular-nums shrink-0">
            <Star className="w-3 h-3 fill-[#D97706] text-[#D97706]" />
            {product.rating.toFixed(1)}
          </span>
          <span aria-hidden="true">·</span>
          <span className="truncate">{product.packSize}</span>
          {product.dietary[0] && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-[#15803D] font-medium shrink-0">
                {product.dietary[0]}
              </span>
            </>
          )}
        </div>

        {/* Optional Wine Pairing or In-Pantry Note */}
        {product.winePairingNote ? (
          <div className="mt-1 text-[11px] text-[#0F766E] font-medium line-clamp-1">
            {product.winePairingNote}
          </div>
        ) : inPantry ? (
          <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-[#15803D]">
            <Check className="w-3 h-3 shrink-0" />
            <span>Already in your pantry</span>
          </div>
        ) : null}

        {/* Contiguous Price + CTA Block */}
        <div className="mt-auto pt-2">
          <div className="flex items-baseline justify-between gap-1.5 mb-2">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-[16px] font-extrabold text-[#1A1D23] tabular-nums tracking-tight">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-[11px] text-[#8A94A6] line-through tabular-nums">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.bundle ? (
              <span className="text-[10.5px] font-bold text-[#0F766E] truncate">
                {product.bundle.label}
              </span>
            ) : savings ? (
              <span className="text-[10.5px] font-semibold text-[#C2410C] tabular-nums shrink-0">
                Save ${savings}
              </span>
            ) : null}
          </div>

          {quantity === 0 ? (
            <button
              type="button"
              onClick={() => onAdd(product)}
              className="w-full h-8 rounded-lg bg-[#0F766E] hover:bg-[#134E4A] active:scale-[0.99] text-white text-xs font-bold transition-all whitespace-nowrap"
            >
              Add to cart
            </button>
          ) : (
            <div className="w-full h-8 rounded-lg border-2 border-[#0F766E] bg-[#F0FDFA] flex items-center justify-between overflow-hidden">
              <button
                type="button"
                onClick={() => onUpdateQty(product.id, -1)}
                aria-label={`Decrease quantity of ${product.name}`}
                className="w-8 h-full flex items-center justify-center text-[#0F766E] hover:bg-[#CCFBF1] transition-colors"
              >
                <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
              <span className="text-xs font-extrabold text-[#134E4A] tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => onUpdateQty(product.id, 1)}
                aria-label={`Increase quantity of ${product.name}`}
                className="w-8 h-full flex items-center justify-center text-[#0F766E] hover:bg-[#CCFBF1] transition-colors"
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
