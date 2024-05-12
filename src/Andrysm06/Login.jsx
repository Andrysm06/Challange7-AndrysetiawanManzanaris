import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoginWithGoogle from "./LoginWithGoogle";

const MotionButton = motion.button;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        await fetchUserData();
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "An error occurred");
      } else {
        setError("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("User data:", response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-screen"
    >
      <Navbar />
      <h2 className="mb-8 text-white text-xl font-bold">Login</h2>
      <>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-64 px-4 py-2 mb-4 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-64 px-4 py-2 mb-4 border rounded-lg"
        />
        <MotionButton
          onClick={handleLogin}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-64 px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none"
        >
          {loading ? "Loading..." : "Login"}
        </MotionButton>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        <Link to="/register" className="text-white mt-2 hover:text-yellow-200">
          Don't have an account? Register
        </Link>
      </>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="mb-2 text-justify text-white"
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <motion.div
          style={{ flex: 1, height: "1px", background: "white" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          or
        </motion.div>
        <motion.div
          style={{ flex: 1, height: "1px", background: "white" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </motion.div>
      <LoginWithGoogle />
    </motion.div>
  );
};

export default Login;
