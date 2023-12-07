import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MiltiselectService {
  private activeDropdowns: Array<string> = [];
  constructor() { }

  toggleSelect(name?: string): void  {
    if (!name) {
      this.activeDropdowns = [];
      return
    }
    if (!this.activeDropdowns.some((x: string) => x === name)) {
      this.activeDropdowns = []
      this.activeDropdowns.push(name)
    }
    else if (this.activeDropdowns.length > 0) this.activeDropdowns.splice(this.activeDropdowns.findIndex(x => x == name), 1);
  }

  getDropdownState(name: string): boolean {
    return this.activeDropdowns.some(x => x === name)
  }
}
