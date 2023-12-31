import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Injectable} from "@angular/core";
import {TeamsService} from "../../core/services/teams/teams.service";
import {GetTeamsInterface, TeamsListInterface} from "../../core/interfaces/teams/team-interface";
import {PlayersService} from "../../core/services/players/players.service";

@Injectable()
export class TeamListResolver implements Resolve<Promise<TeamsListInterface>> {
  constructor(private teamsService: TeamsService, private playersService: PlayersService) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<TeamsListInterface> {
    this.playersService.playersFilter.teamIds = [];
    this.teamsService.teamsFilter.name = '';
    if (route.data['breadcrumb'] === 'Add new Player' || route.data['breadcrumb'] === 'Edit' || route.data['breadcrumb'] === 'players-list')
      this.teamsService.teamsFilter.pageSize = 20;
    else
      this.teamsService.teamsFilter.pageSize = 6;
    return this.teamsService.getTeams(this.teamsService.teamsFilter);
  }
}
