import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  isMobileNavBarOpened: boolean = false;
  constructor() { }

}
