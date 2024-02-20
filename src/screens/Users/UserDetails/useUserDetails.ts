import { IUser, getUserById } from "@api/user";
import { useEffect, useState } from "react";

export const useUserDetails = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getUserById(id);
      if (response?.success) {
        setUser(response.result);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  return {
    isLoading,
    user
  } as const;
}