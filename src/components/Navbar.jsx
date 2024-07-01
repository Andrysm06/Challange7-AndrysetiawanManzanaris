import React, { useState, useEffect } from "react";
import { Search, Check, X, Menu, LogOut } from "react-feather";

function Navbar() {
  const [confirmLogout, setConfirmLogout] = useState(false); // State for logout confirmation
  const [showTVMenu, setShowTVMenu] = useState(false); // State for showing TV submenu
  const [showMoviesMenu, setShowMoviesMenu] = useState(false); // State for showing Movies submenu
  const [isScrolled, setIsScrolled] = useState(false); // State for tracking scroll
  const [lastScrollTop, setLastScrollTop] = useState(0); // State for tracking last scroll position
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    setConfirmLogout(true); // Show logout confirmation modal
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    setConfirmLogout(false); // Hide logout confirmation modal
  };

  const handleCancelLogout = () => {
    setConfirmLogout(false); // Hide logout confirmation modal
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      setIsScrolled(currentScrollTop > 0);
      if (currentScrollTop < lastScrollTop) {
        setIsScrolled(false);
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  const toggleTVMenu = () => {
    setShowTVMenu((prev) => !prev);
    setShowMoviesMenu(false); // Close Movies menu when toggling TV menu
  };

  const toggleMoviesMenu = () => {
    setShowMoviesMenu((prev) => !prev);
    setShowTVMenu(false); // Close TV menu when toggling Movies menu
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev); // Toggle mobile menu visibility
  };

  return (
    <nav
      className={`py-4 px-3 fixed top-0 w-full z-10 bg-navy transition-all ${
        isScrolled ? "-translate-y-full" : ""
      }`}
    >
      <div className="container flex justify-between items-center">
        <a href="/" className="text-yellow-400 text-2xl font-bold">
          WMovies
        </a>
        <div className="hidden md:flex items-center gap-4 relative">
          <div>
            <a
              href="#"
              className="text-white hover:text-yellow-200 transition-colors duration-300"
              onClick={toggleTVMenu} // Toggle TV submenu visibility on click
            >
              TV Shows
            </a>
            {showTVMenu && (
              <div className="absolute top-full left-0 bg-navy text-white py-2 px-4 rounded shadow-lg">
                <a
                  href="/PopularTv"
                  className="block py-1 hover:text-yellow-200"
                >
                  Trending TV
                </a>
                <a
                  href="/TopRatedTv"
                  className="block py-1 hover:text-yellow-200"
                >
                  Top TV
                </a>
              </div>
            )}
          </div>
          <div>
            <a
              href="#"
              className="text-white hover:text-yellow-200 transition-colors duration-300"
              onClick={toggleMoviesMenu} // Toggle Movies submenu visibility on click
            >
              Movies
            </a>
            {showMoviesMenu && (
              <div className="absolute top-full left-0 bg-navy text-white py-2 px-4 rounded shadow-lg">
                <a
                  href="/Trending"
                  className="block py-1 hover:text-yellow-200"
                >
                  Trending Movies
                </a>
                <a
                  href="/TopRatedMovies"
                  className="block py-1 hover:text-yellow-200"
                >
                  Top Rated Movies
                </a>
                <a
                  href="/UpcomingMovies"
                  className="block py-1 hover:text-yellow-200"
                >
                  Upcoming Movies
                </a>
              </div>
            )}
          </div>

          <a
            href="/search-movie"
            className="text-white hover:text-yellow-200 transition-colors duration-300 flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Search
          </a>
          {token ? (
            <div>
              <button
                onClick={handleLogout} // Use handleLogout to show logout confirmation modal
                className="bg-red-700 rounded-full px-3 py-1 text-white hover:bg-red-900 flex items-center gap-1"
              >
                <LogOut size={16} />
                <span className="hidden md:block">Logout</span>
              </button>
            </div>
          ) : (
            <a href="/Login-register">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full shadow-lg">
                Login
              </button>
            </a>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu}>
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-navy text-white py-2 px-4 rounded shadow-lg">
          <div className="flex flex-col gap-4">
            <a
              href="#"
              className="hover:text-yellow-200 transition-colors duration-300"
              onClick={toggleTVMenu} // Toggle TV submenu visibility on click
            >
              TV Shows
            </a>
            {showTVMenu && (
              <div className="pl-4">
                <a
                  href="/PopularTv"
                  className="block py-1 hover:text-yellow-200"
                >
                  Trending TV
                </a>
                <a
                  href="/TopRatedTv"
                  className="block py-1 hover:text-yellow-200"
                >
                  Top TV
                </a>
              </div>
            )}
            <a
              href="#"
              className="hover:text-yellow-200 transition-colors duration-300"
              onClick={toggleMoviesMenu} // Toggle Movies submenu visibility on click
            >
              Movies
            </a>
            {showMoviesMenu && (
              <div className="pl-4">
                <a
                  href="/Trending"
                  className="block py-1 hover:text-yellow-200"
                >
                  Trending Movies
                </a>
                <a
                  href="/TopRatedMovies"
                  className="block py-1 hover:text-yellow-200"
                >
                  Top Rated Movies
                </a>
                <a
                  href="/UpcomingMovies"
                  className="block py-1 hover:text-yellow-200"
                >
                  Upcoming Movies
                </a>
              </div>
            )}
            <a
              href="/search-movie"
              className="hover:text-yellow-200 transition-colors duration-300 flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              Search
            </a>
            {token ? (
              <button
                onClick={handleLogout} // Use handleLogout to show logout confirmation modal
                className="bg-red-700 hover:bg-red-900 text-white font-bold py-1 px-3 rounded-full shadow-lg"
              >
                <span className="">Logout</span>
              </button>
            ) : (
              <a href="/Login-register">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full shadow-lg">
                  Login
                </button>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {confirmLogout && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg text-center z-20">
            <p className="mb-4 text-lg">Are you sure you want to logout?</p>
            <div className="flex justify-center">
              <button
                onClick={handleConfirmLogout} // Use handleConfirmLogout to logout
                className="bg-red-700 rounded-full px-3 py-1 text-white mr-2 hover:bg-red-900"
              >
                <Check size={16} />
              </button>
              <button
                onClick={handleCancelLogout} // Use handleCancelLogout to cancel logout
                className="bg-gray-300 rounded-full px-3 py-1 text-gray-700 hover:bg-gray-400"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
