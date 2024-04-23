import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getDriverChecklist } from "@api/driverChecklist/driverChecklistApi";
import { DriverChecklist } from "@api/driverChecklist/types";

export const useDriverChecklistDetails = (id: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [driverChecklist, setDriverChecklist] = useState<DriverChecklist>(
    {} as DriverChecklist,
  );

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setIsLoading(true);

        const response = await getDriverChecklist(id);
        if (response.success && response.result) {
          setDriverChecklist({ ...response.result });
        }

        setIsLoading(false);
      };

      fetchData();
    }, [id]),
  );

  return {
    isLoading,
    driverChecklist,
  };
};
