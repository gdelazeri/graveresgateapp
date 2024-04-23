import { useEffect, useState } from "react";
import { listDutyCarePaged } from "@api/dutyCareChecklist/dutyCareChecklistApi";
import { DutyCareChecklist } from "@api/dutyCareChecklist/types";

const MAX_PAGE_SIZE = 20;

export const useDutyCareList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [list, setList] = useState<DutyCareChecklist[]>([]);
  const [page, setPage] = useState<number>(1);

  const fetchData = async () => {
    setIsLoading(page === 1 && list.length === 0);

    const response = await listDutyCarePaged(page, MAX_PAGE_SIZE);
    if (response.success && response.result) {
      setList(
        page === 1 ? [...response.result] : [...list, ...response.result],
      );
    }
    setIsLoading(false);
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const onEndReached = () => {
    if (list.length === page * MAX_PAGE_SIZE) {
      setPage(page + 1);
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    if (page === 1) {
      fetchData();
    } else {
      setPage(1);
    }
  };

  return {
    isLoading,
    isRefreshing,
    list,
    onEndReached,
    onRefresh,
  };
};
