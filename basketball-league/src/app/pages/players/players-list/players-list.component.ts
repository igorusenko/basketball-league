import {Component, OnInit} from '@angular/core';
import {TeamDto, TeamsListInterface} from "../../../core/interfaces/teams/team-interface";
import {FormControl} from "@angular/forms";
import {TeamsService} from "../../../core/services/teams/teams.service";
import {Router} from "@angular/router";
import {FileService} from "../../../core/services/image/file.service";
import {PlayersService} from "../../../core/services/players/players.service";
import {PlayerDto, PlayersListInterface} from "../../../core/interfaces/players/players-interface";
import {SelectItemInterface} from "../../../core/interfaces/select/select-item.interface";
import {animate, style, transition, trigger} from "@angular/animations";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class PlayersListComponent implements OnInit{
  playersList: PlayersListInterface;
  pageSizeControl: FormControl = new FormControl<number>(this.playersService.playersFilter.pageSize);
  searchNameControl: FormControl = new FormControl<string>('');
  teams: Array<TeamDto>;
  teamsControl: FormControl<Array<number> | null> = new FormControl([]);
  isViewList: boolean = false;
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
    // this.getPlayersAndTeams();
    this.onPageSizeControlChange();
    this.onTeamsControlChange();
  }

  getPlayersAndTeams(): void {
    this.isViewList = false;
    forkJoin([this.playersService.players$, this.teamsService.teams$])
        .subscribe((data: [PlayersListInterface, TeamsListInterface]) => {
          this.playersList = data[0];
          this.teams = data[1].data;
          this.isViewList = true;
        })
  }

  getPlayers(): void {
    this.playersService.players$.subscribe(x => {
      this.playersList = x;
      this.isViewList = true;
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
      this.isViewList = false;
      this.playersService.setPageSize(pageSize)
    })
  }

  onTeamsControlChange(): void {
    this.teamsControl.valueChanges.subscribe(teams => {
      this.isViewList = false;
      this.playersService.playersFilter.teamIds = teams;
      this.playersService.refreshPlayersList();
    })
  }

  onPageChange(page: number): void {
    if (this.playersService.playersFilter.page !== page) {
      this.isViewList = false;
      this.playersService.setPage(page);
    }
  }
  onEnterClicked(): void {
    this.playersService.playersFilter.name = this.searchNameControl.value;
    this.isViewList = false;
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
