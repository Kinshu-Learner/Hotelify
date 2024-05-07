import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-3 bg-yellow-400 rounded shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4 "
    >
      <div className="flex items-center focus-within:outline focus-within:outline-1 focus-within:outline-indigo-500 rounded flex-1 bg-violet-50 p-2">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          className="text-md w-full bg-violet-50 focus:outline-none"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
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
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>

        <label className="items-center flex">
          Children:
          <input
            type="number"
            className="w-full p-1 focus:outline-none bg-violet-50 font-bold"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>

      <div className="focus-within:outline rounded focus-within:outline-1 focus-within:outline-indigo-500">
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
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
      <div className="focus-within:outline rounded focus-within:outline-1 focus-within:outline-indigo-500">
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="w-2/3 sm:w-full min-w-full bg-violet-50 rounded p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>

      <div className="flex gap-1">
        <button className="w-full lg:w-2/3 bg-indigo-600 text-white h-full p-2 font-bold text-xl hover:bg-indigo-500 rounded duration-200">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
