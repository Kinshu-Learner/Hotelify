import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../shared/types";
import { Link } from "react-router-dom";

type Props = {
  hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg bg-indigo-50 p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center rounded"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div className="">
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map(() => (
                <AiFillStar className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
          <Link to={`/detail/${hotel._id}`} className="text-2xl font-bold">
            {hotel.name}
          </Link>
        </div>

        <div className="">
          <div className="line-clamp-4">{hotel.description}</div>
        </div>

        <div className="grid grid-cols-2 items-end whitespace-nowrap pt-1 2xl:pt-0">
          <div className="flex gap-1 items-center -top-20 2xl:top-0 relative">
            <div className="hidden 2xl:flex gap-1 items-center">
              {hotel.facilities.slice(0, 3).map((facility) => (
                <span className="bg-slate-300 p-2 rounded-lg font-bold text-sm whitespace-nowrap">
                  {facility}
                </span>
              ))}

              <span className="text-sm">
                {hotel.facilities.length > 3 &&
                  `+${hotel.facilities.length - 3} more`}
              </span>
            </div>

            <div className="flex 2xl:hidden gap-1 items-center">
              {hotel.facilities.slice(0, 2).map((facility) => (
                <span className="bg-slate-300 p-2 rounded-lg font-bold text-sm whitespace-nowrap">
                  {facility}
                </span>
              ))}

              <span className="text-sm">
                {hotel.facilities.length > 2 &&
                  `+${hotel.facilities.length - 2} more`}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold">
              &#8377;{hotel.pricePerNight} per night
            </span>
            <Link
              to={`/detail/${hotel._id}`}
              className="bg-indigo-600 text-white h-full p-2 font-bold text-xl max-w-fit hover:bg-indigo-500 rounded duration-200"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
