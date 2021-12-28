import React, { createContext, FC, useContext, useState } from "react";
import { Direction } from "../../components/board";
import { INote, NoteColor } from "../../interfaces/i-note";

interface INoteProvider {}
export interface INoteContext {
  selectedNote: number | undefined;
  updateNote: (newNote: INote) => void;
  moveNote: (id: number, direction: Direction) => void;
  editNote: (id: number) => void;
  deleteNote: (id: number) => void;
  insertNote: (note: INote) => void;
  getNotesByCategoryAndFilter: (id: number) => INote[];
  notes: INote[];
  setSelectedNote: (nota: number | undefined) => void;
  arrayTags: string[];
  selectedNoteData: INote | undefined;
  filter: string;
  setFilter: (filter: string) => void;
  searchNote: (string: string) => INote[];
  setNotePopupVisible: (visible: boolean) => void;
  notePopupVisible: boolean;
  setNotes: (notes: INote[]) => void;
}

const initialContext: INoteContext = {
  selectedNote: -1,
  updateNote: () => {},
  moveNote: () => {},
  editNote: () => {},
  deleteNote: () => {},
  insertNote: () => {},
  getNotesByCategoryAndFilter: () => [],
  notes: [],
  setSelectedNote: () => {},
  arrayTags: [],
  selectedNoteData: undefined,
  filter: "all",
  setFilter: () => {},
  searchNote: () => [],
  setNotePopupVisible: () => {},
  notePopupVisible: false,
  setNotes: () => {},
};
const NoteContext = createContext<INoteContext>(initialContext);

const NoteProvider: FC<INoteProvider> = (props) => {
  const [selectedNote, setSelectedNote] = useState<number | undefined>();
  const initialNoteState = localStorage?.getItem("notes");
  const parsedNotes: INote[] = initialNoteState
    ? JSON.parse(initialNoteState)
    : [
        {
          id: 0,
          title: "nota1",
          text: "comprare insalata",
          status: "da completare",
          categoryId: 1,
          tags: ["albergo", "casa"],
          color: NoteColor.Rosa,
          position: 0,
        },
        {
          id: 1,
          title: "nota2",
          text: "comprare carne",
          status: "da completare",
          categoryId: 2,
          tags: ["cibo", "natale"],
          color: NoteColor.Giallo,
          position: 40,
        },
        {
          id: 2,
          title: "nota3",
          text: "comprare cibo cane",
          status: "da completare",
          categoryId: 3,
          tags: ["animale", "casa", "cibo"],
          color: NoteColor.Arancione,
          position: 20,
        },
      ];
  const [notes, setNotes] = useState<INote[]>(parsedNotes);
  const [filter, setFilter] = useState("all");
  const [notePopupVisible, setNotePopupVisible] = useState<boolean>(false);

  const switchNotes = (id1: number, id2: number) => {
    const note1 = [...notes].find((e) => e?.id === id1)?.position;
    const note2 = [...notes].find((e) => e?.id === id2)?.position;

    const newNotes = [...notes].map((note) => {
      if (note?.id === id1 && note2 !== undefined) {
        note.position = note2;
      }
      if (note?.id === id2 && note1 !== undefined) {
        note.position = note1;
      }

      return note;
    });

    setNotes(newNotes);
  };

  const updateNote = (newNote: INote) => {
    if (selectedNote === undefined) {
      return;
    }
    let newNotes = [...notes].map((currentNote) => {
      return newNote.id === currentNote.id ? newNote : currentNote;
    });
    setNotes(newNotes);
  };

  const moveNote = (id: number, direction: Direction) => {
    let arrayPosition = [...notes];
    const move = arrayPosition.find((e) => {
      return e?.id === id;
    });

    if (move) {
      const categoryNotes = getNotesByCategoryAndFilter(move?.categoryId);
      const clickedIndex = categoryNotes.findIndex((note) => note?.id === id);
      const newDirection =
        categoryNotes[
          direction === Direction?.Left ? clickedIndex - 1 : clickedIndex + 1
        ];

      switchNotes(id, newDirection?.id);
    }
  };

  let arrayTags: string[] = [];

  notes.forEach((note) => {
    note.tags.forEach((tag) => {
      if (!arrayTags.includes(tag)) {
        arrayTags = [...arrayTags, tag];
      }
    });
  });

  const getNotesByCategoryAndFilter = (id: number) => {
    return notes
      .filter((note) => {
        if (note?.categoryId !== id) return false;
        return filter === "all" || note?.tags.includes(filter);
      })
      .sort((a, b) => a.position - b.position);
  };

  let selectedNoteData: INote | undefined;
  if (selectedNote !== undefined) {
    selectedNoteData = notes[selectedNote];
  }

  const editNote = (id: number) => {
    setSelectedNote(id);
    setNotePopupVisible(true);
  };

  const deleteNote = (id: number) => {
    let arrayNote = [...notes].filter((note) => {
      if (id === note.id) {
        return false;
      }
      return true;
    });
    setNotes(arrayNote);
  };

  const insertNote = (note: INote) => {
    note.id = notes.length;
    note.position = notes.length * 10;
    setNotes([...notes, note]);
  };

  const searchNote = (string: string) => {
    return notes.filter((note) => {
      if (!note.title.includes(string.toLocaleLowerCase())) return false;
      return true;
    });
  };

  const NoteData: INoteContext = {
    selectedNote,
    deleteNote,
    editNote,
    getNotesByCategoryAndFilter,
    insertNote,
    moveNote,
    notes,
    updateNote,
    arrayTags,
    selectedNoteData,
    setSelectedNote,
    filter,
    setFilter,
    searchNote,
    setNotePopupVisible,
    notePopupVisible,
    setNotes,
  };

  return (
    <NoteContext.Provider value={NoteData}>
      {props?.children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
export const useNote = () => useContext(NoteContext);
