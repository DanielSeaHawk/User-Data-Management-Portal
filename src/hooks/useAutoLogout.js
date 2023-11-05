import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/api/reducer/authSlice";
import { useEffect } from "react";

export const useAutoLogout = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const timeout = auth.expirationTime - Date.now();
    if (timeout < 6000) {
      dispatch(logout());
      return;
    }

    const timer = setTimeout(() => {
      dispatch(logout());
    }, timeout);
    
    return () => {
      clearTimeout(timer);
    };
  }, [auth, dispatch]);
};
export default useAutoLogout;
