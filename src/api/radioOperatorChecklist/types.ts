import { ChecklistFilledAnswer } from "@api/checklist/types";
import { Duty } from "@api/duty/types";
import { User } from "@api/user/types";
import { Vehicle } from "@api/vehicle/types";

export interface PostRadioOperatorChecklistPayload {
  dutyId?: string;
  note?: string;
  checklistAnswers?: ChecklistFilledAnswer[];
}

export interface RadioOperatorChecklist {
  id: string;
  dutyId: string;
  duty: Duty;
  vehicleId: string;
  vehicle: Vehicle;
  createdByUserId: string;
  createdByUser: User;
  checklistName: string;
  checklistFilledAnswers: ChecklistFilledAnswer[];
  createdAt: string;
}
