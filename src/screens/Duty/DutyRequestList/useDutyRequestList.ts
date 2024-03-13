import { useCallback, useState } from "react";
import { DutyRequestListItem } from "@api/dutyRequest/types";
import { useFocusEffect } from "@react-navigation/native";
import { listMyDutyRequests } from "@api/dutyRequest/dutyRequestApi";

const useDutyRequestList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState<DutyRequestListItem[]>([]);
  
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setIsLoading(true);
        const response = await listMyDutyRequests();
        if (response?.success) {
          setList(response.result);
        }
        setIsLoading(false);
      };

      fetchData()
    }, [])
  );

  return {
    isLoading,
    list,
  };
};

export default useDutyRequestList;
