import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TeamModelForm} from "../../../core/forms/team/team-model-form";
import {FileInterface} from "../../../core/interfaces/file/file.interface";
import {ICreateTeam, IUpdateTeam, TeamDto, TeamsListInterface} from "../../../core/interfaces/teams/team-interface";
import {FileService} from "../../../core/services/image/file.service";
import {TeamsService} from "../../../core/services/teams/teams.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, of, switchMap} from "rxjs";
import {PlayerModelForm} from "../../../core/forms/player/player-model-form";
import {ICreatePlayer, IUpdatePlayer, PlayerDto} from "../../../core/interfaces/players/players-interface";
import {PlayersService} from "../../../core/services/players/players.service";
import {PositionsDto} from "../../../core/interfaces/postitions/positions-interface";
import {SelectItemInterface} from "../../../core/interfaces/select/select-item.interface";
import {NotificationService} from "../../../core/services/notification/notification.service";

@Component({
  selector: 'app-player-new',
  templateUrl: './player-new.component.html',
  styleUrls: ['./player-new.component.scss']
})
export class PlayerNewComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  playerForm: FormGroup<PlayerModelForm> = this._fb.group<PlayerModelForm>({
    name: new FormControl('', Validators.required),
    number: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
    imageToSend: new FormControl('', Validators.required),
    imageToView: new FormControl(''),
    birthday: new FormControl('', Validators.required),
    height: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(50), Validators.max(300)]),
    position: new FormControl({id: null, name: null}, Validators.required),
    weight: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(30), Validators.max(200)]),
    team: new FormControl({id: null, name: null}, Validators.required),
  });

  maxSize = 3 * 1024 * 1024;
  viewFiles: Array<FileInterface> = [];
  player: PlayerDto;
  id: number;
  breadcrumb: string = '';
  positions: Array<string> = [];
  teams: Array<TeamDto>;
  imageValidationError: boolean = false;
  isSubmitted: boolean = false;
  maxDate: string = this.calculateMaxDate();
  constructor(private _fb: FormBuilder,
              public fileService: FileService,
              private playersService: PlayersService,
              private teamsService: TeamsService,
              private router: ActivatedRoute,
              private route: Router,
              private notify: NotificationService) {
  }

  ngOnInit() {
    if (this.router.snapshot.routeConfig?.path !== 'new') {
      this.id = Number(this.router.snapshot.params['id']);
      this.getPlayerById();
    }
    else {
      this.getTeams().subscribe(teams => {
        this.teams = teams.data;
      });
    }
    this.getPositions();
  }

  getPositions(): void {
    this.playersService.getPositions().subscribe(x => {
      this.positions = x;
    })
  }

  getTeams(): Observable<TeamsListInterface> {
   return  this.teamsService.teams$;
  }

  updateForm(): void {
    this.playerForm.setValue({
      imageToSend: this.player.avatarUrl,
      imageToView: this.player.avatarUrl,
      birthday: this.player.birthday,
      height: this.player.height,
      name: this.player.name,
      number: this.player.number,
      position: {id: this.player.position, name: this.player.position},
      team: {id: this.player.team, name: this.teams.find(x => x.id === this.player.team)?.name},
      weight: this.player.weight
    });
  }

  getPlayerById() {
    this.playersService.player$.subscribe(player => {
      this.player = player;
      this.getTeams().subscribe(teams => {
        this.teams = teams.data;
        this.updateForm();
      });
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
    if (files.some(file => file.size > this.maxSize)) {
      this.validateImage();
      this.notify.showError('The image file size is over 1MB.');
    } else if (files.some(file => file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/svg' && file.type !== 'image/ico')) {
      this.validateImage();
      this.notify.showError('Invalid file format.');
    } else if (files && files.length > 0 && files.every(x => x.size <= this.maxSize)) {
      this.imageValidationError = false;
      this.handleFiles(files);
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
            this.viewFiles = [];
            this.viewFiles.push(
                {
                  fileToSend: file,
                  name: file.name.replace(/\s/g, ''),
                  size: sizeInMB,
                  urlToShow: image,
                  type: file.type,
                });
            this.imageValidationError = false;
            this.playerForm.controls.imageToView.patchValue(image);
          } else {
            this.imageValidationError = true;
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

  saveImage(): Observable<string> {
    return this.fileService.saveImage(this.viewFiles[0].fileToSend!);
  }

  saveChanges(): void {
    this.isSubmitted = true;
    if (this.playerForm.controls.imageToView.value && this.playerForm.controls.imageToView.value?.length > 0 && !this.imageValidationError)
    this.buildRequest().subscribe({
      next: response => {
        if (response) {
          this.notify.showSuccess(this.id ? 'Player successfully edited' : 'Player successfully created')
          this.playersService.refreshPlayersList();
          this.route.navigate(['/players']);
        }
      },
      error: error => {
        this.notify.showError(error.error)
      }
    })
  }

  buildRequest(): Observable<PlayerDto> {
    if (this.viewFiles.length > 0) {
      return this.saveImage()
          .pipe(
              switchMap((imageUrl: string) => {
                this.playerForm.controls.imageToSend.patchValue(imageUrl);
                if (this.playerForm.valid)
                  return this.id ? this.playersService.updatePlayer(this.createModel()) : this.playersService.createPlayer(this.createModel());
                else return of();
              })
          );
    } else
    return this.id ? this.playersService.updatePlayer(this.createModel()) : this.playersService.createPlayer(this.createModel())
  }

  createModel(): ICreatePlayer | IUpdatePlayer {
    return  {
      name: this.playerForm.value.name,
      number: this.playerForm.value.number,
      position: this.playerForm.value.position?.id,
      team: this.playerForm.value.team?.id,
      birthday: new Date(this.playerForm.value.birthday!),
      height: this.playerForm.value.height,
      weight: this.playerForm.value.weight,
      avatarUrl: this.playerForm.value.imageToSend,
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

  validateImage(): void {
    this.viewFiles = [];
    this.playerForm.controls.imageToView.patchValue(null);
    this.playerForm.controls.imageToSend.patchValue(null);
    this.imageValidationError = true;
  }

  private calculateMaxDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate());

    // Форматируем дату в строку 'yyyy-MM-dd', который принимается элементом input type="date"
    const formattedDate = tomorrow.toISOString().split('T')[0];

    return formattedDate;
  }
}
