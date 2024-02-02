import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";

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

const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>(); // Instead of destructuring register etc fns from useForm, we're taking all of those properties and assigning then to a single variable (formMethods).
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((formData: HotelFormData) => {
    console.log(formData);
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
            type="submit"
            className="bg-indigo-600 text-white text-xl rounded py-2 px-6 font-bold hover:bg-indigo-500 hover:text-yellow-300 duration-200"
          >
            Save
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
