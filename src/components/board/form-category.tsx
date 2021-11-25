import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { ICategory } from "../../interfaces/i-category";
import {
  ICategoryContext,
  useCategory,
} from "../../providers/category-provider";

interface IFormCategory {
  visibleCategory: boolean;
  onPopupClose: () => void;
}

function FormCategory(props: IFormCategory) {
  const { categories, deleteCategory, insertCategory }: ICategoryContext =
    useCategory();

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
    insertCategory(categoryData);
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
              {categories?.map((category) => {
                return (
                  <div>
                    <li>{category?.title} </li>
                    <button
                      onClick={() => {
                        deleteCategory(category?.id);
                      }}
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
