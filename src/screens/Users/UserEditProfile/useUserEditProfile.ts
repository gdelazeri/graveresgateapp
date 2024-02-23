import { IUser, UserPermission, UserStatus, putUserData } from "@api/user/userApi";
import { useEffect, useState } from "react";

export const useUserEditProfile = (user: IUser) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<UserStatus | null>(null);
  const [permission, setPermission] = useState(UserPermission.TRAINEE);
  const [isDriver, setIsDriver] = useState(false);

  const isStatusValid = status !== null;
  const isPermissionValid = permission !== null;

  useEffect(() => {
    setStatus(user.status);
    setPermission(user.permission);
    setIsDriver(user.isDriver);
  }, [user]);

  const save = async () => {
    setIsProcessing(true);
    const response = await putUserData(
      user.id,
      {
        status,
        permission,
        isDriver,
      }
    )
    setIsProcessing(false);

    return response !== null
  }

  return {
    isProcessing,
    status,
    setStatus,
    permission,
    setPermission,
    isDriver,
    setIsDriver,
    isStatusValid,
    isPermissionValid,
    save,
  } as const;
}