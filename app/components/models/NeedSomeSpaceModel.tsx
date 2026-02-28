/*
Source: https://sketchfab.com/3d-models/need-some-space-d6521362b37b48e3a82bce4911409303
Author: Loïc Norgeot (https://sketchfab.com/norgeotloic)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Title: Need some space?
*/

import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { ThreeElements, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Points
  }
  materials: {
    ['Scene_-_Root']: THREE.PointsMaterial
  }
}

export function NeedSomeSpaceModel(props: ThreeElements['group']) {
  const { nodes } = useGLTF('/models/need_some_space-transformed.glb') as GLTFResult
  const groupRef = useRef<THREE.Group>(null)

  // Slow rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05
    }
  })

  // Vibrant point material with additive blending for galaxy glow
  const pointMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 2.5,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  }, [])

  return (
    <group {...props} dispose={null} ref={groupRef}>
      <points 
        geometry={nodes.Object_2.geometry} 
        material={pointMaterial}
        rotation={[-Math.PI / 2, 0, 0]} 
        scale={1}
      />
    </group>
  )
}

useGLTF.preload('/models/need_some_space-transformed.glb')
