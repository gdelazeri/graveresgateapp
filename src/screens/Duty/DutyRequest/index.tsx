import { NavigationProp, ParamListBase } from "@react-navigation/native";

import Header from "@screens/components/header";
import Label from "@screens/components/label";
import Input from "@screens/components/input";
import Button from "@screens/components/button";
import useDutyRequest from "./useDutyRequest";
import { INPUT_TYPE } from "@screens/components/input/types";
import Styled from "./styles";
import DateInput from "@screens/components/dateInput";
import Select from "@screens/components/select";
import { DutyPosition, DutyPositionLabel, DutyShift, DutyShiftLabel } from "@api/dutyRequest/types";
import RadioGroup from "@screens/components/radioGroup";

interface DutyRequestProps {
  navigation: NavigationProp<ParamListBase>;
}

const DutyRequest = ({ navigation }: DutyRequestProps) => {
  const {
    date,
    setDate,
    shift,
    setShift,
    positions,
    setPositions,
    note,
    setNote,
    isProcessing,
    isFormValid,
    save,
  } = useDutyRequest();

  const shiftItems = [DutyShift.DAY, DutyShift.NIGHT]
    .map((value) => ({
      key: value,
      label: DutyShiftLabel[value as DutyShift],
      value: value
    }))

  const positionItems = [DutyPosition.LEADER, DutyPosition.DRIVER, DutyPosition.RESCUER, DutyPosition.RADIO_OPERATOR]
    .map((value) => ({
      key: value,
      label: DutyPositionLabel[value as DutyPosition],
      value: value
    }))

  return (
    <Styled.Container>
      <Styled.Form>
        <Label size={"medium"}>Preencha os dados para a solicitação de plantão.</Label>
        <Label size={"small"}>A marcação não é garantia de vaga na escala.</Label>
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
          onChangeValue={(value) => setShift(value as DutyShift)}
          items={shiftItems}
        />
        <Styled.Divider />
        <RadioGroup
          label="Posições"
          items={positionItems}
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
        
      </Styled.Form>
      <Button
        testID="continue-btn"
        title="Marcar plantão"
        onPress={save}
        disabled={!isFormValid}
        loading={isProcessing}
      />
    </Styled.Container>
  );
};

export default DutyRequest;

export const NavHeader = ({ navigation }: DutyRequestProps) => (
  <Header title="Marcação de Plantão" onBackPress={navigation.goBack} />
);
