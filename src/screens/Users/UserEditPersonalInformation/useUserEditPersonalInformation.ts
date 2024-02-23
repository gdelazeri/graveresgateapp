import { getUserById, putUserData } from "@api/user";
import { isEmail, removePhoneMask } from "@utils/stringHelper";
import { useEffect, useMemo, useState } from "react";

export const useUserEditPersonalInformation = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
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
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getUserById(id);
      if (response?.success) {
        setFullName(response.result.name);
        setEmail(response.result.email);
        setPhone(response.result.phone);
        setRegistrationId(response.result.registrationId);
      }
      setIsLoading(false);
    }

    fetchData();
  }, [id]);

  const save = async () => {
    setIsProcessing(true);
    const response = await putUserData(
      id,
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
    isLoading,
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