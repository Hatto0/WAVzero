import type {
  BleDevice,
  IButtonKey,
  IrCommand,
  Modulation,
  NfcCard,
  Pulse,
  RfidTag,
} from "./types";
import { hexFromBits, uid } from "./utils";

export const MHZ_MIN = 300;
export const MHZ_MAX = 928;
export const MHZ_DEFAULT = 433.92;

export const MODULATIONS: Modulation[] = [
  "AM650",
  "AM270",
  "FM238",
  "FM476",
  "OOK",
  "FSK",
  "PWM",
];

export const MAIN_MENU: { id: string; label: string; hint: string }[] = [
  { id: "subghz", label: "Sub-GHz", hint: "Sound-wave radio" },
  { id: "rfid", label: "125 kHz RFID", hint: "LF coil / audio" },
  { id: "nfc", label: "NFC", hint: "13.56 MHz scaled" },
  { id: "ir", label: "Infrared", hint: "NEC chirps" },
  { id: "gpio", label: "GPIO", hint: "Pins · UART · I2C" },
  { id: "ibutton", label: "iButton", hint: "1-Wire ROM" },
  { id: "badusb", label: "Bad USB", hint: "Sandbox HID" },
  { id: "ble", label: "Bluetooth", hint: "Advert scanner" },
  { id: "u2f", label: "U2F", hint: "Presence key" },
  { id: "apps", label: "Applications", hint: "Snake · tone lab" },
  { id: "archive", label: "Archive", hint: "Saved captures" },
  { id: "settings", label: "Settings", hint: "Audio · radio" },
];

export const SUBGHZ_MENU = [
  { id: "subghz-read", label: "Read" },
  { id: "subghz-raw", label: "Read RAW" },
  { id: "subghz-analyzer", label: "Freq analyzer" },
  { id: "subghz-tx", label: "Transmit" },
  { id: "subghz-saved", label: "Saved" },
];

export const RFID_MENU = [
  { id: "rfid-read", label: "Read" },
  { id: "rfid-emulate", label: "Emulate" },
  { id: "rfid-saved", label: "Saved" },
];

export const NFC_MENU = [
  { id: "nfc-read", label: "Read" },
  { id: "nfc-emulate", label: "Emulate" },
  { id: "nfc-ndef", label: "NDEF editor" },
];

export const IR_MENU = [
  { id: "ir-library", label: "Universal remote" },
  { id: "ir-learn", label: "Learn" },
  { id: "ir-tx", label: "Saved" },
];

export const GPIO_MENU = [
  { id: "gpio-pins", label: "Pinout" },
  { id: "gpio-uart", label: "USB-UART" },
  { id: "gpio-i2c", label: "I2C scanner" },
];

export const IBUTTON_MENU = [
  { id: "ibutton-read", label: "Read" },
  { id: "ibutton-emulate", label: "Emulate" },
];

export const BADUSB_MENU = [
  { id: "badusb-edit", label: "Script" },
  { id: "badusb-run", label: "Run sandbox" },
];

export const APPS_MENU = [
  { id: "apps-snake", label: "Snake" },
  { id: "apps-music", label: "Tracker" },
  { id: "apps-soundlab", label: "Sound lab" },
];

export const SETTINGS_MENU = [
  { id: "settings-audio", label: "Audio" },
  { id: "settings-radio", label: "Radio map" },
  { id: "about", label: "About" },
];

export const FREQ_PRESETS = [
  { mhz: 315.0, label: "315.00  ISM" },
  { mhz: 433.92, label: "433.92  ISM" },
  { mhz: 868.35, label: "868.35  EU" },
  { mhz: 915.0, label: "915.00  US" },
];

function princetonPulses(bits: string, te = 0.00035): Pulse[] {
  const pulses: Pulse[] = [];
  for (const b of bits) {
    if (b === "1") pulses.push({ high: te * 3, low: te });
    else pulses.push({ high: te, low: te * 3 });
  }
  pulses.push({ high: te, low: te * 31 });
  return pulses;
}

