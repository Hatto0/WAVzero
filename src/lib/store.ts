import { create } from "zustand";
import {
  attachMic,
  detachMic,
  playCarrier,
  playTrackerNote,
  resumeEngine,
  startLabOsc,
  stopLabOsc,
  TRACKER_SCALE,
  transmitTone,
  updateLabOsc,
} from "./audio";
import {
  APPS_MENU,
  BADUSB_MENU,
  DEFAULT_SCRIPT,
  DEMO_BLE,
  DEMO_IBUTTON,
  DEMO_IR,
  DEMO_NFC,
  DEMO_REMOTES,
  DEMO_RFID,
  FREQ_PRESETS,
  GPIO_MENU,
  IBUTTON_MENU,
  IR_MENU,
  MAIN_MENU,
  MHZ_DEFAULT,
  MHZ_MAX,
  MHZ_MIN,
  MODULATIONS,
  NFC_MENU,
  pulsesForIr,
  pulsesForRemote,
  randomEm4100,
  RFID_MENU,
  SETTINGS_MENU,
  SUBGHZ_MENU,
  UART_HELP,
} from "./library";
import type {
  AirSignal,
  BleDevice,
  Capture,
  DecodeTrace,
  GpioPin,
  IButtonKey,
  InputKey,
  IrCommand,
  LogLevel,
  LogLine,
  Modulation,
  MusicState,
  NavFrame,
  NfcCard,
  RfidTag,
  ScreenId,
  SnakeState,
  SoundLabState,
} from "./types";
import { clamp, hexFromBits, mhzToAudio, uid } from "./utils";

const STORAGE_KEY = "wavzero.v1";

type Persisted = {
  captures: Capture[];
  rfid: RfidTag[];
  nfc: NfcCard[];
  ir: IrCommand[];
  ibutton: IButtonKey[];
  script: string;
  settings: KitState["settings"];
};

function loadPersisted(): Partial<Persisted> {
  if (typeof localStorage === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Persisted) : {};
  } catch {
    return {};
  }
}

