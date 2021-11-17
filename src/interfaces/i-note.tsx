export interface INote {
  id: number;
  title: string;
  text: string;
  status: string;
  categoryId: number;
  tags: string[];
  color: NoteColor;
  position: number;
}

export enum NoteColor {
  Rosa = "#f4dedb",
  Giallo = "#fffeef",
  Arancione = "#fbe1c2",
}
