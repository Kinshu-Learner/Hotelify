import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Successfull!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
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
      <h2 className="text-3xl font-bold">Create an account</h2>

      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:border-indigo-500"
            {...register("firstName", { required: "This field is required" })}
          ></input>
          {errors.firstName && (
            <span className="text-yellow-600">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:border-indigo-500"
            {...register("lastName", { required: "This field is required" })}
          ></input>
          {errors.lastName && (
            <span className="text-yellow-600">{errors.lastName.message}</span>
          )}
        </label>
      </div>

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
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:border-indigo-500"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do not match";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className="text-yellow-600">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>

      <span>
        <button
          type="submit"
          className="bg-indigo-600 text-white text-xl rounded py-2 px-4 font-bold hover:bg-indigo-500 hover:text-yellow-300 duration-200"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
