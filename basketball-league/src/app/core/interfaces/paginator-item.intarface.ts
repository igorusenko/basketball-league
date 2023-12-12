export interface PaginatorItemInterface {
  name: number;
  isActive?: boolean;
}

export class IPaginatorTemplate {
  count: number;
  page: number;
  size: number;
}
