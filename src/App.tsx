import { LoadingOverlay } from "./feature/ui/loadingOverlay";
import TodoDashboard from "./pages/todoDashboard";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <TodoDashboard />
      <Toaster
        toastOptions={{
          classNames: {
            toast: "!bg-black !text-white !border !border-white",
            title: "!text-white",
            description: "!text-white !opacity-100",
            icon: "!text-white",
          },
        }}
      />

      <LoadingOverlay />
    </>
  );
}

export default App;
