import { Checkbox } from "@/components/ui/checkbox";
import type { Task } from "@/models/task.type";
import { useAppDispatch } from "@/redux/hooks";
import { Label } from "@radix-ui/react-label";
import { toggleSubTaskTaskCompletion, toggleTaskCompletion } from "./taskThunks";

const TaskRow = (
  props: Omit<Task, "dateCreated" | "subTasks"> & { subTaskId?: number }
) => {
  const { id, name, subTaskId, dateCompleted } = props;
  const dispatch = useAppDispatch();
  const isCompleted = dateCompleted !== null && dateCompleted !== undefined
  return (
    <div className="flex flex-row space-x-2 items-center">
      <Checkbox
        checked={isCompleted}
        onClick={() => {
          if (id && !subTaskId) {
            dispatch(toggleTaskCompletion(id));
          }
          else if(id && subTaskId)
          {
            dispatch(toggleSubTaskTaskCompletion({taskId: id, subTaskId}))
          }
        }}
        id={name}
      />
      <Label className={`${subTaskId ? '' : 'text-2xl'} text-black ${isCompleted ? 'line-through' : ''}`} htmlFor={name}>
        {name}
      </Label>
    </div>
  );
};

export default TaskRow;
