import React from 'react';
import { ChevronUp } from 'lucide-react';
import { ActivePage } from './Header';

interface FooterProps {
  onNavigate: (page: ActivePage, categoryId?: string | null) => void;
  onSelectIntent: (intent: 'meal-planner' | 'promos' | 'limited-time' | 'vouchers' | 'wine-list') => void;
  onOpenStoreLocator: () => void;
  onOpenAccount: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectIntent,
  onOpenStoreLocator,
  onOpenAccount,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-14 bg-white border-t border-[#E5E8EE]">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-10 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Column 1: Help & Brand Links */}
        <div>
          <div className="text-base font-extrabold tracking-tight mb-3">
            <span className="text-[#134E4A]">Pantry </span>
            <span className="text-[#EA580C]">Lane</span>
          </div>
          <ul className="space-y-2 text-xs text-[#0F766E] font-medium">
            <li>
              <button type="button" onClick={onOpenAccount} className="hover:underline">
                Help Centre
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onSelectIntent('meal-planner')} className="hover:underline">
                Meal Planner &amp; Recipes
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onSelectIntent('vouchers')} className="hover:underline">
                Send E-Gift Vouchers
              </button>
            </li>
            <li>
              <button type="button" onClick={onOpenAccount} className="hover:underline">
                Shop for Business
              </button>
            </li>
          </ul>
        </div>

        {/* Column 2: Memberships */}
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#374151] mb-3">
            Memberships
          </h4>
          <ul className="space-y-2 text-xs text-[#0F766E] font-medium">
            <li>
              <button type="button" onClick={() => onNavigate('digital-club')} className="hover:underline">
                Lane Plus
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onSelectIntent('wine-list')} className="hover:underline">
                Wine List &amp; Pairings
              </button>
            </li>
            <li>
              <button type="button" onClick={onOpenAccount} className="hover:underline">
                Lane Rewards
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Our Stores */}
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#374151] mb-3">
            Our Stores
          </h4>
          <ul className="space-y-2 text-xs text-[#0F766E] font-medium">
            <li>
              <button type="button" onClick={() => onSelectIntent('promos')} className="hover:underline">
                Weekly Promotions
              </button>
            </li>
            <li>
              <button type="button" onClick={onOpenStoreLocator} className="hover:underline">
                Store Locator
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onSelectIntent('limited-time')} className="hover:underline">
                Limited Time Specials
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('digital-club')} className="hover:underline">
                Greater Value &amp; Savings
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Secure Payment Methods */}
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#374151] mb-3">
            Secure Payment Methods
          </h4>
          <div className="flex flex-wrap gap-1.5 text-[11px] font-bold text-[#374151]">
            <span className="px-2 py-1 rounded border border-[#E2E6EC] bg-[#FAFBFD]">VISA</span>
            <span className="px-2 py-1 rounded border border-[#E2E6EC] bg-[#FAFBFD]">Mastercard</span>
            <span className="px-2 py-1 rounded border border-[#E2E6EC] bg-[#FAFBFD]">PayNow</span>
            <span className="px-2 py-1 rounded border border-[#E2E6EC] bg-[#FAFBFD]">Apple Pay</span>
            <span className="px-2 py-1 rounded border border-[#E2E6EC] bg-[#FAFBFD]">G Pay</span>
          </div>
          <p className="text-[11px] text-[#6B7280] mt-3 leading-relaxed">
            Customer Relations: +65 6000 0000 (Daily 8am – 10pm)
          </p>
        </div>

        {/* Column 5: Download Our App QR + Back to Top */}
        <div className="flex flex-col items-start justify-between">
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#374151] mb-2.5">
              Download Our App
            </h4>
            <div className="p-2 rounded-lg border border-[#E5E8EE] bg-white inline-block">
              <svg
                width="76"
                height="76"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Scan QR code to get the Pantry Lane mobile app"
              >
                <rect width="21" height="21" fill="#FFFFFF" />
                {/* Top-left finder */}
                <rect x="1" y="1" width="6" height="6" fill="#134E4A" />
                <rect x="2" y="2" width="4" height="4" fill="#FFFFFF" />
                <rect x="3" y="3" width="2" height="2" fill="#134E4A" />
                {/* Top-right finder */}
                <rect x="14" y="1" width="6" height="6" fill="#134E4A" />
                <rect x="15" y="2" width="4" height="4" fill="#FFFFFF" />
                <rect x="16" y="3" width="2" height="2" fill="#134E4A" />
                {/* Bottom-left finder */}
                <rect x="1" y="14" width="6" height="6" fill="#134E4A" />
                <rect x="2" y="15" width="4" height="4" fill="#FFFFFF" />
                <rect x="3" y="16" width="2" height="2" fill="#134E4A" />
                {/* Data matrix modules */}
                <rect x="9" y="1" width="1" height="2" fill="#134E4A" />
                <rect x="11" y="2" width="2" height="1" fill="#134E4A" />
                <rect x="9" y="5" width="3" height="2" fill="#134E4A" />
                <rect x="1" y="9" width="2" height="2" fill="#134E4A" />
                <rect x="5" y="9" width="3" height="1" fill="#134E4A" />
                <rect x="9" y="9" width="3" height="3" fill="#EA580C" />
                <rect x="14" y="9" width="2" height="2" fill="#134E4A" />
                <rect x="18" y="9" width="2" height="3" fill="#134E4A" />
                <rect x="9" y="14" width="2" height="2" fill="#134E4A" />
                <rect x="13" y="13" width="2" height="2" fill="#134E4A" />
                <rect x="16" y="14" width="4" height="2" fill="#134E4A" />
                <rect x="9" y="18" width="3" height="2" fill="#134E4A" />
                <rect x="14" y="17" width="2" height="3" fill="#134E4A" />
                <rect x="18" y="18" width="2" height="2" fill="#134E4A" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar with Back to Top */}
      <div className="border-t border-[#E5E8EE] bg-[#FAFBFD]">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5A6270]">
          <div>
            © {new Date().getFullYear()} Pantry Lane Singapore demo. Making healthy meal planning &amp; grocery shopping effortless.
          </div>
          <div className="flex items-center gap-4">
            <button type="button" onClick={onOpenAccount} className="hover:text-[#0F766E]">
              Terms &amp; Conditions
            </button>
            <span aria-hidden="true">·</span>
            <button type="button" onClick={onOpenAccount} className="hover:text-[#0F766E]">
              Privacy Notice
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-8 h-8 rounded-full border border-[#D4D9E2] bg-white hover:border-[#0F766E] text-[#0F766E] flex items-center justify-center transition-colors"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
