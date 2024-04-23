import { Switch } from "react-native-elements";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import Button from "@screens/components/button";
import { Vehicle } from "@api/vehicle/types";
import useVehicleForm from "./useVehicleForm";
import CardInfo from "@screens/components/cardInfo";
import Input from "@screens/components/input";
import Label from "@screens/components/label";
import colors from "@theme/colors";
import Styled from "./styles";
import Toast from "react-native-toast-message";
import { Alert } from "react-native";

interface VehicleListProps {
  navigation: NavigationProp<ParamListBase>;
  route: {
    params: {
      vehicle?: Vehicle;
    };
  };
}

const VehicleForm = ({ navigation, route }: VehicleListProps) => {
  const { vehicle } = route?.params || {};
  const {
    name,
    setName,
    brand,
    setBrand,
    model,
    setModel,
    year,
    setYear,
    licensePlate,
    setLicensePlate,
    isAvailable,
    setIsAvailable,
    isProcessing,
    isValidForm,
    save,
  } = useVehicleForm({ vehicle });

  const onPressSave = async () => {
    const response = await save();

    if (response.success && response.result) {
      Toast.show({
        type: "success",
        text1: "Viatura",
        text2: "Salvo com sucesso!",
        position: "bottom",
      });

      navigation.goBack();
    } else {
      Alert.alert(
        "Erro ao salvar",
        "Ocorreu algum erro ao salvar, verifique os dados e tente novamente.",
        [{ text: "OK" }],
      );
    }
  };

  return (
    <>
      <Styled.Container>
        <CardInfo>
          <Input
            label="Nome da viatura*"
            value={name}
            onChangeText={setName}
            placeholder="Ex.: UR-G01, VTR-02"
          />

          <Styled.Divider />

          <Input
            label="Marca do veículo"
            value={brand}
            onChangeText={setBrand}
            placeholder="Ex.: Renault, Mercedes"
          />

          <Styled.Divider />

          <Input
            label="Modelo do veículo*"
            value={model}
            onChangeText={setModel}
            placeholder="Ex.: Master, Sprinter"
          />

          <Styled.Divider />

          <Input
            label="Ano do modelo"
            value={year}
            onChangeText={setYear}
            placeholder="Ex.: 2023"
            maxLength={4}
          />

          <Styled.Divider />

          <Input
            label="Placa do veículo"
            value={licensePlate}
            onChangeText={setLicensePlate}
            placeholder="Ex.: ABC1D34"
            maxLength={7}
          />

          <Styled.Divider />

          <Label size={"small"}>Viatura disponível para uso</Label>
          <Styled.ContainerSwitch>
            <Switch
              value={isAvailable}
              onValueChange={(value) => setIsAvailable(value)}
              trackColor={{ true: colors.green }}
            />
          </Styled.ContainerSwitch>
        </CardInfo>
      </Styled.Container>
      <Styled.Footer>
        <Button
          title="Salvar"
          onPress={onPressSave}
          loading={isProcessing}
          disabled={!isValidForm}
        />
      </Styled.Footer>
    </>
  );
};

export default VehicleForm;

export const NavHeader = ({ navigation, route }: VehicleListProps) => {
  const { vehicle } = route?.params || {};
  const title = vehicle?.id ? "Editar viatura" : "Nova viatura";

  return <Header onBackPress={navigation.goBack} title={title} />;
};
