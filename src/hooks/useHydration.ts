import { setUserData } from "@/store/userSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useHydration = () => {
  const [isHydrate, setIshydrate] = useState(false);
  const dispatch = useDispatch();

  const hydrateAuth = () => {
    try {
      const user = localStorage.getItem("user");

      if (!user) return;

      const parsedUser = JSON.parse(user);
      dispatch(setUserData(parsedUser));
    } catch (error: any) {
      console.log(error);
    } finally {
      setIshydrate(true);
    }
  };

  useEffect(() => {
    hydrateAuth();
  }, []);

  return {
    isHydrate,
  };
};
