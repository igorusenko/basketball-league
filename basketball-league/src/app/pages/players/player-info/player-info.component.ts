import {Component, OnInit} from '@angular/core';
import {PlayerDto} from "../../../core/interfaces/players/players-interface";
import {PlayersService} from "../../../core/services/players.service";
import {FileService} from "../../../core/services/image/file.service";

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent implements OnInit{

  player: PlayerDto;

  constructor(public playerService: PlayersService,
              public fileService: FileService) {
  }

  ngOnInit() {
    this.playerService.player$.subscribe(player => {
      this.player = player;
    })
  }

  deletePlayer(): void {

  }

}
