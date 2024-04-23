import { useEffect, useMemo, useState } from "react";
import { postRegister } from "@api/user/userApi";
import { isEmail, isString, removePhoneMask } from "@utils/stringHelper";
import { useUserContext } from "@context/userContext";
import moment from "moment";
import { getAllCourses } from "@api/course/courseApi";
import { Course } from "@api/course/types";

const useSignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [courseId, setCourseId] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [courseList, setCourseList] = useState<Course[]>([]);
  const { setTokens } = useUserContext();

  const isFullNameValid =
    fullName.length === 0 ||
    (fullName.length > 3 && fullName.trim().split(" ").length > 1);
  const isEmailValid = email.length === 0 || isEmail(email);
  const isPhoneValid =
    phone.length === 0 || removePhoneMask(phone).length === 11;
  const isBirthDateValid = birthDate.length === 0 || birthDate.length === 10;
  const isPasswordValid = password.length === 0 || password.length >= 8;
  const isPasswordsEqual =
    passwordConfirm.length === 0 || password === passwordConfirm;

  const isFormValid = useMemo(
    () =>
      isString(fullName) &&
      isFullNameValid &&
      isString(email) &&
      isEmailValid &&
      isString(phone) &&
      isPhoneValid &&
      isString(birthDate) &&
      isBirthDateValid &&
      isString(password) &&
      isPasswordValid &&
      isString(passwordConfirm) &&
      isPasswordsEqual,
    [
      fullName,
      email,
      phone,
      birthDate,
      password,
      passwordConfirm,
      isFullNameValid,
      isEmailValid,
      isPhoneValid,
      isBirthDateValid,
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
      birthDate: moment(birthDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
      courseId,
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

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await getAllCourses();
      if (response && response.success) {
        setCourseList([...response.result]);
      }
    };
    fetchCourses();
  }, []);

  return {
    fullName,
    setFullName,
    email,
    setEmail,
    phone,
    setPhone,
    birthDate,
    setBirthDate,
    courseId,
    setCourseId,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    isProcessing,
    isFullNameValid,
    isEmailValid,
    isPhoneValid,
    isBirthDateValid,
    isPasswordValid,
    isPasswordsEqual,
    isFormValid,
    courseList,
    register,
  };
};

export default useSignUp;
