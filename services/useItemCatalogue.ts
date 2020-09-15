import { useState, useEffect } from "react";

interface ItemData {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  visibility: string;
  updated_at: Date;
}

type ProductCatalogOutput = [ItemData[], () => void];

export const useItemCatalogue = (): ProductCatalogOutput => {
  const [items, setItems] = useState<ItemData[]>([]);

  const getCatalog = () => {
    return fetch("/api/itemCatalogue")
      .then((results) => results.json())
      .then((results) => {
        setItems(results.data);
      })
      .catch((err) => {
        console.error(err);
        setItems([]);
      });
  };

  useEffect(() => {
    getCatalog();
  }, []);

  const updateItem = () => {
    // some Square API call to update the items
    alert("TODO: update item catalogue on square API");
  };

  return [items, updateItem];
};
