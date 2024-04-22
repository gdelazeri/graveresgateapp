import { ChecklistFilledAnswer } from "@api/checklist/types";
import { Duty } from "@api/duty/types";
import { User } from "@api/user/types";
import { Vehicle } from "@api/vehicle/types";

export interface DutyCareChecklist {
  id: string;
  dutyId: string;
  duty: Duty;
  note?: string;
  date: string;
  time: string;
  vehicleId: string;
  vehicle: Vehicle;
  reason: string;
  victimName: string;
  victimGender: string;
  victimAge: number;
  victimDocument?: string;
  incidentAddress: string;
  incidentAddressDistrict: string;
  incidentAddressCity: string;
  incidentContinuation: DutyCareChecklistIncidentContinuation;
  incidentEvolution: string;
  createdByUserId: string;
  createdByUser: User;
  checklistName: string;
  checklistFilledAnswers: ChecklistFilledAnswer[]
  createdAt: string
}

export interface PostDutyCareChecklistPayload {
  dutyId?: string;
  note?: string;
  date: string;
  time: string;
  vehicleId?: string;
  reason?: string;
  victimName?: string
  victimGender?: string
  victimAge?: number | string
  victimDocument?: string
  incidentAddress?: string;
  incidentAddressDistrict?: string;
  incidentAddressCity?: string;
  incidentContinuation?: DutyCareChecklistIncidentContinuation;
  incidentEvolution?: string;
  checklistAnswers?: ChecklistFilledAnswer[]
}

export enum DutyCareChecklistIncidentContinuation {
  REMOVAL = 'REMOVAL',
  REFUSED = 'REFUSED'
}

export const DutyCareChecklistIncidentContinuationLabel = {
  [DutyCareChecklistIncidentContinuation.REMOVAL]: 'Remoção de vítima',
  [DutyCareChecklistIncidentContinuation.REFUSED]: 'Recusa de atendimento'
}

export enum VictimGender {
  MALE = 'M',
  FEMALE = 'F',
  UNDEFINED = '-'
}

export const VictimGenderLabel = {
  [VictimGender.MALE]: 'Masculino',
  [VictimGender.FEMALE]: 'Feminino',
  [VictimGender.UNDEFINED]: 'Indefinido',
}