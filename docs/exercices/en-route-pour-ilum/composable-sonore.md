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
 * Joue le son d'allumage : un sweep montant 80->400Hz + burst de bruit blanc.
 * Duree : ~0.6 secondes.
 */
function playIgnite() {
  const ac = getCtx();
  const now = ac.currentTime;

  // Sweep montant : la frequence monte de 80Hz a 400Hz en 0.5s
  const osc = ac.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(80, now);
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.5);

  // Le volume diminue progressivement (fade-out)
  const oscGain = ac.createGain();
  oscGain.gain.setValueAtTime(0.4, now);
  oscGain.gain.linearRampToValueAtTime(0, now + 0.6);
  osc.connect(oscGain);
  oscGain.connect(ac.destination);

  // Burst de bruit blanc filtre pour le "crissement" de l'allumage
  const noiseBuf = createNoiseBuffer(ac, 0.6);
  const noise = ac.createBufferSource();
  noise.buffer = noiseBuf;
  const noiseGain = ac.createGain();
  noiseGain.gain.setValueAtTime(0.3, now);
  noiseGain.gain.linearRampToValueAtTime(0, now + 0.6);
  const noiseFilt = ac.createBiquadFilter();
  noiseFilt.type = 'bandpass';
  noiseFilt.frequency.value = 800;
  noiseFilt.Q.value = 1;
  noise.connect(noiseFilt);
  noiseFilt.connect(noiseGain);
  noiseGain.connect(ac.destination);

  // Demarrage et arret automatique apres 0.6s
  osc.start(now);
  osc.stop(now + 0.6);
  noise.start(now);
  noise.stop(now + 0.6);
}
```

## 5.5 Le son d'extinction (retract)

```ts
/**
 * Joue le son d'extinction : un sweep descendant 400->30Hz + bruit blanc.
 * C'est l'inverse de l'allumage. Duree : ~0.8 secondes.
 */
function playRetract() {
  const ac = getCtx();
  const now = ac.currentTime;

  // Sweep descendant : la frequence descend de 400Hz a 30Hz
  const osc = ac.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(30, now + 0.8);

  const oscGain = ac.createGain();
  oscGain.gain.setValueAtTime(0.35, now);
  oscGain.gain.linearRampToValueAtTime(0, now + 0.8);
  osc.connect(oscGain);
  oscGain.connect(ac.destination);

  // Bruit blanc filtre a 600Hz
  const noiseBuf = createNoiseBuffer(ac, 0.8);
  const noise = ac.createBufferSource();
  noise.buffer = noiseBuf;
  const noiseGain = ac.createGain();
  noiseGain.gain.setValueAtTime(0.2, now);
  noiseGain.gain.linearRampToValueAtTime(0, now + 0.8);
  const noiseFilt = ac.createBiquadFilter();
  noiseFilt.type = 'bandpass';
  noiseFilt.frequency.value = 600;
  noiseFilt.Q.value = 1;
  noise.connect(noiseFilt);
  noiseFilt.connect(noiseGain);
  noiseGain.connect(ac.destination);

  osc.start(now);
  osc.stop(now + 0.8);
  noise.start(now);
  noise.stop(now + 0.8);
}
```

## 5.6 Le son de swing (mouvement)

```ts
/**
 * Joue le son de swing : un sweep en V 200->600->150Hz + bruit bandpass.
 * La frequence monte puis redescend, ce qui cree l'effet Doppler
 * caracteristique d'un objet qui passe rapidement. Duree : ~0.35 secondes.
 */
function playSwing() {
  const ac = getCtx();
  const now = ac.currentTime;

  // Sweep en "V" : monte a 600Hz puis redescend a 150Hz
  const osc = ac.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(200, now);
  osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
  osc.frequency.exponentialRampToValueAtTime(150, now + 0.35);

  const filter = ac.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 500;

  const oscGain = ac.createGain();
  oscGain.gain.setValueAtTime(0.35, now);
  oscGain.gain.linearRampToValueAtTime(0, now + 0.35);

  osc.connect(filter);
  filter.connect(oscGain);
  oscGain.connect(ac.destination);

  // Bruit bandpass aigu a 1000Hz pour le "sifflement"
  const noiseBuf = createNoiseBuffer(ac, 0.35);
  const noise = ac.createBufferSource();
  noise.buffer = noiseBuf;
  const noiseFilt = ac.createBiquadFilter();
  noiseFilt.type = 'bandpass';
  noiseFilt.frequency.value = 1000;
  noiseFilt.Q.value = 5;
  const noiseGain = ac.createGain();
  noiseGain.gain.setValueAtTime(0.15, now);
  noiseGain.gain.linearRampToValueAtTime(0, now + 0.35);
  noise.connect(noiseFilt);
  noiseFilt.connect(noiseGain);
  noiseGain.connect(ac.destination);

  osc.start(now);
  osc.stop(now + 0.35);
  noise.start(now);
  noise.stop(now + 0.35);
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
