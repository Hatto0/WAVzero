export type ModuleId =
  | "subghz"
  | "rfid"
  | "nfc"
  | "ir"
  | "gpio"
  | "ibutton"
  | "badusb"
  | "ble"
  | "u2f"
  | "apps"
  | "archive"
  | "settings";

export type ScreenId =
  | "boot"
  | "menu"
  | "subghz"
  | "subghz-read"
  | "subghz-raw"
  | "subghz-analyzer"
  | "subghz-tx"
  | "subghz-saved"
  | "rfid"
  | "rfid-read"
  | "rfid-emulate"
  | "rfid-saved"
  | "nfc"
  | "nfc-read"
  | "nfc-emulate"
  | "nfc-ndef"
  | "ir"
  | "ir-library"
  | "ir-learn"
  | "ir-tx"
  | "gpio"
  | "gpio-pins"
  | "gpio-uart"
  | "gpio-i2c"
  | "ibutton"
  | "ibutton-read"
  | "ibutton-emulate"
  | "badusb"
  | "badusb-edit"
  | "badusb-run"
  | "ble"
  | "ble-scan"
  | "u2f"
  | "apps"
  | "apps-snake"
  | "apps-music"
  | "apps-soundlab"
  | "archive"
  | "archive-view"
  | "settings"
  | "settings-audio"
  | "settings-radio"
  | "about";

export type InputKey = "up" | "down" | "left" | "right" | "ok" | "back";

export type LogLevel = "debug" | "info" | "warn" | "ok" | "tx" | "rx";

export type LogLine = {
  id: number;
  ts: number;
  mod: string;
  level: LogLevel;
  msg: string;
  detail?: string;
};

export type Modulation = "AM270" | "AM650" | "FM238" | "FM476" | "OOK" | "FSK" | "PWM";

export type Pulse = { high: number; low: number };

export type Capture = {
  id: string;
  name: string;
  module: ModuleId;
  mhz: number;
  audioHz: number;
  modulation: Modulation;
  protocol: string;
  bits: string;
  hex: string;
  pulses: Pulse[];
  rssi: number;
  savedAt: number;
  note: string;
};

export type NavFrame = {
  id: ScreenId;
  cursor: number;
};

export type RfidTag = {
  id: string;
  name: string;
  kind: "EM4100" | "HID Prox" | "Indala";
  uid: string;
};

export type NfcCard = {
  id: string;
  name: string;
  type: "NTAG213" | "Mifare Classic" | "ISO14443-A";
  uid: string;
  ndef: string;
};

export type IrCommand = {
  id: string;
  brand: string;
  device: string;
  button: string;
  protocol: "NEC" | "SIRC" | "RC5";
  address: string;
  command: string;
};

export type IButtonKey = {
  id: string;
  name: string;
  family: string;
  rom: string;
};

export type BleDevice = {
  id: string;
  name: string;
  addr: string;
  rssi: number;
  adv: string;
  kind: string;
};

export type GpioMode = "IN" | "OUT" | "OD";

export type GpioPin = {
  n: number;
  name: string;
  mode: GpioMode;
  value: 0 | 1;
};

export type AirSignal = {
  id: string;
  mhz: number;
  protocol: string;
  rssi: number;
  lastHeard: number;
  hex: string;
  bits: string;
  modulation: Modulation;
};

export type LcdLine = {
  text: string;
  invert?: boolean;
  indent?: boolean;
  dim?: boolean;
};

export type LcdGraph = {
  samples: number[];
  label?: string;
};

export type LcdScene = {
  status?: boolean;
  title?: string;
  invertTitle?: boolean;
  lines: LcdLine[];
  graph?: LcdGraph;
  footer?: string;
  center?: string[];
  popup?: string;
};

export type SnakeState = {
  w: number;
  h: number;
  body: { x: number; y: number }[];
  dir: { x: number; y: number };
  nextDir: { x: number; y: number };
  food: { x: number; y: number };
  alive: boolean;
  score: number;
  acc: number;
};

export type MusicState = {
  step: number;
  playing: boolean;
  pattern: number[];
};

export type SoundLabState = {
  oscA: number;
  oscB: number;
  mix: number;
  wave: OscillatorType;
  running: boolean;
};

export type DecodeTrace = {
  protocol: string;
  mhz: number;
  audioHz: number;
  modulation: Modulation;
  teUs: number;
  bits: string;
  hex: string;
  repeats: number;
  rssi: number;
  snr: number;
  pulses: Pulse[];
  notes: string[];
};
