import {Component, OnInit} from '@angular/core';
import {TeamDto, TeamsListInterface} from "../../../core/interfaces/teams/team-interface";
import {FormControl} from "@angular/forms";
import {TeamsService} from "../../../core/services/teams/teams.service";
import {Router} from "@angular/router";
import {FileService} from "../../../core/services/image/file.service";
import {PlayersService} from "../../../core/services/players/players.service";
import {PlayersListInterface} from "../../../core/interfaces/players/players-interface";
import {SelectItemInterface} from "../../../core/interfaces/select/select-item.interface";

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit{
  playersList: PlayersListInterface;
  pageSizeControl: FormControl = new FormControl<number>(this.playersService.playersFilter.pageSize);
  searchNameControl: FormControl = new FormControl<string>('');
  teams: Array<TeamDto>;
  teamsControl: FormControl<Array<number> | null> = new FormControl([]);
  constructor(public teamsService: TeamsService,
              private router: Router,
              public playersService: PlayersService
              ) {
  }

  ngOnInit() {
    this.playersService.playersFilter.name = '';
    this.playersService.setPage(1);
    this.playersService.setPageSize(6);
    this.getPlayers();
    this.getTeams();
    this.onPageSizeControlChange();
    this.onTeamsControlChange();
  }

  getPlayers(): void {
    this.playersService.players$.subscribe(x => {
      this.playersList = x;
    })
  }

  getTeams(): void {
    this.teamsService.teams$.subscribe(teams => {
      this.teams = teams.data;
    })
  }

  navigateToInfoCard(id: number | string | null | undefined): void {
    this.router.navigate(['players/' + id])
  }

  onPageSizeControlChange(): void {
    this.pageSizeControl.valueChanges.subscribe(pageSize => {
      this.playersService.setPageSize(pageSize)
    })
  }

  onTeamsControlChange(): void {
    this.teamsControl.valueChanges.subscribe(teams => {
      this.playersService.playersFilter.teamIds = teams;
      this.playersService.refreshPlayersList();
    })
  }

  onPageChange(page: number): void {
    if (this.playersService.playersFilter.page !== page)
      this.playersService.setPage(page);
  }
  onEnterClicked(): void {
    this.playersService.playersFilter.name = this.searchNameControl.value;
    this.playersService.refreshPlayersList();
  }

  getMappedTeams(): Array<SelectItemInterface> {
    return this.teams.map(team => <SelectItemInterface>{
      name: team.name,
      id: team.id
    })
  }

  protected readonly Math = Math;
}
