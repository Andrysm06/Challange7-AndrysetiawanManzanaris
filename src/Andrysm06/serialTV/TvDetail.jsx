import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import YouTube from "react-youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const API_KEY = "86805d3f5cae4725244fe5e0f2c0bc28";

function DetailTV() {
  let location = useLocation();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [genres, setGenres] = useState([]);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);

  const fetchTVDetail = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${location.state.id}?language=en-US&api_key=${API_KEY}`
      );
      setData(response.data);

      // Fetch trailer data
      const trailerResponse = await axios.get(
        `https://api.themoviedb.org/3/tv/${location.state.id}/videos?api_key=${API_KEY}&language=en-US`
      );
      const trailer = trailerResponse.data.results.find(
        (video) => video.type === "Trailer"
      );
      if (trailer) {
        setTrailerUrl(trailer.key);
      }

      // Fetch genre data
      const genresResponse = await axios.get(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`
      );
      const genresMap = new Map(
        genresResponse.data.genres.map((genre) => [genre.id, genre.name])
      );
      const tvGenres = response.data.genres.map((genre) =>
        genresMap.get(genre.id)
      );
      setGenres(tvGenres);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError("Terjadi kesalahan saat mengambil data.");
    }
  };

  useEffect(() => {
    fetchTVDetail();
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (!isPlaying && isTrailerPlaying) {
      setTrailerUrl(""); // Stop autoplay when trailer is closed
    }
  }, [isPlaying, isTrailerPlaying]);

  const goBack = () => {
    window.history.back();
  };

  return (
    <div>
      <Navbar />
      <section>
        {error ? (
          <div className="flex justify-center items-center h-screen">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : (
          <div>
            {!isLoggedIn ? (
              <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
                <p className="text-lg mb-4">
                  You must first log in to view TV show details.
                </p>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  href="/Login-register"
                >
                  Login
                </motion.a>
                <Link
                  to="/"
                  className="mt-1 px-2 py-2 text-yellow-400 hover:text-yellow-200 mr-4"
                >
                  Back to Home
                </Link>
              </div>
            ) : (
              <div
                className="relative h-screen md:h-[600px] lg:h-[700px]"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${data?.backdrop_path})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black opacity-70"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                  {!isPlaying && !isTrailerPlaying && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="inline-block mt-4 bg-yellow-400 rounded-full px-6 py-2 text-white font-semibold hover:bg-yellow-600 flex items-center"
                      onClick={goBack}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                      Back
                    </motion.button>
                  )}
                  <h1 className="text-4xl font-bold mb-4">{data?.name}</h1>
                  {!isTrailerPlaying && (
                    <>
                      <h2 className="text-xl font-semibold">Rating</h2>
                      <p className="text-lg font-normal text-white ps-4">
                        {data?.vote_average}
                      </p>
                      <div className="flex justify-center items-center mb-4"></div>
                      <p className="text-lg mb-8">{data?.overview}</p>
                      <h2 className="text-xl font-semibold">
                        Country of Origin
                      </h2>
                      <ul className="text-lg font-normal text-white ps-4 mb-4">
                        {data?.production_countries &&
                          data?.production_countries.map((country) => (
                            <li key={country.iso_3166_1}>{country.name}</li>
                          ))}
                      </ul>
                      <h2 className="text-xl font-semibold">Release Date</h2>
                      <p className="text-lg font-normal text-white ps-4 mb-4">
                        {data?.first_air_date}
                      </p>
                      <h2 className="text-xl font-semibold">Genres</h2>
                      <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {genres.map((genre) => (
                          <span
                            key={genre}
                            className="bg-gray-800 text-white px-2 py-1 rounded"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </>
                  )}

                  {trailerUrl && !isPlaying && !isTrailerPlaying && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="inline-block mt-4 bg-blue-600 rounded-full px-6 py-2 text-white font-semibold hover:bg-blue-900 flex items-center"
                      onClick={() => {
                        setIsPlaying(true);
                        setIsTrailerPlaying(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faPlay} className="mr-2" />
                      Play Trailer
                    </motion.button>
                  )}

                  {trailerUrl && isPlaying && (
                    <div className="fixed inset-0 z-50 flex justify-center items-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <YouTube
                          videoId={trailerUrl}
                          opts={{ playerVars: { autoplay: 1 } }}
                        />
                        <button
                          onClick={() => {
                            setIsPlaying(false);
                            setIsTrailerPlaying(false);
                          }}
                          className="bg-red-700 text-white px-4 py-2 rounded mt-4 hover:bg-red-900"
                        >
                          Close Trailer
                        </button>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default DetailTV;
