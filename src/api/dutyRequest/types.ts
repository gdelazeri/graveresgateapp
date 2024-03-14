export enum DutyShift {
  DAY = "DAY",
  NIGHT = "NIGHT",
}

export const DutyShiftLabel = {
  [DutyShift.DAY]: 'Dia',
  [DutyShift.NIGHT]: 'Noite',
}

export const DutyShiftLabelTimes = {
  [DutyShift.DAY]: 'Dia - 7h50min às 20h10min',
  [DutyShift.NIGHT]: 'Noite - 19h50min às 8h10min',
}

export const DutyShiftTimes = {
  [DutyShift.DAY]: {
    start: '07:50',
    end: '20:10',
  },
  [DutyShift.NIGHT]: {
    start: '19:50',
    end: '08:10',
  },
}

export enum DutyPosition {
  DRIVER = 'DRIVER',
  LEADER = 'LEADER',
  RESCUER = 'RESCUER',
  RADIO_OPERATOR = 'RADIO_OPERATOR',
  TRAINEE = 'TRAINEE',
}

export const DutyPositionLabel = {
  [DutyPosition.DRIVER]: 'Condutor',
  [DutyPosition.LEADER]: 'Líder',
  [DutyPosition.RESCUER]: 'Socorrista',
  [DutyPosition.RADIO_OPERATOR]: 'Sala de Operações',
  [DutyPosition.TRAINEE]: 'Estagiário',
}

export enum DutyRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED'
}

export const DutyRequestStatusLabel = {
  [DutyRequestStatus.PENDING]: 'Pendente',
  [DutyRequestStatus.APPROVED]: 'Aprovado'
}

export type DutyRequest = {
  id: string;
  date: string;
  shift: DutyShift;
  startAt: string;
  endAt: string;
  note: string;
  positions: DutyPosition[];
  userId?: string;
}

export interface DutyRequestListItem extends DutyRequest {
  status: DutyRequestStatus
}

export enum DutyRequestErrorCode {
  DutyRequestInexistent = 'DR_0001',
  DutyRequestExistent = 'DR_0002',
}

export const DutyRequestErrorCodeMessage = {
  [DutyRequestErrorCode.DutyRequestInexistent]: 'Marcação de plantão não encontrada',
  [DutyRequestErrorCode.DutyRequestExistent]: 'Já existe uma solicitação para a data e turno selecionado. Se quiser alterá-la você precisa cancelar a solicitação existente e criar uma nova.',
}