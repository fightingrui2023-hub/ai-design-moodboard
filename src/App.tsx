import { useCallback, useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { WeekView } from './components/WeekView';
import { WeekIndicator } from './components/WeekIndicator';
import { GeneratingOverlay } from './components/GeneratingOverlay';
import { EntryDetailDrawer } from './components/EntryDetailDrawer';
import { getMockWeeks } from './mockData';
import { DesignCategory, ImageEntry, WeekData } from './types';

const STORAGE_KEY = 'designterms.weeks.v1';

function reviveWeeks(raw: WeekData[]): WeekData[] {
  return raw.map((week) => ({
    ...week,
    days: week.days.map((day) => ({
      ...day,
      date: new Date(day.date),
      entries: day.entries.map((entry) => ({
        ...entry,
        createdAt: new Date(entry.createdAt),
      })),
    })),
  }));
}

function loadWeeks(): WeekData[] {
  const fallback = getMockWeeks();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    return reviveWeeks(JSON.parse(raw) as WeekData[]);
  } catch {
    return fallback;
  }
}

function extractImageFromClipboardEvent(event: ClipboardEvent): File | null {
  const items = event.clipboardData?.items;
  if (!items) return null;

  for (const item of Array.from(items)) {
    if (item.type.startsWith('image/')) {
      const file = item.getAsFile();
      if (file) return file;
    }
  }

  return null;
}

function extractImageFromDropEvent(event: DragEvent): File | null {
  const dt = event.dataTransfer;
  if (!dt) return null;

  if (dt.files?.length) {
    const direct = Array.from(dt.files).find((f) => f.type.startsWith('image/'));
    if (direct) return direct;
  }

  for (const item of Array.from(dt.items ?? [])) {
    if (item.type.startsWith('image/')) {
      const file = item.getAsFile();
      if (file) return file;
    }
  }

  return null;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Failed to read image'));
    reader.readAsDataURL(file);
  });
}

