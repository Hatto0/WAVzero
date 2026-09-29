import { useEffect, useRef } from "react";
import { useKit } from "@/lib/store";
import { cn, formatMs } from "@/lib/utils";

const FILTERS = ["ALL", "SUB", "AUDIO", "RFID", "NFC", "IR", "GPIO", "UART", "HID", "BLE", "SYS"];

export function LogConsole() {
  const logs = useKit((s) => s.logs);
  const filter = useKit((s) => s.logFilter);
  const setFilter = useKit((s) => s.setLogFilter);
  const scroller = useRef<HTMLDivElement>(null);
  const visible = filter === "ALL" ? logs : logs.filter((l) => l.mod === filter);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [visible.length]);

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface">
      <header className="flex flex-wrap items-center gap-1 border-b border-border px-2 py-2">
        <h2 className="mr-2 px-1 text-xs font-medium tracking-wide text-muted">Verbose log</h2>
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "h-7 rounded-[var(--radius-xs)] px-2 font-mono text-[10px] tracking-wide",
              filter === f ? "bg-primary text-primary-fg" : "text-muted hover:bg-elevated hover:text-fg",
            )}
          >
            {f}
          </button>
        ))}
      </header>
      <div ref={scroller} className="min-h-[180px] flex-1 overflow-auto px-3 py-2 font-mono text-[11px] leading-5">
        {visible.length === 0 ? (
          <p className="text-faint">No lines yet. Boot the kit and talk to the air.</p>
        ) : (
          visible.map((l) => (
            <div key={l.id} className="grid grid-cols-[88px_44px_1fr] gap-2">
              <span className="text-faint tabular-nums">{formatMs(l.ts)}</span>
              <span className={cn("log-info", `log-${l.level}`)}>{l.mod}</span>
              <span>
                <span className={cn(`log-${l.level}`)}>{l.msg}</span>
                {l.detail ? <span className="ml-2 text-faint">{l.detail}</span> : null}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
