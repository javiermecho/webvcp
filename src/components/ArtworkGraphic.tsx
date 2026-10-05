import React from 'react';
import { ProductModel, ProductColor } from '../types';

interface ArtworkGraphicProps {
  model: ProductModel;
  color: ProductColor;
  className?: string;
}

export const ArtworkGraphic: React.FC<ArtworkGraphicProps> = ({ model, color, className = '' }) => {
  const isDarkShirt = color.isDark;
  const { printDesign } = model;

  // Primary ink color based on contrast
  let inkColor = isDarkShirt ? '#F5F5F0' : '#1A1A1A';
  let secondaryInkColor = isDarkShirt ? '#A1A1AA' : '#52525B';
  let accentColor = printDesign.accentColor || (isDarkShirt ? '#FBBF24' : '#D97706');

  // Specific overrides per design
  if (model.id === 6) {
    // JESUS graffiti spray
    inkColor = '#FF6A00';
    accentColor = '#FF8C38';
    secondaryInkColor = '#FFA05C';
  } else if (model.id === 8) {
    // Model 8: White shirt -> Blue print, Black shirt -> White print
    inkColor = isDarkShirt ? '#F8FAFC' : '#1D4ED8';
    secondaryInkColor = isDarkShirt ? '#CBD5E1' : '#3B82F6';
  } else if (model.id === 19) {
    // Yeshua Lion: gold/warm tones
    inkColor = isDarkShirt ? '#FDE68A' : '#78350F';
    accentColor = '#F59E0B';
  } else if (model.id === 3) {
    // Hibiscus
    inkColor = isDarkShirt ? '#F5EDE4' : '#3E2723';
    accentColor = isDarkShirt ? '#E0A98B' : '#B25D38';
  } else if (model.id === 22) {
    // Pink birds
    inkColor = '#831843';
    secondaryInkColor = '#9D174D';
  }

  // Render specific iconography per model
  const renderIcon = () => {
    switch (printDesign.iconType) {
      case 'retro-flowers':
        return (
          <svg viewBox="0 0 100 100" className="w-16 h-16 mx-auto mb-2 opacity-90 drop-shadow-sm">
            <g fill={inkColor} stroke="none">
              <circle cx="50" cy="50" r="10" fill={accentColor} />
              <path d="M50 18 C55 30 55 38 50 40 C45 38 45 30 50 18 Z" />
              <path d="M50 82 C55 70 55 62 50 60 C45 62 45 70 50 82 Z" />
              <path d="M18 50 C30 55 38 55 40 50 C38 45 30 45 18 50 Z" />
              <path d="M82 50 C70 55 62 55 60 50 C62 45 70 45 82 50 Z" />
              <path d="M28 28 C39 37 44 43 42 47 C38 45 32 40 28 28 Z" />
              <path d="M72 72 C61 63 56 57 58 53 C62 55 68 60 72 72 Z" />
              <path d="M28 72 C37 61 43 56 47 58 C45 62 40 68 28 72 Z" />
              <path d="M72 28 C63 39 57 44 53 42 C55 38 60 32 72 28 Z" />
            </g>
          </svg>
        );

      case 'sunflower':
        return (
          <svg viewBox="0 0 100 100" className="w-16 h-16 mx-auto mb-2 opacity-90">
            <circle cx="50" cy="50" r="14" fill={accentColor} />
            <g stroke={inkColor} strokeWidth="2.5" fill="none">
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <path
                  key={deg}
                  d="M50 32 C46 22 54 22 50 32"
                  transform={`rotate(${deg} 50 50)`}
                  fill={inkColor}
                  opacity="0.85"
                />
              ))}
            </g>
            <circle cx="50" cy="50" r="8" fill="#523B1E" />
          </svg>
        );

      case 'hibiscus-flower':
        return (
          <svg viewBox="0 0 100 100" className="w-16 h-16 mx-auto mb-2 opacity-90">
            <g fill="none" stroke={inkColor} strokeWidth="2.5" strokeLinecap="round">
              <path d="M50 50 Q30 20 50 15 Q70 20 50 50" fill={accentColor} fillOpacity="0.25" />
              <path d="M50 50 Q80 35 85 55 Q75 75 50 50" fill={accentColor} fillOpacity="0.25" />
              <path d="M50 50 Q70 85 50 85 Q30 85 50 50" fill={accentColor} fillOpacity="0.25" />
              <path d="M50 50 Q15 65 20 45 Q25 25 50 50" fill={accentColor} fillOpacity="0.25" />
              <path d="M50 50 Q65 15 75 10" stroke={inkColor} strokeWidth="3" />
              <circle cx="75" cy="10" r="3" fill={accentColor} />
            </g>
          </svg>
        );

      case 'redemption-symbols':
        return (
          <div className="flex items-center justify-center gap-3 my-2 opacity-95">
            {/* Palm */}
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke={inkColor} strokeWidth="1.8">
              <path d="M12 22C12 14 18 8 20 4C14 6 12 12 12 22Z" />
              <path d="M12 15C8 12 5 13 3 15C7 16 10 18 12 22" />
            </svg>
            {/* Crown */}
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke={inkColor} strokeWidth="1.8">
              <path d="M3 18h18L19 7l-5 4-2-6-2 6-5-4L3 18z" />
            </svg>
            {/* Cross */}
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke={inkColor} strokeWidth="2">
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="6" y1="8" x2="18" y2="8" />
            </svg>
            {/* Empty tomb arc */}
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke={inkColor} strokeWidth="1.8">
              <path d="M4 20h16M6 20V12a6 6 0 0 1 12 0v8" />
              <circle cx="16" cy="17" r="3" stroke={inkColor} />
            </svg>
          </div>
        );

      case 'graffiti-tag':
        return (
          <div className="relative my-2">
            <span
              className="text-4xl md:text-5xl font-black tracking-widest uppercase italic block"
              style={{
                color: inkColor,
                textShadow: `0 0 12px ${accentColor}, 0 0 24px rgba(255,106,0,0.5)`,
                fontFamily: 'Impact, Arial Black, sans-serif',
              }}
            >
              JESUS
            </span>
            <div className="h-1 w-24 mx-auto rounded-full mt-1 bg-gradient-to-r from-transparent via-[#FF6A00] to-transparent" />
          </div>
        );

      case 'brain-heart':
        return (
          <svg viewBox="0 0 100 60" className="w-20 h-12 mx-auto mb-2 opacity-95">
            <g fill="none" stroke={inkColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              {/* Left Brain */}
              <path d="M47 15 C35 15 28 22 28 32 C28 42 35 48 47 48" />
              <path d="M32 26 C37 28 41 24 47 28" />
              <path d="M30 35 C38 35 41 40 47 38" />
              {/* Divider */}
              <line x1="50" y1="12" x2="50" y2="52" stroke={accentColor} strokeWidth="1.5" strokeDasharray="3,3" />
              {/* Right Heart */}
              <path d="M53 18 C58 12 68 12 73 18 C78 24 75 32 53 48" />
              <path d="M53 28 Q65 24 68 34" stroke={inkColor} strokeWidth="1.5" />
            </g>
          </svg>
        );

      case 'lost-sheep':
        return (
          <svg viewBox="0 0 100 80" className="w-16 h-14 mx-auto mb-2 opacity-95">
            <g fill="none" stroke={inkColor} strokeWidth="2.2" strokeLinecap="round">
              {/* Sheep cloud body */}
              <path d="M35 50 C25 50 20 40 25 32 C25 24 35 20 42 24 C46 16 60 16 66 22 C74 20 80 28 78 36 C82 44 76 52 68 50 Z" />
              {/* Legs */}
              <line x1="38" y1="50" x2="38" y2="60" />
              <line x1="46" y1="50" x2="46" y2="58" />
              <line x1="60" y1="50" x2="60" y2="60" />
              <line x1="68" y1="50" x2="68" y2="58" />
              {/* Head */}
              <circle cx="28" cy="30" r="7" fill={inkColor} />
            </g>
          </svg>
        );

      case 'lion-of-judah':
        return (
          <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto mb-2 opacity-95">
            <g fill="none" stroke={inkColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {/* Mane stylized lines */}
              <path d="M50 15 L56 26 L68 20 L66 32 L78 32 L70 42 L80 48 L68 54 L74 66 L60 64 L58 76 L50 68 L42 76 L40 64 L26 66 L32 54 L20 48 L30 42 L22 32 L34 32 L32 20 L44 26 Z" stroke={accentColor} strokeWidth="1.5" />
              {/* Face */}
              <path d="M40 38 L46 45 L50 42 L54 45 L60 38" />
              <polygon points="46,55 54,55 50,60" fill={inkColor} />
              <line x1="50" y1="60" x2="50" y2="65" />
              <path d="M44 64 Q50 68 56 64" />
              {/* Crown above */}
              <path d="M43 20 L46 15 L50 18 L54 15 L57 20" stroke={accentColor} strokeWidth="2" />
            </g>
          </svg>
        );

      case 'storm-sea':
        return (
          <svg viewBox="0 0 100 60" className="w-20 h-12 mx-auto mb-2 opacity-90">
            <g fill="none" stroke={inkColor} strokeWidth="2" strokeLinecap="round">
              <path d="M15 35 Q30 15 45 35 T75 35 T95 35" />
              <path d="M20 45 Q35 28 50 45 T80 45" strokeOpacity="0.7" />
              {/* Peace beacon / ray */}
              <line x1="50" y1="8" x2="50" y2="24" stroke={accentColor} strokeWidth="2" />
              <circle cx="50" cy="8" r="2.5" fill={accentColor} />
            </g>
          </svg>
        );

      case 'dino-cross':
        return (
          <svg viewBox="0 0 100 80" className="w-16 h-14 mx-auto mb-2 opacity-95">
            <g fill="none" stroke={inkColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              {/* Cute little T-Rex silhouette */}
              <path d="M25 45 C25 25 35 15 50 15 L62 15 L65 24 L56 24 L56 30 C65 35 70 42 70 54 L62 54 L60 65 L52 65 L53 54 L44 54 L42 65 L34 65 L38 52 C30 52 25 48 20 54 C15 58 10 58 8 56 C15 48 22 45 25 45 Z" />
              {/* Eye */}
              <circle cx="56" cy="19" r="1.5" fill={inkColor} />
              {/* Holding small cross */}
              <line x1="48" y1="36" x2="48" y2="48" stroke={accentColor} strokeWidth="2" />
              <line x1="44" y1="40" x2="52" y2="40" stroke={accentColor} strokeWidth="2" />
            </g>
          </svg>
        );

      case 'dual-crown':
        return (
          <svg viewBox="0 0 100 70" className="w-18 h-14 mx-auto mb-2 opacity-95">
            <g fill="none" stroke={inkColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {/* Crown of Thorns */}
              <ellipse cx="50" cy="42" rx="28" ry="12" strokeDasharray="6,4" />
              <line x1="30" y1="42" x2="26" y2="46" />
              <line x1="70" y1="42" x2="74" y2="38" />
              <line x1="42" y1="52" x2="40" y2="56" />
              <line x1="58" y1="32" x2="60" y2="28" />
              {/* Royal Crown intertwined */}
              <path d="M30 34 L35 20 L50 26 L65 20 L70 34 Z" stroke={accentColor} strokeWidth="2.2" />
              <circle cx="50" cy="18" r="2" fill={accentColor} />
            </g>
          </svg>
        );

      case 'alpha-omega-circle':
        return (
          <svg viewBox="0 0 100 100" className="w-18 h-18 mx-auto mb-2 opacity-95">
            <circle cx="50" cy="50" r="38" fill="none" stroke={inkColor} strokeWidth="1.8" strokeDasharray="3,3" />
            <text x="35" y="58" fill={inkColor} fontSize="24" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">Α</text>
            <text x="50" y="56" fill={accentColor} fontSize="14" fontWeight="bold" textAnchor="middle">&</text>
            <text x="65" y="58" fill={inkColor} fontSize="24" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">Ω</text>
          </svg>
        );

      case 'linear-heart':
        return (
          <svg viewBox="0 0 100 70" className="w-16 h-12 mx-auto mb-2 opacity-95">
            <path
              d="M50 22 C40 8 20 12 20 28 C20 44 42 58 50 64 C58 58 80 44 80 28 C80 12 60 8 50 22 Z"
              fill="none"
              stroke={inkColor}
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <line x1="50" y1="30" x2="50" y2="48" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
            <line x1="42" y1="36" x2="58" y2="36" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case 'faith-cross-word':
        return (
          <div className="flex flex-col items-center justify-center my-2">
            <svg viewBox="0 0 40 70" className="w-10 h-16 opacity-95">
              <line x1="20" y1="4" x2="20" y2="66" stroke={inkColor} strokeWidth="3.5" strokeLinecap="round" />
              <line x1="6" y1="20" x2="34" y2="20" stroke={inkColor} strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </div>
        );

      case 'pulse-cross-heart':
        return (
          <svg viewBox="0 0 120 50" className="w-24 h-12 mx-auto mb-2 opacity-95">
            <g fill="none" stroke={inkColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 25 L30 25 L35 15 L42 38 L48 8 L54 32 L60 25 L75 25" />
              {/* Cross */}
              <line x1="86" y1="16" x2="86" y2="34" stroke={accentColor} strokeWidth="2.5" />
              <line x1="80" y1="22" x2="92" y2="22" stroke={accentColor} strokeWidth="2.5" />
              {/* Mini heart */}
              <path d="M102 20 C99 15 94 17 94 22 C94 28 102 33 102 33 C102 33 110 28 110 22 C110 17 105 15 102 20 Z" stroke={inkColor} fill="none" />
            </g>
          </svg>
        );

      case 'flying-birds':
        return (
          <svg viewBox="0 0 100 50" className="w-16 h-10 mx-auto mb-2 opacity-90">
            <g fill="none" stroke={inkColor} strokeWidth="2.2" strokeLinecap="round">
              <path d="M20 25 Q28 18 36 25 Q44 18 52 25" />
              <path d="M55 15 Q61 9 67 15 Q73 9 79 15" strokeWidth="1.8" />
              <path d="M68 32 Q72 27 76 32 Q80 27 84 32" strokeWidth="1.5" />
            </g>
          </svg>
        );

      case 'torch-light':
        return (
          <svg viewBox="0 0 100 80" className="w-16 h-14 mx-auto mb-2 opacity-95">
            <g fill="none" stroke={inkColor} strokeWidth="2" strokeLinecap="round">
              {/* Light rays */}
              <line x1="50" y1="10" x2="50" y2="18" stroke={accentColor} strokeWidth="2.5" />
              <line x1="30" y1="20" x2="36" y2="26" stroke={accentColor} strokeWidth="2" />
              <line x1="70" y1="20" x2="64" y2="26" stroke={accentColor} strokeWidth="2" />
              {/* Flame */}
              <path d="M50 20 C42 26 44 36 50 42 C56 36 58 26 50 20 Z" fill={accentColor} fillOpacity="0.4" stroke={inkColor} />
              {/* Salt shaker / modern base */}
              <path d="M42 44 L58 44 L55 68 L45 68 Z" stroke={inkColor} strokeWidth="2" />
              <circle cx="48" cy="54" r="1" fill={inkColor} />
              <circle cx="52" cy="54" r="1" fill={inkColor} />
              <circle cx="50" cy="60" r="1" fill={inkColor} />
            </g>
          </svg>
        );

      case 'mountain-truck':
        return (
          <svg viewBox="0 0 100 70" className="w-20 h-14 mx-auto mb-2 opacity-95">
            <g fill="none" stroke={inkColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {/* Mountains in background */}
              <path d="M12 44 L32 20 L52 44" strokeOpacity="0.6" />
              <path d="M42 44 L62 14 L88 44" strokeOpacity="0.8" />
              {/* Truck 4x4 */}
              <path d="M26 44 L40 44 L46 34 L66 34 L74 44 L78 44 L78 52 L26 52 Z" fill={isDarkShirt ? '#1f2937' : '#f3f4f6'} />
              {/* Wheels */}
              <circle cx="36" cy="54" r="6" fill={inkColor} stroke="none" />
              <circle cx="68" cy="54" r="6" fill={inkColor} stroke="none" />
              <circle cx="36" cy="54" r="2.5" fill="#fff" stroke="none" />
              <circle cx="68" cy="54" r="2.5" fill="#fff" stroke="none" />
            </g>
          </svg>
        );

      case 'flourishing-plant':
        return (
          <svg viewBox="0 0 100 80" className="w-16 h-14 mx-auto mb-2 opacity-95">
            <g fill="none" stroke={inkColor} strokeWidth="2" strokeLinecap="round">
              {/* Plant stem & leaves */}
              <path d="M50 70 Q50 35 50 18" strokeWidth="2.5" />
              <path d="M50 48 Q35 42 32 32 Q42 34 50 42" fill={accentColor} fillOpacity="0.3" />
              <path d="M50 38 Q65 32 68 22 Q58 24 50 32" fill={accentColor} fillOpacity="0.3" />
              <circle cx="50" cy="18" r="4" fill={accentColor} stroke="none" />
              {/* Roots */}
              <path d="M50 70 Q42 76 38 80" strokeOpacity="0.7" />
              <path d="M50 70 Q58 76 62 80" strokeOpacity="0.7" />
            </g>
          </svg>
        );

      default:
        // Default cross / accent for purely typographic models
        return (
          <div className="w-6 h-6 mx-auto mb-2 flex items-center justify-center opacity-85">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke={accentColor} strokeWidth="2.2">
              <line x1="12" y1="3" x2="12" y2="21" />
              <line x1="5" y1="9" x2="19" y2="9" />
            </svg>
          </div>
        );
    }
  };

  // If model has an uploaded custom PNG image, render it directly on chest
  if (model.customImage) {
    return (
      <div
        className={`select-none text-center flex flex-col items-center justify-center transition-all duration-300 ${className}`}
        style={{ maxWidth: '210px' }}
      >
        <img
          src={model.customImage}
          alt={model.title}
          className="max-h-36 max-w-[190px] object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)]"
          style={{
            filter: 'contrast(1.05)',
          }}
        />
        {printDesign.biblicalQuote && (
          <div className="mt-1 flex items-center gap-1 opacity-75">
            <span
              className="text-[8px] font-mono tracking-widest uppercase font-semibold"
              style={{ color: secondaryInkColor }}
            >
              {printDesign.biblicalQuote}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`select-none text-center flex flex-col items-center justify-center transition-all duration-300 ${className}`}
      style={{
        maxWidth: '220px',
      }}
    >
      {renderIcon()}

      {printDesign.primaryText && (
        <h3
          className={`font-extrabold tracking-wider leading-tight uppercase transition-colors duration-300 ${
            model.id === 6 ? 'hidden' : ''
          }`}
          style={{
            color: inkColor,
            fontSize:
              printDesign.primaryText.length > 25
                ? '10px'
                : printDesign.primaryText.length > 15
                ? '12px'
                : '14px',
            fontFamily: model.id === 3 || model.id === 25 ? 'serif' : 'inherit',
            letterSpacing: '0.08em',
          }}
        >
          {printDesign.primaryText}
        </h3>
      )}

      {printDesign.secondaryText && (
        <p
          className="text-[8px] md:text-[9px] uppercase tracking-widest font-semibold mt-1 max-w-[180px] leading-tight opacity-90 transition-colors duration-300"
          style={{ color: secondaryInkColor }}
        >
          {printDesign.secondaryText}
        </p>
      )}

      {printDesign.biblicalQuote && (
        <div className="mt-1.5 flex items-center gap-1 opacity-75">
          <span className="w-2 h-[1px]" style={{ backgroundColor: secondaryInkColor }} />
          <span
            className="text-[7px] md:text-[8px] font-mono tracking-widest uppercase"
            style={{ color: secondaryInkColor }}
          >
            {printDesign.biblicalQuote}
          </span>
          <span className="w-2 h-[1px]" style={{ backgroundColor: secondaryInkColor }} />
        </div>
      )}
    </div>
  );
};

