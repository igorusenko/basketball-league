import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {GetPlayersRequest, PlayersListInterface} from "../interfaces/players-interface";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private players: BehaviorSubject<PlayersListInterface> = new BehaviorSubject<PlayersListInterface>(new PlayersListInterface());
  public players$: Observable<PlayersListInterface> = this.players.asObservable();

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
}
