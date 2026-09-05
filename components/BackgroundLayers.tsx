'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

function RootsPattern() {
  return (
    <svg
      className="layer-decor layer-roots-svg"
      viewBox="0 0 1400 320"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="rootTexture" x="0" y="0" width="140" height="320" patternUnits="userSpaceOnUse">
          <path
            d="M70 0 C55 40 75 80 60 130 C45 170 80 210 55 260 C40 290 65 320 50 320"
            fill="none"
            stroke="rgba(25,50,22,0.7)"
            strokeWidth="4"
          />
          <path
            d="M70 0 C90 35 65 75 85 115 C100 150 75 190 95 240 C105 275 80 310 100 320"
            fill="none"
            stroke="rgba(35,65,30,0.55)"
            strokeWidth="3"
          />
          <path
            d="M70 20 C45 55 30 95 50 135 M70 30 C95 60 110 100 90 145 M55 160 C35 195 25 235 45 275"
            fill="none"
            stroke="rgba(20,45,18,0.45)"
            strokeWidth="2"
          />
          <path
            d="M70 10 C60 50 40 90 55 125 C65 155 50 185 60 215"
            fill="none"
            stroke="rgba(15,35,12,0.35)"
            strokeWidth="1.5"
          />
        </pattern>
        <linearGradient id="rootFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(20,40,18,0.9)" />
          <stop offset="100%" stopColor="rgba(10,25,8,0)" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#rootTexture)" />
      <rect width="100%" height="55%" fill="url(#rootFade)" />
    </svg>
  );
}

const PEBBLE_SHAPES = ['pebble', 'pebble pebble--angular', 'pebble pebble--flat', 'rock'] as const;

