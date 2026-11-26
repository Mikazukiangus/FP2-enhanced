import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Clock,
  CreditCard,
  Heart,
  MapPin,
  Minus,
  Package,
  Plus,
  ShieldCheck,
  Star,
  Store,
  Truck,
  User,
  X,
} from 'lucide-react';
import {
  DELIVERY_SLOTS,
  DeliverySlot,
  Product,
  SINGAPORE_AREAS,
  STORE_OUTLETS,
  StoreOutlet,
} from '../data/catalog';

/* 1. PRODUCT DETAIL MODAL (PDP) */
interface ProductDetailModalProps {
  product: Product | null;
  quantity: number;
  isWishlisted: boolean;
  onClose: () => void;
  onAdd: (product: Product) => void;
  onUpdateQty: (productId: string, delta: number) => void;
  onToggleWishlist: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  quantity,
  isWishlisted,
  onClose,
  onAdd,
  onUpdateQty,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const savings =
    product.originalPrice && product.originalPrice > product.price
      ? (product.originalPrice - product.price).toFixed(2)
      : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-[1px]" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        className="relative bg-white rounded-2xl max-w-[820px] w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-4 top-4 w-9 h-9 rounded-full bg-[#F3F5F8] hover:bg-[#E5E8EE] flex items-center justify-center text-[#374151] z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
          {/* Left Image */}
          <div className="md:col-span-5 bg-white rounded-xl border border-[#EEF0F3] p-6 flex items-center justify-center aspect-square">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Right Contiguous Purchase Module */}
          <div className="md:col-span-7 flex flex-col">
            <div className="flex items-center gap-2 text-xs text-[#5A6270]">
              <span className="font-bold text-[#0F766E]">{product.brand}</span>
              <span aria-hidden="true">·</span>
              <span>{product.subcategory}</span>
              <span aria-hidden="true">·</span>
              <span>Origin: {product.origin}</span>
            </div>

