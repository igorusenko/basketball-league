import {Component, OnInit} from '@angular/core';
import {TeamsService} from "../../core/services/teams.service";
import {GetTeamsInterface, TeamDto, TeamsListInterface} from "../../core/interfaces/team-interface";
import {Router} from "@angular/router";
import {FileService} from "../../core/services/image/file.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit{
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
    console.log(Math.ceil(8 / 6))
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
