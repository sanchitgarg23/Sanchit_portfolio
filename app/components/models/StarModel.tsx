/*
Star model extracted from the Night Sky Visible Spectrum Monochromatic model.
Source: https://sketchfab.com/3d-models/night-sky-visible-spectrum-monochromatic-cfb156f03a7341b8a0a0ba0445ca742d
Author: commonfactory (https://sketchfab.com/commonfactory)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
*/

import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { ThreeElements, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh
    Object_6: THREE.Mesh
    Object_8: THREE.Mesh
  }
  materials: {
    material: THREE.MeshStandardMaterial
    Material: THREE.MeshStandardMaterial
    ['Material.001']: THREE.MeshStandardMaterial
  }
}

export function StarModel(props: ThreeElements['group']) {
  const { nodes, materials } = useGLTF('/models/night_sky-transformed.glb') as GLTFResult
  const starRef = useRef<THREE.Group>(null)

  // Slow gentle rotation for the star
  useFrame((_, delta) => {
    if (starRef.current) {
      starRef.current.rotation.y += delta * 0.15
      starRef.current.rotation.x += delta * 0.05
    }
  })

  return (
    <group {...props} dispose={null} ref={starRef}>
      {/* The Star - Object_4 is the red glowing sphere */}
      <mesh 
        geometry={nodes.Object_4.geometry} 
        rotation={[-0.354, 0.348, 0.118]} 
        scale={1}
      >
        <meshStandardMaterial 
          color="#ff2200"
          emissive="#ff4400"
          emissiveIntensity={3}
          roughness={0.3}
          metalness={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Outer glow layer */}
      <mesh 
        geometry={nodes.Object_4.geometry} 
        rotation={[-0.354, 0.348, 0.118]} 
        scale={1.15}
      >
        <meshStandardMaterial 
          color="#ff6600"
          emissive="#ff3300"
          emissiveIntensity={2}
          transparent={true}
          opacity={0.3}
          roughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/night_sky-transformed.glb')
