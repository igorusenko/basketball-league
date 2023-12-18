import {Component, Input} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {max} from "rxjs";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  showPassword: boolean = false;
  @Input() type: string;
  @Input() isSubmitted: boolean = false;
  @Input() isPassword: boolean = false;
  @Input() maxLength: number = 50;
  @Input() max: number;
  @Input() width: string;
  @Input() id: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() disabled: boolean = false;
  @Input() control: FormControl<Date |string | number | null | undefined> = new FormControl<string | null>({disabled: this.disabled, value: ''}, [Validators.required]);

}
