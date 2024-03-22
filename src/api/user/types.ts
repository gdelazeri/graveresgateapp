import { DutyRequest } from "@api/dutyRequest/types";

export type User = {
  id: string;
  registrationId: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  permission: UserPermission;
  status: UserStatus;
  isDriver: boolean;
  isLeader: boolean;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserPermission {
  ADMIN = "ADMIN",
  VOLUNTARY = "VOLUNTARY",
  ASSISTANT_RADIO_OPERATOR = 'ASSISTANT_RADIO_OPERATOR',
  TRAINEE = "TRAINEE",
}

export const UserPermissionLabel = {
  [UserPermission.ADMIN]: 'Administrador',
  [UserPermission.TRAINEE]: 'Estagiario',
  [UserPermission.VOLUNTARY]: 'Voluntário',
  [UserPermission.ASSISTANT_RADIO_OPERATOR]: 'Auxliar de S.O.'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED',
}

export const UserStatusLabel = {
  [UserStatus.ACTIVE]: 'Ativo',
  [UserStatus.PENDING]: 'Pendente',
  [UserStatus.SUSPENDED]: 'Suspenso',
  [UserStatus.DELETED]: 'Excluído',
}

export interface UserDutyRequest extends User {
  dutyRequest: DutyRequest;
  selected: boolean;
}