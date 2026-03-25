import PageTransition from '../components/PageTransition';

export default function Content() {
  const articles = [
    { title: "Menjaga Kesehatan Jantung", desc: "Tips kardiovaskular untuk gaya hidup modern.", icon: "🤍" },
    { title: "Rahasia Usus Sehat", desc: "Bagaimana mikrobioma memengaruhi kesehatan mental.", icon: "🦠" },
    { title: "Sistem Saraf & Stres", desc: "Mengelola kortisol dalam kehidupan sehari-hari.", icon: "🧠" },
    { title: "Pentingnya Filter Toksin", desc: "Peran hati dan ginjal yang tak tergantikan.", icon: "🧪" }
  ];

  return (
    <PageTransition>
      <div className="page-container standard-page">
        <div className="content-wrapper">
          <h2>Konten Edukasi Kesehatan</h2>
          <p className="page-subtitle">Pahami fungsi vital tubuh Anda melalui bacaan kurasi kami.</p>
          
          <div className="articles-grid">
            {articles.map((art, i) => (
              <div key={i} className="article-card">
                <div className="article-icon">{art.icon}</div>
                <h3>{art.title}</h3>
                <p>{art.desc}</p>
                <button className="read-more-btn">Baca Artikel</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
