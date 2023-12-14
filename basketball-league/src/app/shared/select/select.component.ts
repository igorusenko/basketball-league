import {Component, HostListener, Input} from '@angular/core';
import {SelectItemInterface} from "../../core/interfaces/select-item.interface";
import {SelectService} from "./select.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FormControl} from "@angular/forms";

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
  @Input() selectName: string;
  @Input() placeholder: string;
  @Input() options: Array<SelectItemInterface>;
  @Input() choosenItems: Array<SelectItemInterface> = [];
  @Input() control: FormControl<number | string | null | undefined>;
  choosenValue: string;

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
    this.choosenValue = item.name;
    this.control.patchValue(item.id)
  }


  unCheckAllOptions(): void {
    this.control.patchValue(null)
  }

  isActiveOption(item: SelectItemInterface): boolean {
    return this.control.value === item.id
  }

  protected readonly document = document;
}
