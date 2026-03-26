import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import PageTransition from '../components/PageTransition';
import BodyModel from '../components/BodyModel';
import ParticleBg from '../components/ParticleBg';
import useReveal from '../hooks/useReveal';
import Footer from '../components/Footer';
import '../index.css';

export default function Home() {
  const heroRef = useReveal();
  const featuresRef = useReveal();

  return (
    <PageTransition>
      <div className="home-scroll-page">
        {/* HERO SECTION */}
        <div className="home-page-container">
          <ParticleBg />
          <div className="home-bg-glow"></div>
          
          <div className="home-content" ref={heroRef}>
            <div className="home-text-section">
              <h1 className="home-headline reveal-item reveal-delay-1">
                Explore Human Anatomy at <span className="highlight">Your Fingertips</span>
              </h1>
              <p className="home-value-prop reveal-item reveal-delay-2">
                Interactive 3D visualization provides a profound understanding of the human body. Gain valuable insights into organ systems, identify early biomarkers, and explore complex systemic conditions through our comprehensive, medically-accurate 3D platform.
              </p>
              <div className="home-cta-group reveal-item reveal-delay-3">
                <Link to="/explore" className="btn-primary-large">
                  Start 3D Exploration
                </Link>
                <Link to="/about" className="btn-secondary-large">
                  Learn More
                </Link>
              </div>
              
              <div className="home-features-pill">
                <div className="pill-item reveal-item reveal-delay-4">
                  <span className="pill-icon">🧠</span> Precise Models
                </div>
                <div className="pill-item reveal-item reveal-delay-5">
                  <span className="pill-icon">🧬</span> In-depth Systems
                </div>
                <div className="pill-item reveal-item reveal-delay-6">
                  <span className="pill-icon">🔬</span> Clinical Insights
                </div>
              </div>
            </div>
            
            <div className="home-3d-preview reveal-item reveal-delay-2">
              <div className="preview-canvas-wrapper">
                <div className="preview-glow-bg"></div>
                <Canvas
                  camera={{ position: [0, 0.6, 3.5], fov: 40 }}
                  gl={{ antialias: true, alpha: true }}
                  style={{ zIndex: 10 }}
                >
                  <Suspense fallback={null}>
                    <ambientLight intensity={0.4} color="#c8d8ff" />
                    <directionalLight position={[3, 5, 3]} intensity={0.5} color="#ffffff" />
                    <pointLight position={[0, 3, 2]} intensity={0.3} color="#a0c0ff" />
                    <Environment preset="studio" />
                    
                    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                      <group position={[0, -0.6, 0]}>
                        <BodyModel sex="female" />
                      </group>
                    </Float>
                    
                    <OrbitControls 
                      enableZoom={false} 
                      enablePan={false} 
                      autoRotate 
                      autoRotateSpeed={1.5}
                      minPolarAngle={Math.PI / 2.5}
                      maxPolarAngle={Math.PI / 1.5}
                    />
                  </Suspense>
                </Canvas>
                
                <div className="preview-glass-overlay">
                  <div className="glass-indicator">
                    <div className="indicator-dot"></div> Live 3D Render
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES SECTION */}
        <section className="discover-section">
          <div className="discover-content" ref={featuresRef}>
            <div className="discover-header">
              <h2 className="reveal-item reveal-delay-1">Why Choose SomaLab?</h2>
              <p className="reveal-item reveal-delay-2">Our platform goes beyond traditional 2D textbooks, offering an unprecedented level of clinical depth and interactivity.</p>
            </div>
            
            <div className="features-grid">
              <div className="feature-box reveal-item reveal-delay-2">
                <div className="feature-icon-wrapper">🔬</div>
                <h3>Zoom to Cellular Level</h3>
                <p>Seamlessly transition from macro organ structures to microscopic cellular activity and neurotransmitter pathways.</p>
              </div>
              <div className="feature-box reveal-item reveal-delay-3">
                <div className="feature-icon-wrapper">⚕️</div>
                <h3>Clinical Biomarkers</h3>
                <p>Visualize early signs of oxidative stress, toxins, and autoimmune markers before clinical diagnosis.</p>
              </div>
              <div className="feature-box reveal-item reveal-delay-4">
                <div className="feature-icon-wrapper">🧬</div>
                <h3>Accurate Anatomy</h3>
                <p>Interact with highly detailed 3D models of the brain, heart, liver, digestive tract, and DNA.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Global Footer */}
        <Footer />
      </div>
    </PageTransition>
  );
}
