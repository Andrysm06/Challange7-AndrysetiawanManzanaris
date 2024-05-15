import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div className="container mx-auto py-8 px-4 lg:px-8">
      <div className="mb-6 md:mb-0">
        <a className="text-yellow-400 text-xl font-bold">WMovies</a>
      </div>
      <h1 className="text-white text-3xl font-bold mb-4">About Us</h1>
      <p className="text-lg text-white mb-4">
        WMovies adalah sebuah situs web yang berfungsi sebagai database untuk
        berbagai film, menyediakan informasi yang komprehensif mengenai
        film-film tersebut. Berikut adalah beberapa fitur utama yang ditawarkan
        oleh WMovies:
      </p>
      <p className="text-lg text-white mb-4">
        Setiap film yang terdaftar di WMovies disertai dengan detail lengkap
        yang mencakup:
        <ul className="list-disc list-inside">
          <li>
            <strong>Judul Film</strong>: Nama film tersebut.
          </li>
          <li>
            <strong>Rating</strong>: Penilaian atau skor yang diberikan oleh
            penonton atau kritikus film.
          </li>
          <li>
            <strong>Sinopsis</strong>: Ringkasan cerita atau plot utama dari
            film.
          </li>
          <li>
            <strong>Negara</strong>: Negara asal produksi film tersebut.
          </li>
          <li>
            <strong>Tanggal Rilis</strong>: Tanggal resmi film dirilis di
            bioskop atau platform lainnya.
          </li>
          <li>
            <strong>Genre</strong>: Kategori atau jenis film, seperti drama,
            komedi, aksi, horor, dan sebagainya.
          </li>
        </ul>
      </p>
      <p className="text-lg text-white mb-4">
        Situs ini memiliki bagian yang menampilkan film-film dengan rating
        tertinggi, yang disusun berdasarkan penilaian dari penonton dan
        kritikus. Fitur ini membantu pengguna menemukan film-film berkualitas
        tinggi dan paling direkomendasikan untuk ditonton.
      </p>
      <p className="text-lg text-white mb-4">
        Fitur pencarian memungkinkan pengguna untuk mencari film berdasarkan
        judul, negara, atau kriteria lainnya. Ini memudahkan pengguna untuk
        menemukan informasi spesifik tentang film yang mereka cari.
      </p>
      <p className="text-lg text-white mb-4">
        Bagian ini menampilkan film-film yang sedang populer dan banyak
        dibicarakan oleh publik saat ini. Fitur ini terus diperbarui secara
        berkala untuk memastikan bahwa pengguna mendapatkan informasi tentang
        film-film yang sedang menjadi tren.
      </p>

      <p className="text-lg text-white mb-4">
        Dengan berbagai fitur yang komprehensif ini, WMovies menjadi alat yang
        sangat berguna bagi para penggemar film untuk menemukan dan melihat
        nilai film dari film-film favorit mereka.
      </p>

      <Link
        to="/"
        className="inline-block mt-12 bg-yellow-300 rounded-full px-8 py-3 text-white font-semibold hover:bg-yellow-200"
      >
        Back To Home
      </Link>
    </div>
  );
}

export default AboutPage;
