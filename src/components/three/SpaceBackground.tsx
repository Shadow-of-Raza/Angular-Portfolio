'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import CanvasFallback from '@/components/three/CanvasFallback';

const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), {
  ssr: false,
  loading: () => <CanvasFallback />,
});

export default function SpaceBackground() {
  return <HeroCanvas />;
}
