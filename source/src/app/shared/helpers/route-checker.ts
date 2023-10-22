import { ActivatedRoute } from "@angular/router";

export function routeCheck(route: ActivatedRoute): number | undefined {

  let application_id = undefined;
  const routeParam = route.snapshot.paramMap.get('id')

  if (routeParam && !Number.isNaN(Number(routeParam))) {
    application_id = Number(routeParam);
  }

  return application_id;
}
