
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface CreateTodoFormProps {
  onSubmit: (title: string, content: string) => void;
  isLoading: boolean;
}

export const CreateTodoForm = ({ onSubmit, isLoading }: CreateTodoFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit(title, content);
      setTitle("");
      setContent("");
    }
  };

  return (
    <Card className="p-4 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Todo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <Textarea
            placeholder="Todo description"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full"
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]">
          {isLoading ? "Adding..." : "Add Todo"}
        </Button>
      </form>
    </Card>
  );
};
