import { Component } from '@angular/core';
import {HeaderService} from "./core/services/header.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(public headerService: HeaderService) {

  }

  title = 'basketball-league';
}
