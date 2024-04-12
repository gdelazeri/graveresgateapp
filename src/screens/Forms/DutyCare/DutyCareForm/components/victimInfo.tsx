import CardInfo from "@screens/components/cardInfo";
import RadioGroup from "@screens/components/radioGroup";
import Input from "@screens/components/input";
import { INPUT_TYPE } from "@screens/components/input/types";
import Styled from "../styles";
import { PostDutyCareChecklistPayload } from "@api/dutyCareChecklist/types";
import { PostDutyCareChecklistField } from "../useDutyCareForm";

const VictimInfo = ({
  form,
  setFormValue,
}: {
  form: PostDutyCareChecklistPayload,
  setFormValue: (key: PostDutyCareChecklistField, value: any) => void,
}) => (
  <CardInfo title="Dados do Paciente">
    <Input
      label="Nome completo*"
      placeholder="Informe o nome completo do paciente"
      value={form.victimName}
      onChangeText={(value) => setFormValue('victimName', value)}
      type={INPUT_TYPE.DEFAULT}
    />

    <Styled.Divider />

    <RadioGroup
      label="Sexo*"
      selectedValue={form.victimGender}
      options={[
        { label: 'Masculino', value: 'M' },
        { label: 'Feminino', value: 'F' },
        { label: 'Indefinido', value: '-' },
      ]}
      onChangeValue={(value) => setFormValue('victimGender', String(value))}
    />

    <Styled.Divider />

    <Input
      label="Idade*"
      placeholder="Informe a idade do paciente"
      value={form.victimAge ? form.victimAge.toString() : ''}
      onChangeText={(value) => setFormValue('victimAge', value)}
      type={INPUT_TYPE.NUMERIC}
    />

    <Styled.Divider />

    <Input
      label="Documento"
      placeholder="CPF ou RG"
      value={form.victimDocument}
      onChangeText={(value) => setFormValue('victimDocument', value)}
      type={INPUT_TYPE.NUMERIC}
    />
  </CardInfo>
)

export default VictimInfo;