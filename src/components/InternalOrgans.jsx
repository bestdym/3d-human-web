import { useGLTF } from '@react-three/drei'
import { useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

// We removed the global activeMaterialParams constant.
// Instead, Active/Inactive materials will be generated dynamically per organ.

const inactiveMaterialParams = {
  color: new THREE.Color('#4466aa'),
  emissive: new THREE.Color('#223388'),
  emissiveIntensity: 0.0,
  roughness: 0.4,
  metalness: 0.3,
  transparent: true,
  opacity: 0.0,
  transmission: 0.0,
}

function InternalOrganMesh({ organ, isVisible, isActive }) {
  const { scene } = useGLTF(organ.file)
  const ref = useRef()
  
  // Clone scene so multiple instances don't share identical nested meshes
  const clonedScene = useMemo(() => scene.clone(true), [scene])

  const activeParams = useMemo(() => ({
    color: new THREE.Color(organ.color || '#ff3322'),
    emissive: new THREE.Color(organ.emissive || '#ff2200'),
    emissiveIntensity: 1.5,
    roughness: 0.2,
    metalness: 0.1,
    transparent: true,
    opacity: 0.9,
    transmission: 0.2,
  }), [organ])

  const inactiveParams = useMemo(() => ({
    color: new THREE.Color('#4466aa'),
    emissive: new THREE.Color('#223388'),
    emissiveIntensity: 0.0,
    roughness: 0.4,
    metalness: 0.3,
    transparent: true,
    opacity: 0.0,
    transmission: 0.0,
  }), [])

  const materialRef = useRef(new THREE.MeshPhysicalMaterial(
    isVisible ? activeParams : inactiveParams
  ))

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.material = materialRef.current
      }
    })
  }, [clonedScene])

  // Smoothly interpolate between active and inactive states
  useFrame((state, delta) => {
    const targetParams = isVisible ? activeParams : inactiveParams
    
    // Breathing effect (pulsing emissive intensity between 1.0 and 2.5)
    const breath = (Math.sin(state.clock.elapsedTime * 3.5) + 1) / 2 // 0.0 to 1.0
    const targetEmissiveIntensity = isVisible ? THREE.MathUtils.lerp(1.0, 2.5, breath) : 0.0
    
    materialRef.current.color.lerp(targetParams.color, 0.1)
    materialRef.current.emissive.lerp(targetParams.emissive, 0.1)
    materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(materialRef.current.emissiveIntensity, targetEmissiveIntensity, 0.1)
    materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, targetParams.opacity, 0.1)
    materialRef.current.transmission = THREE.MathUtils.lerp(materialRef.current.transmission, targetParams.transmission, 0.1)
    
    // Add subtle floating to active organ to make it pop
    if (ref.current && isActive) {
      ref.current.scale.setScalar(organ.scale + Math.sin(state.clock.elapsedTime * 2) * 0.005)
    } else if (ref.current) {
      ref.current.scale.setScalar(organ.scale)
    }
  })

  return (
    <primitive
      ref={ref}
      object={clonedScene}
      position={organ.position}
      rotation={organ.rotation || [0, 0, 0]}
      scale={[organ.scale, organ.scale, organ.scale]}
    />
  )
}

export default function InternalOrgans({ models, categories, activeCategoryId, hoveredCategoryId }) {
  
  const getVisibleModelIds = () => {
    const activeCat = categories.find(c => c.id === activeCategoryId)
    const hoveredCat = categories.find(c => c.id === hoveredCategoryId)
    
    const visibleIds = new Set()
    if (activeCat && activeCat.shows) activeCat.shows.forEach(id => visibleIds.add(id))
    if (hoveredCat && hoveredCat.shows) hoveredCat.shows.forEach(id => visibleIds.add(id))
    return visibleIds
  }

  const visibleModels = getVisibleModelIds()

  return (
    <group>
      {models.map((model) => {
        const isVisible = visibleModels.has(model.id)
        const isActive = activeCategoryId ? visibleModels.has(model.id) : false
        
        return (
          <InternalOrganMesh
            key={model.id}
            organ={model}
            isVisible={isVisible}
            isActive={isActive}
          />
        )
      })}
    </group>
  )
}
