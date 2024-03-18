import { useCallback, useState } from "react";
import { DutyRequestListItem } from "@api/dutyRequest/types";
import { useFocusEffect } from "@react-navigation/native";
import { listMyDutyRequests } from "@api/dutyRequest/dutyRequestApi";

const useDutyRequestList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [list, setList] = useState<DutyRequestListItem[]>([]);

  const fetchData = async () => {
    const response = await listMyDutyRequests();
    if (response?.success) {
      setList(response.result);
    }
    setIsLoading(false);
    setIsRefreshing(false);
  };
  
  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      fetchData()
    }, [])
  );

  const onRefresh = async () => {
    setIsRefreshing(true);
    fetchData();
  }

  return {
    isLoading,
    isRefreshing,
    list,
    onRefresh,
  };
};

export default useDutyRequestList;
