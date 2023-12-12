import {Component, OnInit} from '@angular/core';
import {TeamsService} from "../../core/services/teams.service";
import {GetTeamsInterface, TeamDto, TeamsListInterface} from "../../core/interfaces/team-interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit{
  teamsList: TeamsListInterface;
  constructor(public teamsService: TeamsService,
              private router: Router) {

  }

  ngOnInit() {
    this.getTeams();
  }

  getTeams(): void {
    this.teamsService.teams$.subscribe(x => {
      this.teamsList = x;
    })
  }

  navigateToInfoCard(id: number | string): void {
    this.router.navigate(['teams/' + id])
  }

  protected readonly Math = Math;
}