function PebblesPattern() {
  return (
    <div className="layer-decor layer-pebbles" aria-hidden="true">
      {Array.from({ length: 40 }, (_, i) => (
        <span
          key={i}
          className={PEBBLE_SHAPES[i % PEBBLE_SHAPES.length]}
          style={{
            left: `${(i * 13 + 3) % 96}%`,
            top: `${(i * 11 + 8) % 88}%`,
            width: `${5 + (i % 5) * 3}px`,
            height: `${4 + (i % 4) * 3}px`,
            transform: `rotate(${i * 17}deg)`,
          }}
        />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <span
          key={`boulder-${i}`}
          className="boulder"
          style={{
            left: `${8 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
        />
      ))}
    </div>
  );
}

function OreVeinsPattern() {
  return (
    <svg className="layer-decor layer-ore-svg" viewBox="0 0 1200 800" aria-hidden="true">
      <defs>
        <linearGradient id="goldVein" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,215,100,0)" />
          <stop offset="45%" stopColor="rgba(255,215,100,0.45)" />
          <stop offset="100%" stopColor="rgba(255,215,100,0)" />
        </linearGradient>
        <linearGradient id="silverVein" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(200,210,230,0)" />
          <stop offset="50%" stopColor="rgba(200,210,230,0.3)" />
          <stop offset="100%" stopColor="rgba(200,210,230,0)" />
        </linearGradient>
      </defs>
      <path d="M0 180 Q280 240 480 160 T980 200 T1200 280" stroke="url(#goldVein)" strokeWidth="5" fill="none" />
      <path d="M0 420 Q350 380 580 480 T1050 400" stroke="url(#silverVein)" strokeWidth="4" fill="none" />
      <path d="M100 300 Q250 350 400 310 T700 340" stroke="rgba(243,0,180,0.12)" strokeWidth="2" fill="none" />
      <polygon points="180,320 220,290 260,330 230,370" fill="rgba(55,55,65,0.55)" />
      <polygon points="620,250 680,220 720,270 660,300" fill="rgba(48,48,58,0.5)" />
      <ellipse cx="900" cy="480" rx="48" ry="30" fill="rgba(50,50,60,0.48)" />
      <ellipse cx="350" cy="550" rx="32" ry="20" fill="rgba(58,58,68,0.45)" />
    </svg>
  );
}

function ObsidianCrystals() {
  const crystals = [
    { left: '8%', bottom: '12%', w: 28, h: 52, rot: -18 },
    { left: '22%', bottom: '6%', w: 20, h: 40, rot: 12 },
    { left: '38%', bottom: '15%', w: 34, h: 60, rot: -8 },
    { left: '55%', bottom: '8%', w: 24, h: 44, rot: 22 },
    { left: '70%', bottom: '14%', w: 30, h: 54, rot: -14 },
    { left: '84%', bottom: '5%', w: 22, h: 38, rot: 8 },
    { left: '48%', bottom: '22%', w: 18, h: 32, rot: -25 },
    { left: '92%', bottom: '18%', w: 26, h: 48, rot: 15 },
  ];

  return (
    <div className="layer-decor layer-obsidian-crystals" aria-hidden="true">
      {crystals.map((c, i) => (
        <svg
          key={i}
          className="obsidian-crystal-svg"
          style={{ left: c.left, bottom: c.bottom, transform: `rotate(${c.rot}deg)` }}
          width={c.w}
          height={c.h}
          viewBox="0 0 30 55"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`obsGrad${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(80,40,120,0.85)" />
              <stop offset="40%" stopColor="rgba(20,10,35,0.95)" />
              <stop offset="70%" stopColor="rgba(100,60,160,0.5)" />
              <stop offset="100%" stopColor="rgba(10,5,20,0.9)" />
            </linearGradient>
          </defs>
          <polygon points="15,0 28,20 22,55 8,55 2,20" fill={`url(#obsGrad${i})`} />
          <polygon points="15,0 22,20 15,30 8,20" fill="rgba(180,140,255,0.15)" />
        </svg>
      ))}
    </div>
  );
}

function LavaFlows() {
  return (
    <div className="layer-decor layer-lava-flows" aria-hidden="true">
      <div className="lava-stream lava-stream--1" />
      <div className="lava-stream lava-stream--2" />
      <div className="lava-stream lava-stream--3" />
      <div className="lava-stream lava-stream--4" />
      <div className="lava-core-glow" />
      {Array.from({ length: 18 }, (_, i) => (
        <span
          key={i}
          className="lava-bubble"
          style={{
            left: `${5 + (i * 19) % 90}%`,
            bottom: `${8 + (i % 5) * 6}%`,
            width: `${6 + (i % 4) * 4}px`,
            height: `${6 + (i % 4) * 4}px`,
            animationDelay: `${i * 0.35}s`,
            animationDuration: `${2.5 + (i % 3)}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function BackgroundLayers() {
  const { scrollYProgress } = useScroll();

  const forestOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const groundOpacity = useTransform(scrollYProgress, [0.1, 0.28, 0.42], [0, 1, 0]);
  const oreOpacity = useTransform(scrollYProgress, [0.32, 0.48, 0.62], [0, 1, 0]);
  const obsidianOpacity = useTransform(scrollYProgress, [0.55, 0.72, 0.88], [0, 1, 0]);
  const lavaOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  return (
    <div className="page-background bg-deep-underground" aria-hidden="true">
      <motion.div className="bg-layer layer-forest" style={{ opacity: forestOpacity }}>
        <RootsPattern />
        <div className="forest-moss" />
      </motion.div>

      <motion.div className="bg-layer layer-ground" style={{ opacity: groundOpacity }}>
        <PebblesPattern />
        <div className="ground-texture" />
      </motion.div>

      <motion.div className="bg-layer layer-ore" style={{ opacity: oreOpacity }}>
        <OreVeinsPattern />
        <div className="ore-sparkles" />
      </motion.div>

      <motion.div className="bg-layer layer-obsidian" style={{ opacity: obsidianOpacity }}>
        <ObsidianCrystals />
        <div className="obsidian-sheen" />
      </motion.div>

      <motion.div className="bg-layer layer-lava" style={{ opacity: lavaOpacity }}>
        <LavaFlows />
      </motion.div>
    </div>
  );
}
