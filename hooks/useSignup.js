import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const [isCancelled, setIsCancelled] = useState(false);
  const router = useRouter();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!res) throw new Error("Could not complete signup");

      //add display name to user
      await res.user.updateProfile({ displayName });

      //login

      dispatch({ type: "LOGIN", payload: res.user });

      setError(null);
      setIsPending(false);
      router.push('/')
    } catch (error) {
      
      setError(err.message);
      setIsPending(false);
    }
  };

  return { error, isPending, signup };
};
