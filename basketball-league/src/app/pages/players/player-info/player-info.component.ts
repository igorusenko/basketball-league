import {Component, OnInit} from '@angular/core';
import {PlayerDto} from "../../../core/interfaces/players/players-interface";
import {PlayersService} from "../../../core/services/players/players.service";
import {FileService} from "../../../core/services/image/file.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent implements OnInit{

  hoveredEdit: boolean = false;
  hoveredDelete: boolean = false;
  player: PlayerDto;

  constructor(public playerService: PlayersService,
              public fileService: FileService,
              private router: Router) {
  }

  ngOnInit() {
    this.playerService.player$.subscribe(player => {
      this.player = player;
    })
  }

  deletePlayer(): void {
    this.playerService.deletePlayer(this.player.id!).subscribe(x => {
      this.router.navigate(['/players']);
      this.playerService.refreshPlayersList();
    })
  }


  navigateToPlayerEdit(): void {
    this.router.navigate(['edit'])
  }

}
