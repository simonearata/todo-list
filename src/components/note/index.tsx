import React, { useState } from "react";
import { INote } from "../../interfaces/i-note";
import "./note.css";
import Toolbar from "./toolbar";

interface INoteProps extends INote {
  onEdit: () => void;
  onDelete: () => void;
  onLeftNote: () => void;
  onRightNote: () => void;
  showLeft: boolean;
  showRight: boolean;
  index: number;
}

function Note(props: INoteProps) {
  const [mini, setMini] = useState<boolean>(false);

  const onToggleNote = () => {
    setMini(!mini);
  };

  return (
    <div>
      <div className="container-nota" style={{ backgroundColor: props?.color }}>
        <Toolbar
          onEdit={props?.onEdit}
          onRightNote={props?.onRightNote}
          onLeftNote={props?.onLeftNote}
          onDelete={props?.onDelete}
          onToggleNote={onToggleNote}
          mini={mini}
          showLeft={props.showLeft}
          showRight={props.showRight}
        />
        <h4 className="title-nota">
          {props?.title}, position: {props?.position}, id: {props?.id}, index:
          {props?.index}
        </h4>
        {!mini && (
          <div>
            <p>{props?.text}</p>

            <div className="nota-tags">
              {props?.tags.map((tag, index) => {
                return (
                  <div className="tag" key={"tag" + index}>
                    {tag}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Note;
