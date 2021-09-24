import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./AppStateContext";
import { Card } from "./Card";
import { DragItem } from "./DragItem";
import { ColumnContainer, ColumnTitle } from "./styles";
import { useItemDrag } from "./useItemDrag";

interface ColumnProps {
  text: string;
  index: number;
  id: string;
}

export const Column: React.FC<ColumnProps> = ({ text, index, id }) => {
  const { state, dispatch } = useAppState();
  const [, drop] = useDrop({
    accept: "COLUMN",
    hover: (item: DragItem) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      dispatch({ type: "MOVE_LIST", payload: { dragIndex, hoverIndex } });
      item.index = hoverIndex;
    },
  });
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: "COLUMN", id, index, text });
  drop(drag(ref));
  return (
    <ColumnContainer ref={ref}>
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task) => (
        <Card text={task.text} key={task.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={(text: string) =>
          dispatch({ type: "ADD_TASK", payload: { text, taskId: id } })
        }
        dark
      />
    </ColumnContainer>
  );
};
