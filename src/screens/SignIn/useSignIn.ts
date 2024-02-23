import { useMemo, useState } from "react";
import { postLogin } from "@api/user/userApi";
import { isEmail } from "@utils/stringHelper";
import { useUserContext } from "@context/userContext";

const useSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setTokens } = useUserContext();

  const isEmailValid = isEmail(email);
  const isPasswordValid = password.length >= 8;

  const isFormValid = useMemo(
    () => isEmailValid && isPasswordValid,
    [isEmailValid, isPasswordValid],
  );

  const login = async () => {
    setIsProcessing(true);
    setIsError(false)

    const payload = {
      email: email.trim(),
      password,
    };

    const response = await postLogin(payload);

    setIsProcessing(false);

    if (response?.success) {
      await setTokens({
        newAccessToken: response.result.accessToken,
        newRefreshToken: response.result.refreshToken,
      });
    } else {
      setIsError(true)
    }

    return response?.success;
  };

  return {
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