import React, { useEffect, useState } from 'react';
import {
  Check,
  Clock,
  Minus,
  PackageCheck,
  Plus,
  Share2,
  ShoppingCart,
  Wine,
  X,
} from 'lucide-react';
import {
  calculateScaledPacks,
  formatScaledAmount,
  Product,
  PRODUCTS,
  RecipeItem,
} from '../data/catalog';

interface RecipeDetailModalProps {
  recipe: RecipeItem | null;
  initialServings?: number;
  isPlanned: boolean;
  pantryIds: string[];
  onClose: () => void;
  onTogglePantry: (productId: string) => void;
  onToggleMealInPlan: (recipe: RecipeItem, servings: number) => void;
  onAddItemsToCart: (items: { productId: string; qty: number }[], label: string) => void;
  onAddSingleProduct: (product: Product) => void;
  onShareFeedback: (msg: string) => void;
}

const PORTION_PRESETS = [1, 2, 4, 6, 8];

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  initialServings,
  isPlanned,
  pantryIds,
  onClose,
  onTogglePantry,
  onToggleMealInPlan,
  onAddItemsToCart,
  onAddSingleProduct,
  onShareFeedback,
}) => {
  const [servings, setServings] = useState<number>(initialServings ?? recipe?.baseServings ?? 4);

  useEffect(() => {
    if (recipe) {
      setServings(initialServings ?? recipe.baseServings);
    }
  }, [recipe, initialServings]);

  if (!recipe) return null;

  const resolvedIngredients = recipe.ingredients.map((ing) => {
    const product = PRODUCTS.find((p) => p.id === ing.productId);
    const scaledAmount = formatScaledAmount(ing.baseAmount, recipe.baseServings, servings);
    const scaledPacks = calculateScaledPacks(ing.packsPerBase, recipe.baseServings, servings);
    const inPantry = pantryIds.includes(ing.productId);
    const lineCost = product ? product.price * scaledPacks : 0;
    return {
      ...ing,
      product,
      scaledAmount,
      scaledPacks,
      inPantry,
      lineCost,
    };
  });

  const needToBuy = resolvedIngredients.filter((i) => !i.inPantry && i.product);
  const alreadyHave = resolvedIngredients.filter((i) => i.inPantry && i.product);
  const missingSubtotal = needToBuy.reduce((sum, i) => sum + i.lineCost, 0);
  const savedByPantry = alreadyHave.reduce((sum, i) => sum + i.lineCost, 0);

  const pairedWine = recipe.recommendedWineId
    ? PRODUCTS.find((p) => p.id === recipe.recommendedWineId)
    : null;

  const handleShare = () => {
    const listText = [
      `Pantry Lane Recipe: ${recipe.title} (${servings} servings)`,
      `Need to buy:`,
      ...needToBuy.map(
        (i) => `- ${i.label}: ${i.scaledAmount} ${i.unit} (${i.scaledPacks} pack${i.scaledPacks > 1 ? 's' : ''})`
      ),
    ].join('\n');

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(listText).catch(() => {});
    }
    onShareFeedback(`Copied "${recipe.title}" (${servings} servings) to share with friends`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/55 backdrop-blur-[1px]" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={recipe.title}
        className="relative bg-white rounded-2xl max-w-[920px] w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10"
      >
        {/* Top Close & Share Controls */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-xs border-b border-[#E5E8EE] px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-lg font-extrabold text-[#1A1D23] truncate">
              {recipe.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-[#5A6270] mt-0.5">
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {recipe.prepTime}
              </span>
              <span aria-hidden="true">·</span>
              <span>{recipe.difficulty}</span>
              <span aria-hidden="true">·</span>
              <span>{recipe.tags.celebrityChef}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleShare}
              className="h-9 px-3 rounded-lg border border-[#D4D9E2] hover:border-[#0F766E] text-xs font-bold text-[#374151] hover:text-[#0F766E] flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share Recipe</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close recipe details"
              className="w-9 h-9 rounded-lg hover:bg-[#F3F5F8] flex items-center justify-center text-[#5A6270]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
          {/* Left Column: Photo, Portion Control & Cooking Steps */}
          <div className="lg:col-span-6 space-y-5">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#F1F5F9]">
              <img
                src={recipe.image}
                alt={recipe.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-[#4B5563] leading-relaxed">
              {recipe.description}
            </p>

            {/* Cooking Steps */}
            <div>
              <h3 className="text-sm font-extrabold text-[#1A1D23] mb-3">
                Method ({recipe.steps.length} steps)
              </h3>
              <ol className="space-y-2.5">
                {recipe.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-[13px] text-[#374151] leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-[#F0FDFA] text-[#0F766E] font-extrabold text-[11px] flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Optional Sommelier Pairing */}
            {pairedWine && (
              <div className="p-3.5 rounded-xl bg-[#FAFBFD] border border-[#E5E8EE] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-[#FFF1F2] text-[#9F1239] flex items-center justify-center shrink-0">
                    <Wine className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-[#9F1239]">
                      Suggested Pairing
                    </div>
                    <div className="text-xs font-bold text-[#1A1D23] truncate">
                      {pairedWine.name}
                    </div>
                    <div className="text-[11px] text-[#5A6270] tabular-nums">
                      ${pairedWine.price.toFixed(2)} · {pairedWine.packSize}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onAddSingleProduct(pairedWine)}
                  className="px-3 py-1.5 rounded-lg border border-[#0F766E] text-[#0F766E] hover:bg-[#0F766E] hover:text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0"
                >
                  + Add
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Dynamic Portion Adjuster + What to Buy vs Already Have */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Portion Control Box */}
            <div className="p-4 rounded-xl bg-[#F0FDFA] border border-[#CCFBF1]">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div>
                  <div className="text-xs font-extrabold text-[#134E4A]">
                    Adjust Portions
                  </div>
                  <div className="text-[11px] text-[#4B5563]">
                    Ingredient amounts &amp; grocery packs scale automatically
                  </div>
                </div>
                <div className="inline-flex items-center bg-white border border-[#99E6D8] rounded-lg h-8 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setServings((s) => Math.max(1, s - 1))}
                    aria-label="Decrease servings"
                    className="w-8 h-full flex items-center justify-center text-[#0F766E] hover:bg-[#E6FAF6]"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2.5 text-sm font-extrabold text-[#134E4A] tabular-nums">
                    {servings}
                  </span>
                  <button
                    type="button"
                    onClick={() => setServings((s) => Math.min(12, s + 1))}
                    aria-label="Increase servings"
                    className="w-8 h-full flex items-center justify-center text-[#0F766E] hover:bg-[#E6FAF6]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {PORTION_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setServings(preset)}
                    className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-colors tabular-nums ${
                      servings === preset
                        ? 'bg-[#0F766E] text-white'
                        : 'bg-white text-[#374151] hover:text-[#0F766E]'
                    }`}
                  >
                    {preset} {preset === 1 ? 'pax' : 'pax'}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Ingredients Checklist: Need to Buy vs Already Have */}
            <div className="mt-4 flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-[#1A1D23]">
                  Ingredients for {servings} {servings === 1 ? 'serving' : 'servings'}
                </h3>
                <span className="text-[11px] text-[#5A6270]">
                  Tick what you already have
                </span>
              </div>

              {/* Need to Buy List */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-[#0F766E] flex items-center justify-between">
                  <span>Need to Buy ({needToBuy.length})</span>
                  <span className="tabular-nums">${missingSubtotal.toFixed(2)}</span>
                </div>

                {needToBuy.length === 0 ? (
                  <div className="p-3 rounded-lg bg-[#ECFDF3] text-xs text-[#15803D] font-semibold flex items-center gap-2">
                    <PackageCheck className="w-4 h-4 shrink-0" />
                    <span>You already have every ingredient in your pantry!</span>
                  </div>
                ) : (
                  <div className="divide-y divide-[#F1F3F6] border border-[#E5E8EE] rounded-xl overflow-hidden">
                    {needToBuy.map((item) => (
                      <div
                        key={item.productId}
                        className="p-3 flex items-center justify-between gap-3 bg-white"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={item.product!.image}
                            alt={item.product!.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-lg border border-[#EEF0F3] object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[#1A1D23] truncate">
                              {item.label}
                            </div>
                            <div className="text-[11px] text-[#5A6270] tabular-nums">
                              Need {item.scaledAmount} {item.unit} · {item.scaledPacks} pack
                              {item.scaledPacks > 1 ? 's' : ''} ({item.product!.packSize})
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 shrink-0">
                          <span className="text-xs font-extrabold text-[#1A1D23] tabular-nums">
                            ${item.lineCost.toFixed(2)}
                          </span>
                          <button
                            type="button"
                            onClick={() => onTogglePantry(item.productId)}
                            className="px-2 py-1 rounded-md border border-[#D4D9E2] hover:border-[#15803D] text-[11px] font-semibold text-[#4B5563] hover:text-[#15803D] whitespace-nowrap transition-colors"
                          >
                            Have it
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Already Have in Pantry List */}
              {alreadyHave.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-[#15803D] flex items-center justify-between">
                    <span>Already in Your Pantry ({alreadyHave.length})</span>
                    <span className="tabular-nums">Saving ~${savedByPantry.toFixed(2)}</span>
                  </div>
                  <div className="divide-y divide-[#EEF0F3] border border-[#DCEFE3] bg-[#F6FBF8] rounded-xl overflow-hidden">
                    {alreadyHave.map((item) => (
                      <div
                        key={item.productId}
                        className="px-3 py-2.5 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-5 h-5 rounded-full bg-[#15803D] text-white flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3" />
                          </span>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-[#374151] line-through truncate">
                              {item.label}
                            </div>
                            <div className="text-[11px] text-[#5A6270] tabular-nums">
                              Using {item.scaledAmount} {item.unit} from home
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => onTogglePantry(item.productId)}
                          className="text-[11px] font-bold text-[#0F766E] hover:underline whitespace-nowrap shrink-0"
                        >
                          Need to buy
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 pt-4 border-t border-[#E5E8EE] space-y-2.5">
              {needToBuy.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    onAddItemsToCart(
                      needToBuy.map((i) => ({
                        productId: i.productId,
                        qty: i.scaledPacks,
                      })),
                      `${needToBuy.length} missing ingredients for ${recipe.title}`
                    );
                    onClose();
                  }}
                  className="w-full h-11 rounded-lg bg-[#0F766E] hover:bg-[#134E4A] text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="tabular-nums">
                    Add {needToBuy.length} Missing {needToBuy.length === 1 ? 'Item' : 'Items'} to Cart · ${missingSubtotal.toFixed(2)}
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={() => onToggleMealInPlan(recipe, servings)}
                className={`w-full h-10 rounded-lg border text-xs font-bold transition-colors ${
                  isPlanned
                    ? 'border-[#15803D] bg-[#ECFDF3] text-[#15803D]'
                    : 'border-[#0F766E] text-[#0F766E] hover:bg-[#F0FDFA]'
                }`}
              >
                {isPlanned
                  ? `Saved in Weekly Meal Plan (${servings} servings) · Click to Remove`
                  : `Add to Weekly Meal Plan (${servings} servings)`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
