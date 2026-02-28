import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";
import { usePortalStore } from "@stores";
import { NeedSomeSpaceModel } from "../../models/NeedSomeSpaceModel";
import AchievementsCarousel from "./AchievementsCarousel";
import { TouchPanControls } from "../projects/TouchPanControls";

const Achievements = () => {
  const { camera } = useThree();
  const isActive = usePortalStore((state) => state.activePortalId === "achievements");
  const data = useScroll();

  useEffect(() => {
    // Hide scrollbar when active.
    data.el.style.overflow = isActive ? 'hidden' : 'auto';
    if (isActive) {
      if (isMobile) {
        gsap.to(camera.position, { z: 11.5, y: -39, x: 0, duration: 1 });
      } else {
        gsap.to(camera.position, { z: 11.5, y: -39, x: 0, duration: 1 });
      }
    }
  }, [isActive]);

  useFrame((state, delta) => {
    if (isActive) {
      if (!isMobile) {
        camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, -(state.pointer.x * Math.PI) / 4, 0.03);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, 11.5 - state.pointer.y, 7, delta);
      }
    }
  });

  return (
    <group>
      {/* Subtle ambient light */}
      <ambientLight intensity={0.3} />
      
      {/* 3D Space Star Model */}
      <NeedSomeSpaceModel 
        scale={new THREE.Vector3(3, 3, 3)} 
        position={new THREE.Vector3(0, 5, -8)} 
      />
      
      <AchievementsCarousel />
      { isActive && isMobile && <TouchPanControls /> }
    </group>
  );
};

export default Achievements;
