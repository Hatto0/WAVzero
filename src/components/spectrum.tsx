import { useEffect, useRef } from "react";
import { readSpectrum } from "@/lib/audio";
import { useKit } from "@/lib/store";
import { formatHz, mhzToAudio } from "@/lib/utils";

export function Spectrum() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hist = useRef<number[][]>([]);
  const mhz = useKit((s) => s.mhz);
  const rx = useKit((s) => s.rxActive);
  const tx = useKit((s) => s.txActive);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx) {
        const frame = readSpectrum();
        paint(ctx, canvas, frame, mhz, hist.current);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [mhz]);

  return (
    <section className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface">
      <header className="flex items-center justify-between border-b border-border px-3 py-2">
        <h2 className="text-xs font-medium tracking-wide text-muted">Air · spectrum</h2>
        <p className="font-mono text-[11px] tabular-nums text-primary">
          {tx ? "TX" : rx ? "RX" : "IDLE"} · marker {formatHz(mhzToAudio(mhz))}
        </p>
      </header>
      <canvas ref={canvasRef} width={720} height={168} className="h-[168px] w-full" />
    </section>
  );
}

function paint(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  frame: ReturnType<typeof readSpectrum>,
  mhz: number,
  hist: number[][],
) {
  const w = canvas.width;
  const h = canvas.height;
  ctx.fillStyle = "#10110e";
  ctx.fillRect(0, 0, w, h);
  if (!frame) {
    ctx.fillStyle = "#5c5f56";
    ctx.font = "12px IBM Plex Mono, monospace";
    ctx.fillText("Audio idle — press OK on the device to boot the codec", 16, h / 2);
    return;
  }

  const bins = frame.bins;
  const n = Math.min(bins.length, 420);
  const row: number[] = [];
  for (let i = 0; i < n; i++) {
    const db = bins[i] ?? -120;
    row.push((db + 100) / 80);
  }
  hist.unshift(row);
  if (hist.length > 46) hist.length = 46;

  const waterH = 72;
  for (let y = 0; y < hist.length; y++) {
    const r = hist[y]!;
    for (let x = 0; x < r.length; x++) {
      const v = Math.max(0, Math.min(1, r[x]!));
      const g = 80 + v * 140;
      const o = 40 + v * 90;
      ctx.fillStyle = `rgb(${o * v + 20}, ${g}, ${80})`;
      ctx.fillRect((x / n) * w, y * (waterH / 46), w / n + 0.5, waterH / 46 + 0.5);
    }
  }

  ctx.beginPath();
  ctx.strokeStyle = "#c8d2b8";
  ctx.lineWidth = 1.4;
  const base = waterH + 8;
  const amp = h - base - 10;
  for (let i = 0; i < n; i++) {
    const v = Math.max(0, Math.min(1, row[i]!));
    const x = (i / n) * w;
    const y = base + amp - v * amp;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  const markerX = Math.min(0.98, mhzToAudio(mhz) / 8000) * w;
  ctx.strokeStyle = "#e07020";
  ctx.beginPath();
  ctx.moveTo(markerX, 0);
  ctx.lineTo(markerX, h);
  ctx.stroke();
}
