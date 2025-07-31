import type { Task } from "@/models/task.type";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React from "react";
import TaskComponent from "./task";

const SubTask = (props: Task & {mainTaskId?: number}) => {
  const { id, name, dateCompleted, mainTaskId } = props;
  return (
    <TaskComponent id={mainTaskId} name={name} dateCompleted={dateCompleted} subTaskId={id}/>
  );
};

export default SubTask;
