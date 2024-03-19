import { Vehicle } from "@api/vehicle/types"
import { getAllVehicles } from "@api/vehicle/vehicleApi";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react"

const useVehicleList = () => {
  const [list, setList] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(true);

  const fetchData = async () => {
    const response = await getAllVehicles();

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

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchData();
  }

  return {
    isLoading,
    isRefreshing,
    list,
    onRefresh
  }
}

export default useVehicleList;
