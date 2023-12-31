import {Component, OnInit} from '@angular/core';
import {TeamsService} from "../../../core/services/teams/teams.service";
import {TeamDto} from "../../../core/interfaces/teams/team-interface";
import {PlayersService} from "../../../core/services/players/players.service";
import {PlayerDto} from "../../../core/interfaces/players/players-interface";
import {ActivatedRoute, Router} from "@angular/router";
import {FileService} from "../../../core/services/image/file.service";
import {NotificationService} from "../../../core/services/notification/notification.service";

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss']
})
export class TeamInfoComponent implements OnInit {
  team: TeamDto;
  players: Array<PlayerDto>;
  teamId: number;
  hoveredEdit: boolean = false;
  hoveredDelete: boolean = false;
  currentDate: Date = new Date();
  constructor(private teamsService: TeamsService,
              private playersService: PlayersService,
              private router: Router,
              public fileService: FileService,
              private notify: NotificationService) {

  }

  ngOnInit() {
    this.getTeamById();
    this.getPlayers();
  }

  getTeamById(): void {
    this.teamsService.team$.subscribe(team => {
      this.team = team;
      this.teamId = team.id!;
    })
  }

  getPlayers(): void {
    this.playersService.players$.subscribe(players => {
      this.players = players.data;
    })
  }

  deleteTeam(): void {
    this.teamsService.deleteTeam(this.teamId).subscribe({
      complete: () => {
        this.router.navigate(['/teams']);
        this.teamsService.refreshTeamsList();
      },
      error: error => {
        this.notify.showError(error.error)
      }
    })
  }

  getDate(date: Date | string): Date {
    return new Date(date)
  }

}
