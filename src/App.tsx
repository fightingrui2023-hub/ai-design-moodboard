import { useState } from 'react';
import { Header } from './components/Header';
import { WeekView } from './components/WeekView';
import { WeekIndicator } from './components/WeekIndicator';
import { GeneratingOverlay } from './components/GeneratingOverlay';
import { getMockWeeks } from './mockData';

function App() {
  const weeks = getMockWeeks();
  const [currentWeekIndex, setCurrentWeekIndex] = useState(1);
  const [showGenerating, setShowGenerating] = useState(false);

  const currentWeek = weeks[currentWeekIndex];

  return (
    <div className="min-h-screen bg-[#faf9f7] flex flex-col">
      <Header
        weekLabel={currentWeek.weekLabel}
        onPrev={() => setCurrentWeekIndex((i) => Math.max(0, i - 1))}
        onNext={() => setCurrentWeekIndex((i) => Math.min(weeks.length - 1, i + 1))}
      />

      <main className="flex-1 flex flex-col max-w-screen-2xl mx-auto w-full px-4 sm:px-6 pt-3">
        <WeekIndicator
          weeks={weeks}
          currentIndex={currentWeekIndex}
          onSelect={setCurrentWeekIndex}
        />
        <WeekView week={currentWeek} />
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
    </div>
  );
}

export default App;
