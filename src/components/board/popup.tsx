import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { ICategory } from "../../interfaces/i-category";
import { INote, NoteColor } from "../../interfaces/i-note";
import "./popup.css";

interface IPopup {
  categoryList: ICategory[];
  visible: boolean;
  onPopupClose: () => void;
  onInsertNote: (note: INote) => void;
  initialState?: INote;
  onUpdateNote: (note: INote) => void;
}

function Popup(props: IPopup) {
  const initialNoteState: INote = {
    id: -1,
    title: "",
    text: "",
    status: "",
    categoryId: 1,
    tags: [],
    color: NoteColor?.Rosa,
    position: -1,
  };
  const [noteData, setNoteData] = useState<INote>(
    props?.initialState ? props?.initialState : initialNoteState
  );
  const [tagInput, setTagInput] = useState<string>("");

  const onChangeNoteData = (
    field: string,
    value: string | string[] | number
  ) => {
    const newState = { ...noteData, [field]: value };
    setNoteData(newState);
  };

  const onSaveClick = () => {
    if (!validateFormData()) {
      return false;
    }
    if (props.initialState === undefined) {
      props?.onInsertNote(noteData);
    } else {
      props?.onUpdateNote(noteData);
    }
    resetFormData();
  };

  const resetFormData = () => {
    setNoteData(initialNoteState);
    setTagInput("");
  };

  const validateFormData = () => {
    if (noteData.title === "") {
      return false;
    }
    if (noteData.text === "") {
      return false;
    }
    /* if (noteData.status === "") {
      return false;
    } */
    return true;
  };

  const addTag = (e: React.FormEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    if (!noteData.tags.includes(tagInput)) {
      onChangeNoteData("tags", [...noteData?.tags, tagInput]);
    }
    setTagInput("");
  };

  const buttonClose = () => {
    props?.onPopupClose();
    resetFormData();
  };

  return (
    <Modal show={props?.visible}>
      <Modal.Header>
        <Modal.Title>Inserisci nota</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onKeyUp={(e: React.KeyboardEvent<HTMLFormElement>) => {
            if (e?.key === "Enter") {
              onSaveClick();
            }
          }}
        >
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="inserisci titolo"
              value={noteData?.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChangeNoteData("title", e?.target?.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Inserisci testo"
              value={noteData?.text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChangeNoteData("text", e?.target?.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <select
              value={noteData?.color}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                onChangeNoteData("color", e?.target?.value);
              }}
            >
              <option value={NoteColor?.Giallo}>Giallo</option>
              <option value={NoteColor?.Rosa}>Rosa</option>
              <option value={NoteColor?.Arancione}>Arancione</option>
            </select>
          </Form.Group>

          <Form.Group className="mb-3">
            <select
              value={noteData?.categoryId}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                onChangeNoteData("categoryId", parseInt(e?.target?.value));
              }}
            >
              {props?.categoryList.map((category) => {
                return <option value={category.id}>{category.title}</option>;
              })}
            </select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="tags"
              placeholder="Inserisci tag"
              value={tagInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTagInput(e?.target?.value);
              }}
            />
            <button onClick={addTag}>+</button>
            <ul>
              {noteData?.tags?.map((tag) => {
                return <li>{tag}</li>;
              })}
            </ul>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={buttonClose}>
          Chiudi
        </Button>
        <Button
          disabled={!validateFormData()}
          className="button-form"
          variant="primary"
          type="submit"
          value="Submit"
          onClick={onSaveClick}
        >
          Salva
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Popup;
