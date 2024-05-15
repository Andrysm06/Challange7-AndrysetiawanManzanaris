import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const API_KEY = "86805d3f5cae4725244fe5e0f2c0bc28";
const API_URL = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US`;

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
  return (
    <div className="flex items-center absolute top-0 left-0 ml-2 mt-2">
      {stars}
    </div>
  );
};

const PopularTV = () => {
  const [tvShows, setTvShows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const fetchPopularTV = async () => {
      try {
        const response = await axios.get(`${API_URL}&page=${currentPage}`);
        setTvShows(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching popular TV shows:", error);
      }
    };

    fetchPopularTV();
  }, [currentPage]);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-gray-900 text-white min-h-screen"
      >
        {!isLoggedIn ? (
          <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <p className="text-lg mb-4">
              You must first log in to view popular TV shows.
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
              className=" mt-1 px-2 py-2 text-yellow-400 hover:text-yellow-200 mr-4"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="container mx-auto py-12 relative">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">
              Trending TV Shows
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tvShows.map((tv) => (
                <motion.div
                  key={tv.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col relative"
                  onClick={() => {
                    navigate("/tv-details", { state: { id: tv.id } });
                  }}
                >
                  <img
                    className="w-full h-[300px] object-cover mb-2"
                    src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
                    alt={tv.name}
                  />
                  <p className="text-sm md:text-base font-semibold line-clamp-2">
                    {tv.name}
                  </p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="flex items-center mt-1"
                  >
                    <div className="w-4 mr-1">
                      <StarRating rating={tv.vote_average} />
                    </div>
                    <p className="text-sm font-semibold">{tv.first_air_date}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={`${
                  currentPage === 1 ? "bg-gray-700" : "bg-yellow-400"
                } px-4 py-2 rounded-full mr-2`}
              >
                Prev
              </motion.button>
              {[...Array(totalPages > 8 ? 8 : totalPages).keys()].map((num) => {
                const pageNumber =
                  currentPage > 5 ? currentPage + num - 4 : num + 1;
                return (
                  <motion.button
                    key={pageNumber}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`${
                      currentPage === pageNumber
                        ? "bg-yellow-400"
                        : "bg-gray-700"
                    } px-4 py-2 rounded-full mr-2`}
                  >
                    {pageNumber}
                  </motion.button>
                );
              })}
              {totalPages > 8 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setCurrentPage(currentPage + 8)}
                  className="bg-gray-700 px-4 py-2 rounded-full"
                >
                  ...
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`${
                  currentPage === totalPages ? "bg-gray-700" : "bg-yellow-400"
                } px-4 py-2 rounded-full ml-2`}
              >
                Next
              </motion.button>
            </div>
          </div>
        )}
        <Footer />
      </motion.div>
    </div>
  );
};

export default PopularTV;
