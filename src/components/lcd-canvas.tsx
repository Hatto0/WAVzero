import { useEffect, useRef } from "react";
import { sceneFor } from "@/lib/firmware";
import { useKit } from "@/lib/store";
import type { LcdScene } from "@/lib/types";
import { formatClock } from "@/lib/utils";

const W = 128;
const H = 64;

export function LcdCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contrast = useKit((s) => s.settings.lcdContrast);
  const snap = useKit((s) => s);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const scene = sceneFor(snap);
    drawLcd(ctx, scene, contrast, new Date(snap.now), snap.audioReady, snap.txActive, snap.rxActive);
  }, [snap, contrast]);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      className="block h-full w-full"
      style={{ imageRendering: "pixelated" }}
      aria-label="Device LCD"
    />
  );
}

function drawLcd(
  ctx: CanvasRenderingContext2D,
  scene: LcdScene,
  contrast: number,
  now: Date,
  audio: boolean,
  tx: boolean,
  rx: boolean,
) {
  const on = `rgba(200, 210, 184, ${0.55 + contrast * 0.45})`;
  const dim = `rgba(200, 210, 184, ${0.18 + contrast * 0.16})`;
  ctx.fillStyle = "#0e1410";
  ctx.fillRect(0, 0, W, H);
  ctx.imageSmoothingEnabled = false;
  ctx.font = "7px ui-monospace, monospace";
  ctx.textBaseline = "top";

  let y = 0;
  if (scene.status !== false) {
    ctx.fillStyle = on;
    ctx.fillRect(0, 0, W, 11);
    ctx.fillStyle = "#0e1410";
    ctx.fillText(formatClock(now), 2, 2);
    const right = [audio ? "AU" : "--", tx ? "TX" : rx ? "RX" : "  "].join(" ");
    ctx.fillText(right, W - ctx.measureText(right).width - 2, 2);
    y = 13;
  }

  if (scene.center) {
    ctx.fillStyle = on;
    const start = 18;
    scene.center.forEach((line, i) => {
      const x = Math.max(2, (W - ctx.measureText(line).width) / 2);
      ctx.fillText(line, x, start + i * 9);
    });
  }

  if (scene.title) {
    if (scene.invertTitle) {
      ctx.fillStyle = on;
      ctx.fillRect(0, y, W, 10);
      ctx.fillStyle = "#0e1410";
    } else {
      ctx.fillStyle = on;
    }
    ctx.fillText(scene.title, 2, y + 1);
    y += 11;
    ctx.fillStyle = dim;
    ctx.fillRect(0, y - 1, W, 1);
  }

  ctx.font = "8px ui-monospace, monospace";
  (scene.lines ?? []).forEach((line) => {
    if (line.invert) {
      ctx.fillStyle = on;
      ctx.fillRect(0, y, W, 10);
      ctx.fillStyle = "#0e1410";
      ctx.fillText(clip(ctx, line.text, W - 4), 2, y + 1);
    } else {
      ctx.fillStyle = line.dim ? dim : on;
      ctx.fillText(clip(ctx, line.text, W - 4), line.indent ? 8 : 2, y + 1);
    }
    y += 10;
  });

  if (scene.graph) {
    const gh = scene.lines.length ? 18 : 36;
    const gy = Math.min(y + 1, H - gh - 9);
    drawGraph(ctx, scene.graph.samples, 2, gy, W - 4, gh, on, dim);
  }

  if (scene.footer) {
    ctx.fillStyle = dim;
    ctx.fillRect(0, H - 9, W, 1);
    ctx.fillStyle = on;
    ctx.font = "7px ui-monospace, monospace";
    ctx.fillText(clip(ctx, scene.footer, W - 4), 2, H - 8);
  }

  if (scene.popup) {
    const pw = 100;
    const ph = 22;
    const px = (W - pw) / 2;
    const py = 20;
    ctx.fillStyle = "#0e1410";
    ctx.fillRect(px, py, pw, ph);
    ctx.strokeStyle = on;
    ctx.strokeRect(px + 0.5, py + 0.5, pw - 1, ph - 1);
    ctx.fillStyle = on;
    ctx.fillText(scene.popup, px + 6, py + 8);
  }
}

function clip(ctx: CanvasRenderingContext2D, text: string, max: number) {
  if (ctx.measureText(text).width <= max) return text;
  let t = text;
  while (t.length && ctx.measureText(`${t}…`).width > max) t = t.slice(0, -1);
  return `${t}…`;
}

function drawGraph(
  ctx: CanvasRenderingContext2D,
  samples: number[],
  x: number,
  y: number,
  w: number,
  h: number,
  on: string,
  dim: string,
) {
  ctx.strokeStyle = dim;
  ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
  const n = samples.length;
  const bar = w / n;
  ctx.fillStyle = on;
  for (let i = 0; i < n; i++) {
    const v = samples[i] ?? 0;
    const bh = Math.max(1, v * (h - 4));
    ctx.fillRect(x + i * bar, y + h - 2 - bh, Math.max(1, bar - 0.3), bh);
  }
}
