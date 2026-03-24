import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Holographic material that overrides ALL original materials
function applyHolographicMaterial(scene, options = {}) {
  const {
    color = '#c8d8ff',
    emissive = '#2255ff',
    emissiveIntensity = 0.2, // lowered emissive to see inside better
    roughness = 0.35,       // increased roughness to reduce glossiness
    metalness = 0.15,       // lowered metalness
    opacity = 0.35,         // far more transparent
    transmission = 0.9,     // high transmission (glassy)
  } = options

  scene.traverse((child) => {
    if (child.isMesh) {
      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        emissive: new THREE.Color(emissive),
        emissiveIntensity,
        roughness,
        metalness,
        transparent: true,
        opacity,
        transmission,
        envMapIntensity: 1.0,
        clearcoat: 0.2,
        clearcoatRoughness: 0.3,
        side: THREE.FrontSide,
        depthWrite: false, // critical for rendering internal organs correctly
      })
      child.material = mat
    }
  })
}

function MaleModel({ visible }) {
  const { scene } = useGLTF('/models/male_base_mesh.glb')
  const ref = useRef()

  useEffect(() => {
    applyHolographicMaterial(scene)
  }, [scene])

  useFrame(() => {
    if (!ref.current) return
    ref.current.traverse(c => {
      if (c.isMesh && c.material) {
        c.material.opacity = THREE.MathUtils.lerp(c.material.opacity, visible ? 0.35 : 0, 0.06)
      }
    })
  })

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={[0.12, 0.12, 0.12]}
      position={[0, -1.6, 0]}
      rotation={[0, 0, 0]}
      visible={true}
    />
  )
}

function FemaleModel({ visible }) {
  const { scene } = useGLTF('/models/female_base_mesh (1).glb')
  const ref = useRef()

  useEffect(() => {
    applyHolographicMaterial(scene, {
      color: '#d8c8ff',
      emissive: '#8855ff',
      emissiveIntensity: 0.25,
      roughness: 0.35,
      metalness: 0.15,
      opacity: 0.35,
      transmission: 0.9,
    })
  }, [scene])

  useFrame(() => {
    if (!ref.current) return
    ref.current.traverse(c => {
      if (c.isMesh && c.material) {
        c.material.opacity = THREE.MathUtils.lerp(c.material.opacity, visible ? 0.35 : 0, 0.06)
      }
    })
  })

  // Increased scale to 1.85 and adjusted Y positioning to match male's chest height
  return (
    <primitive
      ref={ref}
      object={scene}
      scale={[2.25, 2.25, 2.25]}
      position={[0, -1.9, 0]}
      visible={true}
    />
  )
}

export default function BodyModel({ sex, onLoaded }) {
  useEffect(() => {
    useGLTF.preload('/models/male_base_mesh.glb')
    useGLTF.preload('/models/female_base_mesh (1).glb')
    const timer = setTimeout(onLoaded, 1000)
    return () => clearTimeout(timer)
  }, [onLoaded])

  return (
    <group>
      <MaleModel visible={sex === 'male'} />
      <FemaleModel visible={sex === 'female'} />
    </group>
  )
}
