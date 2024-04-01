import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import CardInfo from "@screens/components/cardInfo";
import Label from "@screens/components/label";
import Styled from "./styles";
import { useVehicleTrip } from "./useVehicleTrip";
import RadioGroup from "@screens/components/radioGroup";
import Loader from "@screens/components/loader";
import DateInput from "@screens/components/dateInput";
import Input from "@screens/components/input";
import { INPUT_TYPE } from "@screens/components/input/types";
import TimeInput from "@screens/components/timeInput";
import FooterContainer from "@screens/components/footerContainer";
import Button from "@screens/components/button";
import VehicleTripDriver from "./components/vehicleTripDriver";
import routeMap from "@routes/routeMap";
import { User } from "@api/user/types";

interface VehicleTripProps {
  navigation: NavigationProp<ParamListBase>;
  route: {
    params: {
      id?: string
    }
  }
}

const VehicleTrip = ({ navigation, route }: VehicleTripProps) => {
  const { id } = route.params || {};
  const {
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
  } = useVehicleTrip(id)

  if (isLoading) {
    return <Loader />
  }
  
  return (
    <Styled.Container>
      <Styled.ScrollView>
        <CardInfo>
          <Label size={"medium"}>Preencha os dados referente ao deslocamento da viatura.</Label>

          <Styled.Divider />

          <RadioGroup
            label="Viatura*"
            items={vehicleList.map(vehicle => ({ label: vehicle.name, value: vehicle.id }))}
            selectedValue={vehicleId}
            onChangeValue={(value) => setVehicleId(value as string)}
          />

          <Styled.Divider />

          <VehicleTripDriver
            label="Condutor*"
            placeholder="Selecione o condutor"
            user={driverList.find(driver => driver.id === driverId)}
            onPress={() => {
              navigation.navigate(routeMap.FormsRoutes.SELECT_USER, {
                title: "Selecione o condutor",
                position: "DRIVER",
                onSelect: (user: User) => setDriverId(user.id)
              })
            }}
            onRemove={() => setDriverId(undefined)}
          />

          <Styled.Divider />

          <DateInput
            label="Data*"
            placeholder="Selecione a data"
            value={date}
            onChangeValue={setDate}
            type="normal"
          />

          <Styled.Divider />

          <Styled.InlineInputContainer>
            <Styled.InlineInput style={{ paddingRight: 4 }}>
              <TimeInput
                label="Horário de saída"
                value={startAt || ""}
                onChangeValue={(value) => setStartAt(value)}
              />
            </Styled.InlineInput>
            <Styled.InlineInput style={{ paddingLeft: 4 }}>
              <TimeInput
                label="Horário de chegada*"
                value={endAt || ""}
                onChangeValue={(value) => setEndAt(value)}
              />
            </Styled.InlineInput>
          </Styled.InlineInputContainer>
                  
          <Styled.Divider />

          <Styled.InlineInputContainer>
            <Styled.InlineInput style={{ paddingRight: 4 }}>
              <Input
                label="KM inicial do plantão*"
                placeholder="Informe o KM"
                value={kmInitial}
                onChangeText={setKmInitial}
                type={INPUT_TYPE.NUMERIC}
              />
            </Styled.InlineInput>
            <Styled.InlineInput style={{ paddingLeft: 4 }}>
              <Input
                label="KM de chegada*"
                placeholder="Informe o KM"
                value={kmFinal}
                onChangeText={setKmFinal}
                type={INPUT_TYPE.NUMERIC}
              />
            </Styled.InlineInput>
          </Styled.InlineInputContainer>

          <Styled.Divider />

          <Input
            label="Local*"
            placeholder="Informe o local"
            value={place}
            onChangeText={setPlace}
          />

          <Styled.Divider />

          <Input
            label="Motivo*"
            placeholder="Informe o motivo"
            value={reason}
            onChangeText={setReason}
            type={INPUT_TYPE.TEXT}
          />
        </CardInfo>
        
        <Styled.Divider />
      </Styled.ScrollView>
      <FooterContainer>
        <Button
          title="Salvar"
          onPress={() => {}}
          disabled={false}
          loading={false}
        />
      </FooterContainer>
    </Styled.Container>
  );
};

export default VehicleTrip;

export const NavHeader = ({ navigation }: VehicleTripProps) => (
  <Header onBackPress={navigation.goBack} title="Registrar deslocamento" />
);
