import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Signed in Successfully!", type: "SUCCESS" });
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

      <span className="flex items-center justify-between">
        <span className="text-sm font-semibold">
          Not Registered?{" "}
          <Link className="text-indigo-800 underline" to="/register">
            Create an account here
          </Link>
        </span>
        <button
          type="submit"
          className="bg-indigo-600 text-white text-xl rounded py-2 px-4 font-bold hover:bg-indigo-500 hover:text-yellow-200 duration-200"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default SignIn;
