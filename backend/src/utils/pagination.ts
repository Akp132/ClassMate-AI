import { PaginationParams, PaginationInfo } from '@/types';

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 20;
export const MAX_LIMIT = 100;

export const parsePaginationParams = (query: any): Required<PaginationParams> => {
  const page = Math.max(1, parseInt(query.page) || DEFAULT_PAGE);
  const limit = Math.min(MAX_LIMIT, Math.max(1, parseInt(query.limit) || DEFAULT_LIMIT));
  const sort = query.sort || 'createdAt';
  const order = query.order === 'desc' ? 'desc' : 'asc' as const;

  return { page, limit, sort, order };
};

export const calculatePaginationInfo = (
  page: number,
  limit: number,
  total: number
): PaginationInfo => {
  const pages = Math.ceil(total / limit);
  
  return {
    page,
    limit,
    total,
    pages,
  };
};

export const calculateSkip = (page: number, limit: number): number => {
  return (page - 1) * limit;
};