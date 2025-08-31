'use client';
import React, { useEffect, useState } from 'react';
import Aurora from '@/reactBits/Aurora/Aurora';

interface AnimatedBackgroundProps {
  auroraColors?: string[];
  primaryParticleColor?: string;
  secondaryParticleColor?: string;
  particleDensity?: number;
  auroraAmplitude?: number;
  auroraBlend?: number;
  auroraSpeed?: number;
  auroraMidPoint?: number;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  auroraColors = ['#00D8FF', '#7CFF67', '#00D8FF'],
  auroraAmplitude = 1.0,
  auroraBlend = 0.5,
  auroraSpeed = 0.5,
  auroraMidPoint = 0.05,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className='fixed inset-0 w-full h-full overflow-hidden'>
      <div className='absolute inset-0 -z-10'>
        {isMounted && (
          <Aurora
            colorStops={auroraColors}
            amplitude={auroraAmplitude}
            blend={auroraBlend}
            speed={auroraSpeed}
            midPoint={auroraMidPoint}
          />
        )}
      </div>
    </div>
  );
};

export default AnimatedBackground;
