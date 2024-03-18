import { useCallback, useEffect, useState } from "react";
import { listDutyByMonth, listPreviousDuty } from "@api/duty/dutyApi";
import { Duty, ListDutyPeriod, MAX_PAGE_SIZE } from "@api/duty/types";
import { useUserContext } from "@context/userContext";
import { UserPermission } from "@api/user/types";
import { useFocusEffect } from "@react-navigation/native";

const useSchedule = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [periodOptions, setPeriodOptions] = useState<{ label: string, value: ListDutyPeriod }[]>([]);
  const [list, setList] = useState<Duty[]>([]);
  const [period, setPeriod] = useState<ListDutyPeriod>(ListDutyPeriod.CURRENT);
  const [page, setPage] = useState(1);
  const { userData } = useUserContext()

  const fetchDutyByMonth = async () => {
    const response = await listDutyByMonth(period);
    if (response?.success) {
      setList(response.result);
    }
    setIsLoading(false);
    setIsRefreshing(false);
  };

  const fetchPreviousDuty = async (pageNumber: number) => {
    const response = await listPreviousDuty(pageNumber, MAX_PAGE_SIZE);
    if (response?.success) {
      if (pageNumber === 1) {
        setList(response.result);
      } else {
        setList([...list, ...response.result]);
      }
    }
    setIsLoading(false);
    setIsRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      if (period === ListDutyPeriod.PREVIOUS) {
        fetchPreviousDuty(page);
      } else {
        fetchDutyByMonth();
      }
    }, [period])
  )

  useEffect(() => {
    const list = []
    if (userData?.permission === UserPermission.ADMIN) {
      list.push({ label: 'Meses anteriores', value: ListDutyPeriod.PREVIOUS })
    }

    setPeriodOptions([
      ...list,
      { label: 'Mês atual', value: ListDutyPeriod.CURRENT },
      { label: 'Próximo mês', value: ListDutyPeriod.NEXT },
    ])
  }, [userData])

  const refresh = () => {
    setIsRefreshing(true);
    setPage(1);
    if (period === ListDutyPeriod.PREVIOUS) {
      fetchPreviousDuty(1);
    } else {
      fetchDutyByMonth();
    }
  }

  const onEndReached = () => {
    if (period === ListDutyPeriod.PREVIOUS && list.length === page * MAX_PAGE_SIZE) {
      setPage(page + 1);
      fetchPreviousDuty(page + 1);
    }
  }

  const onChangePeriod = (value: ListDutyPeriod) => {
    setIsLoading(true);
    setPage(1);
    setPeriod(value);
  }

  return {
    isLoading,
    isRefreshing,
    list,
    periodOptions,
    period,
    onChangePeriod,
    refresh,
    onEndReached
  };
};

export default useSchedule;
