import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
          type="name"
          className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:border-indigo-500"
          {...register("name", { required: "This field is required" })}
        ></input>
        {errors.name && (
          <span className="text-yellow-600">{errors.name.message}</span>
        )}
      </label>

      <div className="flex gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            type="city"
            className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:border-indigo-500"
            {...register("city", { required: "This field is required" })}
          ></input>
          {errors.city && (
            <span className="text-yellow-600">{errors.city.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Country
          <input
            type="country"
            className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:border-indigo-500"
            {...register("country", { required: "This field is required" })}
          ></input>
          {errors.country && (
            <span className="text-yellow-600">{errors.country.message}</span>
          )}
        </label>
      </div>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          rows={10}
          className="border resize-none rounded w-full py-1 px-2 font-normal focus:outline-none focus:border-indigo-500"
          {...register("description", { required: "This field is required" })}
        ></textarea>
        {errors.description && (
          <span className="text-yellow-600">{errors.description.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Price Per Night
        <input
          type="number"
          min={1}
          className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:border-indigo-500"
          {...register("pricePerNight", { required: "This field is required" })}
        ></input>
        {errors.pricePerNight && (
          <span className="text-yellow-600">
            {errors.pricePerNight.message}
          </span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
