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
  initialData?: TQueryFnData; // Add initialData parameter
};

/**
 * Reusable hook for React Query with initialData support
 */
export function useFetchingQuery<TQueryFnData = unknown, TError = unknown>({
  queryKey,
  queryFn,
  staleTime, // Default staleTime: 30 minutes
  initialData, // Accept initialData as a parameter
}: QueryParams<TQueryFnData, TError>): UseQueryResult<TQueryFnData, TError> {
  return useQuery<TQueryFnData, TError>({
    queryKey,
    queryFn,
    staleTime,
    initialData,
  });
}
