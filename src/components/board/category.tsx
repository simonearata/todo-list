import React from "react";
import { INote } from "../../interfaces/i-note";
import { ICategory } from "../../interfaces/i-category";

interface ICategoryProps extends ICategory {
  notes: INote[];
  filter: string;
}

function Category(props: ICategoryProps) {
  const filteredNotes = props?.notes.filter((note) => {
    if (note.categoryId !== props?.id) return false;
    return props?.filter === "all" || note?.tags.includes(props?.filter);
  });

  if (filteredNotes.length === 0) {
    return null;
  }

  return (
    <div>
      <h4>{props?.title}</h4>
      {filteredNotes.map((note) => {
        return <div>{note?.title}</div>;
      })}
    </div>
  );
}

export default Category;
