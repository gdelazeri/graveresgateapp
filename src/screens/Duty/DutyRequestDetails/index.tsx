import { Alert } from "react-native";
import moment from "moment";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

import Header from "@screens/components/header";
import Label from "@screens/components/label";
import Button from "@screens/components/button";
import {
  DutyPosition,
  DutyRequestListItem,
  DutyRequestStatus,
  DutyRequestStatusLabel,
  DutyShift,
  DutyShiftLabel,
} from "@api/dutyRequest/types";
import Styled from "./styles";
import DutyRequestPositions from "@screens/components/dutyRequestPositions";
import { isString } from "@utils/stringHelper";
import CardInfo from "@screens/components/cardInfo";
import Chip from "@screens/components/chip";
import colors from "@theme/colors";
import useDutyRequestDetails from "./useDutyRequestDetails";
import Loader from "@screens/components/loader";

interface DutyRequestDetailsProps {
  navigation: NavigationProp<ParamListBase>;
  route: {
    params: {
      id: string;
    };
  };
}

const DutyRequestDetails = ({ route, navigation }: DutyRequestDetailsProps) => {
  const { id } = route.params;
  const { isLoading, isProcessing, dutyRequest, remove } =
    useDutyRequestDetails({ id });

  const onDelete = async () => {
    await remove();
    navigation.goBack();
  };

  const onPressDelete = () => {
    if (dutyRequest?.status !== DutyRequestStatus.PENDING) {
      Alert.alert(
        "Não é possível cancelar a solicitação",
        "Para cancelar, entre em contato com o responsável pela escala de plantão.",
        [
          {
            text: "Ok",
          },
        ],
      );
    } else {
      Alert.alert(
        "Cancelar solicitação",
        "Deseja realmente cancelar a solicitação de plantão? Essa ação não poderá ser desfeita.",
        [
          {
            text: "Não",
            style: "cancel",
          },
          {
            text: "Sim",
            style: "destructive",
            onPress: onDelete,
          },
        ],
      );
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Styled.ScrollView>
        <CardInfo>
          <Label size={"small"} color={colors.Greyscale.b50}>
            Data
          </Label>
          <Label size={"medium"}>
            {moment(dutyRequest?.date).format("LL")}
          </Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>
            Turno
          </Label>
          <Label size={"medium"}>
            {DutyShiftLabel[dutyRequest?.shift as DutyShift]}
          </Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>
            Horário
          </Label>
          <Label size={"medium"}>
            {dutyRequest?.startAt.substring(0, 5)} às{" "}
            {dutyRequest?.endAt.substring(0, 5)}
          </Label>

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>
            Posições
          </Label>
          <DutyRequestPositions
            id={dutyRequest?.id as string}
            positions={(dutyRequest?.positions || []) as DutyPosition[]}
          />

          <Styled.Divider />

          <Label size={"small"} color={colors.Greyscale.b50}>
            Status
          </Label>
          <Styled.StatusContainer>
            <Chip
              label={
                DutyRequestStatusLabel[dutyRequest?.status as DutyRequestStatus]
              }
              labelColor={
                dutyRequest?.status === DutyRequestStatus.APPROVED
                  ? colors.Greyscale.b100
                  : colors.black
              }
              backgroundColor={
                dutyRequest?.status === DutyRequestStatus.APPROVED
                  ? colors.green
                  : colors.yellow
              }
            />
          </Styled.StatusContainer>

          {isString(dutyRequest?.note) && (
            <>
              <Styled.Divider />
              <Label size={"small"} color={colors.Greyscale.b50}>
                Observações
              </Label>
              <Label size={"medium"}>{dutyRequest?.note}</Label>
            </>
          )}
        </CardInfo>
      </Styled.ScrollView>
      <Styled.Footer>
        <Button
          testID="delete-btn"
          title="Cancelar solicitação"
          onPress={onPressDelete}
          loading={isProcessing}
        />
      </Styled.Footer>
    </>
  );
};

export default DutyRequestDetails;

export const NavHeader = ({ navigation }: DutyRequestDetailsProps) => (
  <Header title="Solicitação de Plantão" onBackPress={navigation.goBack} />
);
