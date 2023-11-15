import React from "react";
import "../App.css";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";
import { Todo, FilterStatus } from "../../types/todoType";
import DeleteTodo from "./DeleteTodo";
import ChangeTodoStatus from "./ChangeTodoStatus";
import EditTodo from "./EditTodo";


interface TodoListProps {
  todos: Todo[];
  isSorted: boolean;
  filterStatus: FilterStatus;
  handleTodoStatusChange: (id: string, newStatus: string) => void;
  handleDeleteTodo: (id: string) => void;
  handleEditTodo: (id: Todo['id'], title: Todo['title'], detail: Todo['detail'], deadline: Todo['deadline']) => void;
  handleTodoSortButtonChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  isSorted,
  filterStatus,
  handleTodoStatusChange,
  handleDeleteTodo,
  handleEditTodo,
  handleTodoSortButtonChange,
  handleFilterStatusChange,
}) => {
  return (
    <>
      {/* 締切の昇順で並べ替えるチェックボックス */}
      <label className="todoSort">
        <span>締切が近い順に並べ替える</span>
        <input 
          type="checkbox"
          checked={isSorted}
          onChange={handleTodoSortButtonChange}
        />
      </label>

      {/* 進行状態による絞り込み */}
      <label className="filterStatus">
        <input 
          type="checkbox"
          name="all"
          checked={filterStatus.all}
          onChange={handleFilterStatusChange}
        />All
        <input 
          type="checkbox"
          name="untouched"
          checked={filterStatus.untouched}
          onChange={handleFilterStatusChange}
        />Untouched
        <input 
          type="checkbox"
          name="processing"
          checked={filterStatus.processing}
          onChange={handleFilterStatusChange}
        />Processing
        <input 
          type="checkbox"
          name="completed"
          checked={filterStatus.completed}
          onChange={handleFilterStatusChange}
        />Completed
      </label>

      <div className="todoListArea">
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>Task</Th>
                <Th>Status</Th>
                <Th>Detail</Th>
                <Th>Deadline</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {todos.map((todo) => (
                <Tr key={todo.id} className={`tr-${todo.status}`}>
                  <Td>{todo.title}</Td>
                  <Td className="todoItemStatus">
                    <ChangeTodoStatus
                      todo={todo}
                      handleTodoStatusChange={handleTodoStatusChange}
                    />
                  </Td>
                  <Td>{todo.detail}</Td>
                  <Td>{todo.deadline}</Td>
                  <Td>
                    <EditTodo
                      editTodo={todo}
                      handleEditTodo={handleEditTodo}
                    />
                  </Td>
                  <Td>
                    <DeleteTodo
                      deleteId={todo.id}
                      handleDeleteTodo={handleDeleteTodo}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default TodoList;
