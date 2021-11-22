import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { ICategory } from "../../interfaces/i-category";

interface IFormCategory {
  visibleCategory: boolean;
  onPopupClose: () => void;
  onInsertCategory: (category: ICategory) => void;
  allCategories: ICategory[];
  onDeleteCategory: (id: number) => void;
}

function FormCategory(props: IFormCategory) {
  const [categoryData, setCategoryData] = useState<ICategory>({
    id: -1,
    title: "",
  });

  const onChangeCategoryData = (field: string, value: string | string[]) => {
    const newState = { ...categoryData, [field]: value };
    setCategoryData(newState);
  };

  const buttonClose = () => {
    props?.onPopupClose();
  };

  const addCategory = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props?.onInsertCategory(categoryData);
  };

  return (
    <Modal show={props?.visibleCategory}>
      <Modal.Header>
        <Modal.Title>Inserisci categoria</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onKeyUp={(e: React.KeyboardEvent<HTMLFormElement>) => {
            if (e?.key === "Enter") {
            }
          }}
        >
          <Form.Group className="mb-3">
            <Form.Control
              type="categories"
              placeholder="inserisci categoria"
              value={categoryData?.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChangeCategoryData("title", e?.target?.value);
              }}
            />
            <button onClick={addCategory}>+</button>
            <ul>
              {props?.allCategories.map((category) => {
                return (
                  <div>
                    <li>{category?.title} </li>
                    <button
                      onClick={() => props?.onDeleteCategory(category?.id)}
                    >
                      elimina
                    </button>
                  </div>
                );
              })}
            </ul>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={buttonClose}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FormCategory;
