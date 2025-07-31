import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Task } from "@/models/task.type";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import { translateTask } from "../todo/taskThunks";
interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  task: Task;
}
export default function TranslateDialog(props: Props) {
  const { openModal, setOpenModal, task } = props;
  const [language, setLanguage] = useState<string>("Urdu");
  const dispatch = useAppDispatch();
  return (
    <AlertDialog open={openModal}>
      <AlertDialogContent className="bg-black text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Translation</AlertDialogTitle>
          <AlertDialogDescription className="text-[15px]">
            Please enter the language you want to translate task into
            <Input
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value.trim());
              }}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="bg-black text-white"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              dispatch(translateTask({ task, targetLanguage: language }));
              setOpenModal(false)
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
