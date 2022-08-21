import * as React from "react";
import * as Three from "three";
import * as Fiber from "@react-three/fiber";
import * as Drei from "@react-three/drei";
import {
  begin_vertex,
  beginnormal_vertex,
  color_fragment,
  fragmentShaderDefine,
  vertexShaderDefine,
} from "./shaders";

const Objects: React.FC = () => {
  const material = new Three.MeshStandardMaterial({
    color: "#22a7f2",
    metalness: 1,
    roughness: 0.2,
    wireframe: false,
  });
  material.onBeforeCompile = (shader) => {
    shader.uniforms.u_time = { value: 0 };
    shader.uniforms.u_radius = { value: 10 };
    // vertex
    shader.vertexShader = vertexShaderDefine + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace(
      "#include <beginnormal_vertex>",
      beginnormal_vertex
    );
    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      begin_vertex
    );
    // fragment
    shader.fragmentShader = fragmentShaderDefine + shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <color_fragment>",
      color_fragment
    );

    material.userData.shader = shader;
    // debug
    console.log("vertexShader", shader.vertexShader);
    console.log("fragmentShader", shader.fragmentShader);
  };

  const geometry = new Three.BoxBufferGeometry(10, 10, 10, 12, 12, 12);

  Fiber.useFrame(({ clock }) => {
    const shader = material.userData.shader;
    if (shader) {
      (shader as THREE.Shader).uniforms.u_time.value = clock.getElapsedTime();
    }
  });

  return <mesh geometry={geometry} material={material} receiveShadow />;
};

export default () => {
  return (
    <Fiber.Canvas
      camera={{
        position: [15, 15, 15],
        fov: 50,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 2000,
      }}
      // dpr={window.devicePixelRatio}
      shadows
    >
      {/* canvas color */}
      <color attach="background" args={["#1e1e1e"]} />
      {/* fps */}
      <Drei.Stats />
      {/* camera controller */}
      <Drei.OrbitControls attach="orbitControls" />
      {/* lights */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[20, 20, 20]} castShadow />
      {/* objects */}
      <React.Suspense fallback={null}>
        <Drei.Environment preset="city" />
        <Objects />
      </React.Suspense>
      {/* helper */}
      <axesHelper />
    </Fiber.Canvas>
  );
};
