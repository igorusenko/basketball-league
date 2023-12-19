import {FormControl} from "@angular/forms";

export interface PlayerModelForm {
  name: FormControl<string | null | undefined>;
  number: FormControl<number | null | undefined>;
  position: FormControl<SelectControl | null | undefined>;
  team: FormControl<SelectControl | null | undefined>;
  birthday: FormControl<Date | string | null | undefined>;
  height: FormControl<number | null | undefined>;
  weight: FormControl<number | null | undefined>;
  imageToSend: FormControl<string | null | undefined>;
  imageToView: FormControl<string | null | undefined>;
}

export interface SelectControl {
  id: string | number | null | undefined,
  name: string | number | null | undefined
}
