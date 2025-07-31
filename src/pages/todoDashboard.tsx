import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import TaskCard from "../feature/todo/taskCard";
import AddTask from "@/feature/todo/addTask";
import { fetchAll } from "@/feature/todo/taskThunks";

const TodoDashboard = () => {
  const tasks = useAppSelector((state) => state.task.tasks);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAll());
  }, []);
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-300">
      <h1 className="w-full flex justify-center items-center h-20 font-bold text-4xl bg-gray-100 mb-5">Todo App</h1>
      <AddTask />
      <div className=" mt-5 flex flex-col space-y-5 items-center w-full h-full mb-5">
        {tasks.map((task) => (
          <TaskCard task={task} />
        ))}
      </div>
    </div>
  );
};

export default TodoDashboard;
