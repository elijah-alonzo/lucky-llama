'use client';

import { forwardRef, useImperativeHandle, useState } from 'react';
import Image from 'next/image';

interface SpinWheelProps {
  items: string[];
  isSpinning: boolean;
}

export interface SpinWheelRef {
  spin: () => void;
}

const SpinWheel = forwardRef<SpinWheelRef, SpinWheelProps>(({ items, isSpinning }, ref) => {
  const [rotation, setRotation] = useState(0);

  useImperativeHandle(ref, () => ({
    spin: () => {
      const randomRotation = Math.floor(Math.random() * 360) + 720; // At least 2 full rotations
      setRotation(prev => prev + randomRotation);
    }
  }));

  // Generate colors for each segment
  const getSegmentColor = (index: number) => {
    const colors = [
      '#4b2f53',
      '#371843',
    ];
    return colors[index % colors.length];
  };

  const getTextColor = (bgColor: string) => {
    // Return dark text for light backgrounds, light text for dark backgrounds
    const lightColors = ['#fffd30', '#ffeaa7', '#f7dc6f'];
    return lightColors.includes(bgColor) ? '#371843' : '#ffffff';
  };

  // Calculate segment angle
  const segmentAngle = 360 / Math.max(items.length, 1);

  // Create SVG path for each segment
  const createSegmentPath = (index: number) => {
    const angle = segmentAngle;
    const startAngle = index * angle;
    const endAngle = startAngle + angle;
    
    const radius = 160;
    const centerX = 160;
    const centerY = 160;
    
    const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
    const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
    const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
    const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  // Calculate text position
  const getTextPosition = (index: number) => {
    const angle = segmentAngle;
    const midAngle = (index * angle + angle / 2) * Math.PI / 180;
    const textRadius = 100;
    const centerX = 160;
    const centerY = 160;
    
    const x = centerX + textRadius * Math.cos(midAngle);
    const y = centerY + textRadius * Math.sin(midAngle);
    
    return { x, y, rotation: (index * angle + angle / 2) };
  };

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center w-96 h-96 mx-auto">
        <div 
          className="w-80 h-80 rounded-full border-4 flex items-center justify-center"
          style={{ borderColor: '#fffd30', backgroundColor: 'rgba(255, 253, 48, 0.1)' }}
        >
          <p className="text-white text-center px-8">
            Add items to the wheel using the floating button below!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-[480px] h-[480px] lg:w-[600px] lg:h-[600px] mx-auto relative">
      {/* Pointer */}
      <div 
        className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10"
        style={{ width: '0', height: '0' }}
      >
        <div 
          style={{
            width: '0',
            height: '0',
            borderLeft: '25px solid transparent',
            borderRight: '25px solid transparent',
            borderTop: '50px solid #fffd30',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
          }}
        />
      </div>

      {/* Wheel */}
      <div 
        className={`w-[450px] h-[450px] lg:w-[550px] lg:h-[550px] rounded-full border-6 lg:border-8 ${isSpinning ? 'wheel-spinning' : ''}`}
        style={{ 
          borderColor: '#fffd30',
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? 'transform 3.5s cubic-bezier(0.23, 1, 0.32, 1)' : 'none'
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 320 320">
          {items.map((item, index) => {
            const segmentColor = getSegmentColor(index);
            const textColor = getTextColor(segmentColor);
            const textPos = getTextPosition(index);
            
            return (
              <g key={index}>
                {/* Segment */}
                <path
                  d={createSegmentPath(index)}
                  fill={segmentColor}
                />
                
                {/* Text */}
                <text
                  x={textPos.x}
                  y={textPos.y}
                  fill={textColor}
                  fontSize="10"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${textPos.rotation}, ${textPos.x}, ${textPos.y})`}
                  className="select-none"
                >
                  {item.length > 8 ? `${item.substring(0, 8)}...` : item}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Center Circle */}
      <div 
        className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 lg:w-28 lg:h-28 rounded-full border-4 flex items-center justify-center"
        style={{ backgroundColor: '#371843', borderColor: '#fffd30' }}
      >
        <Image
          src="/lucky-llama-logo.png"
          alt="Lucky Llama"
          width={60}
          height={60}
          className="lg:w-16 lg:h-16 rounded-full object-contain"
        />
      </div>
    </div>
  );
});

SpinWheel.displayName = 'SpinWheel';

export default SpinWheel;