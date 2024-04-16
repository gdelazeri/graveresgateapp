import { useEffect, useState } from "react";
import { Duty } from "@api/duty/types";
import { getDuty } from "@api/duty/dutyApi";
import { User } from "@api/user/types";
import { listDutyCareByDutyId } from "@api/dutyCareChecklist/dutyCareChecklistApi";
import { DutyCareChecklist } from "@api/dutyCareChecklist/types";

interface UseDutyDetailsProps {
  duty: Duty
}

const useDutyDetails = ({ duty }: UseDutyDetailsProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [leader, setLeader] = useState<User | null>(null);
  const [driver, setDriver] = useState<User | null>(null);
  const [firstRescuer, setFirstRescuer] = useState<User | null>(null);
  const [secondRescuer, setSecondRescuer] = useState<User | null>(null);
  const [radioOperator, setRadioOperator] = useState<User | null>(null);
  const [assistantRadioOperator, setAssistantRadioOperator] = useState<User | null>(null);
  const [trainee, setTrainee] = useState<User | null>(null);
  const [dutyCareChecklists, setDutyCareChecklists] = useState<DutyCareChecklist[]>([]);

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

      const responseDutyCares = await listDutyCareByDutyId(duty.id);

      if (responseDutyCares.success && responseDutyCares.result) {
        setDutyCareChecklists([...responseDutyCares.result]);
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  return {
    isLoading,
    leader,
    driver,
    firstRescuer,
    secondRescuer,
    radioOperator,
    assistantRadioOperator,
    trainee,
    dutyCareChecklists
  };
};

export default useDutyDetails;
