import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import GenericModal from "../generic-modal";
import "./toolbar.css";

interface IToolbar {
  onEdit: () => void;
  onDelete: () => void;
  onLeftNote: () => void;
  onRightNote: () => void;
  onToggleNote: () => void;
  mini: boolean;
  showLeft: boolean;
  showRight: boolean;
}

function Toolbar(props: IToolbar) {
  const [visible, setVisible] = useState<boolean>(false);

  const showModalOpen = () => {
    setVisible(true);
  };

  const deleteNote = () => {
    props?.onDelete();
    setVisible(false);
  };

  const closePopup = () => {
    setVisible(false);
  };

  return (
    <div className="container-header clearfix">
      <button className="button-hide" onClick={props?.onToggleNote}>
        {props?.mini ? "+" : "_"}
      </button>
      <button className="button-delete" onClick={showModalOpen}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
      <div className="container-rl">
        {!props.showLeft ? (
          <button onClick={props?.onLeftNote}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        ) : null}
        {!props.showRight ? (
          <button onClick={props?.onRightNote}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        ) : null}
      </div>
      <button className="button-edit" onClick={props?.onEdit}>
        {/* <FontAwesomeIcon icon={faEdit} /> */}
      </button>
      <GenericModal
        visible={visible}
        title={"eliminazione nota"}
        text={"sicuro di voler eliminare la nota?"}
        buttons={[
          { text: "elimina", action: deleteNote },
          { text: "chiudi", action: closePopup },
        ]}
      />
    </div>
  );
}

export default Toolbar;
