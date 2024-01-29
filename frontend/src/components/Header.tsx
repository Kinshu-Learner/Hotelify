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
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <button className="sm:hidden" onClick={() => setNav(!nav)}>
                {nav ? (
                  <FaTimes className="text-white" size={20} />
                ) : (
                  <FaBars className="text-white" size={20} />
                )}
              </button>
              <div className="hidden sm:flex flex-col sm:flex-row">
                <Link
                  className="p-2 hover:bg-indigo-500 duration-200 rounded-sm font-semibold text-white"
                  to="/my-bookings"
                >
                  My Bookings
                </Link>
                <Link
                  className="p-2 hover:bg-indigo-500 duration-200 rounded-sm font-semibold text-white"
                  to="/my-hotels"
                >
                  My Hotels
                </Link>
                <SignOutBUtton />
              </div>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="p-2 rounded-sm bg-yellow-300 text-indigo-700 px-3 font-bold hover:bg-yellow-100 duration-200"
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
