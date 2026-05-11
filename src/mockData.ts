import { DesignTerm, ImageEntry, WeekData } from './types';

const mockTerms: DesignTerm[] = [
  // Layout
  { id: '1',  label: '12-col Grid',          category: 'layout' },
  { id: '2',  label: 'Sidebar + Content',     category: 'layout' },
  { id: '3',  label: 'F-Pattern',             category: 'layout' },
  { id: '4',  label: 'Full-bleed Hero',        category: 'layout' },
  { id: '5',  label: 'Masonry',               category: 'layout' },
  { id: '6',  label: 'Split-screen',          category: 'layout' },
  { id: '7',  label: 'Sticky Nav',            category: 'layout' },
  // Component
  { id: '8',  label: 'Floating Action Btn',   category: 'component' },
  { id: '9',  label: 'Card with Shadow',       category: 'component' },
  { id: '10', label: 'Pill Tab Bar',           category: 'component' },
  { id: '11', label: 'Bento Grid Card',        category: 'component' },
  { id: '12', label: 'Avatar Stack',           category: 'component' },
  { id: '13', label: 'Toggle Switch',          category: 'component' },
  { id: '14', label: 'Bottom Sheet',           category: 'component' },
  // Typography
  { id: '15', label: 'Inter Tight',            category: 'typography' },
  { id: '16', label: 'Display 48px',           category: 'typography' },
  { id: '17', label: 'Tabular Num',             category: 'typography' },
  { id: '18', label: 'Small-caps Label',        category: 'typography' },
  { id: '19', label: 'Mono Code Block',         category: 'typography' },
  { id: '20', label: 'CJK Vertical',            category: 'typography' },
  // Color
  { id: '21', label: 'Muted Earth Tone',        category: 'color' },
  { id: '22', label: 'High-contrast CTA',       category: 'color' },
  { id: '23', label: 'Duotone Overlay',         category: 'color' },
  { id: '24', label: 'Slate + Amber Accent',    category: 'color' },
  { id: '25', label: 'Dark Mode Surface',        category: 'color' },
  { id: '26', label: 'Gradient Mesh',            category: 'color' },
  // Material
  { id: '27', label: 'Frosted Glass',            category: 'material' },
  { id: '28', label: 'Noise Texture',             category: 'material' },
  { id: '29', label: 'Soft Shadow 16px',          category: 'material' },
  { id: '30', label: 'Inner Border Light',         category: 'material' },
  { id: '31', label: 'Paper Grain',                category: 'material' },
  { id: '32', label: 'Neumorphic Inset',           category: 'material' },
  // Hierarchy
  { id: '33', label: 'Z-index Layer Stack',        category: 'hierarchy' },
  { id: '34', label: 'Primary > Secondary',       category: 'hierarchy' },
  { id: '35', label: 'Progressive Disclosure',      category: 'hierarchy' },
  { id: '36', label: 'Visual Weight 3:1',          category: 'hierarchy' },
  { id: '37', label: 'Focal Point Image',           category: 'hierarchy' },
  { id: '38', label: 'Content-first Order',         category: 'hierarchy' },
  // Interaction
  { id: '39', label: 'Hover Scale 1.02',           category: 'interaction' },
  { id: '40', label: 'Swipe to Delete',             category: 'interaction' },
  { id: '41', label: 'Pull-to-refresh',             category: 'interaction' },
  { id: '42', label: 'Skeleton Loader',             category: 'interaction' },
  { id: '43', label: 'Parallax Scroll',              category: 'interaction' },
  { id: '44', label: 'Drag Reorder',                 category: 'interaction' },
  // Spacing
  { id: '45', label: '8px Base Unit',                category: 'spacing' },
  { id: '46', label: 'Generous Whitespace',          category: 'spacing' },
  { id: '47', label: 'Compact Mobile',               category: 'spacing' },
  { id: '48', label: '24px Gutter',                   category: 'spacing' },
  { id: '49', label: 'Tight Leading 1.2',             category: 'spacing' },
  { id: '50', label: 'Rhythm 4x Grid',                category: 'spacing' },
];

const pexelsImages = [
  'https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1097930/pexels-photo-1097930.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1105665/pexels-photo-1105665.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/60504/pexels-photo-60504.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/325576/pexels-photo-325576.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/911758/pexels-photo-911758.jpeg?auto=compress&cs=tinysrgb&w=400',
];

function pickTerms(count: number, offset: number): DesignTerm[] {
  const start = offset % mockTerms.length;
  const result: DesignTerm[] = [];
  for (let i = 0; i < count; i++) {
    result.push(mockTerms[(start + i) % mockTerms.length]);
  }
  return result;
}

function createEntry(id: string, imageIndex: number, termOffset: number, termCount: number): ImageEntry {
  return {
    id,
    imageUrl: pexelsImages[imageIndex % pexelsImages.length],
    terms: pickTerms(termCount, termOffset),
    note: '',
    createdAt: new Date(),
  };
}

function getWeekDays(baseDate: Date, weekOffset: number): WeekData {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date(baseDate);
  today.setHours(0, 0, 0, 0);

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + weekOffset * 7);

  const days: WeekData['days'] = [];

  const entryMap: Record<number, ImageEntry[]> = {
    0: [createEntry('e1', 0, 0, 7), createEntry('e2', 1, 7, 6)],
    2: [createEntry('e3', 2, 14, 8)],
    4: [createEntry('e4', 3, 22, 9), createEntry('e5', 4, 31, 5)],
    5: [createEntry('e6', 5, 38, 7)],
  };

  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);

    const isToday = d.toDateString() === today.toDateString();
    const dayIndex = weekOffset === 0 ? i : -1;

    days.push({
      date: d,
      dayLabel: dayNames[i],
      dateLabel: `${d.getMonth() + 1}/${d.getDate()}`,
      isToday,
      entries: dayIndex >= 0 && entryMap[dayIndex] ? entryMap[dayIndex] : [],
    });
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const weekStart = days[0].date;
  const weekEnd = days[6].date;
  const weekLabel = `${monthNames[weekStart.getMonth()]} ${weekStart.getDate()} - ${monthNames[weekEnd.getMonth()]} ${weekEnd.getDate()}`;

  return { weekLabel, days };
}

export function getMockWeeks(): WeekData[] {
  const now = new Date();
  return [
    getWeekDays(now, -1),
    getWeekDays(now, 0),
    getWeekDays(now, 1),
  ];
}
