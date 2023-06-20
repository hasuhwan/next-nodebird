import React from "react";
import { Canvas } from "@react-three/fiber";
import PlaneModel from "./PlaneModel";
import ReactModel from "./ReactModel";
import LightController from "./LightController";
import { OrbitControls, SoftShadows } from "@react-three/drei";

const Loading = () => {
  return (
    <Canvas shadows colorManagement camera={{ position: [0, 0, 40], fov: 80 }}>
      <SoftShadows />
      <LightController />
      <OrbitControls autoRotate autoRotateSpeed={60} enabled="false" />
      <PlaneModel />
      <ReactModel />
    </Canvas>
  );
};
export default Loading;
