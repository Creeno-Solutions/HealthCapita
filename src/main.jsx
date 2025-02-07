import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DateProvider from "./utils/DateProvider.jsx";



createRoot(document.getElementById("root")).render(
  
  <BrowserRouter>
<DateProvider>
    <App />
    <ToastContainer position="top-left" />

    <ToastContainer />
    </DateProvider>
  </BrowserRouter>
  

);
