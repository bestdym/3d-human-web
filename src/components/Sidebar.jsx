export default function Sidebar({ organs, activeOrgan, onSelect, onHover }) {
  // Sidebar items matched with Organs array
  return (
    <div className={`sidebar ${activeOrgan ? 'hidden' : ''}`}>
      <div className="sidebar-title">EXPLORE CATEGORIES</div>
      {organs.map((organ) => {
        const isActive = activeOrgan === organ.id
        return (
          <button
            key={organ.id}
            className={`organ-btn ${isActive ? 'active' : ''}`}
            onClick={() => onSelect(isActive ? null : organ.id)}
            onMouseEnter={() => onHover(organ.id)}
            onMouseLeave={() => onHover(null)}
          >
            <div className="organ-btn-content">
              <span className="organ-icon">{organ.icon}</span>
              <span>{organ.label}</span>
            </div>
            <span className="organ-arrow">›</span>
          </button>
        )
      })}
    </div>
  )
}
