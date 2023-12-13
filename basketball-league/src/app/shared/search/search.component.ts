import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() type: string = '';
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() control: FormControl<string | null> = new FormControl<string | null>({disabled: this.disabled, value: ''}, [Validators.required]);
  @Output() onEnter: EventEmitter<boolean> = new EventEmitter();

}
