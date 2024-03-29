import { useEffect, useMemo, useState } from "react";
import Fuse, { IFuseOptions } from "fuse.js";
import {  DutyPosition, DutyRequest } from "@api/dutyRequest/types";
import { User, UserDutyRequest, UserPermission } from "@api/user/types";
import { listActiveUsers } from "@api/user/userApi";

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

const useDutySelectUser = ({
  position,
  dutyRequests,
  usersAlreadySelected
}: UseDutySelectUserProps) => {
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

      let isDriver;
      let isLeader;
      let permission;

      switch (position) {
        case DutyPosition.DRIVER:
          isDriver = true;
          break;
        case DutyPosition.LEADER:
          isLeader = true;
          break;
        case DutyPosition.TRAINEE:
          permission = UserPermission.TRAINEE;
          break;
      }

      const response = await listActiveUsers({ isDriver, isLeader, permission });

      if (response.success && response.result) {
        setAllUsers(
          [...response.result].map((user) => ({
            ...user,
            selected: usersAlreadySelected.includes(user.id)
          }))
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
      .sort((a, b) => a.dutyRequest?.createdAt > b.dutyRequest?.createdAt ? 1 : -1)

    const otherUsers = list.filter((user) => !requestedUserIds.includes(user.id)) as UserDutyRequest[];

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
