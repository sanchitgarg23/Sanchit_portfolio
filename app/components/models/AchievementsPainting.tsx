import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export const AchievementsPainting = (props: Partial<THREE.Mesh>) => {
  const texture = useTexture('/images/achievements.png');

  return (
    <mesh {...props}>
      {/* 256x256 segments allows the flat plane to physically bend in 3D */}
      <planeGeometry args={[65, 65, 256, 256]} />
      <meshStandardMaterial 
        map={texture} 
        // Using the image itself as a height map
        displacementMap={texture}
        // Negative scale pushes bright stars back into 3D space, keeping dark tree in front
        displacementScale={-12}
        roughness={1}
      />
    </mesh>
  );
};

useTexture.preload('/images/achievements.png');

