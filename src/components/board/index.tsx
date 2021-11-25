import React, { useEffect, useState } from "react";
import { INote, NoteColor } from "../../interfaces/i-note";
import Note from "../note";
import "./board.css";
import FormNote from "./form-note";
import Nodata from "../nodata";
import Notification from "../generic-toast/toast";
import { ICategory } from "../../interfaces/i-category";
import FormCategory from "./form-category";
import {
  ICategoryContext,
  useCategory,
} from "../../providers/category-provider";
import { useNote } from "../../providers/note-provider";

interface IBoard {
  name: string;
}

export enum Direction {
  Left = "left",
  Right = "right",
}

function Board(props: IBoard) {
  const { categories } = useCategory();
  const {
    getNotesByCategoryAndFilter,
    notes,
    setSelectedNote,
    arrayTags,
    filter,
    setFilter,
  } = useNote();

  const [visibleCategory, setVisibleCategory] = useState<boolean>(false);
  const [hide, setHide] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setHide(true);
    setTimeout(() => {
      setHide(false);
    }, 4000);
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes, setHide]);

  const onNewNoteClick = () => {
    setVisible(true);
  };

  const onPopupClose = () => {
    setVisible(false);
    setVisibleCategory(false);
    setSelectedNote(undefined);
  };

  const onNewCategoryClick = () => {
    setVisibleCategory(true);
  };

  const closeNotification = () => {
    setHide(false);
  };

  const noCategory: ICategory = { title: "Nessuna categoria", id: -1 };
  const categoriesList = categories ? categories : [];

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
          {[noCategory, ...categoriesList].map((category) => {
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
                          {...note} // passaggio dell'oggetto INote come props, al posto di scrivere singolarmente tutti gli attributi (es. tags={note.tags})
                          /* onDelete={() => {
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
                          }} */
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
          categoryList={categoriesList}
          /* initialState={selectedNoteData} */
          visible={true}
          onPopupClose={onPopupClose}
          /* onInsertNote={insertNote}
          onUpdateNote={updateNote} */
        />
      )}

      {visibleCategory && (
        <FormCategory visibleCategory={true} onPopupClose={onPopupClose} />
      )}
    </div>
  );
}

export default Board;
