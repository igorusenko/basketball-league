import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Injectable} from "@angular/core";
import {TeamsService} from "../../core/services/teams.service";
import {GetTeamsInterface, TeamsListInterface} from "../../core/interfaces/team-interface";

@Injectable()
export class TeamListResolver implements Resolve<Promise<TeamsListInterface>> {
  constructor(private teamsService: TeamsService) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<TeamsListInterface> {
    return this.teamsService.getTeams(this.teamsService.teamsFilter);
  }
}
