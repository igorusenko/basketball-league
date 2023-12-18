import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Injectable} from "@angular/core";
import {PlayersListInterface} from "../../core/interfaces/players/players-interface";
import {PlayersService} from "../../core/services/players/players.service";
import {TeamDto} from "../../core/interfaces/teams/team-interface";

@Injectable()
export class PlayersListResolver implements Resolve<Promise<PlayersListInterface>> {
  constructor(private playersService: PlayersService) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<PlayersListInterface> {
    return this.playersService.getTeamPlayers(this.playersService.playersFilter);
  }
}
