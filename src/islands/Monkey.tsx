import * as React from "react";
import * as Fiber from "@react-three/fiber";
import * as Drei from "@react-three/drei";

export default () => {
  const { scene } = Drei.useGLTF("http://localhost:3000/monkey.glb");

  return (
    <React.Suspense fallback={<p>...loading...</p>}>
      <Fiber.Canvas>
        {/* @ts-ignore */}
        <Drei.PerspectiveCamera makeDefault />
        <Drei.OrbitControls enablePan enableZoom enableRotate />
        <Drei.Sky
          distance={450000}
          sunPosition={[0, 1, 1]}
          inclination={0}
          azimuth={0.25}
        />
        <Drei.Stage>
          <group dispose={null}>
            <primitive scale={[1, 1, 1]} object={scene} />
          </group>
        </Drei.Stage>
      </Fiber.Canvas>
    </React.Suspense>
  );
};
