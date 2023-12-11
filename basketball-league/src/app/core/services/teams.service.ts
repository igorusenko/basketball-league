import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {TeamsListInterface} from "../interfaces/team-interface";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http: HttpClient) { }

  // getTeams(model: Re): Observable<TeamsListInterface> {
  //   let url: string = environment.apiUrl + '/api/Team/GetTeams';
  //   const params = new HttpParams()
  //     .set('name', model.name)
  //     .set('page', model.page)
  //     .set('pageSize', model.pageSize);
  //   return this.http.get<TeamsListInterface>(url)
  // }
}
