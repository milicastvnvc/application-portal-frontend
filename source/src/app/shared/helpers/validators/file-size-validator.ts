import { fileSize, videoDocument, videoSize } from "../constants";

export function fileSizeValidator(filesize: number, documentName: string): boolean {

  const size = filesize / 1024 / 1024; // Convert to megabytes

  if (documentName == videoDocument) {
    if (size > videoSize) {
      return false;
    }

    return true;
  }

  if (size > fileSize) {
    return false;
  }

  return true;
}
