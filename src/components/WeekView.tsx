import { ImageEntry, WeekData } from '../types';
import { DayColumn } from './DayColumn';

interface Props {
  week: WeekData;
  onAddImage: (dayDate: string, imageUrl: string) => void;
  onUpdateEntry: (dayDate: string, entryId: string, patch: Partial<Pick<ImageEntry, 'terms' | 'note'>>) => void;
  onMoveEntry: (dayDate: string, sourceEntryId: string, targetEntryId: string) => void;
  onOpenDetail: (dayDate: string, entryId: string) => void;
}

export function WeekView({ week, onAddImage, onUpdateEntry, onMoveEntry, onOpenDetail }: Props) {
  return (
    <div className="flex-1">
      <div className="flex gap-3 overflow-x-auto pb-4 px-0.5 scrollbar-thin">
        {week.days.map((day, i) => (
          <DayColumn
            key={i}
            day={day}
            onAddImage={onAddImage}
            onUpdateEntry={onUpdateEntry}
            onMoveEntry={onMoveEntry}
            onOpenDetail={onOpenDetail}
          />
        ))}
      </div>
    </div>
  );
}
