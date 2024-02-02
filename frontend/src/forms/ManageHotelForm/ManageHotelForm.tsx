import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";

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
  return (
    // Spreading all the properties (in formMethods) as children to the FormProvider.
    // We're technically defining a formContext here.
    <FormProvider {...formMethods}>
      <form className="flex bg-violet-100 p-5 rounded-lg flex-col gap-10">
        <DetailsSection />
        <TypeSection />
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
