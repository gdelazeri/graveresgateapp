import moment from "moment";
import { DutyCareChecklist } from "@api/dutyCareChecklist/types";
import { formatAddress } from "@utils/stringHelper";
import Label from "../label";

interface DutyCareListItemProps {
  item: DutyCareChecklist;
}

const DutyCareListItem = ({ item }: DutyCareListItemProps) => (
  <>
    <Label size={"medium"} bold>
      {item.reason}
    </Label>
    <Label size={"small"}>
      {formatAddress({
        address: item.incidentAddress,
        district: item.incidentAddressDistrict,
        city: item.incidentAddressCity,
      })}
    </Label>
    <Label size={"small"}>
      {moment(item.date).format("LL")} - {item.time.substring(0, 5)}
    </Label>
  </>
);

export default DutyCareListItem;
