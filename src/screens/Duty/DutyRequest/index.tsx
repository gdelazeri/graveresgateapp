import { Alert } from "react-native";
import {
  NavigationProp,
  ParamListBase,
  StackActions,
} from "@react-navigation/native";
import Header from "@screens/components/header";
import Label from "@screens/components/label";
import Input from "@screens/components/input";
import Button from "@screens/components/button";
import { INPUT_TYPE } from "@screens/components/input/types";
import DateInput from "@screens/components/dateInput";
import Select from "@screens/components/select";
import {
  DutyPosition,
  DutyRequestErrorCode,
  DutyRequestErrorCodeMessage,
  DutyShift,
  DutyShiftTimes,
} from "@api/dutyRequest/types";
import RadioGroup from "@screens/components/radioGroup";
import TimeInput from "@screens/components/timeInput";
import routeMap from "@routes/routeMap";
import useDutyRequest from "./useDutyRequest";
import Styled from "./styles";
import CardInfo from "@screens/components/cardInfo";
import Toast from "react-native-toast-message";

interface DutyRequestProps {
  navigation: NavigationProp<ParamListBase>;
}

const DutyRequest = ({ navigation }: DutyRequestProps) => {
  const {
    date,
    setDate,
    shift,
    setShift,
    startAt,
    setStartAt,
    endAt,
    setEndAt,
    positions,
    setPositions,
    note,
    setNote,
    isProcessing,
    isFormValid,
    save,
    shiftOptions,
    positionOptions,
  } = useDutyRequest();

  const onChangeShift = (shift: DutyShift) => {
    setShift(shift);
    setStartAt(DutyShiftTimes[shift]?.start || null);
    setEndAt(DutyShiftTimes[shift]?.end || null);
  };

  const onPressSave = async () => {
    const response = await save();

    if (response.success && response.result) {
      Toast.show({
        type: "success",
        text1: "Marcação de plantão",
        text2: "Solicitado com sucesso!",
        position: "bottom",
      });
      navigation.dispatch(
        StackActions.replace(routeMap.DutyRoutes.LIST_DUTY_REQUEST),
      );
      navigation.dispatch(
        StackActions.push(routeMap.DutyRoutes.DUTY_REQUEST_DETAILS, {
          id: response.result.id,
        }),
      );
    } else if (response.error === DutyRequestErrorCode.DutyRequestExistent) {
      Alert.alert(
        "Erro ao solicitar plantão",
        DutyRequestErrorCodeMessage[response.error],
        [{ text: "OK" }],
      );
    } else {
      Alert.alert(
        "Erro ao solicitar plantão",
        "Ocorreu algum erro ao solicitar o plantão, verifique os dados e tente novamente.",
        [{ text: "OK" }],
      );
    }
  };
  return (
    <>
      <Styled.Container>
        <CardInfo>
          <Label size={"medium"}>
            Preencha os dados para a solicitação de plantão.
          </Label>
          <Label size={"small"}>
            A solicitação não é garantia de vaga na escala.
          </Label>
          <Styled.Divider />
          <DateInput
            label="Data do plantão*"
            placeholder="Selecione a data"
            value={date}
            onChangeValue={setDate}
            type="duty"
          />
          <Styled.Divider />
          <Select
            label="Turno*"
            placeholder="Selecione um turno"
            value={shift ? shift.toString() : null}
            onChangeValue={(value) => onChangeShift(value as DutyShift)}
            items={shiftOptions}
          />
          <Styled.Divider />
          <Styled.Inline style={{ marginBottom: 4 }}>
            <Styled.TimeInputContainer style={{ paddingRight: 8 }}>
              <TimeInput
                label="Horário de entrada"
                value={startAt || ""}
                onChangeValue={(value) => setStartAt(value)}
                minuteInterval={5}
              />
            </Styled.TimeInputContainer>
            <Styled.TimeInputContainer style={{ paddingLeft: 8 }}>
              <TimeInput
                label="Horário de saída"
                value={endAt || ""}
                onChangeValue={(value) => setEndAt(value)}
                minuteInterval={5}
              />
            </Styled.TimeInputContainer>
          </Styled.Inline>
          <Label size="small">
            Edite os campos acima caso precise alterar os horários de entrada e
            saída
          </Label>
          <Styled.Divider />
          <RadioGroup
            label="Posições*"
            options={positionOptions}
            selectedValue={positions}
            onChangeValue={(value) => setPositions(value as DutyPosition[])}
            multiple
          />
          <Styled.Divider />
          <Input
            label="Observações"
            placeholder="Escreva aqui..."
            value={note}
            onChangeText={(value) => setNote(value)}
            type={INPUT_TYPE.TEXT}
          />
        </CardInfo>
      </Styled.Container>
      <Styled.Footer>
        <Button
          testID="continue-btn"
          title="Enviar solicitação"
          onPress={onPressSave}
          disabled={!isFormValid}
          loading={isProcessing}
        />
      </Styled.Footer>
    </>
  );
};

export default DutyRequest;

export const NavHeader = ({ navigation }: DutyRequestProps) => (
  <Header title="Marcação de plantão" onBackPress={navigation.goBack} />
);
