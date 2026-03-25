import PageTransition from '../components/PageTransition';

export default function Contact() {
  return (
    <PageTransition>
      <div className="page-container standard-page">
        <div className="content-wrapper">
          <h2>Hubungi Kami</h2>
          <p className="page-subtitle">Punya pertanyaan atau ingin bekerja sama? Sampaikan pesan Anda.</p>
          
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input type="text" placeholder="Masukkan nama..." required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="email@contoh.com" required />
              </div>
              <div className="form-group">
                <label>Pesan</label>
                <textarea rows="5" placeholder="Tuliskan pesan Anda di sini..." required></textarea>
              </div>
              <button type="submit" className="submit-btn primary-btn">Kirim Pesan</button>
            </form>

            <div className="contact-info">
              <h3>Detail Kontak</h3>
              <p>📍 Gedung Kesehatan, Jakarta, Indonesia</p>
              <p>📧 support@somalab.id</p>
              <p>📞 +62 811 2345 6789</p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
