import React from 'react';

interface DongSonLogoProps {
  className?: string;
  size?: number;
  highContrast?: boolean;
}

export const DongSonLogo: React.FC<DongSonLogoProps> = ({
  className = 'w-10 h-10',
  size = 40,
  highContrast = false,
}) => {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Biểu trưng Trống Đồng Đông Sơn & Lễ Hội Việt Nam"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          {/* Cinnabar & Royal Lacquer Gradient */}
          <radialGradient
            id="dongsonBg"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor={highContrast ? '#1c1917' : '#991b1b'} />
            <stop offset="60%" stopColor={highContrast ? '#0c0a09' : '#7f1d1d'} />
            <stop offset="100%" stopColor={highContrast ? '#000000' : '#450a0a'} />
          </radialGradient>

          {/* Imperial Gold & Bronze Gradient */}
          <linearGradient
            id="goldBronze"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={highContrast ? '#fef08a' : '#fde047'} />
            <stop offset="45%" stopColor={highContrast ? '#facc15' : '#f59e0b'} />
            <stop offset="100%" stopColor={highContrast ? '#eab308' : '#b45309'} />
          </linearGradient>

          {/* Inner Glow */}
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {/* Outer Circular Rim */}
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="url(#dongsonBg)"
          stroke="url(#goldBronze)"
          strokeWidth="2.5"
        />

        {/* Concentric Decorative Rings */}
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke="url(#goldBronze)"
          strokeWidth="1"
          strokeDasharray="2.5 1.5"
          opacity="0.85"
        />

        <circle
          cx="50"
          cy="50"
          r="36"
          stroke="url(#goldBronze)"
          strokeWidth="1.2"
          opacity="0.9"
        />

        {/* Concentric Ring with Stylized Chim Lạc (Holy Birds) in Flight */}
        <g stroke="url(#goldBronze)" strokeWidth="1.2" strokeLinecap="round" opacity="0.95">
          {/* Bird 1 - North */}
          <path d="M 50 16 Q 58 19 62 25 Q 56 24 50 22 Q 44 24 38 25 Q 42 19 50 16 Z" fill="url(#goldBronze)" />
          {/* Bird 2 - East */}
          <path d="M 84 50 Q 81 58 75 62 Q 76 56 78 50 Q 76 44 75 38 Q 81 42 84 50 Z" fill="url(#goldBronze)" />
          {/* Bird 3 - South */}
          <path d="M 50 84 Q 42 81 38 75 Q 44 76 50 78 Q 56 76 62 75 Q 58 81 50 84 Z" fill="url(#goldBronze)" />
          {/* Bird 4 - West */}
          <path d="M 16 50 Q 19 42 25 38 Q 24 44 22 50 Q 24 56 25 62 Q 19 58 16 50 Z" fill="url(#goldBronze)" />
        </g>

        {/* Middle Ring */}
        <circle
          cx="50"
          cy="50"
          r="26"
          stroke="url(#goldBronze)"
          strokeWidth="1.2"
        />
        <circle
          cx="50"
          cy="50"
          r="24"
          stroke="url(#goldBronze)"
          strokeWidth="0.8"
          strokeDasharray="1.5 1.5"
        />

        {/* 14-Pointed Sacred Solar Star of Dong Son (Ngôi sao mặt trời 14 cánh) */}
        <g fill="url(#goldBronze)">
          {Array.from({ length: 14 }).map((_, i) => {
            const angle = (i * 360) / 14;
            const rad = (angle * Math.PI) / 180;
            const x1 = 50 + Math.cos(rad) * 22;
            const y1 = 50 + Math.sin(rad) * 22;
            const leftRad = ((angle - 12.8) * Math.PI) / 180;
            const rightRad = ((angle + 12.8) * Math.PI) / 180;
            const x2 = 50 + Math.cos(leftRad) * 8;
            const y2 = 50 + Math.sin(leftRad) * 8;
            const x3 = 50 + Math.cos(rightRad) * 8;
            const y3 = 50 + Math.sin(rightRad) * 8;
            return (
              <polygon
                key={i}
                points={`${50},${50} ${x2},${y2} ${x1},${y1} ${x3},${y3}`}
                opacity="0.95"
              />
            );
          })}
        </g>

        {/* Center Sun Core */}
        <circle
          cx="50"
          cy="50"
          r="6.5"
          fill="url(#sunGlow)"
          stroke="url(#goldBronze)"
          strokeWidth="1.2"
        />
        <circle
          cx="50"
          cy="50"
          r="2.5"
          fill="#fff"
        />
      </svg>
    </div>
  );
};
