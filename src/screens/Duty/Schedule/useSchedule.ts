import {  useEffect, useState } from "react";
import { listDuty } from "@api/duty/dutyApi";
import { Duty, ListDutyPeriod } from "@api/duty/types";
import { useUserContext } from "@context/userContext";
import { UserPermission } from "@api/user/types";

const useSchedule = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [periodOptions, setPeriodOptions] = useState<{ label: string, value: ListDutyPeriod }[]>([]);
  const [list, setList] = useState<Duty[]>([]);
  const [period, setPeriod] = useState<ListDutyPeriod>(ListDutyPeriod.CURRENT);
  const { userData } = useUserContext()

  const fetchData = async () => {
    const response = await listDuty(period);
    if (response?.success) {
      setList(response.result);
    }
    setIsLoading(false);
    setIsRefreshing(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData()
  }, [period])

  useEffect(() => {
    const list = []
    if (userData?.permission === UserPermission.ADMIN) {
      list.push({ label: 'Meses anteriores', value: ListDutyPeriod.PAST })
    }

    setPeriodOptions([
      ...list,
      { label: 'Mês atual', value: ListDutyPeriod.CURRENT },
      { label: 'Próximo mês', value: ListDutyPeriod.FUTURE },
    ])
  }, [userData])

  const refresh = () => {
    setIsRefreshing(true);
    fetchData()
  }

  return {
    isLoading,
    isRefreshing,
    list,
    periodOptions,
    period,
    setPeriod,
    refresh,
  };
};

export default useSchedule;
