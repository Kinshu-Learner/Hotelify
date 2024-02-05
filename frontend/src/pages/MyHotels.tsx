import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";

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
          to="add-hotel"
          className="p-2 rounded bg-yellow-300 text-indigo-700 px-3 font-bold hover:bg-yellow-100 duration-200"
        >
          Add Hotel
        </Link>
      </span>
      <div className="flex flex-col gap-8">
        {hotelData.map((hotel) => (
          <div className="flex flex-col justify-between bg-violet-100 rounded-lg p-8 gap-5">
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border bg-violet-200 border-slate-300 rounded p-3 flex items-center">
                {hotel.city}, {hotel.country}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
