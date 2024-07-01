import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const API_KEY = "86805d3f5cae4725244fe5e0f2c0bc28";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating / 2) {
      stars.push(
        <span key={i} className="text-yellow-400">
          ★
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="text-gray-400">
          ★
        </span>
      );
    }
  }
  return <>{stars}</>;
};

const SearchMovies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchType, setSearchType] = useState("movie");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim() === "") {
      setSearchResults([]);
      return;
    }
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/${searchType}?api_key=${API_KEY}&language=en-US&query=${e.target.value}&page=1&include_adult=false`
      );
      setSearchResults(response.data.results);
      setTotalPages(response.data.total_pages);

      // Jika jenis pencarian adalah "tv", navigasi ke halaman "/tv-show"
      if (searchType === "tv") {
        navigate("/tv-show");
      }
    } catch (error) {
      console.error("Error fetching search results: ", error);
      setError("Error fetching search results");
    }
  };

  // const goToPrevPage = () => {
  //   setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  // };

  // const goToNextPage = () => {
  //   setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  // };

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
              <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white px-4">
                <p className="text-lg mb-4 text-center">
                  You need to log in first to search for movies or TV shows.
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
                  className="mt-1 px-2 py-2 text-yellow-400 hover:text-yellow-200"
                >
                  Back to home
                </Link>
              </div>
            ) : (
              <div className="bg-navy text-white min-h-screen pt-16">
                <div className="container mx-auto px-4 py-8">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                    {!isPlaying && !isTrailerPlaying && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="mt-4 bg-yellow-400 rounded-full px-6 py-2 text-white font-semibold hover:bg-yellow-600 flex items-center"
                        onClick={goBack}
                      >
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                        Kembali
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
                        <h2 className="text-xl font-semibold">Negara Asal</h2>
                        <ul className="text-lg font-normal text-white ps-4 mb-4">
                          {data?.production_countries &&
                            data?.production_countries.map((country) => (
                              <li key={country.iso_3166_1}>{country.name}</li>
                            ))}
                        </ul>
                        <h2 className="text-xl font-semibold">Tanggal Rilis</h2>
                        <p className="text-lg font-normal text-white ps-4 mb-4">
                          {data?.first_air_date}
                        </p>
                        <h2 className="text-xl font-semibold">Genre</h2>
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
                        className=" mt-4 bg-blue-600 rounded-full px-6 py-2 text-white font-semibold hover:bg-blue-900 flex items-center"
                        onClick={() => {
                          setIsPlaying(true);
                          setIsTrailerPlaying(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faPlay} className="mr-2" />
                        Mainkan Trailer
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
                            Tutup Trailer
                          </button>
                        </motion.div>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between mt-4">
                    {/* <button
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === 1
                          ? "bg-gray-700 text-gray-400"
                          : "bg-blue-500 text-white hover:bg-blue-700"
                      }`}
                    >
                      Previous
                    </button> */}
                    {/* <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === totalPages
                          ? "bg-gray-700 text-gray-400"
                          : "bg-blue-500 text-white hover:bg-blue-700"
                      }`}
                    >
                      Next
                    </button> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchMovies;
