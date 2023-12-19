import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TeamModelForm} from "../../../core/forms/team/team-model-form";
import {FileInterface} from "../../../core/interfaces/file/file.interface";
import {FileService} from "../../../core/services/image/file.service";
import {Observable, of, switchMap} from "rxjs";
import {TeamsService} from "../../../core/services/teams/teams.service";
import {ICreateTeam, IUpdateTeam, TeamDto} from "../../../core/interfaces/teams/team-interface";
import {ActivatedRoute, Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {NotificationService} from "../../../core/services/notification/notification.service";

@Component({
    selector: 'app-team-new',
    templateUrl: './team-new.component.html',
    styleUrls: ['./team-new.component.scss']
})
export class TeamNewComponent implements OnInit {
    @ViewChild('fileInput') fileInput!: ElementRef;
    teamForm: FormGroup<TeamModelForm> = this._fb.group<TeamModelForm>({
        name: new FormControl('', Validators.required),
        division: new FormControl('', Validators.required),
        conference: new FormControl('', Validators.required),
        foundationYear: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.min(1900), Validators.max(new Date().getFullYear())]),
        imageToSend: new FormControl('', Validators.required),
        imageToView: new FormControl(''),
    });
    maxSize = 1 * 1024 * 1024;
    viewFiles: Array<FileInterface> = [];
    team: TeamDto;
    id: number;
    breadcrumb: string = '';
    isSubmitted: boolean = false;
    imageValidationError: boolean = false;

    constructor(private _fb: FormBuilder,
                public fileService: FileService,
                private teamsService: TeamsService,
                private router: ActivatedRoute,
                private route: Router,
                private notify: NotificationService) {
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
            imageToSend: this.team.imageUrl,
            imageToView: this.team.imageUrl
        });
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
                        this.teamForm.controls.imageToView.patchValue(image);
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
        return this.fileService.saveImage(this.viewFiles[0].fileToSend!)
    }

    saveChanges(): void {
        this.isSubmitted = true;
        if (this.teamForm.controls.imageToView.value && this.teamForm.controls.imageToView.value?.length > 0 && !this.imageValidationError)
            this.buildRequest().subscribe({
                next: response => {
                    if (response) {
                        this.notify.showSuccess(this.id ? 'Team successfully edited' : 'Team successfully created')
                        this.teamsService.refreshTeamsList();
                        this.route.navigate(['/teams']);
                    }
                },
                error: error => {
                    this.notify.showError(error.error)
                }
            })
    }

    buildRequest(): Observable<TeamDto> {
        if (this.viewFiles.length > 0) {
            return this.saveImage()
                .pipe(
                    switchMap((imageUrl: string) => {
                        this.teamForm.controls.imageToSend.patchValue(imageUrl);
                        if (this.teamForm.valid)
                            return this.id ? this.teamsService.updateTeam(this.createModel()) : this.teamsService.createTeam(this.createModel());
                        else return of();
                    })
                );
        } else
            return this.id ? this.teamsService.updateTeam(this.createModel()) : this.teamsService.createTeam(this.createModel());
    }

    createModel(): ICreateTeam | IUpdateTeam {
        return {
            name: this.teamForm.value.name,
            division: this.teamForm.value.division,
            conference: this.teamForm.value.conference,
            foundationYear: this.teamForm.value.foundationYear,
            imageUrl: this.teamForm.value.imageToSend,
            [this.id ? 'id' : '']: this.id
        }
    }

    validateImage(): void {
        this.viewFiles = [];
        this.teamForm.controls.imageToView.patchValue(null);
        this.teamForm.controls.imageToSend.patchValue(null);
        this.imageValidationError = true;
    }

}
