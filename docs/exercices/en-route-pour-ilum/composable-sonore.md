# Chapitre 5 : Composable - Synthèse sonore

Nous allons synthetiser tous les sons du sabre en temps reel avec la **Web Audio API**, sans aucun fichier audio. Creez le fichier `src/composables/useLightsaberSound.ts`.

## 5.1 Le contexte audio

```ts
// Variable globale au module : un seul AudioContext pour toute l'app
let ctx: AudioContext | null = null;

/**
 * Recupere ou cree le contexte audio.
 * Les navigateurs mobiles suspendent l'AudioContext tant qu'il n'y a pas eu
 * d'interaction utilisateur (tap). On le resume si necessaire.
 */
function getCtx(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext();
  }
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  return ctx;
}
```

L'`AudioContext` est le point d'entree de la Web Audio API. On le cree de maniere **lazy** (au premier appel) car les navigateurs bloquent la creation audio avant une interaction utilisateur.

## 5.2 Generateur de bruit blanc

```ts
/**
 * Cree un buffer rempli de bruit blanc (valeurs aleatoires entre -1 et 1).
 * Le bruit blanc est utilise pour ajouter du "grain" aux sons du sabre.
 */
function createNoiseBuffer(ac: AudioContext, duration: number): AudioBuffer {
  const length = ac.sampleRate * duration;
  const buf = ac.createBuffer(1, length, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buf;
}
```

Le bruit blanc est un signal aleatoire qui contient toutes les frequences. Filtre avec un `BiquadFilter`, il permet de creer des effets de souffle et de texture.

## 5.3 Le hum (bourdonnement continu)

```ts
// Reference aux noeuds audio du hum (pour pouvoir les arreter plus tard)
let humNodes: {
  osc1: OscillatorNode;
  osc2: OscillatorNode;
  lfo: OscillatorNode;
  gain: GainNode;
} | null = null;

/**
 * Demarre le bourdonnement continu du sabre.
 *
 * Architecture audio :
 *   osc1 (sawtooth 82Hz) ──┐
 *                           ├──> filtre passe-bas 300Hz ──> gain ──> sortie
 *   osc2 (sawtooth 164Hz) ─┘          ↑
 *                              lfo (3Hz) ──> modulation de frequence
 *
 * Les deux oscillateurs en dents de scie a des frequences fondamentale (82Hz)
 * et octave (164Hz) creent un son riche en harmoniques. Le filtre passe-bas
 * adoucit le son. Le LFO (Low Frequency Oscillator) module la frequence du
 * filtre pour creer une legere ondulation, typique du hum de sabre laser.
 */
function startHum() {
  const ac = getCtx();
  const now = ac.currentTime;

  // Oscillateur fondamental a 82Hz (~ Mi grave)
  const osc1 = ac.createOscillator();
  osc1.type = 'sawtooth';
  osc1.frequency.value = 82;

  // Oscillateur octave a 164Hz pour enrichir le son
  const osc2 = ac.createOscillator();
  osc2.type = 'sawtooth';
  osc2.frequency.value = 164;

  // Filtre passe-bas : ne laisse passer que les frequences < 300Hz
  const filter = ac.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 300;
  filter.Q.value = 2;

  // LFO : oscillateur tres lent (3Hz) qui fait "vibrer" le filtre
  const lfo = ac.createOscillator();
  lfo.frequency.value = 3;
  const lfoGain = ac.createGain();
  lfoGain.gain.value = 20; // Amplitude de la modulation en Hz
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);

  // Gain de sortie avec rampe progressive pour eviter un "clic" a l'allumage
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.3, now + 0.4);

  // Connexion de la chaine audio
  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(ac.destination);

  // Demarrage de tous les oscillateurs
  osc1.start(now);
  osc2.start(now);
  lfo.start(now);

  // On garde une reference pour pouvoir les arreter
  humNodes = { osc1, osc2, lfo, gain };
}

/**
 * Arrete le bourdonnement avec un fade-out progressif de 0.6s.
 */
function stopHum() {
  if (!humNodes || !ctx) return;
  const now = ctx.currentTime;
  // Fade-out progressif pour eviter un "clic" a l'extinction
  humNodes.gain.gain.linearRampToValueAtTime(0, now + 0.6);
  const nodes = humNodes;
  humNodes = null;
  // On attend la fin du fade-out avant d'arreter les oscillateurs
  setTimeout(() => {
    nodes.osc1.stop();
    nodes.osc2.stop();
    nodes.lfo.stop();
  }, 700);
}
```

