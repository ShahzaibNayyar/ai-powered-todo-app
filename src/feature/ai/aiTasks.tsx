import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Task } from "@/models/task.type";
import { useAppDispatch } from "@/redux/hooks";
import { IconAi } from "@tabler/icons-react";
import { generateSubTasks, resetTaskTranslation } from "../todo/taskThunks";
import { useState } from "react";
import TranslateDialog from "./translateDialog";
interface Props {
  task: Task;
}
export default function AiTasks(props: Props) {
  const { task } = props;
  const dispatch = useAppDispatch();
  const [openTranslateModal, setOpenTranlsateModal] = useState<boolean>(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-black text-white">
            <IconAi
              className="border-2 rounded-sm cursor-pointer"
              color="white"
            />
            AI Tasks
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-black text-white">
          <DropdownMenuItem
            onClick={() => {
              dispatch(generateSubTasks(task));
            }}
            className="cursor-pointer"
          >
            Generate SubTasks
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setOpenTranlsateModal(true);
            }}
          >
            Translate
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              if (task?.id) {
                dispatch(resetTaskTranslation(task.id));
              }
            }}
          >
            Reset Translation
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <TranslateDialog
        openModal={openTranslateModal}
        setOpenModal={setOpenTranlsateModal}
        task={task}
      />
    </>
  );
}
