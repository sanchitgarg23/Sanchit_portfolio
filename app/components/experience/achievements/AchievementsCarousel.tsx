import { useEffect, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import AchievementTile from "./AchievementTile";

import { ACHIEVEMENTS } from "@constants";
import { usePortalStore } from "@stores";

const AchievementsCarousel = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const isActive = usePortalStore((state) => state.activePortalId === "achievements");

  useEffect(() => {
    if (!isActive) setActiveId(null);
  }, [isActive]);

  const onClick = (id: number) => {
    if (!isMobile) return;
    setActiveId(id === activeId ? null : id);
  };

  const tiles = useMemo(() => {
    const fov = Math.PI;
    const distance = 13;
    const count = ACHIEVEMENTS.length;

    return ACHIEVEMENTS.map((ach, i) => {
      // Space them out evenly across the FOV
      const angle = (fov / count) * i;
      const z = -distance * Math.sin(angle);
      const x = -distance * Math.cos(angle);
      const rotY = Math.PI / 2 - angle;

      return (
        <AchievementTile
          key={ach.id || i}
          achievement={ach}
          index={i}
          position={[x, 1, z]}
          rotation={[0, rotY, 0]}
          activeId={activeId}
          onClick={() => onClick(i)}
        />
      );
    });
  }, [activeId, isActive]);

  return (
    <group rotation={[0, -Math.PI / 12, 0]}>
      {tiles}
    </group>
  );
};

export default AchievementsCarousel;
