import CardInfo from "@screens/components/cardInfo";
import Select from "@screens/components/select";
import Styled from "../styles";
import { Duty } from "@api/duty/types";
import moment from "moment";
import { DutyShiftLabel } from "@api/dutyRequest/types";
import { PostRadioOperatorChecklistPayload } from "@api/radioOperatorChecklist/types";
import { PostRadioOperatorChecklistPayloadField } from "../useRadioOperatorChecklistForm";
import Input from "@screens/components/input";
import { INPUT_TYPE } from "@screens/components/input/types";

const BasicInfo = ({
  form,
  setFormValue,
  dutyList,
}: {
  form: PostRadioOperatorChecklistPayload;
  setFormValue: (key: PostRadioOperatorChecklistPayloadField, value: any) => void;
  dutyList: Duty[];
}) => {
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
