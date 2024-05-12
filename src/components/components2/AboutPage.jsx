import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div className="container mx-auto py-8 px-4 lg:px-8">
      <div className="mb-6 md:mb-0">
        <a className="text-yellow-400 text-xl font-bold">WMovies</a>
      </div>
      <h1 className="text-white text-3xl font-bold mb-4">Tentang Kami</h1>
      <p className="text-lg text-white">
        WMovies adalah sebuah platform daring yang didedikasikan untuk
        menghadirkan pengalaman menonton film yang luar biasa kepada pengguna di
        seluruh dunia. Salah satu aspek yang membuat WMovies unik adalah
        komitmen kami untuk membuat film-film berkualitas yang menghibur dan
        mendidik.
      </p>
      <p className="text-lg text-white">
        Tim kreatif kami terdiri dari para sutradara, penulis skenario,
        produser, dan banyak lagi, yang bekerja keras setiap hari untuk
        menghasilkan karya yang menakjubkan. Kami percaya bahwa setiap film
        memiliki cerita yang layak untuk diceritakan, dan kami berusaha untuk
        mempersembahkan berbagai jenis cerita dari berbagai latar belakang dan
        budaya.
      </p>
      <p className="text-lg text-white">
        Di WMovies, kami memahami bahwa pembuatan film adalah kolaborasi tim
        yang kompleks. Mulai dari pra-produksi hingga produksi dan
        pasca-produksi, kami mengutamakan kualitas dan inovasi dalam setiap
        langkahnya. Dengan menggunakan teknologi terbaru dan talenta kreatif
        terbaik, kami berusaha untuk membuat pengalaman menonton yang tidak
        terlupakan bagi penonton kami.
      </p>
      <p className="text-lg text-white">
        Kami bangga dengan portofolio film-film kami yang beragam, mulai dari
        drama, komedi, hingga film-film dokumenter yang mendalam. Setiap film
        yang kami produksi adalah hasil dari dedikasi kami untuk berkarya dan
        memberikan dampak positif bagi masyarakat.
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
