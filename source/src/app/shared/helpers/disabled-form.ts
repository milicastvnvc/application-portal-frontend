import { Application } from "src/app/application/models/application";

export function shouldDisableForm(application: Application, isAdmin: boolean, formName: string = ''): boolean {

  if (isAdmin) return true; //admin ne sme da menja formu

  if (application.submitted_at != undefined) return true; // ne sme da menja formu koja je vec submitovana

  if (formName.length) {
    if (application.unlocked_forms.length) //postoje otkljucane i zakljucane forme, znaci da neke sme da menja, a neke ne
    {
      if (application.unlocked_forms.includes(formName)) return false; //moja je otkljucana i smem da joj pristupim

      return true; //moja je zakljucana
    }
      return false; //ne postoje otkljucane i zakljucane, smem da pristupim formi
  }

  return false;
}
