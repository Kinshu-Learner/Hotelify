import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutBUtton = () => {
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: () => {
      showToast({ message: "Signed Out Successfully", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
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
