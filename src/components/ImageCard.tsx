import { useMemo, useState } from 'react';
import { ImageEntry } from '../types';
import { DesignTermTag } from './DesignTermTag';
import { StickyNote, MoreHorizontal } from 'lucide-react';

interface Props {
  entry: ImageEntry;
}

export function ImageCard({ entry }: Props) {
  const [expanded, setExpanded] = useState(false);

  const representativeTerms = useMemo(() => {
    const pickedCategories = new Set<string>();
    const picked = [];

    for (const term of entry.terms) {
      if (!pickedCategories.has(term.category)) {
        pickedCategories.add(term.category);
        picked.push(term);
      }
      if (picked.length === 2) break;
    }

    return picked.length > 0 ? picked : entry.terms.slice(0, 2);
  }, [entry.terms]);

  const hiddenCount = Math.max(0, entry.terms.length - representativeTerms.length);
  const pinColors = ['bg-fuchsia-400', 'bg-amber-400', 'bg-sky-400'];

  return (
    <div className="group relative rounded-xl overflow-hidden bg-white border border-stone-200/80 shadow-[0_2px_6px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-200">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100/50">
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-20 w-14 h-3 rounded-sm bg-amber-100/80 border border-amber-200/70 shadow-sm rotate-[-1.8deg]" />
        <img
          src={entry.imageUrl}
          alt="Design reference"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        {representativeTerms.map((term, index) => (
          <div
            key={term.id}
            className={`absolute z-20 ${index === 0 ? 'left-3 top-3' : 'right-3 top-10'} max-w-[78%]`}
          >
            <div className={`absolute -top-1.5 left-4 w-2.5 h-2.5 rounded-full shadow-sm ${pinColors[index % pinColors.length]}`} />
            <div className="relative rounded-xl border border-stone-200 bg-white/95 backdrop-blur-sm px-2.5 py-1 shadow-[0_3px_8px_rgba(0,0,0,0.08)]">
              <span className="text-[10px] font-medium text-stone-700 truncate block">{term.label}</span>
            </div>
          </div>
        ))}

        {hiddenCount > 0 && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="absolute right-3 bottom-3 z-20 rounded-full border border-stone-200 bg-white/95 px-2 py-1 text-[10px] font-semibold text-stone-600 shadow-sm hover:bg-white transition-colors"
          >
            {expanded ? '收起' : `+${hiddenCount}`}
          </button>
        )}

        <button className="absolute top-2 right-2 p-1 rounded-md bg-white/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white/90 z-30">
          <MoreHorizontal size={12} className="text-stone-500" />
        </button>
      </div>

      <div className="p-2.5 space-y-2 bg-stone-50/30">
        {expanded && (
          <div className="rounded-lg border border-stone-200/80 bg-white/90 p-2">
            <p className="text-[10px] text-stone-400 mb-1.5">全部关键词</p>
            <div className="flex flex-wrap gap-1">
              {entry.terms.map((term) => (
                <DesignTermTag key={term.id} term={term} size="sm" />
              ))}
            </div>
          </div>
        )}

        <button className="flex items-center gap-1 text-[10px] text-stone-400 hover:text-stone-500 transition-colors">
          <StickyNote size={10} />
          <span>贴纸备注</span>
        </button>
      </div>
    </div>
  );
}
