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
