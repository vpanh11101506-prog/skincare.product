import React from 'react';

interface AlpsIconProps {
  className?: string;
  size?: number;
  color?: string;
  secondaryColor?: string;
}

/**
 * Biểu tượng dãy núi ALPS ngọn núi nhọn nguyên bản:
 * - Các đỉnh núi nhọn sắc sảo đặc trưng của dãy Alps Thụy Sĩ (Sharp pointed Alpine peaks)
 * - Đỉnh chính nhọn hùng vĩ vươn cao với vết nếp gấp sườn núi (fissure ridge)
 * - Rặng núi nhọn tiền cảnh đan xen
 * - Chiếc lá thảo mộc hữu cơ và giọt sương tinh chất thuần khiết (Pure Essence)
 */
export const AlpsIcon: React.FC<AlpsIconProps> = ({
  className = 'w-10 h-7',
  size,
  color,
  secondaryColor,
}) => {
  // Sắc vàng cát ánh kim sườn núi sau
  const backPeakColor = secondaryColor || (color ? color : '#d9b775');
  // Sắc rêu hoặc charcoal hoặc màu chỉ định cho rặng núi trước và lá
  const frontPeakColor = color || '#3b5a45';

  return (
    <svg
      viewBox="0 0 200 125"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: (size * 125) / 200 } : undefined}
    >
      {/* 1. DÃY NÚI VÀNG CÁT ALPS NGỌN NÚI NHỌN Ở PHÍA SAU */}
      <path
        d="M45 88 L58 75 L67 80 L76 68 L84 72 L93 54 L98 56 L101 28 L108 42 L116 38 L126 55 L132 49 L143 65 L151 76"
        stroke={backPeakColor}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="miter"
      />
      
      {/* Rãnh nứt / Nếp gấp sườn đỉnh núi nhọn chính */}
      <path
        d="M101 28 L98 46 L91 55"
        stroke={backPeakColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="miter"
      />

      {/* 2. RẶNG NÚI NHỌN Ở PHÍA TRƯỚC */}
      <path
        d="M33 89 L42 78 L50 70 L59 84 L67 55 L75 74 L80 66 L98 87 L114 89 L125 89"
        stroke={frontPeakColor}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="miter"
      />

      {/* 3. CHIẾC LÁ HỮU CƠ TỰ NHIÊN */}
      <path
        d="M124 89 C119 74 124 55 152 47 C155 64 148 83 125 89 Z"
        stroke={frontPeakColor}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Gân lá */}
      <path
        d="M128 84 C134 74 142 63 150 50"
        stroke={frontPeakColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* 4. GIỌT SƯƠNG / TINH CHẤT RƠI DƯỚI BẦU LÁ */}
      <path
        d="M154 74 C154 74 161 82 161 87 C161 91 158 94 154 94 C150 94 147 91 147 87 C147 82 154 74 154 74 Z"
        stroke={frontPeakColor}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

interface AlpsLogoProps {
  variant?: 'full' | 'icon' | 'stacked';
  className?: string;
  textColor?: string;
  iconColor?: string;
  subtitle?: string;
}

export const AlpsLogo: React.FC<AlpsLogoProps> = ({
  variant = 'full',
  className = '',
  textColor = 'text-[#1c1c19]',
  iconColor,
  subtitle = 'PURE ESSENCE',
}) => {
  if (variant === 'icon') {
    return <AlpsIcon className={className || 'w-10 h-7'} color={iconColor} />;
  }

  return (
    <div className={`flex flex-col items-center justify-center select-none text-center ${className}`}>
      {/* Biểu tượng Dãy Núi Alps mềm mại tối giản */}
      <AlpsIcon
        className="w-11 sm:w-13 h-7 sm:h-8 transition-transform duration-300 group-hover:scale-105"
        color={iconColor}
      />

      {/* Tên thương hiệu ALPS sang trọng */}
      <div className={`font-serif text-xl sm:text-2xl font-normal tracking-[0.28em] ${textColor} leading-tight mt-1 pl-1`}>
        ALPS
      </div>

      {subtitle && (
        <span className="text-[8px] sm:text-[9px] tracking-[0.24em] text-[#74584d] font-semibold uppercase mt-0.5">
          {subtitle}
        </span>
      )}
    </div>
  );
};
