enum LoggedOffRoutes {
  STACK = "LoggedOff",
  WELCOME = "Welcome",
  SIGN_UP = "SignUp",
  SIGN_IN = "SignIn",
}

enum LoggedInRoutes {
  STACK = "LoggedIn",
  HOME = "Home",
}

enum UserRoutes {
  STACK = "User",
  USER_LIST = "UserList",
  USER_DETAILS = "UserDetails",
  USER_EDIT_PERSONAL_INFO = "UserEditPersonalInfo",
  USER_EDIT_PROFILE = "UserEditProfile",
}

enum DutyRoutes {
  STACK = "Duty",
  DUTY_HOME = "DutyHome",
  CREATE_DUTY_REQUEST = "CreateDutyRequest",
  LIST_DUTY_REQUEST = "ListDutyRequest",
  DUTY_REQUEST_DETAILS = "DutyRequestDetails",
  SCHEDULE = "Schedule",
  DUTY_FORM = "DutyForm",
  DUTY_DETAILS = "DutyDetails",
  DUTY_SELECT_USER = "DutySelectUser",
}

enum SettingsRoutes {
  STACK = "Settings",
  SETTINGS_HOME = "SettingsHome",
  SETTINGS_FORM = "SettingsForm",
  VEHICLE_LIST = "VehicleList",
  VEHICLE_FORM = "VehicleForm",
}

enum FormsRoutes {
  STACK = "Forms",
  FORMS_HOME = "FormsHome",
  VEHICLE_TRIP_FORM = "VehicleTripForm",
  VEHICLE_TRIP_DETAILS = "VehicleTripDetails",
  VEHICLE_TRIP_LIST = "VehicleTripList",
  SELECT_USER = "SelectUser",
  DUTY_CARE_FORM = "DutyCareForm",
  DUTY_CARE_LIST = "DutyCareList",
  DUTY_CARE_DETAILS = "DutyCareDetails",
  DRIVER_CHECKLIST_FORM = "DriverChecklistForm",
  DRIVER_CHECKLIST_LIST = "DriverChecklistList",
  DRIVER_CHECKLIST_DETAILS = "DriverChecklistDetails",
  RESCUER_CHECKLIST_FORM = "RescuerChecklistForm",
  RESCUER_CHECKLIST_LIST = "RescuerChecklistList",
  RESCUER_CHECKLIST_DETAILS = "RescuerChecklistDetails",
  RADIO_OPERATOR_CHECKLIST_FORM = "RadioOperatorChecklistForm",
  RADIO_OPERATOR_CHECKLIST_LIST = "RadioOperatorChecklistList",
  RADIO_OPERATOR_CHECKLIST_DETAILS = "RadioOperatorChecklistDetails",
}

export default {
  LoggedOffRoutes,
  LoggedInRoutes,
  UserRoutes,
  DutyRoutes,
  SettingsRoutes,
  FormsRoutes,
};
