import { Button } from "@/components/ui/button";
import {
  DEMO_REMOTES,
  I2C_MAP,
  MHZ_MAX,
  MHZ_MIN,
  MODULATIONS,
} from "@/lib/library";
import { currentScreen, useKit } from "@/lib/store";
import { cn, formatHz, formatMhz, groupHex, mhzToAudio } from "@/lib/utils";

export function Workbench() {
  const screen = useKit((s) => currentScreen(s));
  if (screen.startsWith("subghz") || screen === "boot" || screen === "menu") return <SubghzBench />;
  if (screen.startsWith("rfid")) return <RfidBench />;
  if (screen.startsWith("nfc")) return <NfcBench />;
  if (screen.startsWith("ir")) return <IrBench />;
  if (screen.startsWith("gpio") || screen === "gpio") return <GpioBench />;
  if (screen.startsWith("ibutton")) return <IbuttonBench />;
  if (screen.startsWith("badusb")) return <HidBench />;
  if (screen.startsWith("ble")) return <BleBench />;
  if (screen === "u2f") return <U2fBench />;
  if (screen.startsWith("apps")) return <AppsBench />;
  if (screen.startsWith("settings") || screen === "about" || screen === "archive") return <SettingsBench />;
  return <SubghzBench />;
}

function SubghzBench() {
  const mhz = useKit((s) => s.mhz);
  const setMhz = useKit((s) => s.setMhz);
  const modulation = useKit((s) => s.modulation);
  const setModulation = useKit((s) => s.setModulation);
  const rx = useKit((s) => s.rxActive);
  const startRx = useKit((s) => s.startRx);
  const stopRx = useKit((s) => s.stopRx);
  const tx = useKit((s) => s.transmitCurrent);
  const save = useKit((s) => s.saveLastDecode);
  const remote = useKit((s) => s.selectedRemote);
  const press = useKit((s) => s.press);
  const decode = useKit((s) => s.lastDecode);
  const hopping = useKit((s) => s.hopping);

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <label className="grid gap-1">
          <span className="text-[11px] uppercase tracking-widest text-muted">Tune MHz</span>
          <span className="font-mono text-3xl tabular-nums leading-none text-primary">{formatMhz(mhz)}</span>
          <span className="font-mono text-xs text-faint">{formatHz(mhzToAudio(mhz))} acoustic</span>
        </label>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant={rx ? "signal" : "outline"} onClick={() => (rx ? stopRx() : startRx())}>
            {rx ? "Stop RX" : "Listen"}
          </Button>
          <Button size="sm" onClick={() => void tx()}>
            Transmit
          </Button>
          <Button size="sm" variant="outline" onClick={save} disabled={!decode}>
            Save
          </Button>
        </div>
      </div>
      <input
        type="range"
        min={MHZ_MIN}
        max={MHZ_MAX}
        step={0.01}
        value={mhz}
        onChange={(e) => setMhz(Number(e.target.value))}
        className="w-full accent-[var(--color-signal)]"
        aria-label="Frequency"
      />
      <div className="flex flex-wrap gap-1.5">
        {MODULATIONS.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setModulation(m)}
            className={cn(
              "h-8 rounded-[var(--radius-xs)] border px-2 font-mono text-[11px]",
              m === modulation ? "border-primary bg-primary text-primary-fg" : "border-border text-muted hover:text-fg",
            )}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="grid gap-1">
        <p className="text-[11px] uppercase tracking-widest text-muted">Demo library · sandbox keys</p>
        <div className="flex flex-wrap gap-1.5">
          {DEMO_REMOTES.map((r, i) => (
            <button
              key={r.id}
              type="button"
              onClick={() => {
                useKit.setState({ selectedRemote: i, mhz: r.mhz, modulation: r.modulation });
                void useKit.getState().transmitRemote(r.id);
              }}
              className={cn(
                "h-8 rounded-[var(--radius-xs)] border border-border px-2 text-xs text-muted hover:text-fg",
                i === remote && "border-primary text-primary",
              )}
            >
              {r.name}
            </button>
          ))}
          <Button size="sm" variant="ghost" onClick={() => press("ok")}>
            {hopping ? "Hold hop" : "Analyzer hop"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function RfidBench() {
  const tags = useKit((s) => s.rfid);
  const sel = useKit((s) => s.selectedRfid);
  const emulate = useKit((s) => s.emulateRfid);
  const add = useKit((s) => s.addRfidTag);
  return (
    <div className="grid gap-3">
      <p className="text-sm text-muted">
        LF coil is a 1250 Hz square wave (125 kHz ÷ 100). Tags below are sandbox IDs.
      </p>
      <ul className="grid gap-1">
        {tags.map((t, i) => (
          <li key={t.id}>
            <button
              type="button"
              onClick={() => useKit.setState({ selectedRfid: i })}
              className={cn(
                "flex w-full items-center justify-between rounded-[var(--radius-sm)] border px-3 py-2 text-left text-sm",
                i === sel ? "border-primary bg-elevated" : "border-border",
              )}
            >
              <span>
                {t.name} <span className="text-faint">{t.kind}</span>
              </span>
              <span className="font-mono text-xs text-primary">{t.uid}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        <Button size="sm" onClick={() => void emulate()}>
          Emulate coil
        </Button>
        <Button size="sm" variant="outline" onClick={add}>
          Random EM4100
        </Button>
      </div>
    </div>
  );
}

function NfcBench() {
  const cards = useKit((s) => s.nfc);
  const sel = useKit((s) => s.selectedNfc);
  const draft = useKit((s) => s.ndefDraft);
  const setDraft = useKit((s) => s.setNdefDraft);
  const save = useKit((s) => s.saveNdef);
  const emulate = useKit((s) => s.emulateNfc);
  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-1.5">
        {cards.map((c, i) => (
          <button
            key={c.id}
            type="button"
            onClick={() => useKit.setState({ selectedNfc: i, ndefDraft: c.ndef })}
            className={cn(
              "h-8 rounded-[var(--radius-xs)] border px-2 text-xs",
              i === sel ? "border-primary text-primary" : "border-border text-muted",
            )}
          >
            {c.name}
          </button>
        ))}
      </div>
      <p className="font-mono text-xs text-faint">{cards[sel]?.uid}</p>
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={3}
        className="w-full rounded-[var(--radius-sm)] border border-border bg-elevated px-3 py-2 font-mono text-sm text-fg"
        aria-label="NDEF payload"
      />
      <div className="flex gap-2">
        <Button size="sm" onClick={() => void emulate()}>
          Field 13.56
        </Button>
        <Button size="sm" variant="outline" onClick={save}>
          Write NDEF
        </Button>
      </div>
    </div>
  );
}

function IrBench() {
  const cmds = useKit((s) => s.ir);
  const sel = useKit((s) => s.selectedIr);
  const tx = useKit((s) => s.transmitIr);
  const learn = useKit((s) => s.learnIr);
  return (
    <div className="grid gap-3">
      <p className="text-sm text-muted">NEC bursts play as 3.8 kHz chirps (38 kHz IR carrier ÷ 10).</p>
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
        {cmds.map((c, i) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              useKit.setState({ selectedIr: i });
              void tx(c.id);
            }}
            className={cn(
              "h-11 rounded-[var(--radius-sm)] border border-border px-2 text-left text-xs hover:bg-elevated",
              i === sel && "border-primary",
            )}
          >
            <span className="block text-faint">{c.device}</span>
            {c.button}
          </button>
        ))}
      </div>
      <Button size="sm" variant="outline" onClick={() => void learn()}>
        Learn demo code
      </Button>
    </div>
  );
}

function GpioBench() {
  const pins = useKit((s) => s.gpio);
  const toggle = useKit((s) => s.togglePin);
  const cycle = useKit((s) => s.cyclePinMode);
  const uart = useKit((s) => s.uartLines);
  const input = useKit((s) => s.uartInput);
  const setInput = useKit((s) => s.setUartInput);
  const submit = useKit((s) => s.submitUart);
  const nmea = useKit((s) => s.nmeaOn);
  const toggleNmea = useKit((s) => s.toggleNmea);
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-4 gap-1.5">
        {pins.map((p) => (
          <button
            key={p.n}
            type="button"
            onClick={() => toggle(p.n)}
            onContextMenu={(e) => {
              e.preventDefault();
              cycle(p.n);
            }}
            className={cn(
              "rounded-[var(--radius-sm)] border px-2 py-2 text-left font-mono text-[11px]",
              p.value ? "border-primary bg-primary/15 text-primary" : "border-border text-muted",
            )}
          >
            <span className="block text-fg">{p.name}</span>
            {p.mode} {p.value ? "HI" : "LO"}
          </button>
        ))}
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-widest text-muted">USB-UART</p>
          <Button size="sm" variant="ghost" onClick={toggleNmea}>
            {nmea ? "NMEA on" : "NMEA"}
          </Button>
        </div>
        <pre className="mb-2 max-h-32 overflow-auto rounded-[var(--radius-sm)] bg-lcd p-2 font-mono text-[11px] text-lcd-pixel">
          {uart.join("\n")}
        </pre>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="AT"
            className="h-10 min-w-0 flex-1 rounded-[var(--radius-sm)] border border-border bg-elevated px-3 font-mono text-sm"
            aria-label="UART command"
          />
          <Button type="submit" size="sm">
            Send
          </Button>
        </form>
      </div>
      <p className="text-xs text-faint">
        I2C ACK {I2C_MAP.map((d) => d.addr).join("  ")}
      </p>
    </div>
  );
}

