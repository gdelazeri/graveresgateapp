import { NavigationProp, ParamListBase, StackActions } from "@react-navigation/native";
import Header from "@screens/components/header";
import CardInfo from "@screens/components/cardInfo";
import Label from "@screens/components/label";
import Styled from "./styles";
import { useVehicleTrip } from "./useVehicleTrip";
import Loader from "@screens/components/loader";
import FooterContainer from "@screens/components/footerContainer";
import Button from "@screens/components/button";
import routeMap from "@routes/routeMap";
import colors from "@theme/colors";
import moment from "moment";
import { useUserContext } from "@context/userContext";
import { UserPermission } from "@api/user/types";

interface VehicleTripProps {
  navigation: NavigationProp<ParamListBase>;
  route: {
    params: {
      id: string
    }
  }
}

const VehicleTrip = ({ navigation, route }: VehicleTripProps) => {
  const { id } = route.params || {};
  const {
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
    createdAt,
    createdByUser,
  } = useVehicleTrip(id)
  const { permission } = useUserContext()

  const onPressEdit = () => {
    navigation.navigate(routeMap.FormsRoutes.FORM_VEHICLE_TRIP, { id })
  }

  if (isLoading) {
    return <Loader />
  }
  
  return (
    <Styled.Container>
      <Styled.ScrollView>
        <CardInfo>
          <Label size={"small"} color={colors.Greyscale.b50}>Viatura</Label>
          <Label size={"medium"}>{vehicle?.name}</Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>Condutor</Label>
          <Label size={"medium"}>{driver?.name}</Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>Data</Label>
          <Label size={"medium"}>{moment(date).format('LL')}</Label>

          <Styled.Divider />

          <Styled.InlineInputContainer>
            <Styled.InlineInput style={{ paddingRight: 4 }}>
              <Label size={"small"} color={colors.Greyscale.b50}>Horário de saída</Label>
              <Label size={"medium"}>{startAt}</Label>
            </Styled.InlineInput>
            <Styled.InlineInput style={{ paddingLeft: 4 }}>
              <Label size={"small"} color={colors.Greyscale.b50}>Horário de chegada</Label>
              <Label size={"medium"}>{endAt}</Label>
            </Styled.InlineInput>
          </Styled.InlineInputContainer>

          <Styled.Divider />

          <Styled.InlineInputContainer>
            <Styled.InlineInput style={{ paddingRight: 4 }}>
              <Label size={"small"} color={colors.Greyscale.b50}>KM inicial do plantão</Label>
              <Label size={"medium"}>{kmInitial}</Label>
            </Styled.InlineInput>
            <Styled.InlineInput style={{ paddingLeft: 4 }}>
              <Label size={"small"} color={colors.Greyscale.b50}>KM de chegada</Label>
              <Label size={"medium"}>{kmFinal}</Label>
            </Styled.InlineInput>
          </Styled.InlineInputContainer>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>Local</Label>
          <Label size={"medium"}>{place}</Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>Motivo</Label>
          <Label size={"medium"}>{reason}</Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>Preenchido em</Label>
          <Label size={"medium"}>{moment(createdAt).format('DD/MM/YYYY HH:mm')}</Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>Preenchido por</Label>
          <Label size={"medium"}>{createdByUser?.name}</Label>
        </CardInfo>
        
        <Styled.Divider />
      </Styled.ScrollView>
      {permission === UserPermission.ADMIN && (
        <FooterContainer>
          <Button
            title="Editar"
            onPress={onPressEdit}
          />
        </FooterContainer>
      )}
    </Styled.Container>
  );
};

export default VehicleTrip;

export const NavHeader = ({ navigation }: VehicleTripProps) => (
  <Header onBackPress={navigation.goBack} title="Deslocamento da viatura" />
);
