import React, { useState } from "react";
import { Search, Check, X } from "react-feather";

function Navbar() {
  const [confirmLogout, setConfirmLogout] = useState(false); // State untuk konfirmasi logout
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    setConfirmLogout(true); // Menampilkan modal konfirmasi logout
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    setConfirmLogout(false); // Sembunyikan modal konfirmasi logout
  };

  const handleCancelLogout = () => {
    setConfirmLogout(false); // Sembunyikan modal konfirmasi logout
  };

  return (
    <nav className="py-4 px-3 fixed top-0 w-full z-10 bg-navy">
      <div className="container flex justify-between items-center">
        <a href="/" className="text-yellow-400 text-2xl font-bold">
          WMovies
        </a>
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/TopRatedMovies"
            className="text-white hover:text-yellow-200 transition-colors duration-300"
          >
            Top Movies
          </a>
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
                onClick={handleLogout} // Menggunakan handleLogout untuk menampilkan modal konfirmasi
                className="bg-red-700 rounded-full px-3 py-1 text-white hover:bg-red-900"
              >
                Logout
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
          <Search className="h-6 w-6 text-white" />
        </div>
      </div>
      {/* Modal Konfirmasi Logout */}
      {confirmLogout && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg text-center z-20">
            <p className="mb-4 text-lg">Are you sure you want to logout?</p>
            <div className="flex justify-center">
              <button
                onClick={handleConfirmLogout} // Menggunakan handleConfirmLogout untuk logout
                className="bg-red-700 rounded-full px-3 py-1 text-white mr-2 hover:bg-red-900"
              >
                <Check size={16} />
              </button>
              <button
                onClick={handleCancelLogout} // Menggunakan handleCancelLogout untuk membatalkan logout
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
