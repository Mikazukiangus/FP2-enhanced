import React, { useMemo, useState } from 'react';
import {
  Check,
  ClipboardList,
  Minus,
  PackageCheck,
  Plus,
  Search,
  X,
} from 'lucide-react';
import {
  PRODUCTS,
  RecipeItem,
  RECIPES,
} from '../data/catalog';

export interface PlannedMeal {
  recipeId: string;
  servings: number;
}

interface MealPlannerSectionProps {
  mealPlan: PlannedMeal[];
  pantryIds: string[];
  shoppingListNeededCount: number;
  onToggleMealInPlan: (recipe: RecipeItem, servings: number) => void;
  onUpdateMealServings: (recipeId: string, servings: number) => void;
  onSelectRecipe: (recipe: RecipeItem, initialServings?: number) => void;
  onOpenShoppingList: (tab?: 'list' | 'pantry' | 'saved') => void;
}

type AccordionKey =
  | 'quickMeals'
  | 'mainIngredient'
  | 'meals'
  | 'occasions'
  | 'healthyLifestyles'
  | 'celebrityChef';

const FILTER_GROUPS: {
  key: AccordionKey;
  label: string;
  options: string[];
}[] = [
  {
    key: 'quickMeals',
    label: 'Quick Meals',
    options: ['Under 15 mins', 'Under 30 mins', 'One-Pot', 'Air-Fryer'],
  },
  {
    key: 'mainIngredient',
    label: 'Main Ingredient',
    options: ['Seafood', 'Pork', 'Eggs & Tofu'],
  },
  {
    key: 'meals',
    label: 'Meals',
    options: ['Lunch', 'Dinner', 'Comfort Food'],
  },
  {
    key: 'occasions',
    label: 'Occasions',
    options: ['Weeknight Dinner', 'Family Gathering', 'Meal Prep'],
  },
  {
    key: 'healthyLifestyles',
    label: 'Healthy Lifestyles',
    options: ['Healthier Choice', 'High Protein', 'Low Carb', 'Balanced'],
  },
  {
    key: 'celebrityChef',
    label: 'The Celebrity Chefs',
    options: ['Chef Melvyn Lee', 'Chef Violet Oon Style', 'Home Cook Favourites'],
  },
];

