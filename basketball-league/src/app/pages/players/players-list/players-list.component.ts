import {Component, OnInit} from '@angular/core';
import {TeamsListInterface} from "../../../core/interfaces/team-interface";
import {FormControl} from "@angular/forms";
import {TeamsService} from "../../../core/services/teams.service";
import {Router} from "@angular/router";
import {FileService} from "../../../core/services/image/file.service";
import {PlayersService} from "../../../core/services/players.service";
import {PlayersListInterface} from "../../../core/interfaces/players/players-interface";

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit{
  playersList: PlayersListInterface;
  pageSizeControl: FormControl = new FormControl<number>(this.playersService.playersFilter.pageSize);
  searchNameControl: FormControl = new FormControl<string>('')
  constructor(public teamsService: TeamsService,
              private router: Router,
              public playersService: PlayersService
              ) {

  }

  ngOnInit() {
    this.getPlayers();
    this.pageSizeControl.valueChanges.subscribe(pageSize => {
      this.playersService.setPageSize(pageSize)
    })
  }

  getPlayers(): void {
    this.playersService.players$.subscribe(x => {
      this.playersList = x;
    })
  }

  navigateToInfoCard(id: number | string | null | undefined): void {
    this.router.navigate(['players/' + id])
  }

  onPageChange(page: number): void {
    if (this.playersService.playersFilter.page !== page)
      this.playersService.setPage(page);
  }
  onPageSizeChange(pageSize: number): void {
    if (this.playersService.playersFilter.pageSize !== pageSize)
      this.playersService.setPageSize(pageSize);
  }

  onEnterClicked(): void {
    this.playersService.playersFilter.name = this.searchNameControl.value;
    this.playersService.refreshPlayersList();
  }

  protected readonly Math = Math;
}
