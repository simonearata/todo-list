import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { ICategory } from "../../interfaces/i-category";

const initialContext: ICategoryContext = {
  categories: [],
  insertCategory: () => {},
  deleteCategory: () => {},
};

const CategoryContext = createContext<ICategoryContext>(initialContext);

interface ICategoryProvider {}
export interface ICategoryContext {
  categories: ICategory[];
  insertCategory: (category: ICategory) => void;
  deleteCategory: (id: number) => void;
}

const CategoryProvider: FC<ICategoryProvider> = (props) => {
  const initialCategoryState = localStorage?.getItem("categories");
  const parsedCategories: ICategory[] = initialCategoryState
    ? JSON.parse(initialCategoryState)
    : [
        { title: "Casa", id: 1 },
        { title: "Hobby", id: 2 },
        { title: "Lavoro", id: 3 },
      ];
  const [categories, setCategories] = useState<ICategory[]>(parsedCategories);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const categoryMax: number[] = categories.map((category) => {
    return category.id;
  });

  const insertCategory = (category: ICategory) => {
    category.id = Math.max(...categoryMax) + 1;
    setCategories([...categories, category]);
  };

  const deleteCategory = (id: number) => {
    let deletedCat = [...categories].filter((category) => {
      if (id === category.id) {
        return false;
      }
      return true;
    });
    /* let newNotes = notes.map((note) => {
      if (id === note?.categoryId) {
        note.categoryId = -1;
      }
      return note;
    });
    setNotes(newNotes);
    setCategories(deletedCat); */
  };

  const categoryData: ICategoryContext = {
    categories,
    insertCategory,
    deleteCategory,
  };

  return (
    <CategoryContext.Provider value={categoryData}>
      {props?.children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
export const useCategory = () => useContext(CategoryContext);
