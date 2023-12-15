import { Component } from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  hoveredTeams: boolean = false;
  hoveredPlayers: boolean = false;
  constructor(private authService: AuthService,
              private router: Router) {
  }

  logout(): void {
    this.authService.user = null;
    this.router.navigate(['/authorization/sign-in']).then(x => {
      localStorage.clear();
    });
  }

}
