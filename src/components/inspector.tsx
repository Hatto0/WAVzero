import { useKit } from "@/lib/store";
import { formatHz, formatMhz, groupHex, mhzToAudio } from "@/lib/utils";

export function Inspector() {
  const decode = useKit((s) => s.lastDecode);
  const rssi = useKit((s) => s.rssi);
  const snr = useKit((s) => s.snr);
  const mhz = useKit((s) => s.mhz);
  const modulation = useKit((s) => s.modulation);
  const air = useKit((s) => s.air);
  const tx = useKit((s) => s.txActive);
  const txName = useKit((s) => s.txName);
  const mic = useKit((s) => s.micOn);
  const audio = useKit((s) => s.audioReady);

  const rows: [string, string][] = [
    ["Codec", audio ? "running" : "idle"],
    ["Mic", mic ? "tapped" : "off"],
    ["Display", `${formatMhz(mhz)} MHz`],
    ["Acoustic", formatHz(mhzToAudio(mhz))],
    ["Preset", modulation],
    ["RSSI", `${rssi.toFixed(1)} dBm`],
    ["SNR", `${snr.toFixed(1)} dB`],
    ["Link", tx ? `TX ${txName}` : "listen"],
    ["Protocol", decode?.protocol ?? "—"],
    ["Bits", decode?.bits ?? "—"],
    ["Hex", decode ? groupHex(decode.hex) : "—"],
    ["TE", decode ? `${decode.teUs} µs` : "—"],
    ["Repeats", decode ? String(decode.repeats) : "—"],
  ];

  return (
    <section className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface">
      <header className="border-b border-border px-3 py-2">
        <h2 className="text-xs font-medium tracking-wide text-muted">Inspector</h2>
      </header>
      <dl className="grid grid-cols-[88px_1fr] gap-x-3 gap-y-1 px-3 py-3 font-mono text-[11px]">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-faint">{k}</dt>
            <dd className="truncate text-primary">{v}</dd>
          </div>
        ))}
      </dl>
      {decode?.notes.length ? (
        <p className="border-t border-border px-3 py-2 text-xs text-muted">{decode.notes.join(" · ")}</p>
      ) : null}
      {air.length ? (
        <ul className="border-t border-border px-3 py-2 font-mono text-[11px] text-muted">
          {air.slice(0, 4).map((a) => (
            <li key={a.id + a.lastHeard} className="flex justify-between gap-2">
              <span>
                {a.mhz.toFixed(2)} {a.protocol}
              </span>
              <span className="tabular-nums text-faint">{a.rssi} dBm</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
