import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import Loader from "../../components/Loader";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList; // Note that it's not a stirng array here
  adultCount: number;
  childCount: number;
};

type Props = {
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading }: Props) => {
  const formMethods = useForm<HotelFormData>(); // Instead of destructuring register etc fns from useForm, we're taking all of those properties and assigning then to a single variable (formMethods).
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString()); // This is cuz FormData() only works with Strings, and pricePerNight is a number.
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    // This is cuz "FileList" type doesn't let us use forEach etc, so we first make an array out of it.
    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });
  return (
    // Spreading all the properties (in formMethods) as children to the FormProvider.
    // We're technically defining a formContext here.
    <FormProvider {...formMethods}>
      <form
        className="flex bg-violet-100 p-5 rounded-lg flex-col gap-10"
        onSubmit={onSubmit}
      >
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-indigo-600 text-white text-xl rounded h-10 w-24 font-bold hover:bg-indigo-500 hover:text-yellow-200 duration-200 disabled:bg-gray-500"
          >
            <div className="flex text-center items-center justify-center">
              {isLoading ? <Loader /> : "Save"}
            </div>
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
