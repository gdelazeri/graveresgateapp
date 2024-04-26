import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getRadioOperatorChecklist } from "@api/radioOperatorChecklist/radioOperatorChecklistApi";
import { RadioOperatorChecklist } from "@api/radioOperatorChecklist/types";

export const useRadioOperatorChecklistDetails = (id: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [radioOperatorChecklist, setRadioOperatorChecklist] = useState<RadioOperatorChecklist>(
    {} as RadioOperatorChecklist,
  );

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setIsLoading(true);

        const response = await getRadioOperatorChecklist(id);
        if (response.success && response.result) {
          setRadioOperatorChecklist({ ...response.result });
        }

        setIsLoading(false);
      };

      fetchData();
    }, [id]),
  );

  return {
    isLoading,
    radioOperatorChecklist,
  };
};
