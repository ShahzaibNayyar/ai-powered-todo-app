// import React from "react";
// import type { Task } from "../../models/task.type";
// import SubTask from "./subTask";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { IconAi } from "@tabler/icons-react";
// import { useAppDispatch } from "@/redux/hooks";
// import { generateSubTasks, toggleTaskCompletion } from "./taskThunks";
// import TaskComponent from "./task";
// interface Props {
//   task: Task;
//   isSubTask?: boolean;
// }
// const TaskCard = (props: Props) => {
//   const { task, isSubTask = false } = props;
//   const { name, dateCreated, dateCompleted, subTasks } = task;
//   const dispatch = useAppDispatch();
//   return (
//     // <div className="bg-gray-300 w-xl rounded-xl space-y-2 bg-gradient-to-r from-purple-200 to-blue-200">
//     <div className="relative bg-gradient-to-tr p-4 transition-all duration-300 ease-in-out transform hover:scale-110 from-gray-900 to-red-400 w-full max-w-xl min-h-50 rounded-xl space-y-2">
//       <IconAi
//         className="absolute top-2 right-2 border-2 rounded-sm cursor-pointer"
//         size={30}
//         color="white"
//         onClick={() => {
//           dispatch(generateSubTasks(task));
//         }}
//       />
//       {/* <div className="flex flex-row space-x-2 items-center">
//         <Checkbox
//           checked={dateCompleted !== null && dateCompleted !== undefined}
//           onClick={() => {
//             if (task.id) {
//               dispatch(markTaskAsComplete(task.id));
//             }
//           }}
//           id={name}
//         />
//         <Label className="text-2xl text-white" htmlFor={name}>
//           {name}
//         </Label>
//       </div> */}
//       <TaskComponent id={task.id} name={task.name} dateCompleted={task.dateCompleted}/>
//       {/* <h1 className={`text-white ${isSubTask ? "" : "text-2xl font-bold"}`}>
//         {name}
//       </h1> */}
//       <h1 className={`text-white`}>{dateCreated.toLocaleString()}</h1>
//       <div className="pl-2 space-y-1">
//         {subTasks && subTasks?.map((subTask) => <SubTask mainTaskId={task.id} {...subTask} />)}
//       </div>
//     </div>
//   );
// };

// export default TaskCard;

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
