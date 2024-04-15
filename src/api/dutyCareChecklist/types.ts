import { Duty } from "@api/duty/types";
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
  checklistAnswers?: {
    checklistQuestionId: string
    checklistQuestion: string
    checklistQuestionItem?: string
    checklistQuestionOption: string
  }[]
}

export enum DutyCareChecklistIncidentContinuation {
  REMOVAL = 'REMOVAL',
  REFUSED = 'REFUSED'
}

export const DutyCareChecklistIncidentContinuationLabel = {
  [DutyCareChecklistIncidentContinuation.REMOVAL]: 'Remoção de vítima',
  [DutyCareChecklistIncidentContinuation.REFUSED]: 'Recusa de atendimento'
}
