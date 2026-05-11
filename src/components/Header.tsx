import { ChevronLeft, ChevronRight, BookOpen, Search, Settings } from 'lucide-react';
import { DesignCategory } from '../types';

interface Props {
  weekLabel: string;
  onPrev: () => void;
  onNext: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  categoryFilter: 'all' | DesignCategory;
  onCategoryFilterChange: (value: 'all' | DesignCategory) => void;
  theme: 'paper' | 'warm' | 'night';
  onThemeChange: (value: 'paper' | 'warm' | 'night') => void;
}

const filterOptions: Array<'all' | DesignCategory> = [
  'all',
  'layout',
  'component',
  'typography',
  'color',
  'material',
  'hierarchy',
  'interaction',
  'spacing',
];

export function Header({
  weekLabel,
  onPrev,
  onNext,
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
  theme,
  onThemeChange,
}: Props) {
  return (
    <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-xl border-b border-stone-200/50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-12 gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <BookOpen size={16} className="text-stone-600" strokeWidth={1.6} />
              <h1 className="text-[13px] font-semibold text-stone-700 tracking-tight">DesignTerms</h1>
            </div>
            <div className="hidden sm:block h-3 w-px bg-stone-200" />
            <span className="hidden sm:inline text-[9px] font-medium text-stone-300 uppercase tracking-[0.15em]">
              Scrapbook
            </span>
          </div>

          <div className="flex items-center gap-0.5">
            <button
              onClick={onPrev}
              className="p-1.5 rounded-md hover:bg-stone-100/80 transition-colors"
              aria-label="Previous week"
            >
              <ChevronLeft size={14} className="text-stone-400" />
            </button>
            <span className="text-[11px] font-medium text-stone-600 min-w-[130px] text-center tabular-nums">
              {weekLabel}
            </span>
            <button
              onClick={onNext}
              className="p-1.5 rounded-md hover:bg-stone-100/80 transition-colors"
              aria-label="Next week"
            >
              <ChevronRight size={14} className="text-stone-400" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <div className="hidden md:flex items-center gap-1 rounded-lg border border-stone-200/80 bg-white px-2 py-1">
              <Search size={12} className="text-stone-300" />
              <input
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="搜索关键词/备注"
                className="w-36 text-[11px] text-stone-600 outline-none bg-transparent"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryFilterChange(e.target.value as 'all' | DesignCategory)}
              className="text-[10px] rounded-md border border-stone-200/80 bg-white px-1.5 py-1 text-stone-500"
            >
              {filterOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <button className="p-1.5 rounded-md hover:bg-stone-100/80 transition-colors" aria-label="Settings">
              <Settings size={14} className="text-stone-300" />
            </button>
            <select
              value={theme}
              onChange={(e) => onThemeChange(e.target.value as 'paper' | 'warm' | 'night')}
              className="text-[10px] rounded-md border border-stone-200/80 bg-white px-1.5 py-1 text-stone-500"
              aria-label="Theme"
            >
              <option value="paper">Paper</option>
              <option value="warm">Warm</option>
              <option value="night">Night</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
