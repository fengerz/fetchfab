export interface IMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
  links: ILink[];
}

interface ILink {
  active: boolean;
  label: string;
  url: null | string;
}
