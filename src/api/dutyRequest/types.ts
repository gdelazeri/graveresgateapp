export enum DutyShift {
  DAY = "DAY",
  NIGHT = "NIGHT",
}

export const DutyShiftLabel = {
  [DutyShift.DAY]: 'Dia - 7h50min às 20h10min',
  [DutyShift.NIGHT]: 'Noite - 19h50min às 8h10min',
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
