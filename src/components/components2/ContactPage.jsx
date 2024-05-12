import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ContactPage() {
  return (
    <div className="container mx-auto py-8 px-4 lg:px-8">
      <div className="mb-6 md:mb-0">
        <a href="/" className="text-yellow-400 text-xl font-bold">
          WMovies
        </a>
      </div>
      <h1 className="text-white text-3xl font-bold mb-4">Kontak Kami</h1>
      <div className="flex flex-col space-y-4">
        <p className="text-lg text-white">
          Silakan hubungi kami melalui salah satu metode berikut:
        </p>
        <div className="flex flex-col space-y-2">
          <p className="text-lg text-white">Email: wmovies@gmail.com</p>
          <p className="text-lg text-white">Telepon: 123-456-789</p>
          <p className="text-lg text-white"></p>
        </div>
      </div>
      <Link
        to="/"
        className="inline-block mt-12 bg-yellow-300 rounded-full px-8 py-3 text-white font-semibold hover:bg-yellow-200"
      >
        Back To Home
      </Link>
    </div>
  );
}

export default ContactPage;
