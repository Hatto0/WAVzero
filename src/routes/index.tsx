import { createFileRoute } from "@tanstack/react-router";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import { DeviceShell } from "@/components/device-shell";
import { Inspector } from "@/components/inspector";
import { LogConsole } from "@/components/log-console";
import { Spectrum } from "@/components/spectrum";
import { Button } from "@/components/ui/button";
import { Workbench } from "@/components/workbench";
import { currentScreen, useKit } from "@/lib/store";
import type { InputKey } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

const KEYMAP: Record<string, InputKey> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  Enter: "ok",
  " ": "ok",
  Backspace: "back",
  Escape: "back",
};

function Home() {
  const press = useKit((s) => s.press);
  const boot = useKit((s) => s.boot);
  const booted = useKit((s) => s.booted);
  const hydrate = useKit((s) => s.hydrate);
  const tick = useKit((s) => s.tick);
  const micOn = useKit((s) => s.micOn);
  const toggleMic = useKit((s) => s.toggleMic);
  const tx = useKit((s) => s.txActive);
  const screen = useKit((s) => currentScreen(s));
  const [labTab, setLabTab] = useState<"lab" | "log">("lab");

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    let last = performance.now();
    let raf = 0;
    const loop = (t: number) => {
      tick((t - last) / 1000);
      last = t;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [tick]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        if (e.key === "Escape") (target as HTMLElement).blur();
        return;
      }
      const key = KEYMAP[e.key];
      if (!key) return;
      e.preventDefault();
      press(key);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [press]);

  return (
    <main className="min-h-dvh bg-bg text-fg">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-signal">Audio field kit</p>
          <h1 className="text-lg font-medium tracking-tight">WavZero</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="hidden font-mono text-[11px] text-faint sm:inline">
            arrows · enter · esc
          </span>
          <Button size="sm" variant="outline" onClick={() => void toggleMic()}>
            {micOn ? <Mic className="size-4" /> : <MicOff className="size-4" />}
            {micOn ? "Mic live" : "Tap mic"}
          </Button>
          {!booted ? (
            <Button size="sm" variant="signal" onClick={() => void boot()}>
              <Volume2 className="size-4" />
              Boot kit
            </Button>
          ) : (
            <span className={cn("font-mono text-xs", tx ? "text-tx" : "text-ok")}>
              {tx ? "TRANSMIT" : screen}
            </span>
          )}
        </div>
      </header>

      <div className="mx-auto grid max-w-[1240px] gap-5 px-4 py-5 lg:grid-cols-[minmax(280px,400px)_1fr] lg:py-6">
        <div className="flex flex-col gap-4">
          <DeviceShell />
          <p className="px-1 text-xs leading-relaxed text-muted">
            Sub-GHz, RFID, NFC and IR are scaled into sound — speakers transmit, the analyser
            listens, demo keys never leave this sandbox.
          </p>
        </div>

        <div className="flex min-h-0 flex-col gap-4">
          <Spectrum />
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(220px,0.8fr)]">
            <section className="rounded-[var(--radius-lg)] border border-border bg-surface p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xs font-medium tracking-wide text-muted">Lab</h2>
                <div className="flex rounded-[var(--radius-xs)] bg-elevated p-0.5 lg:hidden">
                  <button
                    type="button"
                    className={cn(
                      "h-8 rounded-[3px] px-3 text-xs",
                      labTab === "lab" ? "bg-primary text-primary-fg" : "text-muted",
                    )}
                    onClick={() => setLabTab("lab")}
                  >
                    Controls
                  </button>
                  <button
                    type="button"
                    className={cn(
                      "h-8 rounded-[3px] px-3 text-xs",
                      labTab === "log" ? "bg-primary text-primary-fg" : "text-muted",
                    )}
                    onClick={() => setLabTab("log")}
                  >
                    Log
                  </button>
                </div>
              </div>
              <div className={cn(labTab === "lab" ? "block" : "hidden lg:block")}>
                <Workbench />
              </div>
            </section>
            <Inspector />
          </div>
          <div className={cn("min-h-[220px] flex-1", labTab === "log" ? "block" : "hidden lg:flex")}>
            <LogConsole />
          </div>
        </div>
      </div>
    </main>
  );
}