## 5.4 Le son d'allumage (ignite)

```ts
/**
 * Joue le son d'allumage : "VWOOM" grave et lourd.
 * Duree : ~0.9 secondes.
 *
 * Architecture audio :
 *   sub   (sine 30Hz)      ──> subGain    ──┐
 *   osc1  (sawtooth 40Hz)  ──┐              │
 *                             ├──> lowpass ──├──> sortie
 *   osc2  (sawtooth 80Hz)  ──┘              │
 *   noise (bandpass 300Hz)  ──> noiseGain ──┘
 *
 * Le sweep reste dans les basses (40->180Hz) et un oscillateur sinusoidal
 * a 30Hz ajoute une sous-basse qui donne l'impact physique du "VWOOM".
 */
function playIgnite() {
    const ac = getCtx();
    const now = ac.currentTime;
    const dur = 0.9;

    // --- Sous-basse sinusoidale : impact grave a l'allumage ---
    const sub = ac.createOscillator();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(30, now);
    sub.frequency.exponentialRampToValueAtTime(55, now + dur);
    const subGain = ac.createGain();
    subGain.gain.setValueAtTime(0.5, now);
    subGain.gain.linearRampToValueAtTime(0, now + dur);
    sub.connect(subGain);
    subGain.connect(ac.destination);

    // --- Sweep montant grave : 40Hz -> 180Hz ---
    const osc1 = ac.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(40, now);
    osc1.frequency.exponentialRampToValueAtTime(180, now + 0.6);

    // --- Oscillateur octave pour epaissir : 80Hz -> 360Hz ---
    const osc2 = ac.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(80, now);
    osc2.frequency.exponentialRampToValueAtTime(360, now + 0.6);

    // --- Filtre passe-bas : garde le son sombre ---
    const filter = ac.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, now);
    filter.frequency.exponentialRampToValueAtTime(500, now + 0.5);
    filter.Q.value = 1;

    const oscGain = ac.createGain();
    oscGain.gain.setValueAtTime(0.45, now);
    oscGain.gain.linearRampToValueAtTime(0, now + dur);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(oscGain);
    oscGain.connect(ac.destination);

    // --- Bruit grave filtre pour le grondement de l'allumage ---
    const noiseBuf = createNoiseBuffer(ac, dur);
    const noise = ac.createBufferSource();
    noise.buffer = noiseBuf;
    const noiseFilt = ac.createBiquadFilter();
    noiseFilt.type = 'bandpass';
    noiseFilt.frequency.value = 300;
    noiseFilt.Q.value = 0.8;
    const noiseGain = ac.createGain();
    noiseGain.gain.setValueAtTime(0.25, now);
    noiseGain.gain.linearRampToValueAtTime(0, now + dur);
    noise.connect(noiseFilt);
    noiseFilt.connect(noiseGain);
    noiseGain.connect(ac.destination);

    // Demarrage et arret automatique
    sub.start(now);
    sub.stop(now + dur);
    osc1.start(now);
    osc1.stop(now + dur);
    osc2.start(now);
    osc2.stop(now + dur);
    noise.start(now);
    noise.stop(now + dur);
}
```

## 5.5 Le son d'extinction (retract)

