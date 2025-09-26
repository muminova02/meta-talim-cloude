import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, useAnimations } from "@react-three/drei";

function SolarSystem() {
  const group = useRef();
  const gltf = useGLTF("/models/medieval_fantasy_book.glb");
  const { animations } = gltf;
  const { actions, mixer } = useAnimations(animations, group);

  // Modelni sekin o'nga aylantirish (y o'qi bo'ylab)
  useFrame(() => {
    if (group.current) {
      // @ts-ignore
      group.current.rotation.y += 0.001; // Kichik qiymat - sekin aylanish
    }
  });

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => {
        action?.reset().play();
      });
    }
    return () => {
      mixer.stopAllAction();
    };
  }, [actions, mixer]);

  return <primitive ref={group} object={gltf.scene} scale={0.10} position={[0, 0, 0]} />;
}

export default function SolarSystemModel() {
  return (
    <div style={{ width: "100%", height: "600px", borderRadius: 24, overflow: "hidden", background: "transparent" }}>
      <Canvas
        camera={{ position: [0, 2, 10], fov: 60 }}
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <SolarSystem />
          <Environment preset="sunset" />
        </Suspense>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} target={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}