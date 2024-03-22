import { User, UserPermission, UserStatus } from "@api/user/types";
import { putUserData } from "@api/user/userApi";
import { useEffect, useState } from "react";

export const useUserEditProfile = (user: User) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [permission, setPermission] = useState(UserPermission.TRAINEE);
  const [isDriver, setIsDriver] = useState(false);
  const [isLeader, setIsLeader] = useState(false);

  const isPermissionValid = permission !== null;

  useEffect(() => {
    setPermission(user.permission);
    setIsDriver(user.isDriver);
    setIsLeader(user.isLeader);
  }, [user]);

  const save = async () => {
    setIsProcessing(true);
    const response = await putUserData(
      user.id,
      {
        permission,
        isDriver,
        isLeader,
      }
    )
    setIsProcessing(false);

    return response !== null
  }

  return {
    isProcessing,
    permission,
    setPermission,
    isDriver,
    setIsDriver,
    isLeader,
    setIsLeader,
    isPermissionValid,
    save,
  } as const;
}