function IbuttonBench() {
  const keys = useKit((s) => s.ibutton);
  const sel = useKit((s) => s.selectedIbutton);
  const emulate = useKit((s) => s.emulateIbutton);
  return (
    <div className="grid gap-2">
      {keys.map((k, i) => (
        <button
          key={k.id}
          type="button"
          onClick={() => useKit.setState({ selectedIbutton: i })}
          className={cn(
            "rounded-[var(--radius-sm)] border px-3 py-2 text-left font-mono text-xs",
            i === sel ? "border-primary" : "border-border",
          )}
        >
          {k.name} · {k.rom}
        </button>
      ))}
      <Button size="sm" onClick={() => void emulate()}>
        Drive 1-Wire
      </Button>
    </div>
  );
}

function HidBench() {
  const script = useKit((s) => s.script);
  const setScript = useKit((s) => s.setScript);
  const run = useKit((s) => s.runHid);
  const out = useKit((s) => s.hidOutput);
  const running = useKit((s) => s.hidRunning);
  return (
    <div className="grid gap-3">
      <p className="text-sm text-muted">
        Duckyscript runs against a fake host. Nothing is typed into your machine.
      </p>
      <textarea
        value={script}
        onChange={(e) => setScript(e.target.value)}
        rows={7}
        className="w-full rounded-[var(--radius-sm)] border border-border bg-elevated px-3 py-2 font-mono text-xs"
        aria-label="HID script"
      />
      <Button size="sm" onClick={() => void run()} disabled={running}>
        {running ? "Injecting…" : "Run sandbox"}
      </Button>
      <pre className="min-h-20 whitespace-pre-wrap rounded-[var(--radius-sm)] bg-lcd p-3 font-mono text-xs text-lcd-pixel">
        {out || "target desktop waiting"}
      </pre>
    </div>
  );
}

