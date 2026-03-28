import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initAnalytics } from "@/lib/firebase";

createRoot(document.getElementById("root")!).render(<App />);

void initAnalytics();
