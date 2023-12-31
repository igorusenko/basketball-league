import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Injectable} from "@angular/core";
import {TeamDto} from "../../../core/interfaces/teams/team-interface";
import {TeamsService} from "../../../core/services/teams/teams.service";
import {PlayersService} from "../../../core/services/players/players.service";

@Injectable()
export class TeamsInfoResolver implements Resolve<Promise<TeamDto>> {
  constructor(private teamsService: TeamsService,
              private playersService: PlayersService) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<TeamDto> {
    if (!Number.isNaN(route.paramMap.get('id')))
    this.playersService.playersFilter.teamIds = [Number(route.paramMap.get('id'))];
    if (route.paramMap.get('id')?.toString() !== 'new')
    return this.teamsService.getTeamById(Number(route.paramMap.get('id')));
    else return  new Promise((resolve, reject) => {
      resolve(new TeamDto())
    });
  }
}
