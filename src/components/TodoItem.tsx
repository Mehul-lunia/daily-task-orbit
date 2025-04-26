
import { format } from "date-fns";
import { Todo } from "../types/todo";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { TrashIcon } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
    onStatusChange: (id: bigint, status: boolean) => void;
  onDelete: (id: bigint) => void;
}

export const TodoItem = ({ todo, onStatusChange, onDelete }: TodoItemProps) => {
  return (
    <Card className="p-4 mb-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <Checkbox
          checked={todo.status}
          onCheckedChange={(checked) => onStatusChange(todo.id, checked as boolean)}
          className="mt-1"
        />
        <div className="flex-1">
          <h3 className={`font-medium ${todo.status ? 'line-through text-gray-500' : ''}`}>
            {todo.title}
          </h3>
          <p className={`mt-1 text-sm ${todo.status ? 'line-through text-gray-400' : 'text-gray-600'}`}>
            {todo.content}
          </p>
          <div className="flex justify-between items-center mt-2">

            <button
              onClick={() => onDelete(todo.id)}
              className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
            >
              <TrashIcon size={16} />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};
