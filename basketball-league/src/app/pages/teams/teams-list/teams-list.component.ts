import {Component, OnInit} from '@angular/core';
import {TeamsListInterface} from "../../../core/interfaces/teams/team-interface";
import {FormControl} from "@angular/forms";
import {TeamsService} from "../../../core/services/teams/teams.service";
import {Router} from "@angular/router";
import {FileService} from "../../../core/services/image/file.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class TeamsListComponent implements OnInit{
  teamsList: TeamsListInterface;
  pageSizeControl: FormControl = new FormControl<number>(this.teamsService.teamsFilter.pageSize);
  searchNameControl: FormControl = new FormControl<string>('');
  isViewList: boolean = false;
  constructor(public teamsService: TeamsService,
              private router: Router
  ) {

  }

  ngOnInit() {
    this.teamsService.teamsFilter.name = '';
    this.teamsService.setPage(1);
    this.teamsService.setPageSize(6);
    this.getTeams();
    this.onPageSizeChange();
  }

  getTeams(): void {
    this.isViewList = false;
    this.teamsService.teamsFilter.pageSize = 6;
    this.teamsService.teams$.subscribe(x => {
      this.teamsList = x;
      this.isViewList = true;
    })
  }

  navigateToInfoCard(id: number | string | null | undefined): void {
    this.router.navigate(['teams/' + id])
  }

  onPageChange(page: number): void {
    if (this.teamsService.teamsFilter.page !== page) {
      this.isViewList = false;
      this.teamsService.setPage(page);
    }
  }
  onPageSizeChange(): void {
    this.pageSizeControl.valueChanges.subscribe(pageSize => {
      this.isViewList = false;
      this.teamsService.teamsFilter.pageSize = pageSize;
      this.teamsService.setPage(1);
    })
  }

  onEnterClicked(): void {
    this.teamsService.teamsFilter.name = this.searchNameControl.value;
    this.isViewList = false;
    this.teamsService.refreshTeamsList();
  }

  protected readonly Math = Math;
}