export const MealPlannerSection: React.FC<MealPlannerSectionProps> = ({
  mealPlan,
  pantryIds,
  shoppingListNeededCount,
  onToggleMealInPlan,
  onUpdateMealServings,
  onSelectRecipe,
  onOpenShoppingList,
}) => {
  const [recipeSearch, setRecipeSearch] = useState('');
  const [openGroups, setOpenGroups] = useState<AccordionKey[]>(['quickMeals', 'mainIngredient']);
  const [selectedFilters, setSelectedFilters] = useState<Record<AccordionKey, string | null>>({
    quickMeals: null,
    mainIngredient: null,
    meals: null,
    occasions: null,
    healthyLifestyles: null,
    celebrityChef: null,
  });

  // Per-card local portion preview before/during planning
  const [cardServings, setCardServings] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    RECIPES.forEach((r) => {
      initial[r.id] = r.baseServings;
    });
    return initial;
  });

  const toggleGroup = (key: AccordionKey) => {
    setOpenGroups((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const toggleFilterOption = (key: AccordionKey, option: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: prev[key] === option ? null : option,
    }));
  };

  const activeFilterCount = Object.values(selectedFilters).filter(Boolean).length;

  const resetFilters = () => {
    setRecipeSearch('');
    setSelectedFilters({
      quickMeals: null,
      mainIngredient: null,
      meals: null,
      occasions: null,
      healthyLifestyles: null,
      celebrityChef: null,
    });
  };

  const filteredRecipes = useMemo(() => {
    const q = recipeSearch.trim().toLowerCase();
    return RECIPES.filter((recipe) => {
      if (q) {
        const matchesQuery =
          recipe.title.toLowerCase().includes(q) ||
          recipe.tagline.toLowerCase().includes(q) ||
          recipe.description.toLowerCase().includes(q) ||
          recipe.tags.mainIngredient.toLowerCase().includes(q) ||
          recipe.ingredients.some((i) => i.label.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      if (
        selectedFilters.quickMeals &&
        !recipe.tags.quickMeals.includes(selectedFilters.quickMeals)
      ) {
        return false;
      }
      if (
        selectedFilters.mainIngredient &&
        recipe.tags.mainIngredient !== selectedFilters.mainIngredient
      ) {
        return false;
      }
      if (selectedFilters.meals && !recipe.tags.meals.includes(selectedFilters.meals)) {
        return false;
      }
      if (
        selectedFilters.occasions &&
        !recipe.tags.occasions.includes(selectedFilters.occasions)
      ) {
        return false;
      }
      if (
        selectedFilters.healthyLifestyles &&
        !recipe.tags.healthyLifestyles.includes(selectedFilters.healthyLifestyles)
      ) {
        return false;
      }
      if (
        selectedFilters.celebrityChef &&
        recipe.tags.celebrityChef !== selectedFilters.celebrityChef
      ) {
        return false;
      }
      return true;
    });
  }, [recipeSearch, selectedFilters]);

  const getServingsForRecipe = (recipe: RecipeItem) => {
    const planned = mealPlan.find((m) => m.recipeId === recipe.id);
    if (planned) return planned.servings;
    return cardServings[recipe.id] ?? recipe.baseServings;
  };

  const handleAdjustCardServings = (recipe: RecipeItem, delta: number) => {
    const current = getServingsForRecipe(recipe);
    const next = Math.max(1, Math.min(12, current + delta));
    setCardServings((prev) => ({ ...prev, [recipe.id]: next }));
    const isPlanned = mealPlan.some((m) => m.recipeId === recipe.id);
    if (isPlanned) {
      onUpdateMealServings(recipe.id, next);
    }
  };

  return (
    <div className="space-y-5">
      {/* Compact Smart Meal Plan & Pantry Status Bar */}
      <div className="bg-white rounded-xl border border-[#E5E8EE] px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm">
          <span className="font-extrabold text-[#134E4A]">
            Smart Meal Planner
          </span>
          <span aria-hidden="true" className="text-[#CBD5E1]">·</span>
          <span className="text-[#4B5563] tabular-nums">
            <strong className="text-[#1A1D23]">{mealPlan.length}</strong>{' '}
            {mealPlan.length === 1 ? 'meal' : 'meals'} planned
          </span>
          <span aria-hidden="true" className="text-[#CBD5E1]">·</span>
          <span className="text-[#4B5563] tabular-nums">
            <strong className="text-[#0F766E]">{shoppingListNeededCount}</strong> items to buy
          </span>
          <span aria-hidden="true" className="text-[#CBD5E1]">·</span>
          <span className="text-[#15803D] font-medium tabular-nums">
            {pantryIds.length} staples in your pantry
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onOpenShoppingList('pantry')}
            className="h-9 px-3.5 rounded-lg border border-[#D4D9E2] hover:border-[#0F766E] bg-white text-xs font-bold text-[#1A1D23] hover:text-[#0F766E] flex items-center gap-1.5 transition-colors whitespace-nowrap"
          >
            <PackageCheck className="w-3.5 h-3.5 text-[#0F766E]" />
            <span>What I Already Have</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenShoppingList('list')}
            className="h-9 px-4 rounded-lg bg-[#0F766E] hover:bg-[#134E4A] text-white text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap"
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>
              Shopping List ({shoppingListNeededCount})
            </span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Wireframe Grid: 3-Col Recipes Left + Filter Sidebar Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 3-Column Editorial Recipe Cards */}
        <div className="lg:col-span-9">
          {filteredRecipes.length === 0 ? (
            <div className="bg-white rounded-xl border border-[#E5E8EE] p-10 text-center">
              <h3 className="text-base font-bold text-[#1A1D23]">
                No recipes match your current filters
              </h3>
              <p className="text-sm text-[#5A6270] mt-1">
                Try clearing a category filter or searching another ingredient.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 px-4 py-2 rounded-lg bg-[#0F766E] text-white text-xs font-bold hover:bg-[#134E4A]"
              >
                Reset Recipe Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredRecipes.map((recipe) => {
                const servings = getServingsForRecipe(recipe);
                const isPlanned = mealPlan.some((m) => m.recipeId === recipe.id);

                // Count how many ingredients are already in pantry vs need to buy
                const alreadyHaveCount = recipe.ingredients.filter((ing) =>
                  pantryIds.includes(ing.productId)
                ).length;
                const needToBuyCount = recipe.ingredients.length - alreadyHaveCount;

                // Estimate cost for missing items at current servings
                const estimatedMissingCost = recipe.ingredients.reduce((sum, ing) => {
                  if (pantryIds.includes(ing.productId)) return sum;
                  const prod = PRODUCTS.find((p) => p.id === ing.productId);
                  if (!prod) return sum;
                  const packs = Math.max(
                    1,
                    Math.ceil((ing.packsPerBase * servings) / recipe.baseServings)
                  );
                  return sum + prod.price * packs;
                }, 0);

                return (
                  <article
                    key={recipe.id}
                    className={`group bg-white rounded-xl border transition-all duration-150 flex flex-col overflow-hidden ${
                      isPlanned
                        ? 'border-[#0F766E] ring-1 ring-[#0F766E]/20'
                        : 'border-[#E5E8EE] hover:border-[#0F766E]/50 hover:shadow-[0_4px_16px_rgba(15,118,110,0.08)]'
                    }`}
                  >
                    {/* 4:3 Dish Photo */}
                    <button
                      type="button"
                      onClick={() => onSelectRecipe(recipe, servings)}
                      className="relative aspect-[4/3] w-full overflow-hidden bg-[#F1F5F9] focus-visible:outline-none"
                    >
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-200"
                      />
                    </button>

                    {/* Clean Compact Recipe Info */}
                    <div className="p-4 flex-1 flex flex-col">
                      <button
                        type="button"
                        onClick={() => onSelectRecipe(recipe, servings)}
                        className="text-left text-[15px] font-extrabold text-[#134E4A] group-hover:text-[#0F766E] leading-snug transition-colors"
                      >
                        {recipe.title}
                      </button>

                      <p className="text-xs text-[#4B5563] mt-1 leading-relaxed line-clamp-2">
                        {recipe.tagline}
                      </p>

                      {/* Unboxed Metadata: Prep · Pantry Status · Est. Cost */}
                      <div className="mt-2.5 flex items-center flex-wrap gap-x-1.5 gap-y-0.5 text-[11px] text-[#5A6270] tabular-nums">
                        <span>{recipe.prepTime}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#15803D] font-medium">
                          {alreadyHaveCount} in pantry
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {needToBuyCount} to buy (~${estimatedMissingCost.toFixed(2)})
                        </span>
                      </div>

                      {/* Inline Portion Adjuster (Solves "don't have a change in portions") */}
                      <div className="mt-3 pt-2.5 border-t border-[#F1F3F6] flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold text-[#5A6270]">
                          Portions
                        </span>
                        <div className="inline-flex items-center border border-[#D4D9E2] rounded-lg h-7 overflow-hidden bg-[#FAFBFD]">
                          <button
                            type="button"
                            onClick={() => handleAdjustCardServings(recipe, -1)}
                            aria-label={`Decrease servings for ${recipe.title}`}
                            className="w-7 h-full flex items-center justify-center text-[#374151] hover:bg-[#E6FAF6] hover:text-[#0F766E] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-[#1A1D23] tabular-nums whitespace-nowrap">
                            {servings} {servings === 1 ? 'serving' : 'servings'}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAdjustCardServings(recipe, 1)}
                            aria-label={`Increase servings for ${recipe.title}`}
                            className="w-7 h-full flex items-center justify-center text-[#374151] hover:bg-[#E6FAF6] hover:text-[#0F766E] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Clean Action Row: Read More + Add to Meal Plan */}
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => onSelectRecipe(recipe, servings)}
                          className="h-9 px-3 rounded-lg border border-[#0F766E] text-[#0F766E] hover:bg-[#F0FDFA] text-xs font-bold transition-colors whitespace-nowrap"
                        >
                          Read More
                        </button>
                        <button
                          type="button"
                          onClick={() => onToggleMealInPlan(recipe, servings)}
                          className={`h-9 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-colors whitespace-nowrap ${
                            isPlanned
                              ? 'bg-[#134E4A] text-white hover:bg-[#0F766E]'
                              : 'bg-[#0F766E] text-white hover:bg-[#134E4A]'
                          }`}
                        >
                          {isPlanned ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>In Plan</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add to Plan</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Recipe Search & Accordion Filter Sidebar (Matches Wireframe) */}
        <aside className="lg:col-span-3 bg-white rounded-xl border border-[#E5E8EE] p-4 lg:sticky lg:top-20">
          {/* Search for recipe */}
          <div className="relative">
            <input
              type="text"
              value={recipeSearch}
              onChange={(e) => setRecipeSearch(e.target.value)}
              placeholder="Search for recipe"
              aria-label="Search for recipe"
              className="w-full h-10 pl-3.5 pr-9 rounded-lg border border-[#D4D9E2] bg-[#FAFBFD] focus:bg-white focus:border-[#0F766E] outline-none text-xs sm:text-sm text-[#1A1D23] placeholder:text-[#6B7280]"
            />
            {recipeSearch ? (
              <button
                type="button"
                onClick={() => setRecipeSearch('')}
                aria-label="Clear recipe search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1A1D23]"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <Search className="w-4 h-4 text-[#6B7280] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            )}
          </div>

          {activeFilterCount > 0 && (
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-[#5A6270] tabular-nums">
                {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
              </span>
              <button
                type="button"
                onClick={resetFilters}
                className="font-bold text-[#0F766E] hover:underline"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Expandable + Accordion Categories */}
          <div className="mt-3 divide-y divide-[#E5E8EE]">
            {FILTER_GROUPS.map((group) => {
              const isOpen = openGroups.includes(group.key);
              const selectedVal = selectedFilters[group.key];

              return (
                <div key={group.key} className="py-2.5">
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.key)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-2 text-left text-xs sm:text-[13px] font-semibold text-[#1A1D23] hover:text-[#0F766E] transition-colors py-0.5"
                  >
                    <span className="flex items-center gap-2">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-[#5A6270] shrink-0" />
                      )}
                      <span>{group.label}</span>
                    </span>
                    {selectedVal && (
                      <span className="text-[11px] font-bold text-[#0F766E] truncate max-w-[90px]">
                        {selectedVal}
                      </span>
                    )}
                  </button>

                  {isOpen && (
                    <div className="mt-2 pl-5 space-y-1">
                      {group.options.map((option) => {
                        const active = selectedVal === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => toggleFilterOption(group.key, option)}
                            className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-colors flex items-center justify-between ${
                              active
                                ? 'bg-[#F0FDFA] text-[#0F766E] font-bold'
                                : 'text-[#4B5563] hover:bg-[#F8FAFC] hover:text-[#1A1D23]'
                            }`}
                          >
                            <span>{option}</span>
                            {active && <Check className="w-3.5 h-3.5 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
};
