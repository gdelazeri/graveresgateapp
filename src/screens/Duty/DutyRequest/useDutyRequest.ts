import { useState } from "react";
import { isString } from "@utils/stringHelper";
import { DutyPosition, DutyShift } from "@api/dutyRequest/types";

const useDutyRequest = () => {
  const [date, setDate] = useState("");
  const [shift, setShift] = useState<DutyShift | null>(null);
  const [positions, setPositions] = useState<DutyPosition[]>([]);
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
    positions,
    setPositions,
    note,
    setNote,
    isProcessing,
    isFormValid,
    save,
  };
};

export default useDutyRequest;
