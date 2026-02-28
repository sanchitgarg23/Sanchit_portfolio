import { usePortalStore } from "@stores";
import { useScroll, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";
import { SKILLS, Skill } from "@constants";

const SkillBadge = ({ skill, position, rotation }: { skill: Skill, position: [number, number, number], rotation: [number, number, number] }) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[3, 1.5, 0.1]} />
        <meshPhysicalMaterial 
            color={
              skill.category === 'Frontend' ? '#ff7f50' : 
              skill.category === 'Backend' ? '#6495ed' : '#3cb371'
            } 
            transparent opacity={0.6} wireframe />
      </mesh>
      <Text position={[0, 0, 0.1]} fontSize={0.4} color="white" font="./Vercetti-Regular.woff" anchorX="center" anchorY="middle">
        {skill.name}
      </Text>
    </group>
  );
};


const SkillsCarousel = () => {
  const isActive = usePortalStore((state) => state.activePortalId === "skills");
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (isActive && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  const tiles = useMemo(() => {
    const fov = Math.PI * 2;
    const distance = 6;
    const count = SKILLS.length;

    return SKILLS.map((skill, i) => {
      const angle = (fov / count) * i;
      const z = -distance * Math.sin(angle);
      const x = -distance * Math.cos(angle);
      const rotY = Math.PI / 2 - angle;

      return (
        <SkillBadge key={i} skill={skill} position={[x, 0, z]} rotation={[0, rotY, 0]} />
      );
    });
  }, []);

  return (
    <group ref={groupRef} rotation={[0, -Math.PI / 12, 0]}>
      {tiles}
    </group>
  );
};


const Skills = () => {
  const { camera } = useThree();
  const isActive = usePortalStore((state) => state.activePortalId === "skills");
  const data = useScroll();

  useEffect(() => {
    data.el.style.overflow = isActive ? 'hidden' : 'auto';
    if (isActive) {
      if (isMobile) {
        gsap.to(camera.position, { z: 4, y: -39, x: 0, duration: 1 });
      } else {
        gsap.to(camera.position, { y: -39, x: 0, z: 2, duration: 1 });
      }
    }
  }, [isActive]);

  return (
    <group>
      <SkillsCarousel />
    </group>
  );
};

export default Skills;
