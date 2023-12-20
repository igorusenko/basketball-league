import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/services/authorization/auth.service";
import {NavigationEnd, Router} from "@angular/router";
import {HeaderService} from "../../core/services/header/header.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{
  hoveredTeams: boolean = false;
  hoveredPlayers: boolean = false;
  constructor(private authService: AuthService,
              private router: Router,
              public headerService: HeaderService) {
  }

  logout(): void {
    this.authService.user = null;
    this.router.navigate(['/authorization/sign-in']).then(x => {
      localStorage.clear();
    });
  }

}
