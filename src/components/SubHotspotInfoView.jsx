import React from 'react'

export default function SubHotspotInfoView({ subHotspotId, categoryData, onClose }) {
  const subData = categoryData?.subHotspots?.find(s => s.id === subHotspotId) || {}

  return (
    <div className="sub-info-overlay">
      
      {/* Top Left Back Button */}
      <button className="sub-info-back-btn" onClick={onClose} aria-label="Back">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a3a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      {/* Top Navbar Menu */}
      <div className="sub-info-top-navbar">
        <div className="nav-pill-container">
          <span className="nav-subtitle">{subData.label}:</span>
          <div className="nav-active-btn">Test Overview</div>
        </div>
      </div>

      {/* Left Main Content Panel */}
      <div className="sub-info-side-panel">
        <div className="panel-scroll-area">
          <h1 className="panel-title">
            Comprehensive<br />
            {subData.label} Screen —<br />
            Deep Tissue Analysis
          </h1>
          
          <div className="panel-body-text">
            <p><strong>The {subData.label}</strong> aids in detecting early bio-markers and anomalous antigens associated with systemic {categoryData?.label?.toLowerCase()} conditions. Early detection is paramount for preventative protocols before deeper tissue damage occurs.</p>
            
            <p>{categoryData?.label} diseases often simmer for years before clinical diagnosis, causing preventable tissue damage and inflammation.</p>
            
            <p>This comprehensive panel detects immunological activity in its very early stages. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id arcu ac urna hendrerit accumsan. Suspendisse potenti. Nam varius massa nec justo aliquet, in ullamcorper dolor fermentum.</p>
            
            <p>Fusce in mi felis. Aenean volutpat libero non bibendum venenatis. Curabitur quis sapien lectus. Donec interdum efficitur erat vel pretium. Vivamus quis magna at dui ullamcorper varius sed eget elit.</p>
            
            <p>Nunc facilisis augue at elit scelerisque, nec ullamcorper tortor varius. Praesent laoreet odio at nulla rhoncus scelerisque. Morbi tincidunt risus in felis vestibulum, non euismod nulla dictum.</p>
            
            <p>Aliquam ac justo vel nibh bibendum congue nec vel orci. Phasellus sed velit dapibus, aliquet mi eu, condimentum nisl. Nunc bibendum erat ut turpis finibus pharetra.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
