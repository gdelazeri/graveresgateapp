export type VehicleTrip = {
  id: string
  vehicleId: string
  driverId: string
  date: string
  kmInitial: string
  kmFinal: string
  startAt: string
  endAt: string
  place: string
  reason: string
  createdBy: string
  createdAt: string
}

export interface PostVehicleTripPayload {
  vehicleId: string
  driverId: string
  date: string
  kmInitial: string
  kmFinal: string
  startAt: string
  endAt: string
  place: string
  reason: string
}