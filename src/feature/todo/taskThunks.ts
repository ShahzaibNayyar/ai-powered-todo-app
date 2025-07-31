import { db } from "@/db";
import type { Task } from "@/models/task.type";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { generateText } from "ai";
import { toast } from "sonner";
import { hideLoading, showLoading } from "../ui/uiSlice";

export const fetchAll = createAsyncThunk("todos/fetchAll", async () => {
  const todos = await db.todos.toArray();
  return todos;
});

export const addTask = createAsyncThunk(
  "todos/AddTast",
  async (taskName: string) => {
    const task: Task = {
      name: taskName,
      dateCreated: new Date().toString(),
    };
    const id = await db.todos.add(task);
    return { ...task, id };
  }
);

const google = createGoogleGenerativeAI({
  apiKey: import.meta.env.VITE_GOOGLE_KEY,
});
export const generateSubTasks = createAsyncThunk(
  "todo/GenerateSubTasks",
  async (task: Task, thunkAPI) => {
    const { id, name } = task;
    thunkAPI.dispatch(showLoading("Generating Subtasks, please wait"));
    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: `Generate a JSON array of strings (subtask names only) for the task: "${name}". Return only the JSON array without code formatting.`,
    });
    const parsedSubTasks: string[] = JSON.parse(text);

    const subTasks = parsedSubTasks.map(
      (task, index) =>
        ({
          id: index + 1,
          name: task,
        } as Task)
    );
    db.todos.update(id, { subTasks: subTasks });
    thunkAPI.dispatch(hideLoading());
    return {
      taskId: id,
      subTasks: subTasks,
    };
  }
);

export const toggleTaskCompletion = createAsyncThunk(
  "todos/toggleTaskCompletion",
  async (taskId: number) => {
    const task = await db.todos.where({ id: taskId }).first();
    if (!task) return;

    let updatedTask: Task = task;
    if (task.dateCompleted) {
      updatedTask.dateCompleted = undefined;
    } else {
      const updatedSubTasks = task.subTasks?.map((subTask) => ({
        ...subTask,
        dateCompleted: new Date().toString(),
      }));
      updatedTask = {
        ...task,
        dateCompleted: new Date().toString(),
        subTasks: updatedSubTasks,
      };
    }

    await db.todos.update(taskId, updatedTask);
    return updatedTask;
  }
);

export const toggleSubTaskTaskCompletion = createAsyncThunk(
  "todos/toggleSubTaskTaskCompletion",
  async (params: { taskId: number; subTaskId: number }) => {
    const { taskId, subTaskId } = params;
    const task = await db.todos.where({ id: taskId }).first();
    if (!task) return;

    const updatedSubTasks = task.subTasks?.map((task) => {
      if (task.id === subTaskId) {
        if (task.dateCompleted) {
          task.dateCompleted = undefined;
        } else {
          task.dateCompleted = new Date().toString();
        }
        return task;
      }
      return task;
    });

    const completedSubTasks = task.subTasks?.filter(
      (task) => task.dateCompleted
    );

    let updatedTask: Task = {
      ...task,
      subTasks: updatedSubTasks,
      dateCompleted:
        task.subTasks?.length !== completedSubTasks?.length
          ? undefined
          : new Date().toString(),
    };
    await db.todos.update(taskId, updatedTask);
    return updatedTask;
  }
);

export const deleteTaskById = createAsyncThunk(
  "todos/deleteTask",
  async (taskId: number) => {
    db.todos.delete(taskId);
    return taskId;
  }
);

export const translateTask = createAsyncThunk(
  "todo/translateTask",
  async (params: { task: Task; targetLanguage: string }, thunkAPI) => {
    const { task, targetLanguage } = params;
    thunkAPI.dispatch(showLoading("Translation in progress, please wait"));
    const tasksString = [
      task.name,
      ...(task.subTasks?.map((task) => task.name) ?? []),
    ];
    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: `Translate the following list into "${targetLanguage}". 
If the language is not valid language that is spoken in world, respond only with "INVALID_LANGUAGE". 
Otherwise,  Return only the translate JSON array without code formatting:

${JSON.stringify(tasksString)}`,
    });
    if (text === "INVALID_LANGUAGE") {
      toast("Invalid language.", {
        description: `"${targetLanguage}" is an invalid language`,
      });
    }
    const translatedTasks = JSON.parse(text);
    thunkAPI.dispatch(hideLoading());
    return { taskId: task.id, translatedTasks };
  }
);

export const resetTaskTranslation = createAsyncThunk(
  "todos/resetTaskTranslation",
  async (taskId: number) => {
    const task = db.todos.where({ id: taskId }).first();
    return task;
  }
);