```ts
/**
 * Joue le son d'extinction : "VWOOM" descendant, lourd et resonant.
 * Duree : ~1.0 secondes.
 *
 * Architecture audio :
 *   sub   (sine 50Hz)       ──> subGain    ──┐
 *   osc1  (sawtooth 180Hz)  ──┐              │
 *                              ├──> lowpass ──├──> sortie
 *   osc2  (sawtooth 360Hz)  ──┘              │
 *   noise (bandpass 250Hz)   ──> noiseGain ──┘
 *
 * Miroir de l'allumage : le sweep descend de 180Hz vers les sous-basses (20Hz),
 * et le son s'eteint comme une machine qui se coupe.
 */
function playRetract() {
    const ac = getCtx();
    const now = ac.currentTime;
    const dur = 1.0;

    // --- Sous-basse : descend et s'eteint ---
    const sub = ac.createOscillator();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(50, now);
    sub.frequency.exponentialRampToValueAtTime(20, now + dur);
    const subGain = ac.createGain();
    subGain.gain.setValueAtTime(0.45, now);
    subGain.gain.exponentialRampToValueAtTime(0.01, now + dur);
    sub.connect(subGain);
    subGain.connect(ac.destination);

    // --- Sweep descendant grave : 180Hz -> 20Hz ---
    const osc1 = ac.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(180, now);
    osc1.frequency.exponentialRampToValueAtTime(20, now + 0.8);

    // --- Oscillateur octave : 360Hz -> 40Hz ---
    const osc2 = ac.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(360, now);
    osc2.frequency.exponentialRampToValueAtTime(40, now + 0.8);

    // --- Filtre passe-bas descendant : le son s'assombrit en s'eteignant ---
    const filter = ac.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, now);
    filter.frequency.exponentialRampToValueAtTime(80, now + dur);
    filter.Q.value = 1.5;

    const oscGain = ac.createGain();
    oscGain.gain.setValueAtTime(0.4, now);
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + dur);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(oscGain);
    oscGain.connect(ac.destination);

    // --- Bruit grave pour le grondement de l'extinction ---
    const noiseBuf = createNoiseBuffer(ac, dur);
    const noise = ac.createBufferSource();
    noise.buffer = noiseBuf;
    const noiseFilt = ac.createBiquadFilter();
    noiseFilt.type = 'bandpass';
    noiseFilt.frequency.value = 250;
    noiseFilt.Q.value = 0.8;
    const noiseGain = ac.createGain();
    noiseGain.gain.setValueAtTime(0.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + dur);
    noise.connect(noiseFilt);
    noiseFilt.connect(noiseGain);
    noiseGain.connect(ac.destination);

    // Demarrage et arret automatique
    sub.start(now);
    sub.stop(now + dur);
    osc1.start(now);
    osc1.stop(now + dur);
    osc2.start(now);
    osc2.stop(now + dur);
    noise.start(now);
    noise.stop(now + dur);
}
```

## 5.6 Le son de swing (mouvement)

