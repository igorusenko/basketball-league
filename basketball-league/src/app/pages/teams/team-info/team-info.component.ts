import {Component, OnInit} from '@angular/core';
import {TeamsService} from "../../../core/services/teams.service";
import {TeamDto} from "../../../core/interfaces/team-interface";
import {PlayersService} from "../../../core/services/players.service";
import {PlayerDto} from "../../../core/interfaces/players-interface";

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss']
})
export class TeamInfoComponent implements OnInit {
  team: TeamDto;
  players: Array<PlayerDto>;
  constructor(private teamsService: TeamsService,
              private playersService: PlayersService) {

  }

  ngOnInit() {
    this.getTeamById();
    this.getPlayers();
  }

  getTeamById(): void {
    this.teamsService.team$.subscribe(team => {
      this.team = team;
    })
  }

  getPlayers(): void {
    this.playersService.players$.subscribe(players => {
      this.players = players.data;
    })
  }

}
