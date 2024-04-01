import { useEffect, useMemo, useState } from "react";
import Fuse, { IFuseOptions } from "fuse.js";
import {  DutyPosition } from "@api/dutyRequest/types";
import { User, UserPermission } from "@api/user/types";
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

interface UseSelectUserProps {
  position: DutyPosition;
}

const useSelectUser = ({ position }: UseSelectUserProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [list, setList] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);

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
        setAllUsers([...response.result]);
      }

      setIsLoading(false)
    }
    fetchData();
  }, [])

  return {
    isLoading,
    searchValue,
    setSearchValue,
    list,
  };
};

export default useSelectUser;
