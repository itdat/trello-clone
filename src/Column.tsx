import React from "react";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./AppStateContext";
import { Card } from "./Card";
import { ColumnContainer, ColumnTitle } from "./styles";

interface ColumnProps {
  text: string;
  index: number;
  id: string;
}

export const Column: React.FC<ColumnProps> = ({ text, index, id }) => {
  const { state, dispatch } = useAppState();
  return (
    <ColumnContainer>
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
