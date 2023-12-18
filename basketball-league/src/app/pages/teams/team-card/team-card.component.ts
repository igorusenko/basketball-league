import {Component, Input} from '@angular/core';
import {TeamDto} from "../../../core/interfaces/teams/team-interface";
import {FileService} from "../../../core/services/image/file.service";

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent {

  @Input() teamInfo: TeamDto;

  constructor(public fileService: FileService) {
  }

}
