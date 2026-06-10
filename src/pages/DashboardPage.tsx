import { Hero } from '../components/Hero';
import { Sessions } from '../components/Sessions';
import { BiasEngine } from '../components/BiasEngine';
import { Chart } from '../components/Chart';
import { DriverMatrix } from '../components/DriverMatrix';
import { AiOverview } from '../components/Intelligence';
import { Sparkline } from '../components/Sparkline';
import type { GoldState } from '../hooks/useGoldFeed';

function Rule() { return <div className="rule my-16" />; }

export function DashboardPage({ g }: { g: GoldState }) {
  return (
    <div>
      <Hero g={g} />

      <div className="mt-2 mb-4"><Sessions /></div>

      <Rule />
      <BiasEngine g={g} />

      <Rule />
      <div className="min-h-[520px]"><Chart height={520} /></div>

      <Rule />
      <DriverMatrix />

      <Rule />
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
    </div>
  );
}