function BleBench() {
  const ble = useKit((s) => s.ble);
  const scanning = useKit((s) => s.bleScanning);
  const scan = useKit((s) => s.scanBle);
  return (
    <div className="grid gap-3">
      <Button size="sm" onClick={scan} disabled={scanning}>
        {scanning ? "Scanning…" : "LE scan"}
      </Button>
      <ul className="grid gap-1">
        {ble.map((d) => (
          <li key={d.id} className="rounded-[var(--radius-sm)] border border-border px-3 py-2">
            <p className="flex justify-between text-sm">
              <span>{d.name}</span>
              <span className="font-mono tabular-nums text-faint">{d.rssi} dBm</span>
            </p>
            <p className="font-mono text-[11px] text-muted">{d.addr}</p>
            <p className="font-mono text-[11px] text-faint">{d.adv}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function U2fBench() {
  const armed = useKit((s) => s.u2fArmed);
  const last = useKit((s) => s.u2fLast);
  const confirm = useKit((s) => s.confirmU2f);
  return (
    <div className="grid gap-3">
      <p className="text-sm text-muted">Presence-only demo. No real FIDO credential is stored.</p>
      <Button onClick={confirm}>{armed ? "Touch to assert" : "Request presence"}</Button>
      {last ? <p className="font-mono text-xs text-ok">{last}</p> : null}
    </div>
  );
}

function AppsBench() {
  const screen = useKit((s) => currentScreen(s));
  const snake = useKit((s) => s.snake);
  const music = useKit((s) => s.music);
  const toggleTracker = useKit((s) => s.toggleTracker);
  const lab = useKit((s) => s.soundlab);
  const setLab = useKit((s) => s.setSoundlab);
  const toggleLab = useKit((s) => s.toggleSoundlab);
  if (screen === "apps-snake") {
    return <p className="text-sm text-muted">Score {snake.score}. D-pad steers. Wrap-around field.</p>;
  }
  if (screen === "apps-music") {
    return (
      <div className="grid gap-2">
        <p className="font-mono text-sm text-primary">{music.pattern.join(" ")}</p>
        <Button size="sm" onClick={toggleTracker}>
          {music.playing ? "Stop" : "Play"}
        </Button>
      </div>
    );
  }
  return (
    <div className="grid gap-3">
      <label className="grid gap-1 text-xs text-muted">
        Oscillator {formatHz(lab.oscA)}
        <input
          type="range"
          min={80}
          max={8000}
          value={lab.oscA}
          onChange={(e) => setLab({ oscA: Number(e.target.value) })}
          className="accent-[var(--color-signal)]"
        />
      </label>
      <div className="flex gap-1.5">
        {(["square", "sine", "sawtooth", "triangle"] as const).map((w) => (
          <button
            key={w}
            type="button"
            onClick={() => setLab({ wave: w })}
            className={cn(
              "h-8 rounded-[var(--radius-xs)] border px-2 text-xs",
              lab.wave === w ? "border-primary text-primary" : "border-border text-muted",
            )}
          >
            {w}
          </button>
        ))}
      </div>
      <Button size="sm" onClick={() => void toggleLab()}>
        {lab.running ? "Stop osc" : "Start osc"}
      </Button>
    </div>
  );
}

function SettingsBench() {
  const settings = useKit((s) => s.settings);
  const setSetting = useKit((s) => s.setSetting);
  const captures = useKit((s) => s.captures);
  const txCap = useKit((s) => s.transmitCapture);
  return (
    <div className="grid gap-3 text-sm">
      <Toggle
        label="Virtual ISM air"
        on={settings.ambientAir}
        onClick={() => setSetting("ambientAir", !settings.ambientAir)}
      />
      <Toggle
        label="Play ambient through speaker"
        on={settings.ambientAudio}
        onClick={() => setSetting("ambientAudio", !settings.ambientAudio)}
      />
      <Toggle
        label="Verbose tune logs"
        on={settings.verbose}
        onClick={() => setSetting("verbose", !settings.verbose)}
      />
      <Toggle
        label="Show acoustic Hz on LCD"
        on={settings.showAudioHz}
        onClick={() => setSetting("showAudioHz", !settings.showAudioHz)}
      />
      {captures.length ? (
        <div className="grid gap-1">
          <p className="text-[11px] uppercase tracking-widest text-muted">Archive</p>
          {captures.slice(0, 8).map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => void txCap(c.id)}
              className="flex justify-between rounded-[var(--radius-sm)] border border-border px-3 py-2 text-left text-xs hover:bg-elevated"
            >
              <span>{c.name}</span>
              <span className="font-mono text-faint">{groupHex(c.hex)}</span>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-muted">Archive is empty. Decode a signal, then Save.</p>
      )}
    </div>
  );
}

function Toggle({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-11 items-center justify-between rounded-[var(--radius-sm)] border border-border px-3"
    >
      <span>{label}</span>
      <span className={cn("font-mono text-xs", on ? "text-ok" : "text-faint")}>{on ? "ON" : "off"}</span>
    </button>
  );
}
