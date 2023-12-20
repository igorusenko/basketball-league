import {Component, OnInit} from '@angular/core';
import {PlayerDto} from "../../../core/interfaces/players/players-interface";
import {PlayersService} from "../../../core/services/players/players.service";
import {FileService} from "../../../core/services/image/file.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../core/services/notification/notification.service";

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent implements OnInit{

  hoveredEdit: boolean = false;
  hoveredDelete: boolean = false;
  player: PlayerDto;
  currentDate: Date = new Date();
  constructor(public playerService: PlayersService,
              public fileService: FileService,
              private router: Router,
              private notify: NotificationService) {
  }

  ngOnInit() {
    this.playerService.player$.subscribe(player => {
      this.player = player;
    })
  }

  deletePlayer(): void {
    this.playerService.deletePlayer(this.player.id!).subscribe({
      complete: () => {
        this.router.navigate(['/players']);
        this.playerService.refreshPlayersList();
      },
      error: error => {
        this.notify.showError(error.error)
      }
    })
  }


  navigateToPlayerEdit(): void {
    this.router.navigate(['edit'])
  }

  getDate(date: Date | string): Date {
    return new Date(date)
  }

}
