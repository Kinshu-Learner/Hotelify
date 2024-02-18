import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutBUtton from "./SignOutButton";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
  const [nav, setNav] = useState(false);
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-indigo-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">
            Hotelify<span className="text-yellow-400">.</span>com
          </Link>
        </span>
        <span className="flex">
          {isLoggedIn ? (
            <>
              <button className="sm:hidden" onClick={() => setNav(!nav)}>
                {nav ? (
                  <FaTimes className="text-white" size={20} />
                ) : (
                  <FaBars className="text-white" size={20} />
                )}
              </button>
              <div className="hidden sm:flex">
                <Link
                  className="p-2 mr-5 hover:bg-indigo-500 duration-200 rounded font-semibold text-white"
                  to="/my-bookings"
                >
                  My Bookings
                </Link>
                <Link
                  className="p-2 mr-5 hover:bg-indigo-500 duration-200 rounded font-semibold text-white"
                  to="/my-hotels"
                >
                  My Hotels
                </Link>
                <SignOutBUtton />
              </div>
              <div
                className={`flex flex-col sm:hidden justify-center items-center absolute top-0 left-0 w-full ${
                  nav ? "translate-y-20 h-[28vh]" : "-translate-y-40 h-0"
                } backdrop-blur-sm duration-300 ease-in-out`}
              >
                <Link
                  className="p-2 w-52 text-center mb-4 bg-indigo-500 bg-opacity-80 duration-200 rounded font-semibold text-white "
                  to="/my-bookings"
                  onClick={() => setNav(!nav)}
                >
                  My Bookings
                </Link>
                <Link
                  className="p-2 w-52 text-center mb-4 bg-indigo-500 bg-opacity-80 duration-200 rounded font-semibold text-white "
                  to="/my-hotels"
                  onClick={() => setNav(!nav)}
                >
                  My Hotels
                </Link>
                <SignOutBUtton />
              </div>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="p-2 rounded bg-yellow-300 text-indigo-700 px-3 font-bold hover:bg-yellow-100 duration-200"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
