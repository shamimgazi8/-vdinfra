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

function formatDateToYYYYMMDD(dateStr?: string): string | undefined {
  if (!dateStr) return undefined;
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return undefined; // invalid date
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
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

    if (Array.isArray(filter.status)) {
      filter.status.forEach((statusVal) => {
        query.push(`filter[status][eq]=${encodeURIComponent(statusVal)}`);
      });
    } else if (filter.status) {
      query.push(`filter[status][eq]=${encodeURIComponent(filter.status)}`);
    }

    if (Array.isArray(filter.priority)) {
      filter.priority.forEach((priorityVal) => {
        query.push(`filter[priority][eq]=${encodeURIComponent(priorityVal)}`);
      });
    } else if (filter.priority) {
      query.push(`filter[priority][eq]=${encodeURIComponent(filter.priority)}`);
    }

    // Format the dates here to YYYY-MM-DD only
    const fromDate = formatDateToYYYYMMDD(filter.created_at_from);
    const toDate = formatDateToYYYYMMDD(filter.created_at_to);

    if (fromDate && toDate)
      query.push(
        `filter[created_at][between]=${encodeURIComponent(`${fromDate},${toDate}`)}`
      );
  }

  return query.join('&');
};

export const useDistributions = (params: DistributionParams) => {
  const queryString = buildQueryString(params);

  return useQuery({
    queryKey: ['distributions', params],
    queryFn: async () => {
      try{
            const res = await api.get<{
        data: Distribution[];
        meta: { total: number; totalPages: number };
      }>(`/v1/distributions?${queryString}`);

      return res.data.data;
      }catch(err){
        console.warn(err,'400 Bad Request - possibly invalid filters or input');
      }
    },
  });
};
