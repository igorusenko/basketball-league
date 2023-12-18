import {IPaginatorTemplate} from "../paginator/paginator-item.intarface";
import {GetTeamsInterface, TeamDto, TeamsListInterface} from "../teams/team-interface";

export class PlayersListInterface extends IPaginatorTemplate{
  data: Array<PlayerDto>
}

export class PlayerDto {
  id?: number | null | undefined;
  name: string | null | undefined;
  number: number | null | undefined;
  position: string | number | null | undefined;
  team: number | string | null | undefined;
  birthday: Date | null | undefined;
  height: number | null | undefined;
  weight: number | null | undefined;
  avatarUrl: string | null | undefined;
}

export class GetPlayersRequest extends GetTeamsInterface{
  teamIds: Array<number> | null;
}

export class ICreatePlayer extends PlayerDto {

}

export class IUpdatePlayer extends ICreatePlayer {

}
