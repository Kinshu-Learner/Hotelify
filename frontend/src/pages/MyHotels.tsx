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
    </div>
  );
};

export default MyHotels;
