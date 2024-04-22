import CardInfo from "@screens/components/cardInfo";
import RadioGroup from "@screens/components/radioGroup";
import Select from "@screens/components/select";
import Styled from "../styles";
import { Vehicle } from "@api/vehicle/types";
import { Duty } from "@api/duty/types";
import moment from "moment";
import { DutyShiftLabel } from "@api/dutyRequest/types";
import Label from "@screens/components/label";
import colors from "@theme/colors";
import { PostDriverChecklistPayload } from "@api/driverChecklist/types";
import { PostDriverChecklistPayloadField } from "../useDriverChecklistForm";
import Input from "@screens/components/input";
import { INPUT_TYPE } from "@screens/components/input/types";

const BasicInfo = ({
  form,
  setFormValue,
  dutyList,
  vehicleList,
}: {
  form: PostDriverChecklistPayload
  setFormValue: (key: PostDriverChecklistPayloadField, value: any) => void
  dutyList: Duty[]
  vehicleList: Vehicle[]
}) => {
  const dutySelected = dutyList.find(duty => duty.id === form.dutyId)

  return (
    <CardInfo title="Informações gerais">
      <Select
        label="Plantão*"
        placeholder="Selecione o plantão"
        value={form.dutyId}
        onChangeValue={(value) => setFormValue('dutyId', value)}
        items={dutyList.map(duty => ({ label: `${moment(duty.date).format('DD/MM/YYYY')} - ${DutyShiftLabel[duty.shift]}`, value: duty.id }))}
      />
      {dutySelected && (
        <Styled.DutyInfo>
          <Label size={'small'} color={colors.Greyscale.b50} numberOfLines={1}>Condutor: {dutySelected.driverName || 'N/A'}</Label>
        </Styled.DutyInfo>
      )}

      <Styled.Divider />

      <RadioGroup
        label="Viatura*"
        options={vehicleList.map(vehicle => ({ label: vehicle.name, value: vehicle.id }))}
        selectedValue={form.vehicleId}
        onChangeValue={(value) => setFormValue('vehicleId', value as string)}
      />
      
      <Styled.Divider />

      <Input
        label="KM inicial do plantão*"
        placeholder="Informe o KM"
        value={form.kmInitial}
        onChangeText={(value) => setFormValue('kmInitial', value as string)}
        type={INPUT_TYPE.NUMERIC}
      />
    </CardInfo>
  )
}

export default BasicInfo;