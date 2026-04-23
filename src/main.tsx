import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializePermissionHandling } from "./utils/permissionHandler";

// Initialize permission handling to suppress device sensor errors
initializePermissionHandling();

createRoot(document.getElementById("root")!).render(<App />);
