import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconTablePlus } from "@tabler/icons-react";
import { addTask } from "./taskThunks";
import { toast } from "sonner";

const AddTask = () => {
  const [taskName, setTaskName] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleAddTask = async () => {
    const trimmedTask = taskName.trim();
    if (!trimmedTask) {
      setTaskName("");
      toast.error("Task name cannot be empty.", {
        description: "Please enter a valid task name.",
        descriptionClassName: 'text-black'
      });
      return;
    }

    await dispatch(addTask(trimmedTask));
    setTaskName("");
    toast.success("Task added successfully!");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="flex flex-row p-3 space-x-2 bg-gray-100 rounded-2xl w-full max-w-xl h-32 justify-center items-center">
      <Input
        className="w-3xl border-black h-10"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Button
        className="cursor-pointer border-black bg-black text-white h-10"
        disabled={!taskName.length}
        onClick={handleAddTask}
        variant="outline"
        size="sm"
      >
        <IconTablePlus stroke={2} /> New Task
      </Button>
    </div>
  );
};

export default AddTask;
