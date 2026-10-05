import React, { useState, useRef, useEffect } from 'react';
import { ProductModel, ProductColor, PrintLocation } from '../types';
import { ArtworkGraphic } from './ArtworkGraphic';
import {
  Sparkles,
  ShieldCheck,
  Rotate3d,
  RefreshCw,
  Compass,
  ChevronLeft,
  ChevronRight,
  User,
} from 'lucide-react';

interface MockupViewerProps {
  model: ProductModel;
  color: ProductColor;
  size: string;
  printLocation?: PrintLocation;
  onSelectPrintLocation?: (location: PrintLocation) => void;
  onPrevModel?: () => void;
  onNextModel?: () => void;
  currentIndex?: number;
  totalModels?: number;
}

export const MockupViewer: React.FC<MockupViewerProps> = ({
  model,
  color,
  size,
  printLocation = 'pecho',
  onSelectPrintLocation,
  onPrevModel,
  onNextModel,
  currentIndex = 1,
  totalModels = 25,
}) => {
  const isDark = color.isDark;

  // 3D rotation states (smooth interactive tilt with physical body volume)
  const [rotY, setRotY] = useState<number>(printLocation === 'espalda' ? 180 : 0);
  const [rotX, setRotX] = useState<number>(0);
  const [viewSide, setViewSide] = useState<'front' | 'back'>(printLocation === 'espalda' ? 'back' : 'front');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; startRotY: number; startRotX: number }>({
    x: 0,
    y: 0,
    startRotY: 0,
    startRotX: 0,
  });

  // When printLocation prop changes from external control, gently turn shirt to that face
  useEffect(() => {
    if (printLocation === 'espalda') {
      setViewSide('back');
      setRotY(180);
      setRotX(0);
    } else {
      setViewSide('front');
      setRotY(0);
      setRotX(0);
    }
  }, [printLocation]);

  // Toggle front/back view
  const handleToggleSide = () => {
    if (viewSide === 'front') {
      setViewSide('back');
      setRotY(180);
      setRotX(0);
    } else {
      setViewSide('front');
      setRotY(0);
      setRotX(0);
    }
  };

  // Reset 3D angle
  const handleResetAngle = () => {
    setIsAutoRotating(false);
    setViewSide('front');
    setRotY(0);
    setRotX(0);
  };

  // Pointer Drag handlers with bounded rotation for realistic 3D volume
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startRotY: rotY,
      startRotX: rotX,
    };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    // Smoothed 3D rotation within realistic angles (-35° to +35° in front, or towards 180°)
    let newRotY = dragStartRef.current.startRotY + deltaX * 0.35;
    let newRotX = dragStartRef.current.startRotX - deltaY * 0.22;

    // Clamp X rotation
    newRotX = Math.max(-14, Math.min(14, newRotX));

    setRotY(newRotY);
    setRotX(newRotX);

    // Auto-detect front or back
    const normalizedY = ((newRotY % 360) + 360) % 360;
    if (normalizedY > 90 && normalizedY < 270) {
      if (viewSide !== 'back') setViewSide('back');
    } else {
      if (viewSide !== 'front') setViewSide('front');
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {}
  };

  // Gentle auto-rotation
  useEffect(() => {
    if (!isAutoRotating) return;
    let animationFrameId: number;
    let angle = rotY;

    const animate = () => {
      angle = (angle + 0.5) % 360;
      setRotY(angle);
      const normalizedY = ((angle % 360) + 360) % 360;
      if (normalizedY > 90 && normalizedY < 270) {
        setViewSide('back');
      } else {
        setViewSide('front');
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isAutoRotating, rotY]);

  const isCurrentlyBack = ((rotY % 360) + 360) % 360 > 90 && ((rotY % 360) + 360) % 360 < 270;
  const dynamicShading = Math.sin((rotY * Math.PI) / 180);

  return (
    <div className="relative w-full max-w-lg mx-auto flex flex-col items-center select-none">
      {/* 3D T-Shirt Studio Box */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative w-full aspect-[4/4.6] sm:aspect-[4/4.4] rounded-3xl bg-gradient-to-b from-[#F7F4EC] via-[#EEE9DF] to-[#E2DCCF] border border-amber-950/10 shadow-2xl p-4 sm:p-6 flex items-center justify-center overflow-hidden touch-none transition-shadow ${
          isDragging ? 'cursor-grabbing shadow-amber-900/15' : 'cursor-grab hover:shadow-xl'
        }`}
        style={{
          perspective: '1400px',
        }}
      >
        {/* Soft studio spot glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-300"
          style={{
            background: `radial-gradient(ellipse at ${50 + dynamicShading * 30}% 35%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.25) 50%, transparent 75%)`,
          }}
        />

        {/* 1. TOP BADGES */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 pointer-events-none">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-sm border border-zinc-200/80 text-zinc-800">
            <User className="w-3.5 h-3.5 text-amber-700" />
            <span>Fit Humano • {model.code || `VCP-${String(model.id).padStart(2, '0')}`}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-900/85 backdrop-blur-md text-zinc-100 shadow-sm">
            <span
              className="w-2.5 h-2.5 rounded-full border border-white/50"
              style={{ backgroundColor: color.hex }}
            />
            {color.name}
          </span>
        </div>

        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 pointer-events-none">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-900 border border-amber-500/30 backdrop-blur-md shadow-xs">
            {isCurrentlyBack ? 'Vista Espalda' : 'Vista Pecho'}
          </span>
          <span className="inline-flex items-center text-[10px] font-bold uppercase px-2 py-1 rounded-full bg-white/90 text-zinc-800 border border-zinc-200 backdrop-blur-md shadow-xs">
            Talle {size}
          </span>
        </div>

        {/* 2. FLECHAS LATERALES PARA PASAR DE MODELO (SOLICITUD EXPLÍCITA) */}
        {onPrevModel && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrevModel();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-zinc-800 shadow-lg border border-zinc-200/80 flex items-center justify-center transition-all duration-150 transform hover:scale-110 active:scale-95 group"
            title="Ver modelo anterior"
            aria-label="Modelo anterior"
          >
            <ChevronLeft className="w-6 h-6 text-zinc-700 group-hover:text-amber-900 transition-colors" />
          </button>
        )}

        {onNextModel && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNextModel();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-zinc-800 shadow-lg border border-zinc-200/80 flex items-center justify-center transition-all duration-150 transform hover:scale-110 active:scale-95 group"
            title="Ver siguiente modelo"
            aria-label="Siguiente modelo"
          >
            <ChevronRight className="w-6 h-6 text-zinc-700 group-hover:text-amber-900 transition-colors" />
          </button>
        )}

        {/* Floating 3D rotation hint */}
        <div className="absolute top-16 right-4 z-20 pointer-events-none opacity-80 flex items-center gap-1 text-[10px] font-medium text-zinc-500 bg-white/80 px-2 py-0.5 rounded-full backdrop-blur-xs border border-zinc-200/60 shadow-xs">
          <Compass className="w-3 h-3 text-amber-700 animate-spin" style={{ animationDuration: '6s' }} />
          <span>3D con volumen corporal</span>
        </div>

        {/* 3. 3D VOLUMETRIC CONTAINER (Simulates body cylinder thickness and depth) */}
        <div
          className="relative w-full h-full max-h-[470px] flex items-center justify-center transition-transform duration-75 ease-out"
          style={{
            transform: `rotateY(${rotY}deg) rotateX(${rotX}deg)`,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {/* Real Ambient Floor Contact Shadow */}
          <div
            className="absolute bottom-5 w-[64%] h-9 bg-black/25 rounded-[100%] filter blur-xl transform translate-y-10 transition-all duration-200"
            style={{
              opacity: isDark ? 0.38 : 0.25,
            }}
          />

          {/* BACK WALL SHADOW (Simulates rear thickness so it doesn't look like paper) */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              transform: 'translateZ(-14px)',
              filter: 'blur(3px)',
              opacity: 0.45,
            }}
          >
            <div
              className="w-[66%] h-[78%] rounded-[36px] bg-black/40"
              style={{
                transform: `translateX(${-dynamicShading * 10}px)`,
              }}
            />
          </div>

          {/* HIGH-END VECTOR T-SHIRT WORN ON HUMAN BODY ANATOMY */}
          <svg
            viewBox="0 0 500 530"
            className="w-full h-full filter drop-shadow-[0_20px_28px_rgba(0,0,0,0.18)]"
            style={{
              overflow: 'visible',
              transform: 'translateZ(6px)',
            }}
          >
            <defs>
              {/* 1. Ultra-fine Cotton Piqué / Jersey Weave Pattern */}
              <pattern id="real-cotton-knit" width="5" height="5" patternUnits="userSpaceOnUse">
                <path
                  d="M 0 2.5 Q 1.25 1.25, 2.5 2.5 T 5 2.5"
                  fill="none"
                  stroke={isDark ? '#ffffff' : '#000000'}
                  strokeWidth="0.32"
                  strokeOpacity={isDark ? 0.12 : 0.08}
                />
                <path
                  d="M 2.5 0 Q 3.75 1.25, 2.5 2.5 T 2.5 5"
                  fill="none"
                  stroke={isDark ? '#ffffff' : '#000000'}
                  strokeWidth="0.28"
                  strokeOpacity={isDark ? 0.1 : 0.07}
                />
              </pattern>

              {/* 2. Micro Fabric Turbulence */}
              <filter id="cotton-tactile" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="4" result="noise" />
                <feColorMatrix
                  type="matrix"
                  values="0.33 0.33 0.33 0 0
                          0.33 0.33 0.33 0 0
                          0.33 0.33 0.33 0 0
                          0    0    0    0.05 0"
                  result="coloredNoise"
                />
                <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
              </filter>

              {/* 3. Cylindrical Human Torso 3D Lighting (Curved chest volume) */}
              <linearGradient id="bodyCylinderLight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#000000" stopOpacity={isDark ? 0.5 : 0.22} />
                <stop offset="15%" stopColor="#000000" stopOpacity={isDark ? 0.2 : 0.08} />
                <stop offset="38%" stopColor="#ffffff" stopOpacity={isDark ? 0.18 : 0.25} />
                <stop offset="55%" stopColor="#ffffff" stopOpacity={isDark ? 0.12 : 0.18} />
                <stop offset="85%" stopColor="#000000" stopOpacity={isDark ? 0.22 : 0.09} />
                <stop offset="100%" stopColor="#000000" stopOpacity={isDark ? 0.5 : 0.22} />
              </linearGradient>

              {/* 4. Natural Pectoral and Torso Creases Gradient */}
              <linearGradient id="pectoralCreases" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity={isDark ? 0.12 : 0.2} />
                <stop offset="32%" stopColor="#000000" stopOpacity="0" />
                <stop offset="65%" stopColor="#000000" stopOpacity={isDark ? 0.22 : 0.12} />
                <stop offset="85%" stopColor="#ffffff" stopOpacity={isDark ? 0.05 : 0.1} />
                <stop offset="100%" stopColor="#000000" stopOpacity={isDark ? 0.3 : 0.16} />
              </linearGradient>

              {/* 5. Collar Ribbing Pattern */}
              <pattern id="ribbed-collar" width="4" height="12" patternUnits="userSpaceOnUse">
                <line
                  x1="2"
                  y1="0"
                  x2="2"
                  y2="12"
                  stroke={isDark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.22)'}
                  strokeWidth="1.2"
                />
              </pattern>
            </defs>

            {/* INNER BACK COLLAR & NECK DEPTH (Front View Only) */}
            {!isCurrentlyBack && (
              <g id="neck-depth">
                {/* Inner Neck cavity (dark 3D depth) */}
                <ellipse cx="250" cy="74" rx="55" ry="24" fill={isDark ? '#080809' : '#B8B1A2'} />
                {/* Interior back fabric with label */}
                <path
                  d="M 195 58 C 220 84 280 84 305 58 C 290 98 210 98 195 58 Z"
                  fill={isDark ? '#141416' : '#CBC5B8'}
                />
                {/* Woven Brand Label */}
                <rect
                  x="235"
                  y="72"
                  width="30"
                  height="16"
                  rx="3"
                  fill="#18181B"
                  stroke="#E4E4E7"
                  strokeWidth="0.6"
                />
                <text
                  x="250"
                  y="81"
                  fill="#E4E4E7"
                  fontSize="6.5"
                  fontWeight="bold"
                  letterSpacing="1"
                  textAnchor="middle"
                  fontFamily="sans-serif"
                >
                  VCP
                </text>
                <text
                  x="250"
                  y="85.5"
                  fill="#A1A1AA"
                  fontSize="3.8"
                  textAnchor="middle"
                  fontFamily="sans-serif"
                >
                  ALGODÓN 24/1
                </text>
              </g>
            )}

            {/* SLEEVE CAVITY HOLES (Shows true cylindrical body openings) */}
            <g id="sleeve-holes" opacity={isDark ? 0.6 : 0.35}>
              {/* Left armhole depth */}
              <ellipse cx="68" cy="180" rx="14" ry="7" fill="#000000" transform="rotate(-28 68 180)" />
              {/* Right armhole depth */}
              <ellipse cx="432" cy="180" rx="14" ry="7" fill="#000000" transform="rotate(28 432 180)" />
            </g>

            {/* MAIN T-SHIRT WITH ANATOMICAL HUMAN SHOULDERS & WAIST */}
            <g id="tshirt-body-shape">
              {/* Base Fabric Silhouette (Anatomical taper from chest to waist) */}
              <path
                d="M 195 58 
                   C 168 56 126 76 78 114 
                   C 66 124 54 165 52 178 
                   C 66 188 98 200 118 190 
                   C 128 174 133 158 135 150 
                   C 136 195 138 275 136 460 
                   C 136 472 144 480 156 480 
                   C 215 486 285 486 344 480 
                   C 356 480 364 472 364 460 
                   C 362 275 364 195 365 150 
                   C 367 158 372 174 382 190 
                   C 402 200 434 188 448 178 
                   C 446 165 434 124 422 114 
                   C 374 76 332 56 305 58 
                   C 285 96 215 96 195 58 Z"
                fill={color.hex}
                stroke={isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.1)'}
                strokeWidth="1.6"
                filter="url(#cotton-tactile)"
              />

              {/* Cotton Heather Knit Texture Overlay */}
              <path
                d="M 195 58 
                   C 168 56 126 76 78 114 
                   C 66 124 54 165 52 178 
                   C 66 188 98 200 118 190 
                   C 128 174 133 158 135 150 
                   C 136 195 138 275 136 460 
                   C 136 472 144 480 156 480 
                   C 215 486 285 486 344 480 
                   C 356 480 364 472 364 460 
                   C 362 275 364 195 365 150 
                   C 367 158 372 174 382 190 
                   C 402 200 434 188 448 178 
                   C 446 165 434 124 422 114 
                   C 374 76 332 56 305 58 
                   C 285 96 215 96 195 58 Z"
                fill="url(#real-cotton-knit)"
                pointerEvents="none"
              />

              {/* Cylindrical Torso 3D Lighting (Curvature of human chest) */}
              <path
                d="M 195 58 
                   C 168 56 126 76 78 114 
                   C 66 124 54 165 52 178 
                   C 66 188 98 200 118 190 
                   C 128 174 133 158 135 150 
                   C 136 195 138 275 136 460 
                   C 136 472 144 480 156 480 
                   C 215 486 285 486 344 480 
                   C 356 480 364 472 364 460 
                   C 362 275 364 195 365 150 
                   C 367 158 372 174 382 190 
                   C 402 200 434 188 448 178 
                   C 446 165 434 124 422 114 
                   C 374 76 332 56 305 58 
                   C 285 96 215 96 195 58 Z"
                fill="url(#bodyCylinderLight)"
                pointerEvents="none"
              />

              {/* Torso Vertical Drape & Pectoral Muscle Curves */}
              <path
                d="M 135 150 C 137 250 138 380 136 470 C 215 476 285 476 364 470 C 362 380 364 250 365 150 Z"
                fill="url(#pectoralCreases)"
                pointerEvents="none"
              />

              {/* NATURAL FABRIC TENSION & DRAPE WRINKLES (Worn on Human) */}
              <g opacity={isDark ? 0.42 : 0.18}>
                {/* Armpit fold lines (tension from arm hanging) */}
                <path
                  d="M 136 160 Q 160 185 152 235 Q 144 265 150 305"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  filter="blur(1.2px)"
                />
                <path
                  d="M 138 161 Q 162 186 154 236"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity={0.4}
                />

                <path
                  d="M 364 160 Q 340 185 348 235 Q 356 265 350 305"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  filter="blur(1.2px)"
                />
                <path
                  d="M 362 161 Q 338 186 346 236"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity={0.4}
                />

                {/* Chest / Pectoral contour shadow */}
                <path
                  d="M 190 220 Q 250 240 310 220"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  filter="blur(1.5px)"
                />

                {/* Waist slight drape bend */}
                <path
                  d="M 170 360 Q 250 380 330 360"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  filter="blur(1.5px)"
                />
                <path
                  d="M 172 362 Q 250 382 328 362"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1"
                  strokeLinecap="round"
                  opacity={0.3}
                />
              </g>

              {/* COLLAR (Front vs Back Ribbing) */}
              {!isCurrentlyBack ? (
                // Front ribbed neck with natural collar ring
                <g id="front-collar">
                  <path
                    d="M 195 58 C 215 96 285 96 305 58 C 290 86 210 86 195 58 Z"
                    fill="url(#ribbed-collar)"
                    stroke={isDark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.22)'}
                    strokeWidth="3.6"
                  />
                  <path
                    d="M 193 56 C 215 99 285 99 307 56"
                    fill="none"
                    stroke={isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.15)'}
                    strokeWidth="2"
                  />
                </g>
              ) : (
                // Back collar with high shallow seam
                <g id="back-collar">
                  <path
                    d="M 195 58 C 225 67 275 67 305 58 C 285 72 215 72 195 58 Z"
                    fill="url(#ribbed-collar)"
                    stroke={isDark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.22)'}
                    strokeWidth="3.2"
                  />
                  {/* Half-moon back reinforced stitching */}
                  <path
                    d="M 175 70 C 215 112 285 112 325 70"
                    fill="none"
                    stroke={isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)'}
                    strokeWidth="1.5"
                    strokeDasharray="4,2"
                  />
                </g>
              )}

              {/* DOUBLE STITCHING ON SLEEVES & HEM */}
              {/* Sleeve left stitches */}
              <path
                d="M 60 173 C 78 183 104 188 114 182"
                fill="none"
                stroke={isDark ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.2)'}
                strokeWidth="1.1"
                strokeDasharray="4,2"
              />
              <path
                d="M 62 176 C 80 186 103 190 112 185"
                fill="none"
                stroke={isDark ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.12)'}
                strokeWidth="1.1"
                strokeDasharray="4,2"
              />

              {/* Sleeve right stitches */}
              <path
                d="M 440 173 C 422 183 396 188 386 182"
                fill="none"
                stroke={isDark ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.2)'}
                strokeWidth="1.1"
                strokeDasharray="4,2"
              />
              <path
                d="M 438 176 C 420 186 397 190 388 185"
                fill="none"
                stroke={isDark ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.12)'}
                strokeWidth="1.1"
                strokeDasharray="4,2"
              />

              {/* Bottom hem curved double stitching */}
              <path
                d="M 138 466 C 215 473 285 473 362 466"
                fill="none"
                stroke={isDark ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.18)'}
                strokeWidth="1.2"
                strokeDasharray="5,2.5"
              />
              <path
                d="M 138 471 C 215 478 285 478 362 471"
                fill="none"
                stroke={isDark ? 'rgba(0,0,0,0.38)' : 'rgba(0,0,0,0.1)'}
                strokeWidth="1.2"
                strokeDasharray="5,2.5"
              />

              {/* Shoulder reinforcement top stitches */}
              <path
                d="M 195 58 L 78 114"
                fill="none"
                stroke={isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}
                strokeWidth="1.2"
                strokeDasharray="4,2"
              />
              <path
                d="M 305 58 L 422 114"
                fill="none"
                stroke={isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}
                strokeWidth="1.2"
                strokeDasharray="4,2"
              />
            </g>
          </svg>

          {/* 4. PRINTED ARTWORK OVERLAY (CHEST VS BACK ADAPTATION) */}
          {!isCurrentlyBack ? (
            // FRONT VIEW
            printLocation === 'pecho' ? (
              // Full Artwork on Chest
              <div
                className="absolute z-10 flex items-center justify-center pointer-events-none transform -translate-y-4 transition-opacity duration-200"
                style={{
                  width: '45%',
                  maxHeight: '43%',
                  top: '28%',
                  opacity: Math.max(0, Math.cos((rotY * Math.PI) / 180)),
                  transform: `translateZ(10px) translateY(-14px) rotateY(${rotY * 0.15}deg)`,
                }}
              >
                <div className="relative w-full flex items-center justify-center p-2">
                  <ArtworkGraphic
                    model={model}
                    color={color}
                    className="transform transition-transform duration-200 drop-shadow-[0_3px_5px_rgba(0,0,0,0.22)]"
                  />
                </div>
              </div>
            ) : (
              // Print is on Back -> Show elegant minimalist VCP crest on Left Chest
              <div
                className="absolute z-10 flex items-center pointer-events-none transition-opacity duration-200"
                style={{
                  top: '26%',
                  left: '32%',
                  opacity: Math.max(0, Math.cos((rotY * Math.PI) / 180)),
                  transform: 'translateZ(9px)',
                }}
              >
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-black/10 text-[9px] font-mono tracking-widest font-extrabold uppercase shadow-xs backdrop-blur-xs"
                  style={{
                    color: isDark ? '#F5F5F0' : '#18181B',
                    backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                  }}
                >
                  <span className="text-[10px]">✝</span>
                  <span>VCP</span>
                </div>
              </div>
            )
          ) : (
            // BACK VIEW
            printLocation === 'espalda' ? (
              // Full Artwork on Back
              <div
                className="absolute z-10 flex items-center justify-center pointer-events-none transition-opacity duration-200"
                style={{
                  width: '46%',
                  maxHeight: '45%',
                  top: '22%',
                  opacity: Math.max(0, -Math.cos((rotY * Math.PI) / 180)),
                  transform: `translateZ(10px) rotateY(${rotY * 0.15}deg)`,
                }}
              >
                <div className="relative w-full flex items-center justify-center p-2">
                  <ArtworkGraphic
                    model={model}
                    color={color}
                    className="transform transition-transform duration-200 drop-shadow-[0_3px_5px_rgba(0,0,0,0.22)]"
                  />
                </div>
              </div>
            ) : (
              // Print is on Chest -> Show minimal neck signature on Back
              <div
                className="absolute z-10 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-200"
                style={{
                  top: '21%',
                  opacity: Math.max(0, -Math.cos((rotY * Math.PI) / 180)),
                  transform: 'translateZ(8px)',
                }}
              >
                <div
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-black/10 text-[9px] font-mono tracking-widest font-extrabold uppercase shadow-xs"
                  style={{
                    color: isDark ? '#E4E4E7' : '#27272A',
                    backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                  }}
                >
                  <span>VCP DESIGN</span>
                  <span>•</span>
                  <span>ORIGINAL</span>
                </div>
              </div>
            )
          )}
        </div>

        {/* Quality Badges */}
        <div className="absolute bottom-3 inset-x-4 flex items-center justify-between pointer-events-none text-zinc-600 text-[10px] font-medium px-2">
          <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-xl border border-zinc-200/80 shadow-xs">
            <Sparkles className="w-3 h-3 text-amber-600" />
            Algodón Peinado 24/1
          </span>
          <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-xl border border-zinc-200/80 shadow-xs">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            Estampa Textil HD
          </span>
        </div>
      </div>

      {/* 4. 3D & CAROUSEL CONTROL BAR */}
      <div className="w-full mt-3 flex items-center justify-between gap-2 px-1">
        {/* Toggle Front / Back Button */}
        <button
          type="button"
          onClick={handleToggleSide}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-zinc-50 border border-zinc-200 text-xs font-bold text-zinc-800 shadow-xs transition-all active:scale-95"
          title="Girar 180 grados entre frente y espalda"
        >
          <Rotate3d className="w-4 h-4 text-amber-700" />
          <span>{isCurrentlyBack ? 'Ver Frente' : 'Ver Espalda'}</span>
        </button>

        {/* Toggle Auto 3D Rotation */}
        <button
          type="button"
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-bold shadow-xs transition-all active:scale-95 ${
            isAutoRotating
              ? 'bg-amber-500 text-zinc-950 border-amber-600'
              : 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-800'
          }`}
          title="Activar o pausar giro automático 3D"
        >
          <Compass className={`w-4 h-4 ${isAutoRotating ? 'animate-spin' : 'text-zinc-500'}`} />
          <span>{isAutoRotating ? 'Pausar Giro' : 'Auto Giro 3D'}</span>
        </button>

        {/* Reset View Button */}
        <button
          type="button"
          onClick={handleResetAngle}
          className="p-2 rounded-xl bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-zinc-900 shadow-xs transition-all"
          title="Centrar vista frontal"
          aria-label="Restablecer ángulo"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Model pagination indicator & instructions */}
      <div className="mt-2.5 flex items-center justify-between w-full px-2 text-xs text-zinc-500">
        <span className="font-semibold text-zinc-700">
          Modelo {currentIndex + 1} de {totalModels}
        </span>
        <span className="text-[11px] text-zinc-400">
          Usa las flechas ‹ › o arrastra para rotar 3D
        </span>
      </div>
    </div>
  );
};
