import { userAuthContext } from "./userAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const { dispatch } = userAuthContext();

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    // Then navigate to the login page.


    // Optionally, you can also remove the user from local storage if needed.
    localStorage.removeItem('user');
  };

  return { logout };
};