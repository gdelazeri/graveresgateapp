import CardInfo from "@screens/components/cardInfo";
import RadioGroup from "@screens/components/radioGroup";
import Input from "@screens/components/input";
import { INPUT_TYPE } from "@screens/components/input/types";
import Styled from "../styles";
import { DutyCareChecklistIncidentContinuation, DutyCareChecklistIncidentContinuationLabel, PostDutyCareChecklistPayload } from "@api/dutyCareChecklist/types";
import { PostDutyCareChecklistField } from "../useDutyCareForm";

const LocationInfo = ({
  form,
  setFormValue,
}: {
  form: PostDutyCareChecklistPayload,
  setFormValue: (key: PostDutyCareChecklistField, value: any) => void,
}) => (
  <CardInfo title="Local da ocorrência/atendimento">
    <Input
      label="Endereço completo*"
      placeholder="Informe a rua e número"
      value={form.incidentAddress}
      onChangeText={(value) => setFormValue('incidentAddress', value)}
      type={INPUT_TYPE.DEFAULT}
    />

    <Styled.Divider />

    <Input
      label="Bairro*"
      placeholder="Informe o bairro"
      value={form.incidentAddressDistrict}
      onChangeText={(value) => setFormValue('incidentAddressDistrict', value)}
      type={INPUT_TYPE.DEFAULT}
    />

    <Styled.Divider />

    <RadioGroup 
      label="Cidade*"
      selectedValue={form.incidentAddressCity}
      onChangeValue={(value) => setFormValue('incidentAddressCity', String(value))}
      options={[
        { label: 'Gravataí/RS', value: 'Gravataí/RS' },
        { label: 'Cachoeirinha/RS', value: 'Cachoeirinha/RS' },
      ]}
    />

    <Styled.Divider />

    <RadioGroup 
      label="Continuação da ocorrência*"
      selectedValue={form.incidentContinuation}
      onChangeValue={(value) => setFormValue('incidentContinuation', value as string)}
      options={[
        { label: DutyCareChecklistIncidentContinuationLabel[DutyCareChecklistIncidentContinuation.REFUSED], value: DutyCareChecklistIncidentContinuation.REFUSED },
        { label: DutyCareChecklistIncidentContinuationLabel[DutyCareChecklistIncidentContinuation.REMOVAL], value: DutyCareChecklistIncidentContinuation.REMOVAL },
      ]}
    />
  </CardInfo>
)

export default LocationInfo;