import { IUser, getUserById } from "@api/user/userApi";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";

export const useUserDetails = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser>();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setIsLoading(true);
        const response = await getUserById(id);
        if (response?.success) {
          setUser(response.result);
        }
        setIsLoading(false);
      };

      fetchData()
    }, [])
  );

  return {
    isLoading,
    user
  } as const;
}