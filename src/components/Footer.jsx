import React from "react";
import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black/20"
    >
      <div className="container mx-auto py-8 px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="/" className="text-yellow-400 text-xl font-bold">
              WMovies
            </a>
          </div>
          <div className="flex justify-center md:justify-end">
            <ul className="flex flex-row text-xs md:text-sm text-white space-x-7 md:p-0">
              <li>
                <a href="/AboutPage" className="hover:text-gray-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="/ContactPage" className="hover:text-gray-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center items-center h-1">
          <p className="text-xs md:text-sm text-white">
            &copy; WMovies {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
