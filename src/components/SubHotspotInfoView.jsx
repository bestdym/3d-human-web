import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Master Library pemetaan Video berdasarkan ID dari subHotspot
const VIDEO_MAP = {
  'oxi': { src: '/models/OxidativeStressV03.mp4', label: 'RNA\nDamage' },
  'toxins_panel': { src: '/models/ToxinsV03.mp4', label: 'Toxins\nLoad' },
  'neural': { src: '/models/NeuralHealthV03.mp4', label: 'Neural\nHealth' },
  'neurotrans': { src: '/models/Neurotransmiters.mp4', label: 'Synapse\nActivity' },
  'gutzoomer': { src: '/models/MasterGutZoomerV03.mp4', label: 'Microbiome\nFlora' },
  'cardio': { src: '/models/CardioZoomerNew.mp4', label: 'Arterial\nPlaque' },
  'hormone_z': { src: '/models/Hormones3D.mp4', label: 'Steroid\nPathways' }
}

export default function SubHotspotInfoView({ subHotspotId, categoryData, onClose }) {
  const subData = categoryData?.subHotspots?.find(s => s.id === subHotspotId) || {}
  const activeVideo = VIDEO_MAP[subData.id]
  
  const videoRef = useRef(null)
  const videoElementRef = useRef(null)
  const wrapperRef = useRef(null)
  const labelRef = useRef(null)
  const scrollerRef = useRef(null)
  const contentRef = useRef(null)

  // Explicit Video Loader to aggressively bypass Browser AutoPlay safety blocks
  useEffect(() => {
    if (activeVideo && videoElementRef.current) {
      videoElementRef.current.src = activeVideo.src
      videoElementRef.current.load()
      
      const playPromise = videoElementRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn(`Browser autoplay blocked or video load failed for ${activeVideo.src}:`, error)
        })
      }
    }
  }, [activeVideo])

  // GSAP Scroll-Triggered Morphing Logic
  useEffect(() => {
    // Apabila tombol tidak memiliki mapping video, animasi timeline dilewati
    if (!activeVideo || !videoRef.current || !wrapperRef.current || !labelRef.current || !scrollerRef.current || !contentRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contentRef.current,
        scroller: scrollerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2
      }
    })

    // Phase 1: Grow & Morph dari Circle 250px ke Rounded Rectangle 45vw
    tl.to(wrapperRef.current, { width: '45vw', height: '75vh', right: '4%', duration: 1, ease: 'power1.inOut' }, 'grow')
      .to(videoRef.current, { borderRadius: '32px', duration: 1, ease: 'power1.inOut' }, 'grow')
      .to(labelRef.current, { bottom: '25%', left: '15%', scale: 1.5, duration: 1, ease: 'power1.inOut' }, 'grow')

    // Phase 2: Shrink & Morph kembali menjadi Circle
    tl.to(wrapperRef.current, { width: '250px', height: '250px', right: '18%', duration: 1, ease: 'power1.inOut' }, 'shrink')
      .to(videoRef.current, { borderRadius: '50%', duration: 1, ease: 'power1.inOut' }, 'shrink')
      .to(labelRef.current, { bottom: '8%', left: '8%', scale: 1.0, duration: 1, ease: 'power1.inOut' }, 'shrink')

    return () => {
      tl.kill()
    }
  }, [activeVideo])

  return (
    <div className="sub-info-overlay">
      
      <button className="sub-info-back-btn" onClick={onClose} aria-label="Back">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a3a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <div className="sub-info-top-navbar">
        <div className="nav-pill-container">
          <span className="nav-subtitle">{subData.label}:</span>
          <div className="nav-active-btn">Test Overview</div>
        </div>
      </div>

      {activeVideo && (
        <div className="oxi-video-position-wrapper" ref={wrapperRef}>
          <div className="oxi-video-container" ref={videoRef}>
            <video 
              ref={videoElementRef}
              autoPlay 
              loop 
              muted 
              playsInline
              className="oxi-video-element"
            />
            <div className="oxi-label" ref={labelRef}>
              {activeVideo.label.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i === 0 && <br/>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Left Main Content Panel */}
      <div className="sub-info-side-panel">
        <div className="panel-scroll-area" ref={scrollerRef}>
          <div className="scroll-content-wrapper" ref={contentRef}>
            <h1 className="panel-title">
              Comprehensive<br />
              {subData.label} Screen —<br />
              Deep Tissue Analysis
            </h1>
            
            <div className="panel-body-text">
              <p><strong>The {subData.label}</strong> aids in detecting early bio-markers and anomalous antigens associated with systemic {categoryData?.label?.toLowerCase()} conditions. Early detection is paramount for preventative protocols before deeper tissue damage occurs.</p>
              
              <p>{categoryData?.label} diseases often simmer for years before clinical diagnosis, causing preventable tissue damage and inflammation.</p>
              
              <p>This comprehensive panel detects immunological activity in its very early stages. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id arcu ac urna hendrerit accumsan. Suspendisse potenti. Nam varius massa nec justo aliquet, in ullamcorper dolor fermentum.</p>
              
              <br/><br/><br/>
              <h3>Section 2: Inter-Cellular Breakdown</h3>
              <p>Scroll down to see the video scale up dynamically via GSAP ScrollTrigger. Fusce in mi felis. Aenean volutpat libero non bibendum venenatis. Curabitur quis sapien lectus.</p>
              <br/><br/><br/><br/><br/><br/>
              
              <h3>Section 3: Reactive Oxygen Species (ROS)</h3>
              <p>Continue scrolling to watch the video seamlessly scale back down to its initial size, demonstrating the peak interactive GSAP dampening effects typically found on Awwwards platforms.</p>
              <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
              
              <p>Aliquam ac justo vel nibh bibendum congue nec vel orci. Phasellus sed velit dapibus, aliquet mi eu, condimentum nisl. Nunc bibendum erat ut turpis finibus pharetra.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
