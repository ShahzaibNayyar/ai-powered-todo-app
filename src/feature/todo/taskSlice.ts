import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../../models/task.type";
import {
  addTask,
  deleteTaskById,
  fetchAll,
  generateSubTasks,
  resetTaskTranslation,
  toggleSubTaskTaskCompletion,
  toggleTaskCompletion,
  translateTask,
} from "./taskThunks";

type TaskState = {
  tasks: Task[];
};

const initialState: TaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "Task",
  initialState,
  reducers: {
    updateTask: (state, action: PayloadAction<Task>) => {
      const payload = action.payload;
      if (!payload) return;
      const taskIndex = state.tasks.findIndex(
        (task) => task.id == action.payload?.id
      );
      if (taskIndex !== -1 && action.payload) {
        state.tasks[taskIndex] = {
          ...action.payload,
          name: state.tasks[taskIndex].name,
          subTasks: state.tasks[taskIndex].subTasks?.map(
            (subTask, subTaskIndex) => {
              const updatedSubTask = payload.subTasks
                ? payload.subTasks[subTaskIndex]
                : undefined;
              return {
                ...subTask,
                ...(updatedSubTask ? updatedSubTask : {}),
                name: subTask.name,
                dateCreated: subTask.dateCreated,
              };
            }
          ),
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAll.fulfilled,
      (state, action: PayloadAction<Array<Task>>) => {
        state.tasks = action.payload;
      }
    );
    builder.addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    });

    builder.addCase(
      generateSubTasks.fulfilled,
      (
        state,
        action: PayloadAction<{ taskId: number | undefined; subTasks: Task[] }>
      ) => {
        const { taskId, subTasks } = action.payload;
        if (typeof taskId === "number") {
          const task = state.tasks.find((task) => task.id === taskId);
          if (task) {
            task.subTasks = subTasks;
          }
        }
      }
    );
    builder.addCase(
      toggleTaskCompletion.fulfilled,
      (state, action: PayloadAction<Task | undefined>) => {
        if (action.payload) {
          taskSlice.caseReducers.updateTask(state, {
            type: "updateTask",
            payload: action.payload,
          });
        }
      }
    );
    builder.addCase(
      toggleSubTaskTaskCompletion.fulfilled,
      (state, action: PayloadAction<Task | undefined>) => {
        if (action.payload) {
          taskSlice.caseReducers.updateTask(state, {
            type: "updateTask",
            payload: action.payload,
          });
        }
      }
    );
    builder.addCase(
      deleteTaskById.fulfilled,
      (state, action: PayloadAction<number>) => {
        const taskIndex = state.tasks.findIndex(
          (task) => task.id === action.payload
        );
        state.tasks.splice(taskIndex, 1);
      }
    );
    builder.addCase(
      translateTask.fulfilled,
      (
        state,
        action: PayloadAction<{ taskId?: number; translatedTasks: string[] }>
      ) => {
        const { taskId, translatedTasks } = action.payload;
        if (taskId) {
          const task = state.tasks.find((task) => task.id === taskId);
          if (task) {
            task.name = translatedTasks[0];
            if (task?.subTasks?.length) {
              task.subTasks.map(
                (task, index) => (task.name = translatedTasks[index + 1])
              );
            }
          }
        }
      }
    );
    builder.addCase(
      resetTaskTranslation.fulfilled,
      (state, action: PayloadAction<Task | undefined>) => {
        const task = action.payload;
        if (task) {
          const taskIndex = state.tasks.findIndex(
            (_task) => _task.id === task.id
          );
          if (taskIndex !== -1) {
            state.tasks[taskIndex] = task;
          }
        }
      }
    );
  },
});

export const {} = taskSlice.actions;
export default taskSlice.reducer;
