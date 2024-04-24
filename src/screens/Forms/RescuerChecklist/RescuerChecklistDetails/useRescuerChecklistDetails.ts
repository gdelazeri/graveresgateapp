import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getRescuerChecklist } from "@api/rescuerChecklist/rescuerChecklistApi";
import { RescuerChecklist } from "@api/rescuerChecklist/types";

export const useRescuerChecklistDetails = (id: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rescuerChecklist, setRescuerChecklist] = useState<RescuerChecklist>(
    {} as RescuerChecklist,
  );

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setIsLoading(true);

        const response = await getRescuerChecklist(id);
        if (response.success && response.result) {
          setRescuerChecklist({ ...response.result });
        }

        setIsLoading(false);
      };

      fetchData();
    }, [id]),
  );

  return {
    isLoading,
    rescuerChecklist,
  };
};
