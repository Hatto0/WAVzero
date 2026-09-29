import type { Modulation, Pulse } from "./types";

export type SpectrumFrame = {
  bins: Float32Array;
  time: Uint8Array;
  peakHz: number;
  peakDb: number;
  rms: number;
};

type Engine = {
  ctx: AudioContext;
  master: GainNode;
  analyser: AnalyserNode;
  airGain: GainNode;
  monitor: GainNode;
  freqData: Float32Array;
  timeData: Uint8Array;
  labOsc: OscillatorNode | null;
  labGain: GainNode | null;
};

let engine: Engine | null = null;
let micStream: MediaStream | null = null;
let micSource: MediaStreamAudioSourceNode | null = null;

export function audioSupported() {
  return typeof window !== "undefined" && typeof AudioContext !== "undefined";
}

export async function resumeEngine() {
  if (!audioSupported()) return null;
  if (!engine) {
    const ctx = new AudioContext();
    const master = ctx.createGain();
    master.gain.value = 0.22;
    const monitor = ctx.createGain();
    monitor.gain.value = 1;
    const airGain = ctx.createGain();
    airGain.gain.value = 0.18;
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.72;
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
      labGain: null,
    };
  }
  if (engine.ctx.state === "suspended") await engine.ctx.resume();
  return engine;
}

export function getEngine() {
  return engine;
}

export function setMasterGain(v: number) {
  if (engine) engine.master.gain.value = v;
}

export function setMonitorGain(v: number) {
  if (engine) engine.monitor.gain.value = v;
}

export async function attachMic() {
  const e = await resumeEngine();
  if (!e) throw new Error("Audio unavailable");
  if (micStream) return true;
  micStream = await navigator.mediaDevices.getUserMedia({
    audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
  });
  micSource = e.ctx.createMediaStreamSource(micStream);
  const gain = e.ctx.createGain();
  gain.gain.value = 1.4;
  micSource.connect(gain);
  gain.connect(e.analyser);
  return true;
}

export function detachMic() {
  micSource?.disconnect();
  micSource = null;
  micStream?.getTracks().forEach((t) => t.stop());
  micStream = null;
}

export function readSpectrum(): SpectrumFrame | null {
  if (!engine) return null;
  const { analyser, freqData, timeData, ctx } = engine;
  analyser.getFloatFrequencyData(freqData as unknown as Float32Array<ArrayBuffer>);
  analyser.getByteTimeDomainData(timeData as unknown as Uint8Array<ArrayBuffer>);
  let peakDb = -Infinity;
  let peakIdx = 0;
  for (let i = 2; i < freqData.length; i++) {
    if (freqData[i] > peakDb) {
      peakDb = freqData[i];
      peakIdx = i;
    }
  }
  const peakHz = (peakIdx * ctx.sampleRate) / analyser.fftSize;
  let sum = 0;
  for (let i = 0; i < timeData.length; i++) {
    const v = (timeData[i] - 128) / 128;
    sum += v * v;
  }
  const rms = Math.sqrt(sum / timeData.length);
  return { bins: freqData, time: timeData, peakHz, peakDb, rms };
}

function envelopeGain(ctx: AudioContext, pulses: Pulse[], start: number, peak: number) {
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, start);
  let t = start;
  for (const p of pulses) {
    g.gain.setValueAtTime(peak, t);
    t += Math.max(p.high, 0.00004);
    g.gain.setValueAtTime(0, t);
    t += Math.max(p.low, 0.00004);
  }
  return { gain: g, end: t };
}

export async function transmitTone(opts: {
  hz: number;
  pulses: Pulse[];
  modulation: Modulation;
  repeats?: number;
  gain?: number;
}) {
  const e = await resumeEngine();
  if (!e) return 0;
  const { ctx, master, airGain } = e;
  const repeats = opts.repeats ?? 4;
  const peak = opts.gain ?? 0.55;
  const fsk = opts.modulation === "FSK" || opts.modulation === "FM238" || opts.modulation === "FM476";
  const start = ctx.currentTime + 0.02;
  let t = start;
  const stopAt: OscillatorNode[] = [];

  for (let r = 0; r < repeats; r++) {
    if (fsk) {
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
        if (useA) {
          oscA.frequency.setValueAtTime(opts.hz, local);
        } else {
          oscB.frequency.setValueAtTime(opts.hz * 1.08, local);
        }
        local += dur;
        useA = !useA;
      }
      mix.gain.setValueAtTime(0, local);
      oscA.start(t);
      oscB.start(t);
      oscA.stop(local + 0.02);
      oscB.stop(local + 0.02);
      stopAt.push(oscA, oscB);
      t = local + 0.012;
    } else {
      const osc = ctx.createOscillator();
      osc.type = opts.modulation === "PWM" ? "sawtooth" : "square";
      osc.frequency.value = opts.hz;
      const { gain, end } = envelopeGain(ctx, opts.pulses, t, peak);
      osc.connect(gain);
      gain.connect(master);
      gain.connect(airGain);
      osc.start(t);
      osc.stop(end + 0.02);
      stopAt.push(osc);
      t = end + 0.01;
    }
  }
  return t - ctx.currentTime;
}

export async function playCarrier(hz: number, seconds: number, type: OscillatorType = "square") {
  const e = await resumeEngine();
  if (!e) return;
  const osc = e.ctx.createOscillator();
  const g = e.ctx.createGain();
  osc.type = type;
  osc.frequency.value = hz;
  g.gain.value = 0.2;
  osc.connect(g);
  g.connect(e.master);
  osc.start();
  osc.stop(e.ctx.currentTime + seconds);
}

export async function startLabOsc(hz: number, type: OscillatorType, mix: number) {
  const e = await resumeEngine();
  if (!e) return;
  stopLabOsc();
  const osc = e.ctx.createOscillator();
  const g = e.ctx.createGain();
  osc.type = type;
  osc.frequency.value = hz;
  g.gain.value = 0.08 + mix * 0.28;
  osc.connect(g);
  g.connect(e.master);
  osc.start();
  e.labOsc = osc;
  e.labGain = g;
}

export function updateLabOsc(hz: number, type: OscillatorType, mix: number) {
  if (!engine?.labOsc || !engine.labGain) return;
  engine.labOsc.frequency.value = hz;
  engine.labOsc.type = type;
  engine.labGain.gain.value = 0.08 + mix * 0.28;
}

export function stopLabOsc() {
  try {
    engine?.labOsc?.stop();
  } catch {
    /* already stopped */
  }
  engine?.labOsc?.disconnect();
  engine?.labGain?.disconnect();
  if (engine) {
    engine.labOsc = null;
    engine.labGain = null;
  }
}

export async function playTrackerNote(hz: number, dur = 0.12) {
  const e = await resumeEngine();
  if (!e) return;
  const osc = e.ctx.createOscillator();
  const g = e.ctx.createGain();
  osc.type = "square";
  osc.frequency.value = hz;
  const t = e.ctx.currentTime;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.22, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g);
  g.connect(e.master);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

export const TRACKER_SCALE = [196, 220, 261.63, 293.66, 329.63, 392, 440, 523.25];