function savePersisted(s: KitState) {
  if (typeof localStorage === "undefined") return;
  const payload: Persisted = {
    captures: s.captures,
    rfid: s.rfid,
    nfc: s.nfc,
    ir: s.ir,
    ibutton: s.ibutton,
    script: s.script,
    settings: s.settings,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function defaultPins(): GpioPin[] {
  const names = ["A7", "A6", "A4", "B3", "B2", "C3", "C1", "C0"];
  return names.map((name, i) => ({
    n: i,
    name,
    mode: i < 4 ? "OUT" : "IN",
    value: 0,
  }));
}

function spawnFood(w: number, h: number, body: { x: number; y: number }[]) {
  for (let k = 0; k < 40; k++) {
    const x = Math.floor(Math.random() * w);
    const y = Math.floor(Math.random() * h);
    if (!body.some((b) => b.x === x && b.y === y)) return { x, y };
  }
  return { x: 0, y: 0 };
}

function freshSnake(): SnakeState {
  const w = 20;
  const h = 10;
  const body = [
    { x: 6, y: 5 },
    { x: 5, y: 5 },
    { x: 4, y: 5 },
  ];
  return {
    w,
    h,
    body,
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    food: spawnFood(w, h, body),
    alive: true,
    score: 0,
    acc: 0,
  };
}

let logSeq = 1;

export type KitState = {
  booted: boolean;
  audioReady: boolean;
  micOn: boolean;
  nav: NavFrame[];
  mhz: number;
  modulation: Modulation;
  hopping: boolean;
  rxActive: boolean;
  txActive: boolean;
  txName: string;
  rssi: number;
  snr: number;
  lastDecode: DecodeTrace | null;
  air: AirSignal[];
  captures: Capture[];
  rfid: RfidTag[];
  nfc: NfcCard[];
  ir: IrCommand[];
  ibutton: IButtonKey[];
  ble: BleDevice[];
  bleScanning: boolean;
  selectedRfid: number;
  selectedNfc: number;
  selectedIr: number;
  selectedIbutton: number;
  selectedRemote: number;
  selectedCapture: number;
  ndefDraft: string;
  gpio: GpioPin[];
  uartLines: string[];
  uartInput: string;
  nmeaOn: boolean;
  script: string;
  hidOutput: string;
  hidRunning: boolean;
  u2fArmed: boolean;
  u2fLast: string;
  snake: SnakeState;
  music: MusicState;
  soundlab: SoundLabState;
  logs: LogLine[];
  logFilter: string;
  settings: {
    masterGain: number;
    ambientAudio: boolean;
    ambientAir: boolean;
    verbose: boolean;
    showAudioHz: boolean;
    lcdContrast: number;
  };
  now: number;
  pulseView: number[];
};

type KitActions = {
  hydrate: () => void;
  boot: () => Promise<void>;
  press: (key: InputKey) => void;
  setMhz: (mhz: number) => void;
  setModulation: (m: Modulation) => void;
  startRx: () => void;
  stopRx: () => void;
  transmitCurrent: () => Promise<void>;
  transmitRemote: (id: string) => Promise<void>;
  transmitCapture: (id: string) => Promise<void>;
  saveLastDecode: () => void;
  tick: (dt: number) => void;
  toggleMic: () => Promise<void>;
  addLog: (mod: string, level: LogLevel, msg: string, detail?: string) => void;
  setLogFilter: (v: string) => void;
  setSetting: <K extends keyof KitState["settings"]>(k: K, v: KitState["settings"][K]) => void;
  setNdefDraft: (v: string) => void;
  saveNdef: () => void;
  addRfidTag: () => void;
  setScript: (v: string) => void;
  runHid: () => Promise<void>;
  setUartInput: (v: string) => void;
  submitUart: () => void;
  togglePin: (n: number) => void;
  cyclePinMode: (n: number) => void;
  toggleSoundlab: () => Promise<void>;
  setSoundlab: (p: Partial<SoundLabState>) => void;
  toggleTracker: () => void;
  toggleNmea: () => void;
  emulateRfid: () => Promise<void>;
  emulateNfc: () => Promise<void>;
  emulateIbutton: () => Promise<void>;
  learnIr: () => Promise<void>;
  transmitIr: (id?: string) => Promise<void>;
  scanBle: () => void;
  confirmU2f: () => void;
  goto: (id: ScreenId) => void;
};

export type KitStore = KitState & KitActions;

function top(nav: NavFrame[]) {
  return nav[nav.length - 1]!;
}

function menuFor(id: ScreenId) {
  switch (id) {
    case "menu":
      return MAIN_MENU;
    case "subghz":
      return SUBGHZ_MENU;
    case "rfid":
      return RFID_MENU;
    case "nfc":
      return NFC_MENU;
    case "ir":
      return IR_MENU;
    case "gpio":
      return GPIO_MENU;
    case "ibutton":
      return IBUTTON_MENU;
    case "badusb":
      return BADUSB_MENU;
    case "apps":
      return APPS_MENU;
    case "settings":
      return SETTINGS_MENU;
    default:
      return [];
  }
}

function pushScreen(nav: NavFrame[], id: ScreenId): NavFrame[] {
  return [...nav, { id, cursor: 0 }];
}

function popScreen(nav: NavFrame[]): NavFrame[] {
  if (nav.length <= 1) return [{ id: "menu", cursor: 0 }];
  return nav.slice(0, -1);
}

const defaultSettings: KitState["settings"] = {
  masterGain: 0.22,
  ambientAudio: false,
  ambientAir: true,
  verbose: true,
  showAudioHz: true,
  lcdContrast: 0.85,
};

export const useKit = create<KitStore>((set, get) => ({
  booted: false,
  audioReady: false,
  micOn: false,
  nav: [{ id: "boot", cursor: 0 }],
  mhz: MHZ_DEFAULT,
  modulation: "AM650",
  hopping: false,
  rxActive: false,
  txActive: false,
  txName: "",
  rssi: -92,
  snr: 0,
  lastDecode: null,
  air: [],
  captures: [],
  rfid: DEMO_RFID,
  nfc: DEMO_NFC,
  ir: DEMO_IR,
  ibutton: DEMO_IBUTTON,
  ble: [],
  bleScanning: false,
  selectedRfid: 0,
  selectedNfc: 0,
  selectedIr: 0,
  selectedIbutton: 0,
  selectedRemote: 0,
  selectedCapture: 0,
  ndefDraft: DEMO_NFC[0]?.ndef ?? "",
  gpio: defaultPins(),
  uartLines: ["WAVZERO UART 115200 8N1", "Type HELP"],
  uartInput: "",
  nmeaOn: false,
  script: DEFAULT_SCRIPT,
  hidOutput: "",
  hidRunning: false,
  u2fArmed: false,
  u2fLast: "",
  snake: freshSnake(),
  music: { step: 0, playing: false, pattern: [0, 2, 4, 2, 5, 4, 2, 0] },
  soundlab: { oscA: 4339, oscB: 4686, mix: 0.4, wave: "square", running: false },
  logs: [],
  logFilter: "ALL",
  settings: defaultSettings,
  now: 0,
  pulseView: [],

  hydrate: () => {
    const p = loadPersisted();
    if (p.captures) set({ captures: p.captures });
    if (p.rfid) set({ rfid: p.rfid });
    if (p.nfc) set({ nfc: p.nfc, ndefDraft: p.nfc[0]?.ndef ?? "" });
    if (p.ir) set({ ir: p.ir });
    if (p.ibutton) set({ ibutton: p.ibutton });
    if (p.script) set({ script: p.script });
    if (p.settings) set({ settings: p.settings });
  },

  addLog: (mod, level, msg, detail) => {
    const line: LogLine = { id: logSeq++, ts: Date.now(), mod, level, msg, detail };
    set((s) => ({ logs: [...s.logs.slice(-400), line] }));
  },

  boot: async () => {
    const s = get();
    if (s.booted) return;
    get().addLog("SYS", "info", "Boot ROM 1.4.0  rev wavzero");
    get().addLog("SYS", "debug", "LCD 128x64  contrast " + s.settings.lcdContrast.toFixed(2));
    try {
      await resumeEngine();
      set({ audioReady: true });
      get().addLog("AUDIO", "ok", "AudioContext running", "codec unlocked");
    } catch (err) {
      get().addLog("AUDIO", "warn", "Audio blocked until gesture", String(err));
    }
    get().addLog("SUB", "info", "Radio mapped to sound", "MHz × 10 = acoustic Hz (÷100,000 RF)");
    get().addLog("SYS", "ok", "Modules online  Sub-GHz RFID NFC IR GPIO iButton HID BLE U2F");
    set({ booted: true, nav: [{ id: "menu", cursor: 0 }] });
  },

  goto: (id) => set((s) => ({ nav: pushScreen(s.nav, id) })),

  press: (key) => {
    const s = get();
    const frame = top(s.nav);
    const menu = menuFor(frame.id);

    if (frame.id === "boot" && (key === "ok" || key === "back")) {
      void get().boot();
      return;
    }

    if (frame.id === "apps-snake" && s.snake.alive) {
      const d = s.snake.dir;
      if (key === "up" && d.y === 0) set({ snake: { ...s.snake, nextDir: { x: 0, y: -1 } } });
      else if (key === "down" && d.y === 0) set({ snake: { ...s.snake, nextDir: { x: 0, y: 1 } } });
      else if (key === "left" && d.x === 0) set({ snake: { ...s.snake, nextDir: { x: -1, y: 0 } } });
      else if (key === "right" && d.x === 0) set({ snake: { ...s.snake, nextDir: { x: 1, y: 0 } } });
      else if (key === "ok") set({ snake: freshSnake() });
      else if (key === "back") set({ nav: popScreen(s.nav) });
      return;
    }

    if (key === "back") {
      if (s.rxActive) get().stopRx();
      if (frame.id === "apps-soundlab" && s.soundlab.running) {
        stopLabOsc();
        set({ soundlab: { ...s.soundlab, running: false } });
      }
      if (frame.id === "apps-music") set({ music: { ...s.music, playing: false } });
      set({ nav: popScreen(s.nav), hopping: false, bleScanning: false });
      return;
    }

    if (menu.length) {
      if (key === "up") {
        set({
          nav: s.nav.map((f, i) =>
            i === s.nav.length - 1 ? { ...f, cursor: (f.cursor + menu.length - 1) % menu.length } : f,
          ),
        });
        return;
      }
      if (key === "down") {
        set({
          nav: s.nav.map((f, i) =>
            i === s.nav.length - 1 ? { ...f, cursor: (f.cursor + 1) % menu.length } : f,
          ),
        });
        return;
      }
      if (key === "ok") {
        const item = menu[frame.cursor];
        if (!item) return;
        if (frame.id === "menu" && item.id === "ble") {
          set({ nav: pushScreen(s.nav, "ble") });
          get().scanBle();
          return;
        }
        set({ nav: pushScreen(s.nav, item.id as ScreenId) });
        if (item.id === "subghz-read" || item.id === "subghz-raw" || item.id === "subghz-analyzer") {
          get().startRx();
        }
        if (item.id === "apps-snake") set({ snake: freshSnake() });
        if (item.id === "nfc-ndef") set({ ndefDraft: s.nfc[s.selectedNfc]?.ndef ?? "" });
        return;
      }
    }

    switch (frame.id) {
      case "subghz-read":
      case "subghz-raw":
        if (key === "left") get().setMhz(s.mhz - (frame.id === "subghz-raw" ? 0.25 : 0.01));
        if (key === "right") get().setMhz(s.mhz + (frame.id === "subghz-raw" ? 0.25 : 0.01));
        if (key === "up") {
          const i = MODULATIONS.indexOf(s.modulation);
          get().setModulation(MODULATIONS[(i + MODULATIONS.length - 1) % MODULATIONS.length]!);
        }
        if (key === "down") {
          const i = MODULATIONS.indexOf(s.modulation);
          get().setModulation(MODULATIONS[(i + 1) % MODULATIONS.length]!);
        }
        if (key === "ok") {
          if (s.rxActive) get().stopRx();
          else get().startRx();
        }
        break;
      case "subghz-analyzer":
        if (key === "ok") {
          set({ hopping: !s.hopping });
          get().addLog("SUB", "info", s.hopping ? "Hopping hold" : "Hopping scan");
        }
        if (key === "left") get().setMhz(s.mhz - 5);
        if (key === "right") get().setMhz(s.mhz + 5);
        break;
      case "subghz-tx":
        if (key === "up")
          set({ selectedRemote: (s.selectedRemote + DEMO_REMOTES.length - 1) % DEMO_REMOTES.length });
        if (key === "down") set({ selectedRemote: (s.selectedRemote + 1) % DEMO_REMOTES.length });
        if (key === "ok") void get().transmitRemote(DEMO_REMOTES[s.selectedRemote]!.id);
        if (key === "left" || key === "right") {
          const p = FREQ_PRESETS;
          const idx = p.findIndex((x) => Math.abs(x.mhz - s.mhz) < 0.05);
          const n = key === "right" ? idx + 1 : idx - 1;
          const next = p[(n + p.length) % p.length]!;
          get().setMhz(next.mhz);
        }
        break;
      case "subghz-saved":
      case "archive":
        if (key === "up") set({ selectedCapture: Math.max(0, s.selectedCapture - 1) });
        if (key === "down")
          set({ selectedCapture: Math.min(Math.max(s.captures.length - 1, 0), s.selectedCapture + 1) });
        if (key === "ok" && s.captures[s.selectedCapture]) {
          void get().transmitCapture(s.captures[s.selectedCapture]!.id);
        }
        break;
      case "rfid-read":
        if (key === "ok") {
          const tag = s.rfid[s.selectedRfid] ?? s.rfid[0];
          if (tag) {
            get().addLog("RFID", "rx", `EM4100 ${tag.uid}`, `${tag.name} · ${tag.kind} · 1250 Hz coil`);
            set({ lastDecode: emTrace("RFID", tag.uid, 0.125, tag.name) });
          }
        }
        if (key === "up") set({ selectedRfid: (s.selectedRfid + s.rfid.length - 1) % s.rfid.length });
        if (key === "down") set({ selectedRfid: (s.selectedRfid + 1) % s.rfid.length });
        break;
      case "rfid-emulate":
        if (key === "ok") void get().emulateRfid();
        if (key === "up") set({ selectedRfid: (s.selectedRfid + s.rfid.length - 1) % s.rfid.length });
        if (key === "down") set({ selectedRfid: (s.selectedRfid + 1) % s.rfid.length });
        break;
      case "rfid-saved":
        if (key === "ok") get().addRfidTag();
        if (key === "up") set({ selectedRfid: Math.max(0, s.selectedRfid - 1) });
        if (key === "down") set({ selectedRfid: Math.min(s.rfid.length - 1, s.selectedRfid + 1) });
        break;
      case "nfc-read":
      case "nfc-emulate":
        if (key === "up") set({ selectedNfc: (s.selectedNfc + s.nfc.length - 1) % s.nfc.length });
        if (key === "down") set({ selectedNfc: (s.selectedNfc + 1) % s.nfc.length });
        if (key === "ok") {
          if (frame.id === "nfc-emulate") void get().emulateNfc();
          else {
            const c = s.nfc[s.selectedNfc];
            if (c) {
              get().addLog("NFC", "rx", `${c.type} ${c.uid}`, c.ndef || "empty NDEF");
              set({ lastDecode: emTrace("NFC", c.uid.replace(/:/g, ""), 13.56, c.ndef) });
            }
          }
        }
        break;
      case "nfc-ndef":
        if (key === "ok") get().saveNdef();
        if (key === "up") set({ selectedNfc: (s.selectedNfc + s.nfc.length - 1) % s.nfc.length });
        if (key === "down") set({ selectedNfc: (s.selectedNfc + 1) % s.nfc.length });
        break;
      case "ir-library":
      case "ir-tx":
        if (key === "up") set({ selectedIr: (s.selectedIr + s.ir.length - 1) % s.ir.length });
        if (key === "down") set({ selectedIr: (s.selectedIr + 1) % s.ir.length });
        if (key === "ok") void get().transmitIr();
        break;
      case "ir-learn":
        if (key === "ok") void get().learnIr();
        break;
      case "gpio-pins":
        if (key === "up")
          set({
            nav: s.nav.map((f, i) =>
              i === s.nav.length - 1 ? { ...f, cursor: (f.cursor + 7) % 8 } : f,
            ),
          });
        if (key === "down")
          set({
            nav: s.nav.map((f, i) =>
              i === s.nav.length - 1 ? { ...f, cursor: (f.cursor + 1) % 8 } : f,
            ),
          });
        if (key === "ok") get().togglePin(top(get().nav).cursor);
        if (key === "left" || key === "right") get().cyclePinMode(top(get().nav).cursor);
        break;
      case "gpio-uart":
        if (key === "ok") get().submitUart();
        break;
      case "gpio-i2c":
        if (key === "ok") {
          get().addLog("I2C", "ok", "Scan 0x03–0x77", "4 devices ACK");
        }
        break;
      case "ibutton-read":
      case "ibutton-emulate":
        if (key === "up")
          set({ selectedIbutton: (s.selectedIbutton + s.ibutton.length - 1) % s.ibutton.length });
        if (key === "down") set({ selectedIbutton: (s.selectedIbutton + 1) % s.ibutton.length });
        if (key === "ok") {
          if (frame.id === "ibutton-emulate") void get().emulateIbutton();
          else {
            const k = s.ibutton[s.selectedIbutton];
            if (k) get().addLog("1WIRE", "rx", k.rom, k.family);
          }
        }
        break;
      case "badusb-run":
        if (key === "ok") void get().runHid();
        break;
      case "ble":
      case "ble-scan":
        if (key === "ok") get().scanBle();
        if (key === "up" || key === "down") {
          const n = s.ble.length || 1;
          set({
            nav: s.nav.map((f, i) =>
              i === s.nav.length - 1
                ? { ...f, cursor: key === "down" ? (f.cursor + 1) % n : (f.cursor + n - 1) % n }
                : f,
            ),
          });
        }
        break;
      case "u2f":
        if (key === "ok") get().confirmU2f();
        break;
      case "apps-music":
        if (key === "ok") get().toggleTracker();
        if (key === "left" || key === "right") {
          const pattern = [...s.music.pattern];
          const i = s.music.step;
          pattern[i] = (pattern[i]! + (key === "right" ? 1 : 7)) % 8;
          set({ music: { ...s.music, pattern } });
        }
        if (key === "up" || key === "down") {
          set({ music: { ...s.music, step: (s.music.step + (key === "down" ? 1 : 7)) % 8 } });
        }
        break;
      case "apps-soundlab":
        if (key === "ok") void get().toggleSoundlab();
        if (key === "left") get().setSoundlab({ oscA: clamp(s.soundlab.oscA - 40, 80, 8000) });
        if (key === "right") get().setSoundlab({ oscA: clamp(s.soundlab.oscA + 40, 80, 8000) });
        if (key === "up") get().setSoundlab({ mix: clamp(s.soundlab.mix + 0.1, 0, 1) });
        if (key === "down") get().setSoundlab({ mix: clamp(s.soundlab.mix - 0.1, 0, 1) });
        break;
      case "settings-audio":
        if (key === "left") get().setSetting("masterGain", clamp(s.settings.masterGain - 0.04, 0, 0.6));
        if (key === "right") get().setSetting("masterGain", clamp(s.settings.masterGain + 0.04, 0, 0.6));
        if (key === "ok") get().setSetting("ambientAudio", !s.settings.ambientAudio);
        if (key === "up") get().setSetting("verbose", !s.settings.verbose);
        break;
      case "settings-radio":
        if (key === "ok") get().setSetting("showAudioHz", !s.settings.showAudioHz);
        if (key === "left") get().setSetting("lcdContrast", clamp(s.settings.lcdContrast - 0.05, 0.4, 1));
        if (key === "right") get().setSetting("lcdContrast", clamp(s.settings.lcdContrast + 0.05, 0.4, 1));
        if (key === "up") get().setSetting("ambientAir", !s.settings.ambientAir);
        break;
      default:
        break;
    }
  },

  setMhz: (mhz) => {
    const v = clamp(Number(mhz.toFixed(2)), MHZ_MIN, MHZ_MAX);
    set({ mhz: v });
    if (get().settings.verbose) {
      get().addLog("SUB", "debug", `Tune ${v.toFixed(2)} MHz`, `${mhzToAudio(v).toFixed(1)} Hz carrier`);
    }
  },

  setModulation: (m) => {
    set({ modulation: m });
    get().addLog("SUB", "info", `Preset ${m}`);
  },

  startRx: () => {
    set({ rxActive: true });
    const s = get();
    get().addLog(
      "SUB",
      "rx",
      `RX arm ${s.mhz.toFixed(2)} ${s.modulation}`,
      `carrier ${mhzToAudio(s.mhz).toFixed(1)} Hz  bw ${s.modulation}`,
    );
  },

  stopRx: () => {
    set({ rxActive: false, hopping: false });
    get().addLog("SUB", "info", "RX idle");
  },

  transmitCurrent: async () => {
    const remote = DEMO_REMOTES[get().selectedRemote] ?? DEMO_REMOTES[0]!;
    await get().transmitRemote(remote.id);
  },

  transmitRemote: async (id) => {
    const remote = DEMO_REMOTES.find((r) => r.id === id);
    if (!remote) return;
    const s = get();
    set({ txActive: true, txName: remote.name, mhz: remote.mhz, modulation: remote.modulation });
    const hz = mhzToAudio(remote.mhz);
    get().addLog("SUB", "tx", `TX ${remote.name}`, `${remote.protocol} ${remote.bits.length} bit · ${hz.toFixed(1)} Hz`);
    if (s.settings.verbose) {
      get().addLog("SUB", "debug", `TE pulses ${remote.pulses.length}`, remote.note);
    }
    const dur = await transmitTone({
      hz,
      pulses: pulsesForRemote(remote),
      modulation: remote.modulation,
      repeats: 6,
    });
    const sig: AirSignal = {
      id: uid("air"),
      mhz: remote.mhz,
      protocol: remote.protocol,
      rssi: -32,
      lastHeard: Date.now(),
      hex: hexFromBits(remote.bits),
      bits: remote.bits,
      modulation: remote.modulation,
    };
    set((st) => ({
      air: upsertAir(st.air, sig),
      lastDecode: {
        protocol: remote.protocol,
        mhz: remote.mhz,
        audioHz: hz,
        modulation: remote.modulation,
        teUs: Math.round((remote.pulses[0]?.high ?? 0.00035) * 1e6),
        bits: remote.bits,
        hex: hexFromBits(remote.bits),
        repeats: 6,
        rssi: -32,
        snr: 24,
        pulses: remote.pulses,
        notes: [remote.note, "Loopback virtual air + speaker"],
      },
      pulseView: flattenPulses(remote.pulses),
    }));
    window.setTimeout(() => set({ txActive: false, txName: "" }), Math.max(dur * 1000, 400));
  },

  transmitCapture: async (id) => {
    const cap = get().captures.find((c) => c.id === id);
    if (!cap) return;
    set({ txActive: true, txName: cap.name, mhz: cap.mhz, modulation: cap.modulation });
    get().addLog("SUB", "tx", `Replay ${cap.name}`, cap.hex);
    const dur = await transmitTone({
      hz: cap.audioHz,
      pulses: cap.pulses,
      modulation: cap.modulation,
      repeats: 5,
    });
    window.setTimeout(() => set({ txActive: false, txName: "" }), Math.max(dur * 1000, 400));
  },

  saveLastDecode: () => {
    const d = get().lastDecode;
    if (!d) return;
    const cap: Capture = {
      id: uid("cap"),
      name: `${d.protocol} ${d.mhz.toFixed(2)}`,
      module: "subghz",
      mhz: d.mhz,
      audioHz: d.audioHz,
      modulation: d.modulation,
      protocol: d.protocol,
      bits: d.bits,
      hex: d.hex,
      pulses: d.pulses,
      rssi: d.rssi,
      savedAt: Date.now(),
      note: d.notes.join(" · "),
    };
    set((s) => {
      const captures = [cap, ...s.captures].slice(0, 48);
      savePersisted({ ...s, captures });
      return { captures };
    });
    get().addLog("ARCH", "ok", `Saved ${cap.name}`, cap.id);
  },

  tick: (dt) => {
    const s = get();
    const now = Date.now();
    set({ now });

    if (s.nav[s.nav.length - 1]?.id === "apps-snake") {
      tickSnake(dt, get, set);
    }

    if (s.music.playing) {
      tickMusic(dt, get, set);
    }

    if (s.nmeaOn && Math.random() < dt * 1.2) {
      const line = nmeaLine();
      set((st) => ({ uartLines: [...st.uartLines.slice(-40), line] }));
    }

    if (!s.settings.ambientAir) return;

    if (Math.random() < dt * 0.35) {
      const remote = DEMO_REMOTES[Math.floor(Math.random() * DEMO_REMOTES.length)]!;
      const rssi = -40 - Math.floor(Math.random() * 45);
      const sig: AirSignal = {
        id: remote.id,
        mhz: remote.mhz,
        protocol: remote.protocol,
        rssi,
        lastHeard: now,
        hex: hexFromBits(remote.bits),
        bits: remote.bits,
        modulation: remote.modulation,
      };
      set((st) => ({ air: upsertAir(st.air, sig) }));
      const tuned = Math.abs(s.mhz - remote.mhz) < 0.4 && s.rxActive;
      if (tuned) {
        const noise = -90 + Math.random() * 6;
        const snr = Math.max(0, rssi - noise);
        set({
          rssi,
          snr,
          lastDecode: {
            protocol: remote.protocol,
            mhz: remote.mhz,
            audioHz: mhzToAudio(remote.mhz),
            modulation: remote.modulation,
            teUs: 350,
            bits: remote.bits,
            hex: hexFromBits(remote.bits),
            repeats: 1,
            rssi,
            snr,
            pulses: remote.pulses,
            notes: ["Virtual ISM air", remote.note],
          },
          pulseView: flattenPulses(remote.pulses),
        });
        get().addLog("SUB", "rx", `Decode ${remote.protocol}`, `${remote.bits}  RSSI ${rssi} dBm`);
        if (s.settings.ambientAudio) {
          void transmitTone({
            hz: mhzToAudio(remote.mhz),
            pulses: remote.pulses,
            modulation: remote.modulation,
            repeats: 1,
            gain: 0.12,
          });
        }
      } else if (s.hopping) {
        set({ mhz: remote.mhz, rssi, snr: Math.max(0, rssi + 88) });
        get().addLog("SUB", "info", `Peak ${remote.mhz.toFixed(2)}`, `${remote.protocol} ${rssi} dBm`);
      }
    }

    if (s.rxActive) {
      const near = s.air
        .filter((a) => now - a.lastHeard < 4000 && Math.abs(a.mhz - s.mhz) < 1.2)
        .sort((a, b) => b.rssi - a.rssi)[0];
      if (near) {
        const decay = Math.max(-98, near.rssi - (now - near.lastHeard) / 80);
        set({ rssi: decay, snr: Math.max(0, decay + 90) });
      } else {
        set((st) => ({
          rssi: st.rssi * 0.92 + -94 * 0.08,
          snr: st.snr * 0.9,
        }));
      }
    }

    if (s.bleScanning && Math.random() < dt * 0.8) {
      const pool = DEMO_BLE.filter((d) => !s.ble.some((b) => b.id === d.id));
      if (pool.length) {
        const d = pool[Math.floor(Math.random() * pool.length)]!;
        set((st) => ({ ble: [...st.ble, { ...d, rssi: d.rssi - Math.floor(Math.random() * 8) }] }));
        get().addLog("BLE", "rx", d.name, `${d.addr}  ${d.adv}`);
      }
    }
  },

  toggleMic: async () => {
    const s = get();
    if (s.micOn) {
      detachMic();
      set({ micOn: false });
      get().addLog("AUDIO", "info", "Mic released");
      return;
    }
    try {
      await attachMic();
      set({ micOn: true });
      get().addLog("AUDIO", "ok", "Mic tapped into analyser", "acoustic air → Sub-GHz scale");
    } catch (err) {
      get().addLog("AUDIO", "warn", "Mic denied", String(err));
    }
  },

  setLogFilter: (v) => set({ logFilter: v }),

  setSetting: (k, v) => {
    set((s) => {
      const settings = { ...s.settings, [k]: v };
      savePersisted({ ...s, settings });
      return { settings };
    });
    if (k === "masterGain") {
      void resumeEngine().then((e) => {
        if (e) e.master.gain.value = v as number;
      });
    }
  },

  setNdefDraft: (v) => set({ ndefDraft: v }),

  saveNdef: () => {
    const s = get();
    const nfc = s.nfc.map((c, i) => (i === s.selectedNfc ? { ...c, ndef: s.ndefDraft } : c));
    set({ nfc });
    savePersisted({ ...s, nfc });
    get().addLog("NFC", "ok", "NDEF written (sandbox)", s.ndefDraft.slice(0, 48));
  },

  addRfidTag: () => {
    const tag: RfidTag = {
      id: uid("rfid"),
      name: "Captured",
      kind: "EM4100",
      uid: randomEm4100(),
    };
    set((s) => {
      const rfid = [tag, ...s.rfid];
      savePersisted({ ...s, rfid });
      return { rfid, selectedRfid: 0 };
    });
    get().addLog("RFID", "ok", `New EM4100 ${tag.uid}`);
  },

  setScript: (v) => {
    set({ script: v });
    savePersisted({ ...get(), script: v });
  },

  runHid: async () => {
    const s = get();
    if (s.hidRunning) return;
    set({ hidRunning: true, hidOutput: "" });
    get().addLog("HID", "tx", "Sandbox replay start", "keystrokes stay inside WavZero");
    const lines = s.script.split("\n");
    let out = "";
    for (const raw of lines) {
      const line = raw.trim();
      if (!line || line.startsWith("REM")) continue;
      if (line.startsWith("DELAY")) {
        const ms = Number(line.split(/\s+/)[1] ?? 0);
        await sleep(Math.min(ms, 800));
        continue;
      }
      if (line === "ENTER") {
        out += "\n";
        set({ hidOutput: out });
        await sleep(40);
        continue;
      }
      if (line.startsWith("STRING")) {
        const text = line.slice(6).trimStart();
        for (const ch of text) {
          out += ch;
          set({ hidOutput: out });
          await sleep(18);
        }
      }
    }
    set({ hidRunning: false });
    get().addLog("HID", "ok", "Sandbox complete", `${out.length} chars`);
  },

  setUartInput: (v) => set({ uartInput: v }),

  submitUart: () => {
    const s = get();
    const cmd = s.uartInput.trim() || "AT";
    const replies = uartReply(cmd, s);
    get().addLog("UART", "tx", cmd);
    replies.forEach((r) => get().addLog("UART", "rx", r));
    set({
      uartInput: "",
      uartLines: [...s.uartLines, `> ${cmd}`, ...replies].slice(-50),
    });
  },

  togglePin: (n) => {
    set((s) => ({
      gpio: s.gpio.map((p) => (p.n === n && p.mode !== "IN" ? { ...p, value: p.value ? 0 : 1 } : p)),
    }));
    const p = get().gpio[n];
    if (p) get().addLog("GPIO", "info", `${p.name} = ${p.value}  (${p.mode})`);
  },

  cyclePinMode: (n) => {
    const order: GpioPin["mode"][] = ["IN", "OUT", "OD"];
    set((s) => ({
      gpio: s.gpio.map((p) => {
        if (p.n !== n) return p;
        const i = order.indexOf(p.mode);
        return { ...p, mode: order[(i + 1) % order.length]!, value: 0 };
      }),
    }));
  },

  toggleSoundlab: async () => {
    const s = get().soundlab;
    if (s.running) {
      stopLabOsc();
      set({ soundlab: { ...s, running: false } });
      get().addLog("LAB", "info", "Oscillator off");
      return;
    }
    await startLabOsc(s.oscA, s.wave, s.mix);
    set({ soundlab: { ...s, running: true } });
    get().addLog("LAB", "tx", `Lab osc ${s.oscA.toFixed(0)} Hz`, s.wave);
  },

  setSoundlab: (p) => {
    const soundlab = { ...get().soundlab, ...p };
    set({ soundlab });
    if (soundlab.running) updateLabOsc(soundlab.oscA, soundlab.wave, soundlab.mix);
  },

  toggleTracker: () => {
    const playing = !get().music.playing;
    set({ music: { ...get().music, playing } });
    get().addLog("MUS", playing ? "tx" : "info", playing ? "Tracker run" : "Tracker stop");
  },

  toggleNmea: () => {
    const on = !get().nmeaOn;
    set({ nmeaOn: on });
    get().addLog("UART", "info", on ? "NMEA stream on" : "NMEA off");
  },

  emulateRfid: async () => {
    const tag = get().rfid[get().selectedRfid];
    if (!tag) return;
    set({ txActive: true, txName: tag.name });
    get().addLog("RFID", "tx", `Emulate ${tag.kind}`, `${tag.uid} @ 1250 Hz`);
    await playCarrier(1250, 0.8, "square");
    set({ txActive: false, txName: "" });
  },

  emulateNfc: async () => {
    const c = get().nfc[get().selectedNfc];
    if (!c) return;
    set({ txActive: true, txName: c.name });
    get().addLog("NFC", "tx", `Field ${c.type}`, `${c.uid} @ 1356 Hz (13.56 MHz ÷ 10k)`);
    await playCarrier(1356, 0.7, "sine");
    set({ txActive: false, txName: "" });
  },

  emulateIbutton: async () => {
    const k = get().ibutton[get().selectedIbutton];
    if (!k) return;
    set({ txActive: true, txName: k.name });
    get().addLog("1WIRE", "tx", `ROM ${k.rom}`, k.family);
    await playCarrier(880, 0.4, "square");
    set({ txActive: false, txName: "" });
  },

  learnIr: async () => {
    get().addLog("IR", "info", "Learner armed", "listening for NEC-like pulse train");
    await sleep(500);
    const cmd: IrCommand = {
      id: uid("ir"),
      brand: "Learned",
      device: "Unknown",
      button: "KEY",
      protocol: "NEC",
      address: "07",
      command: Math.floor(Math.random() * 256)
        .toString(16)
        .padStart(2, "0")
        .toUpperCase(),
    };
    set((s) => {
      const ir = [cmd, ...s.ir];
      savePersisted({ ...s, ir });
      return { ir, selectedIr: 0 };
    });
    get().addLog("IR", "ok", `Learned NEC ${cmd.address} ${cmd.command}`);
  },

  transmitIr: async (id) => {
    const s = get();
    const cmd = s.ir.find((c) => c.id === id) ?? s.ir[s.selectedIr];
    if (!cmd) return;
    set({ txActive: true, txName: `${cmd.device} ${cmd.button}` });
    get().addLog("IR", "tx", `${cmd.protocol} ${cmd.button}`, `${cmd.brand}  addr ${cmd.address} cmd ${cmd.command}`);
    await transmitTone({
      hz: 3800,
      pulses: pulsesForIr(cmd),
      modulation: "PWM",
      repeats: 2,
      gain: 0.4,
    });
    set({ txActive: false, txName: "" });
  },

  scanBle: () => {
    set({ bleScanning: true, ble: [] });
    get().addLog("BLE", "info", "LE scan window 4.2s");
    window.setTimeout(() => {
      set({ bleScanning: false });
      get().addLog("BLE", "ok", `Scan done  ${get().ble.length} advertisers`);
    }, 4200);
  },

  confirmU2f: () => {
    const s = get();
    if (!s.u2fArmed) {
      set({ u2fArmed: true });
      get().addLog("U2F", "info", "Presence requested", "rp=sandbox.wavzero");
      return;
    }
    set({ u2fArmed: false, u2fLast: new Date().toISOString() });
    get().addLog("U2F", "ok", "User presence  assertion signed", "demo key handle, not a real token");
  },
}));

function upsertAir(air: AirSignal[], sig: AirSignal) {
  const rest = air.filter((a) => a.id !== sig.id && Date.now() - a.lastHeard < 12000);
  return [sig, ...rest].slice(0, 16);
}

function flattenPulses(pulses: { high: number; low: number }[]) {
  const out: number[] = [];
  for (const p of pulses.slice(0, 24)) {
    out.push(1, p.high, 0, p.low);
  }
  return out;
}

function emTrace(protocol: string, hex: string, mhz: number, note: string): DecodeTrace {
  return {
    protocol,
    mhz,
    audioHz: mhz >= 10 ? mhzToAudio(mhz) : mhz * 10_000,
    modulation: "OOK",
    teUs: 400,
    bits: hex.replace(/[^0-9A-F]/gi, ""),
    hex,
    repeats: 1,
    rssi: -28,
    snr: 22,
    pulses: [{ high: 0.0004, low: 0.0004 }],
    notes: [note],
  };
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function uartReply(cmd: string, s: KitState): string[] {
  const c = cmd.trim().toUpperCase();
  if (c === "AT") return ["OK"];
  if (c === "AT+FREQ?" || c === "FREQ") return [`+FREQ: ${s.mhz.toFixed(2)}`, "OK"];
  if (c.startsWith("AT+TX")) return ["TX ARM", "OK"];
  if (c === "AT+RSSI?" || c === "RSSI") return [`+RSSI: ${s.rssi.toFixed(1)}`, "OK"];
  if (c === "HELP") return UART_HELP;
  if (c === "PINS") return s.gpio.map((p) => `${p.name} ${p.mode} ${p.value}`);
  if (c === "NMEA") return [nmeaLine(), "OK"];
  return ["ERR"];
}

function nmeaLine() {
  const t = new Date();
  const hh = `${pad(t.getUTCHours())}${pad(t.getUTCMinutes())}${pad(t.getUTCSeconds())}`;
  return `$GPGGA,${hh},3748.000,N,12224.000,W,1,08,0.9,12.0,M,32.0,M,,*5B`;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function tickSnake(dt: number, get: () => KitStore, set: (p: Partial<KitState>) => void) {
  const snake = get().snake;
  if (!snake.alive) return;
  const acc = snake.acc + dt;
  const step = 0.16;
  if (acc < step) {
    set({ snake: { ...snake, acc } });
    return;
  }
  const dir = snake.nextDir;
  const head = snake.body[0]!;
  const nx = (head.x + dir.x + snake.w) % snake.w;
  const ny = (head.y + dir.y + snake.h) % snake.h;
  if (snake.body.some((b) => b.x === nx && b.y === ny)) {
    set({ snake: { ...snake, alive: false, acc: 0 } });
    return;
  }
  const ate = nx === snake.food.x && ny === snake.food.y;
  const body = [{ x: nx, y: ny }, ...snake.body];
  if (!ate) body.pop();
  set({
    snake: {
      ...snake,
      body,
      dir,
      acc: acc - step,
      score: snake.score + (ate ? 1 : 0),
      food: ate ? spawnFood(snake.w, snake.h, body) : snake.food,
      alive: true,
    },
  });
}

let musicAcc = 0;
function tickMusic(dt: number, get: () => KitStore, set: (p: Partial<KitState>) => void) {
  musicAcc += dt;
  if (musicAcc < 0.14) return;
  musicAcc = 0;
  const m = get().music;
  const step = (m.step + 1) % 8;
  const note = m.pattern[step] ?? 0;
  void playTrackerNote(TRACKER_SCALE[note] ?? 220);
  set({ music: { ...m, step } });
}

export function currentScreen(s: KitState): ScreenId {
  return s.nav[s.nav.length - 1]?.id ?? "boot";
}

export function currentCursor(s: KitState) {
  return s.nav[s.nav.length - 1]?.cursor ?? 0;
}
