import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function youtubeUrlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const urlRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?[\w\=]*)?/;

    const isValid = urlRegex.test(control.value);

    return !isValid ? {url: {value: control.value}} : null;
  };
}
