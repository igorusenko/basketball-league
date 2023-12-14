import {Component, OnInit} from '@angular/core';
import {TeamsService} from "../../core/services/teams.service";
import {GetTeamsInterface, TeamDto, TeamsListInterface} from "../../core/interfaces/team-interface";
import {Router} from "@angular/router";
import {FileService} from "../../core/services/image/file.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent{

}
