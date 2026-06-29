'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { TorusKnot } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { QualityTier } from './useDeviceTier';

interface Hero3DObjectProps {
  quality: QualityTier;
}

export default function Hero3DObject({ quality }: Hero3DObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  // Track mouse coordinates for desktop parallax
  useEffect(() => {
    if (typeof window === 'undefined' || quality === 'low' || quality === 'fallback') return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinate limits [-1, 1]
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [quality]);

  // Set up GSAP ScrollTrigger timeline to choreograph 3D positions per section
  useEffect(() => {
    if (!meshRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const mesh = meshRef.current;

    // Create a master scroll timeline for the 3D centerpiece
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#app-root',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5, // Lerp scrubbing for premium damping
      },
    });

    // Morph object positioning between sections
    // Hero -> About
    tl.to(mesh.position, { x: 2, y: -0.5, z: -1 }, 0)
      .to(mesh.rotation, { x: Math.PI, y: Math.PI / 2, z: 0 }, 0)
      .to(mesh.scale, { x: 0.8, y: 0.8, z: 0.8 }, 0);

    // About -> Skills
    tl.to(mesh.position, { x: -2, y: -0.8, z: -2 }, 1)
      .to(mesh.rotation, { x: 0, y: Math.PI * 1.5, z: Math.PI / 4 }, 1)
      .to(mesh.scale, { x: 0.7, y: 0.7, z: 0.7 }, 1);

    // Skills -> Experience
    tl.to(mesh.position, { x: 1.5, y: -0.5, z: -1 }, 2)
      .to(mesh.rotation, { x: Math.PI / 3, y: Math.PI * 2, z: Math.PI / 6 }, 2)
      .to(mesh.scale, { x: 0.9, y: 0.9, z: 0.9 }, 2);

    // Experience -> Projects
    tl.to(mesh.position, { x: 0, y: 0, z: -4 }, 3)
      .to(mesh.rotation, { x: -Math.PI / 4, y: Math.PI * 2.5, z: 0 }, 3)
      .to(mesh.scale, { x: 1.2, y: 1.2, z: 1.2 }, 3);

    // Projects -> Contact
    tl.to(mesh.position, { x: -1.8, y: -0.2, z: -1.5 }, 4)
      .to(mesh.rotation, { x: Math.PI / 2, y: Math.PI * 3, z: Math.PI / 4 }, 4)
      .to(mesh.scale, { x: 0.75, y: 0.75, z: 0.75 }, 4);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Frame update loop for floating idle and mouse parallax lerps
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const mesh = meshRef.current;
    timeRef.current += delta;
    const elapsedTime = timeRef.current;

    // 1. Idle Float Animation (Sine-based)
    // Reduce amplitude for low quality or reduced motion
    const floatAmplitude = quality === 'low' ? 0.05 : 0.15;
    const floatFrequency = 1.2;
    mesh.position.y += Math.sin(elapsedTime * floatFrequency) * 0.001 * floatAmplitude;

    // 2. Mouse Parallax Lerping (Desktop only)
    if (quality !== 'low' && quality !== 'fallback') {
      const targetRotationX = mouseRef.current.y * 0.4;
      const targetRotationY = mouseRef.current.x * 0.4;

      // Critically damped lerp toward mouse targets
      mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, mesh.rotation.x + targetRotationX * 0.1, 0.05);
      mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, mesh.rotation.y + targetRotationY * 0.1, 0.05);
    } else {
      // Simple rotation for low tier
      mesh.rotation.y += 0.003;
    }
  });

  // Parameterize TorusKnot segments based on quality tier (performance budget)
  const knotArguments: [number, number, number, number] = 
    quality === 'high' ? [1.2, 0.38, 256, 32] :
    quality === 'medium' ? [1.2, 0.38, 128, 16] :
    [1.2, 0.38, 64, 8];

  return (
    <TorusKnot
      ref={meshRef}
      args={knotArguments}
      castShadow
      receiveShadow
    >
      <meshPhysicalMaterial
        color="#c88b2b" // Premium gold accent
        metalness={0.95}
        roughness={quality === 'high' ? 0.18 : 0.25}
        clearcoat={quality === 'high' ? 1.0 : 0.5}
        clearcoatRoughness={0.1}
        reflectivity={1.0}
        iridescence={quality === 'high' ? 0.4 : 0}
        iridescenceIOR={1.8}
      />
    </TorusKnot>
  );
}
