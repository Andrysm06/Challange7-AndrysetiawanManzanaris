import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./Andrysm06/HomePage";
import MovieDetails from "./Andrysm06/MovieDetail";
import SearchMovies from "./Andrysm06/SearchMovies";
import Login from "./Andrysm06/Login";
import Profil from "./Andrysm06/Profil";
import Register from "./Andrysm06/Register";
import LoginWithGoogle from "./Andrysm06/LoginWithGoogle";
import PopularMovies from "./Andrysm06/PopularMovies";
import TrandingMovies from "./Andrysm06/TrandingMovies";
import AboutPage from "./components/components2/AboutPage";
import ContactPage from "./components/components2/ContactPage";
import UpcomingMovies from "./Andrysm06/UpComingMovies";
import PopularTV from "./Andrysm06/serialTV/PopularTv";
import TopRatedTV from "./Andrysm06/serialTV/TopRatedTv";
import DetailTV from "./Andrysm06/serialTV/TvDetail";
import TrendingMovies from "./Andrysm06/Trending";
import SearchTV from "./Andrysm06/SearchTv";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/movie-details",
      element: <MovieDetails />,
    },
    {
      path: "/TopRatedMovies",
      element: <PopularMovies />,
    },
    {
      path: "/search-movie",
      element: <SearchMovies />,
    },
    {
      path: "/search-tv",
      element: <SearchTV />,
    },
    {
      path: "/Login-register",
      element: <Login />,
    },
    {
      path: "/profil",
      element: <Profil />,
    },
    {
      path: "/Register",
      element: <Register />,
    },
    {
      path: "/Google",
      element: <LoginWithGoogle />,
    },
    {
      path: "/TrandingMovies",
      element: <TrandingMovies />,
    },
    {
      path: "/Trending",
      element: <TrendingMovies />,
    },
    {
      path: "/AboutPage",
      element: <AboutPage />,
    },
    {
      path: "/ContactPage",
      element: <ContactPage />,
    },
    {
      path: "/UpComingMovies",
      element: <UpcomingMovies />,
    },
    {
      path: "/PopularTv",
      element: <PopularTV />,
    },
    {
      path: "/TopRatedTv",
      element: <TopRatedTV />,
    },
    {
      path: "/tv-details",
      element: <DetailTV />,
    },
  ]);

  return <RouterProvider router={router} />;
}
