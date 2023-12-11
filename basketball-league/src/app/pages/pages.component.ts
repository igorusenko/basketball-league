import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {HeaderService} from "../core/services/header.service";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  animations: [
    trigger('slideAnimation', [
      state('hidden', style({
        transform: 'translateX(-100%)',
        opacity: 0
      })),
      state('visible', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('visible => hidden', animate('0.5s ease-in')),
      transition('hidden => visible', animate('0.5s ease-out'))
    ])
  ],
})
export class PagesComponent {

  constructor(public headerService: HeaderService) {

  }

}
