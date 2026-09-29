import {
  APPS_MENU,
  BADUSB_MENU,
  DEMO_REMOTES,
  GPIO_MENU,
  I2C_MAP,
  IBUTTON_MENU,
  IR_MENU,
  MAIN_MENU,
  NFC_MENU,
  RFID_MENU,
  SETTINGS_MENU,
  SUBGHZ_MENU,
} from "./library";
import { currentCursor, currentScreen, type KitState } from "./store";
import type { LcdLine, LcdScene } from "./types";
import { formatMhz, mhzToAudio } from "./utils";

function menuLines(
  items: { label: string }[],
  cursor: number,
  visible = 5,
): LcdLine[] {
  const start = Math.max(0, Math.min(cursor - (visible - 1), items.length - visible));
  return items.slice(start, start + visible).map((it, i) => ({
    text: it.label,
    invert: start + i === cursor,
  }));
}

function rssiBar(rssi: number) {
  const n = Math.max(0, Math.min(8, Math.round((rssi + 100) / 8)));
  return "#".repeat(n).padEnd(8, "-");
}

export function sceneFor(s: KitState): LcdScene {
  const screen = currentScreen(s);
  const cursor = currentCursor(s);

  if (!s.booted || screen === "boot") {
    return {
      status: false,
      lines: [],
      center: ["WAVZERO", "sound-wave radio", "", "press OK to boot"],
      footer: "audio field kit",
    };
  }

  switch (screen) {
    case "menu":
      return { title: "WAVZERO", lines: menuLines(MAIN_MENU, cursor, 5), footer: MAIN_MENU[cursor]?.hint };
    case "subghz":
      return { title: "Sub-GHz", lines: menuLines(SUBGHZ_MENU, cursor), footer: `${formatMhz(s.mhz)} MHz` };
    case "subghz-read":
      return {
        title: "Read",
        lines: [
          { text: `Freq ${formatMhz(s.mhz)}` },
          { text: `Mod  ${s.modulation}` },
          { text: `RSSI ${rssiBar(s.rssi)}` },
          { text: s.rxActive ? "listening..." : "OK to listen", dim: !s.rxActive },
          {
            text: s.lastDecode ? s.lastDecode.protocol : "no decode",
            dim: !s.lastDecode,
          },
        ],
        footer: s.settings.showAudioHz ? `${mhzToAudio(s.mhz).toFixed(0)} Hz` : "L/R tune",
      };
    case "subghz-raw": {
      const samples = pulseToSamples(s.pulseView);
      return {
        title: "RAW",
        lines: [
          { text: `${formatMhz(s.mhz)}  ${s.modulation}` },
          { text: s.rxActive ? "REC  running" : "REC  idle" },
        ],
        graph: { samples, label: "pulses" },
        footer: "OK rec  L/R hop",
      };
    }
    case "subghz-analyzer": {
      const rows = [...s.air]
        .sort((a, b) => b.lastHeard - a.lastHeard)
        .slice(0, 5)
        .map((a) => ({
          text: `${a.mhz.toFixed(2).padStart(6, " ")} ${rssiBar(a.rssi).slice(0, 6)}`,
        }));
      return {
        title: "Analyzer",
        lines: rows.length ? rows : [{ text: "scanning air...", dim: true }],
        footer: s.hopping ? "HOP ON  OK hold" : "OK hop",
      };
    }
    case "subghz-tx": {
      const r = DEMO_REMOTES[s.selectedRemote]!;
      return {
        title: "Transmit",
        invertTitle: s.txActive,
        lines: [
          { text: r.name, invert: true },
          { text: r.protocol },
          { text: `${formatMhz(r.mhz)}  ${r.modulation}` },
          { text: `${r.bits.length} bit  DEMO` },
        ],
        footer: s.txActive ? "TX ..." : "OK send",
      };
    }
    case "subghz-saved":
    case "archive": {
      const items = s.captures;
      if (!items.length) {
        return { title: "Archive", lines: [{ text: "empty", dim: true }], footer: "save from Read" };
      }
      const start = Math.max(0, s.selectedCapture - 3);
      return {
        title: screen === "archive" ? "Archive" : "Saved",
        lines: items.slice(start, start + 5).map((c, i) => ({
          text: c.name.slice(0, 20),
          invert: start + i === s.selectedCapture,
        })),
        footer: "OK replay",
      };
    }
    case "rfid":
      return { title: "125 kHz", lines: menuLines(RFID_MENU, cursor), footer: "coil 1250 Hz" };
    case "rfid-read":
    case "rfid-emulate": {
      const t = s.rfid[s.selectedRfid];
      return {
        title: screen === "rfid-read" ? "RFID Read" : "Emulate",
        lines: [
          { text: t?.name ?? "no tag", invert: true },
          { text: t?.kind ?? "" },
          { text: t?.uid ?? "" },
          { text: screen === "rfid-read" ? "OK scan field" : "OK emulate" },
        ],
        footer: "U/D pick tag",
      };
    }
    case "rfid-saved":
      return {
        title: "RFID saved",
        lines: s.rfid.slice(0, 5).map((t, i) => ({ text: t.name, invert: i === s.selectedRfid })),
        footer: "OK new random",
      };
    case "nfc":
      return { title: "NFC", lines: menuLines(NFC_MENU, cursor), footer: "13.56 / 1.356 kHz" };
    case "nfc-read":
    case "nfc-emulate": {
      const c = s.nfc[s.selectedNfc];
      return {
        title: screen === "nfc-read" ? "NFC Read" : "Emulate",
        lines: [
          { text: c?.name ?? "", invert: true },
          { text: c?.type ?? "" },
          { text: c?.uid ?? "" },
          { text: (c?.ndef || "empty").slice(0, 21) },
        ],
        footer: "OK",
      };
    }
    case "nfc-ndef":
      return {
        title: "NDEF",
        lines: [
          { text: s.nfc[s.selectedNfc]?.name ?? "", invert: true },
          { text: s.ndefDraft.slice(0, 21) || "empty" },
          { text: s.ndefDraft.slice(21, 42) },
          { text: "OK write sandbox" },
        ],
      };
    case "ir":
      return { title: "Infrared", lines: menuLines(IR_MENU, cursor), footer: "38 kHz → 3.8 kHz" };
    case "ir-library":
    case "ir-tx": {
      const c = s.ir[s.selectedIr];
      return {
        title: "IR",
        lines: [
          { text: `${c?.brand} ${c?.device}`.slice(0, 21), invert: true },
          { text: c?.button ?? "" },
          { text: `${c?.protocol} ${c?.address} ${c?.command}` },
        ],
        footer: s.txActive ? "IR LED" : "OK send chirp",
      };
    }
    case "ir-learn":
      return {
        title: "Learn",
        lines: [
          { text: "point remote at mic" },
          { text: "or OK for demo learn" },
          { text: `${s.ir.filter((i) => i.brand === "Learned").length} learned` },
        ],
      };
    case "gpio":
      return { title: "GPIO", lines: menuLines(GPIO_MENU, cursor) };
    case "gpio-pins":
      return {
        title: "Pins",
        lines: s.gpio.slice(0, 5).map((p, i) => ({
          text: `${p.name} ${p.mode.padEnd(3, " ")} ${p.value ? "HI" : "LO"}`,
          invert: i === cursor,
        })),
        footer: "OK toggle  L/R mode",
      };
    case "gpio-uart":
      return {
        title: "UART",
        lines: s.uartLines.slice(-4).map((t) => ({ text: t.slice(0, 21), dim: t.startsWith(">") })),
        footer: s.nmeaOn ? "NMEA on" : "115200 8N1",
      };
    case "gpio-i2c":
      return {
        title: "I2C",
        lines: I2C_MAP.map((d) => ({ text: `${d.addr} ${d.name}`.slice(0, 21) })),
        footer: "OK rescan",
      };
    case "ibutton":
      return { title: "iButton", lines: menuLines(IBUTTON_MENU, cursor) };
    case "ibutton-read":
    case "ibutton-emulate": {
      const k = s.ibutton[s.selectedIbutton];
      return {
        title: "1-Wire",
        lines: [
          { text: k?.name ?? "", invert: true },
          { text: k?.family ?? "" },
          { text: k?.rom.slice(0, 21) ?? "" },
        ],
        footer: "OK",
      };
    }
    case "badusb":
      return { title: "Bad USB", lines: menuLines(BADUSB_MENU, cursor), footer: "sandbox only" };
    case "badusb-edit":
      return {
        title: "Script",
        lines: s.script
          .split("\n")
          .filter(Boolean)
          .slice(0, 5)
          .map((t) => ({ text: t.slice(0, 21) })),
        footer: "edit in lab",
      };
    case "badusb-run":
      return {
        title: "HID",
        lines: [
          { text: s.hidRunning ? "injecting..." : "OK run sandbox" },
          { text: s.hidOutput.split("\n").at(-1)?.slice(0, 21) || "" },
        ],
        footer: "never leaves kit",
      };
    case "ble":
    case "ble-scan": {
      const rows = s.ble.length
        ? s.ble.slice(0, 5).map((d, i) => ({
            text: `${d.rssi} ${d.name}`.slice(0, 21),
            invert: i === cursor,
          }))
        : [{ text: s.bleScanning ? "scanning..." : "OK scan", dim: true }];
      return { title: "Bluetooth", lines: rows, footer: `${s.ble.length} adv` };
    }
    case "u2f":
      return {
        title: "U2F",
        lines: [
          { text: s.u2fArmed ? "press OK presence" : "idle  sandbox RP", invert: s.u2fArmed },
          { text: "rp sandbox.wavzero" },
          { text: s.u2fLast ? "last assert ok" : "no assertion" },
        ],
      };
    case "apps":
      return { title: "Apps", lines: menuLines(APPS_MENU, cursor) };
    case "apps-snake": {
      const samples = snakeSamples(s);
      return {
        title: `Snake ${s.snake.score}`,
        lines: s.snake.alive ? [] : [{ text: "game over  OK retry" }],
        graph: { samples },
        footer: "D-pad  OK retry",
      };
    }
    case "apps-music":
      return {
        title: "Tracker",
        lines: [
          { text: s.music.pattern.map((n, i) => (i === s.music.step ? `[${n}]` : `${n}`)).join("") },
          { text: s.music.playing ? "playing" : "stopped" },
          { text: "L/R note  U/D step" },
        ],
        footer: "OK run",
      };
    case "apps-soundlab":
      return {
        title: "Sound lab",
        lines: [
          { text: `${s.soundlab.oscA.toFixed(0)} Hz` },
          { text: `mix ${s.soundlab.mix.toFixed(1)}  ${s.soundlab.wave}` },
          { text: s.soundlab.running ? "RUNNING" : "OK start", invert: s.soundlab.running },
        ],
        footer: "L/R freq",
      };
    case "settings":
      return { title: "Settings", lines: menuLines(SETTINGS_MENU, cursor) };
    case "settings-audio":
      return {
        title: "Audio",
        lines: [
          { text: `gain ${s.settings.masterGain.toFixed(2)}` },
          { text: `air speaker ${s.settings.ambientAudio ? "ON" : "off"}` },
          { text: `verbose ${s.settings.verbose ? "ON" : "off"}` },
        ],
        footer: "L/R gain  OK air",
      };
    case "settings-radio":
      return {
        title: "Radio map",
        lines: [
          { text: "MHz x10 = audio Hz" },
          { text: `show Hz ${s.settings.showAudioHz ? "ON" : "off"}` },
          { text: `virtual air ${s.settings.ambientAir ? "ON" : "off"}` },
          { text: `LCD ${s.settings.lcdContrast.toFixed(2)}` },
        ],
      };
    case "about":
      return {
        title: "About",
        lines: [
          { text: "WAVZERO 1.4" },
          { text: "education sandbox" },
          { text: "no RF  sound only" },
          { text: "demo keys never real" },
        ],
      };
    default:
      return { title: screen, lines: [{ text: "..." }] };
  }
}

function pulseToSamples(flat: number[]) {
  const samples = new Array(64).fill(0.15);
  if (!flat.length) return samples;
  let x = 0;
  for (let i = 0; i < flat.length && x < 64; i += 2) {
    const on = flat[i];
    const dur = flat[i + 1] ?? 0.0003;
    const w = Math.max(1, Math.round(dur * 8000));
    for (let k = 0; k < w && x < 64; k++, x++) samples[x] = on ? 0.9 : 0.12;
  }
  return samples;
}

function snakeSamples(s: KitState) {
  const { w, h, body, food } = s.snake;
  const samples = new Array(64).fill(0.08);
  const plot = (x: number, y: number, v: number) => {
    const col = Math.floor((x / w) * 32);
    const row = Math.floor((y / h) * 2);
    const idx = Math.min(63, col + row * 32);
    samples[idx] = v;
  };
  body.forEach((b, i) => plot(b.x, b.y, i === 0 ? 1 : 0.7));
  plot(food.x, food.y, 0.45);
  return samples;
}
