import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AppRoutes from "./routes";

function App() {
  return (
    <div className="App">
      <AppRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