            <h2 className="text-xl font-extrabold text-[#1A1D23] mt-1.5 leading-snug pr-8">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 mt-2 text-xs text-[#5A6270]">
              <div className="flex items-center gap-1 text-[#D97706] font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="tabular-nums">{product.rating.toFixed(1)}</span>
              </div>
              <span className="tabular-nums">({product.reviewCount.toLocaleString()} reviews)</span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-[#15803D]">In Stock</span>
            </div>

            {/* Price & Promo Block */}
            <div className="mt-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E6E8EC]">
              <div className="flex items-baseline gap-2.5 flex-wrap">
                <span className="text-2xl font-extrabold text-[#1A1D23] tabular-nums">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#8A94A6] line-through tabular-nums">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {savings && (
                  <span className="text-xs font-bold text-[#C2410C] tabular-nums">
                    Save ${savings}
                  </span>
                )}
              </div>
              <div className="text-xs text-[#5A6270] mt-1 tabular-nums">
                {product.packSize} · {product.unitPriceText}
              </div>
              {product.bundle && (
                <div className="mt-2 pt-2 border-t border-[#E6E8EC] text-xs font-bold text-[#0F766E]">
                  Bundle Offer: {product.bundle.label} (Applied automatically in cart)
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center gap-3">
              {quantity === 0 ? (
                <button
                  type="button"
                  onClick={() => onAdd(product)}
                  className="flex-1 h-11 rounded-lg bg-[#0F766E] hover:bg-[#134E4A] text-white text-sm font-bold transition-colors"
                >
                  Add to cart
                </button>
              ) : (
                <div className="flex-1 h-11 rounded-lg border-2 border-[#0F766E] bg-[#F0FDFA] flex items-center justify-between overflow-hidden">
                  <button
                    type="button"
                    onClick={() => onUpdateQty(product.id, -1)}
                    aria-label="Decrease quantity"
                    className="w-12 h-full flex items-center justify-center text-[#0F766E] hover:bg-[#CCFBF1]"
                  >
                    <Minus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <span className="text-base font-extrabold text-[#134E4A] tabular-nums">
                    {quantity} in cart
                  </span>
                  <button
                    type="button"
                    onClick={() => onUpdateQty(product.id, 1)}
                    aria-label="Increase quantity"
                    className="w-12 h-full flex items-center justify-center text-[#0F766E] hover:bg-[#CCFBF1]"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => onToggleWishlist(product.id)}
                className={`h-11 px-4 rounded-lg border text-xs font-bold flex items-center gap-2 transition-colors ${
                  isWishlisted
                    ? 'border-[#EA580C] bg-[#FFF4EC] text-[#EA580C]'
                    : 'border-[#D1D5DB] text-[#374151] hover:border-[#0F766E]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                <span>{isWishlisted ? 'Saved' : 'Save'}</span>
              </button>
            </div>

            {/* Description & Storage */}
            <div className="mt-5 space-y-3 text-xs text-[#4B5563] leading-relaxed">
              <div>
                <h3 className="font-bold text-[#1A1D23] mb-1">About this product</h3>
                <p>{product.description}</p>
              </div>
              <div>
                <h3 className="font-bold text-[#1A1D23] mb-1">Storage &amp; Handling</h3>
                <p>{product.storageInfo}</p>
              </div>
              {product.dietary.length > 0 && (
                <div className="pt-2 border-t border-[#EEF0F3] flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-[#1A1D23]">Dietary &amp; Attributes:</span>
                  <span>{product.dietary.join(' · ')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* 2. DELIVERY & POSTAL CODE MODAL */
interface DeliveryModalProps {
  open: boolean;
  onClose: () => void;
  postalCode: string;
  selectedSlot: DeliverySlot;
  fulfillmentMode: 'delivery' | 'collect';
  selectedOutlet: StoreOutlet;
  onSave: (config: {
    postalCode: string;
    slot: DeliverySlot;
    mode: 'delivery' | 'collect';
    outlet: StoreOutlet;
  }) => void;
}

export const DeliveryModal: React.FC<DeliveryModalProps> = ({
  open,
  onClose,
  postalCode,
  selectedSlot,
  fulfillmentMode,
  selectedOutlet,
  onSave,
}) => {
  const [mode, setMode] = useState<'delivery' | 'collect'>(fulfillmentMode);
  const [code, setCode] = useState(postalCode);
  const [slot, setSlot] = useState<DeliverySlot>(selectedSlot);
  const [outlet, setOutlet] = useState<StoreOutlet>(selectedOutlet);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleConfirm = () => {
    if (mode === 'delivery' && !/^\d{6}$/.test(code.trim())) {
      setError('Please enter a valid 6-digit Singapore postal code (e.g. 238801).');
      return;
    }
    setError(null);
    onSave({ postalCode: code.trim(), slot, mode, outlet });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-[1px]" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Choose Delivery Location and Time Slot"
        className="relative bg-white rounded-2xl max-w-[560px] w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10 p-6"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#E6E8EC]">
          <h2 className="text-lg font-extrabold text-[#1A1D23]">
            Delivery Address &amp; Time Slot
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-lg hover:bg-[#F3F5F8] flex items-center justify-center text-[#5A6270]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Tabs */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#F1F5F9] rounded-xl mt-4">
          <button
            type="button"
            onClick={() => setMode('delivery')}
            className={`py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
              mode === 'delivery'
                ? 'bg-white text-[#0F766E] shadow-sm'
                : 'text-[#5A6270] hover:text-[#1A1D23]'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Home Delivery</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('collect')}
            className={`py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
              mode === 'collect'
                ? 'bg-white text-[#0F766E] shadow-sm'
                : 'text-[#5A6270] hover:text-[#1A1D23]'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Click &amp; Collect</span>
          </button>
        </div>

        {mode === 'delivery' ? (
          <div className="mt-5 space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#1A1D23] mb-1.5">
                Singapore 6-Digit Postal Code
              </label>
              <input
                type="text"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                placeholder="e.g. 238801"
                className="w-full h-10 px-3.5 rounded-lg border border-[#D1D5DB] focus:border-[#0F766E] outline-none text-sm font-semibold tabular-nums"
              />
              {error && <p className="text-xs text-[#C2410C] mt-1">{error}</p>}

              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {SINGAPORE_AREAS.map((area) => (
                  <button
                    key={area.postalCode}
                    type="button"
                    onClick={() => {
                      setCode(area.postalCode);
                      setError(null);
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs border transition-colors ${
                      code === area.postalCode
                        ? 'border-[#0F766E] bg-[#F0FDFA] text-[#0F766E] font-bold'
                        : 'border-[#E2E6EC] text-[#4B5563] hover:border-[#0F766E]'
                    }`}
                  >
                    {area.postalCode} · {area.label.split(' · ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1D23] mb-2">
                Select 2-Hour Delivery Window
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {DELIVERY_SLOTS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSlot(s)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      slot.id === s.id
                        ? 'border-[#0F766E] bg-[#F0FDFA]'
                        : 'border-[#E2E6EC] hover:border-[#5EEAD4]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#1A1D23]">
                        {s.dayLabel}, {s.dateLabel}
                      </span>
                      <span
                        className={
                          s.status === 'Filling Fast'
                            ? 'text-[#C2410C] font-semibold'
                            : 'text-[#15803D] font-semibold'
                        }
                      >
                        {s.status}
                      </span>
                    </div>
                    <div className="text-xs text-[#374151] mt-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#5A6270]" />
                      <span className="tabular-nums">{s.window}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-2.5">
            <p className="text-xs text-[#5A6270]">
              Order online and pick up from your nearest Pantry Lane Superstore or Pantry Lane Select outlet with $0 collection fee.
            </p>
            {STORE_OUTLETS.map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setOutlet(st)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                  outlet.id === st.id
                    ? 'border-[#0F766E] bg-[#F0FDFA]'
                    : 'border-[#E2E6EC] hover:border-[#5EEAD4]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#1A1D23]">{st.name}</span>
                  <span className="text-xs font-semibold text-[#0F766E] tabular-nums">
                    {st.distanceKm} km
                  </span>
                </div>
                <div className="text-xs text-[#5A6270] mt-0.5">
                  {st.address}, Singapore {st.postalCode}
                </div>
                <div className="text-[11px] text-[#15803D] font-semibold mt-1">{st.hours}</div>
              </button>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#E6E8EC] flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#D1D5DB] text-xs font-bold text-[#374151] hover:bg-[#F3F5F8]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2 rounded-lg bg-[#0F766E] hover:bg-[#134E4A] text-white text-xs font-bold transition-colors"
          >
            Confirm Slot
          </button>
        </div>
      </div>
    </div>
  );
};

/* 3. CHECKOUT & ORDER CONFIRMATION MODAL */
export interface CheckoutSummary {
  subtotal: number;
  productSavings: number;
  promoDiscount: number;
  linkpointsDiscount: number;
  deliveryFee: number;
  total: number;
  linkpointsEarned: number;
  appliedPromo: string | null;
}

interface CheckoutModalProps {
  open: boolean;
  summary: CheckoutSummary | null;
  postalCode: string;
  deliverySummary: string;
  onClose: () => void;
  onCompleteOrder: (orderId: string, linkpointsEarned: number, linkpointsSpent: number) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  open,
  summary,
  postalCode,
  deliverySummary,
  onClose,
  onCompleteOrder,
}) => {
  const [name, setName] = useState('Alex Tan');
  const [phone, setPhone] = useState('+65 9123 4567');
  const [unit, setUnit] = useState('#08-14, 290 Orchard Road');
  const [paymentMethod, setPaymentMethod] = useState<'trust' | 'card' | 'paynow' | 'cod'>('trust');
  const [orderId, setOrderId] = useState<string | null>(null);

  if (!open || !summary) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generated = `FP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderId(generated);
    onCompleteOrder(generated, summary.linkpointsEarned, summary.linkpointsDiscount > 0 ? 500 : 0);
  };

  const handleDone = () => {
    setOrderId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/55 backdrop-blur-[1px]" onClick={handleDone} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Pantry Lane Checkout"
        className="relative bg-white rounded-2xl max-w-[580px] w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10 p-6"
      >
        {!orderId ? (
          <form onSubmit={handlePlaceOrder}>
            <div className="flex items-center justify-between pb-4 border-b border-[#E6E8EC]">
              <h2 className="text-lg font-extrabold text-[#1A1D23]">Pantry Lane Checkout <span className="ml-1 text-xs font-semibold text-[#5A6270]">(demo, no payment is taken)</span></h2>
              <button
                type="button"
                onClick={handleDone}
                aria-label="Close checkout"
                className="w-8 h-8 rounded-lg hover:bg-[#F3F5F8] flex items-center justify-center text-[#5A6270]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Delivery Details */}
            <div className="mt-4 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A6270]">
                1. Delivery Details
              </h3>
              <div className="p-3 rounded-lg bg-[#F0FDFA] border border-[#CCFBF1] text-xs text-[#134E4A] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0F766E] shrink-0" />
                <span>
                  Singapore <strong className="tabular-nums">{postalCode}</strong> · {deliverySummary}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1">
                    Recipient Name
                  </label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-[#D1D5DB] text-sm outline-none focus:border-[#0F766E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1">
                    Mobile Number
                  </label>
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-[#D1D5DB] text-sm outline-none focus:border-[#0F766E] tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">
                  Block / Street &amp; Unit Number
                </label>
                <input
                  required
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-[#D1D5DB] text-sm outline-none focus:border-[#0F766E]"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-5 space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A6270]">
                2. Payment Method
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'trust', label: 'Trust Link Card', sub: 'Up to 21% savings' },
                  { id: 'card', label: 'Visa / Mastercard', sub: 'Instant checkout' },
                  { id: 'paynow', label: 'PayNow QR', sub: 'Zero fees' },
                  { id: 'cod', label: 'Cash on Delivery', sub: 'Pay at doorstep' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id as typeof paymentMethod)}
                    className={`p-3 rounded-xl border text-left transition-colors ${
                      paymentMethod === pm.id
                        ? 'border-[#0F766E] bg-[#F0FDFA]'
                        : 'border-[#E2E6EC] hover:border-[#5EEAD4]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#1A1D23]">
                      <CreditCard className="w-3.5 h-3.5 text-[#0F766E]" />
                      <span>{pm.label}</span>
                    </div>
                    <div className="text-[11px] text-[#5A6270] mt-0.5">{pm.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-5 p-4 rounded-xl bg-[#F8FAFC] border border-[#E6E8EC] space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#5A6270]">Order Subtotal</span>
                <span className="font-semibold tabular-nums">${summary.subtotal.toFixed(2)}</span>
              </div>
              {summary.promoDiscount > 0 && (
                <div className="flex justify-between text-[#15803D]">
                  <span>Promo ({summary.appliedPromo})</span>
                  <span className="font-semibold tabular-nums">-${summary.promoDiscount.toFixed(2)}</span>
                </div>
              )}
              {summary.linkpointsDiscount > 0 && (
                <div className="flex justify-between text-[#15803D]">
                  <span>Lane Points Redeemed</span>
                  <span className="font-semibold tabular-nums">-${summary.linkpointsDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#5A6270]">Delivery Fee</span>
                <span className="font-semibold tabular-nums">
                  {summary.deliveryFee === 0 ? 'FREE' : `$${summary.deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E6E8EC] flex justify-between items-baseline text-sm font-extrabold text-[#134E4A]">
                <span>Total Payable</span>
                <span className="text-lg tabular-nums">${summary.total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="mt-5 w-full h-11 rounded-lg bg-[#0F766E] hover:bg-[#134E4A] text-white text-sm font-bold transition-colors"
            >
              Place Order · ${summary.total.toFixed(2)}
            </button>
          </form>
        ) : (
          <div className="py-6 text-center">
            <div className="w-14 h-14 rounded-full bg-[#ECFDF3] text-[#15803D] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-extrabold text-[#1A1D23] mt-4">
              Order #{orderId} Confirmed
            </h2>
            <p className="text-sm text-[#5A6270] mt-1.5">
              Thank you, {name}! Our personal shoppers are preparing your fresh groceries for{' '}
              <strong className="text-[#1A1D23]">{deliverySummary}</strong>.
            </p>

            <div className="mt-5 p-4 rounded-xl bg-[#F8FAFC] border border-[#E6E8EC] text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#5A6270]">Delivery Address</span>
                <span className="font-semibold text-[#1A1D23]">
                  {unit}, S({postalCode})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A6270]">Amount Paid</span>
                <span className="font-bold text-[#134E4A] tabular-nums">
                  ${summary.total.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A6270]">Lane Points Earned</span>
                <span className="font-bold text-[#15803D] tabular-nums">
                  +{summary.linkpointsEarned} Lane Points
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDone}
              className="mt-6 px-6 py-2.5 rounded-lg bg-[#0F766E] hover:bg-[#134E4A] text-white text-sm font-bold"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* 4. STORE LOCATOR MODAL */
interface StoreLocatorModalProps {
  open: boolean;
  onClose: () => void;
  onSelectCollectOutlet: (outlet: StoreOutlet) => void;
}

export const StoreLocatorModal: React.FC<StoreLocatorModalProps> = ({
  open,
  onClose,
  onSelectCollectOutlet,
}) => {
  const [filter, setFilter] = useState('');
  if (!open) return null;

  const filtered = STORE_OUTLETS.filter(
    (s) =>
      s.name.toLowerCase().includes(filter.toLowerCase()) ||
      s.address.toLowerCase().includes(filter.toLowerCase()) ||
      s.postalCode.includes(filter)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-[1px]" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Pantry Lane Store Locator"
        className="relative bg-white rounded-2xl max-w-[600px] w-full max-h-[85vh] overflow-y-auto shadow-2xl z-10 p-6"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#E6E8EC]">
          <div>
            <h2 className="text-lg font-extrabold text-[#1A1D23]">Pantry Lane Store Locator</h2>
            <p className="text-xs text-[#5A6270]">Find Pantry Lane Superstore, Select &amp; Click &amp; Collect outlets across Singapore</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-lg hover:bg-[#F3F5F8] flex items-center justify-center text-[#5A6270]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search by mall, road, or postal code (e.g. VivoCity, Tampines, 238164)..."
          className="mt-4 w-full h-10 px-3.5 rounded-lg border border-[#D1D5DB] text-sm outline-none focus:border-[#0F766E]"
        />

        <div className="mt-4 space-y-3">
          {filtered.map((st) => (
            <div
              key={st.id}
              className="p-4 rounded-xl border border-[#E6E8EC] hover:border-[#99E6D8] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#1A1D23]">{st.name}</span>
                  <span className="text-[11px] font-semibold text-[#0F766E] tabular-nums">
                    {st.distanceKm} km
                  </span>
                </div>
                <div className="text-xs text-[#5A6270] mt-0.5">
                  {st.address}, Singapore {st.postalCode}
                </div>
                <div className="text-xs text-[#15803D] font-semibold mt-1">{st.hours}</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onSelectCollectOutlet(st);
                  onClose();
                }}
                className="px-3.5 py-2 rounded-lg bg-[#F0FDFA] hover:bg-[#0F766E] text-[#0F766E] hover:text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0"
              >
                Click &amp; Collect Here
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* 5. ACCOUNT & LINKPOINTS MODAL */
interface AccountModalProps {
  open: boolean;
  onClose: () => void;
  isSignedIn: boolean;
  onToggleSignIn: () => void;
  linkpoints: number;
  isDigitalClub: boolean;
  onToggleDigitalClub: () => void;
  orderHistory: { id: string; date: string; total: number }[];
}

export const AccountModal: React.FC<AccountModalProps> = ({
  open,
  onClose,
  isSignedIn,
  onToggleSignIn,
  linkpoints,
  isDigitalClub,
  onToggleDigitalClub,
  orderHistory,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-[1px]" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Pantry Lane Account and Lane Rewards"
        className="relative bg-white rounded-2xl max-w-[480px] w-full shadow-2xl z-10 p-6"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#E6E8EC]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#E6FAF6] text-[#0F766E] flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#1A1D23]">
                {isSignedIn ? 'Alex Tan' : 'Pantry Lane Account'}
              </h2>
              <p className="text-xs text-[#5A6270]">
                {isSignedIn ? 'Lane Rewards Member' : 'Sign in to earn & redeem Lane Points'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-lg hover:bg-[#F3F5F8] flex items-center justify-center text-[#5A6270]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSignedIn ? (
          <div className="mt-5 space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#134E4A] to-[#0F766E] text-white flex items-center justify-between">
              <div>
                <div className="text-xs text-white/80 font-medium">Available Lane Points</div>
                <div className="text-2xl font-extrabold tabular-nums mt-0.5">
                  {linkpoints.toLocaleString()} pts
                </div>
                <div className="text-[11px] text-white/80 mt-0.5 tabular-nums">
                  Worth ${(linkpoints / 100).toFixed(2)} in grocery offsets
                </div>
              </div>
              <Award className="w-10 h-10 text-[#5EEAD4]" />
            </div>

            <div className="p-4 rounded-xl border border-[#E6E8EC] flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-bold text-[#1A1D23] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
                  <span>Lane Plus Membership</span>
                </div>
                <div className="text-xs text-[#5A6270] mt-0.5">
                  {isDigitalClub
                    ? 'Active — $0 delivery fees & 2x Lane Points enabled'
                    : 'Unlock $0 delivery fees & bonus monthly vouchers'}
                </div>
              </div>
              <button
                type="button"
                onClick={onToggleDigitalClub}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                  isDigitalClub
                    ? 'bg-[#ECFDF3] text-[#15803D]'
                    : 'bg-[#0F766E] text-white hover:bg-[#134E4A]'
                }`}
              >
                {isDigitalClub ? 'Active' : 'Activate Free Trial'}
              </button>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A6270] mb-2">
                Recent Orders
              </h3>
              {orderHistory.length === 0 ? (
                <div className="p-4 rounded-xl bg-[#F8FAFC] text-xs text-[#5A6270] text-center">
                  No recent online orders yet. Place your first order to track it here.
                </div>
              ) : (
                <div className="space-y-2">
                  {orderHistory.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-3 rounded-lg border border-[#E6E8EC] flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-[#0F766E]" />
                        <div>
                          <div className="font-bold text-[#1A1D23] tabular-nums">#{ord.id}</div>
                          <div className="text-[#5A6270]">{ord.date}</div>
                        </div>
                      </div>
                      <span className="font-extrabold text-[#1A1D23] tabular-nums">
                        ${ord.total.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onToggleSignIn}
              className="w-full py-2.5 rounded-lg border border-[#D1D5DB] text-xs font-bold text-[#4B5563] hover:bg-[#F3F5F8]"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="mt-5 text-center space-y-4">
            <p className="text-sm text-[#5A6270]">
              Sign in with your Pantry Lane account to earn Lane Points, redeem $5 grocery offsets, and save your recurring shopping lists.
            </p>
            <button
              type="button"
              onClick={onToggleSignIn}
              className="w-full h-11 rounded-lg bg-[#0F766E] hover:bg-[#134E4A] text-white text-sm font-bold"
            >
              Sign In as Demo Member (1,280 Lane Points)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
