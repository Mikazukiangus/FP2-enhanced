import React from 'react';
import { Award, ShieldCheck, Store, Truck } from 'lucide-react';
import { ActivePage } from './Header';

interface FooterProps {
  onNavigate: (page: ActivePage, categoryId?: string | null) => void;
  onOpenStoreLocator: () => void;
  onOpenAccount: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenStoreLocator,
  onOpenAccount,
}) => {
  return (
    <footer className="mt-14 bg-white border-t border-[#E5E8EE]">
      {/* Brand Promises Strip */}
      <div className="bg-[#F8FAFC] border-b border-[#E5E8EE]">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E6FAF6] text-[#0F766E] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1A1D23]">Freshness Guarantee</h3>
              <p className="text-xs text-[#5A6270] mt-0.5 leading-relaxed">
                Hand-picked fresh produce and chilled meats delivered in temperature-controlled vans.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E6FAF6] text-[#0F766E] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1A1D23]">Free Delivery from $59</h3>
              <p className="text-xs text-[#5A6270] mt-0.5 leading-relaxed">
                Islandwide 2-hour delivery slots or Click &amp; Collect at selected Pantry Lane stores.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FFF4EC] text-[#EA580C] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1A1D23]">Earn &amp; Offset Lane Points</h3>
              <p className="text-xs text-[#5A6270] mt-0.5 leading-relaxed">
                Link your membership to collect Lane Points and enjoy exclusive savings with Lane Card.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E6FAF6] text-[#0F766E] flex items-center justify-center shrink-0">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1A1D23]">Your Neighbourhood Grocer</h3>
              <p className="text-xs text-[#5A6270] mt-0.5 leading-relaxed">
                Serving households since 1973 with Everyday Low Prices across 350+ retail touchpoints.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-10 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Column 1: Brand & Contact */}
        <div className="col-span-2 md:col-span-1">
          <div className="text-xl font-extrabold tracking-tight">
            <span className="text-[#134E4A]">Pantry </span>
            <span className="text-[#EA580C]">Lane</span>
          </div>
          <p className="text-xs text-[#5A6270] mt-2.5 leading-relaxed">
            Pantry Lane is a fictional demo grocery store. Not affiliated with any real retailer.
          </p>
          <div className="mt-4 text-xs text-[#5A6270] space-y-1">
            <div className="font-semibold text-[#1A1D23]">Customer Relations</div>
            <div className="tabular-nums">+65 6000 0000 (Daily 8am – 10pm)</div>
          </div>
        </div>

        {/* Column 2: Help & Services */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1D23] mb-3">
            Help &amp; Services
          </h4>
          <ul className="space-y-2 text-xs text-[#5A6270]">
            <li>
              <button type="button" onClick={onOpenAccount} className="hover:text-[#0F766E]">
                Help Centre
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('recipes')} className="hover:text-[#0F766E]">
                Recipes &amp; Meal Ideas
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('promotions')} className="hover:text-[#0F766E]">
                Greater Value &amp; Savings
              </button>
            </li>
            <li>
              <button type="button" onClick={onOpenAccount} className="hover:text-[#0F766E]">
                Shop for Business
              </button>
            </li>
            <li>
              <button type="button" onClick={onOpenAccount} className="hover:text-[#0F766E]">
                Send E-Gift Vouchers
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Memberships */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1D23] mb-3">
            Memberships
          </h4>
          <ul className="space-y-2 text-xs text-[#5A6270]">
            <li>
              <button type="button" onClick={() => onNavigate('digital-club')} className="hover:text-[#0F766E]">
                Lane Plus
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('digital-club')} className="hover:text-[#0F766E]">
                Lane Rewards
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('promotions')} className="hover:text-[#0F766E]">
                Just Wine Club
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('digital-club')} className="hover:text-[#0F766E]">
                Seniors &amp; Students Perks
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Our Stores */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1D23] mb-3">
            Our Stores
          </h4>
          <ul className="space-y-2 text-xs text-[#5A6270]">
            <li>
              <button type="button" onClick={() => onNavigate('weekly-ads')} className="hover:text-[#0F766E]">
                Weekly Promotions
              </button>
            </li>
            <li>
              <button type="button" onClick={onOpenStoreLocator} className="hover:text-[#0F766E]">
                Store Locator
              </button>
            </li>
            <li>
              <button type="button" onClick={onOpenStoreLocator} className="hover:text-[#0F766E]">
                Pantry Lane Superstore &amp; Select
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('must-buy')} className="hover:text-[#0F766E]">
                Top Picks This Week
              </button>
            </li>
          </ul>
        </div>

        {/* Column 5: Payment & App */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1D23] mb-3">
            Accepted Payments
          </h4>
          <div className="flex flex-wrap gap-1.5 text-[11px] font-bold text-[#374151]">
            <span className="px-2 py-1 rounded border border-[#E2E6EC] bg-[#F8FAFC]">VISA</span>
            <span className="px-2 py-1 rounded border border-[#E2E6EC] bg-[#F8FAFC]">Mastercard</span>
            <span className="px-2 py-1 rounded border border-[#E2E6EC] bg-[#F8FAFC]">PayNow</span>
            <span className="px-2 py-1 rounded border border-[#E2E6EC] bg-[#F8FAFC]">Lane Card</span>
            <span className="px-2 py-1 rounded border border-[#E2E6EC] bg-[#F8FAFC]">Lane Points</span>
          </div>
          <p className="text-[11px] text-[#6B7280] mt-3 leading-relaxed">
            Download the Pantry Lane app on iOS and Android to scan, pay, and earn Lane Points in-store.
          </p>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-[#E5E8EE] bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5A6270]">
          <div>© {new Date().getFullYear()} Pantry Lane demo. Fictional store, not affiliated with any real retailer.</div>
          <div className="flex items-center gap-4 flex-wrap">
            <button type="button" onClick={onOpenAccount} className="hover:text-[#0F766E]">
              Terms &amp; Conditions
            </button>
            <span aria-hidden="true">·</span>
            <button type="button" onClick={onOpenAccount} className="hover:text-[#0F766E]">
              Privacy Notice
            </button>
            <span aria-hidden="true">·</span>
            <button type="button" onClick={onOpenAccount} className="hover:text-[#0F766E]">
              Report Vulnerability
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
