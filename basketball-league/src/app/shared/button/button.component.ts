import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() name: string = '';
  @Input() cancel: boolean = false;
  @Input() width: string = '';
  @Input() disabled: boolean = false;
  @Input() iconPath: string = '';

}
