import { IUser, listUsers } from "@api/user";
import { useEffect, useMemo, useState } from "react";
import Fuse, { IFuseOptions } from "fuse.js";

const fuseOptionKey = ['name', 'email']
const fuseOptions = {
  includeScore: true,
  includeMatches: true,
  shouldSort: true,
  keys: fuseOptionKey,
  getFn: (obj: any, path: string) =>
    typeof obj[path] === 'string' ? obj[path] : '',
  threshold: 0.2,
  ignoreLocation: true
} as IFuseOptions<IUser>

export const useUserList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [list, setList] = useState<IUser[]>([]);

  const initFuse = useMemo(() => new Fuse(allUsers, fuseOptions), [allUsers])

  useEffect(() => {
    if (searchQuery.length > 0) {
      const results = initFuse.search(searchQuery).map(result => ({
        ...result.item,
        matches: result.matches
      }))
      setList(results)
    } else {
      setList(allUsers)
    }
  }, [searchQuery])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await listUsers();
      if (response?.success) {
        setAllUsers(response.result);
        setList(response.result);
      } else {
        setAllUsers([]);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return {
    isLoading,
    searchQuery,
    setSearchQuery,
    list
  } as const;
}