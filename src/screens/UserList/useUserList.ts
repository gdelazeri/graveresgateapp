import { IUser, listUsers } from "@api/user";
import { useEffect, useState } from "react";

export const useUserList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await listUsers();
      if (response?.success) {
        setList(response.result);
      } else {
        setList([]);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return {
    isLoading,
    list
  } as const;
}