import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { StripeProvider } from "./contexts/StripeContext.jsx";

createRoot(document.getElementById("root")).render(
    <StripeProvider>
        <App />
    </StripeProvider>
);
