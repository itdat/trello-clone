import { DragItem } from "../DragItem";

export const isHidden = (
  draggedItem: DragItem | undefined,
  itemType: string,
  id: string
): boolean => {
  console.log(
    Boolean(
      draggedItem && draggedItem.type === itemType && draggedItem.id === id
    )
  );
  return Boolean(
    draggedItem && draggedItem.type === itemType && draggedItem.id === id
  );
};
