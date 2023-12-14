import {Component, OnInit} from '@angular/core';
import {TeamsListInterface} from "../../../core/interfaces/team-interface";
import {FormControl} from "@angular/forms";
import {TeamsService} from "../../../core/services/teams.service";
import {Router} from "@angular/router";
import {FileService} from "../../../core/services/image/file.service";

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss']
})
export class TeamsListComponent implements OnInit{
  teamsList: TeamsListInterface;
  pageSizeControl: FormControl = new FormControl<number>(this.teamsService.teamsFilter.pageSize);
  searchNameControl: FormControl = new FormControl<string>('')
  constructor(public teamsService: TeamsService,
              private router: Router,
              public fileService: FileService) {

  }

  ngOnInit() {
    this.getTeams();
    this.pageSizeControl.valueChanges.subscribe(pageSize => {
      this.teamsService.setPageSize(pageSize)
    })
  }

  getTeams(): void {
    this.teamsService.teams$.subscribe(x => {
      this.teamsList = x;
    })
  }

  navigateToInfoCard(id: number | string | null | undefined): void {
    this.router.navigate(['teams/' + id])
  }

  onPageChange(page: number): void {
    if (this.teamsService.teamsFilter.page !== page)
      this.teamsService.setPage(page);
  }
  onPageSizeChange(pageSize: number): void {
    if (this.teamsService.teamsFilter.pageSize !== pageSize)
      this.teamsService.setPageSize(pageSize);
  }

  onEnterClicked(): void {
    this.teamsService.teamsFilter.name = this.searchNameControl.value;
    this.teamsService.refreshTeamsList();
  }

  protected readonly Math = Math;
}
