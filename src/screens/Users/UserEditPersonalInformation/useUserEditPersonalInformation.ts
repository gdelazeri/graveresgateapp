import { putUserData } from "@api/user/userApi";
import { User } from "@api/user/types";
import { isEmail, removePhoneMask } from "@utils/stringHelper";
import { useEffect, useMemo, useState } from "react";

export const useUserEditPersonalInformation = (user: User) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [registrationId, setRegistrationId] = useState("");

  const isFullNameValid =
    fullName.length > 3 && fullName.trim().split(" ").length > 1;
  const isEmailValid = isEmail(email);
  const isPhoneValid = removePhoneMask(phone).length === 11;
  const isRegistrationIdValid = !registrationId || registrationId.length === 0 || registrationId.length > 3;

  const isFormValid = useMemo(
    () =>
      isFullNameValid &&
      isEmailValid &&
      isPhoneValid,
    [
      isFullNameValid,
      isEmailValid,
      isPhoneValid
    ],
  );

  useEffect(() => {
    setFullName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setRegistrationId(user.registrationId);
  }, [user]);

  const save = async () => {
    setIsProcessing(true);
    const response = await putUserData(
      user.id,
      {
        name: fullName,
        email,
        phone: removePhoneMask(phone),
        registrationId,
      }
    )
    setIsProcessing(false);

    return response !== null
  }

  return {
    isProcessing,
    fullName,
    setFullName,
    email,
    setEmail,
    phone,
    setPhone,
    registrationId,
    setRegistrationId,
    isFullNameValid,
    isEmailValid,
    isPhoneValid,
    isFormValid,
    isRegistrationIdValid,
    save,
  } as const;
}