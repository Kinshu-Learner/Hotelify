import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

const EditHotel = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ""), // We did this || "" thing cuz it makes TS happy. Otherwise we've already applied a check for !!hotelId below.
    {
      enabled: !!hotelId, // This is to disable the fetchMyHotelById function if hotelId is not present.
    }
  );

  return <ManageHotelForm hotel={hotel} />;
};

export default EditHotel;
