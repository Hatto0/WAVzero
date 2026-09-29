import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as MicOff, r as Mic, t as Volume2 } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D8bvCnjo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function pad2(n) {
	return n.toString().padStart(2, "0");
}
function formatClock(d) {
	return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}
function formatMs(ts) {
	const d = new Date(ts);
	return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}.${d.getMilliseconds().toString().padStart(3, "0")}`;
}
function uid(prefix = "id") {
	return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}
function clamp(n, min, max) {
	return Math.max(min, Math.min(max, n));
}
function mhzToAudio(mhz) {
	return mhz * 10;
}
function formatMhz(mhz) {
	return mhz.toFixed(2);
}
function formatHz(hz) {
	if (hz >= 1e3) return `${(hz / 1e3).toFixed(3)} kHz`;
	return `${hz.toFixed(1)} Hz`;
}
function hexFromBits(bits) {
	const pad = bits.padEnd(Math.ceil(bits.length / 4) * 4, "0");
	let hex = "";
	for (let i = 0; i < pad.length; i += 4) hex += Number.parseInt(pad.slice(i, i + 4), 2).toString(16).toUpperCase();
	return hex.length % 2 ? `0${hex}` : hex;
}
function groupHex(hex, every = 2) {
	const clean = hex.replace(/[^0-9A-Fa-f]/g, "").toUpperCase();
	return clean.match(new RegExp(`.{1,${every}}`, "g"))?.join(" ") ?? clean;
}
var MHZ_DEFAULT = 433.92;
var MODULATIONS = [
	"AM650",
	"AM270",
	"FM238",
	"FM476",
	"OOK",
	"FSK",
	"PWM"
];
var MAIN_MENU = [
	{
		id: "subghz",
		label: "Sub-GHz",
		hint: "Sound-wave radio"
	},
	{
		id: "rfid",
		label: "125 kHz RFID",
		hint: "LF coil / audio"
	},
	{
		id: "nfc",
		label: "NFC",
		hint: "13.56 MHz scaled"
	},
	{
		id: "ir",
		label: "Infrared",
		hint: "NEC chirps"
	},
	{
		id: "gpio",
		label: "GPIO",
		hint: "Pins · UART · I2C"
	},
	{
		id: "ibutton",
		label: "iButton",
		hint: "1-Wire ROM"
	},
	{
		id: "badusb",
		label: "Bad USB",
		hint: "Sandbox HID"
	},
	{
		id: "ble",
		label: "Bluetooth",
		hint: "Advert scanner"
	},
	{
		id: "u2f",
		label: "U2F",
		hint: "Presence key"
	},
	{
		id: "apps",
		label: "Applications",
		hint: "Snake · tone lab"
	},
	{
		id: "archive",
		label: "Archive",
		hint: "Saved captures"
	},
	{
		id: "settings",
		label: "Settings",
		hint: "Audio · radio"
	}
];
var SUBGHZ_MENU = [
	{
		id: "subghz-read",
		label: "Read"
	},
	{
		id: "subghz-raw",
		label: "Read RAW"
	},
	{
		id: "subghz-analyzer",
		label: "Freq analyzer"
	},
	{
		id: "subghz-tx",
		label: "Transmit"
	},
	{
		id: "subghz-saved",
		label: "Saved"
	}
];
var RFID_MENU = [
	{
		id: "rfid-read",
		label: "Read"
	},
	{
		id: "rfid-emulate",
		label: "Emulate"
	},
	{
		id: "rfid-saved",
		label: "Saved"
	}
];
var NFC_MENU = [
	{
		id: "nfc-read",
		label: "Read"
	},
	{
		id: "nfc-emulate",
		label: "Emulate"
	},
	{
		id: "nfc-ndef",
		label: "NDEF editor"
	}
];
var IR_MENU = [
	{
		id: "ir-library",
		label: "Universal remote"
	},
	{
		id: "ir-learn",
		label: "Learn"
	},
	{
		id: "ir-tx",
		label: "Saved"
	}
];
var GPIO_MENU = [
	{
		id: "gpio-pins",
		label: "Pinout"
	},
	{
		id: "gpio-uart",
		label: "USB-UART"
	},
	{
		id: "gpio-i2c",
		label: "I2C scanner"
	}
];
var IBUTTON_MENU = [{
	id: "ibutton-read",
	label: "Read"
}, {
	id: "ibutton-emulate",
	label: "Emulate"
}];
var BADUSB_MENU = [{
	id: "badusb-edit",
	label: "Script"
}, {
	id: "badusb-run",
	label: "Run sandbox"
}];
var APPS_MENU = [
	{
		id: "apps-snake",
		label: "Snake"
	},
	{
		id: "apps-music",
		label: "Tracker"
	},
	{
		id: "apps-soundlab",
		label: "Sound lab"
	}
];
var SETTINGS_MENU = [
	{
		id: "settings-audio",
		label: "Audio"
	},
	{
		id: "settings-radio",
		label: "Radio map"
	},
	{
		id: "about",
		label: "About"
	}
];
var FREQ_PRESETS = [
	{
		mhz: 315,
		label: "315.00  ISM"
	},
	{
		mhz: 433.92,
		label: "433.92  ISM"
	},
	{
		mhz: 868.35,
		label: "868.35  EU"
	},
	{
		mhz: 915,
		label: "915.00  US"
	}
];
function princetonPulses(bits, te = 35e-5) {
	const pulses = [];
	for (const b of bits) if (b === "1") pulses.push({
		high: te * 3,
		low: te
	});
	else pulses.push({
		high: te,
		low: te * 3
	});
	pulses.push({
		high: te,
		low: te * 31
	});
	return pulses;
}
function holtekPulses(bits, te = 2e-4) {
	const pulses = [];
	for (const b of bits) if (b === "1") pulses.push({
		high: te * 2,
		low: te
	});
	else pulses.push({
		high: te,
		low: te * 2
	});
	pulses.push({
		high: te,
		low: te * 30
	});
	return pulses;
}
function necPulses(address, command) {
	const bits = [];
	const pushByte = (n) => {
		for (let i = 0; i < 8; i++) bits.push(n >> i & 1);
	};
	pushByte(address);
	pushByte(address ^ 255);
	pushByte(command);
	pushByte(command ^ 255);
	const pulses = [{
		high: .009,
		low: .0045
	}];
	for (const b of bits) if (b) pulses.push({
		high: 56e-5,
		low: .00169
	});
	else pulses.push({
		high: 56e-5,
		low: 56e-5
	});
	pulses.push({
		high: 56e-5,
		low: .04
	});
	return pulses;
}
var DEMO_REMOTES = [
	{
		id: "door-bell",
		name: "Doorbell A",
		mhz: 433.92,
		modulation: "AM650",
		protocol: "Princeton",
		bits: "101001001100000111110010",
		note: "Sandbox 24-bit doorbell. Demo key only.",
		pulses: princetonPulses("101001001100000111110010")
	},
	{
		id: "toy-car",
		name: "Toy remote",
		mhz: 315,
		modulation: "AM270",
		protocol: "Holtek",
		bits: "11010011100010101101",
		note: "Forward button on a demo toy encoder.",
		pulses: holtekPulses("11010011100010101101")
	},
	{
		id: "weather",
		name: "Weather TX",
		mhz: 868.35,
		modulation: "FSK",
		protocol: "Oregon-like",
		bits: "01001010000111100011010110100011",
		note: "Temperature beacon 21.4 C, demo CRC.",
		pulses: holtekPulses("01001010000111100011010110100011", 48e-5)
	},
	{
		id: "gate-demo",
		name: "Gate DEMO",
		mhz: 433.92,
		modulation: "AM650",
		protocol: "Came 12",
		bits: "101001010011",
		note: "Fictional 12-bit gate. Will not open hardware.",
		pulses: princetonPulses("101001010011", 32e-5)
	},
	{
		id: "beacon",
		name: "CW beacon",
		mhz: 915,
		modulation: "OOK",
		protocol: "CW",
		bits: "1",
		note: "Carrier pulse for analyzer calibration.",
		pulses: [{
			high: .18,
			low: .04
		}]
	}
];
var DEMO_RFID = [
	{
		id: "badge-demo",
		name: "Lab badge",
		kind: "EM4100",
		uid: "1A2B3C4D5E"
	},
	{
		id: "fob-demo",
		name: "Locker fob",
		kind: "EM4100",
		uid: "00A1B2C3D4"
	},
	{
		id: "hid-demo",
		name: "Lobby prox",
		kind: "HID Prox",
		uid: "1234:56789"
	}
];
var DEMO_NFC = [
	{
		id: "ntag-url",
		name: "Conference tag",
		type: "NTAG213",
		uid: "04:7A:19:B2:3C:80:90",
		ndef: "https://example.invalid/wavzero"
	},
	{
		id: "classic-demo",
		name: "Transit DEMO",
		type: "Mifare Classic",
		uid: "A1:B2:C3:D4",
		ndef: "BALANCE=12.50 DEMO"
	},
	{
		id: "blank",
		name: "Blank NTAG",
		type: "NTAG213",
		uid: "04:00:00:00:00:00:01",
		ndef: ""
	}
];
var DEMO_IR = [
	{
		id: "tv-pwr",
		brand: "Generic",
		device: "Display",
		button: "POWER",
		protocol: "NEC",
		address: "04",
		command: "08"
	},
	{
		id: "tv-volup",
		brand: "Generic",
		device: "Display",
		button: "VOL+",
		protocol: "NEC",
		address: "04",
		command: "02"
	},
	{
		id: "tv-voldn",
		brand: "Generic",
		device: "Display",
		button: "VOL-",
		protocol: "NEC",
		address: "04",
		command: "03"
	},
	{
		id: "tv-mute",
		brand: "Generic",
		device: "Display",
		button: "MUTE",
		protocol: "NEC",
		address: "04",
		command: "09"
	},
	{
		id: "ac-on",
		brand: "Clima",
		device: "Split AC",
		button: "COOL",
		protocol: "NEC",
		address: "20",
		command: "1A"
	},
	{
		id: "proj-on",
		brand: "Lumen",
		device: "Projector",
		button: "ON",
		protocol: "NEC",
		address: "83",
		command: "12"
	}
];
var DEMO_IBUTTON = [{
	id: "ib-1",
	name: "Cabinet key",
	family: "0x01 DS1990",
	rom: "01:A4:C3:11:00:00:00:9E"
}, {
	id: "ib-2",
	name: "Gate DEMO",
	family: "0x01 DS1990",
	rom: "01:00:11:22:33:44:55:66"
}];
var DEMO_BLE = [
	{
		id: "ble-1",
		name: "WAV-WATCH",
		addr: "C3:1A:90:22:BC:01",
		rssi: -47,
		adv: "0201060A094D41562D5741544348",
		kind: "Wearable"
	},
	{
		id: "ble-2",
		name: "DeskBeacon",
		addr: "F0:12:44:81:09:AA",
		rssi: -62,
		adv: "0201060303AAFE",
		kind: "iBeacon-like"
	},
	{
		id: "ble-3",
		name: "HID-Mouse",
		addr: "A4:C6:F0:10:10:10",
		rssi: -71,
		adv: "02011A03031218",
		kind: "HID"
	},
	{
		id: "ble-4",
		name: "Unknown",
		addr: "00:11:22:33:44:55",
		rssi: -88,
		adv: "020106",
		kind: "LE generic"
	}
];
var I2C_MAP = [
	{
		addr: "0x3C",
		name: "SSD1306 OLED"
	},
	{
		addr: "0x68",
		name: "MPU6050 IMU"
	},
	{
		addr: "0x76",
		name: "BME280 env"
	},
	{
		addr: "0x50",
		name: "AT24 EEPROM"
	}
];
var DEFAULT_SCRIPT = `REM WavZero sandbox HID — never leaves this window
DELAY 200
STRING echo WavZero field kit
ENTER
STRING date
ENTER
`;
var UART_HELP = [
	"AT      OK",
	"AT+FREQ?  current MHz",
	"AT+TX=1   arm transmitter",
	"AT+RSSI?  last rssi",
	"NMEA      stream fake GPS",
	"PINS      dump GPIO",
	"HELP      this list"
];
function pulsesForRemote(remote) {
	return remote.pulses;
}
function pulsesForIr(cmd) {
	return necPulses(Number.parseInt(cmd.address, 16), Number.parseInt(cmd.command, 16));
}
function randomEm4100() {
	return Array.from({ length: 5 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, "0").toUpperCase()).join("");
}
var engine = null;
var micStream = null;
var micSource = null;
function audioSupported() {
	return typeof window !== "undefined" && typeof AudioContext !== "undefined";
}
async function resumeEngine() {
	if (!audioSupported()) return null;
	if (!engine) {
		const ctx = new AudioContext();
		const master = ctx.createGain();
		master.gain.value = .22;
		const monitor = ctx.createGain();
		monitor.gain.value = 1;
		const airGain = ctx.createGain();
		airGain.gain.value = .18;
		const analyser = ctx.createAnalyser();
		analyser.fftSize = 2048;
		analyser.smoothingTimeConstant = .72;
		master.connect(analyser);
		airGain.connect(analyser);
		analyser.connect(monitor);
		monitor.connect(ctx.destination);
		engine = {
			ctx,
			master,
			analyser,
			airGain,
			monitor,
			freqData: new Float32Array(analyser.frequencyBinCount),
			timeData: new Uint8Array(analyser.fftSize),
			labOsc: null,
			labGain: null
		};
	}
	if (engine.ctx.state === "suspended") await engine.ctx.resume();
	return engine;
}
async function attachMic() {
	const e = await resumeEngine();
	if (!e) throw new Error("Audio unavailable");
	if (micStream) return true;
	micStream = await navigator.mediaDevices.getUserMedia({ audio: {
		echoCancellation: false,
		noiseSuppression: false,
		autoGainControl: false
	} });
	micSource = e.ctx.createMediaStreamSource(micStream);
	const gain = e.ctx.createGain();
	gain.gain.value = 1.4;
	micSource.connect(gain);
	gain.connect(e.analyser);
	return true;
}
function detachMic() {
	micSource?.disconnect();
	micSource = null;
	micStream?.getTracks().forEach((t) => t.stop());
	micStream = null;
}
function readSpectrum() {
	if (!engine) return null;
	const { analyser, freqData, timeData, ctx } = engine;
	analyser.getFloatFrequencyData(freqData);
	analyser.getByteTimeDomainData(timeData);
	let peakDb = -Infinity;
	let peakIdx = 0;
	for (let i = 2; i < freqData.length; i++) if (freqData[i] > peakDb) {
		peakDb = freqData[i];
		peakIdx = i;
	}
	const peakHz = peakIdx * ctx.sampleRate / analyser.fftSize;
	let sum = 0;
	for (let i = 0; i < timeData.length; i++) {
		const v = (timeData[i] - 128) / 128;
		sum += v * v;
	}
	const rms = Math.sqrt(sum / timeData.length);
	return {
		bins: freqData,
		time: timeData,
		peakHz,
		peakDb,
		rms
	};
}
function envelopeGain(ctx, pulses, start, peak) {
	const g = ctx.createGain();
	g.gain.setValueAtTime(0, start);
	let t = start;
	for (const p of pulses) {
		g.gain.setValueAtTime(peak, t);
		t += Math.max(p.high, 4e-5);
		g.gain.setValueAtTime(0, t);
		t += Math.max(p.low, 4e-5);
	}
	return {
		gain: g,
		end: t
	};
}
async function transmitTone(opts) {
	const e = await resumeEngine();
	if (!e) return 0;
	const { ctx, master, airGain } = e;
	const repeats = opts.repeats ?? 4;
	const peak = opts.gain ?? .55;
	const fsk = opts.modulation === "FSK" || opts.modulation === "FM238" || opts.modulation === "FM476";
	let t = ctx.currentTime + .02;
	const stopAt = [];
	for (let r = 0; r < repeats; r++) if (fsk) {
		const oscA = ctx.createOscillator();
		const oscB = ctx.createOscillator();
		oscA.type = "square";
		oscB.type = "square";
		oscA.frequency.value = opts.hz;
		oscB.frequency.value = opts.hz * 1.08;
		const mix = ctx.createGain();
		mix.gain.value = 0;
		oscA.connect(mix);
		oscB.connect(mix);
		mix.connect(master);
		mix.connect(airGain);
		let local = t;
		let useA = true;
		mix.gain.setValueAtTime(peak, local);
		for (const p of opts.pulses) {
			const dur = p.high + p.low;
			if (useA) oscA.frequency.setValueAtTime(opts.hz, local);
			else oscB.frequency.setValueAtTime(opts.hz * 1.08, local);
			local += dur;
			useA = !useA;
		}
		mix.gain.setValueAtTime(0, local);
		oscA.start(t);
		oscB.start(t);
		oscA.stop(local + .02);
		oscB.stop(local + .02);
		stopAt.push(oscA, oscB);
		t = local + .012;
	} else {
		const osc = ctx.createOscillator();
		osc.type = opts.modulation === "PWM" ? "sawtooth" : "square";
		osc.frequency.value = opts.hz;
		const { gain, end } = envelopeGain(ctx, opts.pulses, t, peak);
		osc.connect(gain);
		gain.connect(master);
		gain.connect(airGain);
		osc.start(t);
		osc.stop(end + .02);
		stopAt.push(osc);
		t = end + .01;
	}
	return t - ctx.currentTime;
}
async function playCarrier(hz, seconds, type = "square") {
	const e = await resumeEngine();
	if (!e) return;
	const osc = e.ctx.createOscillator();
	const g = e.ctx.createGain();
	osc.type = type;
	osc.frequency.value = hz;
	g.gain.value = .2;
	osc.connect(g);
	g.connect(e.master);
	osc.start();
	osc.stop(e.ctx.currentTime + seconds);
}
async function startLabOsc(hz, type, mix) {
	const e = await resumeEngine();
	if (!e) return;
	stopLabOsc();
	const osc = e.ctx.createOscillator();
	const g = e.ctx.createGain();
	osc.type = type;
	osc.frequency.value = hz;
	g.gain.value = .08 + mix * .28;
	osc.connect(g);
	g.connect(e.master);
	osc.start();
	e.labOsc = osc;
	e.labGain = g;
}
function updateLabOsc(hz, type, mix) {
	if (!engine?.labOsc || !engine.labGain) return;
	engine.labOsc.frequency.value = hz;
	engine.labOsc.type = type;
	engine.labGain.gain.value = .08 + mix * .28;
}
function stopLabOsc() {
	try {
		engine?.labOsc?.stop();
	} catch {}
	engine?.labOsc?.disconnect();
	engine?.labGain?.disconnect();
	if (engine) {
		engine.labOsc = null;
		engine.labGain = null;
	}
}
async function playTrackerNote(hz, dur = .12) {
	const e = await resumeEngine();
	if (!e) return;
	const osc = e.ctx.createOscillator();
	const g = e.ctx.createGain();
	osc.type = "square";
	osc.frequency.value = hz;
	const t = e.ctx.currentTime;
	g.gain.setValueAtTime(1e-4, t);
	g.gain.exponentialRampToValueAtTime(.22, t + .01);
	g.gain.exponentialRampToValueAtTime(1e-4, t + dur);
	osc.connect(g);
	g.connect(e.master);
	osc.start(t);
	osc.stop(t + dur + .02);
}
var TRACKER_SCALE = [
	196,
	220,
	261.63,
	293.66,
	329.63,
	392,
	440,
	523.25
];
var STORAGE_KEY = "wavzero.v1";
function loadPersisted() {
	if (typeof localStorage === "undefined") return {};
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : {};
	} catch {
		return {};
	}
}
function savePersisted(s) {
	if (typeof localStorage === "undefined") return;
	const payload = {
		captures: s.captures,
		rfid: s.rfid,
		nfc: s.nfc,
		ir: s.ir,
		ibutton: s.ibutton,
		script: s.script,
		settings: s.settings
	};
	localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}
function defaultPins() {
	return [
		"A7",
		"A6",
		"A4",
		"B3",
		"B2",
		"C3",
		"C1",
		"C0"
	].map((name, i) => ({
		n: i,
		name,
		mode: i < 4 ? "OUT" : "IN",
		value: 0
	}));
}
function spawnFood(w, h, body) {
	for (let k = 0; k < 40; k++) {
		const x = Math.floor(Math.random() * w);
		const y = Math.floor(Math.random() * h);
		if (!body.some((b) => b.x === x && b.y === y)) return {
			x,
			y
		};
	}
	return {
		x: 0,
		y: 0
	};
}
function freshSnake() {
	const w = 20;
	const h = 10;
	const body = [
		{
			x: 6,
			y: 5
		},
		{
			x: 5,
			y: 5
		},
		{
			x: 4,
			y: 5
		}
	];
	return {
		w,
		h,
		body,
		dir: {
			x: 1,
			y: 0
		},
		nextDir: {
			x: 1,
			y: 0
		},
		food: spawnFood(w, h, body),
		alive: true,
		score: 0,
		acc: 0
	};
}
var logSeq = 1;
function top(nav) {
	return nav[nav.length - 1];
}
function menuFor(id) {
	switch (id) {
		case "menu": return MAIN_MENU;
		case "subghz": return SUBGHZ_MENU;
		case "rfid": return RFID_MENU;
		case "nfc": return NFC_MENU;
		case "ir": return IR_MENU;
		case "gpio": return GPIO_MENU;
		case "ibutton": return IBUTTON_MENU;
		case "badusb": return BADUSB_MENU;
		case "apps": return APPS_MENU;
		case "settings": return SETTINGS_MENU;
		default: return [];
	}
}
function pushScreen(nav, id) {
	return [...nav, {
		id,
		cursor: 0
	}];
}
function popScreen(nav) {
	if (nav.length <= 1) return [{
		id: "menu",
		cursor: 0
	}];
	return nav.slice(0, -1);
}
var defaultSettings = {
	masterGain: .22,
	ambientAudio: false,
	ambientAir: true,
	verbose: true,
	showAudioHz: true,
	lcdContrast: .85
};
var useKit = create((set, get) => ({
	booted: false,
	audioReady: false,
	micOn: false,
	nav: [{
		id: "boot",
		cursor: 0
	}],
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
	music: {
		step: 0,
		playing: false,
		pattern: [
			0,
			2,
			4,
			2,
			5,
			4,
			2,
			0
		]
	},
	soundlab: {
		oscA: 4339,
		oscB: 4686,
		mix: .4,
		wave: "square",
		running: false
	},
	logs: [],
	logFilter: "ALL",
	settings: defaultSettings,
	now: 0,
	pulseView: [],
	hydrate: () => {
		const p = loadPersisted();
		if (p.captures) set({ captures: p.captures });
		if (p.rfid) set({ rfid: p.rfid });
		if (p.nfc) set({
			nfc: p.nfc,
			ndefDraft: p.nfc[0]?.ndef ?? ""
		});
		if (p.ir) set({ ir: p.ir });
		if (p.ibutton) set({ ibutton: p.ibutton });
		if (p.script) set({ script: p.script });
		if (p.settings) set({ settings: p.settings });
	},
	addLog: (mod, level, msg, detail) => {
		const line = {
			id: logSeq++,
			ts: Date.now(),
			mod,
			level,
			msg,
			detail
		};
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
		set({
			booted: true,
			nav: [{
				id: "menu",
				cursor: 0
			}]
		});
	},
	goto: (id) => set((s) => ({ nav: pushScreen(s.nav, id) })),
	press: (key) => {
		const s = get();
		const frame = top(s.nav);
		const menu = menuFor(frame.id);
		if (frame.id === "boot" && (key === "ok" || key === "back")) {
			get().boot();
			return;
		}
		if (frame.id === "apps-snake" && s.snake.alive) {
			const d = s.snake.dir;
			if (key === "up" && d.y === 0) set({ snake: {
				...s.snake,
				nextDir: {
					x: 0,
					y: -1
				}
			} });
			else if (key === "down" && d.y === 0) set({ snake: {
				...s.snake,
				nextDir: {
					x: 0,
					y: 1
				}
			} });
			else if (key === "left" && d.x === 0) set({ snake: {
				...s.snake,
				nextDir: {
					x: -1,
					y: 0
				}
			} });
			else if (key === "right" && d.x === 0) set({ snake: {
				...s.snake,
				nextDir: {
					x: 1,
					y: 0
				}
			} });
			else if (key === "ok") set({ snake: freshSnake() });
			else if (key === "back") set({ nav: popScreen(s.nav) });
			return;
		}
		if (key === "back") {
			if (s.rxActive) get().stopRx();
			if (frame.id === "apps-soundlab" && s.soundlab.running) {
				stopLabOsc();
				set({ soundlab: {
					...s.soundlab,
					running: false
				} });
			}
			if (frame.id === "apps-music") set({ music: {
				...s.music,
				playing: false
			} });
			set({
				nav: popScreen(s.nav),
				hopping: false,
				bleScanning: false
			});
			return;
		}
		if (menu.length) {
			if (key === "up") {
				set({ nav: s.nav.map((f, i) => i === s.nav.length - 1 ? {
					...f,
					cursor: (f.cursor + menu.length - 1) % menu.length
				} : f) });
				return;
			}
			if (key === "down") {
				set({ nav: s.nav.map((f, i) => i === s.nav.length - 1 ? {
					...f,
					cursor: (f.cursor + 1) % menu.length
				} : f) });
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
				set({ nav: pushScreen(s.nav, item.id) });
				if (item.id === "subghz-read" || item.id === "subghz-raw" || item.id === "subghz-analyzer") get().startRx();
				if (item.id === "apps-snake") set({ snake: freshSnake() });
				if (item.id === "nfc-ndef") set({ ndefDraft: s.nfc[s.selectedNfc]?.ndef ?? "" });
				return;
			}
		}
		switch (frame.id) {
			case "subghz-read":
			case "subghz-raw":
				if (key === "left") get().setMhz(s.mhz - (frame.id === "subghz-raw" ? .25 : .01));
				if (key === "right") get().setMhz(s.mhz + (frame.id === "subghz-raw" ? .25 : .01));
				if (key === "up") {
					const i = MODULATIONS.indexOf(s.modulation);
					get().setModulation(MODULATIONS[(i + MODULATIONS.length - 1) % MODULATIONS.length]);
				}
				if (key === "down") {
					const i = MODULATIONS.indexOf(s.modulation);
					get().setModulation(MODULATIONS[(i + 1) % MODULATIONS.length]);
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
				if (key === "up") set({ selectedRemote: (s.selectedRemote + DEMO_REMOTES.length - 1) % DEMO_REMOTES.length });
				if (key === "down") set({ selectedRemote: (s.selectedRemote + 1) % DEMO_REMOTES.length });
				if (key === "ok") get().transmitRemote(DEMO_REMOTES[s.selectedRemote].id);
				if (key === "left" || key === "right") {
					const p = FREQ_PRESETS;
					const idx = p.findIndex((x) => Math.abs(x.mhz - s.mhz) < .05);
					const next = p[((key === "right" ? idx + 1 : idx - 1) + p.length) % p.length];
					get().setMhz(next.mhz);
				}
				break;
			case "subghz-saved":
			case "archive":
				if (key === "up") set({ selectedCapture: Math.max(0, s.selectedCapture - 1) });
				if (key === "down") set({ selectedCapture: Math.min(Math.max(s.captures.length - 1, 0), s.selectedCapture + 1) });
				if (key === "ok" && s.captures[s.selectedCapture]) get().transmitCapture(s.captures[s.selectedCapture].id);
				break;
			case "rfid-read":
				if (key === "ok") {
					const tag = s.rfid[s.selectedRfid] ?? s.rfid[0];
					if (tag) {
						get().addLog("RFID", "rx", `EM4100 ${tag.uid}`, `${tag.name} · ${tag.kind} · 1250 Hz coil`);
						set({ lastDecode: emTrace("RFID", tag.uid, .125, tag.name) });
					}
				}
				if (key === "up") set({ selectedRfid: (s.selectedRfid + s.rfid.length - 1) % s.rfid.length });
				if (key === "down") set({ selectedRfid: (s.selectedRfid + 1) % s.rfid.length });
				break;
			case "rfid-emulate":
				if (key === "ok") get().emulateRfid();
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
					if (frame.id === "nfc-emulate") get().emulateNfc();
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
				if (key === "ok") get().transmitIr();
				break;
			case "ir-learn":
				if (key === "ok") get().learnIr();
				break;
			case "gpio-pins":
				if (key === "up") set({ nav: s.nav.map((f, i) => i === s.nav.length - 1 ? {
					...f,
					cursor: (f.cursor + 7) % 8
				} : f) });
				if (key === "down") set({ nav: s.nav.map((f, i) => i === s.nav.length - 1 ? {
					...f,
					cursor: (f.cursor + 1) % 8
				} : f) });
				if (key === "ok") get().togglePin(top(get().nav).cursor);
				if (key === "left" || key === "right") get().cyclePinMode(top(get().nav).cursor);
				break;
			case "gpio-uart":
				if (key === "ok") get().submitUart();
				break;
			case "gpio-i2c":
				if (key === "ok") get().addLog("I2C", "ok", "Scan 0x03–0x77", "4 devices ACK");
				break;
			case "ibutton-read":
			case "ibutton-emulate":
				if (key === "up") set({ selectedIbutton: (s.selectedIbutton + s.ibutton.length - 1) % s.ibutton.length });
				if (key === "down") set({ selectedIbutton: (s.selectedIbutton + 1) % s.ibutton.length });
				if (key === "ok") {
					if (frame.id === "ibutton-emulate") get().emulateIbutton();
					else {
						const k = s.ibutton[s.selectedIbutton];
						if (k) get().addLog("1WIRE", "rx", k.rom, k.family);
					}
				}
				break;
			case "badusb-run":
				if (key === "ok") get().runHid();
				break;
			case "ble":
			case "ble-scan":
				if (key === "ok") get().scanBle();
				if (key === "up" || key === "down") {
					const n = s.ble.length || 1;
					set({ nav: s.nav.map((f, i) => i === s.nav.length - 1 ? {
						...f,
						cursor: key === "down" ? (f.cursor + 1) % n : (f.cursor + n - 1) % n
					} : f) });
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
					pattern[i] = (pattern[i] + (key === "right" ? 1 : 7)) % 8;
					set({ music: {
						...s.music,
						pattern
					} });
				}
				if (key === "up" || key === "down") set({ music: {
					...s.music,
					step: (s.music.step + (key === "down" ? 1 : 7)) % 8
				} });
				break;
			case "apps-soundlab":
				if (key === "ok") get().toggleSoundlab();
				if (key === "left") get().setSoundlab({ oscA: clamp(s.soundlab.oscA - 40, 80, 8e3) });
				if (key === "right") get().setSoundlab({ oscA: clamp(s.soundlab.oscA + 40, 80, 8e3) });
				if (key === "up") get().setSoundlab({ mix: clamp(s.soundlab.mix + .1, 0, 1) });
				if (key === "down") get().setSoundlab({ mix: clamp(s.soundlab.mix - .1, 0, 1) });
				break;
			case "settings-audio":
				if (key === "left") get().setSetting("masterGain", clamp(s.settings.masterGain - .04, 0, .6));
				if (key === "right") get().setSetting("masterGain", clamp(s.settings.masterGain + .04, 0, .6));
				if (key === "ok") get().setSetting("ambientAudio", !s.settings.ambientAudio);
				if (key === "up") get().setSetting("verbose", !s.settings.verbose);
				break;
			case "settings-radio":
				if (key === "ok") get().setSetting("showAudioHz", !s.settings.showAudioHz);
				if (key === "left") get().setSetting("lcdContrast", clamp(s.settings.lcdContrast - .05, .4, 1));
				if (key === "right") get().setSetting("lcdContrast", clamp(s.settings.lcdContrast + .05, .4, 1));
				if (key === "up") get().setSetting("ambientAir", !s.settings.ambientAir);
		}
	},
	setMhz: (mhz) => {
		const v = clamp(Number(mhz.toFixed(2)), 300, 928);
		set({ mhz: v });
		if (get().settings.verbose) get().addLog("SUB", "debug", `Tune ${v.toFixed(2)} MHz`, `${mhzToAudio(v).toFixed(1)} Hz carrier`);
	},
	setModulation: (m) => {
		set({ modulation: m });
		get().addLog("SUB", "info", `Preset ${m}`);
	},
	startRx: () => {
		set({ rxActive: true });
		const s = get();
		get().addLog("SUB", "rx", `RX arm ${s.mhz.toFixed(2)} ${s.modulation}`, `carrier ${mhzToAudio(s.mhz).toFixed(1)} Hz  bw ${s.modulation}`);
	},
	stopRx: () => {
		set({
			rxActive: false,
			hopping: false
		});
		get().addLog("SUB", "info", "RX idle");
	},
	transmitCurrent: async () => {
		const remote = DEMO_REMOTES[get().selectedRemote] ?? DEMO_REMOTES[0];
		await get().transmitRemote(remote.id);
	},
	transmitRemote: async (id) => {
		const remote = DEMO_REMOTES.find((r) => r.id === id);
		if (!remote) return;
		const s = get();
		set({
			txActive: true,
			txName: remote.name,
			mhz: remote.mhz,
			modulation: remote.modulation
		});
		const hz = mhzToAudio(remote.mhz);
		get().addLog("SUB", "tx", `TX ${remote.name}`, `${remote.protocol} ${remote.bits.length} bit · ${hz.toFixed(1)} Hz`);
		if (s.settings.verbose) get().addLog("SUB", "debug", `TE pulses ${remote.pulses.length}`, remote.note);
		const dur = await transmitTone({
			hz,
			pulses: pulsesForRemote(remote),
			modulation: remote.modulation,
			repeats: 6
		});
		const sig = {
			id: uid("air"),
			mhz: remote.mhz,
			protocol: remote.protocol,
			rssi: -32,
			lastHeard: Date.now(),
			hex: hexFromBits(remote.bits),
			bits: remote.bits,
			modulation: remote.modulation
		};
		set((st) => ({
			air: upsertAir(st.air, sig),
			lastDecode: {
				protocol: remote.protocol,
				mhz: remote.mhz,
				audioHz: hz,
				modulation: remote.modulation,
				teUs: Math.round((remote.pulses[0]?.high ?? 35e-5) * 1e6),
				bits: remote.bits,
				hex: hexFromBits(remote.bits),
				repeats: 6,
				rssi: -32,
				snr: 24,
				pulses: remote.pulses,
				notes: [remote.note, "Loopback virtual air + speaker"]
			},
			pulseView: flattenPulses(remote.pulses)
		}));
		window.setTimeout(() => set({
			txActive: false,
			txName: ""
		}), Math.max(dur * 1e3, 400));
	},
	transmitCapture: async (id) => {
		const cap = get().captures.find((c) => c.id === id);
		if (!cap) return;
		set({
			txActive: true,
			txName: cap.name,
			mhz: cap.mhz,
			modulation: cap.modulation
		});
		get().addLog("SUB", "tx", `Replay ${cap.name}`, cap.hex);
		const dur = await transmitTone({
			hz: cap.audioHz,
			pulses: cap.pulses,
			modulation: cap.modulation,
			repeats: 5
		});
		window.setTimeout(() => set({
			txActive: false,
			txName: ""
		}), Math.max(dur * 1e3, 400));
	},
	saveLastDecode: () => {
		const d = get().lastDecode;
		if (!d) return;
		const cap = {
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
			note: d.notes.join(" · ")
		};
		set((s) => {
			const captures = [cap, ...s.captures].slice(0, 48);
			savePersisted({
				...s,
				captures
			});
			return { captures };
		});
		get().addLog("ARCH", "ok", `Saved ${cap.name}`, cap.id);
	},
	tick: (dt) => {
		const s = get();
		const now = Date.now();
		set({ now });
		if (s.nav[s.nav.length - 1]?.id === "apps-snake") tickSnake(dt, get, set);
		if (s.music.playing) tickMusic(dt, get, set);
		if (s.nmeaOn && Math.random() < dt * 1.2) {
			const line = nmeaLine();
			set((st) => ({ uartLines: [...st.uartLines.slice(-40), line] }));
		}
		if (!s.settings.ambientAir) return;
		if (Math.random() < dt * .35) {
			const remote = DEMO_REMOTES[Math.floor(Math.random() * DEMO_REMOTES.length)];
			const rssi = -40 - Math.floor(Math.random() * 45);
			const sig = {
				id: remote.id,
				mhz: remote.mhz,
				protocol: remote.protocol,
				rssi,
				lastHeard: now,
				hex: hexFromBits(remote.bits),
				bits: remote.bits,
				modulation: remote.modulation
			};
			set((st) => ({ air: upsertAir(st.air, sig) }));
			if (Math.abs(s.mhz - remote.mhz) < .4 && s.rxActive) {
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
						notes: ["Virtual ISM air", remote.note]
					},
					pulseView: flattenPulses(remote.pulses)
				});
				get().addLog("SUB", "rx", `Decode ${remote.protocol}`, `${remote.bits}  RSSI ${rssi} dBm`);
				if (s.settings.ambientAudio) transmitTone({
					hz: mhzToAudio(remote.mhz),
					pulses: remote.pulses,
					modulation: remote.modulation,
					repeats: 1,
					gain: .12
				});
			} else if (s.hopping) {
				set({
					mhz: remote.mhz,
					rssi,
					snr: Math.max(0, rssi + 88)
				});
				get().addLog("SUB", "info", `Peak ${remote.mhz.toFixed(2)}`, `${remote.protocol} ${rssi} dBm`);
			}
		}
		if (s.rxActive) {
			const near = s.air.filter((a) => now - a.lastHeard < 4e3 && Math.abs(a.mhz - s.mhz) < 1.2).sort((a, b) => b.rssi - a.rssi)[0];
			if (near) {
				const decay = Math.max(-98, near.rssi - (now - near.lastHeard) / 80);
				set({
					rssi: decay,
					snr: Math.max(0, decay + 90)
				});
			} else set((st) => ({
				rssi: st.rssi * .92 + -94 * .08,
				snr: st.snr * .9
			}));
		}
		if (s.bleScanning && Math.random() < dt * .8) {
			const pool = DEMO_BLE.filter((d) => !s.ble.some((b) => b.id === d.id));
			if (pool.length) {
				const d = pool[Math.floor(Math.random() * pool.length)];
				set((st) => ({ ble: [...st.ble, {
					...d,
					rssi: d.rssi - Math.floor(Math.random() * 8)
				}] }));
				get().addLog("BLE", "rx", d.name, `${d.addr}  ${d.adv}`);
			}
		}
	},
	toggleMic: async () => {
		if (get().micOn) {
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
			const settings = {
				...s.settings,
				[k]: v
			};
			savePersisted({
				...s,
				settings
			});
			return { settings };
		});
		if (k === "masterGain") resumeEngine().then((e) => {
			if (e) e.master.gain.value = v;
		});
	},
	setNdefDraft: (v) => set({ ndefDraft: v }),
	saveNdef: () => {
		const s = get();
		const nfc = s.nfc.map((c, i) => i === s.selectedNfc ? {
			...c,
			ndef: s.ndefDraft
		} : c);
		set({ nfc });
		savePersisted({
			...s,
			nfc
		});
		get().addLog("NFC", "ok", "NDEF written (sandbox)", s.ndefDraft.slice(0, 48));
	},
	addRfidTag: () => {
		const tag = {
			id: uid("rfid"),
			name: "Captured",
			kind: "EM4100",
			uid: randomEm4100()
		};
		set((s) => {
			const rfid = [tag, ...s.rfid];
			savePersisted({
				...s,
				rfid
			});
			return {
				rfid,
				selectedRfid: 0
			};
		});
		get().addLog("RFID", "ok", `New EM4100 ${tag.uid}`);
	},
	setScript: (v) => {
		set({ script: v });
		savePersisted({
			...get(),
			script: v
		});
	},
	runHid: async () => {
		const s = get();
		if (s.hidRunning) return;
		set({
			hidRunning: true,
			hidOutput: ""
		});
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
			uartLines: [
				...s.uartLines,
				`> ${cmd}`,
				...replies
			].slice(-50)
		});
	},
	togglePin: (n) => {
		set((s) => ({ gpio: s.gpio.map((p) => p.n === n && p.mode !== "IN" ? {
			...p,
			value: p.value ? 0 : 1
		} : p) }));
		const p = get().gpio[n];
		if (p) get().addLog("GPIO", "info", `${p.name} = ${p.value}  (${p.mode})`);
	},
	cyclePinMode: (n) => {
		const order = [
			"IN",
			"OUT",
			"OD"
		];
		set((s) => ({ gpio: s.gpio.map((p) => {
			if (p.n !== n) return p;
			const i = order.indexOf(p.mode);
			return {
				...p,
				mode: order[(i + 1) % order.length],
				value: 0
			};
		}) }));
	},
	toggleSoundlab: async () => {
		const s = get().soundlab;
		if (s.running) {
			stopLabOsc();
			set({ soundlab: {
				...s,
				running: false
			} });
			get().addLog("LAB", "info", "Oscillator off");
			return;
		}
		await startLabOsc(s.oscA, s.wave, s.mix);
		set({ soundlab: {
			...s,
			running: true
		} });
		get().addLog("LAB", "tx", `Lab osc ${s.oscA.toFixed(0)} Hz`, s.wave);
	},
	setSoundlab: (p) => {
		const soundlab = {
			...get().soundlab,
			...p
		};
		set({ soundlab });
		if (soundlab.running) updateLabOsc(soundlab.oscA, soundlab.wave, soundlab.mix);
	},
	toggleTracker: () => {
		const playing = !get().music.playing;
		set({ music: {
			...get().music,
			playing
		} });
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
		set({
			txActive: true,
			txName: tag.name
		});
		get().addLog("RFID", "tx", `Emulate ${tag.kind}`, `${tag.uid} @ 1250 Hz`);
		await playCarrier(1250, .8, "square");
		set({
			txActive: false,
			txName: ""
		});
	},
	emulateNfc: async () => {
		const c = get().nfc[get().selectedNfc];
		if (!c) return;
		set({
			txActive: true,
			txName: c.name
		});
		get().addLog("NFC", "tx", `Field ${c.type}`, `${c.uid} @ 1356 Hz (13.56 MHz ÷ 10k)`);
		await playCarrier(1356, .7, "sine");
		set({
			txActive: false,
			txName: ""
		});
	},
	emulateIbutton: async () => {
		const k = get().ibutton[get().selectedIbutton];
		if (!k) return;
		set({
			txActive: true,
			txName: k.name
		});
		get().addLog("1WIRE", "tx", `ROM ${k.rom}`, k.family);
		await playCarrier(880, .4, "square");
		set({
			txActive: false,
			txName: ""
		});
	},
	learnIr: async () => {
		get().addLog("IR", "info", "Learner armed", "listening for NEC-like pulse train");
		await sleep(500);
		const cmd = {
			id: uid("ir"),
			brand: "Learned",
			device: "Unknown",
			button: "KEY",
			protocol: "NEC",
			address: "07",
			command: Math.floor(Math.random() * 256).toString(16).padStart(2, "0").toUpperCase()
		};
		set((s) => {
			const ir = [cmd, ...s.ir];
			savePersisted({
				...s,
				ir
			});
			return {
				ir,
				selectedIr: 0
			};
		});
		get().addLog("IR", "ok", `Learned NEC ${cmd.address} ${cmd.command}`);
	},
	transmitIr: async (id) => {
		const s = get();
		const cmd = s.ir.find((c) => c.id === id) ?? s.ir[s.selectedIr];
		if (!cmd) return;
		set({
			txActive: true,
			txName: `${cmd.device} ${cmd.button}`
		});
		get().addLog("IR", "tx", `${cmd.protocol} ${cmd.button}`, `${cmd.brand}  addr ${cmd.address} cmd ${cmd.command}`);
		await transmitTone({
			hz: 3800,
			pulses: pulsesForIr(cmd),
			modulation: "PWM",
			repeats: 2,
			gain: .4
		});
		set({
			txActive: false,
			txName: ""
		});
	},
	scanBle: () => {
		set({
			bleScanning: true,
			ble: []
		});
		get().addLog("BLE", "info", "LE scan window 4.2s");
		window.setTimeout(() => {
			set({ bleScanning: false });
			get().addLog("BLE", "ok", `Scan done  ${get().ble.length} advertisers`);
		}, 4200);
	},
	confirmU2f: () => {
		if (!get().u2fArmed) {
			set({ u2fArmed: true });
			get().addLog("U2F", "info", "Presence requested", "rp=sandbox.wavzero");
			return;
		}
		set({
			u2fArmed: false,
			u2fLast: (/* @__PURE__ */ new Date()).toISOString()
		});
		get().addLog("U2F", "ok", "User presence  assertion signed", "demo key handle, not a real token");
	}
}));
function upsertAir(air, sig) {
	return [sig, ...air.filter((a) => a.id !== sig.id && Date.now() - a.lastHeard < 12e3)].slice(0, 16);
}
function flattenPulses(pulses) {
	const out = [];
	for (const p of pulses.slice(0, 24)) out.push(1, p.high, 0, p.low);
	return out;
}
function emTrace(protocol, hex, mhz, note) {
	return {
		protocol,
		mhz,
		audioHz: mhz >= 10 ? mhzToAudio(mhz) : mhz * 1e4,
		modulation: "OOK",
		teUs: 400,
		bits: hex.replace(/[^0-9A-F]/gi, ""),
		hex,
		repeats: 1,
		rssi: -28,
		snr: 22,
		pulses: [{
			high: 4e-4,
			low: 4e-4
		}],
		notes: [note]
	};
}
function sleep(ms) {
	return new Promise((r) => setTimeout(r, ms));
}
function uartReply(cmd, s) {
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
	const t = /* @__PURE__ */ new Date();
	return `$GPGGA,${`${pad(t.getUTCHours())}${pad(t.getUTCMinutes())}${pad(t.getUTCSeconds())}`},3748.000,N,12224.000,W,1,08,0.9,12.0,M,32.0,M,,*5B`;
}
function pad(n) {
	return n.toString().padStart(2, "0");
}
function tickSnake(dt, get, set) {
	const snake = get().snake;
	if (!snake.alive) return;
	const acc = snake.acc + dt;
	const step = .16;
	if (acc < step) {
		set({ snake: {
			...snake,
			acc
		} });
		return;
	}
	const dir = snake.nextDir;
	const head = snake.body[0];
	const nx = (head.x + dir.x + snake.w) % snake.w;
	const ny = (head.y + dir.y + snake.h) % snake.h;
	if (snake.body.some((b) => b.x === nx && b.y === ny)) {
		set({ snake: {
			...snake,
			alive: false,
			acc: 0
		} });
		return;
	}
	const ate = nx === snake.food.x && ny === snake.food.y;
	const body = [{
		x: nx,
		y: ny
	}, ...snake.body];
	if (!ate) body.pop();
	set({ snake: {
		...snake,
		body,
		dir,
		acc: acc - step,
		score: snake.score + (ate ? 1 : 0),
		food: ate ? spawnFood(snake.w, snake.h, body) : snake.food,
		alive: true
	} });
}
var musicAcc = 0;
function tickMusic(dt, get, set) {
	musicAcc += dt;
	if (musicAcc < .14) return;
	musicAcc = 0;
	const m = get().music;
	const step = (m.step + 1) % 8;
	playTrackerNote(TRACKER_SCALE[m.pattern[step] ?? 0] ?? 220);
	set({ music: {
		...m,
		step
	} });
}
function currentScreen(s) {
	return s.nav[s.nav.length - 1]?.id ?? "boot";
}
function currentCursor(s) {
	return s.nav[s.nav.length - 1]?.cursor ?? 0;
}
function menuLines(items, cursor, visible = 5) {
	const start = Math.max(0, Math.min(cursor - (visible - 1), items.length - visible));
	return items.slice(start, start + visible).map((it, i) => ({
		text: it.label,
		invert: start + i === cursor
	}));
}
function rssiBar(rssi) {
	const n = Math.max(0, Math.min(8, Math.round((rssi + 100) / 8)));
	return "#".repeat(n).padEnd(8, "-");
}
function sceneFor(s) {
	const screen = currentScreen(s);
	const cursor = currentCursor(s);
	if (!s.booted || screen === "boot") return {
		status: false,
		lines: [],
		center: [
			"WAVZERO",
			"sound-wave radio",
			"",
			"press OK to boot"
		],
		footer: "audio field kit"
	};
	switch (screen) {
		case "menu": return {
			title: "WAVZERO",
			lines: menuLines(MAIN_MENU, cursor, 5),
			footer: MAIN_MENU[cursor]?.hint
		};
		case "subghz": return {
			title: "Sub-GHz",
			lines: menuLines(SUBGHZ_MENU, cursor),
			footer: `${formatMhz(s.mhz)} MHz`
		};
		case "subghz-read": return {
			title: "Read",
			lines: [
				{ text: `Freq ${formatMhz(s.mhz)}` },
				{ text: `Mod  ${s.modulation}` },
				{ text: `RSSI ${rssiBar(s.rssi)}` },
				{
					text: s.rxActive ? "listening..." : "OK to listen",
					dim: !s.rxActive
				},
				{
					text: s.lastDecode ? s.lastDecode.protocol : "no decode",
					dim: !s.lastDecode
				}
			],
			footer: s.settings.showAudioHz ? `${mhzToAudio(s.mhz).toFixed(0)} Hz` : "L/R tune"
		};
		case "subghz-raw": {
			const samples = pulseToSamples(s.pulseView);
			return {
				title: "RAW",
				lines: [{ text: `${formatMhz(s.mhz)}  ${s.modulation}` }, { text: s.rxActive ? "REC  running" : "REC  idle" }],
				graph: {
					samples,
					label: "pulses"
				},
				footer: "OK rec  L/R hop"
			};
		}
		case "subghz-analyzer": {
			const rows = [...s.air].sort((a, b) => b.lastHeard - a.lastHeard).slice(0, 5).map((a) => ({ text: `${a.mhz.toFixed(2).padStart(6, " ")} ${rssiBar(a.rssi).slice(0, 6)}` }));
			return {
				title: "Analyzer",
				lines: rows.length ? rows : [{
					text: "scanning air...",
					dim: true
				}],
				footer: s.hopping ? "HOP ON  OK hold" : "OK hop"
			};
		}
		case "subghz-tx": {
			const r = DEMO_REMOTES[s.selectedRemote];
			return {
				title: "Transmit",
				invertTitle: s.txActive,
				lines: [
					{
						text: r.name,
						invert: true
					},
					{ text: r.protocol },
					{ text: `${formatMhz(r.mhz)}  ${r.modulation}` },
					{ text: `${r.bits.length} bit  DEMO` }
				],
				footer: s.txActive ? "TX ..." : "OK send"
			};
		}
		case "subghz-saved":
		case "archive": {
			const items = s.captures;
			if (!items.length) return {
				title: "Archive",
				lines: [{
					text: "empty",
					dim: true
				}],
				footer: "save from Read"
			};
			const start = Math.max(0, s.selectedCapture - 3);
			return {
				title: screen === "archive" ? "Archive" : "Saved",
				lines: items.slice(start, start + 5).map((c, i) => ({
					text: c.name.slice(0, 20),
					invert: start + i === s.selectedCapture
				})),
				footer: "OK replay"
			};
		}
		case "rfid": return {
			title: "125 kHz",
			lines: menuLines(RFID_MENU, cursor),
			footer: "coil 1250 Hz"
		};
		case "rfid-read":
		case "rfid-emulate": {
			const t = s.rfid[s.selectedRfid];
			return {
				title: screen === "rfid-read" ? "RFID Read" : "Emulate",
				lines: [
					{
						text: t?.name ?? "no tag",
						invert: true
					},
					{ text: t?.kind ?? "" },
					{ text: t?.uid ?? "" },
					{ text: screen === "rfid-read" ? "OK scan field" : "OK emulate" }
				],
				footer: "U/D pick tag"
			};
		}
		case "rfid-saved": return {
			title: "RFID saved",
			lines: s.rfid.slice(0, 5).map((t, i) => ({
				text: t.name,
				invert: i === s.selectedRfid
			})),
			footer: "OK new random"
		};
		case "nfc": return {
			title: "NFC",
			lines: menuLines(NFC_MENU, cursor),
			footer: "13.56 / 1.356 kHz"
		};
		case "nfc-read":
		case "nfc-emulate": {
			const c = s.nfc[s.selectedNfc];
			return {
				title: screen === "nfc-read" ? "NFC Read" : "Emulate",
				lines: [
					{
						text: c?.name ?? "",
						invert: true
					},
					{ text: c?.type ?? "" },
					{ text: c?.uid ?? "" },
					{ text: (c?.ndef || "empty").slice(0, 21) }
				],
				footer: "OK"
			};
		}
		case "nfc-ndef": return {
			title: "NDEF",
			lines: [
				{
					text: s.nfc[s.selectedNfc]?.name ?? "",
					invert: true
				},
				{ text: s.ndefDraft.slice(0, 21) || "empty" },
				{ text: s.ndefDraft.slice(21, 42) },
				{ text: "OK write sandbox" }
			]
		};
		case "ir": return {
			title: "Infrared",
			lines: menuLines(IR_MENU, cursor),
			footer: "38 kHz → 3.8 kHz"
		};
		case "ir-library":
		case "ir-tx": {
			const c = s.ir[s.selectedIr];
			return {
				title: "IR",
				lines: [
					{
						text: `${c?.brand} ${c?.device}`.slice(0, 21),
						invert: true
					},
					{ text: c?.button ?? "" },
					{ text: `${c?.protocol} ${c?.address} ${c?.command}` }
				],
				footer: s.txActive ? "IR LED" : "OK send chirp"
			};
		}
		case "ir-learn": return {
			title: "Learn",
			lines: [
				{ text: "point remote at mic" },
				{ text: "or OK for demo learn" },
				{ text: `${s.ir.filter((i) => i.brand === "Learned").length} learned` }
			]
		};
		case "gpio": return {
			title: "GPIO",
			lines: menuLines(GPIO_MENU, cursor)
		};
		case "gpio-pins": return {
			title: "Pins",
			lines: s.gpio.slice(0, 5).map((p, i) => ({
				text: `${p.name} ${p.mode.padEnd(3, " ")} ${p.value ? "HI" : "LO"}`,
				invert: i === cursor
			})),
			footer: "OK toggle  L/R mode"
		};
		case "gpio-uart": return {
			title: "UART",
			lines: s.uartLines.slice(-4).map((t) => ({
				text: t.slice(0, 21),
				dim: t.startsWith(">")
			})),
			footer: s.nmeaOn ? "NMEA on" : "115200 8N1"
		};
		case "gpio-i2c": return {
			title: "I2C",
			lines: I2C_MAP.map((d) => ({ text: `${d.addr} ${d.name}`.slice(0, 21) })),
			footer: "OK rescan"
		};
		case "ibutton": return {
			title: "iButton",
			lines: menuLines(IBUTTON_MENU, cursor)
		};
		case "ibutton-read":
		case "ibutton-emulate": {
			const k = s.ibutton[s.selectedIbutton];
			return {
				title: "1-Wire",
				lines: [
					{
						text: k?.name ?? "",
						invert: true
					},
					{ text: k?.family ?? "" },
					{ text: k?.rom.slice(0, 21) ?? "" }
				],
				footer: "OK"
			};
		}
		case "badusb": return {
			title: "Bad USB",
			lines: menuLines(BADUSB_MENU, cursor),
			footer: "sandbox only"
		};
		case "badusb-edit": return {
			title: "Script",
			lines: s.script.split("\n").filter(Boolean).slice(0, 5).map((t) => ({ text: t.slice(0, 21) })),
			footer: "edit in lab"
		};
		case "badusb-run": return {
			title: "HID",
			lines: [{ text: s.hidRunning ? "injecting..." : "OK run sandbox" }, { text: s.hidOutput.split("\n").at(-1)?.slice(0, 21) || "" }],
			footer: "never leaves kit"
		};
		case "ble":
		case "ble-scan": return {
			title: "Bluetooth",
			lines: s.ble.length ? s.ble.slice(0, 5).map((d, i) => ({
				text: `${d.rssi} ${d.name}`.slice(0, 21),
				invert: i === cursor
			})) : [{
				text: s.bleScanning ? "scanning..." : "OK scan",
				dim: true
			}],
			footer: `${s.ble.length} adv`
		};
		case "u2f": return {
			title: "U2F",
			lines: [
				{
					text: s.u2fArmed ? "press OK presence" : "idle  sandbox RP",
					invert: s.u2fArmed
				},
				{ text: "rp sandbox.wavzero" },
				{ text: s.u2fLast ? "last assert ok" : "no assertion" }
			]
		};
		case "apps": return {
			title: "Apps",
			lines: menuLines(APPS_MENU, cursor)
		};
		case "apps-snake": {
			const samples = snakeSamples(s);
			return {
				title: `Snake ${s.snake.score}`,
				lines: s.snake.alive ? [] : [{ text: "game over  OK retry" }],
				graph: { samples },
				footer: "D-pad  OK retry"
			};
		}
		case "apps-music": return {
			title: "Tracker",
			lines: [
				{ text: s.music.pattern.map((n, i) => i === s.music.step ? `[${n}]` : `${n}`).join("") },
				{ text: s.music.playing ? "playing" : "stopped" },
				{ text: "L/R note  U/D step" }
			],
			footer: "OK run"
		};
		case "apps-soundlab": return {
			title: "Sound lab",
			lines: [
				{ text: `${s.soundlab.oscA.toFixed(0)} Hz` },
				{ text: `mix ${s.soundlab.mix.toFixed(1)}  ${s.soundlab.wave}` },
				{
					text: s.soundlab.running ? "RUNNING" : "OK start",
					invert: s.soundlab.running
				}
			],
			footer: "L/R freq"
		};
		case "settings": return {
			title: "Settings",
			lines: menuLines(SETTINGS_MENU, cursor)
		};
		case "settings-audio": return {
			title: "Audio",
			lines: [
				{ text: `gain ${s.settings.masterGain.toFixed(2)}` },
				{ text: `air speaker ${s.settings.ambientAudio ? "ON" : "off"}` },
				{ text: `verbose ${s.settings.verbose ? "ON" : "off"}` }
			],
			footer: "L/R gain  OK air"
		};
		case "settings-radio": return {
			title: "Radio map",
			lines: [
				{ text: "MHz x10 = audio Hz" },
				{ text: `show Hz ${s.settings.showAudioHz ? "ON" : "off"}` },
				{ text: `virtual air ${s.settings.ambientAir ? "ON" : "off"}` },
				{ text: `LCD ${s.settings.lcdContrast.toFixed(2)}` }
			]
		};
		case "about": return {
			title: "About",
			lines: [
				{ text: "WAVZERO 1.4" },
				{ text: "education sandbox" },
				{ text: "no RF  sound only" },
				{ text: "demo keys never real" }
			]
		};
		default: return {
			title: screen,
			lines: [{ text: "..." }]
		};
	}
}
function pulseToSamples(flat) {
	const samples = new Array(64).fill(.15);
	if (!flat.length) return samples;
	let x = 0;
	for (let i = 0; i < flat.length && x < 64; i += 2) {
		const on = flat[i];
		const dur = flat[i + 1] ?? 3e-4;
		const w = Math.max(1, Math.round(dur * 8e3));
		for (let k = 0; k < w && x < 64; k++, x++) samples[x] = on ? .9 : .12;
	}
	return samples;
}
function snakeSamples(s) {
	const { w, h, body, food } = s.snake;
	const samples = new Array(64).fill(.08);
	const plot = (x, y, v) => {
		const col = Math.floor(x / w * 32);
		const row = Math.floor(y / h * 2);
		const idx = Math.min(63, col + row * 32);
		samples[idx] = v;
	};
	body.forEach((b, i) => plot(b.x, b.y, i === 0 ? 1 : .7));
	plot(food.x, food.y, .45);
	return samples;
}
var W = 128;
var H = 64;
function LcdCanvas() {
	const canvasRef = (0, import_react.useRef)(null);
	const contrast = useKit((s) => s.settings.lcdContrast);
	const snap = useKit((s) => s);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		drawLcd(ctx, sceneFor(snap), contrast, new Date(snap.now), snap.audioReady, snap.txActive, snap.rxActive);
	}, [snap, contrast]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		width: W,
		height: H,
		className: "block h-full w-full",
		style: { imageRendering: "pixelated" },
		"aria-label": "Device LCD"
	});
}
function drawLcd(ctx, scene, contrast, now, audio, tx, rx) {
	const on = `rgba(200, 210, 184, ${.55 + contrast * .45})`;
	const dim = `rgba(200, 210, 184, ${.18 + contrast * .16})`;
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
		} else ctx.fillStyle = on;
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
			ctx.fillText(clip(ctx, line.text, 124), 2, y + 1);
		} else {
			ctx.fillStyle = line.dim ? dim : on;
			ctx.fillText(clip(ctx, line.text, 124), line.indent ? 8 : 2, y + 1);
		}
		y += 10;
	});
	if (scene.graph) {
		const gh = scene.lines.length ? 18 : 36;
		const gy = Math.min(y + 1, H - gh - 9);
		drawGraph(ctx, scene.graph.samples, 2, gy, 124, gh, on, dim);
	}
	if (scene.footer) {
		ctx.fillStyle = dim;
		ctx.fillRect(0, 55, W, 1);
		ctx.fillStyle = on;
		ctx.font = "7px ui-monospace, monospace";
		ctx.fillText(clip(ctx, scene.footer, 124), 2, 56);
	}
	if (scene.popup) {
		const pw = 100;
		const ph = 22;
		const px = 14;
		const py = 20;
		ctx.fillStyle = "#0e1410";
		ctx.fillRect(px, py, pw, ph);
		ctx.strokeStyle = on;
		ctx.strokeRect(14.5, 20.5, 99, 21);
		ctx.fillStyle = on;
		ctx.fillText(scene.popup, 20, 28);
	}
}
function clip(ctx, text, max) {
	if (ctx.measureText(text).width <= max) return text;
	let t = text;
	while (t.length && ctx.measureText(`${t}…`).width > max) t = t.slice(0, -1);
	return `${t}…`;
}
function drawGraph(ctx, samples, x, y, w, h, on, dim) {
	ctx.strokeStyle = dim;
	ctx.strokeRect(x + .5, y + .5, w - 1, h - 1);
	const n = samples.length;
	const bar = w / n;
	ctx.fillStyle = on;
	for (let i = 0; i < n; i++) {
		const v = samples[i] ?? 0;
		const bh = Math.max(1, v * (h - 4));
		ctx.fillRect(x + i * bar, y + h - 2 - bh, Math.max(1, bar - .3), bh);
	}
}
var KEYS = [
	{
		id: "up",
		label: "Up",
		className: "col-start-2 row-start-1"
	},
	{
		id: "left",
		label: "Left",
		className: "col-start-1 row-start-2"
	},
	{
		id: "ok",
		label: "OK",
		className: "col-start-2 row-start-2"
	},
	{
		id: "right",
		label: "Right",
		className: "col-start-3 row-start-2"
	},
	{
		id: "down",
		label: "Down",
		className: "col-start-2 row-start-3"
	}
];
function DeviceShell() {
	const press = useKit((s) => s.press);
	const tx = useKit((s) => s.txActive);
	const rx = useKit((s) => s.rxActive);
	const booted = useKit((s) => s.booted);
	const screen = useKit((s) => currentScreen(s));
	const mhz = useKit((s) => s.mhz);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto w-full max-w-[380px]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "device-body relative rounded-[36px] border border-border px-4 pb-5 pt-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "antenna-bay -mx-4 mb-3 flex items-center justify-between rounded-t-[36px] px-5 py-2.5 text-[10px] font-medium tracking-[0.18em] text-signal-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SUB-GHZ / AUDIO" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: mhz.toFixed(2)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between px-1 text-[10px] text-faint",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tracking-[0.2em]",
						children: "WAVZERO"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Led, {
								label: "TX",
								on: tx,
								tone: "tx"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Led, {
								label: "RX",
								on: rx && !tx,
								tone: "rx"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Led, {
								label: "SYS",
								on: booted,
								tone: "ok"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lcd-glow relative overflow-hidden rounded-[var(--radius-md)] border border-border bg-lcd",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[2/1] p-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LcdCanvas, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scanlines absolute inset-0 rounded-[var(--radius-md)]" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 px-1 font-mono text-[10px] uppercase tracking-widest text-faint",
					children: [screen.replace("-", " "), " · speaker coil"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-[1fr_auto] items-center gap-4 px-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 grid-rows-3 place-items-center gap-1.5",
						children: KEYS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pad, {
							className: k.className,
							label: k.label,
							accent: k.id === "ok",
							onPress: () => press(k.id)
						}, k.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pad, {
						label: "Back",
						wide: true,
						onPress: () => press("back")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-end justify-between px-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1.5",
						children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-elevated ring-1 ring-border" }, i))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2 w-10 rounded-full bg-elevated ring-1 ring-border",
						title: "USB-C"
					})]
				})
			]
		})
	});
}
function Led({ label, on, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex items-center gap-1 font-mono",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full bg-faint", on && (tone === "tx" ? "bg-tx" : tone === "rx" ? "bg-rx" : "bg-ok"), on && "led-live") }), label]
	});
}
function Pad({ label, onPress, className, accent, wide }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		onPointerDown: (e) => {
			e.preventDefault();
			onPress();
		},
		className: cn("select-none rounded-full border border-border bg-elevated text-[10px] font-medium uppercase tracking-wider text-muted", "transition-transform duration-150 ease-out hover:text-fg active:scale-[0.96]", accent ? "size-14 bg-primary text-primary-fg hover:text-primary-fg" : "size-12", wide && "h-12 w-16 rounded-[18px]", className),
		children: label
	});
}
function Inspector() {
	const decode = useKit((s) => s.lastDecode);
	const rssi = useKit((s) => s.rssi);
	const snr = useKit((s) => s.snr);
	const mhz = useKit((s) => s.mhz);
	const modulation = useKit((s) => s.modulation);
	const air = useKit((s) => s.air);
	const tx = useKit((s) => s.txActive);
	const txName = useKit((s) => s.txName);
	const mic = useKit((s) => s.micOn);
	const rows = [
		["Codec", useKit((s) => s.audioReady) ? "running" : "idle"],
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
		["Repeats", decode ? String(decode.repeats) : "—"]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-border px-3 py-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-medium tracking-wide text-muted",
					children: "Inspector"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "grid grid-cols-[88px_1fr] gap-x-3 gap-y-1 px-3 py-3 font-mono text-[11px]",
				children: rows.map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "contents",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-faint",
						children: k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "truncate text-primary",
						children: v
					})]
				}, k))
			}),
			decode?.notes.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border-t border-border px-3 py-2 text-xs text-muted",
				children: decode.notes.join(" · ")
			}) : null,
			air.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "border-t border-border px-3 py-2 font-mono text-[11px] text-muted",
				children: air.slice(0, 4).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						a.mhz.toFixed(2),
						" ",
						a.protocol
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums text-faint",
						children: [a.rssi, " dBm"]
					})]
				}, a.id + a.lastHeard))
			}) : null
		]
	});
}
var FILTERS = [
	"ALL",
	"SUB",
	"AUDIO",
	"RFID",
	"NFC",
	"IR",
	"GPIO",
	"UART",
	"HID",
	"BLE",
	"SYS"
];
function LogConsole() {
	const logs = useKit((s) => s.logs);
	const filter = useKit((s) => s.logFilter);
	const setFilter = useKit((s) => s.setLogFilter);
	const scroller = (0, import_react.useRef)(null);
	const visible = filter === "ALL" ? logs : logs.filter((l) => l.mod === filter);
	(0, import_react.useEffect)(() => {
		const el = scroller.current;
		if (!el) return;
		el.scrollTop = el.scrollHeight;
	}, [visible.length]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex min-h-0 flex-1 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-wrap items-center gap-1 border-b border-border px-2 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mr-2 px-1 text-xs font-medium tracking-wide text-muted",
				children: "Verbose log"
			}), FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setFilter(f),
				className: cn("h-7 rounded-[var(--radius-xs)] px-2 font-mono text-[10px] tracking-wide", filter === f ? "bg-primary text-primary-fg" : "text-muted hover:bg-elevated hover:text-fg"),
				children: f
			}, f))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: scroller,
			className: "min-h-[180px] flex-1 overflow-auto px-3 py-2 font-mono text-[11px] leading-5",
			children: visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-faint",
				children: "No lines yet. Boot the kit and talk to the air."
			}) : visible.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[88px_44px_1fr] gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-faint tabular-nums",
						children: formatMs(l.ts)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("log-info", `log-${l.level}`),
						children: l.mod
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn(`log-${l.level}`),
						children: l.msg
					}), l.detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 text-faint",
						children: l.detail
					}) : null] })
				]
			}, l.id))
		})]
	});
}
function Spectrum() {
	const canvasRef = (0, import_react.useRef)(null);
	const hist = (0, import_react.useRef)([]);
	const mhz = useKit((s) => s.mhz);
	const rx = useKit((s) => s.rxActive);
	const tx = useKit((s) => s.txActive);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		const loop = () => {
			const canvas = canvasRef.current;
			const ctx = canvas?.getContext("2d");
			if (canvas && ctx) paint(ctx, canvas, readSpectrum(), mhz, hist.current);
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [mhz]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between border-b border-border px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xs font-medium tracking-wide text-muted",
				children: "Air · spectrum"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-[11px] tabular-nums text-primary",
				children: [
					tx ? "TX" : rx ? "RX" : "IDLE",
					" · marker ",
					formatHz(mhzToAudio(mhz))
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			width: 720,
			height: 168,
			className: "h-[168px] w-full"
		})]
	});
}
function paint(ctx, canvas, frame, mhz, hist) {
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
	const row = [];
	for (let i = 0; i < n; i++) {
		const db = bins[i] ?? -120;
		row.push((db + 100) / 80);
	}
	hist.unshift(row);
	if (hist.length > 46) hist.length = 46;
	const waterH = 72;
	for (let y = 0; y < hist.length; y++) {
		const r = hist[y];
		for (let x = 0; x < r.length; x++) {
			const v = Math.max(0, Math.min(1, r[x]));
			const g = 80 + v * 140;
			ctx.fillStyle = `rgb(${(40 + v * 90) * v + 20}, ${g}, 80)`;
			ctx.fillRect(x / n * w, y * (waterH / 46), w / n + .5, 2.0652173913043477);
		}
	}
	ctx.beginPath();
	ctx.strokeStyle = "#c8d2b8";
	ctx.lineWidth = 1.4;
	const base = 80;
	const amp = h - base - 10;
	for (let i = 0; i < n; i++) {
		const v = Math.max(0, Math.min(1, row[i]));
		const x = i / n * w;
		const y = base + amp - v * amp;
		if (i === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	}
	ctx.stroke();
	const markerX = Math.min(.98, mhzToAudio(mhz) / 8e3) * w;
	ctx.strokeStyle = "#e07020";
	ctx.beginPath();
	ctx.moveTo(markerX, 0);
	ctx.lineTo(markerX, h);
	ctx.stroke();
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] text-sm font-medium transition-[opacity,transform,background-color] duration-150 ease-out disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg hover:opacity-90",
			signal: "bg-signal text-signal-fg hover:opacity-90",
			outline: "border border-border bg-elevated text-fg hover:bg-surface",
			ghost: "text-muted hover:text-fg hover:bg-elevated"
		},
		size: {
			default: "h-10 px-3.5",
			sm: "h-8 px-2.5 text-xs",
			lg: "h-11 px-4",
			icon: "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function Workbench() {
	const screen = useKit((s) => currentScreen(s));
	if (screen.startsWith("subghz") || screen === "boot" || screen === "menu") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubghzBench, {});
	if (screen.startsWith("rfid")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RfidBench, {});
	if (screen.startsWith("nfc")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NfcBench, {});
	if (screen.startsWith("ir")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IrBench, {});
	if (screen.startsWith("gpio") || screen === "gpio") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GpioBench, {});
	if (screen.startsWith("ibutton")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IbuttonBench, {});
	if (screen.startsWith("badusb")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HidBench, {});
	if (screen.startsWith("ble")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BleBench, {});
	if (screen === "u2f") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(U2fBench, {});
	if (screen.startsWith("apps")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppsBench, {});
	if (screen.startsWith("settings") || screen === "about" || screen === "archive") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsBench, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubghzBench, {});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] uppercase tracking-widest text-muted",
							children: "Tune MHz"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-3xl tabular-nums leading-none text-primary",
							children: formatMhz(mhz)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-xs text-faint",
							children: [formatHz(mhzToAudio(mhz)), " acoustic"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: rx ? "signal" : "outline",
							onClick: () => rx ? stopRx() : startRx(),
							children: rx ? "Stop RX" : "Listen"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => void tx(),
							children: "Transmit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: save,
							disabled: !decode,
							children: "Save"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "range",
				min: 300,
				max: 928,
				step: .01,
				value: mhz,
				onChange: (e) => setMhz(Number(e.target.value)),
				className: "w-full accent-[var(--color-signal)]",
				"aria-label": "Frequency"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5",
				children: MODULATIONS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setModulation(m),
					className: cn("h-8 rounded-[var(--radius-xs)] border px-2 font-mono text-[11px]", m === modulation ? "border-primary bg-primary text-primary-fg" : "border-border text-muted hover:text-fg"),
					children: m
				}, m))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-widest text-muted",
					children: "Demo library · sandbox keys"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-1.5",
					children: [DEMO_REMOTES.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							useKit.setState({
								selectedRemote: i,
								mhz: r.mhz,
								modulation: r.modulation
							});
							useKit.getState().transmitRemote(r.id);
						},
						className: cn("h-8 rounded-[var(--radius-xs)] border border-border px-2 text-xs text-muted hover:text-fg", i === remote && "border-primary text-primary"),
						children: r.name
					}, r.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => press("ok"),
						children: hopping ? "Hold hop" : "Analyzer hop"
					})]
				})]
			})
		]
	});
}
function RfidBench() {
	const tags = useKit((s) => s.rfid);
	const sel = useKit((s) => s.selectedRfid);
	const emulate = useKit((s) => s.emulateRfid);
	const add = useKit((s) => s.addRfidTag);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "LF coil is a 1250 Hz square wave (125 kHz ÷ 100). Tags below are sandbox IDs."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-1",
				children: tags.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => useKit.setState({ selectedRfid: i }),
					className: cn("flex w-full items-center justify-between rounded-[var(--radius-sm)] border px-3 py-2 text-left text-sm", i === sel ? "border-primary bg-elevated" : "border-border"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						t.name,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-faint",
							children: t.kind
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs text-primary",
						children: t.uid
					})]
				}) }, t.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					onClick: () => void emulate(),
					children: "Emulate coil"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					onClick: add,
					children: "Random EM4100"
				})]
			})
		]
	});
}
function NfcBench() {
	const cards = useKit((s) => s.nfc);
	const sel = useKit((s) => s.selectedNfc);
	const draft = useKit((s) => s.ndefDraft);
	const setDraft = useKit((s) => s.setNdefDraft);
	const save = useKit((s) => s.saveNdef);
	const emulate = useKit((s) => s.emulateNfc);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5",
				children: cards.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => useKit.setState({
						selectedNfc: i,
						ndefDraft: c.ndef
					}),
					className: cn("h-8 rounded-[var(--radius-xs)] border px-2 text-xs", i === sel ? "border-primary text-primary" : "border-border text-muted"),
					children: c.name
				}, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs text-faint",
				children: cards[sel]?.uid
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: draft,
				onChange: (e) => setDraft(e.target.value),
				rows: 3,
				className: "w-full rounded-[var(--radius-sm)] border border-border bg-elevated px-3 py-2 font-mono text-sm text-fg",
				"aria-label": "NDEF payload"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					onClick: () => void emulate(),
					children: "Field 13.56"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					onClick: save,
					children: "Write NDEF"
				})]
			})
		]
	});
}
function IrBench() {
	const cmds = useKit((s) => s.ir);
	const sel = useKit((s) => s.selectedIr);
	const tx = useKit((s) => s.transmitIr);
	const learn = useKit((s) => s.learnIr);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "NEC bursts play as 3.8 kHz chirps (38 kHz IR carrier ÷ 10)."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-1.5 sm:grid-cols-3",
				children: cmds.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						useKit.setState({ selectedIr: i });
						tx(c.id);
					},
					className: cn("h-11 rounded-[var(--radius-sm)] border border-border px-2 text-left text-xs hover:bg-elevated", i === sel && "border-primary"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-faint",
						children: c.device
					}), c.button]
				}, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "outline",
				onClick: () => void learn(),
				children: "Learn demo code"
			})
		]
	});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-1.5",
				children: pins.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => toggle(p.n),
					onContextMenu: (e) => {
						e.preventDefault();
						cycle(p.n);
					},
					className: cn("rounded-[var(--radius-sm)] border px-2 py-2 text-left font-mono text-[11px]", p.value ? "border-primary bg-primary/15 text-primary" : "border-border text-muted"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-fg",
							children: p.name
						}),
						p.mode,
						" ",
						p.value ? "HI" : "LO"
					]
				}, p.n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-widest text-muted",
						children: "USB-UART"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: toggleNmea,
						children: nmea ? "NMEA on" : "NMEA"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mb-2 max-h-32 overflow-auto rounded-[var(--radius-sm)] bg-lcd p-2 font-mono text-[11px] text-lcd-pixel",
					children: uart.join("\n")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex gap-2",
					onSubmit: (e) => {
						e.preventDefault();
						submit();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: input,
						onChange: (e) => setInput(e.target.value),
						placeholder: "AT",
						className: "h-10 min-w-0 flex-1 rounded-[var(--radius-sm)] border border-border bg-elevated px-3 font-mono text-sm",
						"aria-label": "UART command"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "sm",
						children: "Send"
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-faint",
				children: ["I2C ACK ", I2C_MAP.map((d) => d.addr).join("  ")]
			})
		]
	});
}
function IbuttonBench() {
	const keys = useKit((s) => s.ibutton);
	const sel = useKit((s) => s.selectedIbutton);
	const emulate = useKit((s) => s.emulateIbutton);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2",
		children: [keys.map((k, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => useKit.setState({ selectedIbutton: i }),
			className: cn("rounded-[var(--radius-sm)] border px-3 py-2 text-left font-mono text-xs", i === sel ? "border-primary" : "border-border"),
			children: [
				k.name,
				" · ",
				k.rom
			]
		}, k.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			onClick: () => void emulate(),
			children: "Drive 1-Wire"
		})]
	});
}
function HidBench() {
	const script = useKit((s) => s.script);
	const setScript = useKit((s) => s.setScript);
	const run = useKit((s) => s.runHid);
	const out = useKit((s) => s.hidOutput);
	const running = useKit((s) => s.hidRunning);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Duckyscript runs against a fake host. Nothing is typed into your machine."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: script,
				onChange: (e) => setScript(e.target.value),
				rows: 7,
				className: "w-full rounded-[var(--radius-sm)] border border-border bg-elevated px-3 py-2 font-mono text-xs",
				"aria-label": "HID script"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				onClick: () => void run(),
				disabled: running,
				children: running ? "Injecting…" : "Run sandbox"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "min-h-20 whitespace-pre-wrap rounded-[var(--radius-sm)] bg-lcd p-3 font-mono text-xs text-lcd-pixel",
				children: out || "target desktop waiting"
			})
		]
	});
}
function BleBench() {
	const ble = useKit((s) => s.ble);
	const scanning = useKit((s) => s.bleScanning);
	const scan = useKit((s) => s.scanBle);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			onClick: scan,
			disabled: scanning,
			children: scanning ? "Scanning…" : "LE scan"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-1",
			children: ble.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-[var(--radius-sm)] border border-border px-3 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: d.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono tabular-nums text-faint",
							children: [d.rssi, " dBm"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] text-muted",
						children: d.addr
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] text-faint",
						children: d.adv
					})
				]
			}, d.id))
		})]
	});
}
function U2fBench() {
	const armed = useKit((s) => s.u2fArmed);
	const last = useKit((s) => s.u2fLast);
	const confirm = useKit((s) => s.confirmU2f);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Presence-only demo. No real FIDO credential is stored."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: confirm,
				children: armed ? "Touch to assert" : "Request presence"
			}),
			last ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs text-ok",
				children: last
			}) : null
		]
	});
}
function AppsBench() {
	const screen = useKit((s) => currentScreen(s));
	const snake = useKit((s) => s.snake);
	const music = useKit((s) => s.music);
	const toggleTracker = useKit((s) => s.toggleTracker);
	const lab = useKit((s) => s.soundlab);
	const setLab = useKit((s) => s.setSoundlab);
	const toggleLab = useKit((s) => s.toggleSoundlab);
	if (screen === "apps-snake") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-sm text-muted",
		children: [
			"Score ",
			snake.score,
			". D-pad steers. Wrap-around field."
		]
	});
	if (screen === "apps-music") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-sm text-primary",
			children: music.pattern.join(" ")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			onClick: toggleTracker,
			children: music.playing ? "Stop" : "Play"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-1 text-xs text-muted",
				children: [
					"Oscillator ",
					formatHz(lab.oscA),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 80,
						max: 8e3,
						value: lab.oscA,
						onChange: (e) => setLab({ oscA: Number(e.target.value) }),
						className: "accent-[var(--color-signal)]"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1.5",
				children: [
					"square",
					"sine",
					"sawtooth",
					"triangle"
				].map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setLab({ wave: w }),
					className: cn("h-8 rounded-[var(--radius-xs)] border px-2 text-xs", lab.wave === w ? "border-primary text-primary" : "border-border text-muted"),
					children: w
				}, w))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				onClick: () => void toggleLab(),
				children: lab.running ? "Stop osc" : "Start osc"
			})
		]
	});
}
function SettingsBench() {
	const settings = useKit((s) => s.settings);
	const setSetting = useKit((s) => s.setSetting);
	const captures = useKit((s) => s.captures);
	const txCap = useKit((s) => s.transmitCapture);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3 text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				label: "Virtual ISM air",
				on: settings.ambientAir,
				onClick: () => setSetting("ambientAir", !settings.ambientAir)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				label: "Play ambient through speaker",
				on: settings.ambientAudio,
				onClick: () => setSetting("ambientAudio", !settings.ambientAudio)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				label: "Verbose tune logs",
				on: settings.verbose,
				onClick: () => setSetting("verbose", !settings.verbose)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				label: "Show acoustic Hz on LCD",
				on: settings.showAudioHz,
				onClick: () => setSetting("showAudioHz", !settings.showAudioHz)
			}),
			captures.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-widest text-muted",
					children: "Archive"
				}), captures.slice(0, 8).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => void txCap(c.id),
					className: "flex justify-between rounded-[var(--radius-sm)] border border-border px-3 py-2 text-left text-xs hover:bg-elevated",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-faint",
						children: groupHex(c.hex)
					})]
				}, c.id))]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "Archive is empty. Decode a signal, then Save."
			})
		]
	});
}
function Toggle({ label, on, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex h-11 items-center justify-between rounded-[var(--radius-sm)] border border-border px-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("font-mono text-xs", on ? "text-ok" : "text-faint"),
			children: on ? "ON" : "off"
		})]
	});
}
var KEYMAP = {
	ArrowUp: "up",
	ArrowDown: "down",
	ArrowLeft: "left",
	ArrowRight: "right",
	Enter: "ok",
	" ": "ok",
	Backspace: "back",
	Escape: "back"
};
function Home() {
	const press = useKit((s) => s.press);
	const boot = useKit((s) => s.boot);
	const booted = useKit((s) => s.booted);
	const hydrate = useKit((s) => s.hydrate);
	const tick = useKit((s) => s.tick);
	const micOn = useKit((s) => s.micOn);
	const toggleMic = useKit((s) => s.toggleMic);
	const tx = useKit((s) => s.txActive);
	const screen = useKit((s) => currentScreen(s));
	const [labTab, setLabTab] = (0, import_react.useState)("lab");
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		let last = performance.now();
		let raf = 0;
		const loop = (t) => {
			tick((t - last) / 1e3);
			last = t;
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [tick]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const target = e.target;
			if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
				if (e.key === "Escape") target.blur();
				return;
			}
			const key = KEYMAP[e.key];
			if (!key) return;
			e.preventDefault();
			press(key);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [press]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] uppercase tracking-[0.22em] text-signal",
				children: "Audio field kit"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-medium tracking-tight",
				children: "WavZero"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden font-mono text-[11px] text-faint sm:inline",
						children: "arrows · enter · esc"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => void toggleMic(),
						children: [micOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "size-4" }), micOn ? "Mic live" : "Tap mic"]
					}),
					!booted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "signal",
						onClick: () => void boot(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" }), "Boot kit"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("font-mono text-xs", tx ? "text-tx" : "text-ok"),
						children: tx ? "TRANSMIT" : screen
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-[1240px] gap-5 px-4 py-5 lg:grid-cols-[minmax(280px,400px)_1fr] lg:py-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeviceShell, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-1 text-xs leading-relaxed text-muted",
					children: "Sub-GHz, RFID, NFC and IR are scaled into sound — speakers transmit, the analyser listens, demo keys never leave this sandbox."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spectrum, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(220px,0.8fr)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "rounded-[var(--radius-lg)] border border-border bg-surface p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xs font-medium tracking-wide text-muted",
									children: "Lab"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex rounded-[var(--radius-xs)] bg-elevated p-0.5 lg:hidden",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: cn("h-8 rounded-[3px] px-3 text-xs", labTab === "lab" ? "bg-primary text-primary-fg" : "text-muted"),
										onClick: () => setLabTab("lab"),
										children: "Controls"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: cn("h-8 rounded-[3px] px-3 text-xs", labTab === "log" ? "bg-primary text-primary-fg" : "text-muted"),
										onClick: () => setLabTab("log"),
										children: "Log"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn(labTab === "lab" ? "block" : "hidden lg:block"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workbench, {})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inspector, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("min-h-[220px] flex-1", labTab === "log" ? "block" : "hidden lg:flex"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogConsole, {})
					})
				]
			})]
		})]
	});
}
//#endregion
export { Home as component };
