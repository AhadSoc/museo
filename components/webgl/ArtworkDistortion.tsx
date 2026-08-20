"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uTime;
  uniform vec2 uImageSize;
  uniform vec2 uPlaneSize;
  varying vec2 vUv;

  // Cover-fit UV so the texture never stretches regardless of plane aspect.
  vec2 coverUv(vec2 uv, vec2 imageSize, vec2 planeSize) {
    float imageAspect = imageSize.x / imageSize.y;
    float planeAspect = planeSize.x / planeSize.y;
    vec2 scale = vec2(1.0);
    if (planeAspect > imageAspect) {
      scale.y = imageAspect / planeAspect;
    } else {
      scale.x = planeAspect / imageAspect;
    }
    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    vec2 uv = coverUv(vUv, uImageSize, uPlaneSize);

    float dist = distance(vUv, uMouse);
    float ripple = sin(dist * 34.0 - uTime * 2.4) * 0.0035;
    float falloff = smoothstep(0.45, 0.0, dist) * uHover;
    vec2 offset = normalize(vUv - uMouse + 0.0001) * ripple * falloff;

    float ambient = sin(uTime * 0.35 + vUv.y * 6.0) * 0.0009;

    vec2 distortedUv = uv + offset + vec2(ambient, ambient * 0.6);
    vec4 color = texture2D(uTexture, distortedUv);
    gl_FragColor = color;
  }
`;

function Plane({ src, aspect }: { src: string; aspect: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  const mouseTarget = useRef({ x: 0.5, y: 0.5 });
  const hoverTarget = useRef(0);

  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    const tex = loader.load(src);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [src]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0 },
      uTime: { value: 0 },
      uImageSize: { value: new THREE.Vector2(1, 1 / aspect) },
      uPlaneSize: { value: new THREE.Vector2(viewport.width, viewport.height) },
    }),
    [texture, aspect, viewport.width, viewport.height]
  );

  useFrame((state) => {
    if (!materialRef.current) return;
    const u = materialRef.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uMouse.value.lerp(new THREE.Vector2(mouseTarget.current.x, mouseTarget.current.y), 0.08);
    u.uHover.value += (hoverTarget.current - u.uHover.value) * 0.06;
  });

  return (
    <mesh
      ref={meshRef}
      onPointerMove={(e) => {
        mouseTarget.current = { x: e.uv?.x ?? 0.5, y: e.uv?.y ?? 0.5 };
      }}
      onPointerEnter={() => (hoverTarget.current = 1)}
      onPointerLeave={() => (hoverTarget.current = 0)}
    >
      <planeGeometry args={[viewport.width, viewport.height, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        transparent
      />
    </mesh>
  );
}

interface ArtworkDistortionProps {
  src: string;
  aspect?: number;
  className?: string;
}

/**
 * Progressive-enhancement layer: renders nothing until the texture has
 * loaded successfully, so the plain <ArtworkImage> beneath is always the
 * guaranteed visual. On WebGL failure or slow devices, it simply never
 * appears.
 */
export default function ArtworkDistortion({ src, aspect = 1.4, className }: ArtworkDistortionProps) {
  const [ready, setReady] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setSupported(false);
    } catch {
      setSupported(false);
    }
  }, []);

  if (!supported) return null;

  return (
    <div
      className={className}
      style={{ opacity: ready ? 1 : 0, transition: "opacity 1.2s ease" }}
      aria-hidden="true"
    >
      <Canvas
        orthographic
        camera={{ zoom: 100, position: [0, 0, 10] }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.75]}
        onCreated={() => setReady(true)}
      >
        <Plane src={src} aspect={aspect} />
      </Canvas>
    </div>
  );
}
