import { useCallback, useState } from "react";
import { listRescuerChecklist } from "@api/rescuerChecklist/rescuerChecklistApi";
import { RescuerChecklist } from "@api/rescuerChecklist/types";
import { useFocusEffect } from "@react-navigation/native";

const MAX_PAGE_SIZE = 20;

export const useRescuerChecklist = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [list, setList] = useState<RescuerChecklist[]>([]);
  const [page, setPage] = useState<number>(1);

  const fetchData = async (pageNumber: number) => {
    setIsLoading(pageNumber === 1 && list.length === 0);

    const response = await listRescuerChecklist(pageNumber, MAX_PAGE_SIZE);
    if (response.success && response.result) {
      setList(
        pageNumber === 1 ? [...response.result] : [...list, ...response.result],
      );
    }
    setPage(pageNumber);
    setIsLoading(false);
    setIsRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData(1);
    }, []),
  );

  const onEndReached = () => {
    if (list.length === page * MAX_PAGE_SIZE) {
      fetchData(page + 1);
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchData(1);
  };

  return {
    isLoading,
    isRefreshing,
    list,
    onEndReached,
    onRefresh,
  };
};
