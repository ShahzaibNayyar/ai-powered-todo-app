import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Task } from "@/models/task.type";
import TaskComponent from "./task";
import SubTask from "./subTask";
import { Button } from "@/components/ui/button";
import { IconTrash } from "@tabler/icons-react";
import { deleteTaskById } from "./taskThunks";
import { useAppDispatch } from "@/redux/hooks";
import AiTasks from "../ai/aiTasks";

interface Props {
  task: Task;
}
const taskCard = (props: Props) => {
  const { task } = props;
  const { id, dateCreated, subTasks } = task;
  const dispatch = useAppDispatch();
  return (
    <Card className="bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-102 w-full max-w-xl min-h-50 rounded-xl space-y-2">
      <CardHeader>
        <CardTitle>
          <TaskComponent {...task} />
        </CardTitle>
        <CardDescription className="text-gray-600 text-sm">
          {dateCreated}
        </CardDescription>
        <CardAction className="space-x-1">
          <Button
            title="Delete Task"
            onClick={() => {
              if (id) {
                dispatch(deleteTaskById(id));
              }
            }}
          >
            <IconTrash />
          </Button>

          <AiTasks task={task} />
        </CardAction>
      </CardHeader>
      <CardContent>
        {subTasks &&
          subTasks?.map((subTask) => (
            <SubTask mainTaskId={task.id} {...subTask} />
          ))}
      </CardContent>
    </Card>
  );
};

export default taskCard;
