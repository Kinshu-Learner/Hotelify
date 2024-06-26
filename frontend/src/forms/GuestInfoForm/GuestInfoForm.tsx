import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate("/sign-in", { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <div className="flex flex-col p-4 bg-indigo-200 rounded-md gap-4">
      <h3 className="text-md font-bold">Rs. {pricePerNight} per night</h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 gap-4 items-center">
          <div className="">
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="w-2/3 sm:w-full min-w-full bg-violet-50 p-2 rounded focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div className="">
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="w-2/3 sm:w-full min-w-full bg-violet-50 p-2 rounded focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div className="flex px-2 py-1 gap-2 focus-within:outline focus-within:outline-1 focus-within:outline-indigo-500 rounded flex-1 bg-violet-50">
            <label className="items-center flex">
              Adults:
              <input
                type="number"
                className="w-full p-1 focus:outline-none bg-violet-50 font-bold"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>

            <label className="items-center flex">
              Children:
              <input
                type="number"
                className="w-full p-1 focus:outline-none bg-violet-50 font-bold"
                min={0}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-yellow-700 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <button className="bg-indigo-600 text-white h-full p-2 font-bold hover:bg-indigo-500 text-xl duration-200 rounded-md">
              Book now
            </button>
          ) : (
            <button className="bg-indigo-600 text-white h-full p-2 font-bold hover:bg-indigo-500 text-xl duration-200 rounded-md">
              Sign in to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
