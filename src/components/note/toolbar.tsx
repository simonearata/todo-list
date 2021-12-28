import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import GenericModal from "../generic-modal";
import "./toolbar.css";
import { INoteContext, useNote } from "../../providers/note-provider";
import { Direction } from "../board";

interface IToolbar {
  mini: boolean;
  noteId: number;
  onToggleNote: () => void;
  index: number;
  showRight: boolean;
}

function Toolbar(props: IToolbar) {
  const {
    deleteNote,
    editNote,
    moveNote,
    getNotesByCategoryAndFilter,
  }: INoteContext = useNote();
  const [visible, setVisible] = useState<boolean>(false);

  const showModalOpen = () => {
    setVisible(true);
  };

  const closePopup = () => {
    setVisible(false);
  };

  const showLeft = props?.index === 0;
  return (
    <div className="container-header clearfix">
      <button className="button-hide" onClick={props?.onToggleNote}>
        {props?.mini ? "+" : "_"}
      </button>
      <button className="button-delete" onClick={showModalOpen}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
      <div className="container-rl">
        {!showLeft ? (
          <button
            onClick={() => {
              moveNote(props?.noteId, Direction.Left);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        ) : null}
        {!props.showRight ? (
          <button
            onClick={() => {
              moveNote(props?.noteId, Direction.Right);
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        ) : null}
      </div>
      <button
        className="button-edit"
        onClick={() => {
          editNote(props?.noteId);
        }}
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>
      <GenericModal
        visible={visible}
        title={"eliminazione nota"}
        text={"sicuro di voler eliminare la nota?"}
        buttons={[
          {
            text: "elimina",
            action: () => {
              deleteNote(props?.noteId);
            },
          },
          { text: "chiudi", action: closePopup },
        ]}
      />
    </div>
  );
}

export default Toolbar;
