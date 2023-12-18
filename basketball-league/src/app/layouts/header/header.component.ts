import { Component } from '@angular/core';
import {HeaderService} from "../../core/services/header/header.service";
import {AuthService} from "../../core/services/authorization/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public headerService: HeaderService,
              public authService: AuthService) {
  }


}
