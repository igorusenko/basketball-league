import {FormControl, FormControlName} from "@angular/forms";

export interface TeamModelForm {
  name: FormControl<string | null | undefined>;
  foundationYear: FormControl<number | null | undefined>;
  division: FormControl<string | null | undefined>;
  conference: FormControl<string | null | undefined>;
  imageToView: FormControl<string | null | undefined>;
  imageToSend: FormControl<string | null | undefined>;
}
