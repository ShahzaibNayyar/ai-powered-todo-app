import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "../feature/todo/taskSlice";
import uiSlice from "@/feature/ui/uiSlice";


export const store = configureStore({
  reducer: {
    task: taskSlice,
    ui: uiSlice
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch