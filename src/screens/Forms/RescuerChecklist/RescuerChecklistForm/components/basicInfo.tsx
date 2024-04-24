import CardInfo from "@screens/components/cardInfo";
import RadioGroup from "@screens/components/radioGroup";
import Select from "@screens/components/select";
import Styled from "../styles";
import { Vehicle } from "@api/vehicle/types";
import { Duty } from "@api/duty/types";
import moment from "moment";
import { DutyShiftLabel } from "@api/dutyRequest/types";
import { PostRescuerChecklistPayload } from "@api/rescuerChecklist/types";
import { PostRescuerChecklistPayloadField } from "../useRescuerChecklistForm";

const BasicInfo = ({
  form,
  setFormValue,
  dutyList,
  vehicleList,
}: {
  form: PostRescuerChecklistPayload;
  setFormValue: (key: PostRescuerChecklistPayloadField, value: any) => void;
  dutyList: Duty[];
  vehicleList: Vehicle[];
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
    </CardInfo>
  );
};

export default BasicInfo;
