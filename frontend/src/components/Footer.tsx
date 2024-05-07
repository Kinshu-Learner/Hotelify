import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-indigo-800 py-10">
      <div className="md:container mx-auto flex flex-col md:flex-row">
        <div className="text-white font-medium md:w-3/4 bg-indigo-900 p-4 max-md:mx-3 max-md:mb-4 rounded-md">
          <div className="text-3xl mb-3 pb-1 border-b-4 border-yellow-400 w-3/4 font-bold">
            About Us
          </div>
          <div className="">
            <div>
              Welcome to
              <Link to="/" className="text-lg mb-2">
                {" "}
                Hotelify<span className="text-yellow-400">.</span>com
              </Link>
              , your premier destination for seamless hotel bookings worldwide.
              Find your next stay with us and discover the best hotels at the
              best prices for your dream vacation.
            </div>
            <div className="text-yellow-300 text-lg font-semibold mt-2">
              For Travelers:
            </div>
            Embark on your journey with confidence as you explore our vast
            selection of hotels spanning the globe. Our intuitive platform
            empowers you to find the perfect lodging tailored to your unique
            preferences. Sign up for exclusive perks or dive right in to explore
            our curated collection of accommodations.
            <div className="text-yellow-300 text-lg font-semibold mt-2">
              For Hotel Owners:
            </div>
            Join our community of hospitality professionals and showcase your
            property to a global audience of discerning travelers. With
            Hotelify, reaching potential guests has never been easier. Simply
            create your account, add your hotel details, and start welcoming
            guests from around the world.
            <div className="mt-2">
              <span className="text-xl font-semibold text-yellow-300">
                Empower{" "}
              </span>
              your travels.{" "}
              <span className="text-xl font-semibold text-yellow-300">
                Elevate{" "}
              </span>{" "}
              your experience.{" "}
              <span className="text-xl font-semibold text-yellow-300">
                Discover{" "}
              </span>{" "}
              the world with
              <Link to="/" className="text-lg mb-2">
                {" "}
                Hotelify<span className="text-yellow-400">.</span>com
              </Link>
            </div>
          </div>
        </div>

        <div className="text-white font-bold flex flex-col gap-4 mt-5 ml-6 md:ml-12 md:w-1/4 w-3/4">
          <div className="text-2xl w-full mb-3 pb-1 border-b-4 border-yellow-400 font-bold">
            Connect With Us
          </div>
          <a
            href="https://github.com/Kinshu-Learner/booking-app-mern"
            target="_blank"
            rel="noreferrer"
            className="flex items-center group"
          >
            <AiFillGithub
              size={40}
              className="max-md:my-2 mr-2 text-white group-hover:text-yellow-300 duration-300"
            />
            <span className="max-md:my-2 mr-2 text-white group-hover:text-yellow-300 duration-300">
              GitHub Repo Link
            </span>
          </a>
          <a
            href="https://www.linkedin.com/in/kinshu-raj-gupta/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center group"
          >
            <AiFillLinkedin
              size={40}
              className="max-md:my-2 mr-2 text-white group-hover:text-yellow-300 duration-300"
            />
            <span className="max-md:my-2 mr-2 text-white group-hover:text-yellow-300 duration-300">
              LinkedIn
            </span>
          </a>

          <a
            href="mailto:kinshurajgupta1@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center group"
          >
            <MdOutlineEmail
              size={40}
              className="max-md:my-2 mr-2 text-white group-hover:text-yellow-300 duration-300"
            />
            <span className="max-md:my-2 mr-2 text-white group-hover:text-yellow-300 duration-300">
              Email
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
