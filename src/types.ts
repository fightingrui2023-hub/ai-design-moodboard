export type DesignCategory =
  | 'layout'
  | 'component'
  | 'typography'
  | 'color'
  | 'material'
  | 'hierarchy'
  | 'interaction'
  | 'spacing';

export interface DesignTerm {
  id: string;
  label: string;
  category: DesignCategory;
}

export interface ImageEntry {
  id: string;
  imageUrl: string;
  terms: DesignTerm[];
  note?: string;
  createdAt: Date;
}

export interface DayData {
  date: Date;
  dayLabel: string;
  dateLabel: string;
  isToday: boolean;
  entries: ImageEntry[];
}

export interface WeekData {
  weekLabel: string;
  days: DayData[];
}
