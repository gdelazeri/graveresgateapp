import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { DutyPosition, DutyPositionLabel, DutyShift, DutyShiftLabelTimes } from "@api/dutyRequest/types";
import { useUserContext } from "@context/userContext";
import { isString } from "@utils/stringHelper";
import { UserPermission } from "@api/user/types";
import { postDutyRequest } from "@api/dutyRequest/dutyRequestApi";

const useDutyRequest = () => {
  const [date, setDate] = useState("");
  const [shift, setShift] = useState<DutyShift | null>(null);
  const [startAt, setStartAt] = useState<string | null>(null);
  const [endAt, setEndAt] = useState<string | null>(null);
  const [positions, setPositions] = useState<DutyPosition[]>([]);
  const [note, setNote] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { userData } = useUserContext();

  const isFormValid = isString(date) && shift !== null && positions.length > 0;

  const shiftOptions = useMemo(() => {
    let optionList = [DutyShift.DAY, DutyShift.NIGHT]

    if (moment(date).weekday() === 4) optionList = [DutyShift.NIGHT]
    if (moment(date).weekday() === 0) optionList = [DutyShift.DAY]

    return [...optionList]
      .map((value) => ({
        key: value.toString(),
        label: DutyShiftLabelTimes[value as DutyShift],
        value: value
      }))
  }, [date])

  const positionOptions = useMemo(() => {
    let optionList = []

    if (userData?.permission === UserPermission.TRAINEE) {
      optionList = [DutyPosition.TRAINEE]
    } else {
      optionList = [DutyPosition.RESCUER, DutyPosition.RADIO_OPERATOR]
      if (userData?.isDriver) optionList.push(DutyPosition.DRIVER)
      if (userData?.isLeader) optionList.push(DutyPosition.LEADER)
    }

    return [...optionList]
      .map((value) => ({
        key: value.toString(),
        label: DutyPositionLabel[value as DutyPosition],
        value: value
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [userData])

  useEffect(() => {
    if (userData?.permission === UserPermission.TRAINEE) {
      setPositions([DutyPosition.TRAINEE])
    }
  }, [userData])

  const save = async () => {
    setIsProcessing(true);

    const payload = {
      date,
      shift: shift as DutyShift,
      startAt: startAt as string,
      endAt: endAt as string,
      note,
      positions,
    };

    const response = await postDutyRequest(payload);

    setIsProcessing(false);

    return response?.result
  };

  return {
    date,
    setDate,
    shift,
    setShift,
    startAt,
    setStartAt,
    endAt,
    setEndAt,
    positions,
    setPositions,
    note,
    setNote,
    isProcessing,
    isFormValid,
    save,
    shiftOptions,
    positionOptions,
  };
};

export default useDutyRequest;