function holtekPulses(bits: string, te = 0.0002): Pulse[] {
  const pulses: Pulse[] = [];
  for (const b of bits) {
    if (b === "1") pulses.push({ high: te * 2, low: te });
    else pulses.push({ high: te, low: te * 2 });
  }
  pulses.push({ high: te, low: te * 30 });
  return pulses;
}

function necPulses(address: number, command: number): Pulse[] {
  const bits: number[] = [];
  const pushByte = (n: number) => {
    for (let i = 0; i < 8; i++) bits.push((n >> i) & 1);
  };
  pushByte(address);
  pushByte(address ^ 0xff);
  pushByte(command);
  pushByte(command ^ 0xff);
  const pulses: Pulse[] = [{ high: 0.009, low: 0.0045 }];
  for (const b of bits) {
    if (b) pulses.push({ high: 0.00056, low: 0.00169 });
    else pulses.push({ high: 0.00056, low: 0.00056 });
  }
  pulses.push({ high: 0.00056, low: 0.04 });
  return pulses;
}

export type DemoRemote = {
  id: string;
  name: string;
  mhz: number;
  modulation: Modulation;
  protocol: string;
  bits: string;
  note: string;
  pulses: Pulse[];
};

export const DEMO_REMOTES: DemoRemote[] = [
  {
    id: "door-bell",
    name: "Doorbell A",
    mhz: 433.92,
    modulation: "AM650",
    protocol: "Princeton",
    bits: "101001001100000111110010",
    note: "Sandbox 24-bit doorbell. Demo key only.",
    pulses: princetonPulses("101001001100000111110010"),
  },
  {
    id: "toy-car",
    name: "Toy remote",
    mhz: 315.0,
    modulation: "AM270",
    protocol: "Holtek",
    bits: "11010011100010101101",
    note: "Forward button on a demo toy encoder.",
    pulses: holtekPulses("11010011100010101101"),
  },
  {
    id: "weather",
    name: "Weather TX",
    mhz: 868.35,
    modulation: "FSK",
    protocol: "Oregon-like",
    bits: "01001010000111100011010110100011",
    note: "Temperature beacon 21.4 C, demo CRC.",
    pulses: holtekPulses("01001010000111100011010110100011", 0.00048),
  },
  {
    id: "gate-demo",
    name: "Gate DEMO",
    mhz: 433.92,
    modulation: "AM650",
    protocol: "Came 12",
    bits: "101001010011",
    note: "Fictional 12-bit gate. Will not open hardware.",
    pulses: princetonPulses("101001010011", 0.00032),
  },
  {
    id: "beacon",
    name: "CW beacon",
    mhz: 915.0,
    modulation: "OOK",
    protocol: "CW",
    bits: "1",
    note: "Carrier pulse for analyzer calibration.",
    pulses: [{ high: 0.18, low: 0.04 }],
  },
];

export const DEMO_RFID: RfidTag[] = [
  { id: "badge-demo", name: "Lab badge", kind: "EM4100", uid: "1A2B3C4D5E" },
  { id: "fob-demo", name: "Locker fob", kind: "EM4100", uid: "00A1B2C3D4" },
  { id: "hid-demo", name: "Lobby prox", kind: "HID Prox", uid: "1234:56789" },
];

export const DEMO_NFC: NfcCard[] = [
  {
    id: "ntag-url",
    name: "Conference tag",
    type: "NTAG213",
    uid: "04:7A:19:B2:3C:80:90",
    ndef: "https://example.invalid/wavzero",
  },
  {
    id: "classic-demo",
    name: "Transit DEMO",
    type: "Mifare Classic",
    uid: "A1:B2:C3:D4",
    ndef: "BALANCE=12.50 DEMO",
  },
  {
    id: "blank",
    name: "Blank NTAG",
    type: "NTAG213",
    uid: "04:00:00:00:00:00:01",
    ndef: "",
  },
];

