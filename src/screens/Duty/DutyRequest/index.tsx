import { NavigationProp, ParamListBase, StackActions } from "@react-navigation/native";
import Header from "@screens/components/header";
import Label from "@screens/components/label";
import Input from "@screens/components/input";
import Button from "@screens/components/button";
import { INPUT_TYPE } from "@screens/components/input/types";
import DateInput from "@screens/components/dateInput";
import Select from "@screens/components/select";
import { DutyPosition, DutyShift, DutyShiftTimes } from "@api/dutyRequest/types";
import RadioGroup from "@screens/components/radioGroup";
import useDutyRequest from "./useDutyRequest";
import Styled from "./styles";
import TimeInput from "@screens/components/timeInput";
import routeMap from "@routes/routeMap";

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
    positionOptions
  } = useDutyRequest();

  const onChangeShift = (shift: DutyShift) => {
    setShift(shift);
    setStartAt(DutyShiftTimes[shift]?.start || null)
    setEndAt(DutyShiftTimes[shift]?.end || null)
  }

  const onPressSave = async () => {
    const dutyRequestCreated = await save();

    if (dutyRequestCreated) {
      navigation.dispatch(
        StackActions.replace(routeMap.DutyRoutes.LIST_DUTY_REQUEST)
      );
      navigation.dispatch(
        StackActions.push(routeMap.DutyRoutes.DUTY_REQUEST_DETAILS, { id: dutyRequestCreated.id })
      );
    }
  }
  return (
    <>
      <Styled.Container>
        <Label size={"medium"}>Preencha os dados para a solicitação de plantão.</Label>
        <Label size={"small"}>A solicitação não é garantia de vaga na escala.</Label>
        <Styled.Divider />
        <DateInput
          label="Data do plantão"
          placeholder="Selecione a data"
          value={date}
          onChangeValue={setDate}
          type="duty"
        />
        <Styled.Divider />
        <Select
          label="Turno"
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
            />
          </Styled.TimeInputContainer>
          <Styled.TimeInputContainer style={{ paddingLeft: 8 }}>
            <TimeInput
              label="Horário de saída"
              value={endAt || ""}
              onChangeValue={(value) => setEndAt(value)}
            />
          </Styled.TimeInputContainer>
        </Styled.Inline>
        <Label size="small">Edite os campos acima caso precise alterar os horários de entrada e saída</Label>
        <Styled.Divider />
        <RadioGroup
          label="Posições"
          items={positionOptions}
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
  <Header title="Marcação de Plantão" onBackPress={navigation.goBack} />
);
