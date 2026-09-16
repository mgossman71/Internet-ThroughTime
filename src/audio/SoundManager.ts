/**
 * SoundManager — all audio is synthesized with the Web Audio API.
 *
 * POLICY (spec §5):
 * - No audio files, no copyrighted recordings — every sound is generated.
 * - Never autoplays: the AudioContext is only created/resumed in response
 *   to an explicit user gesture (sound toggle, button press).
 * - Mute preference persists in localStorage.
 */

type Listener = () => void;

const STORAGE_KEY = 'itt.sound.muted';

interface ToneOpts {
  freq: number;
  duration: number; // seconds
  start?: number; // seconds from now
  type?: OscillatorType;
  gain?: number;
  sweepTo?: number;
}

interface NoiseOpts {
  duration: number;
  start?: number;
  gain?: number;
  filterFreq?: number;
  q?: number;
}

function readMutedPref(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return true; // default: sound OFF (safe)
  }
}

export class SoundManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private muted = readMutedPref();
  private listeners = new Set<Listener>();

  // ---- preference plumbing -------------------------------------------

  subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  get isMuted(): boolean {
    return this.muted;
  }

  setMuted(muted: boolean): void {
    if (muted === this.muted) return;
    this.muted = muted;
    try {
      localStorage.setItem(STORAGE_KEY, muted ? '1' : '0');
    } catch {
      /* non-fatal */
    }
    this.listeners.forEach((l) => l());
  }

  // ---- context lifecycle ---------------------------------------------

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      this.ctx = new Ctor();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.85;
      this.masterGain.connect(this.ctx.destination);

      // Pre-compute 1 second of white noise for click/clack sounds.
      const length = this.ctx.sampleRate;
      const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
      this.noiseBuffer = buffer;
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume();
    return this.ctx;
  }

  // ---- primitives (public so effects can compose them) ----------------

  tone(opts: ToneOpts): void {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;
    const t0 = ctx.currentTime + (opts.start ?? 0);
    const t1 = t0 + opts.duration;

    const osc = ctx.createOscillator();
    osc.type = opts.type ?? 'sine';
    osc.frequency.setValueAtTime(opts.freq, t0);
    if (opts.sweepTo) osc.frequency.exponentialRampToValueAtTime(opts.sweepTo, t1);

    const gain = ctx.createGain();
    const peak = opts.gain ?? 0.06;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(peak, t0 + 0.012);
    gain.gain.setValueAtTime(peak, Math.max(t0 + 0.012, t1 - 0.02));
    gain.gain.exponentialRampToValueAtTime(0.0001, t1);

    osc.connect(gain).connect(this.masterGain);
    osc.start(t0);
    osc.stop(t1 + 0.02);
  }

  noise(opts: NoiseOpts): void {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain || !this.noiseBuffer) return;
    const t0 = ctx.currentTime + (opts.start ?? 0);
    const t1 = t0 + opts.duration;

    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = opts.filterFreq ?? 2400;
    filter.Q.value = opts.q ?? 1.2;
    const gain = ctx.createGain();
    const peak = opts.gain ?? 0.12;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(peak, t0 + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, t1);

    src.connect(filter).connect(gain).connect(this.masterGain);
    src.start(t0);
    src.stop(t1 + 0.01);
  }

  // ---- named effects (era-appropriate, all synthesized) ---------------

  /** Short typewriter-style key click. */
  keyClick(): void {
    this.noise({ duration: 0.03, gain: 0.14, filterFreq: 2600, q: 2 });
    this.tone({ freq: 140, duration: 0.03, gain: 0.05, type: 'triangle' });
  }

  /** Relay / switch clack — two quick mechanical taps. */
  relayClick(): void {
    this.noise({ duration: 0.025, gain: 0.16, filterFreq: 1500 });
    this.noise({ duration: 0.02, gain: 0.1, filterFreq: 2100, start: 0.055 });
    this.tone({ freq: 90, duration: 0.05, gain: 0.06, start: 0.05 });
  }

  /** UI tick for buttons. */
  uiTick(): void {
    this.tone({ freq: 880, duration: 0.04, gain: 0.04, type: 'square' });
  }

  /** Soft success chime (e.g. connection established). */
  successChime(): void {
    this.tone({ freq: 660, duration: 0.09, gain: 0.05 });
    this.tone({ freq: 880, duration: 0.12, gain: 0.05, start: 0.09 });
    this.tone({ freq: 1320, duration: 0.18, gain: 0.04, start: 0.18 });
  }

  /** Error buzzer. */
  errorBuzz(): void {
    this.tone({ freq: 160, duration: 0.18, gain: 0.07, type: 'sawtooth' });
  }

  /** Modem dialing: a short sequence of generic tone pairs. */
  modemDial(): void {
    const pairs: Array<[number, number]> = [
      [700, 900],
      [700, 1200],
      [700, 1400],
      [900, 1200],
      [1200, 1400],
    ];
    pairs.forEach(([a, b], i) => {
      const start = i * 0.11;
      this.tone({ freq: a, duration: 0.09, gain: 0.05, type: 'sine', start });
      this.tone({ freq: b, duration: 0.09, gain: 0.05, type: 'sine', start });
    });
  }

  /** Modem handshake: negotiation tones, then a carrier with subtle flutter. */
  modemHandshake(): void {
    const sequence = [1650, 2100, 1700, 1300, 980, 2200];
    sequence.forEach((freq, i) => {
      this.tone({
        freq,
        duration: 0.08,
        gain: 0.045,
        type: 'sine',
        start: 0.6 + i * 0.09,
      });
    });
    const carrierStart = 0.6 + sequence.length * 0.09 + 0.05;
    // Carrier: 1200 Hz with a light ring-modulation feel (two close sines).
    this.tone({ freq: 1200, duration: 1.4, gain: 0.035, start: carrierStart });
    for (let i = 0; i < 14; i++) {
      this.tone({
        freq: 1235,
        duration: 0.045,
        gain: 0.02,
        start: carrierStart + i * 0.095,
      });
    }
  }

  /** Ambient lab hum — a very low, quiet drone. Call sparingly. */
  labHum(): void {
    this.tone({ freq: 55, duration: 1.2, gain: 0.02, type: 'sine' });
    this.tone({ freq: 110, duration: 1.2, gain: 0.008, type: 'sine' });
  }
}

/** Singleton — import this everywhere. */
export const sound = new SoundManager();
