import useSWR from 'swr';
import fetcher from '../../../services/fetcher';

export default function useUserRepos(username: string) {
  const { data, error, isLoading } = useSWR(
    `/users/${username}/repos`,
    fetcher,
    {
      refreshInterval: 1000,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    },
  );

  return {
    repos: data,
    isLoading,
    error,
  };
}
