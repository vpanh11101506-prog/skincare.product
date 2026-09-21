import React from 'react';

interface AlpsIconProps {
  className?: string;
  size?: number;
  color?: string;
  secondaryColor?: string;
}

/**
 * Biểu tượng ALPS PURE ESSENCE thiên nhiên thuần khiết:
 * - Hòa quyện giữa dãy núi tuyết Alps Thụy Sĩ hùng vĩ và thảo mộc tự nhiên sống động (Living Alpine Botanica)
 * - Đỉnh núi tuyết nhọn thanh thoát kiêu hãnh với sống núi uốn lượn tự nhiên theo địa hình
 * - Tầng núi tuyết xa đan xen thung lũng hữu cơ
 * - Nhánh lá thảo mộc hữu cơ tự nhiên (Edelweiss & thảo dược sông băng) vươn mình mềm mại với gân lá và chồi non
 * - Giọt sương / tinh chất sông băng (Pure Essence Droplet) trong suốt, căng mọng tự nhiên
 * - Đường chân núi và dòng nước khoáng băng tuyết thanh lịch
 */
export const AlpsIcon: React.FC<AlpsIconProps> = ({
  className = 'w-12 h-8',
  size,
  color,
  secondaryColor,
}) => {
  // Tự động phân bổ màu sắc thiên nhiên hữu cơ hài hòa
  const isLightTextOnDark = color === '#fed8c9' || color === '#ffffff' || color === 'white';
  // Núi tuyết tầng sau & ánh bình minh: sắc vàng cát ánh kim rạng rỡ
  const mountainGold = secondaryColor || (isLightTextOnDark ? '#d9b775' : '#c5a059');
  // Thảo mộc, lá, chồi non & đỉnh núi chính: sắc rêu sẫm Alpine tự nhiên hoặc màu chỉ định
  const botanicalForest = color || (isLightTextOnDark ? '#fed8c9' : '#2b3d32');

  return (
    <svg
      viewBox="0 0 120 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: (size * 72) / 120 } : undefined}
    >
      {/* 1. DÃY NÚI TUYẾT XA (Ánh bình minh vàng kim / Núi tuyết tầng sau) */}
      <path
        d="M6 56 L22 26 L38 52"
        stroke={mountainGold}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <path
        d="M82 52 L98 26 L114 56"
        stroke={mountainGold}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <path
        d="M30 46 L46 18 L58 34"
        stroke={mountainGold}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      />
      <path
        d="M62 34 L74 18 L90 46"
        stroke={mountainGold}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      />

      {/* 2. VÁCH NÚI CHÍNH SHADOW FACET (Khối 3D tự nhiên) */}
      <path
        d="M60 8 L66 20 L74 32 L82 44 L92 56 L60 56 L58 42 L62 30 L59 18 Z"
        fill={botanicalForest}
        fillOpacity={isLightTextOnDark ? '0.2' : '0.12'}
      />

      {/* 3. ĐỈNH NÚI CHÍNH ALPS (Matterhorn hùng vĩ - Nét sắc sảo tự nhiên) */}
      <path
        d="M28 56 L38 44 L46 32 L54 20 L60 8 L66 20 L74 32 L82 44 L92 56"
        stroke={botanicalForest}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Sống núi trung tâm chia vách sáng - tối */}
      <path
        d="M60 8 L59 18 L62 30 L58 42 L60 56"
        stroke={botanicalForest}
        strokeWidth="2.0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 4. HAI ĐỈNH NÚI KỀ BÊN (Cân bằng bố cục tự nhiên) */}
      {/* Đỉnh trái */}
      <path
        d="M16 56 L28 36 L36 22 L45 34"
        stroke={botanicalForest}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36 22 L34 38 L32 56"
        stroke={botanicalForest}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Đỉnh phải */}
      <path
        d="M75 34 L84 22 L92 36 L104 56"
        stroke={botanicalForest}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M84 22 L86 38 L88 56"
        stroke={botanicalForest}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 5. ĐƯỜNG TUYẾT & KHE NỨT ĐÁ VÙNG ALPS */}
      <path
        d="M59 18 L53 23 M57 27 L50 33 M59 36 L46 44 M58 43 L42 51"
        stroke={mountainGold}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M61 22 L67 25 M63 32 L73 37 M60 43 L78 48"
        stroke={botanicalForest}
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* 6. RỪNG THÔNG THIÊN NHIÊN ALPS (Conifers tại chân núi) */}
      <path
        d="M18 43 L21 47 L20 47 L22 51 L21 51 L23 56 L13 56 L15 51 L14 51 L16 47 L15 47 Z"
        fill={botanicalForest}
        fillOpacity={isLightTextOnDark ? '0.7' : '0.8'}
      />
      <path
        d="M26 39 L29 44 L28 44 L30 49 L29 49 L31 56 L21 56 L23 49 L22 49 L24 44 L23 44 Z"
        fill={botanicalForest}
        fillOpacity={isLightTextOnDark ? '0.7' : '0.8'}
      />
      <path
        d="M94 39 L97 44 L96 44 L98 49 L97 49 L99 56 L89 56 L91 49 L90 49 L92 44 L91 44 Z"
        fill={botanicalForest}
        fillOpacity={isLightTextOnDark ? '0.7' : '0.8'}
      />
      <path
        d="M102 43 L105 47 L104 47 L106 51 L105 51 L107 56 L97 56 L99 51 L98 51 L100 47 L99 47 Z"
        fill={botanicalForest}
        fillOpacity={isLightTextOnDark ? '0.7' : '0.8'}
      />

      {/* 7. DÒNG SUỐI KHOÁNG SÔNG BĂNG TINH KHIẾT (Glacier Springs) */}
      <path
        d="M10 60 C 35 58, 50 62, 75 59 C 90 57, 105 60, 110 59"
        stroke={mountainGold}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M22 64 C 45 62, 60 66, 85 63 C 95 62, 102 64, 106 63"
        stroke={botanicalForest}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* 8. MẦM THẢO MỘC HỮU CƠ & GIỌT SƯƠNG TINH CHẤT (Pure Essence) */}
      <path
        d="M60 56 C 58 51, 53 47, 49 48 C 49 53, 53 56, 58 56 Z"
        fill={botanicalForest}
        fillOpacity={isLightTextOnDark ? '0.9' : '0.85'}
      />
      <path
        d="M60 56 C 62 51, 67 47, 71 48 C 71 53, 67 56, 62 56 Z"
        fill={botanicalForest}
        fillOpacity={isLightTextOnDark ? '0.9' : '0.85'}
      />
      <path
        d="M60 50 C 60 50, 62 52.5, 62 54 C 62 55.2, 61 56, 60 56 C 59 56, 58 55.2, 58 54 C 58 52.5, 60 50, 60 50 Z"
        fill={mountainGold}
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
