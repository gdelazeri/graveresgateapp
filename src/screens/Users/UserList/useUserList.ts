import { listAllUsers } from "@api/user/userApi";
import { User } from "@api/user/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import Fuse, { IFuseOptions } from "fuse.js";
import { useFocusEffect } from "@react-navigation/native";

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
} as IFuseOptions<User>

export const useUserList = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [list, setList] = useState<User[]>([]);

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
  }, [searchQuery, allUsers])

  const fetchData = async () => {
    const response = await listAllUsers();
    if (response?.success) {
      setAllUsers(response.result);
    } else {
      setAllUsers([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      fetchData()
        .then(() => setIsLoading(false))
    }, [])
  );

  const refresh = () => {
    setIsRefreshing(true);
    fetchData()
      .then(() => setIsRefreshing(false))
  }

  return {
    isLoading,
    isRefreshing,
    searchQuery,
    setSearchQuery,
    list,
    refresh
  } as const;
}