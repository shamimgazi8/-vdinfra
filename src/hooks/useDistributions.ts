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
    priority?: string;
    created_at_from?: string;
    created_at_to?: string;
  };
}

const buildQueryString = (params: DistributionParams): string => {
  const query: string[] = [];

  if (params.page) query.push(`page=${params.page}`);
  if (params.limit) query.push(`limit=${params.limit}`);
  if (params.sort) query.push(`sort=${params.sort}`);

  const { filter } = params;
  if (filter) {
    if (filter.cname)
      query.push(`filter[cname][like]=${encodeURIComponent(filter.cname)}`);
    if (filter.status)
      query.push(`filter[status][eq]=${encodeURIComponent(filter.status)}`);
    if (filter.created_at_from && filter.created_at_to)
      query.push(
        `filter[created_at][between]=${encodeURIComponent(
          `${filter.created_at_from},${filter.created_at_to}`
        )}`
      );
  }

  return query.join('&');
};

export const useDistributions = (params: DistributionParams) => {
  const queryString = buildQueryString(params);

  return useQuery({
    queryKey: ['distributions', params],
    queryFn: async () => {
      const res = await api.get<{ data: Distribution[] }>(
        `/v1/distributions?${queryString}`
      );
      return res.data.data;
    },
  });
};
