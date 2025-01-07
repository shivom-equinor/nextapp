import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

type QueryParams<TQueryFnData, TError> = {
  queryKey: string[];
  queryFn: () => Promise<TQueryFnData>;
  staleTime?: number;
  cacheTime?: number;
  retry?: number;
};

/**
 * Reusable hook for React Query
 */
export function useFetchingQuery<TQueryFnData = unknown, TError = unknown>({
  queryKey,
  queryFn,
  staleTime, // Default staleTime: 30 minutes
}: QueryParams<TQueryFnData, TError>): UseQueryResult<TQueryFnData, TError> {
  return useQuery<TQueryFnData, TError>({
    queryKey,
    queryFn,
    staleTime,
  });
}
