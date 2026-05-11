import { X } from 'lucide-react';
import { ImageEntry } from '../types';
import { DesignTermTag } from './DesignTermTag';

interface Props {
  entry: ImageEntry | null;
  open: boolean;
  onClose: () => void;
  onUpdateEntry: (entryId: string, patch: Partial<Pick<ImageEntry, 'note'>>) => void;
}

export function EntryDetailDrawer({ entry, open, onClose, onUpdateEntry }: Props) {
  if (!open || !entry) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />
      <aside className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-stone-200 bg-white shadow-2xl">
        <div className="flex h-14 items-center justify-between border-b border-stone-200 px-4">
          <h3 className="text-sm font-semibold text-stone-700">灵感详情</h3>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-stone-500 hover:bg-stone-100"
            aria-label="Close detail drawer"
          >
            <X size={16} />
          </button>
        </div>

        <div className="h-[calc(100%-56px)] overflow-y-auto p-4 space-y-4">
          <div className="overflow-hidden rounded-xl border border-stone-200 bg-stone-50">
            <img src={entry.imageUrl} alt="Detail preview" className="w-full object-cover" />
          </div>

          <section>
            <p className="mb-2 text-xs font-medium text-stone-500">全部标签</p>
            <div className="flex flex-wrap gap-1.5">
              {entry.terms.map((term) => (
                <DesignTermTag key={term.id} term={term} size="sm" />
              ))}
            </div>
          </section>

          <section>
            <p className="mb-2 text-xs font-medium text-stone-500">备注</p>
            <textarea
              value={entry.note ?? ''}
              onChange={(e) => onUpdateEntry(entry.id, { note: e.target.value })}
              placeholder="记录这张图的设计亮点..."
              className="min-h-28 w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 outline-none focus:border-amber-300"
            />
          </section>

          <p className="text-[11px] text-stone-400">
            创建时间：{new Date(entry.createdAt).toLocaleString()}
          </p>
        </div>
      </aside>
    </>
  );
}
