import { useState, Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Stars } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import BodyModel from './components/BodyModel'
import OrganHotspots from './components/OrganHotspots'
import Sidebar from './components/Sidebar'
import InternalOrgans from './components/InternalOrgans'
import ParticleBg from './components/ParticleBg'
import './index.css'

const ORGAN_MODELS = [
  {
    id: 'brain',
    file: '/models/human-brain.glb',
    position: [0, 1.75, 0.05],
    scale: 0.15,
    rotation: [0, -1.5, 0],
    color: '#ff66c4',
    emissive: '#ff2288'
  },
  {
    id: 'heart',
    file: '/models/realistic_human_heart.glb',
    position: [0, 1.1, 0.10],
    scale: 0.15,
    color: '#aa1144',
    emissive: '#ff5588'
  },
  {
    id: 'liver',
    file: '/models/human_liver_and_gallbladder.glb',
    position: [-0.07, 0.80, 0.1],
    rotation: [0, -1.5, 0],
    scale: 1,
    color: '#dd3366',
    emissive: '#ff77aa'
  },
  {
    id: 'kidney',
    file: '/models/human_kidney.glb',
    position: [0, 0.67, 0.04],
    scale: 0.1,
    color: '#550000',
    emissive: '#880011'
  },
  {
    id: 'intestine',
    file: '/models/small_and_large_intestine.glb',
    position: [-0.16, 0.45, 0.1],
    scale: 0.3,
    color: '#aa1144',
    emissive: '#ff5588'
  },
  {
    id: 'dna',
    file: '/models/dna.glb',
    position: [-0.50, 0.85, -0.1],
    rotation: [0.6, 0.75, 1.4],
    scale: 0.00005,
    color: '#ff2288',
    emissive: '#ff44aa'
  },
  {
    id: 'cell',
    file: '/models/eukaryotic_cell.glb',
    position: [0.55, 0.85, 0.0],
    rotation: [0, 1.5, 1.5],
    scale: 0.06,
    color: '#0044ff',
    emissive: '#0088ff'
  }
]

const CATEGORIES = [
  {
    id: 'neurology',
    label: 'Neurology',
    icon: '🧠',
    position: [0, 1.75, 0.05],
    shows: ['brain']
  },
  {
    id: 'neck_system',
    label: 'Endocrine',
    icon: '⚕️',
    position: [0, 1.30, 0.04],
    shows: ['brain', 'kidney']
  },
  {
    id: 'cardiovascular',
    label: 'Cardiovascular',
    icon: '🤍',
    position: [0, 1.1, 0.10],
    shows: ['heart']
  },
  {
    id: 'toxins',
    label: 'Toxins',
    icon: '🦠',
    position: [-0.07, 0.80, 0.1],
    shows: ['liver', 'kidney']
  },
  {
    id: 'gut_health',
    label: 'Gut Health',
    icon: '🩻',
    position: [-0.16, 0.45, 0.1],
    shows: ['intestine', 'kidney', 'liver']
  },
  {
    id: 'genetics',
    label: 'Genetics',
    icon: '🧬',
    position: [-0.50, 0.85, -0.1],
    shows: ['dna']
  },
  {
    id: 'longevity',
    label: 'Longevity',
    icon: '🧫',
    position: [0.55, 0.85, 0.0],
    shows: ['cell']
  }
]

export default function App() {
  const [sex, setSex] = useState('female')
  const [activeOrgan, setActiveOrgan] = useState(null)
  const [hoveredOrgan, setHoveredOrgan] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const controlsRef = useRef()

  return (
    <div className="app-wrapper">
      {/* Loading screen */}
      <div className={`loading-screen${loaded ? ' hidden' : ''}`}>
        <div className="loading-spinner" />
        <div className="loading-text">Loading 3D Experience…</div>
      </div>

      {/* Particle CSS background */}
      <ParticleBg />

      {/* Logo */}
      <div className="logo">
        <div className="logo-icon">
          {/* A simple placeholder logo icon matching VibrantWellness (3 dots) */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="6" r="3" fill="#1a1a3a" />
            <circle cx="6" cy="16" r="3" fill="#1a1a3a" />
            <circle cx="18" cy="16" r="3" fill="#1a1a3a" />
            <path d="M12 9L7 14M12 9L17 14M7 14L17 14" stroke="#1a1a3a" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="logo-text">Vibrant<span>Wellness</span></div>
      </div>

      {/* Sex toggle header */}
      <div className="header">
        <div className="sex-toggle">
          <button className={`sex-btn${sex === 'female' ? ' active' : ''}`} onClick={() => setSex('female')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="8" r="5" /><line x1="12" y1="13" x2="12" y2="21" /><line x1="9" y1="18" x2="15" y2="18" />
            </svg>
            Female
          </button>
          <button className={`sex-btn${sex === 'male' ? ' active' : ''}`} onClick={() => setSex('male')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="10" cy="14" r="5" /><line x1="14" y1="10" x2="21" y2="3" /><polyline points="16 3 21 3 21 8" />
            </svg>
            Male
          </button>
        </div>
      </div>

      {/* Dynamic Content based on active state */}
      <Sidebar
        organs={CATEGORIES}
        activeOrgan={activeOrgan}
        onSelect={setActiveOrgan}
        onHover={setHoveredOrgan}
      />

      {/* THREE.js Canvas for Body Model */}
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 0.4, 5.0], fov: 38 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.7} color="#c8d8ff" />
            <directionalLight position={[3, 5, 3]} intensity={1.2} color="#ffffff" />
            <directionalLight position={[-3, 2, -2]} intensity={0.5} color="#b0c8ff" />
            <pointLight position={[0, 3, 2]} intensity={0.8} color="#a0c0ff" />

            <Environment preset="studio" />

            <BodyModel
              sex={sex}
              onLoaded={() => setLoaded(true)}
              activeOrgan={activeOrgan}
              hoveredOrgan={hoveredOrgan}
            />

            <InternalOrgans
              models={ORGAN_MODELS}
              categories={CATEGORIES}
              activeCategoryId={activeOrgan}
              hoveredCategoryId={hoveredOrgan}
            />

            <OrganHotspots
              organs={CATEGORIES}
              activeOrgan={activeOrgan}
              onSelect={setActiveOrgan}
              onHover={setHoveredOrgan}
            />

            <EffectComposer>
              <Bloom
                intensity={0.6}
                luminanceThreshold={0.4}
                luminanceSmoothing={0.9}
                radius={0.8}
              />
              <Vignette eskil={false} offset={0.15} darkness={0.4} />
            </EffectComposer>

            <OrbitControls
              ref={controlsRef}
              enablePan={false}
              enableZoom={true}
              minPolarAngle={Math.PI * 0.1}
              maxPolarAngle={Math.PI * 0.9}
              // Constrained zoom distances to keep focus on upper body
              minDistance={1.2}
              maxDistance={3.8}
              autoRotate={!activeOrgan && !hoveredOrgan}
              autoRotateSpeed={0.4}
              // Sighted the pivot target at the chest level
              target={[0, 0.8, 0]}
            />
          </Suspense>
        </Canvas>
      </div>

      <div className="footer-left">
        <div className="sound-toggle">
          <span className="dots">. . . . . . </span>
          <div className="sound-pill">SOUND OFF</div>
        </div>
      </div>

      <div className="footer-right">
        CREATED BY <strong>noomo</strong> <em>agency</em>
      </div>
    </div>
  )
}
