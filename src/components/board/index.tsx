import React, { useEffect, useState } from "react";
import Note from "../note";
import "./board.css";
import FormNote from "./form-note";
import Nodata from "../nodata";
import Notification from "../generic-toast/toast";
import { ICategory } from "../../interfaces/i-category";
import FormCategory from "./form-category";
import { useCategory } from "../../providers/category-provider";
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
    searchNote,
    setNotePopupVisible,
    notePopupVisible,
  } = useNote();

  const [visibleCategory, setVisibleCategory] = useState<boolean>(false);
  const [hide, setHide] = useState<boolean>(false);
  const [searchTerms, setSearchTerms] = useState<string>("");

  useEffect(() => {
    setHide(true);
    setTimeout(() => {
      setHide(false);
    }, 4000);
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes, setHide]);

  const onNewNoteClick = () => {
    setNotePopupVisible(true);
  };

  const onPopupClose = () => {
    setNotePopupVisible(false);
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

      <form>
        <input
          type="text"
          placeholder="cerca nota"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerms(e?.target.value);
          }}
        />
      </form>

      <div>
        {searchTerms !== "" &&
          searchNote(searchTerms).map((note, index) => {
            const showRight =
              index === getNotesByCategoryAndFilter(note.categoryId).length - 1;
            return (
              <Note
                index={index}
                key={"note" + index}
                {...note} // passaggio dell'oggetto INote come props, al posto di scrivere singolarmente tutti gli attributi (es. tags={note.tags})
                showRight={showRight}
              />
            );
          })}
      </div>

      <div>
        {" "}
        note completate:
        {notes?.map((note) => {
          if (note.completeDate === null) return false;
          return <div>{note.title}</div>;
        })}
      </div>

      <div className="container-notes">
        <div>
          {searchTerms === "" &&
            [noCategory, ...categoriesList].map((category) => {
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
                          getNotesByCategoryAndFilter(note.categoryId).length -
                            1;
                        if (note.completeDate !== null) return false;
                        return (
                          <Note
                            index={index}
                            key={"note" + index}
                            {...note} // passaggio dell'oggetto INote come props, al posto di scrivere singolarmente tutti gli attributi (es. tags={note.tags})
                            showRight={showRight}
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

      {notePopupVisible && (
        <FormNote
          categoryList={categoriesList}
          visible={true}
          onPopupClose={onPopupClose}
        />
      )}

      {visibleCategory && (
        <FormCategory visibleCategory={true} onPopupClose={onPopupClose} />
      )}
    </div>
  );
}

export default Board;
