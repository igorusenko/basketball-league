import {IPaginatorTemplate} from "./paginator-item.intarface";

export class TeamsListInterface extends IPaginatorTemplate {
  data: Array<TeamDto>;
}

export class TeamDto {
  name: string | null | undefined;
  foundationYear: number | null | undefined;
  division: string | null | undefined;
  conference: string | null | undefined;
  imageUrl: string | null | undefined;
  id?: number | null | undefined;
}

export class ICreateTeam extends TeamDto {

}

export class IUpdateTeam extends ICreateTeam {

}

export class GetTeamsInterface {
  name: string;
  page: number;
  pageSize: number;
}
