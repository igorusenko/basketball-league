import {FormControl} from "@angular/forms";

export interface PlayerModelForm {
  name: FormControl<string | null | undefined>;
  number: FormControl<number | null | undefined>;
  position: FormControl<string | null | undefined>;
  team: FormControl<number | null | undefined>;
  birthday: FormControl<string | null | undefined>;
  height: FormControl<number | null | undefined>;
  weight: FormControl<number | null | undefined>;
  avatarUrl: FormControl<string | null | undefined>;
}
