import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Distribution } from '@/types';

export interface DistributionParams {
  page?: number;
  limit?: number;
  sort?: string;
  filter?: {
    cname?: string;
    status?: string;
    created_at_from?: string;
    created_at_to?: string;
  };
}

export const useDistributions = (params: DistributionParams) => {
  const queryParams = new URLSearchParams();

  if (params.page) queryParams.append('page', String(params.page));
  if (params.limit) queryParams.append('limit', String(params.limit));
  if (params.sort) queryParams.append('sort', params.sort);
  if (params.filter?.cname)
    queryParams.append('filter[cname][like]', params.filter.cname);
  if (params.filter?.status)
    queryParams.append('filter[status][eq]', params.filter.status);
  if (params.filter?.created_at_from && params.filter?.created_at_to)
    queryParams.append(
      'filter[created_at][between]',
      `${params.filter.created_at_from},${params.filter.created_at_to}`
    );

  return useQuery({
    queryKey: ['distributions', params],
    queryFn: async () => {
      const res = await api.get<{ data: Distribution[] }>(
        `/v1/distributions?${queryParams.toString()}`
      );
      return res.data.data;
    },
  });
};
