import { putUserData } from "@api/user/userApi";
import { User } from "@api/user/types";
import { isEmail, isString, removePhoneMask } from "@utils/stringHelper";
import { useEffect, useMemo, useState } from "react";
import { Course } from "@api/course/types";
import { getAllCourses } from "@api/course/courseApi";
import moment from "moment";

export const useUserEditPersonalInformation = (user: User) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState<string | null>("");
  const [courseId, setCourseId] = useState<string | null>(null);
  const [registrationId, setRegistrationId] = useState<string | null>("");
  const [courseList, setCourseList] = useState<Course[]>([]);

  const isFullNameValid =
    fullName.length > 3 && fullName.trim().split(" ").length > 1;
  const isEmailValid = isEmail(email);
  const isPhoneValid = removePhoneMask(phone).length === 11;
  const isRegistrationIdValid =
    !registrationId || registrationId.length === 0 || registrationId.length > 3;

  const isFormValid = useMemo(
    () => isFullNameValid && isEmailValid && isPhoneValid,
    [isFullNameValid, isEmailValid, isPhoneValid],
  );

  useEffect(() => {
    setFullName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setBirthDate(
      isString(user.birthDate)
        ? moment(user.birthDate).format("DD/MM/YYYY")
        : null,
    );
    setCourseId(user.courseId);
    setRegistrationId(user.registrationId);

    getAllCourses().then((response) => {
      if (response.success) {
        setCourseList([...response.result]);
      }
    });
  }, [user]);

  const save = async () => {
    setIsProcessing(true);
    const response = await putUserData(user.id, {
      name: fullName,
      email,
      phone: removePhoneMask(phone),
      birthDate: isString(user.birthDate)
        ? moment(birthDate, "DD/MM/YYYY").format("YYYY-MM-DD")
        : null,
      courseId,
      registrationId,
    });
    setIsProcessing(false);

    return response !== null;
  };

  return {
    isProcessing,
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
    registrationId,
    setRegistrationId,
    isFullNameValid,
    isEmailValid,
    isPhoneValid,
    isFormValid,
    isRegistrationIdValid,
    courseList,
    save,
  } as const;
};
