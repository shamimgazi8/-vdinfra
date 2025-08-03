import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Distribution } from '@/types';

export interface DistributionParams {
  page?: number;
  limit?: number;
  sort?: string;
  filter?: {
    cname?: string;
    status?: string | string[];
    priority?: string | string[];
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

    // Multiple status filters support
    if (Array.isArray(filter.status)) {
      filter.status.forEach((statusVal) => {
        query.push(`filter[status][eq]=${encodeURIComponent(statusVal)}`);
      });
    } else if (filter.status) {
      query.push(`filter[status][eq]=${encodeURIComponent(filter.status)}`);
    }

    // Multiple priority filters support
    if (Array.isArray(filter.priority)) {
      filter.priority.forEach((priorityVal) => {
        query.push(`filter[priority][eq]=${encodeURIComponent(priorityVal)}`);
      });
    } else if (filter.priority) {
      query.push(`filter[priority][eq]=${encodeURIComponent(filter.priority)}`);
    }

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
