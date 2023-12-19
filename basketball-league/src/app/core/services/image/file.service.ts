import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  saveImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file)
    let url: string = environment.apiUrl + '/Image/SaveImage'
    return this.http.post<string>(url, formData);
  }

  deleteImage(fileName: string): Observable<string> {
    let url: string = environment.apiUrl + '/Image/SaveImage'
    return this.http.post<string>(url, fileName);
  }

  getImage(url: string): string {
   return url.includes('data:image') ? url : environment.downloadImageUrl + url;
  }
}
