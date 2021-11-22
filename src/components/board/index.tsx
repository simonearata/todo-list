import React, { useEffect, useState } from "react";
import { INote, NoteColor } from "../../interfaces/i-note";
import Note from "../note";
import "./board.css";
import FormNote from "./form-note";
import Nodata from "../nodata";
import Notification from "../generic-toast/toast";
import { ICategory } from "../../interfaces/i-category";
import FormCategory from "./form-category";

interface IBoard {
  name: string;
}

export enum Direction {
  Left = "left",
  Right = "right",
}

function Board(props: IBoard) {
  const [hide, setHide] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleCategory, setVisibleCategory] = useState<boolean>(false);
  const [filter, setFilter] = useState("all");
  const [selectedNote, setSelectedNote] = useState<number | undefined>();

  const initialCategoryState = localStorage?.getItem("categories");
  const parsedCategories: ICategory[] = initialCategoryState
    ? JSON.parse(initialCategoryState)
    : [
        { title: "Casa", id: 1 },
        { title: "Hobby", id: 2 },
        { title: "Lavoro", id: 3 },
      ];
  const [categories, setCategories] = useState<ICategory[]>(parsedCategories);

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

  useEffect(() => {
    setHide(true);
    setTimeout(() => {
      setHide(false);
    }, 4000);
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes, setHide]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const onNewNoteClick = () => {
    setVisible(true);
  };

  const onNewCategoryClick = () => {
    setVisibleCategory(true);
  };

  const onPopupClose = () => {
    setVisible(false);
    setVisibleCategory(false);
    setSelectedNote(undefined);
  };

  const getNotesByCategoryAndFilter = (id: number) => {
    return notes
      .filter((note) => {
        if (note?.categoryId !== id) return false;
        return filter === "all" || note?.tags.includes(filter);
      })
      .sort((a, b) => a.position - b.position);
  };

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

  const insertNote = (note: INote) => {
    note.id = notes.length;
    note.position = notes.length * 10;
    setNotes([...notes, note]);
    onPopupClose();
  };

  const categoryMax: number[] = categories.map((category) => {
    return category.id;
  });

  const insertCategory = (category: ICategory) => {
    category.id = Math.max(...categoryMax) + 1;
    setCategories([...categories, category]);
  };

  /**
   * Aggiornamento di una nota dato l'oggetto INote
   * @param note @description Nuovi dati della nota
   */
  const updateNote = (newNote: INote) => {
    if (selectedNote === undefined) {
      return;
    }
    let newNotes = [...notes].map((currentNote) => {
      return newNote.id === currentNote.id ? newNote : currentNote;
    });
    setNotes(newNotes);
    onPopupClose();
  };

  /**
   * Funzione per eliminare una nota
   * @param index @description Indice della nota da cancellare
   */
  const deleteNote = (id: number) => {
    let arrayNote = [...notes].filter((note) => {
      if (id === note.id) {
        return false;
      }
      return true;
    });
    setNotes(arrayNote);
  };

  const deleteCategory = (id: number) => {
    let deletedCat = [...categories].filter((category) => {
      if (id === category.id) {
        return false;
      }
      return true;
    });
    let newNotes = notes.map((note) => {
      if (id === note?.categoryId) {
        note.categoryId = -1;
      }
      return note;
    });
    setNotes(newNotes);
    setCategories(deletedCat);
  };

  console.log(categories);

  let arrayTags: string[] = [];

  notes.forEach((note) => {
    note.tags.forEach((tag) => {
      if (!arrayTags.includes(tag)) {
        arrayTags = [...arrayTags, tag];
      }
    });
  });

  const editNote = (id: number) => {
    setSelectedNote(id);
    setVisible(true);
  };

  let selectedNoteData: INote | undefined;
  if (selectedNote !== undefined) {
    selectedNoteData = notes[selectedNote];
  }

  const closeNotification = () => {
    setHide(false);
  };

  const noCategory: ICategory = { title: "Nessuna categoria", id: -1 };

  return (
    <div className="container">
      <h2>{props?.name}</h2>

      <div className="notification">
        <Notification
          text={"La nota è stata aggiornata!"}
          hide={hide}
          action={closeNotification}
        />
      </div>

      <div className="container-notes">
        <div>
          {[noCategory, ...categories].map((category) => {
            const showTitle =
              getNotesByCategoryAndFilter(category?.id).length === 0;

            return (
              <div>
                <h2>{!showTitle ? category?.title : null}</h2>
                <div className="container-notes">
                  {getNotesByCategoryAndFilter(category?.id).map(
                    (note, index) => {
                      const showRight =
                        index ===
                        getNotesByCategoryAndFilter(note.categoryId).length - 1;
                      return (
                        <Note
                          index={index}
                          key={"note" + index}
                          {...note}
                          onDelete={() => {
                            deleteNote(note.id);
                          }}
                          onLeftNote={() => {
                            moveNote(note?.id, Direction.Left);
                          }}
                          onRightNote={() => {
                            moveNote(note?.id, Direction.Right);
                          }}
                          showLeft={index === 0}
                          showRight={showRight}
                          onEdit={() => {
                            editNote(note?.id);
                          }}
                        />
                      );
                    }
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {notes?.length === 0 && <Nodata />}

      <button className="button-formNote" onClick={onNewNoteClick}>
        +
      </button>
      <button className="button-formCategory" onClick={onNewCategoryClick}>
        Modifica categoria
      </button>

      <div className="select-tags">
        <select
          value={filter}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setFilter(e?.target?.value);
          }}
        >
          <option value="all">Tutti</option>
          {arrayTags?.map((tag) => {
            return (
              <option value={tag} key={tag}>
                {tag}
              </option>
            );
          })}
        </select>
      </div>

      {visible && (
        <FormNote
          categoryList={categories}
          initialState={selectedNoteData}
          visible={true}
          onPopupClose={onPopupClose}
          onInsertNote={insertNote}
          onUpdateNote={updateNote}
        />
      )}

      {visibleCategory && (
        <FormCategory
          visibleCategory={true}
          onPopupClose={onPopupClose}
          onInsertCategory={insertCategory}
          allCategories={categories}
          onDeleteCategory={deleteCategory}
        />
      )}
    </div>
  );
}

export default Board;
