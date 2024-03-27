import { deleteUserById, getUserById, putUserData } from "@api/user/userApi";
import { User, UserStatus } from "@api/user/types";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

export const useUserDetails = (id: string) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>();

  const fetchData = async () => {
    const response = await getUserById(id);
    if (response?.success) {
      setUser(response.result);
    }
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      fetchData()
    }, [])
  );

  const deleteUser = async () => {
    setIsDeleting(true);
    await deleteUserById(id);
    setIsDeleting(false);
  }

  const updateUserStatus = async (status: UserStatus) => {
    setIsLoading(true);
    await putUserData(id, { status });
    fetchData();
  }

  return {
    isLoading,
    user,
    deleteUser,
    updateUserStatus,
    isDeleting
  } as const;
}