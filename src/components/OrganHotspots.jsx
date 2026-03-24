import { Html } from '@react-three/drei'

export default function OrganHotspots({ organs, activeOrgan, onSelect, onHover }) {
  return (
    <group>
      {organs.map((organ) => {
        const isActive = activeOrgan === organ.id
        return (
          <Html
            key={organ.id}
            position={organ.position}
            center
            zIndexRange={[100, 0]}
          >
            <div
              className={`hotspot-wrapper ${isActive ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                onSelect(isActive ? null : organ.id)
              }}
              onPointerEnter={() => onHover(organ.id)}
              onPointerLeave={() => onHover(null)}
            >
              <div className="hotspot-ring-outer" />
              <div className="hotspot-ring-inner">
                {isActive ? (
                  <div className="hotspot-tri-dots">
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                  </div>
                ) : (
                  <div className="hotspot-dot" />
                )}
              </div>
            </div>
          </Html>
        )
      })}
    </group>
  )
}
