import { useEffect, useState } from "react";
import moment from "moment";
import { DutyPosition, DutyRequest } from "@api/dutyRequest/types";
import { listDutyRequests } from "@api/dutyRequest/dutyRequestApi";
import { Duty } from "@api/duty/types";
import { getDuty, postDuty } from "@api/duty/dutyApi";
import { User } from "@api/user/types";
import { isString } from "@utils/stringHelper";

interface UseDutyFormProps {
  duty: Duty
}

const useDutyForm = ({ duty }: UseDutyFormProps) => {
  const [leader, setLeader] = useState<User | null>(null);
  const [driver, setDriver] = useState<User | null>(null);
  const [firstRescuer, setFirstRescuer] = useState<User | null>(null);
  const [secondRescuer, setSecondRescuer] = useState<User | null>(null);
  const [radioOperator, setRadioOperator] = useState<User | null>(null);
  const [assistantRadioOperator, setAssistantRadioOperator] = useState<User | null>(null);
  const [trainee, setTrainee] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dutyRequestList, setDutyRequestList] = useState<DutyRequest[]>([]);

  const isEditable = moment(duty.date).isSameOrAfter(moment().subtract(1, 'day'), "day");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      const responseDuty = await getDuty(duty.date, duty.shift);

      if (responseDuty.success && responseDuty.result) {
        setLeader({
          id: responseDuty.result.leaderId,
          name: responseDuty.result.leaderName,
          imageUrl: responseDuty.result.leaderImageUrl
        } as User);
        setDriver({
          id: responseDuty.result.driverId,
          name: responseDuty.result.driverName,
          imageUrl: responseDuty.result.driverImageUrl
        } as User);
        setFirstRescuer({
          id: responseDuty.result.firstRescuerId,
          name: responseDuty.result.firstRescuerName,
          imageUrl: responseDuty.result.firstRescuerImageUrl
        } as User);
        setSecondRescuer({
          id: responseDuty.result.secondRescuerId,
          name: responseDuty.result.secondRescuerName,
          imageUrl: responseDuty.result.secondRescuerImageUrl
        } as User);
        setRadioOperator({
          id: responseDuty.result.radioOperatorId,
          name: responseDuty.result.radioOperatorName,
          imageUrl: responseDuty.result.radioOperatorImageUrl
        } as User);
        setAssistantRadioOperator({
          id: responseDuty.result.assistantRadioOperatorId,
          name: responseDuty.result.assistantRadioOperatorName,
          imageUrl: responseDuty.result.assistantRadioOperatorImageUrl
        } as User);
        setTrainee({
          id: responseDuty.result.traineeId,
          name: responseDuty.result.traineeName,
          imageUrl: responseDuty.result.traineeImageUrl
        } as User);
      }

      const responseDutyRequests = await listDutyRequests(duty.date, duty.shift);
      if (responseDutyRequests.success && responseDutyRequests.result) {
        setDutyRequestList(responseDutyRequests.result);
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  const save = async () => {
    setIsProcessing(true);

    const payload = {
      date: duty.date,
      shift: duty.shift,
      leaderId: leader?.id || null,
      driverId: driver?.id || null,
      firstRescuerId: firstRescuer?.id || null,
      secondRescuerId: secondRescuer?.id || null,
      radioOperatorId: radioOperator?.id || null,
      assistantRadioOperatorId: assistantRadioOperator?.id || null,
      traineeId: trainee?.id || null,
    };

    const response = await postDuty(payload);

    setIsProcessing(false);

    return response
  };

  const usersAlreadySelected = [leader?.id, driver?.id, firstRescuer?.id, secondRescuer?.id, radioOperator?.id, assistantRadioOperator?.id, trainee?.id]
    .filter((id) => isString(id)) as string[];
  const leaderRequests = dutyRequestList.filter((dutyRequest) => dutyRequest.positions.includes(DutyPosition.LEADER));
  const driverRequests = dutyRequestList.filter((dutyRequest) => dutyRequest.positions.includes(DutyPosition.DRIVER));
  const rescuerRequests = dutyRequestList.filter((dutyRequest) => dutyRequest.positions.includes(DutyPosition.RESCUER));
  const radioOperatorRequests = dutyRequestList.filter((dutyRequest) => dutyRequest.positions.includes(DutyPosition.RADIO_OPERATOR));
  const assistantRadioOperatorRequests = dutyRequestList.filter((dutyRequest) => dutyRequest.positions.includes(DutyPosition.ASSISTANT_RADIO_OPERATOR));
  const traineeRequests = dutyRequestList.filter((dutyRequest) => dutyRequest.positions.includes(DutyPosition.TRAINEE));

  return {
    isLoading,
    isProcessing,
    leader,
    setLeader,
    driver,
    setDriver,
    firstRescuer,
    setFirstRescuer,
    secondRescuer,
    setSecondRescuer,
    radioOperator,
    setRadioOperator,
    assistantRadioOperator,
    setAssistantRadioOperator,
    trainee,
    setTrainee,
    isEditable,
    save,
    usersAlreadySelected,
    leaderRequests,
    driverRequests,
    rescuerRequests,
    radioOperatorRequests,
    assistantRadioOperatorRequests,
    traineeRequests,
  };
};

export default useDutyForm;
