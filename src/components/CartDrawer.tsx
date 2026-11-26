import React, { useState } from 'react';
import {
  CheckCircle2,
  MapPin,
  Minus,
  Plus,
  ShoppingCart,
  Tag,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import {
  calculateItemTotal,
  Product,
  PRODUCTS,
  PROMO_CODES,
} from '../data/catalog';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cart: Record<string, number>;
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  postalCode: string;
  deliverySummary: string;
  onOpenDelivery: () => void;
  onProceedCheckout: (summary: {
    subtotal: number;
    productSavings: number;
    promoDiscount: number;
    linkpointsDiscount: number;
    deliveryFee: number;
    total: number;
    linkpointsEarned: number;
    appliedPromo: string | null;
  }) => void;
  isSignedIn: boolean;
  linkpoints: number;
  isDigitalClub: boolean;
}

const FREE_DELIVERY_THRESHOLD = 59;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  postalCode,
  deliverySummary,
  onOpenDelivery,
  onProceedCheckout,
  isSignedIn,
  linkpoints,
  isDigitalClub,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [redeemLinkpoints, setRedeemLinkpoints] = useState(false);

  if (!open) return null;

  const cartEntries = Object.entries(cart)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => {
      const product = PRODUCTS.find((p) => p.id === id);
      return product ? { product, qty } : null;
    })
    .filter(Boolean) as { product: Product; qty: number }[];

  let subtotal = 0;
  let productSavings = 0;
  cartEntries.forEach(({ product, qty }) => {
    const res = calculateItemTotal(product, qty);
    subtotal += res.total;
    productSavings += res.savings;
  });

  subtotal = Number(subtotal.toFixed(2));
  productSavings = Number(productSavings.toFixed(2));

  const promoObj = appliedPromo ? PROMO_CODES[appliedPromo] : null;
  const promoValid = promoObj ? subtotal >= promoObj.minSpend : false;
  const promoDiscount = promoValid && promoObj ? promoObj.discount : 0;

  const freeDeliveryUnlocked =
    isDigitalClub ||
    subtotal >= FREE_DELIVERY_THRESHOLD ||
    Boolean(promoValid && promoObj?.freeDelivery);
  const deliveryFee = cartEntries.length === 0 ? 0 : freeDeliveryUnlocked ? 0 : 5.99;

  const maxLinkpointsRedeem = isSignedIn && linkpoints >= 500 && subtotal >= 10 ? 5 : 0;
  const linkpointsDiscount = redeemLinkpoints ? maxLinkpointsRedeem : 0;

  const total = Math.max(0, Number((subtotal - promoDiscount - linkpointsDiscount + deliveryFee).toFixed(2)));
  const remainingForFreeDelivery = Math.max(0, Number((FREE_DELIVERY_THRESHOLD - subtotal).toFixed(2)));
  const progressPct = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);
  const linkpointsEarned = Math.floor(total * (isDigitalClub ? 2 : 1));

  const handleApplyPromo = (codeRaw?: string) => {
    const code = (codeRaw ?? promoInput).trim().toUpperCase();
    setPromoError(null);
    if (!code) return;
    const match = PROMO_CODES[code];
    if (!match) {
      setPromoError('Invalid promo code. Try WELCOME5, FP10, or FREESHIP.');
      return;
    }
    if (subtotal < match.minSpend) {
      setPromoError(`Minimum spend of $${match.minSpend} required for ${code}.`);
      return;
    }
    setAppliedPromo(code);
    setPromoInput(code);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-[1px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        aria-label="Shopping Cart"
        className="relative w-full max-w-[440px] bg-white h-full shadow-2xl flex flex-col z-10"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E6E8EC] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="w-5 h-5 text-[#0F766E]" />
            <h2 className="text-base font-bold text-[#1A1D23]">
              My Cart ({cartEntries.reduce((acc, e) => acc + e.qty, 0)})
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {cartEntries.length > 0 && (
              <button
                type="button"
                onClick={onClearCart}
                className="text-xs font-medium text-[#5A6270] hover:text-[#EA580C] transition-colors px-2 py-1"
              >
                Clear all
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close cart"
              className="w-8 h-8 rounded-lg hover:bg-[#F3F5F8] flex items-center justify-center text-[#5A6270]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Delivery Slot Banner */}
        <div className="px-5 py-3 bg-[#F8FAFC] border-b border-[#E6E8EC] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-[#374151] min-w-0">
            <MapPin className="w-4 h-4 text-[#EA580C] shrink-0" />
            <div className="truncate">
              <span className="font-semibold text-[#1A1D23] tabular-nums">Singapore {postalCode}</span>
              <span className="mx-1.5 text-[#9CA3AF]">·</span>
              <span>{deliverySummary}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenDelivery}
            className="text-xs font-bold text-[#0F766E] hover:underline shrink-0"
          >
            Change
          </button>
        </div>

        {/* Free Delivery Progress Bar */}
        {cartEntries.length > 0 && (
          <div className="px-5 py-3 bg-[#F0FDFA] border-b border-[#CCFBF1]">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              {freeDeliveryUnlocked ? (
                <span className="text-[#15803D] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>You have unlocked FREE delivery!</span>
                </span>
              ) : (
                <span className="text-[#134E4A] flex items-center gap-1.5">
                  <Truck className="w-4 h-4 shrink-0" />
                  <span>
                    Add <strong className="tabular-nums">${remainingForFreeDelivery.toFixed(2)}</strong> more for FREE delivery
                  </span>
                </span>
              )}
              <span className="text-[#5A6270] tabular-nums">$59 min.</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#C2EFE6] overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  freeDeliveryUnlocked ? 'bg-[#15803D]' : 'bg-[#0F766E]'
                }`}
                style={{ width: `${freeDeliveryUnlocked ? 100 : progressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cartEntries.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#F1F5F9] flex items-center justify-center mb-4 text-[#64748B]">
                <ShoppingCart className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-[#1A1D23]">Your Pantry Lane cart is empty</h3>
              <p className="text-sm text-[#5A6270] mt-1.5 max-w-[260px]">
                Add fresh produce, chilled dairy, or weekly Top Picks deals to enjoy free delivery from $59.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-5 px-5 py-2.5 rounded-lg bg-[#0F766E] hover:bg-[#134E4A] text-white text-sm font-bold transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartEntries.map(({ product, qty }) => {
                const { total: itemTotal, savings } = calculateItemTotal(product, qty);
                const bundleApplied = Boolean(product.bundle && qty >= product.bundle.minQty);

                return (
                  <div
                    key={product.id}
                    className="flex gap-3 pb-4 border-b border-[#EEF0F3] last:border-b-0"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg border border-[#E6E8EC] object-contain bg-white p-1 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-[#1A1D23] leading-snug line-clamp-2">
                          {product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(product.id)}
                          aria-label={`Remove ${product.name}`}
                          className="text-[#9CA3AF] hover:text-[#EA580C] p-0.5 shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-xs text-[#6B7280] mt-0.5">{product.packSize}</div>
                      {bundleApplied && product.bundle && (
                        <div className="text-[11px] font-bold text-[#15803D] mt-1">
                          Bundle applied: {product.bundle.label}
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-center border border-[#D1D5DB] rounded-lg overflow-hidden h-7">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(product.id, -1)}
                            aria-label="Decrease quantity"
                            className="w-7 h-full flex items-center justify-center hover:bg-[#F3F4F6] text-[#1A1D23]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold tabular-nums">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(product.id, 1)}
                            aria-label="Increase quantity"
                            className="w-7 h-full flex items-center justify-center hover:bg-[#F3F4F6] text-[#1A1D23]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-extrabold text-[#1A1D23] tabular-nums">
                            ${itemTotal.toFixed(2)}
                          </div>
                          {savings > 0 && (
                            <div className="text-[11px] font-semibold text-[#C2410C] tabular-nums">
                              Saved ${savings.toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Promo Code Section */}
              <div className="pt-3 border-t border-[#E6E8EC]">
                <label className="text-xs font-bold text-[#1A1D23] flex items-center gap-1.5 mb-2">
                  <Tag className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span>Promo Code</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter WELCOME5, FP10, or FREESHIP"
                    className="flex-1 h-9 px-3 rounded-lg border border-[#D1D5DB] text-xs uppercase outline-none focus:border-[#0F766E]"
                  />
                  <button
                    type="button"
                    onClick={() => handleApplyPromo()}
                    className="px-3.5 h-9 rounded-lg bg-[#134E4A] hover:bg-[#0F766E] text-white text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {Object.entries(PROMO_CODES).map(([code, info]) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => handleApplyPromo(code)}
                      className={`text-[11px] px-2 py-1 rounded border transition-colors ${
                        appliedPromo === code
                          ? 'border-[#15803D] bg-[#ECFDF3] text-[#15803D] font-bold'
                          : 'border-[#DCE1E8] bg-[#F8FAFC] text-[#374151] hover:border-[#0F766E]'
                      }`}
                    >
                      {code} · {info.label}
                    </button>
                  ))}
                </div>
                {promoError && <p className="text-xs text-[#C2410C] mt-1.5">{promoError}</p>}
              </div>

              {/* Lane Points Redemption */}
              {maxLinkpointsRedeem > 0 && (
                <label className="flex items-center justify-between p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E6EC] cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-[#1A1D23]">
                      Redeem 500 Lane Points
                    </div>
                    <div className="text-[11px] text-[#5A6270]">
                      Offset $5.00 from this order ({linkpoints.toLocaleString()} pts available)
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={redeemLinkpoints}
                    onChange={(e) => setRedeemLinkpoints(e.target.checked)}
                    className="w-4 h-4 accent-[#0F766E]"
                  />
                </label>
              )}
            </div>
          )}
        </div>

        {/* Summary & Checkout Footer */}
        {cartEntries.length > 0 && (
          <div className="p-5 bg-white border-t border-[#E6E8EC] space-y-2.5">
            <div className="space-y-1.5 text-xs text-[#4B5563]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1A1D23] tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              {productSavings > 0 && (
                <div className="flex justify-between text-[#15803D]">
                  <span>Weekly &amp; Bundle Savings</span>
                  <span className="font-semibold tabular-nums">-${productSavings.toFixed(2)}</span>
                </div>
              )}
              {promoDiscount > 0 && (
                <div className="flex justify-between text-[#15803D]">
                  <span>Promo ({appliedPromo})</span>
                  <span className="font-semibold tabular-nums">-${promoDiscount.toFixed(2)}</span>
                </div>
              )}
              {linkpointsDiscount > 0 && (
                <div className="flex justify-between text-[#15803D]">
                  <span>Lane Points Redeemed (500 pts)</span>
                  <span className="font-semibold tabular-nums">
                    -${linkpointsDiscount.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-semibold tabular-nums text-[#1A1D23]">
                  {deliveryFee === 0 ? (
                    <span className="text-[#15803D] font-bold">FREE</span>
                  ) : (
                    `$${deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>
            </div>

            <div className="pt-2.5 border-t border-[#E6E8EC] flex items-baseline justify-between">
              <div>
                <div className="text-sm font-bold text-[#1A1D23]">Estimated Total</div>
                <div className="text-[11px] text-[#5A6270] tabular-nums">
                  Earn +{linkpointsEarned} Lane Points on this order
                </div>
              </div>
              <div className="text-xl font-extrabold text-[#134E4A] tabular-nums">
                ${total.toFixed(2)}
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onProceedCheckout({
                  subtotal,
                  productSavings,
                  promoDiscount,
                  linkpointsDiscount,
                  deliveryFee,
                  total,
                  linkpointsEarned,
                  appliedPromo: promoValid ? appliedPromo : null,
                })
              }
              className="w-full h-11 rounded-lg bg-[#0F766E] hover:bg-[#134E4A] text-white text-sm font-bold transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
