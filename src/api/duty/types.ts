import { DutyShift } from "@api/dutyRequest/types";

export type Duty = {
  id: string;
  date: string;
  shift: DutyShift;
  leaderId: string;
  leaderName: string;
  driverId: string;
  driverName: string;
  firstRescuerId: string;
  firstRescuerName: string;
  secondRescuerId: string;
  secondRescuerName: string;
  radioOperatorId: string;
  radioOperatorName: string;
  assistantRadioOperatorId: string;
  assistantRadioOperatorName: string;
  traineeId: string;
  traineeName: string;
}

export enum ListDutyPeriod {
  PREVIOUS = 'PREVIOUS',
  CURRENT = 'CURRENT',
  NEXT = 'NEXT',
}

export const MAX_PAGE_SIZE = 20;