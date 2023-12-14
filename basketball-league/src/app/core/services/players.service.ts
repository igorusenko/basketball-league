import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {
  GetPlayersRequest,
  ICreatePlayer, IUpdatePlayer,
  PlayerDto,
  PlayersListInterface
} from "../interfaces/players/players-interface";
import {environment} from "../../../environments/environment";
import {ICreateTeam, IUpdateTeam, TeamDto} from "../interfaces/team-interface";
import {PositionsDto} from "../interfaces/postitions/positions-interface";

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private players: BehaviorSubject<PlayersListInterface> = new BehaviorSubject<PlayersListInterface>(new PlayersListInterface());
  public players$: Observable<PlayersListInterface> = this.players.asObservable();

  private player: BehaviorSubject<PlayerDto> = new BehaviorSubject<PlayerDto>(new PlayerDto());
  public player$: Observable<PlayerDto> = this.player.asObservable();

  playersFilter: GetPlayersRequest = {
    name: '',
    page: 1,
    pageSize: 6,
    teamIds: []
  };
  constructor(private http: HttpClient) { }

  getTeamPlayersHandler(model: GetPlayersRequest): Observable<PlayersListInterface> {
    let url: string = environment.apiUrl + '/Player/GetPlayers';
    const params = new HttpParams({
      fromObject: {
        name: model.name,
        page: model.page,
        pageSize: model.pageSize,
        teamIds: model.teamIds
      }
    });
    return this.http.get<PlayersListInterface>(url, {params})
  }

  getTeamPlayers(model: GetPlayersRequest): Promise<PlayersListInterface> {
    return new Promise((resolve, reject) => {
      this.getTeamPlayersHandler(model).subscribe({
        next: (x) => {
          this.players.next(x);
          resolve(x);
        }
      })
    })
  }

  getPlayerById(id: number): Promise<PlayerDto> {
    return new Promise((resolve, reject) => {
      let url: string = environment.apiUrl + '/Player/Get';
      const params = new HttpParams()
        .set('id', id)
      this.http.get<PlayerDto>(url, {params}).subscribe({
        next: player => {
          this.player.next(player);
          resolve(player);
        }
      })
    })
  }

  getPositions(): Observable<Array<string>> {
    let url: string = environment.apiUrl + '/Player/GetPositions';
    return this.http.get<Array<string>>(url);
  }

  setPage(page: number): void {
    this.playersFilter.page = page;
    this.refreshPlayersList();
  }

  setPageSize(pageSize: number): void {
    this.playersFilter.pageSize = pageSize;
    this.refreshPlayersList();
  }

  refreshPlayersList(): void {
    this.getTeamPlayers(this.playersFilter);
  }

  createPlayer(model: ICreatePlayer): Observable<PlayerDto> {
    let url: string = environment.apiUrl + '/Player/Add';
    return this.http.post<PlayerDto>(url, model);
  }

  updatePlayer(model: IUpdatePlayer): Observable<PlayerDto> {
    let url: string = environment.apiUrl + '/Player/Update';
    return this.http.put<PlayerDto>(url, model);
  }

  deletePlayer(id: number): Observable<TeamDto> {
    let url: string = environment.apiUrl + '/Player/Delete?Id=' + id;
    return this.http.delete<TeamDto>(url);
  }

}
