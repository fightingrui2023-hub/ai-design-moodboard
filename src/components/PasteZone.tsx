import { useRef, useState } from 'react';
import { ClipboardPaste, ImagePlus, Sparkles } from 'lucide-react';

interface Props {
  onAddImage: (imageUrl: string) => void;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Failed to read image'));
    reader.readAsDataURL(file);
  });
}

function getImageFileFromClipboard(clipboardData: DataTransfer | null): File | null {
  if (!clipboardData) return null;

  for (const item of Array.from(clipboardData.items)) {
    if (item.type.startsWith('image/')) {
      const file = item.getAsFile();
      if (file) return file;
    }
  }

  return clipboardData.files?.[0] ?? null;
}

export function PasteZone({ onAddImage }: Props) {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File | null) => {
    if (!file || !file.type.startsWith('image/')) return;

    setLoading(true);
    try {
      const dataUrl = await fileToDataUrl(file);
      onAddImage(dataUrl);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-paste-zone="true"
      className={`relative rounded-lg border border-dashed transition-all duration-200 cursor-pointer group ${
        dragging
          ? 'border-amber-300 bg-amber-50/70'
          : 'border-stone-300/70 bg-white/40 hover:bg-white/70 hover:border-stone-400/70'
      }`}
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const file =
          e.dataTransfer.files?.[0] ??
          Array.from(e.dataTransfer.items)
            .map((item) => item.getAsFile())
            .find((f): f is File => Boolean(f && f.type.startsWith('image/'))) ??
          null;
        void processFile(file);
      }}
      onPaste={(e) => {
        const file = getImageFileFromClipboard(e.clipboardData);
        void processFile(file);
      }}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          fileInputRef.current?.click();
        }
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          void processFile(e.target.files?.[0] ?? null);
          e.currentTarget.value = '';
        }}
      />
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
        <p className="text-[10px] font-medium text-stone-400 mb-0.5">
          {loading ? 'Uploading image...' : 'Paste, drop, or click to upload'}
        </p>
        <div className="flex items-center gap-0.5 text-[9px] text-stone-300">
          <Sparkles size={8} />
          <span>Quick capture for your moodboard</span>
        </div>
      </div>
    </div>
  );
}
