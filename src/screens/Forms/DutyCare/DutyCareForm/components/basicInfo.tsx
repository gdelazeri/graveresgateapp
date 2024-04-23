import CardInfo from "@screens/components/cardInfo";
import RadioGroup from "@screens/components/radioGroup";
import Select from "@screens/components/select";
import Input from "@screens/components/input";
import { INPUT_TYPE } from "@screens/components/input/types";
import DateInput from "@screens/components/dateInput";
import TimeInput from "@screens/components/timeInput";
import Styled from "../styles";
import { PostDutyCareChecklistPayload } from "@api/dutyCareChecklist/types";
import { Vehicle } from "@api/vehicle/types";
import { PostDutyCareChecklistField } from "../useDutyCareForm";
import { Duty } from "@api/duty/types";
import moment from "moment";
import { DutyShiftLabel } from "@api/dutyRequest/types";
import Label from "@screens/components/label";
import colors from "@theme/colors";
import { isString } from "@utils/stringHelper";

const BasicInfo = ({
  form,
  setFormValue,
  dutyList,
  vehicleList,
  reasonList,
}: {
  form: PostDutyCareChecklistPayload;
  setFormValue: (key: PostDutyCareChecklistField, value: any) => void;
  dutyList: Duty[];
  vehicleList: Vehicle[];
  reasonList: string[];
}) => {
  const dutySelected = dutyList.find((duty) => duty.id === form.dutyId);

  return (
    <CardInfo title="Informações gerais">
      <Select
        label="Plantão*"
        placeholder="Selecione o plantão"
        value={form.dutyId}
        onChangeValue={(value) => setFormValue("dutyId", value)}
        items={dutyList.map((duty) => ({
          label: `${moment(duty.date).format("DD/MM/YYYY")} - ${
            DutyShiftLabel[duty.shift]
          }`,
          value: duty.id,
        }))}
      />
      {dutySelected && (
        <Styled.DutyInfo>
          {isString(dutySelected.leaderId) && (
            <Label
              size={"small"}
              color={colors.Greyscale.b50}
              numberOfLines={1}
            >
              Líder: {dutySelected.leaderName}
            </Label>
          )}
          {isString(dutySelected.driverId) && (
            <Label
              size={"small"}
              color={colors.Greyscale.b50}
              numberOfLines={1}
            >
              Condutor: {dutySelected.driverName}
            </Label>
          )}
          {isString(dutySelected.firstRescuerId) && (
            <Label
              size={"small"}
              color={colors.Greyscale.b50}
              numberOfLines={1}
            >
              1º Socorrista: {dutySelected.firstRescuerName}
            </Label>
          )}
          {isString(dutySelected.secondRescuerId) && (
            <Label
              size={"small"}
              color={colors.Greyscale.b50}
              numberOfLines={1}
            >
              2º Socorrista: {dutySelected.secondRescuerName}
            </Label>
          )}
          {isString(dutySelected.assistantRadioOperatorId) && (
            <Label
              size={"small"}
              color={colors.Greyscale.b50}
              numberOfLines={1}
            >
              Auxiliar de S.O: {dutySelected.assistantRadioOperatorName}
            </Label>
          )}
          {isString(dutySelected.radioOperatorId) && (
            <Label
              size={"small"}
              color={colors.Greyscale.b50}
              numberOfLines={1}
            >
              S.O: {dutySelected.radioOperatorName}
            </Label>
          )}
          {isString(dutySelected.traineeId) && (
            <Label
              size={"small"}
              color={colors.Greyscale.b50}
              numberOfLines={1}
            >
              S.O: {dutySelected.traineeName}
            </Label>
          )}
        </Styled.DutyInfo>
      )}

      <Styled.Divider />

      <DateInput
        label="Data*"
        placeholder="Selecione a data"
        value={form.date}
        onChangeValue={(value) => setFormValue("date", value)}
        type={"normal"}
      />

      <Styled.Divider />

      <TimeInput
        label="Horário*"
        value={form.time}
        onChangeValue={(value) => setFormValue("time", value)}
        minuteInterval={1}
      />

      <Styled.Divider />

      <RadioGroup
        label="Viatura*"
        options={vehicleList.map((vehicle) => ({
          label: vehicle.name,
          value: vehicle.id,
        }))}
        selectedValue={form.vehicleId}
        onChangeValue={(value) => setFormValue("vehicleId", value as string)}
      />
      <Styled.Divider />

      <RadioGroup
        label="Motivo*"
        options={reasonList.map((reason) => ({ label: reason, value: reason }))}
        hasOtherOption
        selectedValue={form.reason}
        onChangeValue={(value) => setFormValue("reason", value)}
      />

      <Styled.Divider />

      <Input
        label="Observações"
        placeholder="Digite aqui..."
        value={form.note}
        onChangeText={(value) => setFormValue("note", value)}
        type={INPUT_TYPE.TEXT}
      />
    </CardInfo>
  );
};

export default BasicInfo;
