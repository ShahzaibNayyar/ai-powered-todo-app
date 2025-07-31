import type { Task } from "@/models/task.type";
import TaskComponent from "./task";

const SubTask = (props: Task & {mainTaskId?: number}) => {
  const { id, name, dateCompleted, mainTaskId } = props;
  return (
    <TaskComponent id={mainTaskId} name={name} dateCompleted={dateCompleted} subTaskId={id}/>
  );
};

export default SubTask;
