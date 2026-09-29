import { LcdCanvas } from "@/components/lcd-canvas";
import { useKit, currentScreen } from "@/lib/store";
import type { InputKey } from "@/lib/types";
import { cn } from "@/lib/utils";

const KEYS: { id: InputKey; label: string; className: string }[] = [
  { id: "up", label: "Up", className: "col-start-2 row-start-1" },
  { id: "left", label: "Left", className: "col-start-1 row-start-2" },
  { id: "ok", label: "OK", className: "col-start-2 row-start-2" },
  { id: "right", label: "Right", className: "col-start-3 row-start-2" },
  { id: "down", label: "Down", className: "col-start-2 row-start-3" },
];

export function DeviceShell() {
  const press = useKit((s) => s.press);
  const tx = useKit((s) => s.txActive);
  const rx = useKit((s) => s.rxActive);
  const booted = useKit((s) => s.booted);
  const screen = useKit((s) => currentScreen(s));
  const mhz = useKit((s) => s.mhz);

  return (
    <div className="mx-auto w-full max-w-[380px]">
      <div className="device-body relative rounded-[36px] border border-border px-4 pb-5 pt-0">
        <div className="antenna-bay -mx-4 mb-3 flex items-center justify-between rounded-t-[36px] px-5 py-2.5 text-[10px] font-medium tracking-[0.18em] text-signal-fg">
          <span>SUB-GHZ / AUDIO</span>
          <span className="tabular-nums">{mhz.toFixed(2)}</span>
        </div>

        <div className="mb-2 flex items-center justify-between px-1 text-[10px] text-faint">
          <span className="tracking-[0.2em]">WAVZERO</span>
          <span className="flex items-center gap-2">
            <Led label="TX" on={tx} tone="tx" />
            <Led label="RX" on={rx && !tx} tone="rx" />
            <Led label="SYS" on={booted} tone="ok" />
          </span>
        </div>

        <div className="lcd-glow relative overflow-hidden rounded-[var(--radius-md)] border border-border bg-lcd">
          <div className="aspect-[2/1] p-2">
            <LcdCanvas />
          </div>
          <div className="scanlines absolute inset-0 rounded-[var(--radius-md)]" />
        </div>

        <p className="mt-2 px-1 font-mono text-[10px] uppercase tracking-widest text-faint">
          {screen.replace("-", " ")} · speaker coil
        </p>

        <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-4 px-1">
          <div className="grid grid-cols-3 grid-rows-3 place-items-center gap-1.5">
            {KEYS.map((k) => (
              <Pad
                key={k.id}
                className={k.className}
                label={k.label}
                accent={k.id === "ok"}
                onPress={() => press(k.id)}
              />
            ))}
          </div>
          <Pad label="Back" wide onPress={() => press("back")} />
        </div>

        <div className="mt-4 flex items-end justify-between px-2">
          <div className="flex gap-1.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="size-1.5 rounded-full bg-elevated ring-1 ring-border" />
            ))}
          </div>
          <div className="h-2 w-10 rounded-full bg-elevated ring-1 ring-border" title="USB-C" />
        </div>
      </div>
    </div>
  );
}

function Led({ label, on, tone }: { label: string; on: boolean; tone: "tx" | "rx" | "ok" }) {
  const color = tone === "tx" ? "bg-tx" : tone === "rx" ? "bg-rx" : "bg-ok";
  return (
    <span className="flex items-center gap-1 font-mono">
      <span
        className={cn("size-1.5 rounded-full bg-faint", on && color, on && "led-live")}
      />
      {label}
    </span>
  );
}

function Pad({
  label,
  onPress,
  className,
  accent,
  wide,
}: {
  label: string;
  onPress: () => void;
  className?: string;
  accent?: boolean;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onPointerDown={(e) => {
        e.preventDefault();
        onPress();
      }}
      className={cn(
        "select-none rounded-full border border-border bg-elevated text-[10px] font-medium uppercase tracking-wider text-muted",
        "transition-transform duration-150 ease-out hover:text-fg active:scale-[0.96]",
        accent ? "size-14 bg-primary text-primary-fg hover:text-primary-fg" : "size-12",
        wide && "h-12 w-16 rounded-[18px]",
        className,
      )}
    >
      {label}
    </button>
  );
}
