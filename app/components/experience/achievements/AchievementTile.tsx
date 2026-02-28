import { Edges, Text, TextProps } from "@react-three/drei";

import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";

import { usePortalStore } from "@stores";
import { Achievement } from "@constants";

interface AchievementTileProps {
  achievement: Achievement;
  index: number;
  position: [number, number, number];
  rotation: [number, number, number];
  activeId: number | null;
  onClick: () => void;
}

const AchievementTile = ({ achievement, index, position, rotation, activeId, onClick }: AchievementTileProps) => {
  const cardRef = useRef<THREE.Group>(null);
  const hoverAnimRef = useRef<gsap.core.Timeline | null>(null);
  const [hovered, setHovered] = useState(false);
  const isAchievementsActive = usePortalStore((state) => state.activePortalId === "achievements");

  const titleProps = useMemo(() => ({
    font: "./soria-font.ttf",
    color: "white",
  }), []);

  const subtitleProps: Partial<TextProps> = useMemo(() => ({
    font: "./Vercetti-Regular.woff",
    color: "#DDD",
    anchorX: "left",
    anchorY: "top",
  }), []);

  useEffect(() => {
    if (!cardRef.current) return;
    hoverAnimRef.current?.kill();

    const [mesh, outline, title, dateGroup, textBox] = cardRef.current.children;

    hoverAnimRef.current = gsap.timeline();
    hoverAnimRef.current
      .to(cardRef.current.position, { z: hovered ? 1 : 0, duration: 0.2 }, 0)
      .to(cardRef.current.position, { y: hovered ? 0.4 : 0 }, 0)
      .to(cardRef.current.scale, {
        x: hovered ? 1.2 : 1,
        y: hovered ? 1.2 : 1,
        z: hovered ? 1.2 : 1,
      }, 0)
      .to(title.position, { y: hovered ? 0.7 : -0.8 }, 0)
      .to(textBox.position, { y: hovered ? 0.4 : 0 }, 0)
      .to(textBox, { fillOpacity: hovered ? 1 : 0, duration: 0.4 }, 0)
      .to(dateGroup.position, { y: hovered ? 2.6 : 1.4 }, 0)
      .to(mesh.scale, { y: hovered ? 2 : 1 }, 0)
      .to(outline.scale, { y: hovered ? 2 : 1 }, 0)
      .to((mesh as THREE.Mesh).material, { opacity: hovered ? 0.95 : 0.2 }, 0)
      .to(mesh.position, { y: hovered ? 1 : 0 }, 0)
      .to(outline.position, { y: hovered ? 1 : 0 }, 0);
  }, [hovered]);

  useEffect(() => {
    if (isMobile) {
      setHovered(activeId === index);
    }
  }, [isMobile, activeId]);

  useEffect(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current.position, {
        y: isAchievementsActive ? 0 : -10,
        duration: 1,
        delay: isAchievementsActive ? index * 0.1 : 0,
      });
    }
  }, [isAchievementsActive]);

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={onClick}
      onPointerOver={() => !isMobile && isAchievementsActive && setHovered(true)}
      onPointerOut={() => !isMobile && isAchievementsActive && setHovered(false)}>
      <group ref={cardRef}>
        <mesh>
          <planeGeometry args={[4.2, 2, 1]} />
          <meshBasicMaterial color="#111" transparent opacity={0.2}/>
        </mesh>
        <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[4.2, 2, 1]} />
            <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.5} />
        </mesh>
        <Text
          {...titleProps}
          position={[-1.9, -0.8, 0.101]}
          anchorX="left"
          anchorY="bottom"
          maxWidth={4}
          fontSize={0.6}>
          {achievement.title}
        </Text>
        <group position={[-1.25, 1.4, 0.01]}>
          <mesh>
            <planeGeometry args={[1.7, 0.4, 1]} />
            <meshBasicMaterial color="#555" opacity={0} wireframe />
            <Edges color="white" lineWidth={1} />
          </mesh>
          <Text
            {...subtitleProps}
            position={[-0.7, 0.2, 0]}
            fontSize={0.25}>
            {achievement.date.toUpperCase()}
          </Text>
        </group>
        <Text
          {...subtitleProps}
          maxWidth={3.8}
          position={[-1.9, 1.8, 0.1]}
          fontSize={0.2}>
          {achievement.description}
        </Text>
      </group>
    </group>
  );
};

export default AchievementTile;
