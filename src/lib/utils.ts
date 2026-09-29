import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

export function formatClock(d: Date) {
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

export function formatMs(ts: number) {
  const d = new Date(ts);
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}.${d
    .getMilliseconds()
    .toString()
    .padStart(3, "0")}`;
}

export function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function mhzToAudio(mhz: number) {
  return mhz * 10;
}

export function audioToMhz(hz: number) {
  return hz / 10;
}

export function formatMhz(mhz: number) {
  return mhz.toFixed(2);
}

export function formatHz(hz: number) {
  if (hz >= 1000) return `${(hz / 1000).toFixed(3)} kHz`;
  return `${hz.toFixed(1)} Hz`;
}

export function hexFromBits(bits: string) {
  const pad = bits.padEnd(Math.ceil(bits.length / 4) * 4, "0");
  let hex = "";
  for (let i = 0; i < pad.length; i += 4) {
    hex += Number.parseInt(pad.slice(i, i + 4), 2).toString(16).toUpperCase();
  }
  return hex.length % 2 ? `0${hex}` : hex;
}

export function bitsFromHex(hex: string) {
  return hex
    .replace(/[^0-9a-f]/gi, "")
    .split("")
    .map((c) => Number.parseInt(c, 16).toString(2).padStart(4, "0"))
    .join("");
}

export function groupHex(hex: string, every = 2) {
  const clean = hex.replace(/[^0-9A-Fa-f]/g, "").toUpperCase();
  return clean.match(new RegExp(`.{1,${every}}`, "g"))?.join(" ") ?? clean;
}
