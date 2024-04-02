import { useCallback, useMemo, useState } from "react";
import { Vehicle } from "@api/vehicle/types";
import { useFocusEffect } from "@react-navigation/native";
import { listAvailableVehicles } from "@api/vehicle/vehicleApi";
import { listActiveUsers } from "@api/user/userApi";
import { User } from "@api/user/types";
import moment from "moment";
import { isString } from "@utils/stringHelper";
import { getVehicleTrip, postVehicleTrip, putVehicleTrip } from "@api/vehicleTrip/vehicleTripApi";

export const useVehicleTripForm = (id?: string) => {
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
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([])
  const [driverList, setDriverList] = useState<User[]>([])
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const isFormValid = useMemo(() => (
    isString(vehicleId) &&
    isString(driverId) &&
    isString(date) &&
    isString(kmInitial) &&
    isString(kmFinal) &&
    isString(startAt) &&
    isString(endAt) &&
    isString(place) &&
    isString(reason)
  ), [vehicleId, driverId, date, kmInitial, kmFinal, startAt, endAt, place, reason])
  
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setIsLoading(true);

        if (isString(id)) {
          const response = await getVehicleTrip(String(id));
          if (response.success && response.result) {
            setVehicleId(response.result.vehicleId);
            setDriverId(response.result.driverId);
            setDate(response.result.date);
            setKmInitial(response.result.kmInitial);
            setKmFinal(response.result.kmFinal);
            setStartAt(response.result.startAt.substring(0, 5));
            setEndAt(response.result.endAt.substring(0, 5));
            setPlace(response.result.place);
            setReason(response.result.reason);
          }
        }

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

  const save = async () => {
    setIsProcessing(true);

    const payload = {
      vehicleId: String(vehicleId),
      driverId: String(driverId),
      date,
      kmInitial,
      kmFinal,
      startAt,
      endAt,
      place,
      reason,
    };

    let response;
    if (isString(id)) {
      response = await putVehicleTrip(String(id), payload);
    } else {
      response = await postVehicleTrip(payload);
    }

    setIsProcessing(false);

    return response
  };

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
    driverList,
    isProcessing,
    isFormValid,
    save
  };
}