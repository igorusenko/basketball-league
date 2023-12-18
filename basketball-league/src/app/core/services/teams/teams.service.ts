import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {GetTeamsInterface, ICreateTeam, IUpdateTeam, TeamDto, TeamsListInterface} from "../../interfaces/teams/team-interface";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  teamsFilter: GetTeamsInterface = {
    name: '',
    page: 1,
    pageSize: 6
  };
  private teams: BehaviorSubject<TeamsListInterface> = new BehaviorSubject<TeamsListInterface>(new TeamsListInterface());
  public teams$: Observable<TeamsListInterface> = this.teams.asObservable();

  private team: BehaviorSubject<TeamDto> = new BehaviorSubject<TeamDto>(new TeamDto());
  public team$: Observable<TeamDto> = this.team.asObservable();
  constructor(private http: HttpClient) { }

  getTeamsHandler(model: GetTeamsInterface): Observable<TeamsListInterface> {
    let url: string = environment.apiUrl + '/Team/GetTeams';
    const params = new HttpParams()
      .set('name', model.name)
      .set('page', model.page)
      .set('pageSize', model.pageSize);
    return this.http.get<TeamsListInterface>(url, {params})
  }

  getTeams(model: GetTeamsInterface): Promise<TeamsListInterface> {
    return new Promise((resolve, reject) => {
      this.getTeamsHandler(model).subscribe({
        next: (x) => {
          this.teams.next(x);
          resolve(x);
        }
      })
    })
  }

  getTeamById(id: number | string): Promise<TeamDto> {
    return new Promise((resolve, reject) => {
      let url: string = environment.apiUrl + '/Team/Get';
      const params = new HttpParams()
        .set('id', id)
      this.http.get<TeamDto>(url, {params}).subscribe({
        next: team => {
          this.team.next(team);
          resolve(team);
        }
      })
    })
  }

  refreshTeamsList(): void {
    this.getTeams(this.teamsFilter);
  }

  createTeam(model: ICreateTeam): Observable<TeamDto> {
    let url: string = environment.apiUrl + '/Team/Add';
    return this.http.post<TeamDto>(url, model)
  }

  updateTeam(model: IUpdateTeam): Observable<TeamDto> {
    let url: string = environment.apiUrl + '/Team/Update';
    return this.http.put<TeamDto>(url, model)
  }

  deleteTeam(id: number): Observable<TeamDto> {
    let url: string = environment.apiUrl + '/Team/Delete?Id=' + id;
    return this.http.delete<TeamDto>(url)
  }

  setPage(page: number): void {
    this.teamsFilter.page = page;
    this.refreshTeamsList();
  }

  setPageSize(pageSize: number): void {
    this.teamsFilter.pageSize = pageSize;
    this.refreshTeamsList();
  }

}
