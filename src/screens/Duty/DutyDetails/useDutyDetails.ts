import { useCallback, useState } from "react";
import moment from "moment";
import { Duty } from "@api/duty/types";
import { getDuty, postDuty } from "@api/duty/dutyApi";
import { User } from "@api/user/types";
import { listDutyCareByDutyId } from "@api/dutyCareChecklist/dutyCareChecklistApi";
import { DutyCareChecklist } from "@api/dutyCareChecklist/types";
import { useFocusEffect } from "@react-navigation/native";
import { listChecklistsByDuty } from "@api/checklist/checklistApi";
import { DutyChecklist } from "@api/checklist/types";

interface UseDutyDetailsProps {
  duty: Duty;
}

const useDutyDetails = ({ duty }: UseDutyDetailsProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [leader, setLeader] = useState<User | null>(null);
  const [driver, setDriver] = useState<User | null>(null);
  const [firstRescuer, setFirstRescuer] = useState<User | null>(null);
  const [secondRescuer, setSecondRescuer] = useState<User | null>(null);
  const [radioOperator, setRadioOperator] = useState<User | null>(null);
  const [assistantRadioOperator, setAssistantRadioOperator] =
    useState<User | null>(null);
  const [trainee, setTrainee] = useState<User | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [note, setNote] = useState<string | null>(null);
  const [dutyCareChecklists, setDutyCareChecklists] = useState<
    DutyCareChecklist[]
  >([]);
  const [dutyChecklists, setDutyChecklists] = useState<DutyChecklist[]>([]);
  const isEditable = moment(duty.date).isSameOrAfter(
    moment().subtract(1, "day"),
    "day",
  );

  const fetchData = async () => {
    setIsLoading(true);

    const responseDuty = await getDuty(duty.date, duty.shift);

    if (responseDuty.success && responseDuty.result) {
      setLeader({
        id: responseDuty.result.leaderId,
        name: responseDuty.result.leaderName,
        imageUrl: responseDuty.result.leaderImageUrl,
      } as User);
      setDriver({
        id: responseDuty.result.driverId,
        name: responseDuty.result.driverName,
        imageUrl: responseDuty.result.driverImageUrl,
      } as User);
      setFirstRescuer({
        id: responseDuty.result.firstRescuerId,
        name: responseDuty.result.firstRescuerName,
        imageUrl: responseDuty.result.firstRescuerImageUrl,
      } as User);
      setSecondRescuer({
        id: responseDuty.result.secondRescuerId,
        name: responseDuty.result.secondRescuerName,
        imageUrl: responseDuty.result.secondRescuerImageUrl,
      } as User);
      setRadioOperator({
        id: responseDuty.result.radioOperatorId,
        name: responseDuty.result.radioOperatorName,
        imageUrl: responseDuty.result.radioOperatorImageUrl,
      } as User);
      setAssistantRadioOperator({
        id: responseDuty.result.assistantRadioOperatorId,
        name: responseDuty.result.assistantRadioOperatorName,
        imageUrl: responseDuty.result.assistantRadioOperatorImageUrl,
      } as User);
      setTrainee({
        id: responseDuty.result.traineeId,
        name: responseDuty.result.traineeName,
        imageUrl: responseDuty.result.traineeImageUrl,
      } as User);
      setIsAvailable(responseDuty.result.isAvailable);
      setNote(responseDuty.result.note);
    }

    if (duty.id) {
      const responseDutyCares = await listDutyCareByDutyId(duty.id);
      if (responseDutyCares.success && responseDutyCares.result) {
        setDutyCareChecklists([...responseDutyCares.result]);
      }

      const responseDutyChecklists = await listChecklistsByDuty(duty.id);
      if (responseDutyChecklists.success && responseDutyChecklists.result) {
        setDutyChecklists([...responseDutyChecklists.result]);
      }
    }

    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [duty]),
  );

  const saveAsUnavailable = async () => {
    setIsProcessing(true);

    const response = await postDuty({
      date: duty.date,
      shift: duty.shift,
      note,
      isAvailable: false,
    });

    setIsProcessing(false);
    fetchData();

    return response;
  };

  const saveAsAvailable = async () => {
    setIsProcessing(true);

    const response = await postDuty({
      date: duty.date,
      shift: duty.shift,
      note: null,
      isAvailable: true,
    });

    setIsProcessing(false);
    fetchData();

    return response;
  };

  return {
    isLoading,
    isProcessing,
    isEditable,
    leader,
    driver,
    firstRescuer,
    secondRescuer,
    radioOperator,
    assistantRadioOperator,
    trainee,
    isAvailable,
    dutyCareChecklists,
    dutyChecklists,
    note,
    setNote,
    saveAsUnavailable,
    saveAsAvailable,
  };
};

export default useDutyDetails;
