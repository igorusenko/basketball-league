import {Component, Input, OnInit} from '@angular/core';
import {TeamDto} from "../../../core/interfaces/team-interface";
import {FileService} from "../../../core/services/image/file.service";
import {PlayerDto} from "../../../core/interfaces/players/players-interface";
import {TeamsService} from "../../../core/services/teams.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit{

  @Input() playerInfo: PlayerDto;
  teamInfo: TeamDto;
  constructor(public fileService: FileService,
              private teamService: TeamsService) {
  }

  ngOnInit() {
    this.getTeamById();
  }

  getTeamById(): void {
    this.teamService.getTeamById(this.playerInfo.team!).then(team => {
      this.teamInfo = team;
    })
  }

}
