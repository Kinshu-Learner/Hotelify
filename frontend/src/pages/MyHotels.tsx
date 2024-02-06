import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );

  if (!hotelData) {
    // so that hotelData doesn't go "undefined" in such cases, then we'll have an error while displaying it normally.
    return <span>No Hotels Found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="p-2 rounded bg-indigo-500 text-yellow-300 px-3 font-bold hover:bg-indigo-400 duration-200"
        >
          Add Hotel
        </Link>
      </span>
      <div className="flex flex-col gap-8">
        {hotelData.map((hotel) => (
          <div className="flex flex-col justify-between bg-violet-100 rounded-lg p-8 gap-5">
            <h2 className="text-2xl font-bold">{hotel.name}</h2>

            <div className="whitespace-pre-line">{hotel.description}</div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-2">
              <div className="border bg-violet-200 border-slate-300 rounded p-3 flex items-center">
                <BsMap className="mr-1" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border bg-violet-200 border-slate-300 rounded p-3 flex items-center">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="border bg-violet-200 border-slate-300 rounded p-3 flex items-center">
                <BiMoney className="mr-1" />
                Rs. {hotel.pricePerNight} per night
              </div>
              <div className="border bg-violet-200 border-slate-300 rounded p-3 flex items-center">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border bg-violet-200 border-slate-300 rounded p-3 flex items-center">
                <BiStar className="mr-1" />
                {hotel.starRating} Star Rating
              </div>
            </div>

            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="bg-indigo-600 text-white rounded py-2 px-4 font-bold hover:bg-indigo-500 hover:text-yellow-200 duration-200"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
