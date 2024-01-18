import { useForm } from "react-hook-form";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    formState: { errors },
  } = useForm<SignInFormData>();
  return (
    <form className="flex bg-violet-100 p-5 rounded-lg flex-col gap-5">
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
    </form>
  );
};

export default SignIn;
