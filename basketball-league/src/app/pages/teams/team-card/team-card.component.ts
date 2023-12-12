import {Component, Input} from '@angular/core';
import {TeamDto} from "../../../core/interfaces/team-interface";

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent {

  @Input() teamInfo: TeamDto;

  constructor() {
  }

}
