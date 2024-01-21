import { useMutation } from "react-query";
import * as apiClient from "../api-client";

const SignOutBUtton = () => {
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: () => {
      // Show toast
    },
    onError: () => {
      // show toast
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center rounded-sm bg-yellow-300 text-indigo-700 px-3 font-bold hover:bg-yellow-200 duration-100"
    >
      Sign Out
    </button>
  );
};

export default SignOutBUtton;