export const DEMO_IR: IrCommand[] = [
  { id: "tv-pwr", brand: "Generic", device: "Display", button: "POWER", protocol: "NEC", address: "04", command: "08" },
  { id: "tv-volup", brand: "Generic", device: "Display", button: "VOL+", protocol: "NEC", address: "04", command: "02" },
  { id: "tv-voldn", brand: "Generic", device: "Display", button: "VOL-", protocol: "NEC", address: "04", command: "03" },
  { id: "tv-mute", brand: "Generic", device: "Display", button: "MUTE", protocol: "NEC", address: "04", command: "09" },
  { id: "ac-on", brand: "Clima", device: "Split AC", button: "COOL", protocol: "NEC", address: "20", command: "1A" },
  { id: "proj-on", brand: "Lumen", device: "Projector", button: "ON", protocol: "NEC", address: "83", command: "12" },
];

export const DEMO_IBUTTON: IButtonKey[] = [
  { id: "ib-1", name: "Cabinet key", family: "0x01 DS1990", rom: "01:A4:C3:11:00:00:00:9E" },
  { id: "ib-2", name: "Gate DEMO", family: "0x01 DS1990", rom: "01:00:11:22:33:44:55:66" },
];

export const DEMO_BLE: BleDevice[] = [
  { id: "ble-1", name: "WAV-WATCH", addr: "C3:1A:90:22:BC:01", rssi: -47, adv: "0201060A094D41562D5741544348", kind: "Wearable" },
  { id: "ble-2", name: "DeskBeacon", addr: "F0:12:44:81:09:AA", rssi: -62, adv: "0201060303AAFE", kind: "iBeacon-like" },
  { id: "ble-3", name: "HID-Mouse", addr: "A4:C6:F0:10:10:10", rssi: -71, adv: "02011A03031218", kind: "HID" },
  { id: "ble-4", name: "Unknown", addr: "00:11:22:33:44:55", rssi: -88, adv: "020106", kind: "LE generic" },
];

export const I2C_MAP: { addr: string; name: string }[] = [
  { addr: "0x3C", name: "SSD1306 OLED" },
  { addr: "0x68", name: "MPU6050 IMU" },
  { addr: "0x76", name: "BME280 env" },
  { addr: "0x50", name: "AT24 EEPROM" },
];

export const DEFAULT_SCRIPT = `REM WavZero sandbox HID — never leaves this window
DELAY 200
STRING echo WavZero field kit
ENTER
STRING date
ENTER
`;

export const UART_HELP = [
  "AT      OK",
  "AT+FREQ?  current MHz",
  "AT+TX=1   arm transmitter",
  "AT+RSSI?  last rssi",
  "NMEA      stream fake GPS",
  "PINS      dump GPIO",
  "HELP      this list",
];

export function pulsesForRemote(remote: DemoRemote): Pulse[] {
  return remote.pulses;
}

export function pulsesForIr(cmd: IrCommand): Pulse[] {
  return necPulses(Number.parseInt(cmd.address, 16), Number.parseInt(cmd.command, 16));
}

export function captureFromRemote(remote: DemoRemote) {
  return {
    id: uid("cap"),
    name: remote.name,
    module: "subghz" as const,
    mhz: remote.mhz,
    audioHz: remote.mhz * 10,
    modulation: remote.modulation,
    protocol: remote.protocol,
    bits: remote.bits,
    hex: hexFromBits(remote.bits),
    pulses: remote.pulses,
    rssi: -40 - Math.floor(Math.random() * 18),
    savedAt: Date.now(),
    note: remote.note,
  };
}

export function randomEm4100() {
  const bytes = Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase(),
  );
  return bytes.join("");
}

export function bandwidthFor(mod: Modulation) {
  switch (mod) {
    case "AM270":
      return 27_000;
    case "AM650":
      return 65_000;
    case "FM238":
      return 23_800;
    case "FM476":
      return 47_600;
    case "OOK":
      return 40_000;
    case "FSK":
      return 38_000;
    case "PWM":
      return 30_000;
  }
}

export function describeMapping(mhz: number) {
  const hz = mhz * 10;
  return `${mhz.toFixed(2)} MHz displayed  →  ${hz.toFixed(1)} Hz acoustic carrier  (÷100,000 scale)`;
}
