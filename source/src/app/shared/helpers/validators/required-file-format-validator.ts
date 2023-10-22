export function requiredFileTypeValidator(formats: string[], filename: string): boolean {

  const splitedFileName = filename.split('.');
  const extension = splitedFileName[splitedFileName.length - 1].toLowerCase();

  if (!formats.includes(extension.toLowerCase())) return false;

  return true;
}
