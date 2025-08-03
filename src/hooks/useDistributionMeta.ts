import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { DistributionParams } from '@/hooks/useDistributions';

interface PaginationMeta {
  totalPages: number;
  total: number;
  currentPage: number;
}

export const useDistributionMeta = (params: DistributionParams) => {
  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, val]) => {
      if (val !== undefined && val !== null) acc[key] = String(val);
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  return useQuery<PaginationMeta, Error>({
    queryKey: ['distribution-meta', params],
    queryFn: async () => {
      const res = await api.get(`/v1/distributions?${queryString}`);
      const meta = res.data.meta?.pagination;
      return {
        totalPages: meta?.total_pages ?? 1,
        total: meta?.total ?? 0,
        currentPage: meta?.page ?? 1,
      };
    },
  });
};
