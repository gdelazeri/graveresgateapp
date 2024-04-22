export enum ChecklistType {
  DUTY_CARE = 'DUTY_CARE',
  DRIVER = 'DRIVER',
  RESCUER = 'RESCUER',
  RADIO_OPERATOR = 'RADIO_OPERATOR',
}

export enum ChecklistQuestionType {
  TEXT = 'TEXT',
  OPTION = 'OPTION',
  SELECT = 'SELECT'
}

export interface Checklist {
  id: string
  type: ChecklistType
  name: string
  questions: ChecklistQuestion[]
}

export interface ChecklistQuestion {
  id: string
  text: string
  order: number
  type: ChecklistQuestionType
  hasOtherOption: boolean
  required: boolean
  multiple: boolean
  items: ChecklistQuestionItem[]
  options: ChecklistQuestionOption[]
}

export interface ChecklistQuestionItem {
  id: string
  text: string
}

export interface ChecklistQuestionOption {
  id: string
  text: string
  order: number
}
