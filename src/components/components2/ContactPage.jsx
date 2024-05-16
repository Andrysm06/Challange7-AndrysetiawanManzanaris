import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

function ContactPage() {
  return (
    <div className="container mx-auto py-8 px-4 lg:px-8">
      <div className="mb-6 md:mb-0">
        <a href="/" className="text-yellow-400 text-xl font-bold">
          WMovies
        </a>
      </div>
      <h1 className="text-white text-3xl font-bold mb-4">Contact Us</h1>
      <div className="flex flex-col space-y-4">
        <p className="text-lg text-white">
          Please contact us via one of the following methods:
        </p>
        <div className="flex flex-col space-y-2">
          <p className="text-lg text-white">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="mr-2 text-yellow-400"
            />
            Email:{" "}
            <a href="https://mail.google.com/" className="text-yellow-400">
              wmovies@gmail.com
            </a>
          </p>
          <p className="text-lg text-white">
            <FontAwesomeIcon
              icon={faInstagram}
              className="mr-2 text-yellow-400"
            />
            Instagram:{" "}
            <a href="https://instagram.com/" className="text-yellow-400">
              @wmovies
            </a>
          </p>
          <p className="text-lg text-white">
            <FontAwesomeIcon
              icon={faTwitter}
              className="mr-2 text-yellow-400"
            />
            Twitter:{" "}
            <a href="https://twitter.com/" className="text-yellow-400">
              @wmovies
            </a>
          </p>
        </div>
      </div>
      <Link
        to="/"
        className="inline-block mt-12 bg-yellow-300 rounded-full px-8 py-3 text-white font-semibold hover:bg-yellow-200"
      >
        Back To Home
      </Link>
    </div>
  );
}

export default ContactPage;
