import { useCallback, useState } from "react";
import { Vehicle } from "@api/vehicle/types";
import { useFocusEffect } from "@react-navigation/native";
import { listAvailableVehicles } from "@api/vehicle/vehicleApi";
import { listActiveUsers } from "@api/user/userApi";
import { User } from "@api/user/types";
import moment from "moment";

export const useVehicleTrip = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [vehicleId, setVehicleId] = useState<string | undefined>()
  const [driverId, setDriverId] = useState<string | undefined>()
  const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'))
  const [kmInitial, setKmInitial] = useState<string>('')
  const [kmFinal, setKmFinal] = useState<string>('')
  const [startAt, setStartAt] = useState<string>('')
  const [endAt, setEndAt] = useState<string>('')
  const [place, setPlace] = useState<string>('')
  const [reason, setReason] = useState<string>('')
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);
  const [driverList, setDriverList] = useState<User[]>([]);
  
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setIsLoading(true);

        const responseVehicles = await listAvailableVehicles();
        if (responseVehicles.success && responseVehicles.result) {
          setVehicleList([ ...responseVehicles.result ]);
        }

        const responseDrivers = await listActiveUsers({ isDriver: true });
        if (responseDrivers.success && responseDrivers.result) {
          setDriverList([ ...responseDrivers.result ])
        }
       
        setIsLoading(false);
      };

      fetchData()
    }, [])
  );

  return {
    isLoading,
    vehicleId,
    setVehicleId,
    driverId,
    setDriverId,
    date,
    setDate,
    kmInitial,
    setKmInitial,
    kmFinal,
    setKmFinal,
    startAt,
    setStartAt,
    endAt,
    setEndAt,
    place,
    setPlace,
    reason,
    setReason,
    vehicleList,
    driverList
  };
}