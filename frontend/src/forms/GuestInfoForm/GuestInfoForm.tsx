import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";

type Props = {
    hotelId: string;
    pricePerNight: number;
};

type GuestInfoFormData = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
}

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
    const {
        watch,
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<GuestInfoFormData>();

    const checkIn = watch("checkIn");
    const checkOut = watch("checkOut");

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    return (
        <div className="flex flex-col p-4 bg-indigo-200 gap-4">
            <h3 className="text-md font-bold">Rs. {pricePerNight} per night</h3>
            <form >
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
                </div>
            </form>
        </div>
    )
};

export default GuestInfoForm