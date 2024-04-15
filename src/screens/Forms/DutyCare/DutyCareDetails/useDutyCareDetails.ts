import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getDutyCare } from "@api/dutyCareChecklist/dutyCareChecklistApi";
import { DutyCareChecklist } from "@api/dutyCareChecklist/types";

export const useDutyCareDetails = (id: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [dutyCareChecklist, setDutyCareChecklist] = useState<DutyCareChecklist>({} as DutyCareChecklist)

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setIsLoading(true);
        
        const response = await getDutyCare(id);
        if (response.success && response.result) {
          setDutyCareChecklist({ ...response.result });
        }

        setIsLoading(false);
      };

      fetchData()
    }, [id])
  );

  return {
    isLoading,
    dutyCareChecklist
  };
}