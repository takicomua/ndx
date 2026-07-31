"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Component, useRef, useState, type ReactNode } from "react";
import type { Mesh } from "three";

function WireCore() {
  const ref = useRef<Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.22;
    ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.35) * 0.12;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.35, 0]} />
      <meshStandardMaterial
        color="#e8e6e1"
        wireframe
        transparent
        opacity={0.32}
      />
    </mesh>
  );
}

class CoreBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export function HeroCore() {
  const [ok, setOk] = useState(true);
  if (!ok) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 opacity-40 sm:opacity-50 lg:left-[28%] lg:opacity-60"
      aria-hidden
    >
      <CoreBoundary>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 4.2], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
          onError={() => setOk(false)}
          fallback={null}
        >
          <WireCore />
          <ambientLight intensity={0.55} />
          <directionalLight position={[3, 2, 4]} intensity={0.7} />
        </Canvas>
      </CoreBoundary>
    </div>
  );
}
