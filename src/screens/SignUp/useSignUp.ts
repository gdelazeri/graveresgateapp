import { useMemo, useState } from "react";
import { postRegister } from "@api/user/userApi";
import { isEmail, removePhoneMask } from "@utils/stringHelper";
import { useUserContext } from "@context/userContext";

const useSignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { setTokens } = useUserContext();

  const isFullNameValid =
    fullName.length > 3 && fullName.trim().split(" ").length > 1;
  const isEmailValid = isEmail(email);
  const isPhoneValid = removePhoneMask(phone).length === 11;
  const isPasswordValid = password.length >= 8;
  const isPasswordsEqual = password === passwordConfirm;

  const isFormValid = useMemo(
    () =>
      isFullNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isPasswordValid &&
      isPasswordsEqual,
    [
      isFullNameValid,
      isEmailValid,
      isPhoneValid,
      isPasswordValid,
      isPasswordsEqual,
    ],
  );

  const register = async () => {
    setIsProcessing(true);

    const payload = {
      name: fullName.trim(),
      email: email.trim(),
      phone: removePhoneMask(phone),
      password,
    };

    const response = await postRegister(payload);

    setIsProcessing(false);

    if (response?.success) {
      await setTokens({
        newAccessToken: response.result.accessToken,
        newRefreshToken: response.result.refreshToken,
      });
    }

    return response?.success;
  };

  return {
    fullName,
    setFullName,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    isProcessing,
    isFullNameValid,
    isEmailValid,
    isPhoneValid,
    isPasswordValid,
    isPasswordsEqual,
    isFormValid,
    register,
  };
};

export default useSignUp;
