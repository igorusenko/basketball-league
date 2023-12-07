import {Component, HostListener, Input} from '@angular/core';
import {SelectItemInterface} from "../../core/interfaces/select-item.interface";
import {SelectService} from "../select/select.service";
import {MiltiselectService} from "./miltiselect.service";

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent {
  @Input() multiple: boolean = false;
  @Input() selectName: string = 'aboba';
  @Input() options: Array<SelectItemInterface> = [
    {name: 'Test', id: 0, choosen: true},
    {name: 'Test1', id: 1},
    {name: 'Test2', id: 2},
    {name: 'Test3', id: 3},
    {name: 'Test4', id: 4},
  ];
  @Input() choosenItems: Array<SelectItemInterface> = [];

  constructor(public selectService: MiltiselectService) {

  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    if (!this.isClickInsideDiv(event)) {
      this.selectService.toggleSelect();
    }
  }

  private isClickInsideDiv(event: Event): boolean {
    const element = event.target as HTMLElement;
    return !!element.closest('div.select-container');
  }

  getDropdownState(): boolean {
    return this.selectService.getDropdownState(this.selectName);
  }

  selectOption(item: SelectItemInterface): void {
    if (!this.choosenItems.some(choosenItem => choosenItem.id === item.id)) {
      item.choosen = true;
      this.choosenItems.push(item);
    }
    else this.choosenItems.splice(this.choosenItems.findIndex(x => x.id === item.id), 1)
  }

  getChoosenOptions(): Array<SelectItemInterface> {
    return this.choosenItems.filter(x => x.choosen).slice(0,3);
  }

  unCheckAllOptions(): void {
    this.choosenItems = [];
  }

  deleteChoosenOption(id: number): void {
    this.choosenItems.splice(this.choosenItems.findIndex(option => option.id === id), 1);
  }

  isActiveOption(item: SelectItemInterface): boolean {
    return this.choosenItems.some(option => option.id === item.id && option.choosen)
  }
}
