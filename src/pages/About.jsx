import PageTransition from '../components/PageTransition';

export default function About() {
  return (
    <PageTransition>
      <div className="page-container standard-page">
        <div className="content-wrapper">
          <h2>Tentang SomaLab</h2>
          <div className="text-content">
            <p>
              SomaLab adalah inisiatif edukasi kesehatan digital yang bertujuan untuk memberikan visualisasi 
              anatomi dan fungsi tubuh manusia yang paling akurat namun mudah diakses.
            </p>
            <p>
              Kami menggabungkan model medis 3D interaktif berteknologi tinggi dengan kurikulum edukasi kesehatan modern, 
              memberdayakan pengguna—baik profesional, siswa, maupun khalayak umum—untuk memahami kesehatan dari dalam ke luar.
            </p>
            
            <div className="about-features">
              <div className="feature-card">
                <h3>Akurasi Visual</h3>
                <p>Model 3D dikurasi untuk akurasi medis.</p>
              </div>
              <div className="feature-card">
                <h3>Interaktif</h3>
                <p>Jelajahi setiap lapisan tanpa batas pandang.</p>
              </div>
              <div className="feature-card">
                <h3>Edukasi Mendalam</h3>
                <p>Informasi ringkas berbasis sains terpercaya.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
