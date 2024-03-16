import { useEffect, useMemo, useState } from "react";
import Fuse, { IFuseOptions } from "fuse.js";
import { DutyPosition, DutyRequest } from "@api/dutyRequest/types";
import { User, UserDutyRequest, UserPermission } from "@api/user/types";
import { listFilteredUsers } from "@api/user/userApi";

const fuseOptionKey = ['name']
const fuseOptions = {
  includeScore: true,
  includeMatches: true,
  shouldSort: true,
  keys: fuseOptionKey,
  getFn: (obj: any, path: string) =>
    typeof obj[path] === 'string' ? obj[path] : '',
  threshold: 0.2,
  ignoreLocation: true
} as IFuseOptions<User>

interface UseDutySelectUserProps {
  position: DutyPosition;
  dutyRequests: DutyRequest[];
  usersAlreadySelected: string[];
}

const useDutySelectUser = ({ position, dutyRequests, usersAlreadySelected }: UseDutySelectUserProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [list, setList] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [sectionList, setSectionList] = useState<{ title: string, data: UserDutyRequest[] }[]>([]);

  const initFuse = useMemo(() => new Fuse(allUsers, fuseOptions), [allUsers])

  useEffect(() => {
    if (searchValue.length > 0) {
      const results = initFuse.search(searchValue).map(result => ({
        ...result.item,
        matches: result.matches
      }))
      setList(results)
    } else {
      setList(allUsers)
    }
  }, [searchValue, allUsers])

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
        case DutyPosition.RADIO_OPERATOR:
        default:
          break;
      }
    
      const response = await listFilteredUsers({
        isDriver,
        isLeader,
        permission
      });

      if (response.success && response.result) {
        setAllUsers(
          [...response.result].filter((user) => !usersAlreadySelected.includes(user.id))
        );
      }

      setIsLoading(false)
    }
    fetchData();
  }, [])

  useEffect(() => {
    const requestedUserIds = dutyRequests.map((request) => request.userId);
    const requestedUsers = [...list.filter((user) => requestedUserIds.includes(user.id))]
      .map((user) => {
        const dutyRequest = dutyRequests.find((request) => request.userId === user.id);
        return {
          ...user,
          dutyRequest,
        } as UserDutyRequest
      })
    const otherUsers = list.filter((user) => !requestedUserIds.includes(user.id)) as UserDutyRequest[];
// console.log(requestedUsers)
    const section = [
      { title: 'Solicitações', data: [...requestedUsers] },
      { title: 'Outros voluntários', data: [...otherUsers] },
    ]

    setSectionList(section);
  }, [list, dutyRequests])

  return {
    isLoading,
    searchValue,
    setSearchValue,
    sectionList,
  };
};

export default useDutySelectUser;
