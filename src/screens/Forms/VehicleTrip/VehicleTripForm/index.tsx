import {
  NavigationProp,
  ParamListBase,
  StackActions,
} from "@react-navigation/native";
import Header from "@screens/components/header";
import CardInfo from "@screens/components/cardInfo";
import Label from "@screens/components/label";
import Styled from "./styles";
import { useVehicleTripForm } from "./useVehicleTripForm";
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
import { isString } from "@utils/stringHelper";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";

interface FormVehicleTripProps {
  navigation: NavigationProp<ParamListBase>;
  route: {
    params: {
      id?: string;
    };
  };
}

const FormVehicleTrip = ({ navigation, route }: FormVehicleTripProps) => {
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
    driverList,
    isProcessing,
    isFormValid,
    save,
  } = useVehicleTripForm(id);

  const onPressSave = async () => {
    const response = await save();

    if (response.success) {
      Toast.show({
        type: "success",
        text1: "Livro de deslocamento",
        text2: "Deslocamento salvo com sucesso!",
        position: "bottom",
      });

      if (isString(id)) {
        navigation.goBack();
      } else {
        navigation.dispatch(
          StackActions.replace(routeMap.FormsRoutes.VEHICLE_TRIP_DETAILS, {
            id: response.result.id,
          }),
        );
      }
    } else {
      Alert.alert(
        "Erro ao salvar o deslocamento",
        "Ocorreu algum erro ao salvar o formulário, verifique os dados e tente novamente.",
        [{ text: "OK" }],
      );
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Styled.Container>
      <Styled.ScrollView>
        <CardInfo>
          <Label size={"medium"}>
            Preencha os dados referente ao deslocamento da viatura.
          </Label>

          <Styled.Divider />

          <RadioGroup
            label="Viatura*"
            options={vehicleList.map((vehicle) => ({
              label: vehicle.name,
              value: vehicle.id,
            }))}
            selectedValue={vehicleId}
            onChangeValue={(value) => setVehicleId(value as string)}
          />

          <Styled.Divider />

          <VehicleTripDriver
            label="Condutor*"
            placeholder="Selecione o condutor"
            user={driverList.find((driver) => driver.id === driverId)}
            onPress={() => {
              navigation.navigate(routeMap.FormsRoutes.SELECT_USER, {
                title: "Selecione o condutor",
                position: "DRIVER",
                userSelectedId: driverId,
                onSelect: (user: User) => setDriverId(user.id),
              });
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
                label="KM inicial*"
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
      </Styled.ScrollView>
      <FooterContainer>
        <Button
          title="Salvar"
          onPress={onPressSave}
          disabled={!isFormValid}
          loading={isProcessing}
        />
      </FooterContainer>
    </Styled.Container>
  );
};

export default FormVehicleTrip;

export const NavHeader = ({ navigation }: FormVehicleTripProps) => (
  <Header onBackPress={navigation.goBack} title="Registrar deslocamento" />
);
