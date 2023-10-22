export interface PaginationResult<T> {
  current_page: number;
  data: T[];
  last_page:number;
  total:number;
}
