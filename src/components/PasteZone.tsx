import { ClipboardPaste, ImagePlus, Sparkles } from 'lucide-react';

export function PasteZone() {
  return (
    <div className="relative rounded-lg border border-dashed border-stone-300/70 bg-white/40 hover:bg-white/70 hover:border-stone-400/70 transition-all duration-200 cursor-pointer group">
      <div className="flex flex-col items-center justify-center py-5 px-3">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-7 h-7 rounded-md bg-stone-100/80 flex items-center justify-center group-hover:bg-stone-100 transition-colors">
            <ClipboardPaste size={13} className="text-stone-400" />
          </div>
          <span className="text-[10px] text-stone-300">or</span>
          <div className="w-7 h-7 rounded-md bg-stone-100/80 flex items-center justify-center group-hover:bg-stone-100 transition-colors">
            <ImagePlus size={13} className="text-stone-400" />
          </div>
        </div>
        <p className="text-[10px] font-medium text-stone-400 mb-0.5">Paste or drop screenshot</p>
        <div className="flex items-center gap-0.5 text-[9px] text-stone-300">
          <Sparkles size={8} />
          <span>AI extracts design keywords</span>
        </div>
      </div>
    </div>
  );
}
