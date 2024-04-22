import moment from "moment";
import { View } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import CardInfo from "@screens/components/cardInfo";
import Label from "@screens/components/label";
import Styled from "./styles";
import { useDriverChecklistDetails } from "./useDriverChecklistDetails";
import Loader from "@screens/components/loader";
import colors from "@theme/colors";
import { DutyShiftLabel } from "@api/dutyRequest/types";
import ChecklistAnswers from "@screens/components/checklistAnswers";

interface DriverChecklistDetailsProps {
  navigation: NavigationProp<ParamListBase>;
  route: {
    params: {
      id: string
    }
  }
}

const DriverChecklistDetails = ({ route }: DriverChecklistDetailsProps) => {
  const { id } = route.params || {};
  const {
    isLoading,
    driverChecklist
  } = useDriverChecklistDetails(id)

  if (isLoading) {
    return <Loader />
  }
  
  return (
    <Styled.Container>
      <Styled.ScrollView>
        <CardInfo title="Informações gerais">
          <Label size={"small"} color={colors.Greyscale.b50}>Plantão</Label>
          <Label size={"medium"}>{moment(driverChecklist.duty.date).format('LL')} - {DutyShiftLabel[driverChecklist.duty.shift]}</Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>Viatura</Label>
          <Label size={"medium"}>{driverChecklist.vehicle.name}</Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>KM Inicial</Label>
          <Label size={"medium"}>{driverChecklist.kmInitial}</Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>Preenchido em</Label>
          <Label size={"medium"}>{moment(driverChecklist.createdAt).format('DD/MM/YYYY HH:mm')}</Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>Preenchido por</Label>
          <Label size={"medium"}>{driverChecklist.createdByUser.name}</Label>
        </CardInfo>

        {Array.isArray(driverChecklist.checklistFilledAnswers) && driverChecklist.checklistFilledAnswers.length > 0 && (
          <>
            <Styled.Divider />
            <ChecklistAnswers
              checklistName={driverChecklist.checklistName}
              answers={driverChecklist.checklistFilledAnswers}
            />
          </>
        )}
      </Styled.ScrollView>
    </Styled.Container>
  );
};

export default DriverChecklistDetails;

export const NavHeader = ({ navigation }: DriverChecklistDetailsProps) => (
  <Header onBackPress={navigation.goBack} title="Checklist Condutor" />
);
