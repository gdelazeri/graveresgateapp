import { useCallback, useState } from "react";
import { Vehicle } from "@api/vehicle/types";
import { useFocusEffect } from "@react-navigation/native";
import { User } from "@api/user/types";
import moment from "moment";
import { getVehicleTrip } from "@api/vehicleTrip/vehicleTripApi";

export const useVehicleTripDetails = (id: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [vehicle, setVehicle] = useState<Vehicle>();
  const [driver, setDriver] = useState<User>();
  const [date, setDate] = useState<string>(moment().format("YYYY-MM-DD"));
  const [kmInitial, setKmInitial] = useState<string>("");
  const [kmFinal, setKmFinal] = useState<string>("");
  const [startAt, setStartAt] = useState<string>("");
  const [endAt, setEndAt] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [createdByUser, setCreatedByUser] = useState<User>();
  const [createdAt, setCreatedAt] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setIsLoading(true);

        const response = await getVehicleTrip(id);
        if (response.success && response.result) {
          setVehicle(response.result.vehicle);
          setDriver(response.result.driver);
          setDate(response.result.date);
          setKmInitial(response.result.kmInitial);
          setKmFinal(response.result.kmFinal);
          setStartAt(response.result.startAt.substring(0, 5));
          setEndAt(response.result.endAt.substring(0, 5));
          setPlace(response.result.place);
          setReason(response.result.reason);
          setCreatedAt(response.result.createdAt);
          setCreatedByUser(response.result.createdByUser);
        }

        setIsLoading(false);
      };

      fetchData();
    }, [id]),
  );

  return {
    isLoading,
    vehicle,
    driver,
    date,
    kmInitial,
    kmFinal,
    startAt,
    endAt,
    place,
    reason,
    createdByUser,
    createdAt,
  };
};
