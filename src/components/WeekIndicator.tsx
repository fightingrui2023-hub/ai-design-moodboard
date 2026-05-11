import { WeekData } from '../types';

interface Props {
  weeks: WeekData[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export function WeekIndicator({ weeks, currentIndex, onSelect }: Props) {
  return (
    <div className="flex items-center justify-center gap-1.5 py-2.5">
      {weeks.map((week, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`text-[10px] font-medium px-2.5 py-1 rounded-full transition-all duration-200 ${
            i === currentIndex
              ? 'bg-stone-700 text-white shadow-sm'
              : 'text-stone-400 hover:text-stone-500 hover:bg-stone-100/60'
          }`}
        >
          {week.weekLabel}
        </button>
      ))}
    </div>
  );
}
