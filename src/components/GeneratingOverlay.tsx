import { Sparkles, Loader2 } from 'lucide-react';

export function GeneratingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/20 backdrop-blur-[2px]">
      <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-7 max-w-xs w-full mx-4 border border-stone-100">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-50/80 flex items-center justify-center">
              <Sparkles size={20} className="text-amber-500" />
            </div>
            <Loader2 size={14} className="absolute -bottom-0.5 -right-0.5 text-amber-500 animate-spin" />
          </div>
          <h3 className="text-[13px] font-semibold text-stone-700 mb-1">Analyzing Design</h3>
          <p className="text-[11px] text-stone-400 leading-relaxed mb-3">
            Extracting layout, component, typography, color, material, hierarchy, interaction, and spacing keywords...
          </p>
          <div className="flex flex-wrap justify-center gap-1">
            {['Layout', 'Component', 'Type', 'Color', 'Material', 'Hierarchy', 'Interaction', 'Spacing'].map((cat, i) => (
              <span
                key={cat}
                className="text-[9px] font-medium text-stone-400 bg-stone-50 px-1.5 py-0.5 rounded animate-pulse"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
