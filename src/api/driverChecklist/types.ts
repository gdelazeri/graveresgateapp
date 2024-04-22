export interface PostDriverChecklistPayload {
  dutyId?: string;
  vehicleId?: string;
  kmInitial?: string;
  checklistAnswers?: {
    checklistQuestionId: string
    checklistQuestion: string
    checklistQuestionItem?: string
    checklistQuestionOption: string
  }[]
}