function App() {
  const [weeks, setWeeks] = useState<WeekData[]>(() => loadWeeks());
  const [currentWeekIndex, setCurrentWeekIndex] = useState(1);
  const [showGenerating, setShowGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | DesignCategory>('all');
  const [theme, setTheme] = useState<'paper' | 'warm' | 'night'>('paper');
  const [detailTarget, setDetailTarget] = useState<{ dayDate: string; entryId: string } | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(weeks));
  }, [weeks]);

  const filteredWeeks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return weeks.map((week) => ({
      ...week,
      days: week.days.map((day) => ({
        ...day,
        entries: day.entries.filter((entry) => {
          const categoryMatch =
            categoryFilter === 'all' || entry.terms.some((term) => term.category === categoryFilter);

          if (!categoryMatch) return false;
          if (!query) return true;

          const textMatched =
            entry.note?.toLowerCase().includes(query) ||
            entry.terms.some((term) => term.label.toLowerCase().includes(query));

          return Boolean(textMatched);
        }),
      })),
    }));
  }, [weeks, searchQuery, categoryFilter]);

  const currentWeek = filteredWeeks[currentWeekIndex];

  const addImageToDay = useCallback((dayDate: string, imageUrl: string) => {
    setWeeks((prev) =>
      prev.map((week) => ({
        ...week,
        days: week.days.map((day) => {
          if (day.date.toDateString() !== dayDate) return day;
          const nextEntry: ImageEntry = {
            id: `entry-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            imageUrl,
            terms: [
              {
                id: `term-${Date.now()}`,
                label: 'New Inspiration',
                category: 'component',
              },
            ],
            note: '',
            createdAt: new Date(),
          };
          return { ...day, entries: [nextEntry, ...day.entries] };
        }),
      })),
    );
  }, []);

  const updateEntry = useCallback((dayDate: string, entryId: string, patch: Partial<Pick<ImageEntry, 'terms' | 'note'>>) => {
    setWeeks((prev) =>
      prev.map((week) => ({
        ...week,
        days: week.days.map((day) => {
          if (day.date.toDateString() !== dayDate) return day;
          return {
            ...day,
            entries: day.entries.map((entry) => {
              if (entry.id !== entryId) return entry;
              return { ...entry, ...patch };
            }),
          };
        }),
      })),
    );
  }, []);

  const defaultDayDate = useMemo(() => {
    const week = weeks[currentWeekIndex];
    if (!week?.days?.length) return '';
    return week.days.find((d) => d.isToday)?.date.toDateString() ?? week.days[0].date.toDateString();
  }, [weeks, currentWeekIndex]);

  const moveEntryWithinDay = useCallback((dayDate: string, sourceEntryId: string, targetEntryId: string) => {
    setWeeks((prev) =>
      prev.map((week) => ({
        ...week,
        days: week.days.map((day) => {
          if (day.date.toDateString() !== dayDate) return day;
          const sourceIndex = day.entries.findIndex((item) => item.id === sourceEntryId);
          const targetIndex = day.entries.findIndex((item) => item.id === targetEntryId);
          if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) return day;

          const nextEntries = [...day.entries];
          const [moved] = nextEntries.splice(sourceIndex, 1);
          nextEntries.splice(targetIndex, 0, moved);
          return { ...day, entries: nextEntries };
        }),
      })),
    );
  }, []);

  const selectedEntry = useMemo(() => {
    if (!detailTarget) return null;
    for (const week of weeks) {
      for (const day of week.days) {
        if (day.date.toDateString() !== detailTarget.dayDate) continue;
        const found = day.entries.find((entry) => entry.id === detailTarget.entryId);
        if (found) return found;
      }
    }
    return null;
  }, [weeks, detailTarget]);

  const themeClassName =
    theme === 'paper'
      ? 'bg-[#faf9f7]'
      : theme === 'warm'
      ? 'bg-[#f8f3ea]'
      : 'bg-[#f1f5f9]';

  useEffect(() => {
    const handlePaste = async (event: ClipboardEvent) => {
      const target = event.target as Element | null;
      if (target?.closest('[data-paste-zone="true"]')) return;

      const image = extractImageFromClipboardEvent(event);
      if (!image || !defaultDayDate) return;

      event.preventDefault();
      const dataUrl = await fileToDataUrl(image);
      addImageToDay(defaultDayDate, dataUrl);
    };

    const handleDragOver = (event: DragEvent) => {
      if (event.dataTransfer?.types?.includes('Files')) {
        event.preventDefault();
      }
    };

    const handleDrop = async (event: DragEvent) => {
      const target = event.target as Element | null;
      if (target?.closest('[data-paste-zone="true"]')) return;

      const image = extractImageFromDropEvent(event);
      if (!image || !defaultDayDate) return;

      event.preventDefault();
      const dataUrl = await fileToDataUrl(image);
      addImageToDay(defaultDayDate, dataUrl);
    };

    window.addEventListener('paste', handlePaste);
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);
    return () => {
      window.removeEventListener('paste', handlePaste);
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, [defaultDayDate, addImageToDay]);

  return (
    <div className={`min-h-screen flex flex-col ${themeClassName}`}>
      <Header
        weekLabel={currentWeek.weekLabel}
        onPrev={() => setCurrentWeekIndex((i) => Math.max(0, i - 1))}
        onNext={() => setCurrentWeekIndex((i) => Math.min(weeks.length - 1, i + 1))}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        theme={theme}
        onThemeChange={setTheme}
      />

      <main className="flex-1 flex flex-col max-w-screen-2xl mx-auto w-full px-4 sm:px-6 pt-3">
        <WeekIndicator
          weeks={filteredWeeks}
          currentIndex={currentWeekIndex}
          onSelect={setCurrentWeekIndex}
        />
        <WeekView
          week={currentWeek}
          onAddImage={addImageToDay}
          onUpdateEntry={updateEntry}
          onMoveEntry={moveEntryWithinDay}
          onOpenDetail={(dayDate, entryId) => setDetailTarget({ dayDate, entryId })}
        />
      </main>

      <footer className="border-t border-stone-100/60 py-2.5">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <p className="text-[9px] text-stone-300">
            Paste screenshots to extract design keywords
          </p>
          <button
            onClick={() => setShowGenerating(true)}
            className="text-[9px] font-medium text-amber-400 hover:text-amber-500 transition-colors"
          >
            Preview: AI analyzing...
          </button>
        </div>
      </footer>

      {showGenerating && (
        <>
          <GeneratingOverlay />
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowGenerating(false)}
          />
        </>
      )}

      <EntryDetailDrawer
        open={Boolean(detailTarget)}
        entry={selectedEntry}
        onClose={() => setDetailTarget(null)}
        onUpdateEntry={(entryId, patch) => {
          if (!detailTarget) return;
          updateEntry(detailTarget.dayDate, entryId, patch);
        }}
      />
    </div>
  );
}

export default App;
