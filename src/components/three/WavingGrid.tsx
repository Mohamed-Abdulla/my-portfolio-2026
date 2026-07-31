"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Custom shader material for GPU-accelerated wave deformation
const WaveGridShader = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColor: { value: new THREE.Color("#8b5cf6") }, // Base primary (Electric Violet)
    uAccentColor: { value: new THREE.Color("#06b6d4") }, // Accent secondary (Cyber Cyan)
  },
  vertexShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Calculate 3D waving sine/cosine grid terrain
      float elevation = sin(pos.x * 0.12 + uTime * 0.8) * 
                        cos(pos.y * 0.12 + uTime * 0.8) * 2.2;
      
      // Dynamic mouse cursor collision ripple
      float dist = distance(pos.xy, uMouse * 45.0);
      if (dist < 18.0) {
        float factor = (18.0 - dist) / 18.0;
        elevation += sin(uTime * 3.5 - dist * 0.4) * factor * 3.2;
      }
      
      pos.z += elevation;
      vElevation = elevation;
      
      vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      gl_Position = projectedPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    uniform vec3 uAccentColor;
    varying float vElevation;

    void main() {
      // Interpolate colors based on vertex elevation height
      float strength = (vElevation + 2.5) / 5.0;
      vec3 color = mix(uColor, uAccentColor, clamp(strength, 0.0, 1.0));
      
      gl_FragColor = vec4(color, 0.16); // Faded alpha grid lines
    }
  `,
};

function GridMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { mouse, viewport } = useThree();

  // Custom uniforms setup
  const uniforms = useMemo(() => {
    return THREE.UniformsUtils.clone(WaveGridShader.uniforms);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (materialRef.current) {
      // Stream elapsed clock time to vertex waves
      materialRef.current.uniforms.uTime.value = time;

      // Map pointer screen coordinates to mesh coordinates
      materialRef.current.uniforms.uMouse.value.x = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMouse.value.x,
        mouse.x * (viewport.width / 2),
        0.1,
      );
      materialRef.current.uniforms.uMouse.value.y = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMouse.value.y,
        mouse.y * (viewport.height / 2),
        0.1,
      );
    }

    if (meshRef.current) {
      // Slow rotation on the mesh for continuous grid movement
      meshRef.current.rotation.z = time * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.3, 0, 0]} position={[0, -5, -5]}>
      <planeGeometry args={[110, 110, 55, 55]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={WaveGridShader.vertexShader}
        fragmentShader={WaveGridShader.fragmentShader}
        uniforms={uniforms}
        wireframe={true}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function WavingGrid() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden bg-transparent">
      {/* Repeating background grid lines for a technical Cyber-Grid look */}
      <div
        className="absolute inset-0 z-1 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #8b5cf6 1px, transparent 1px),
            linear-gradient(to bottom, #8b5cf6 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <Canvas
        camera={{ position: [0, 8, 28], fov: 60 }}
        style={{ pointerEvents: "none" }}
        gl={{ alpha: true, antialias: true }}
      >
        <GridMesh />
      </Canvas>

      {/* Soft gradient bottom fog overlay to fade the grid out */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent pointer-events-none z-1" />
    </div>
  );
}
