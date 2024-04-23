export type Vehicle = {
  id: string;
  name: string;
  licensePlate: string;
  brand: string;
  model: string;
  year: string;
  isAvailable: boolean;
};

export interface PostVehiclePayload {
  name: string;
  brand: string;
  model: string;
  licensePlate: string;
  year: string;
  isAvailable: boolean;
}
