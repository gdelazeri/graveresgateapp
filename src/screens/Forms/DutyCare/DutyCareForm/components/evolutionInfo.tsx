import CardInfo from "@screens/components/cardInfo";
import Input from "@screens/components/input";
import { INPUT_TYPE } from "@screens/components/input/types";
import { PostDutyCareChecklistPayload } from "@api/dutyCareChecklist/types";
import { PostDutyCareChecklistField } from "../useDutyCareForm";

const EvolutionInfo = ({
  form,
  setFormValue,
}: {
  form: PostDutyCareChecklistPayload;
  setFormValue: (key: PostDutyCareChecklistField, value: any) => void;
}) => (
  <CardInfo title="Evolução do atendimento">
    <Input
      label="Descreva a evolução do atendimento*"
      placeholder="Digite aqui..."
      value={form.incidentEvolution}
      onChangeText={(value) => setFormValue("incidentEvolution", value)}
      type={INPUT_TYPE.TEXT}
    />
  </CardInfo>
);

export default EvolutionInfo;
