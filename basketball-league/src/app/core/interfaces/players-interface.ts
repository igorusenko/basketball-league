import {IPaginatorTemplate} from "./paginator-item.intarface";
import {GetTeamsInterface, TeamsListInterface} from "./team-interface";

export class PlayersListInterface extends IPaginatorTemplate{
  data: Array<PlayerDto>
}

export class PlayerDto {
  id: number;
  name: string;
  number: number;
  position: string;
  team: number;
  birthday: string;
  height: number;
  weight: number;
  avatarUrl: string;
}

export class GetPlayersRequest extends GetTeamsInterface{
  teamIds: Array<number>;
}
