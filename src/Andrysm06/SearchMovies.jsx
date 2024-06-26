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
  const [isPlaying, setIsPlaying] = useState(false); // Added state for playing trailer
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
                  <div className="task-bar mb-4 flex flex-col md:flex-row items-center justify-between">
                    <h2 className="text-white text-2xl md:text-3xl font-semibold mb-2 md:mb-0">
                      Search Movies or TV Shows
                    </h2>
                    <div>
                      <button
                        className={`px-4 py-2 rounded-l-md ${
                          searchType === "movie" ? "bg-blue-500" : "bg-gray-700"
                        }`}
                        onClick={() => setSearchType("movie")}
                      >
                        Movies
                      </button>
                      <button
                        className={`px-4 py-2 rounded-r-md ${
                          searchType === "tv" ? "bg-blue-500" : "bg-gray-700"
                        }`}
                        onClick={() => {
                          setSearchType("tv");
                          navigate("/search-tv");
                        }}
                      >
                        TV Shows
                      </button>
                    </div>
                  </div>
                  <div className="relative mb-4">
                    <input
                      type="text"
                      placeholder={`Search ${
                        searchType === "movie" ? "movies" : "TV shows"
                      }...`}
                      value={searchTerm}
                      onChange={handleSearch}
                      className="bg-gray-800 text-white px-4 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-200"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 absolute right-3 top-3 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.5 17.5l4.5 4.5"
                      />
                    </svg>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {Array.isArray(searchResults) ? (
                      searchResults.map((e) => (
                        <motion.div
                          key={e.id}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col relative cursor-pointer"
                          onClick={() => {
                            navigate("/movie-details", { state: { id: e.id } });
                          }}
                        >
                          <img
                            className="w-full h-[300px] object-cover mb-2"
                            src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                            alt={e.title}
                          />
                          <p className="text-sm md:text-base font-semibold line-clamp-2">
                            {e.title}
                          </p>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            className="flex items-center mt-1"
                          >
                            <div className="w-4 mr-1">
                              <StarRating rating={e.vote_average} />
                            </div>
                          </motion.div>
                        </motion.div>
                      ))
                    ) : (
                      <p>
                        Data is not available or is not in the expected format.
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between mt-4">
                    {/* Pagination buttons */}
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
