import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n.tsx";
import { ThemeWrapper } from "./theme.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeWrapper>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ThemeWrapper>
  </StrictMode>
);
