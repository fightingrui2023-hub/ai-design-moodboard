import { WeekData } from '../types';
import { DayColumn } from './DayColumn';

interface Props {
  week: WeekData;
}

export function WeekView({ week }: Props) {
  return (
    <div className="flex-1">
      <div className="flex gap-3 overflow-x-auto pb-4 px-0.5 scrollbar-thin">
        {week.days.map((day, i) => (
          <DayColumn key={i} day={day} />
        ))}
      </div>
    </div>
  );
}
