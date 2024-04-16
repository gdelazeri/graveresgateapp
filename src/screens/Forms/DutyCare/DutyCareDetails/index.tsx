import moment from "moment";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Header from "@screens/components/header";
import CardInfo from "@screens/components/cardInfo";
import Label from "@screens/components/label";
import Styled from "./styles";
import { useDutyCareDetails } from "./useDutyCareDetails";
import Loader from "@screens/components/loader";
import colors from "@theme/colors";
import { DutyShiftLabel } from "@api/dutyRequest/types";
import { isString } from "@utils/stringHelper";
import { DutyCareChecklistIncidentContinuationLabel, VictimGender, VictimGenderLabel } from "@api/dutyCareChecklist/types";
import { View } from "react-native";

interface DutyCareDetailsProps {
  navigation: NavigationProp<ParamListBase>;
  route: {
    params: {
      id: string
    }
  }
}

const DutyCareDetails = ({ navigation, route }: DutyCareDetailsProps) => {
  const { id } = route.params || {};
  const {
    isLoading,
    dutyCareChecklist
  } = useDutyCareDetails(id)

  if (isLoading) {
    return <Loader />
  }
  
  return (
    <Styled.Container>
      <Styled.ScrollView>
        <CardInfo title="Informações gerais">
          <Label size={"small"} color={colors.Greyscale.b50}>Plantão</Label>
          <Label size={"medium"}>{moment(dutyCareChecklist.duty.date).format('LL')} - {DutyShiftLabel[dutyCareChecklist.duty.shift]}</Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>Data/Hora do atendimento</Label>
          <Label size={"medium"}>{moment(dutyCareChecklist.date).format('DD/MM/YYYY')} às {dutyCareChecklist.time.substring(0, 5)}</Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>Viatura</Label>
          <Label size={"medium"}>{dutyCareChecklist.vehicle.name}</Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>Motivo</Label>
          <Label size={"medium"}>{dutyCareChecklist.reason}</Label>
          
          {isString(dutyCareChecklist.note) && (
            <>
              <Styled.Divider />
              <Label size={"small"} color={colors.Greyscale.b50}>Observações</Label>
              <Label size={"medium"}>{dutyCareChecklist.note}</Label>
            </>
          )}

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>Preenchido em</Label>
          <Label size={"medium"}>{moment(dutyCareChecklist.createdAt).format('DD/MM/YYYY HH:mm')}</Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>Preenchido por</Label>
          <Label size={"medium"}>{dutyCareChecklist.createdByUser.name}</Label>
        </CardInfo>

        <Styled.Divider />

        <CardInfo title="Dados do paciente">
          <Label size={"small"} color={colors.Greyscale.b50}>Nome</Label>
          <Label size={"medium"}>{dutyCareChecklist.victimName}</Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>Sexo</Label>
          <Label size={"medium"}>{VictimGenderLabel[dutyCareChecklist.victimGender as VictimGender]}</Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>Idade</Label>
          <Label size={"medium"}>{dutyCareChecklist.victimAge}</Label>

          {isString(dutyCareChecklist.victimDocument) && (
            <>
              <Styled.Divider />
              <Label size={"small"} color={colors.Greyscale.b50}>Documento</Label>
              <Label size={"medium"}>{dutyCareChecklist.victimDocument}</Label>
            </>
          )}
        </CardInfo>

        <Styled.Divider />

        <CardInfo title="Local da ocorrência/atendimento">
          <Label size={"small"} color={colors.Greyscale.b50}>Endereço</Label>
          <Label size={"medium"}>{dutyCareChecklist.incidentAddress}</Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>Bairro</Label>
          <Label size={"medium"}>{dutyCareChecklist.incidentAddressDistrict}</Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>Cidade</Label>
          <Label size={"medium"}>{dutyCareChecklist.incidentAddressCity}</Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>Continuação da ocorrência</Label>
          <Label size={"medium"}>{DutyCareChecklistIncidentContinuationLabel[dutyCareChecklist.incidentContinuation]}</Label>
        </CardInfo>

        {Array.isArray(dutyCareChecklist.checklistFilledAnswers) && dutyCareChecklist.checklistFilledAnswers.length > 0 && (
          <>
            <Styled.Divider />
            <CardInfo title={dutyCareChecklist.checklistName}>
              {dutyCareChecklist.checklistFilledAnswers.map((answer, index) => (
                <View key={index}>
                  <Label size={"small"} color={colors.Greyscale.b50}>{answer.checklistQuestion}</Label>
                  <Label size={"medium"}>{answer.checklistQuestionOption.replace(/;/g, ', ')}</Label>
                  {index < dutyCareChecklist.checklistFilledAnswers.length - 1 && <Styled.Divider />}
                </View>
              ))}
            </CardInfo>
          </>
        )}

        <Styled.Divider />

        <CardInfo title="Evolução do atendimento">
          <Label size={"medium"}>{dutyCareChecklist.incidentEvolution}</Label>
        </CardInfo>
      </Styled.ScrollView>
    </Styled.Container>
  );
};

export default DutyCareDetails;

export const NavHeader = ({ navigation }: DutyCareDetailsProps) => (
  <Header onBackPress={navigation.goBack} title="Ficha de atendimento" />
);
