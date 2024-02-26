import { useState } from "react";
import { postRegister } from "@api/user/userApi";
import { isString, removePhoneMask } from "@utils/stringHelper";
import { DutyShift } from "@api/dutyRequest/types";

const useDutyRequest = () => {
  const [date, setDate] = useState("");
  const [shift, setShift] = useState<DutyShift | null>(null);
  const [note, setNote] = useState("");
 
  const [isProcessing, setIsProcessing] = useState(false);

  const isFormValid = isString(date)

  const save = async () => {
    setIsProcessing(true);

    const payload = {
      date
    };

    setIsProcessing(false);

    return true;
  };

  return {
    date,
    setDate,
    shift,
    setShift,
    note,
    setNote,
    isProcessing,
    isFormValid,
    save,
  };
};

export default useDutyRequest;
