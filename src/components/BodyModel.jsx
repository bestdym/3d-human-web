import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Holographic material that overrides ALL original materials
function applyHolographicMaterial(scene, options = {}) {
  const {
    color = '#446699',      // Darker base to avoid glowing like a lightbulb
    emissive = '#1133aa',   // Darker emissive tint
    emissiveIntensity = 0.05, // Minimal glow
    roughness = 0.8,        // Base matte finish
    metalness = 0.0,
    opacity = 0.12,         // Slightly more transparent
    transmission = 0.0,
    envMapIntensity = 0.5,  // Reflect environment for glass sheen
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
        envMapIntensity,
        clearcoat: 0.6, // Lightweight glass-like shell
        clearcoatRoughness: 0.15, // Smooth glass reflections
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
        c.material.opacity = THREE.MathUtils.lerp(c.material.opacity, visible ? 0.2 : 0, 0.25)
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
      color: '#554499',
      emissive: '#3311aa',
      emissiveIntensity: 0.05,
      roughness: 0.8,
      metalness: 0.0,
      opacity: 0.12,
      envMapIntensity: 0.5,
      transmission: 0.0, // Disabled for perf
    })
  }, [scene])

  useFrame(() => {
    if (!ref.current) return
    ref.current.traverse(c => {
      if (c.isMesh && c.material) {
        c.material.opacity = THREE.MathUtils.lerp(c.material.opacity, visible ? 0.2 : 0, 0.25)
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
