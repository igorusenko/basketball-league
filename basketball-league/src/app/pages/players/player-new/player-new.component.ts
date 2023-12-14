import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TeamModelForm} from "../../../core/forms/team/team-model-form";
import {FileInterface} from "../../../core/interfaces/file/file.interface";
import {ICreateTeam, IUpdateTeam, TeamDto} from "../../../core/interfaces/team-interface";
import {FileService} from "../../../core/services/image/file.service";
import {TeamsService} from "../../../core/services/teams.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {PlayerModelForm} from "../../../core/forms/player/player-model-form";
import {ICreatePlayer, IUpdatePlayer, PlayerDto} from "../../../core/interfaces/players/players-interface";
import {PlayersService} from "../../../core/services/players.service";
import {PositionsDto} from "../../../core/interfaces/postitions/positions-interface";
import {SelectItemInterface} from "../../../core/interfaces/select-item.interface";

@Component({
  selector: 'app-player-new',
  templateUrl: './player-new.component.html',
  styleUrls: ['./player-new.component.scss']
})
export class PlayerNewComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  playerForm: FormGroup<PlayerModelForm> = this._fb.group<PlayerModelForm>({
    name: new FormControl(''),
    number: new FormControl(null),
    avatarUrl: new FormControl(''),
    birthday: new FormControl(''),
    height: new FormControl(null),
    position: new FormControl(''),
    team: new FormControl(null),
    weight: new FormControl(null)
  });

  maxSize = 3 * 1024 * 1024;
  viewFiles: Array<FileInterface> = [];
  player: PlayerDto;
  id: number;
  breadcrumb: string = '';
  positions: Array<string> = [];
  teams: Array<TeamDto>;
  constructor(private _fb: FormBuilder,
              public fileService: FileService,
              private playersService: PlayersService,
              private teamsService: TeamsService,
              private router: ActivatedRoute,
              private route: Router) {
  }

  ngOnInit() {
    if (this.router.snapshot.routeConfig?.path !== 'new') {
      this.id = this.router.snapshot.params['id'];
      this.getTeamById(this.id);
    }
    this.getPositions();
    this.getTeams();
  }

  getPositions(): void {
    this.playersService.getPositions().subscribe(x => {
      this.positions = x;
    })
  }

  getTeams(): void {
    this.teamsService.teams$.subscribe(x => {
      this.teams = x.data;
    })
  }

  updateForm(): void {
    this.playerForm.setValue({
      avatarUrl: this.player.avatarUrl,
      birthday: this.player.birthday,
      height: this.player.height,
      name: this.player.name,
      number: this.player.number,
      position: this.player.position,
      team: this.player.team,
      weight: this.player.weight
    })
  }

  getTeamById(id: number) {
    this.playersService.getPlayerById(id).then(x => {
      this.player = x;
      this.updateForm();
    })
  }

  openChooseFile(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    const files: Array<File> = [];
    for (let i = 0; i < input.files?.length!; i++) {
      files.push(input.files?.item(i)!);
    }
    if (files && files.length > 0 && files.every(x => x.size <= this.maxSize)) {
      this.handleFiles(files);
    } else {
      alert('Один из файлов превышает допустимый размер в 3 MB.');
    }
  }

  handleFiles(files: Array<File>) {
    files.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          const image = e.target.result as string;
          const sizeInMB = this.bytesToMB(file.size);
          if (!this.viewFiles.find(x => x.name == file.name)) {
            this.viewFiles = []
            this.viewFiles.push(
              {
                fileToSend: file,
                name: file.name.replace(/\s/g, ''),
                size: sizeInMB,
                urlToShow:  image,
                type: file.type,
              });
            this.saveImage();
          }
        }
      };
      reader.readAsDataURL(file);
    })
    this.fileInput.nativeElement.value = null;
  }

  bytesToMB(bytes: number): string {
    const mb = bytes / (1024 * 1024);
    return mb.toFixed(2) + ' MB';
  }

  saveImage(): void {
    this.fileService.saveImage(this.viewFiles[0].fileToSend!).subscribe(imageUrl => {
      this.playerForm.controls.avatarUrl.patchValue(imageUrl)
    })
  }

  saveChanges(): void {
    this.buildRequest().subscribe(x => {
      this.playersService.refreshPlayersList();
      this.route.navigate(['/players']);
    })
  }

  buildRequest(): Observable<PlayerDto> {
    return this.id ? this.playersService.updatePlayer(this.createModel()) : this.playersService.createPlayer(this.createModel())
  }

  createModel(): ICreatePlayer | IUpdatePlayer {
    return  {
      name: this.playerForm.value.name,
      number: this.playerForm.value.number,
      position: this.playerForm.value.position,
      team: this.playerForm.value.team,
      birthday: this.playerForm.value.birthday,
      height: this.playerForm.value.height,
      weight: this.playerForm.value.weight,
      avatarUrl: this.playerForm.value.avatarUrl,
      [this.id ? 'id' : '']: this.id
    }
  }

  mapPositions(array: Array<string>): Array<SelectItemInterface> {
    let i = 0;
    return array.map(x => <SelectItemInterface>{
      name: x,
      id: x
    })
  }

  mapTeams(array: Array<TeamDto>): Array<SelectItemInterface> {
    return array.map(x => <SelectItemInterface>{
      name: x.name,
      id: x.id
    })
  }
}
