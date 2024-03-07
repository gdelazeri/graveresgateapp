import { User, UserPermission, UserStatus } from "@api/user/types";
import { putUserData } from "@api/user/userApi";
import { useEffect, useState } from "react";

export const useUserEditProfile = (user: User) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<UserStatus | null>(null);
  const [permission, setPermission] = useState(UserPermission.TRAINEE);
  const [isDriver, setIsDriver] = useState(false);
  const [isLeader, setIsLeader] = useState(false);

  const isStatusValid = status !== null;
  const isPermissionValid = permission !== null;

  useEffect(() => {
    setStatus(user.status);
    setPermission(user.permission);
    setIsDriver(user.isDriver);
    setIsLeader(user.isLeader);
  }, [user]);

  const save = async () => {
    setIsProcessing(true);
    const response = await putUserData(
      user.id,
      {
        status,
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
    status,
    setStatus,
    permission,
    setPermission,
    isDriver,
    setIsDriver,
    isLeader,
    setIsLeader,
    isStatusValid,
    isPermissionValid,
    save,
  } as const;
}