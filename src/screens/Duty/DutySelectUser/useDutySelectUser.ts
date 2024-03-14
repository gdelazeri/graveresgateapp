import { useEffect, useState } from "react";
import { DutyPosition, DutyRequest } from "@api/dutyRequest/types";
import { User, UserPermission } from "@api/user/types";
import { listFilteredUsers } from "@api/user/userApi";

interface UseDutySelectUserProps {
  position: DutyPosition;
  dutyRequests: DutyRequest[];
}

const useDutySelectUser = ({ position, dutyRequests }: UseDutySelectUserProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState<User[]>([]);
  const [sectionList, setSectionList] = useState<{ title: string, data: User[] }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      let isLeader: boolean | undefined = undefined;
      let isDriver: boolean | undefined = undefined;
      let permission: UserPermission | undefined = undefined;

      switch (position) {
        case DutyPosition.LEADER:
          isLeader = true;
          break;
        case DutyPosition.DRIVER:
          isDriver = true;
          break;
        case DutyPosition.TRAINEE:
          permission = UserPermission.TRAINEE;
          break;
        case DutyPosition.RESCUER:
          permission = UserPermission.VOLUNTARY;
          break;
        default:
          break;
      }
    
      const response = await listFilteredUsers({
        isDriver,
        isLeader,
        permission
      });

      if (response.success && response.result) {
        setList(
          [ ...response.result ]
        );
      }

      setIsLoading(false)
    }
    fetchData();
  }, [])

  useEffect(() => {
    const requestedUserIds = dutyRequests.map((request) => request.userId);
    const requestdUsers = list.filter((user) => requestedUserIds.includes(user.id)) as User[];
    const otherUsers = list.filter((user) => !requestedUserIds.includes(user.id)) as User[];

    const section = [
      { title: 'Solicitações', data: [...requestdUsers] },
      { title: 'Outros voluntários', data: [...otherUsers] },
    ]

    setSectionList(section);
  }, [list, dutyRequests])

  return {
    isLoading,
    sectionList,
  };
};

export default useDutySelectUser;
