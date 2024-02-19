import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-3">Guests</h2>

      <div className="grid grid-cols-2 gap-2">
        <label className="text-gray-700 text-sm font-semibold">
          Adults
          <input
            type="number"
            min={1}
            className="border rounded w-full py-2 px-3 font-normal focus:outline-none focus:border-indigo-500"
            {...register("adultCount", {
              required: "This field is required",
            })}
          />
          {errors.adultCount?.message && (
            <span className="text-yellow-600 text-sm font-bold">
              {errors.adultCount?.message}
            </span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-semibold">
          Children
          <input
            type="number"
            min={0}
            className="border rounded w-full py-2 px-3 font-normal focus:outline-none focus:border-indigo-500"
            {...register("childCount", {
              required: "This field is required",
            })}
          />
          {errors.childCount?.message && (
            <span className="text-yellow-600 text-sm font-bold">
              {errors.childCount?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
