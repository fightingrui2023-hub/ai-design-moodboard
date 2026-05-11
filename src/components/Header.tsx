import { ChevronLeft, ChevronRight, BookOpen, Search, Settings } from 'lucide-react';

interface Props {
  weekLabel: string;
  onPrev: () => void;
  onNext: () => void;
}

export function Header({ weekLabel, onPrev, onNext }: Props) {
  return (
    <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-xl border-b border-stone-200/50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-12">
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

          <div className="flex items-center gap-0.5">
            <button className="p-1.5 rounded-md hover:bg-stone-100/80 transition-colors" aria-label="Search">
              <Search size={14} className="text-stone-300" />
            </button>
            <button className="p-1.5 rounded-md hover:bg-stone-100/80 transition-colors" aria-label="Settings">
              <Settings size={14} className="text-stone-300" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
