import { useState } from 'react';
import { useGoldFeed } from './hooks/useGoldFeed';
import { Sidebar } from './components/Sidebar';
import { TerminalBar } from './components/TerminalBar';
import { Hero } from './components/Hero';
import { Sessions } from './components/Sessions';
import { Chart } from './components/Chart';
import { BiasEngine } from './components/BiasEngine';
import { DriverMatrix } from './components/DriverMatrix';
import { AiOverview } from './components/Intelligence';
import { NewsTerminal } from './components/NewsTerminal';
import { Journal } from './components/Journal';
import { Sparkline } from './components/Sparkline';

/** A faint full-width rule used to separate research sections without boxing them. */
function Rule() { return <div className="rule my-16" />; }

export default function App() {
  const g = useGoldFeed();
  const [active, setActive] = useState('Dashboard');

  return (
    <div className="min-h-screen relative font-inter text-txt">
      <div className="stage">
        <div className="aur a1" /><div className="aur a2" /><div className="aur a3" />
        <div className="vignette" /><div className="grain" />
      </div>

      <div className="relative z-10">
        {/* persistent terminal tape — spans the very top */}
        <TerminalBar g={g} />

        <div className="flex">
          <Sidebar active={active} onSelect={setActive} />

          <main className="flex-1 min-w-0 px-6 sm:px-12 xl:px-20 py-4 max-w-[1600px] mx-auto w-full">
            {/* DOMINANT HERO — ~40% of the viewport */}
            <Hero g={g} />

            {/* sessions, quietly */}
            <div className="mt-2 mb-4"><Sessions /></div>

            <Rule />

            {/* GOLD BIAS ENGINE — headline read, full width, no box */}
            <BiasEngine g={g} />

            <Rule />

            {/* CHART — first-class, large */}
            <div className="min-h-[520px]"><Chart height={520} /></div>

            <Rule />

            {/* DRIVER MATRIX — always-on ledger */}
            <DriverMatrix />

            <Rule />

            {/* DYNAMIC AI READ + session path */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-14 gap-y-10">
              <div className="xl:col-span-8"><AiOverview g={g} /></div>
              <div className="xl:col-span-4">
                <div className="eyebrow mb-4">Session Path</div>
                {g.history.length > 1
                  ? <Sparkline points={g.history.map((h) => h.p)} color="auto" w={360} h={120} />
                  : <div className="text-[12px] text-muted">Awaiting live ticks…</div>}
                <div className="mt-4 text-[12px] text-muted tnum">
                  High {g.high?.toFixed(2) ?? '—'} · Low {g.low?.toFixed(2) ?? '—'}
                </div>
              </div>
            </div>

            <Rule />

            {/* NEWS + JOURNAL — open columns */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-14 gap-y-12">
              <NewsTerminal />
              <Journal />
            </div>

            <footer className="text-[11px] text-muted/50 text-center py-16 leading-relaxed max-w-2xl mx-auto">
              AURUM · Gold Intelligence Terminal · Live XAU/USD via gold-api.com · architecture ready for VT Markets MT5 bridge.<br />
              The Bias Engine and AI Overview update live from price action; macro drivers and the top tape show "no feed" until a live source is connected — values are never fabricated.
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
