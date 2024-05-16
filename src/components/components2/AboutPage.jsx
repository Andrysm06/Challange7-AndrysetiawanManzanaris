import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

function AboutPage() {
  return (
    <div className="container mx-auto py-8 px-4 lg:px-8">
      <div className="mb-6 md:mb-0">
        <a className="text-yellow-400 text-xl font-bold">WMovies</a>
      </div>
      <h1 className="text-white text-3xl font-bold mb-4">About Us</h1>
      <p className="text-lg text-white mb-4">
        WMovies is a website that serves as a database for various films and TV
        shows, providing comprehensive information about them. Here are some of
        the main features offered by WMovies:
      </p>
      <p className="text-lg text-white mb-4">
        Every movie or TV show listed on WMovies is accompanied by complete
        details which include:
        <ul className="list-disc list-inside">
          <li>
            <strong>Title</strong>: The name of the movie or TV show.
          </li>
          <li>
            <strong>Rating</strong>: Assessment or score given by audiences or
            critics.
          </li>
          <li>
            <strong>Synopsis</strong>: A summary of the story or main plot.
          </li>
          <li>
            <strong>Country</strong>: The country of origin of the movie or TV
            show.
          </li>
          <li>
            <strong>Release Date</strong>: The official release date of the
            movie in theaters or on other platforms.
          </li>
          <li>
            <strong>Genre</strong>: Category or type of the movie or TV show,
            such as drama, comedy, action, horror, etc.
          </li>
        </ul>
      </p>
      <p className="text-lg text-white mb-4">
        This site has a section that displays movies and TV shows with the
        highest ratings, sorted based on ratings from audiences and critics.
        This feature helps users find high-quality and highly recommended movies
        and TV shows to watch.
      </p>
      <p className="text-lg text-white mb-4">
        The search feature allows users to search for movies and TV shows by
        title, country, or other criteria. This makes it easy for users to find
        specific information about the movies and TV shows they are looking for.
      </p>
      <p className="text-lg text-white mb-4">
        This section showcases movies and TV shows that are currently popular
        and widely talked about by the public. This feature is regularly updated
        to ensure that users get information about trending movies and TV shows.
      </p>
      <p className="text-lg text-white mb-4">
        With these comprehensive features, WMovies becomes a very useful tool
        for film and TV show enthusiasts to discover and assess their favorite
        movies and TV shows.
      </p>

      <p className="text-lg text-white mb-4">
        <FontAwesomeIcon icon={faPen} className="mr-2 text-yellow-400" />
        Created by <span className="font-bold">Andry Setiawan Manzanaris</span>.
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
