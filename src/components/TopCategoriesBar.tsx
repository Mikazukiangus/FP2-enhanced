import React from 'react';
import {
  Apple,
  Cookie,
  Croissant,
  CupSoda,
  Fish,
  HeartPulse,
  Leaf,
  Milk,
  ShieldCheck,
  Sparkles,
  Tag,
  Wheat,
  Wine,
} from 'lucide-react';
import { Category, TOP_CATEGORIES } from '../data/catalog';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: ShieldCheck,
  leaf: Leaf,
  wine: Wine,
  'heart-pulse': HeartPulse,
  apple: Apple,
  fish: Fish,
  milk: Milk,
  cup: CupSoda,
  wheat: Wheat,
  croissant: Croissant,
  cookie: Cookie,
  sparkles: Sparkles,
};

interface TopCategoriesBarProps {
  activeCategoryId: string | null;
  onSelectCategory: (category: Category) => void;
}

export const TopCategoriesBar: React.FC<TopCategoriesBarProps> = ({
  activeCategoryId,
  onSelectCategory,
}) => {
  return (
    <section
      aria-label="Top categories"
      className="bg-[#F8FAFC] border-b border-[#E5E8EE]"
    >
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold text-[#374151] tracking-tight">
            Top categories
          </h2>
          <span className="text-[11px] text-[#6B7280] hidden sm:inline">
            Jump straight into any aisle or dietary preference
          </span>
        </div>

        <div className="flex items-start gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-0.5">
          {TOP_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.iconKey] || Tag;
            const isSelected = activeCategoryId === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className="group flex flex-col items-center text-center w-[76px] sm:w-[88px] shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] rounded-lg py-1"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-150 ${
                    isSelected
                      ? 'bg-[#0F766E] text-white ring-2 ring-[#0F766E]/30 shadow-sm'
                      : `${cat.accentBg} ${cat.accentText} bg-white border border-[#E5E8EE] group-hover:border-[#0F766E] group-hover:-translate-y-0.5`
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`mt-1.5 text-[11px] leading-tight line-clamp-2 transition-colors ${
                    isSelected
                      ? 'font-bold text-[#0F766E]'
                      : 'font-medium text-[#374151] group-hover:text-[#0F766E]'
                  }`}
                >
                  {cat.shortName}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
