import React, { useState } from "react";
import { INote } from "../../interfaces/i-note";
import "./note.css";
import Toolbar from "./toolbar";

interface INoteProps extends INote {
  index: number;
  showRight: boolean;
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
          noteId={props?.id}
          mini={mini}
          onToggleNote={onToggleNote}
          index={props?.index}
          showRight={props?.showRight}
        />
        <h4 className="title-nota">{props?.title}</h4>
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
