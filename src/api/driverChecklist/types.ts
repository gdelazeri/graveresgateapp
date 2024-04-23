import { ChecklistFilledAnswer } from "@api/checklist/types";
import { Duty } from "@api/duty/types";
import { User } from "@api/user/types";
import { Vehicle } from "@api/vehicle/types";

export interface PostDriverChecklistPayload {
  dutyId?: string;
  vehicleId?: string;
  kmInitial?: string;
  checklistAnswers?: ChecklistFilledAnswer[];
}

export interface DriverChecklist {
  id: string;
  dutyId: string;
  duty: Duty;
  vehicleId: string;
  vehicle: Vehicle;
  kmInitial: string;
  createdByUserId: string;
  createdByUser: User;
  checklistName: string;
  checklistFilledAnswers: ChecklistFilledAnswer[];
  createdAt: string;
}
