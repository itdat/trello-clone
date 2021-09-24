import { useDrag } from "react-dnd";
import { useAppState } from "./AppStateContext";
import { DragItem } from "./DragItem";

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState();
  const [, drag] = useDrag({
    type: item.type,
    item: () => {
      dispatch({ type: "SET_DRAGGED_ITEM", payload: item });
      return item;
    },
    end: () => dispatch({ type: "SET_DRAGGED_ITEM", payload: undefined }),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return { drag };
};
