import { getUserById } from "@api/user/userApi";
import { User } from "@api/user/types";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

export const useUserDetails = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>();

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