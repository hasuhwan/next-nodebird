import React from "react";

const ReactModel = (props) => {
  return (
    <mesh position={[0, 0, 0]} castShadow>
      <torusKnotBufferGeometry
        attach="geometry"
        args={[10, 1, 300, 10, 6, 10]}
      />
      <meshPhysicalMaterial attach="material" color={"#61DBFB"} />
    </mesh>
  );
};

export default ReactModel;
