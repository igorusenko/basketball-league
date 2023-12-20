import {Component, Input, OnInit} from '@angular/core';
import {TeamDto} from "../../../core/interfaces/teams/team-interface";
import {FileService} from "../../../core/services/image/file.service";
import {PlayerDto} from "../../../core/interfaces/players/players-interface";
import {TeamsService} from "../../../core/services/teams/teams.service";
import {Observable} from "rxjs";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ])
    ])
  ]
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
