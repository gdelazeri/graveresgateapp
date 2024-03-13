import { useEffect, useState } from "react";
import { DutyRequest } from "@api/dutyRequest/types";
import { listDutyRequests } from "@api/dutyRequest/dutyRequestApi";
import { Duty } from "@api/duty/types";
import { getDuty, postDuty } from "@api/duty/dutyApi";

interface UseDutyFormProps {
  duty: Duty
}

const useDutyForm = ({ duty }: UseDutyFormProps) => {
  const [leaderId, setLeaderId] = useState<string | null>(null);
  const [driverId, setDriverId] = useState<string | null>(null);
  const [firstRescuerId, setFirstRescuerId] = useState<string | null>(null);
  const [secondRescuerId, setsScondRescuerId] = useState<string | null>(null);
  const [radioOperatorId, setRadioOperatorId] = useState<string | null>(null);
  const [assistantRadioOperatorId, setAssistantRadioOperatorId] = useState<string | null>(null);
  const [traineeId, setTraineeId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dutyRequestList, setDutyRequestList] = useState<DutyRequest[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      const responseDuty = await getDuty(duty.date, duty.shift);

      if (responseDuty.success && responseDuty.result) {
        setLeaderId(responseDuty.result.leaderId);
        setDriverId(responseDuty.result.driverId);
        setFirstRescuerId(responseDuty.result.firstRescuerId);
        setsScondRescuerId(responseDuty.result.secondRescuerId);
        setRadioOperatorId(responseDuty.result.radioOperatorId);
        setAssistantRadioOperatorId(responseDuty.result.assistantRadioOperatorId);
        setTraineeId(responseDuty.result.traineeId);
      }

      const responseDutyRequests = await listDutyRequests(duty.date, duty.shift);
      if (responseDutyRequests.success && responseDutyRequests.result) {
        setDutyRequestList(responseDutyRequests.result);
      }

      setIsLoading(false)
    }
    fetchData();
  }, [])

  const save = async () => {
    setIsProcessing(true);

    const payload = {
      date: duty.date,
      shift: duty.shift,
      leaderId,
      driverId,
      firstRescuerId,
      secondRescuerId,
      radioOperatorId,
      assistantRadioOperatorId,
      traineeId,
    };

    const response = await postDuty(payload);

    setIsProcessing(false);

    return response
  };

  return {
    isLoading,
    isProcessing,
    leaderId,
    setLeaderId,
    driverId,
    setDriverId,
    firstRescuerId,
    setFirstRescuerId,
    secondRescuerId,
    setsScondRescuerId,
    radioOperatorId,
    setRadioOperatorId,
    assistantRadioOperatorId,
    setAssistantRadioOperatorId,
    traineeId,
    setTraineeId,
    dutyRequestList,
    save
  };
};

export default useDutyForm;
