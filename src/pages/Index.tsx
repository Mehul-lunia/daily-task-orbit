
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { todoService } from "../services/todoService";
import { TodoItem } from "../components/TodoItem";
import { CreateTodoForm } from "../components/CreateTodoForm";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: todoService.getAllTodos,
  });

  const createMutation = useMutation({
    mutationFn: (newTodo: { title: string; content: string; status: boolean }) =>
      todoService.createTodo(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast({ title: "Todo created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create todo", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: boolean }) =>
      todoService.updateTodoStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: () => {
      toast({ title: "Failed to update todo", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: todoService.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast({ title: "Todo deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete todo", variant: "destructive" });
    },
  });

  const handleCreateTodo = (title: string, content: string) => {
    createMutation.mutate({ title, content, status: false });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto pt-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Todo List</h1>
        
        <CreateTodoForm onSubmit={handleCreateTodo} isLoading={createMutation.isPending} />
        
        {isLoading ? (
          <div className="text-center text-gray-500">Loading todos...</div>
        ) : !todos?.length ? (
          <div className="text-center text-gray-500">No todos yet. Create one above!</div>
        ) : (
          <div className="space-y-4">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onStatusChange={(id, status) => updateMutation.mutate({ id, status })}
                onDelete={(id) => deleteMutation.mutate(id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
