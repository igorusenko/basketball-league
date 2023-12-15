import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {PlayerDto} from "../../../core/interfaces/players/players-interface";
import {TeamsService} from "../../../core/services/teams.service";
import {PlayersService} from "../../../core/services/players.service";
import {TeamDto} from "../../../core/interfaces/team-interface";

@Injectable()

export class PlayersInfoResolver implements Resolve<Promise<PlayerDto>> {
  constructor(private playersService: PlayersService) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<PlayerDto> {
    if (route.paramMap.get('id')?.toString() !== 'new')
      return this.playersService.getPlayerById(Number(route.paramMap.get('id')));
    else return  new Promise((resolve, reject) => {
      resolve(new PlayerDto())
    });
  }

}
