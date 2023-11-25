import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      if (res.user) {
        dispatch({ type: "LOGIN", payload: res.user });
        setIsPending(false);
        setError(null);
      } else throw new Error("Could not log in");
    } catch (err) {
      if (err.code === "auth/internal-error")
        setError("Invalid login credentials");
      else setError(err.message);
      setIsPending(false);
    }
  };

  return { login, isPending, error };
};
