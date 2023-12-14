import {Component, Input} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() type: string;
  @Input() width: string;
  @Input() id: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() disabled: boolean = false;
  @Input() control: FormControl<string | number | null | undefined> = new FormControl<string | null>({disabled: this.disabled, value: ''}, [Validators.required]);

}
