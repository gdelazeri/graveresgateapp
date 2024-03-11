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
}

export default {
  LoggedOffRoutes,
  LoggedInRoutes,
  UserRoutes,
  DutyRoutes
};
