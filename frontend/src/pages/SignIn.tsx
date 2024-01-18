import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      console.log("User has been signed in");
      // 1. show the toast
      // 2. Navigate to the home page
    },
    onError: (error: Error) => {
      // Show the toast
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form
      className="flex bg-violet-100 p-5 rounded-lg flex-col gap-5"
      onSubmit={onSubmit}
    >
      <h2 className="text-3xl font-bold">Sign In</h2>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:border-indigo-500"
          {...register("email", { required: "This field is required" })}
        ></input>
        {errors.email && (
          <span className="text-yellow-600">{errors.email.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:border-indigo-500"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-yellow-600">{errors.password.message}</span>
        )}
      </label>

      <span>
        <button
          type="submit"
          className="bg-indigo-600 text-yellow-300 text-xl rounded-md py-2 px-4 font-bold hover:bg-indigo-500 hover:text-white duration-200"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default SignIn;