```ts
/**
 * Joue le son de swing : effet Doppler realiste avec deux oscillateurs
 * harmoniques, un filtre dynamique et deux couches de bruit.
 *
 * @param intensity - Force du mouvement (0 = leger, 1 = fort).
 *                    Influence le volume, la hauteur du sweep et la duree.
 *
 * Architecture audio :
 *   sub  (sine ~32Hz)       ──> subGain   ──> sortie
 *   osc1 (sawtooth ~75Hz)   ──┐
 *                              ├──> filtre passe-bas dynamique ──> gain ──> sortie
 *   osc2 (sawtooth ~150Hz)  ──┘
 *   noiseLow  (bandpass 200Hz)  ──> noiseGain ──> sortie
 *   noiseHigh (bandpass 500Hz)  ──> noiseGain ──> sortie
 *
 * Trois couches : sous-basse sinusoidale pour le poids, deux oscillateurs
 * en dents de scie pour les harmoniques, et deux couches de bruit.
 * Le sweep Doppler en V reste dans les graves (~65-250Hz) pour un son
 * lourd et profond, typique du sabre laser Star Wars.
 */
function playSwing(intensity = 0.5) {
    const ac = getCtx();
    const now = ac.currentTime;

    // --- Parametres adaptatifs selon l'intensite ---
    // Un geste leger donne un swing doux et court, un geste fort un swing puissant
    const volume = 0.25 + intensity * 0.25;       // 0.25 .. 0.50
    const duration = 0.7 + intensity * 0.4;       // 0.70s .. 1.10s
    const peakTime = duration * 0.35;             // Le pic Doppler arrive au 1er tiers
    const baseFreq = 65 + intensity * 25;         // 65  .. 90  Hz (grave)
    const peakFreq = 150 + intensity * 100;       // 150 .. 250 Hz (reste dans les basses-mediums)
    const endFreq = 50 + intensity * 15;          // 50  .. 65  Hz (retour sub-basse)

    // --- Sous-basse sinusoidale : donne du poids au swing ---
    const sub = ac.createOscillator();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(baseFreq * 0.5, now);
    sub.frequency.exponentialRampToValueAtTime(peakFreq * 0.5, now + peakTime);
    sub.frequency.exponentialRampToValueAtTime(endFreq * 0.5, now + duration);
    const subGain = ac.createGain();
    subGain.gain.setValueAtTime(0, now);
    subGain.gain.linearRampToValueAtTime(volume * 0.7, now + 0.06);
    subGain.gain.setValueAtTime(volume * 0.7, now + peakTime);
    subGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
    sub.connect(subGain);
    subGain.connect(ac.destination);

    // --- Oscillateur fondamental (sweep Doppler en V) ---
    const osc1 = ac.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(baseFreq, now);
    osc1.frequency.exponentialRampToValueAtTime(peakFreq, now + peakTime);
    osc1.frequency.exponentialRampToValueAtTime(endFreq, now + duration);

    // --- Oscillateur octave (meme sweep, une octave plus haut) ---
    const osc2 = ac.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(baseFreq * 2, now);
    osc2.frequency.exponentialRampToValueAtTime(peakFreq * 2, now + peakTime);
    osc2.frequency.exponentialRampToValueAtTime(endFreq * 2, now + duration);

    // --- Filtre passe-bas dynamique : suit le sweep, garde le son sombre ---
    const filter = ac.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = 2;
    filter.frequency.setValueAtTime(250, now);
    filter.frequency.exponentialRampToValueAtTime(600, now + peakTime);
    filter.frequency.exponentialRampToValueAtTime(180, now + duration);

    // --- Enveloppe de gain : attaque rapide, sustain, puis fade-out graduel ---
    const oscGain = ac.createGain();
    oscGain.gain.setValueAtTime(0, now);
    oscGain.gain.linearRampToValueAtTime(volume, now + 0.06);          // Attaque 60ms
    oscGain.gain.setValueAtTime(volume, now + peakTime);               // Sustain au pic
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + duration);   // Fade-out

    // Connexion : oscillateurs -> filtre -> gain -> sortie
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(oscGain);
    oscGain.connect(ac.destination);

    // --- Couche de bruit grave (corps du "whoosh") ---
    const noiseBuf = createNoiseBuffer(ac, duration);

    const noiseLow = ac.createBufferSource();
    noiseLow.buffer = noiseBuf;
    const noiseLowFilt = ac.createBiquadFilter();
    noiseLowFilt.type = 'bandpass';
    noiseLowFilt.frequency.value = 200;  // Bruit centre sur les basses
    noiseLowFilt.Q.value = 0.7;

    // --- Couche de bruit medium (texture de la lame) ---
    const noiseHigh = ac.createBufferSource();
    noiseHigh.buffer = noiseBuf;
    const noiseHighFilt = ac.createBiquadFilter();
    noiseHighFilt.type = 'bandpass';
    noiseHighFilt.frequency.value = 500;  // Medium au lieu d'aigu
    noiseHighFilt.Q.value = 2;

    // --- Gain du bruit : meme enveloppe que les oscillateurs ---
    const noiseGain = ac.createGain();
    const noiseVol = volume * 0.5;
    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(noiseVol, now + 0.06);
    noiseGain.gain.setValueAtTime(noiseVol, now + peakTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    noiseLow.connect(noiseLowFilt);
    noiseLowFilt.connect(noiseGain);
    noiseHigh.connect(noiseHighFilt);
    noiseHighFilt.connect(noiseGain);
    noiseGain.connect(ac.destination);

    // --- Demarrage et arret automatique ---
    sub.start(now);
    sub.stop(now + duration);
    osc1.start(now);
    osc1.stop(now + duration);
    osc2.start(now);
    osc2.stop(now + duration);
    noiseLow.start(now);
    noiseLow.stop(now + duration);
    noiseHigh.start(now);
    noiseHigh.stop(now + duration);
}
```

## 5.7 Export du composable

Enfin, exportez toutes les fonctions sous forme de composable Vue :

```ts
export function useLightsaberSound() {
  return {
    startHum,
    stopHum,
    playIgnite,
    playRetract,
    playSwing,
  };
}
```

Le fichier complet `src/composables/useLightsaberSound.ts` contient toutes les sections ci-dessus bout a bout (5.1 a 5.7).
