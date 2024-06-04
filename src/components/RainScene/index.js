import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

const Styled = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;
const ControlPanel = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
  z-index: 10;
  color: black;
  flex-wrap: wrap;
  gap: 10px;
  //   label {
  //     margin-right: 10px;
  //   }
  input {
    margin-bottom: 5px;
    width: 100px;
  }
  @media (max-width: 768px) {
    position: relative;
    top: 500px;
    display: flex;
    height: 500px;
    align-items: center;
    background: #eee0c9;
    border-radius: 0;
  }
`;
const Button = styled.button`
  display: block;
  margin: 5px 0;
  padding: 5px 7px;
  background: #f0f0f0;
`;

export const RainScene = ({ portal }) => {
  const mountRef = useRef(null);

  const [fov, setFov] = useState(75);
  const [aspect, setAspect] = useState(window.innerWidth / window.innerHeight);
  const [near, setNear] = useState(0.1);
  const [far, setFar] = useState(1000);

  const [cameraX, setCameraX] = useState(13);
  const [cameraY, setCameraY] = useState(3);
  const [cameraZ, setCameraZ] = useState(36);

  const [cameraRotationX, setCameraRotationX] = useState(-Math.PI / 6);
  const [cameraRotationY, setCameraRotationY] = useState(0);
  const [cameraRotationZ, setCameraRotationZ] = useState(0);

  const [groundRadius, setGroundRadius] = useState(30);
  const [groundColor, setGroundColor] = useState(0x555555);

  const textMeshRef = useRef(null);

  useEffect(() => {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add a plane to represent the ground
    let groundGeometry = new THREE.CircleGeometry(groundRadius, 30);
    let groundMaterial = new THREE.MeshBasicMaterial({ color: groundColor });
    let ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Add a small square off the center
    const squareGeometry = new THREE.BoxGeometry(2, 2, 2); // Small cube geometry
    const squareMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color
    const square = new THREE.Mesh(squareGeometry, squareMaterial);
    square.position.set(10, 1, 10); // Position the square off the center
    scene.add(square);

    // Add AxesHelper to the scene
    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);

    // Add sky
    const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
    const skyMaterial = new THREE.MeshBasicMaterial({
      color: 0x87ceeb,
      side: THREE.BackSide,
    });
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(sky);

    // Load font and add text
    const loader = new FontLoader();
    loader.load(
      "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
      function (font) {
        const textGeometry = new TextGeometry(
          "Hello, I am Ethan ! This is my old project.",
          {
            font: font,
            size: 1,
            height: 0.1,
          }
        );
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        textGeometry.center();
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(-20, 5, 0); // Position the text
        scene.add(textMesh);
        textMeshRef.current = textMesh;
      }
    );

    // Set initial camera position and rotation
    camera.position.set(cameraX, cameraY, cameraZ);
    camera.rotation.set(cameraRotationX, cameraRotationY, cameraRotationZ);
    camera.lookAt(0, 0, 0); // Make sure the camera looks at the center of the circle
    //camera.lookAt(new THREE.Vector3(cameraX, cameraY, cameraZ)); // Make the camera look up

    // Create raindrop particles
    const rainCount = 100;
    const rainGeometry = new THREE.BufferGeometry();
    const rainPositions = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount; i++) {
      rainPositions[i * 3] = Math.random() * 100 - 50;
      rainPositions[i * 3 + 1] = Math.random() * 100;
      rainPositions[i * 3 + 2] = Math.random() * 100 - 50;
    }
    rainGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(rainPositions, 3)
    );

    const rainMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.1,
    });
    const rain = new THREE.Points(rainGeometry, rainMaterial);
    scene.add(rain);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const positions = rainGeometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.2; // Move raindrop down
        if (positions[i + 1] < 0) {
          positions[i + 1] = 100; // Reset raindrop to the top
        }
      }
      rainGeometry.attributes.position.needsUpdate = true;
      if (textMeshRef.current) {
        textMeshRef.current.lookAt(camera.position); // Make the text always face the camera
      }
      renderer.render(scene, camera);
    };

    animate();

    // Update camera and ground on state change
    const updateScene = () => {
      camera.fov = fov;
      camera.aspect = aspect;
      camera.near = near;
      camera.far = far;
      camera.position.set(cameraX, cameraY, cameraZ);
      camera.rotation.set(cameraRotationX, cameraRotationY, cameraRotationZ);
      camera.lookAt(0, 0, 0); // Make sure the camera looks at the center of the circle
      camera.updateProjectionMatrix();

      scene.remove(ground);
      groundGeometry = new THREE.CircleGeometry(groundRadius, 30);
      groundMaterial = new THREE.MeshBasicMaterial({ color: groundColor });
      ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      scene.add(ground);

      // Update square position
      scene.remove(square);
      square.position.set(10, 1, 10);
      scene.add(square);
    };

    updateScene();

    // Cleanup on unmount
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [
    fov,
    aspect,
    near,
    far,
    cameraX,
    cameraY,
    cameraZ,
    cameraRotationX,
    cameraRotationY,
    cameraRotationZ,
    groundRadius,
    groundColor,
  ]);

  const handleZoomIn = () => {
    setCameraZ(cameraZ - 1);
  };

  const handleZoomOut = () => {
    setCameraZ(cameraZ + 1);
  };

  return (
    <>
      <Styled>
        <div ref={mountRef} style={{ width: "100%", height: "100%" }}></div>
      </Styled>

      <ControlPanel>
        <div style={{ width: "100%" }}>
          =========嘗試玩玩看，Three.js試試看這些參數。=========
        </div>
        <label>
          FOV:
          <input
            type="number"
            value={fov}
            onChange={(e) => setFov(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Aspect:
          <input
            type="number"
            value={aspect}
            onChange={(e) => setAspect(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Near:
          <input
            type="number"
            value={near}
            onChange={(e) => setNear(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Far:
          <input
            type="number"
            value={far}
            onChange={(e) => setFar(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Camera X:
          <input
            type="number"
            value={cameraX}
            onChange={(e) => setCameraX(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Camera Y:
          <input
            type="number"
            value={cameraY}
            onChange={(e) => setCameraY(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Camera Z:
          <input
            type="number"
            value={cameraZ}
            onChange={(e) => setCameraZ(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Rotation X:
          <input
            type="number"
            value={cameraRotationX}
            step="0.01"
            onChange={(e) => setCameraRotationX(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Rotation Y:
          <input
            type="number"
            value={cameraRotationY}
            step="0.01"
            onChange={(e) => setCameraRotationY(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Rotation Z:
          <input
            type="number"
            value={cameraRotationZ}
            step="0.01"
            onChange={(e) => setCameraRotationZ(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Ground Radius:
          <input
            type="number"
            value={groundRadius}
            onChange={(e) => setGroundRadius(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Ground Color:
          <input
            type="color"
            value={`#${groundColor.toString(16).padStart(6, "0")}`}
            onChange={(e) =>
              setGroundColor(parseInt(e.target.value.replace("#", ""), 16))
            }
          />
        </label>
        <br />
        <div style={{ width: "100%", display: "contents" }}>
          <Button onClick={handleZoomIn}>Zoom In</Button>
          <Button onClick={handleZoomOut}>Zoom Out</Button>
        </div>
      </ControlPanel>
    </>
  );
};
