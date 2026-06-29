'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useDeviceTier } from './useDeviceTier';
import SceneEnvironment from './SceneEnvironment';
import Hero3DObject from './Hero3DObject';
import CanvasFallback from './CanvasFallback';

export default function HeroCanvas() {
  const tier = useDeviceTier();

  // If fallback tier (or SSR), render the CSS fallback to prevent hydration mismatch and CLS
  if (tier === 'fallback') {
    return <CanvasFallback />;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, // Fixed background layer behind the text content
        pointerEvents: 'none', // Allow clicking through Canvas to reach text/buttons
        backgroundColor: 'transparent',
      }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={tier === 'high' ? [1, 2] : [1, 1.5]}
          shadows={tier !== 'low'}
          gl={{
            antialias: true,
            alpha: true, // Allow transparency to render over the background
            powerPreference: 'high-performance',
            preserveDrawingBuffer: false,
          }}
        >
          {/* Environment lighting & reflections */}
          <SceneEnvironment quality={tier} />

          {/* 3D torus centerpiece & Background Particles */}
          <Hero3DObject quality={tier} />
        </Canvas>
      </Suspense>
    </div>
  );
}
