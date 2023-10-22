import { MobilityType } from "src/app/shared/enums/mobility-type";

export interface Mobility {
  id: number;
  name: string;
  description: string;
  type: MobilityType;
}
