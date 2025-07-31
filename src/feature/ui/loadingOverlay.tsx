import { useAppSelector } from "@/redux/hooks";
import { LoaderPinwheel } from "lucide-react";

export function LoadingOverlay() {
  const { show, text } = useAppSelector((state) => state.ui.loading);
  return (
    <>
      {show && (
        <div className="flex flex-col fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <LoaderPinwheel size={50} color="white" className="animate-spin" />{" "}
          <p className="ml-4 text-white">{text}</p>
        </div>
      )}
    </>
  );
}
