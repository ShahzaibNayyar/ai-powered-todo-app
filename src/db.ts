import Dexie, { type EntityTable } from "dexie";
import type { Task } from "./models/task.type";
const db = new Dexie("TodosDatabase") as Dexie & {
  todos: EntityTable<Task, "id">;
};

db.version(1).stores({
  todos: "++id, name, dateCreated, dateCompleted, subTasks",
});
export {db}