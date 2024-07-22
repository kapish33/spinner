import path from "path";

export function getFileNameParts(file: Express.Multer.File, id: string) {
  const fileExtension = path.extname(file.originalname);
  const baseName = path.basename(file.originalname, fileExtension);
  return `${baseName}-${id}${fileExtension}`;
}
