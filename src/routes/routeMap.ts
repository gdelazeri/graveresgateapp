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
}

export default {
  LoggedOffRoutes,
  LoggedInRoutes,
  UserRoutes
};
