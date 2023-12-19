import {Component, HostListener, Input, OnInit} from '@angular/core';
import {SelectItemInterface} from "../../core/interfaces/select/select-item.interface";
import {SelectService} from "./select.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FormControl} from "@angular/forms";
import {SelectControl} from "../../core/forms/player/player-model-form";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  animations: [
    trigger('dropdownAnimation', [
      state('void', style({ opacity: 0, transform: 'translateY(-10px)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void <=> *', animate('300ms ease-in-out')),
    ])
  ]
})
export class SelectComponent implements OnInit{
  @Input() isSubmitted: boolean = false;
  @Input() multiple: boolean = false;
  @Input() selectName: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() options: Array<SelectItemInterface>;
  @Input() control: FormControl<any>;
  value: SelectControl = {name: null, id: null};
  constructor(public selectService: SelectService) {

  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    if (!this.isClickInsideDiv(event)) {
      this.selectService.toggleSelect();
    }
  }

  ngOnInit() {
    this.control.valueChanges.subscribe(value => {
      this.value = value;
    })
  }

  private isClickInsideDiv(event: Event): boolean {
    const element = event.target as HTMLElement;
    return !!element.closest('div.select-block');
  }

  getDropdownState(): boolean {
    return this.selectService.getDropdownState(this.selectName);
  }

  selectOption(item: SelectItemInterface): void {
    if (this.selectName !== 'paginator') {
      this.value = {name: item.name, id: item.id}
      this.control.patchValue(<SelectControl>{name: item.name, id: item.id});
    }
    else {
      // this.value = item.name;
      this.control.patchValue(item.id);
    }
  }


  unCheckAllOptions(): void {
    this.control.patchValue({id: null, name: null})
  }

  isActiveOption(item: SelectItemInterface): boolean {
    return this.control.value === item.id
  }

  protected readonly document = document;
}
