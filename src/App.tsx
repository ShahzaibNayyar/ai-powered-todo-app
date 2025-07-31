import { LoadingOverlay } from "./feature/ui/loadingOverlay";
import TodoDashboard from "./pages/todoDashboard";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <TodoDashboard />
      <Toaster />
      <LoadingOverlay />
    </>
  );
}

export default App;
