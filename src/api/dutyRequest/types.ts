export enum DutyShift {
  DAY = "DAY",
  NIGHT = "NIGHT",
}

export const DutyShiftLabel = {
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

export type DutyRequest = {
  id: string;
  date: string;
  shift: DutyShift;
  startAt: Date;
  endAt: Date;
  note: string;
  positions: DutyPosition[];
}