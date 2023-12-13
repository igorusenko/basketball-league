import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TeamModelForm} from "../../../core/forms/team/team-model-form";
import {FileInterface} from "../../../core/interfaces/file/file.interface";
import {FileService} from "../../../core/services/image/file.service";
import {mergeMap, Observable, tap} from "rxjs";
import {TeamsService} from "../../../core/services/teams.service";
import {ICreateTeam, IUpdateTeam, TeamDto} from "../../../core/interfaces/team-interface";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";

@Component({
  selector: 'app-team-new',
  templateUrl: './team-new.component.html',
  styleUrls: ['./team-new.component.scss']
})
export class TeamNewComponent implements OnInit{
  @ViewChild('fileInput') fileInput!: ElementRef;
  teamForm: FormGroup<TeamModelForm> = this._fb.group<TeamModelForm>({
    name: new FormControl(''),
    division: new FormControl(''),
    conference: new FormControl(''),
    foundationYear: new FormControl(null),
    imageUrl: new FormControl(''),
  });
  maxSize = 3 * 1024 * 1024;
  viewFiles: Array<FileInterface> = [];
  team: TeamDto;
  id: number;
  constructor(private _fb: FormBuilder,
              private fileService: FileService,
              private teamsService: TeamsService,
              private router: ActivatedRoute,
              private route: Router) {
  }

  ngOnInit() {
    if (this.router.snapshot.routeConfig?.path !== 'new') {
      this.id = this.router.snapshot.params['id'];
      this.getTeamById(this.id);
    }
  }

  updateForm(): void {
    this.teamForm.setValue({
      name: this.team.name,
      division: this.team.division,
      conference: this.team.conference,
      foundationYear: this.team.foundationYear,
      imageUrl: this.team.imageUrl
    })
  }

  getTeamById(id: number) {
    this.teamsService.getTeamById(id).then(x => {
      this.team = x;
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
    return this.fileService.saveImage(this.viewFiles[0].fileToSend!)
  }

  saveChanges(): void {
      this.buildRequest().subscribe(x => {
        this.teamsService.refreshTeamsList();
        this.route.navigate(['/teams']);
      })
  }

  buildRequest(): Observable<any> {
    if (this.viewFiles[0])
      return this.saveImage().pipe(
        mergeMap((imageUrl: string) =>  {
          this.teamForm.controls.imageUrl.patchValue(imageUrl);
          return this.id ? this.teamsService.updateTeam(this.createModel()) : this.teamsService.createTeam(this.createModel())
        }))
    else return this.id ? this.teamsService.updateTeam(this.createModel()) : this.teamsService.createTeam(this.createModel())
  }

  createModel(): ICreateTeam | IUpdateTeam {
    return  {
      name: this.teamForm.value.name,
      division: this.teamForm.value.division,
      conference: this.teamForm.value.conference,
      foundationYear: this.teamForm.value.foundationYear,
      imageUrl: this.teamForm.value.imageUrl,
      [this.id ? 'id' : '']: this.id
    }
  }

}
