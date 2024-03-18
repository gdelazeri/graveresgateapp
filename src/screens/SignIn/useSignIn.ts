import { useEffect, useMemo, useState } from "react";
import { postLogin } from "@api/user/userApi";
import { isEmail, isString } from "@utils/stringHelper";
import { useUserContext } from "@context/userContext";
import storage, { STORAGE_KEYS } from "@utils/storage";

const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setTokens } = useUserContext();

  const isEmailValid = email.length === 0 || isEmail(email);
  const isPasswordValid = password.length === 0 || password.length >= 8;

  const isFormValid = useMemo(
    () => isString(email)
    && isEmailValid
    && isString(password)
    && isPasswordValid,
    [
      email,
      isEmailValid,
      password,
      isPasswordValid
    ],
  );

  const getCredentials = async () => {
    setIsLoading(true);
    const usernameStored = await storage.get(STORAGE_KEYS.USERNAME);
    const passwordStored = await storage.get(STORAGE_KEYS.PASSWORD);

    if (isString(usernameStored) && isString(passwordStored)) {
      setEmail(String(usernameStored));
      setPassword(String(passwordStored));
    }

    setIsLoading(false);
  }

  useEffect(() => {
    getCredentials(); 
  }, [])

  const login = async () => {
    try {
      setIsProcessing(true);
      setIsError(false)
  
      const payload = {
        email: email.trim(),
        password,
      };
  
      const response = await postLogin(payload);
  
      setIsProcessing(false);
  
      if (response?.success) {
        await storage.set(STORAGE_KEYS.USERNAME, payload.email);
        await storage.set(STORAGE_KEYS.PASSWORD, payload.password);
        await setTokens({
          newAccessToken: response.result.accessToken,
          newRefreshToken: response.result.refreshToken,
        });
      } else {
        setIsError(true)
      }
  
      return response?.success;
    } catch (err) {
      setIsProcessing(false);
      setIsError(true)
      return false;
    }
  };

  return {
    isLoading,
    email,
    setEmail,
    password,
    setPassword,
    isProcessing,
    isEmailValid,
    isPasswordValid,
    isFormValid,
    isError,
    login,
  };
};

export default useSignIn;
