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

const BasicInfo = ({
  form,
  setFormValue,
  vehicleList,
}: {
  form: PostDutyCareChecklistPayload,
  setFormValue: (key: PostDutyCareChecklistField, value: any) => void,
  vehicleList: Vehicle[],
}) => (
  <CardInfo title="Informações gerais">
    <Select
      label="Plantão*"
      placeholder="Selecione o plantão"
      value={form.dutyId}
      onChangeValue={(value) => setFormValue('dutyId', value)}
      items={[]}
    />

    <Styled.Divider />
    
    <DateInput
      label="Data*"
      placeholder="Selecione a data"
      value={form.date}
      onChangeValue={(value) => setFormValue('date', value)}
      type={'normal'}
    />

    <Styled.Divider />

    <TimeInput
      label="Horário*"
      value={form.time}
      onChangeValue={(value) => setFormValue('time', value)}
      minuteInterval={1}
    />

    <Styled.Divider />

    <RadioGroup
      label="Viatura*"
      options={vehicleList.map(vehicle => ({ label: vehicle.name, value: vehicle.id }))}
      selectedValue={form.vehicleId}
      onChangeValue={(value) => setFormValue('vehicleId', value as string)}
    />

    <Styled.Divider />
    
    <Input
      label="Observações"
      placeholder="Digite aqui..."
      value={form.note}
      onChangeText={(value) => setFormValue('note', value)}
      type={INPUT_TYPE.TEXT}
    />

    <Styled.Divider />

    <RadioGroup
      label="Motivo*"
      options={[
        { label: 'Acidente', value: 'Acidente' },
      ]}
      hasOtherOption
      selectedValue={form.reason}
      onChangeValue={(value) => setFormValue('reason', value)}
    />
  </CardInfo>
)

export default BasicInfo;