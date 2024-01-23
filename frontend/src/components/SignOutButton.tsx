import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutBUtton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken"); // This await will make sure to run the "validateToken" query, without refreshing the page.
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
      className="p-2 rounded-sm bg-yellow-300 text-indigo-700 px-3 font-bold hover:bg-yellow-100 duration-200"
    >
      Sign Out
    </button>
  );
};

export default SignOutBUtton;
