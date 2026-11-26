import React, { useMemo, useState } from 'react';
import {
  Check,
  ChefHat,
  ClipboardList,
  Heart,
  Minus,
  PackageCheck,
  Plus,
  Share2,
  ShoppingCart,
  Trash2,
  X,
} from 'lucide-react';
import {
  calculateScaledPacks,
  PANTRY_STAPLE_IDS,
  Product,
  PRODUCTS,
  RECIPES,
} from '../data/catalog';
import { PlannedMeal } from './MealPlannerSection';

interface ShoppingListDrawerProps {
  open: boolean;
  initialTab: 'list' | 'pantry' | 'saved';
  onClose: () => void;
  mealPlan: PlannedMeal[];
  pantryIds: string[];
  wishlist: string[];
  onUpdateMealServings: (recipeId: string, servings: number) => void;
  onRemoveMeal: (recipeId: string) => void;
  onTogglePantry: (productId: string) => void;
  onAddItemsToCart: (items: { productId: string; qty: number }[], label: string) => void;
  onAddSingleProduct: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  onShareFeedback: (msg: string) => void;
}

export const ShoppingListDrawer: React.FC<ShoppingListDrawerProps> = ({
  open,
  initialTab,
  onClose,
  mealPlan,
  pantryIds,
  wishlist,
  onUpdateMealServings,
  onRemoveMeal,
  onTogglePantry,
  onAddItemsToCart,
  onAddSingleProduct,
  onToggleWishlist,
  onShareFeedback,
}) => {
  const [tab, setTab] = useState<'list' | 'pantry' | 'saved'>(initialTab);
  const [pantrySearch, setPantrySearch] = useState('');

  React.useEffect(() => {
    if (open) setTab(initialTab);
  }, [open, initialTab]);

  const aggregatedList = useMemo(() => {
    const map = new Map<
      string,
      { product: Product; packs: number; usedIn: string[] }
    >();

    mealPlan.forEach((plan) => {
      const recipe = RECIPES.find((r) => r.id === plan.recipeId);
      if (!recipe) return;
      recipe.ingredients.forEach((ing) => {
        const product = PRODUCTS.find((p) => p.id === ing.productId);
        if (!product) return;
        const packs = calculateScaledPacks(
          ing.packsPerBase,
          recipe.baseServings,
          plan.servings
        );
        const existing = map.get(product.id);
        if (existing) {
          existing.packs += packs;
          if (!existing.usedIn.includes(recipe.title)) {
            existing.usedIn.push(recipe.title);
          }
        } else {
          map.set(product.id, {
            product,
            packs,
            usedIn: [recipe.title],
          });
        }
      });
    });

    const all = Array.from(map.values());
    const needToBuy = all.filter((i) => !pantryIds.includes(i.product.id));
    const alreadyHave = all.filter((i) => pantryIds.includes(i.product.id));
    const totalNeededCost = needToBuy.reduce(
      (sum, i) => sum + i.product.price * i.packs,
      0
    );

    return { needToBuy, alreadyHave, totalNeededCost };
  }, [mealPlan, pantryIds]);

  if (!open) return null;

  const pantryCatalog = PRODUCTS.filter((p) => {
    const isStaple = PANTRY_STAPLE_IDS.includes(p.id) || pantryIds.includes(p.id);
    if (pantrySearch.trim()) {
      const q = pantrySearch.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q)
      );
    }
    return isStaple;
  });

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleShareList = () => {
    const lines = [
      `My Pantry Lane Shopping List (${mealPlan.length} planned meals):`,
      ...aggregatedList.needToBuy.map(
        (i) => `- ${i.product.name} x${i.packs} ($${(i.product.price * i.packs).toFixed(2)})`
      ),
      `Estimated total: $${aggregatedList.totalNeededCost.toFixed(2)}`,
    ];
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(lines.join('\n')).catch(() => {});
    }
    onShareFeedback('Shopping list copied — ready to share with family or friends');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-[1px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        aria-label="Smart Shopping List and Pantry"
        className="relative w-full max-w-[460px] bg-white h-full shadow-2xl flex flex-col z-10"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E5E8EE] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-[#0F766E]" />
            <h2 className="text-base font-extrabold text-[#1A1D23]">
              Smart Shopping List &amp; Pantry
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping list"
            className="w-8 h-8 rounded-lg hover:bg-[#F3F5F8] flex items-center justify-center text-[#5A6270]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Clean Tabs */}
        <div className="px-5 pt-3 pb-2 border-b border-[#E5E8EE] bg-[#FAFBFD]">
          <div className="grid grid-cols-3 gap-1 p-1 bg-[#EDF0F5] rounded-lg">
            {[
              { id: 'list', label: `To Buy (${aggregatedList.needToBuy.length})` },
              { id: 'pantry', label: `My Pantry (${pantryIds.length})` },
              { id: 'saved', label: `Saved (${savedProducts.length})` },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id as typeof tab)}
                className={`py-1.5 rounded-md text-xs font-bold transition-colors whitespace-nowrap ${
                  tab === t.id
                    ? 'bg-white text-[#134E4A] shadow-xs'
                    : 'text-[#5A6270] hover:text-[#1A1D23]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {tab === 'list' && (
            <>
              {/* Planned Meals Summary */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-extrabold text-[#1A1D23]">
                    Planned Meals ({mealPlan.length})
                  </h3>
                  {aggregatedList.needToBuy.length > 0 && (
                    <button
                      type="button"
                      onClick={handleShareList}
                      className="text-xs font-bold text-[#0F766E] hover:underline flex items-center gap-1"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share List</span>
                    </button>
                  )}
                </div>

                {mealPlan.length === 0 ? (
                  <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E5E8EE] text-center">
                    <ChefHat className="w-7 h-7 text-[#94A3B8] mx-auto mb-2" />
                    <div className="text-sm font-bold text-[#1A1D23]">
                      No meals planned yet
                    </div>
                    <p className="text-xs text-[#5A6270] mt-1">
                      Tap “Add to Plan” on any recipe in the Meal Planner to automatically generate your shopping list.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {mealPlan.map((pm) => {
                      const rec = RECIPES.find((r) => r.id === pm.recipeId);
                      if (!rec) return null;
                      return (
                        <div
                          key={pm.recipeId}
                          className="p-2.5 rounded-xl border border-[#E5E8EE] flex items-center justify-between gap-2.5"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={rec.image}
                              alt={rec.title}
                              referrerPolicy="no-referrer"
                              className="w-11 h-11 rounded-lg object-cover shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-[#1A1D23] truncate">
                                {rec.title}
                              </div>
                              <div className="text-[11px] text-[#5A6270]">
                                {rec.prepTime}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <div className="inline-flex items-center border border-[#D4D9E2] rounded-md h-7 overflow-hidden">
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateMealServings(pm.recipeId, Math.max(1, pm.servings - 1))
                                }
                                aria-label="Decrease servings"
                                className="w-6 h-full flex items-center justify-center hover:bg-[#F3F5F8]"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-1.5 text-[11px] font-bold tabular-nums">
                                {pm.servings}p
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateMealServings(pm.recipeId, Math.min(12, pm.servings + 1))
                                }
                                aria-label="Increase servings"
                                className="w-6 h-full flex items-center justify-center hover:bg-[#F3F5F8]"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => onRemoveMeal(pm.recipeId)}
                              aria-label={`Remove ${rec.title} from meal plan`}
                              className="p-1 text-[#9CA3AF] hover:text-[#EA580C]"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Aggregated Need to Buy List */}
              {aggregatedList.needToBuy.length > 0 && (
                <div>
                  <h3 className="text-xs font-extrabold text-[#0F766E] mb-2">
                    Need to Buy ({aggregatedList.needToBuy.length} items)
                  </h3>
                  <div className="divide-y divide-[#EEF0F3] border border-[#E5E8EE] rounded-xl overflow-hidden">
                    {aggregatedList.needToBuy.map((item) => (
                      <div
                        key={item.product.id}
                        className="p-3 flex items-center justify-between gap-2.5 bg-white"
                      >
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#1A1D23] truncate">
                            {item.product.name}
                          </div>
                          <div className="text-[11px] text-[#5A6270] truncate">
                            Qty {item.packs} · For {item.usedIn.join(', ')}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs font-extrabold text-[#1A1D23] tabular-nums">
                            ${(item.product.price * item.packs).toFixed(2)}
                          </span>
                          <button
                            type="button"
                            onClick={() => onTogglePantry(item.product.id)}
                            className="px-2 py-1 rounded border border-[#D4D9E2] hover:border-[#15803D] text-[11px] font-semibold text-[#4B5563] hover:text-[#15803D] whitespace-nowrap"
                          >
                            Have it
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Already in Pantry (Skipped automatically) */}
              {aggregatedList.alreadyHave.length > 0 && (
                <div>
                  <h3 className="text-xs font-extrabold text-[#15803D] mb-2 flex items-center gap-1.5">
                    <PackageCheck className="w-3.5 h-3.5" />
                    <span>Already in Your Pantry ({aggregatedList.alreadyHave.length})</span>
                  </h3>
                  <div className="divide-y divide-[#E4F2E9] border border-[#DCEFE3] bg-[#F6FBF8] rounded-xl overflow-hidden">
                    {aggregatedList.alreadyHave.map((item) => (
                      <div
                        key={item.product.id}
                        className="px-3 py-2.5 flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Check className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                          <span className="text-xs text-[#374151] line-through truncate">
                            {item.product.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => onTogglePantry(item.product.id)}
                          className="text-[11px] font-bold text-[#0F766E] hover:underline whitespace-nowrap shrink-0"
                        >
                          Buy instead
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {tab === 'pantry' && (
            <div className="space-y-3">
              <p className="text-xs text-[#5A6270] leading-relaxed">
                Tick groceries you already have at home. Every recipe and generated shopping list will automatically skip them so you never double-buy.
              </p>

              <input
                type="text"
                value={pantrySearch}
                onChange={(e) => setPantrySearch(e.target.value)}
                placeholder="Search any grocery item to mark as already at home..."
                className="w-full h-9 px-3 rounded-lg border border-[#D4D9E2] text-xs outline-none focus:border-[#0F766E]"
              />

              <div className="divide-y divide-[#EEF0F3] border border-[#E5E8EE] rounded-xl overflow-hidden">
                {pantryCatalog.map((prod) => {
                  const hasIt = pantryIds.includes(prod.id);
                  return (
                    <label
                      key={prod.id}
                      className={`p-3 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                        hasIt ? 'bg-[#F6FBF8]' : 'bg-white hover:bg-[#FAFBFD]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <input
                          type="checkbox"
                          checked={hasIt}
                          onChange={() => onTogglePantry(prod.id)}
                          className="w-4 h-4 accent-[#15803D] shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#1A1D23] truncate">
                            {prod.name}
                          </div>
                          <div className="text-[11px] text-[#5A6270]">
                            {prod.packSize} · ${prod.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`text-[11px] font-bold shrink-0 ${
                          hasIt ? 'text-[#15803D]' : 'text-[#9CA3AF]'
                        }`}
                      >
                        {hasIt ? 'At home' : 'Not stocked'}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {tab === 'saved' && (
            <div className="space-y-3">
              {savedProducts.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#5A6270]">
                  <Heart className="w-6 h-6 mx-auto mb-2 text-[#94A3B8]" />
                  No saved items yet. Tap the heart icon on any product for quick reordering.
                </div>
              ) : (
                <div className="divide-y divide-[#EEF0F3] border border-[#E5E8EE] rounded-xl overflow-hidden">
                  {savedProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-3 flex items-center justify-between gap-3 bg-white"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-lg border border-[#EEF0F3] object-contain p-0.5 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#1A1D23] truncate">
                            {prod.name}
                          </div>
                          <div className="text-[11px] text-[#5A6270] tabular-nums">
                            ${prod.price.toFixed(2)} · {prod.packSize}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => onAddSingleProduct(prod)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#0F766E] hover:bg-[#134E4A] text-white text-[11px] font-bold"
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          onClick={() => onToggleWishlist(prod.id)}
                          aria-label={`Remove ${prod.name} from saved`}
                          className="p-1 text-[#9CA3AF] hover:text-[#EA580C]"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sticky Checkout Footer for Shopping List Tab */}
        {tab === 'list' && aggregatedList.needToBuy.length > 0 && (
          <div className="p-5 bg-white border-t border-[#E5E8EE] space-y-2.5">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-semibold text-[#5A6270]">
                Missing Ingredients Total ({aggregatedList.needToBuy.length} items)
              </span>
              <span className="text-lg font-extrabold text-[#134E4A] tabular-nums">
                ${aggregatedList.totalNeededCost.toFixed(2)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                onAddItemsToCart(
                  aggregatedList.needToBuy.map((i) => ({
                    productId: i.product.id,
                    qty: i.packs,
                  })),
                  `All ${aggregatedList.needToBuy.length} shopping list items`
                );
                onClose();
              }}
              className="w-full h-11 rounded-lg bg-[#0F766E] hover:bg-[#134E4A] text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add All Needed Items to Cart</span>
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
