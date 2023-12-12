export class TeamsListInterface {
  data: Array<TeamDto>;
  count: number;
  page: number;
  size: number;
}

export interface TeamDto {
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: string;
  id: number;
}

export interface GetTeamsInterface {
  name: string,
  page: number,
  pageSize: number
}
