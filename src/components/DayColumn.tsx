import { DayData, ImageEntry } from '../types';
import { ImageCard } from './ImageCard';
import { PasteZone } from './PasteZone';

interface Props {
  day: DayData;
  onAddImage: (dayDate: string, imageUrl: string) => void;
  onUpdateEntry: (dayDate: string, entryId: string, patch: Partial<Pick<ImageEntry, 'terms' | 'note'>>) => void;
  onMoveEntry: (dayDate: string, sourceEntryId: string, targetEntryId: string) => void;
  onOpenDetail: (dayDate: string, entryId: string) => void;
}

export function DayColumn({ day, onAddImage, onUpdateEntry, onMoveEntry, onOpenDetail }: Props) {
  const dayKey = day.date.toDateString();

  return (
    <div className={`flex flex-col min-w-[190px] ${day.isToday ? 'bg-amber-50/20 rounded-lg' : ''}`}>
      <div className="sticky top-0 z-10 pb-2.5 pt-1">
        <div className="flex items-center gap-1.5">
          <span className={`text-[11px] font-semibold tracking-wide ${day.isToday ? 'text-amber-600' : 'text-stone-400'}`}>
            {day.dayLabel}
          </span>
          <span className={`text-[10px] font-medium tabular-nums ${day.isToday ? 'text-amber-400' : 'text-stone-300'}`}>
            {day.dateLabel}
          </span>
          {day.isToday && (
            <span className="inline-flex items-center justify-center w-1.5 h-1.5 rounded-full bg-amber-400" />
          )}
        </div>
        <div className={`mt-1 h-px ${day.isToday ? 'bg-amber-200/60' : 'bg-stone-200/60'}`} />
      </div>
      <div className="flex flex-col gap-2.5 flex-1">
        {day.entries.map((entry) => (
          <div
            key={entry.id}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text/plain', entry.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const sourceId = e.dataTransfer.getData('text/plain');
              if (sourceId && sourceId !== entry.id) {
                onMoveEntry(dayKey, sourceId, entry.id);
              }
            }}
            className="cursor-grab active:cursor-grabbing"
          >
            <ImageCard
              entry={entry}
              onUpdateEntry={(entryId, patch) => onUpdateEntry(dayKey, entryId, patch)}
              onOpenDetail={(entryId) => onOpenDetail(dayKey, entryId)}
            />
          </div>
        ))}
        <PasteZone onAddImage={(imageUrl) => onAddImage(dayKey, imageUrl)} />
      </div>
    </div>
  );
}
