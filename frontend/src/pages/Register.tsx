import { useForm } from "react-hook-form";

type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {

    const { register, watch, handleSubmit } = useForm<RegisterFormData>();

    const onSubmit = handleSubmit((data)=>{
        console.log(data);
    })
    
    return (
        <form className="flex bg-indigo-100 p-5 rounded-lg flex-col gap-5" onSubmit={onSubmit}>

            <h2 className="text-3xl font-bold">Create an account</h2>

            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input
                        className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:border-indigo-500"
                        {...register("firstName", { required: "This field is required" })}
                    ></input>
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input
                        className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:border-indigo-500"
                        {...register("lastName", { required: "This field is required" })}
                    ></input>
                </label>
            </div>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input
                    type="email"
                    className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:border-indigo-500"
                    {...register("email", { required: "This field is required" })}
                ></input>
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
                            message: "Password must be at least 6 characters long"
                        }
                    })}
                ></input>
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
                            }
                            else if (watch("password") !== val) {
                                return "Your passwords do not match";
                            }
                        }
                    })}
                ></input>
            </label>

            <span>
                <button
                type="submit"
                className="bg-indigo-600 text-yellow-300 text-xl rounded-md py-2 px-4 font-bold hover:bg-indigo-500 hover:text-white duration-200">Create Account</button>
            </span>

        </form>
    )
}

export default Register;