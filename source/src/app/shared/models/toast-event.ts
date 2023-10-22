import { ToastTypes } from "./toast-types";

export interface ToastEvent {
  type: ToastTypes;
  message: string;
}
