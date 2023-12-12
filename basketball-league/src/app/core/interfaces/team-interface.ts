import {IPaginatorTemplate} from "./paginator-item.intarface";

export class TeamsListInterface extends IPaginatorTemplate{
  data: Array<TeamDto>;
}

export class TeamDto {
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: string;
  id: number;
}

export class GetTeamsInterface {
  name: string;
  page: number;
  pageSize: number;
}
