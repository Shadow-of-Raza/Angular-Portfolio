'use client';

import React from 'react';
import { Environment } from '@react-three/drei';
import { QualityTier } from './useDeviceTier';

interface SceneEnvironmentProps {
  quality: QualityTier;
}

export default function SceneEnvironment({ quality }: SceneEnvironmentProps) {
  return (
    <>
      {/* Base ambient lighting */}
      <ambientLight intensity={quality === 'high' ? 0.3 : 0.5} />

      {/* Main directional key light (gold tint) */}
      <directionalLight
        position={[8, 10, 5]}
        intensity={quality === 'high' ? 1.8 : 1.2}
        color="#fffaf0"
      />

      {/* Cool fill light (navy tint) */}
      <directionalLight
        position={[-8, -5, -5]}
        intensity={1.0}
        color="#1f3356"
      />

      {/* Highlight point light for extra metallic sheen */}
      <pointLight position={[0, 4, 2]} intensity={1.5} color="#c88b2b" />

      {/* Image-based lighting/reflections for high and medium tiers */}
      {(quality === 'high' || quality === 'medium') && (
        <Environment preset="studio" />
      )}
    </>
  );
}
