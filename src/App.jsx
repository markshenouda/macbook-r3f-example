import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useState, useEffect, useRef } from "react";
import "./App.css";
import {
  OrbitControls,
  useGLTF,
  Environment,
  ContactShadows,
  Html,
  Preload,
} from "@react-three/drei";
import * as THREE from "three";

function Macbook(props) {
  const model = useGLTF("/macbook-transformed.glb");
  const [open, setOpen] = useState(true);
  const ref = useRef();
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--bg",
      open ? "rgb(209, 219, 112)" : "rgb(214, 104, 248)"
    );
  }, [open]);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      Math.cos(t / 2) / 10 + 0.25,
      0.1
    );
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      Math.sin(t / 4) / 10,
      0.1
    );
    ref.current.rotation.z = THREE.MathUtils.lerp(
      ref.current.rotation.z,
      Math.sin(t / 4) / 10,
      0.1
    );
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      (-5 + Math.sin(t)) / 5,
      0.1
    );
    model.nodes.Top.rotation.x = THREE.MathUtils.lerp(
      model.nodes.Top.rotation.x,
      open ? Math.PI / 2.5 : Math.PI,
      0.1
    );
  });
  return (
    <primitive
      ref={ref}
      onClick={() => setOpen(!open)}
      object={model.scene}
      {...props}
    >
      <Html>
        <div className="content">
          Click on the Macbook to {open ? "close" : "open"} it.
        </div>
      </Html>
    </primitive>
  );
}

function App() {
  return (
    <Canvas style={{ height: "100vh" }}>
      <ambientLight />
      <OrbitControls />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Macbook position={[0, -2, 0]} />
        <Environment preset="city" />
        <ContactShadows
          rotation-x={Math.PI / 2}
          position={[0, -2, 0]}
          opacity={0.3}
          width={20}
          height={20}
          blur={2}
          far={4.5}
        />
      </Suspense>
      <Preload />
    </Canvas>
  );
}

export default App;
