import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div className="container mx-auto py-8 px-4 lg:px-8">
      <div className="mb-6 md:mb-0">
        <a className="text-yellow-400 text-xl font-bold">WMovies</a>
      </div>
      <h1 className="text-white text-3xl font-bold mb-4">About Us</h1>
      <p className="text-lg text-white">
        WMovies is an online platform dedicated to delivering an extraordinary
        film-watching experience to users worldwide. One aspect that makes
        WMovies unique is our commitment to creating high-quality films that
        entertain and educate.
      </p>
      <p className="text-lg text-white">
        Our creative team consists of directors, screenwriters, producers, and
        more, who work hard every day to produce amazing works. We believe that
        every film has a story worth telling, and we strive to present a variety
        of stories from diverse backgrounds and cultures.
      </p>
      <p className="text-lg text-white">
        At WMovies, we understand that filmmaking is a complex team
        collaboration. From pre-production to production and post-production, we
        prioritize quality and innovation in every step. By using the latest
        technology and the best creative talent, we aim to create unforgettable
        viewing experiences for our audience.
      </p>
      <p className="text-lg text-white">
        We take pride in our diverse portfolio of films, ranging from drama,
        comedy, to in-depth documentary films. Every film we produce is the
        result of our dedication to creating and making a positive impact on
        society.
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
