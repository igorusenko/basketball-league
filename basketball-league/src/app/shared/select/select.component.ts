import {Component, HostListener, Input} from '@angular/core';
import {SelectItemInterface} from "../../core/interfaces/select-item.interface";
import {SelectService} from "./select.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(300)),
    ]),
  ]
})
export class SelectComponent {
  @Input() multiple: boolean = false;
  @Input() selectName: string = 'test';
  @Input() options: Array<SelectItemInterface> = [
    {name: 'Test', id: 0, choosen: true},
    {name: 'Test1', id: 1},
    {name: 'Test2', id: 2},
    {name: 'Test3', id: 3},
    {name: 'Test4', id: 4},
  ];
  @Input() choosenItems: Array<SelectItemInterface> = [];

  constructor(public selectService: SelectService) {

  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    if (!this.isClickInsideDiv(event)) {
      this.selectService.toggleSelect();
    }
  }

  private isClickInsideDiv(event: Event): boolean {
    const element = event.target as HTMLElement;
    return !!element.closest('div.select-block');
  }

  getDropdownState(): boolean {
    return this.selectService.getDropdownState(this.selectName);
  }

  selectOption(item: SelectItemInterface): void {
    this.unCheckAllOptions();
    if (!this.choosenItems.some(choosenItem => choosenItem.id === item.id)) {
      item.choosen = true;
      this.choosenItems.push(item);
    } else this.choosenItems.splice(this.choosenItems.findIndex(x => x.id === item.id), 1)
  }

  getChoosenOptions(): Array<SelectItemInterface> {
    return this.choosenItems.filter(x => x.choosen);
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
