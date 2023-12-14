import {IPaginatorTemplate} from "../paginator-item.intarface";
import {GetTeamsInterface, TeamDto, TeamsListInterface} from "../team-interface";

export class PlayersListInterface extends IPaginatorTemplate{
  data: Array<PlayerDto>
}

export class PlayerDto {
  id?: number | null | undefined;
  name: string | null | undefined;
  number: number | null | undefined;
  position: string | null | undefined;
  team: number | null | undefined;
  birthday: string | null | undefined;
  height: number | null | undefined;
  weight: number | null | undefined;
  avatarUrl: string | null | undefined;
}

export class GetPlayersRequest extends GetTeamsInterface{
  teamIds: Array<number>;
}

export class ICreatePlayer extends PlayerDto {

}

export class IUpdatePlayer extends ICreatePlayer {

}
